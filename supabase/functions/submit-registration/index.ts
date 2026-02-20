import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// Simple in-memory rate limiting (per function instance)
const submissionCounts = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

  const entry = submissionCounts.get(ip);
  if (!entry || now > entry.resetAt) {
    submissionCounts.set(ip, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (entry.count >= maxRequests) {
    return false;
  }
  entry.count++;
  return true;
}

// Server-side validation
function validateRegistration(data: unknown): {
  valid: boolean;
  errors: string[];
  sanitized?: {
    name: string;
    email: string;
    region: string;
    topics: string[];
    message: string;
  };
} {
  const errors: string[] = [];

  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid request body"] };
  }

  const d = data as Record<string, unknown>;

  // Name validation
  const name = typeof d.name === "string" ? d.name.trim() : "";
  if (!name || name.length < 2) errors.push("Name must be at least 2 characters");
  if (name.length > 200) errors.push("Name must be less than 200 characters");

  // Email validation
  const email = typeof d.email === "string" ? d.email.trim().toLowerCase() : "";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) errors.push("Please enter a valid email address");
  if (email.length > 320) errors.push("Email must be less than 320 characters");

  // Region validation
  const allowedRegions = ["Africa", "Asia", "Europe", "North America", "Oceania", "South America"];
  const region = typeof d.region === "string" ? d.region.trim() : "";
  if (!allowedRegions.includes(region)) errors.push("Please select a valid region");

  // Topics validation
  const allowedTopics = [
    "Public safety in the city",
    "Airport security",
    "Hospitals and Medical Facilities Security",
    "Hotels security",
    "Mining and construction equipment parking lots",
    "Industrial plants and manufacturing factories",
    "Critical infrastructure protection",
    "Oil and gas facilities, refineries, chemical plants",
    "Corporate and university campuses",
    "Gated communities, resorts, golf clubs",
    "Smart home, villa, luxury estate",
    "Water supply area stations and reservoirs",
    "Data centers",
    "Enhancing the work of the police force and military",
    "Investing in a business",
    "Other",
  ];
  const topics = Array.isArray(d.topics) ? d.topics : [];
  const validTopics = topics.filter(
    (t): t is string => typeof t === "string" && allowedTopics.includes(t)
  );
  if (validTopics.length === 0) errors.push("Please select at least one valid topic");
  if (validTopics.length > allowedTopics.length) errors.push("Too many topics selected");

  // Message validation (optional)
  const message = typeof d.message === "string" ? d.message.trim() : "";
  if (message.length > 2000) errors.push("Message must be less than 2000 characters");

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    errors: [],
    sanitized: { name, email, region, topics: validTopics, message },
  };
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Rate limiting by IP
  const clientIp =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!checkRateLimit(clientIp)) {
    return new Response(
      JSON.stringify({ error: "Too many submissions. Please try again later." }),
      {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Server-side validation
  const validation = validateRegistration(body);
  if (!validation.valid || !validation.sanitized) {
    return new Response(JSON.stringify({ error: "Validation failed", details: validation.errors }), {
      status: 422,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  // Store in database using service role (bypasses RLS safely on server side)
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  const { error: dbError } = await supabase.from("registrations").insert({
    name: validation.sanitized.name,
    email: validation.sanitized.email,
    region: validation.sanitized.region,
    topics: validation.sanitized.topics,
    message: validation.sanitized.message || null,
  });

  if (dbError) {
    console.error("DB insert error:", dbError.message);
    return new Response(JSON.stringify({ error: "Failed to save registration" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});

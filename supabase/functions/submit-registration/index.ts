import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set<string>([
  "https://1rollo.com",
  "https://www.1rollo.com",
  "https://new.1rollo.com",
  "https://rollo.lovable.app",
]);

const ALLOWED_PATTERNS: RegExp[] = [
  /^https:\/\/[\w-]+\.lovable\.app$/,
  /^https:\/\/[\w-]+\.lovable\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/,
];

function buildCorsHeaders(origin: string | null) {
  const isAllowed =
    !!origin &&
    (ALLOWED_ORIGINS.has(origin) || ALLOWED_PATTERNS.some((re) => re.test(origin)));
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin! : "https://1rollo.com",
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(data: unknown, status: number, corsHeaders: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  const corsHeaders = buildCorsHeaders(req.headers.get("origin"));

  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405, corsHeaders);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("PROJECT_URL");
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json({ error: "Server misconfigured: missing Supabase credentials" }, 500, corsHeaders);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    const body = await req.json();

    // ── Honeypot signal ──
    // Do not block solely on this field: some browsers/password managers can
    // autofill hidden "website" fields, which would silently drop real leads.
    const honeypot = String(body?.website ?? "").trim();
    if (honeypot.length > 0) {
      console.warn("submit-registration honeypot filled; processing submission", {
        honeypotLength: honeypot.length,
      });
    }

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const region = String(body?.region ?? "").trim();
    const topics = Array.isArray(body?.topics) ? body.topics.map(String) : [];
    const message = String(body?.message ?? "").trim();

    // Server-side validation — defense in depth against direct API calls.
    if (name.length < 2 || name.length > 100) {
      return json({ error: "Invalid name (2-100 characters)" }, 400, corsHeaders);
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 255) {
      return json({ error: "Invalid email address" }, 400, corsHeaders);
    }
    if (!region || region.length > 80) {
      return json({ error: "Region is required (max 80 characters)" }, 400, corsHeaders);
    }
    if (topics.length < 1 || topics.length > 30) {
      return json({ error: "Select at least one topic" }, 400, corsHeaders);
    }
    if (topics.some((t) => typeof t !== "string" || t.length > 200)) {
      return json({ error: "Invalid topic value" }, 400, corsHeaders);
    }
    if (message.length > 3000) {
      return json({ error: "Message is too long (max 3000 characters)" }, 400, corsHeaders);
    }

    const { error } = await supabase.from("registrations").insert({
      name,
      email,
      region,
      topics,
      message: message || null,
    });

    if (error) {
      console.error("submit-registration insert failed", error);
      return json({ error: "Internal server error" }, 500, corsHeaders);
    }


    // Fire-and-forget emails: notify the team + confirm receipt to the client.
    // Failures are logged but do not block the form response.
    // Call send-transactional-email directly via fetch with a shared internal
    // secret header — the function enforces auth in-code (verify_jwt = false
    // at the gateway, since new sb_secret_* keys are not JWTs and would fail
    // the gateway's verify_jwt check).
    const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? Deno.env.get("SUPABASE_PUBLISHABLE_KEY") ?? "";
    const INTERNAL_SECRET = Deno.env.get("INTERNAL_FUNCTION_SECRET") ?? "";
    const sendEmailUrl = `${SUPABASE_URL}/functions/v1/send-transactional-email`;

    const invoke = (templateName: string, payload: Record<string, unknown>) =>
      fetch(sendEmailUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${ANON_KEY}`,
          "apikey": ANON_KEY,
          "x-internal-secret": INTERNAL_SECRET,
        },
        body: JSON.stringify({ templateName, ...payload }),
      })
        .then(async (res) => {
          if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.error(`email ${templateName} failed`, res.status, text);
          }
        })
        .catch((e) => console.error(`email ${templateName} error`, e));

    await Promise.all([
      invoke("contact_notification", {
        replyTo: email,
        templateData: { name, email, region, topics, message },
      }),
      invoke("contact_confirmation", {
        recipientEmail: email,
        templateData: {},
      }),
    ]);

    return json({ ok: true }, 200, corsHeaders);
  } catch {
    return json({ error: "Bad request" }, 400, corsHeaders);
  }
});

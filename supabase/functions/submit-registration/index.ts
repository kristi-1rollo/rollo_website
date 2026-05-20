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

    // ── Honeypot check ──
    // Real users never see this field; bots typically fill every input.
    // Silently accept (return ok) so bots don't learn that we filter them out.
    const honeypot = String(body?.website ?? "").trim();
    if (honeypot.length > 0) {
      console.log("submit-registration honeypot triggered, dropping silently");
      return json({ ok: true }, 200, corsHeaders);
    }

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const region = String(body?.region ?? "").trim();
    const topics = Array.isArray(body?.topics) ? body.topics.map(String) : [];
    const message = String(body?.message ?? "").trim();

    if (name.length < 2) return json({ error: "Invalid name" }, 400, corsHeaders);
    if (!email.includes("@")) return json({ error: "Invalid email" }, 400, corsHeaders);
    if (!region) return json({ error: "Region is required" }, 400, corsHeaders);
    if (topics.length < 1) return json({ error: "Select at least one topic" }, 400, corsHeaders);

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
    const invoke = (templateName: string, body: Record<string, unknown>) =>
      fetch(`${SUPABASE_URL}/functions/v1/send-transactional-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        },
        body: JSON.stringify({ templateName, ...body }),
      })
        .then(async (r) => {
          if (!r.ok) console.error(`email ${templateName} failed`, r.status, await r.text());
        })
        .catch((e) => console.error(`email ${templateName} error`, e));

    await Promise.all([
      invoke("contact_notification", {
        replyTo: email,
        templateData: { name, email, region, topics, message },
      }),
      invoke("contact_confirmation", {
        recipientEmail: email,
        templateData: { name },
      }),
    ]);

    return json({ ok: true }, 200, corsHeaders);
  } catch {
    return json({ error: "Bad request" }, 400, corsHeaders);
  }
});

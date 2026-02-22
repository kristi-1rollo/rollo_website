

import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? Deno.env.get("PROJECT_URL");
  const SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? Deno.env.get("SERVICE_ROLE_KEY");

  if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    return json({ error: "Server misconfigured: missing Supabase credentials" }, 500);
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

  try {
    const body = await req.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const region = String(body?.region ?? "").trim();
    const topics = Array.isArray(body?.topics) ? body.topics.map(String) : [];
    const message = String(body?.message ?? "").trim();

    if (name.length < 2) return json({ error: "Invalid name" }, 400);
    if (!email.includes("@")) return json({ error: "Invalid email" }, 400);
    if (!region) return json({ error: "Invalid region" }, 400);
    if (topics.length < 1) return json({ error: "Select at least one topic" }, 400);

    const { error } = await supabase.from("registrations").insert({
      name,
      email,
      region,
      topics,
      message: message || null,
    });

    if (error) return json({ error: error?.message ?? JSON.stringify(error) }, 500);

    return json({ ok: true });
  } catch {
    return json({ error: "Bad request" }, 400);
  }
});
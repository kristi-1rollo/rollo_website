import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify calling user
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await userClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const actorId = claimsData.claims.sub;

    // Use service role to check admin status and perform operations
    const adminClient = createClient(supabaseUrl, serviceRoleKey);

    // Check if caller is admin
    const { data: isAdmin } = await adminClient.rpc("has_role", {
      _user_id: actorId,
      _role: "admin",
    });

    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden: admin role required" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json();
    const { action } = body;

    if (action === "grant") {
      const { email } = body;
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find user by email using admin API
      const { data: userData, error: userError } = await adminClient.auth.admin.listUsers();
      if (userError) throw userError;

      const targetUser = userData.users.find((u: any) => u.email === email);
      if (!targetUser) {
        return new Response(JSON.stringify({ error: `Kasutajat e-postiga "${email}" ei leitud` }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Check if already admin
      const { data: existingRole } = await adminClient
        .from("user_roles")
        .select("id")
        .eq("user_id", targetUser.id)
        .eq("role", "admin")
        .maybeSingle();

      if (existingRole) {
        return new Response(JSON.stringify({ error: "Kasutajal on juba admin roll" }), {
          status: 409,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Grant admin
      const { error: insertError } = await adminClient
        .from("user_roles")
        .insert({ user_id: targetUser.id, role: "admin" });
      if (insertError) throw insertError;

      // Log action
      await adminClient.from("admin_audit_log").insert({
        actor_id: actorId,
        action: "grant_admin",
        target_user_id: targetUser.id,
        metadata: { email },
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "revoke") {
      const { user_id } = body;
      if (!user_id) {
        return new Response(JSON.stringify({ error: "user_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Prevent self-revoke
      if (user_id === actorId) {
        return new Response(JSON.stringify({ error: "Ei saa eemaldada enda admin õigusi" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const { error: deleteError } = await adminClient
        .from("user_roles")
        .delete()
        .eq("user_id", user_id)
        .eq("role", "admin");
      if (deleteError) throw deleteError;

      // Log action
      await adminClient.from("admin_audit_log").insert({
        actor_id: actorId,
        action: "revoke_admin",
        target_user_id: user_id,
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

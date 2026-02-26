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

    // Verify calling user via getUser (robust server-side check)
    const userClient = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData?.user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const actorId = userData.user.id;

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

    // ── GRANT: add admin role to existing user by email ──
    if (action === "grant") {
      const { email } = body;
      if (!email) {
        return new Response(JSON.stringify({ error: "Email is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Find user by email
      const { data: listData, error: listError } = await adminClient.auth.admin.listUsers();
      if (listError) throw listError;

      const targetUser = listData.users.find((u: any) => u.email === email);

      if (!targetUser) {
        // User doesn't exist — invite them (creates account + sends invite email)
        const { data: inviteData, error: inviteError } = await adminClient.auth.admin.inviteUserByEmail(email);
        if (inviteError) throw inviteError;

        const newUserId = inviteData.user.id;

        // Grant admin role to the newly invited user
        const { error: insertError } = await adminClient
          .from("user_roles")
          .insert({ user_id: newUserId, role: "admin" });
        if (insertError) throw insertError;

        // Audit log
        await adminClient.from("admin_audit_log").insert({
          actor_id: actorId,
          action: "invite_admin",
          target_user_id: newUserId,
          metadata: { email },
        });

        return new Response(JSON.stringify({ success: true, invited: true, message: `Kutse saadetud aadressile ${email}` }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // User exists — check if already admin
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

      // Audit log
      await adminClient.from("admin_audit_log").insert({
        actor_id: actorId,
        action: "grant_admin",
        target_user_id: targetUser.id,
        metadata: { email },
      });

      return new Response(JSON.stringify({ success: true, invited: false, message: "Admin õigused antud" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── REVOKE: remove admin role ──
    if (action === "revoke") {
      const { user_id } = body;
      if (!user_id) {
        return new Response(JSON.stringify({ error: "user_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

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

      await adminClient.from("admin_audit_log").insert({
        actor_id: actorId,
        action: "revoke_admin",
        target_user_id: user_id,
      });

      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── SEND_RESET: send password reset email ──
    if (action === "send_reset") {
      const { user_id } = body;
      if (!user_id) {
        return new Response(JSON.stringify({ error: "user_id is required" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Look up user email
      const { data: targetData, error: targetError } = await adminClient.auth.admin.getUserById(user_id);
      if (targetError || !targetData?.user?.email) {
        return new Response(JSON.stringify({ error: "Kasutajat ei leitud" }), {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      // Generate password reset link and send email
      const { error: resetError } = await adminClient.auth.admin.generateLink({
        type: "recovery",
        email: targetData.user.email,
      });
      if (resetError) throw resetError;

      await adminClient.from("admin_audit_log").insert({
        actor_id: actorId,
        action: "send_password_reset",
        target_user_id: user_id,
        metadata: { email: targetData.user.email },
      });

      return new Response(JSON.stringify({ success: true, message: `Parooli taastamise kiri saadetud: ${targetData.user.email}` }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Unknown action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("manage-admin error:", err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

import { createClient, User } from "npm:@supabase/supabase-js@2";

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    // Parse and validate request body
    const { id } = await req.json();
    if (!id) return jsonResponse({ error: "Missing invite code." }, 400);

    // Get current user
    const user = await findUser(req);

    if (!user) {
      return jsonResponse({ error: "Unauthorized" }, 401);
    }

    // --- Service role key to bypass RLS ---
    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

    // get valid invite...
    const { data: connection, error: connectionError } = await supabase
      .from("connections")
      .select()
      .eq("id", id)
      .is("invitee_id", null)
      .neq("inviter_id", user.id)
      .maybeSingle();

    if (connectionError || !connection) {
      return jsonResponse({ error: "Invalid or already redeemed invite." }, 403);
    }

    // check to make sure we're not already connected
    const { data: existing, error: existingError } = await supabase
      .from("connections")
      .select("id")
      .in("inviter_id", [connection.inviter_id, user.id])
      .in("invitee_id", [connection.inviter_id, user.id])
      .maybeSingle();

    if (existingError) {
      console.error(existingError);
      return jsonResponse({ error: "Failed to check existing." }, 500);
    }

    if (existing) {
      return jsonResponse({ error: "Already connected." }, 400);
    }

    // redeem!
    const { error: updateError } = await supabase
      .from("connections")
      .update({
        invitee_id: user.id,
        accepted_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      return jsonResponse({ error: "Failed to process invite." }, 500);
    }

    return jsonResponse({
      message: "Invite successfully redeemed",
    });
  } catch (err) {
    return jsonResponse({ error: "Invite redemption failed.", details: err }, 500);
  }
});

// Helper for JSON responses
function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

async function findUser(req: Request): Promise<User | null> {
  const anonClient = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
    global: { headers: { Authorization: req.headers.get("Authorization")! } },
  });

  const { data, error } = await anonClient.auth.getUser();
  if (error || !data.user) return null;

  return data.user;
}
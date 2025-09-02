import { createClient } from "npm:@supabase/supabase-js@2.41.0";
// Environment variables are automatically provided by Supabase
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") ?? "";
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
// Initialise two clients:
// 1. An anon client to read the user ID from the incoming JWT.
// 2. A service‑role client that has admin rights to delete the user.
const supabaseAnon = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
Deno.serve(async (req)=>{
  // The request must include an Authorization header with a valid JWT.
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return new Response(JSON.stringify({
      error: "Missing or malformed Authorization header"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const accessToken = authHeader.substring("Bearer ".length).trim();
  // 1️⃣ Resolve the user ID from the JWT.
  const { data: authData, error: authError } = await supabaseAnon.auth.getUser(accessToken);
  if (authError || !authData?.user) {
    return new Response(JSON.stringify({
      error: "Unable to identify user"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  const userId = authData.user.id;
  // 2️⃣ Delete the user using the service‑role client (admin API).
  const { error: deleteError } = await supabaseAdmin.auth.admin.deleteUser(userId);
  if (deleteError) {
    return new Response(JSON.stringify({
      error: "Failed to delete user",
      details: deleteError.message
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
  // Successful deletion.
  return new Response(JSON.stringify({
    success: true,
    deleted_user_id: userId
  }), {
    status: 200,
    headers: {
      "Content-Type": "application/json"
    }
  });
});

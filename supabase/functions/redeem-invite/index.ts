import { createClient } from 'npm:@supabase/supabase-js@2';
Deno.serve(async (req)=>{
  // Only allow POST requests
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({
      error: 'Method not allowed'
    }), {
      status: 405,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
  try {
    // Parse request body
    const { id } = await req.json();
    // Validate input
    if (!id) {
      return new Response(JSON.stringify({
        error: 'Missing invite code'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    // Create Supabase client with service role for invite validation
    const supabase = createClient(Deno.env.get('SUPABASE_URL'), Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'));
    // Check invite code validity
    const { data: inviteData, error: inviteError } = await supabase.from('invites').select('*').eq('id', id).single();
    if (inviteError || !inviteData) {
      return new Response(JSON.stringify({
        error: 'Invalid or already redeemed invite'
      }), {
        status: 403,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    // Mark invite as redeemed and potentially create user/profile
    const { error: updateError } = await supabase.from('invites').update({
      used: true
    }).eq('id', id);
    if (updateError) {
      return new Response(JSON.stringify({
        error: 'Failed to process invite'
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    return new Response(JSON.stringify({
      message: 'Invite successfully redeemed',
      invite: inviteData
    }), {
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Invite redemption failed',
      details: err.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
});

import { supabase } from "@/supabase";

export const upsertProfile = async (info) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ ...info, updated_at: new Date().toISOString() }, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const findProfile = async (id: String | String[]) => {
  const { data, error } = await supabase.from("profiles").select().eq("id", id).single();
  if (error) throw error;
  return data;
};

export const getConnections = async () => {
  const { data, error } = await supabase
    .from("connections")
    .select(`*, inviter:inviter_id(*), invitee:invitee_id(*)`)
    .not("invitee_id", "is", null);

  if (error) throw error;

  return data;
};

export const createInvite = async (id: String) => {
  const { data, error } = await supabase.from("connections").insert({ inviter_id: id }).select().single();
  if (error) throw error;
  return data;
};

export const acceptInvite = async (id: String) => {
  const { data, error } = await supabase.functions.invoke("redeem-invite", {
    body: { id },
  });

  if (error) {
    const { error: errorMessage } = await error.context.json();
    throw errorMessage;
  }

  return data;
};

export const addPushToken = async (user: any, token: String) => {
  const { data, error } = await supabase.from("profiles").update({ expo_push_token: token }).eq("id", user.id);
  console.log(data, user.id, token, error);
  if (error) throw error;
};
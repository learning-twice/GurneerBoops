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

export const findProfile = async (id: string | string[]) => {
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

export const createInvite = async (id: string) => {
  const { data, error } = await supabase.from("connections").insert({ inviter_id: id }).select().single();
  if (error) throw error;
  return data;
};

export const acceptInvite = async (id: string) => {
  const { data, error } = await supabase.functions.invoke("redeem-invite", {
    body: { id },
  });

  if (error) {
    const { error: errorMessage } = await error.context.json();
    throw errorMessage;
  }

  return data;
};

export const addPushToken = async (user: any, token: string) => {
  console.log(user.expo_push_token);
  const { error } = await supabase.from("profiles").update({ expo_push_token: token }).eq("id", user.id);
  if (error) throw error;
};
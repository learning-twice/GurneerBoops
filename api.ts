import { supabase } from "@/supabase";

export const upsertProfile = async (info: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ ...info, updated_at: new Date().toISOString() }, { onConflict: "id" })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const findProfile = async (id: String) => {
  const { data, error } = await supabase.from("profiles").select().eq("id", id).single();
  if (error) throw error;
  return data;
};

export const getConnections = async () => {
  const { data, error } = await supabase.from("connections").select(`*, user_a(*), user_b(*)`);
  if (error) throw error;
  return data;
};


export const createInvite = async(id: string) => {
  const {data, error} = await supabase.from("invites").insert({inviter_id: id}).select().single();
  console.log(data, error);
  return data;
}

export const acceptInvite = async (id: string) => {
  const {data, error} = await supabase.functions.invoke("redeem-invite", {
    body:{id},
  });
  console.log(data, error);
  return data;
}
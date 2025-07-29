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
    //because user a and user b both have a profile, need to be specific 
  const { data, error } = await supabase.from("connections").select(`ua:user_a(*), ub:user_b(*)`);
  console.log(data, error);
  if (error) throw error;
  return data;
};
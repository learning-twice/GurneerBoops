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
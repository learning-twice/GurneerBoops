import { findProfile, upsertProfile } from "@/lib/api";
import { supabase } from "@/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  iosClientId: "895289514692-lpihg3tl9unlc3thtklej03e6ckru1rl.apps.googleusercontent.com"
});

export async function getUserFromSupabase() {
  const { data } = await supabase.auth.getUser();

  const authUser = data.user;
  if (!authUser) return null;

  return findProfile(authUser.id);
}

export const signIn = async () => {
  await GoogleSignin.hasPlayServices();

  const googleAuthData = await GoogleSignin.signIn();
  const idToken = googleAuthData.data?.idToken;

  if (!idToken) throw new Error("Missing Google ID token");

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: idToken,
  });

  if (error) throw error;
  const authUser = data.user;
  if (!authUser) throw new Error("No auth user!");

  const { email, avatar_url, full_name } = authUser.user_metadata;

  const user = await upsertProfile({ id: authUser.id, email, full_name, avatar_url });

  return user;
};

export const signOut = async () => {
  await GoogleSignin.signOut();
  await supabase.auth.signOut();
};
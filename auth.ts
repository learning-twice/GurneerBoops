import { GoogleSignin, statusCodes, isSuccessResponse, isErrorWithCode } from "@react-native-google-signin/google-signin";
import { supabase } from "@/supabase";
import { findProfile, upsertProfile } from "@/api";

GoogleSignin.configure({
   iosClientId: "895289514692-lpihg3tl9unlc3thtklej03e6ckru1rl.apps.googleusercontent.com",
  // webClientId: "895289514692-730d8pfsc3q9j45lagpe20h3gnqifa95.apps.googleusercontent.com",
 
});

export async function getUserFromSupabase() {
  try {
    const { data } = await supabase.auth.getUser();

    const authUser = data.user;
    if (!authUser) return null;

    return findProfile(authUser.id);
  } catch (e) {
    console.error(e);
  }
}

export const signIn = async () => {
  try {
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
  } catch (error) {
    console.error(error);
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await supabase.auth.signOut();
  } catch (error) {
    console.error(error);
  }
};
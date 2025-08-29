import { findProfile, upsertProfile, addPushToken } from "@/lib/api";
import { registerForPushNotificationsAsync } from "@/lib/notifications";
import { supabase } from "@/supabase";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";

GoogleSignin.configure({
  iosClientId: "895289514692-lpihg3tl9unlc3thtklej03e6ckru1rl.apps.googleusercontent.com"
});

export async function getUserFromSupabase() {
  const { data } = await supabase.auth.getUser();

  const authUser = data.user;
  if (!authUser) return null;

  return findProfile(authUser.id);
}

export const googleSignIn = async () => {
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

  const email = authUser.email;
  const { avatar_url, full_name } = authUser.user_metadata;

  const user = await findProfile(authUser.id);
  if (user) return user;

  const newUser = await upsertProfile({ id: authUser.id, email, full_name, avatar_url });

  const token = await registerForPushNotificationsAsync();
  if (token) await addPushToken(newUser, token);

  return newUser;
};

export const appleSignIn = async () => {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [AppleAuthentication.AppleAuthenticationScope.FULL_NAME, AppleAuthentication.AppleAuthenticationScope.EMAIL],
  });

  if (!credential.identityToken) throw new Error("Missing Apple ID token");

  const { error, data } = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token: credential.identityToken,
  });

  if (error) throw error;
  const authUser = data.user;
  if (!authUser) throw new Error("No auth user!");

  const email = authUser.email;
  const full_name = `${credential.fullName?.givenName ?? ""} ${credential.fullName?.familyName ?? ""}`.trim();

const user = await findProfile(authUser.id);
  if (user) return user;

  const newUser = await upsertProfile({ id: authUser.id, email, full_name });

  const token = await registerForPushNotificationsAsync();
  if (token) await addPushToken(newUser, token);

  return newUser;
};

export const signOut = async () => {
  await GoogleSignin.signOut();
  await supabase.auth.signOut();
};
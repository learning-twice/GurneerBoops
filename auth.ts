import { GoogleSignin, statusCodes, isSuccessResponse, isErrorWithCode } from "@react-native-google-signin/google-signin";
import { supabase } from "@/supabase";

GoogleSignin.configure({
   iosClientId: "895289514692-lpihg3tl9unlc3thtklej03e6ckru1rl.apps.googleusercontent.com",
  // webClientId: "895289514692-730d8pfsc3q9j45lagpe20h3gnqifa95.apps.googleusercontent.com",
 
});

export async function getUserFromSupabase() {
  return (await supabase.auth.getUser()).data.user;
}

export const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const response = await GoogleSignin.signIn();
    if (isSuccessResponse(response)) {
      if (response.data.idToken) {
        const {
          data: { user },
          error,
        } = await supabase.auth.signInWithIdToken({
          provider: "google",
          token: response.data.idToken,
        });

        if (error) throw error;
        return user;
      }
    } else {
      // sign in was cancelled by user
    }
  } catch (error) {
    console.error(error);

    if (isErrorWithCode(error)) {
      switch (error.code) {
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // Android only, play services not available or outdated
          break;
        default:
        // some other error happened
      }
    } else {
      // an error that's not related to google sign in occurred
    }
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



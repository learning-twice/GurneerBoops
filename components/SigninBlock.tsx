import React from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

export default function GoogleSignInBlock({ onSignIn, disabled }: { onSignIn: () => Promise<void>; disabled: boolean }) {
  return (
    <GoogleSigninButton
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={async () => {
        try {
          await onSignIn();
        } catch (e) {
          console.error(e);
        }
      }}
      disabled={disabled}
      accessibilityLabel="Sign in with Google"
    />
  );
}
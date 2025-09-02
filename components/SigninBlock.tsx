import React from "react";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import * as AppleAuthentication from "expo-apple-authentication";
import { StyleSheet, View } from "react-native";
import { useAuth, SignInProvider } from "@/AuthContext";
import StatusPill from "./SigninStatusPill";

export default function SignInBlock() {
  const { signIn, phase } = useAuth();
  const isLoggingIn = phase === "logging-in";

  const handlePress = async (provider?: SignInProvider) => {
    try {
      await signIn(provider);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <StatusPill phase={phase} />
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => handlePress()}
        disabled={isLoggingIn}
        accessibilityLabel="Sign in with Google"
        style={styles.googleButton}
      />

      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={8}
        style={styles.appleButton}
        onPress={() => handlePress("apple")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    gap: 16,
  },
  googleButton: {
    width: 240,
    height: 48,
  },
  appleButton: {
    width: 240,
    height: 40,
  },
});
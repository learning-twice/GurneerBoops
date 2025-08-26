import React from "react";
import { StyleSheet, Text } from "react-native";
import Page from "@/components/Page";
import { useAuth } from "@/AuthContext";
import StatusPill from "@/components/SigninStatusPill";
import GoogleSignInBlock from "@/components/SigninBlock";

export default function SignInScreen() {
  const { signIn, phase } = useAuth();
  const isLoggingIn = phase === "logging-in";

  return (
    <Page style={styles.page}>
      <Text>Welcome</Text>
      <StatusPill phase={phase} />
      <GoogleSignInBlock onSignIn={signIn} disabled={isLoggingIn} />
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
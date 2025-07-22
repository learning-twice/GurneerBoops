import { H1 } from "@/components/Headings";
import Page from "@/components/Page";
import { useUser } from "@/UserContext";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { StyleSheet } from "react-native";

export default function () {
  const { signIn } = useUser();

  return (
    <Page style={styles.center}>
      <H1>Welcome to the app</H1>
      <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn} />
    </Page>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
});
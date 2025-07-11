import { Text, View, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import {GoogleSignin, GoogleSigninButton, statusCodes } from "@react-native-google-signin/google-signin"

GoogleSignin.configure({
 
  iosClientId: '895289514692-lpihg3tl9unlc3thtklej03e6ckru1rl.apps.googleusercontent.com'
 
});
export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Home</Text>
      <Pressable
        onPress={() => router.push("/explore")}
        style={({ pressed }) => [
          styles.button,
          pressed && { backgroundColor: "red" },
        ]}
      >
        <Text style={styles.buttonText}>Go to Explore Page</Text>
      </Pressable>
      <GoogleSigninButton/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 20,
    color: "#333",
  },
  button: {
    backgroundColor: "#1e90ff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});

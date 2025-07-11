import {
  GoogleSignin,
  GoogleSigninButton,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

GoogleSignin.configure({
  iosClientId:
    "895289514692-lpihg3tl9unlc3thtklej03e6ckru1rl.apps.googleusercontent.com",
});
export default function Index() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getCurrentUser = async () =>{
      const response = await GoogleSignin.signInSilently();
      if(response){
       
        setUser(response.data);
      }
    };
    getCurrentUser();

  }, []);
  
  console.log(user?.user.name);

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        setUser(response.data);
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
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

  const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    setUser( null ); // Remember to remove the user from your app's state as well
  } catch (error) {
    console.error(error);
  }
};
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
      
      {user ? (
        <>
          <Text style={{ fontSize: 26 }}>Hello {user.user.name}!</Text>
          <Button title="Sign out" onPress={signOut} />
        </>
      ) : (
        <GoogleSigninButton size={GoogleSigninButton.Size.Wide} color={GoogleSigninButton.Color.Dark} onPress={signIn} />
      )}
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

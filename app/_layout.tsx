import { UserProvider, useUser } from "@/UserContext";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

const App = () => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/home");
    }

    if (user === null) {
      router.replace("/landing");
    }
  }, [user]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        options={{
          title: "Home Sweet Home",
          headerShown: true,
          headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: "#4B9CD3",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      />
    </Stack>
  );
};
import { UserProvider, useUser } from "@/UserContext";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  );
}

const App = () => {
  const { status } = useUser();

  if (status === "loading") return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === "authenticated"}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>

      <Stack.Protected guard={status === "unauthenticated"}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
};
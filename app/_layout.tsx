
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/AuthContext";
import { AppProvider } from "@/AppContext";

export default function RootLayout() {
  return (
      <AuthProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AuthProvider>
  );
}

const App = () => {
  const { status } = useAuth();

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
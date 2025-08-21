
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "@/AuthContext";
import { AppProvider, useAppContext } from "@/AppContext";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.setOptions({
  duration: 200,
  fade: true,
});

SplashScreen.preventAutoHideAsync();

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
  const { loaded } = useAppContext();

   useEffect(() => {
    if (loaded || status === "unauthenticated") {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [loaded, status]);

  if (status === "loading") return null;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={status === "authenticated" && loaded}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>

      <Stack.Protected guard={status === "unauthenticated" || !loaded}>
        <Stack.Screen name="(public)" />
      </Stack.Protected>
    </Stack>
  );
};
import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false }} />
      <Stack.Screen name="[friendId]" options={{ title: "Send!" }} />
      <Stack.Screen name="join" options={{ headerShown: false, presentation: "modal" }} />
    </Stack>
  );
};
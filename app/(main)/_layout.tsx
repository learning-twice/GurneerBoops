import { Stack } from "expo-router";

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home Sweet Home",
          headerShown: false,
        }}
      />
    </Stack>
  );
};
import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    //can remove header from index page
    <Stack.Screen name="index" options={{headerShown: false}}>

    </Stack.Screen>
    <Stack.Screen name="explore">
      
      </Stack.Screen>
  </Stack>
}

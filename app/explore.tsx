import { Text, View, Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function Explore() {
    const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>This is the explore page</Text>
      <Button title = "Back" onPress={() => router.back()}></Button>
    </View>
  );
}

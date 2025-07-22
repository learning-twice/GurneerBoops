import { Text } from "react-native";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { useUser } from "@/UserContext";
import { useRouter } from "expo-router";

export default function () {
  const { user, signOut } = useUser();
  const router = useRouter();

  return (
    <Page>
      <Text style={{ fontSize: 26 }}>Hello {user.name}!</Text>
      <Button text="Sign out" onPress={signOut} />
      <Button text="Gurneer" onPress={() => router.push("/gurneer")} />
    </Page>
  );
}
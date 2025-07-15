import { Text } from "react-native";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { useUser } from "@/UserContext";

export default function Explore() {
  const { user, signOut } = useUser();
  if (!user) return null;

  return (
    <Page>
      <Text style={{ fontSize: 26 }}>Hello {user.name}!</Text>
      <Button text="Sign out" onPress={signOut} />
    </Page>
  );
}
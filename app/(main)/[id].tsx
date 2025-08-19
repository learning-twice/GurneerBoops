import { useEffect, useState } from "react";
import Page from "@/components/Page";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";
import { findProfile } from "@/api";

export default function Friend() {
  const { id } = useLocalSearchParams();
  const [friend, setFriend] = useState<any>(null);

  useEffect(() => {
    async function getFriend() {
      const friend = await findProfile(id);
      setFriend(friend);
    }

    getFriend();
  }, []);

  if (!friend) return null;

  return (
    <Page>
      <Text>Friends!</Text>
      <Text>{id}</Text>
      <Text>{friend.full_name}</Text>
    </Page>
  );
}
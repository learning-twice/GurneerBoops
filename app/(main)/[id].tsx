import { findProfile } from "@/api";
import Page from "@/components/Page";
import { sendPushNotification } from "@/notifications";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, Text } from "react-native";

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

  const handleSend = async () => {
    sendPushNotification(friend.expo_push_token);
    Alert.alert("Boop Sent!");
  };

  if (!friend) return null;

  return (
    <Page>
      <Text>Friends!</Text>
      <Text>{id}</Text>
      <Text>{friend.full_name}</Text>
      <Button title="Send Boop!" onPress={handleSend} />
    </Page>
  );
}
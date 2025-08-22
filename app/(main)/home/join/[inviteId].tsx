import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Page from "@/components/Page";
import { acceptInvite } from "@/lib/api";
import { useAppContext } from "@/AppContext";
import InviteStatusPill from "@/components/StatusPill";
import { Text } from "@react-navigation/elements";

type InvitePhase = "accepting" | "accepted" | "not-accepted";

export default function AcceptInvite() {
  const [phase, setPhase] = useState<InvitePhase>("accepting");
  const { refreshConnections } = useAppContext();
  const { inviteId } = useLocalSearchParams();

  useEffect(() => {
    handleAcceptInvite();
  }, []);

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(inviteId);
      setPhase("accepted");
      await refreshConnections();

      const title = "Connection Successful";
      const message = "You’re now connected! Check your connections on the home screen.";

      Alert.alert(title, message, [{ text: "OK", onPress: () => router.dismissAll() }]);
    } catch (e: any) {
      console.error(e);
      setPhase("not-accepted");
      Alert.alert("Error", e, [{ text: "OK", onPress: () => router.dismissAll() }]);
    }
  };

  return (
    <Page style={{ marginTop: 64, gap: 20, marginHorizontal: 32 }}>
      <Text>Connecting...</Text>
      <InviteStatusPill phase={phase} />
    </Page>
  );
}
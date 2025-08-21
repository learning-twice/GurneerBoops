import Page from "@/components/Page";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";
import { useAppContext } from "@/AppContext";
import { useEffect } from "react";
import { acceptInvite } from "@/lib/api";

export default function AcceptInvite() {
const { refreshConnections } = useAppContext();
  const { inviteId } = useLocalSearchParams();


  useEffect(() => {
    handleAcceptInvite();
    console.log("hi");
  }, []);

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(inviteId);
      await refreshConnections();
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Page>
      <Text>{inviteId}</Text>
    </Page>
  );
}
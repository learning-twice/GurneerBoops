import Page from "@/components/Page";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams } from "expo-router";


export default function AcceptInvite() {
  const { inviteId } = useLocalSearchParams();
  return (
    <Page>
      <Text>{inviteId}</Text>
    </Page>
  );
}
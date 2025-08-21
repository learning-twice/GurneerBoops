import Page from "@/components/Page";
import { Text } from "@react-navigation/elements";
import { useLocalSearchParams, router } from "expo-router";
import { useAppContext } from "@/AppContext";
import { useEffect } from "react";
import { acceptInvite } from "@/lib/api";
import { Alert} from "react-native";
 

export default function AcceptInvite() {
const { refreshConnections } = useAppContext();
  const { inviteId } = useLocalSearchParams();


  useEffect(() => {
    
    console.log("accepting invite now:", inviteId);
    handleAcceptInvite();
  }, []);

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(inviteId);
      await refreshConnections();
        Alert.alert("Success", `You're now connected! (Find out with who!)`, [
        {
          text: "OK",
          onPress: () => {
            router.replace("/");
          },
        },
      ]);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Page>
      <Text>Boop Connect</Text>
    </Page>
  );
}
import Page from "@/components/Page";
import { useUser } from "@/UserContext";
import { createInvite, acceptInvite, getConnections } from "@/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, Alert, TextInput, View , Text, Share} from "react-native";
import ConnectionList from "@/components/ConnectionsList";

export default function () {
  const { user } = useUser();
  const [connections, setConnections] = useState<any>(null);
  const [code, setCode] = useState("");

  useEffect(() => {
    try {
      fetchConnections();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const fetchConnections = async () => {
    const connections = await getConnections();
    setConnections(connections);
  };

  const handleCreateInvite = async () => {
   try{
    const data = await createInvite(user.id);
    await Share.share({
      message: `Hi! Use this code to Boop with me: ${data.id}`,
    });
   }
   catch (e){
    console.error(e);
   }
  };

  if (!connections)
    return (
      <Page>
        <ActivityIndicator />
      </Page>
    );

  return (
    <Page>
      <Text>Hello {user.full_name}!!</Text>
      <Button title="Invite" onPress={handleCreateInvite} />
      <View style={{ borderWidth: 2, borderColor: "black" }}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
            paddingHorizontal: 10,
            marginBottom: 10,
          }}
          placeholder="Enter invite code..."
          value={code}
          onChangeText={setCode}
        />
        <Button
          title="Accept"
          onPress={async () => {
            try {
              await acceptInvite(code);
              fetchConnections();
            } catch (e: any) {
              Alert.alert("Error", e, [{ text: "OK", style: "destructive" }]);
              console.error(e);
            }
          }}
        />
      </View>
      <ConnectionList connections={connections} fetchConnections={fetchConnections} />
    </Page>
  );
}
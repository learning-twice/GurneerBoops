import ConnectionList from "@/components/ConnectionsList";
import Page from "@/components/Page";
import { acceptInvite, createInvite, getConnections } from "@/lib/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Share, Text, TextInput, View } from "react-native";
import { useAppContext } from "@/AppContext";


export default function () {

 const { user, connections } = useAppContext();
  const [code, setCode] = useState("");


  const handleCreateInvite = async () => {
   try{
    const invite = await createInvite(user.id);
    await Share.share({
      message: `Hi! Use this code to Boop with me: http://boopapp.site/join/${invite.id}`,
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
              //fetchConnections();
            } catch (e: any) {
              Alert.alert("Error", e, [{ text: "OK", style: "destructive" }]);
              console.error(e);
            }
          }}
        />
      </View>
      <ConnectionList connections={connections} fetchConnections={[]} />
    </Page>
  );
}
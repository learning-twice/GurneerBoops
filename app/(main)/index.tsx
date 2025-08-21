import ConnectionList from "@/components/ConnectionsList";
import Page from "@/components/Page";
import { acceptInvite, createInvite, getConnections } from "@/lib/api";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Button, Share, Text, TextInput, View } from "react-native";
import { useAppContext } from "@/AppContext";


export default function () {
 const { user } = useAppContext();


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


  return (
    <Page>
      <Text>Hello {user.full_name}!!</Text>
      <Button title="Invite" onPress={handleCreateInvite} />
      <ConnectionList />
    </Page>
  );
}
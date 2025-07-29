import { ActivityIndicator, Text } from "react-native";
import Button from "@/components/Button";
import Page from "@/components/Page";
import { useUser } from "@/UserContext";
import { useRouter } from "expo-router";
import { getConnections } from "@/api";
import { useEffect, useState } from "react";


export default function () {
  const { user, signOut } = useUser();
  const [connections, setConnections]= useState<any>(null);

  useEffect(() => {
getConnections(user.id).then(connections => {
  console.log(connections);
  setConnections(connections);
})
  }, []);

  if(!connections) return <Page><ActivityIndicator/></Page>

  return (
    <Page>
      <Text style={{ fontSize: 26 }}>Hello {user.full_name}!</Text>
      <Text> You have: {connections.length} connections.</Text>
    </Page>
  );
}
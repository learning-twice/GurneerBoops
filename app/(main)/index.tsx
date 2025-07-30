import Page from "@/components/Page";
import { useUser } from "@/UserContext";
import { getConnections } from "@/api";
import { useEffect, useState } from "react";
import { createInvite } from "@/api";
import {
  Text,
  ActivityIndicator,
  View,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";

export default function ConnectionsScreen() {
  const { user } = useUser();
  const [connections, setConnections] = useState<any[] | null>(null);

  useEffect(() => {
    getConnections().then((data) => {
      setConnections(data);
    });
  }, []);

  if (!connections) {
    return (
      <Page>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#4B9CD3" />
        </View>
      </Page>
    );
  }

  const peeps = connections.map((connect: any) =>
    connect.user_a.id === user.id ? connect.user_b : connect.user_a
 
  );
   const handlecreateInvite = async() =>{
    console.log("invite someone!");
    createInvite(user.id);
  }

  return (
    <Page>
      <Text style={styles.greeting}>Hello {user.full_name}!</Text>
      <Button title="Invite" onPress={handlecreateInvite}/>
      <Text style={styles.subtext}>
        You have {connections.length} connection{connections.length !== 1 ? "s" : ""}.
      </Text>

      <FlatList
        data={peeps}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.connectionCard}>
            <Text style={styles.connectionName}>{item.full_name}</Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  connectionCard: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  connectionName: {
    fontSize: 16,
    color: "#333",
  },
});

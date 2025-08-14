import { useState } from "react";
import { useUser } from "@/UserContext";
import { FlatList, Text, StyleSheet, View, RefreshControl } from "react-native";

export default function ConnectionList({ connections, fetchConnections }) {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConnections();
    setRefreshing(false);
  };

  return (
    <>
      <Text>Number of connections: {connections.length}.</Text>
      <FlatList
        style={styles.list}
        data={connections}
        renderItem={({ item }) => {
          const isInviter = item.inviter.id === user.id;
          const friend = isInviter ? item.invitee : item.inviter;
          return (
            <Text key={friend.id}>
              {friend.full_name} :: {isInviter ? "I invited this person" : "This person invited me"}
            </Text>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["grey"]} progressBackgroundColor={"black"} />
        }
        ListEmptyComponent={<Text style={{ fontWeight: "bold", paddingHorizontal: 10 }}>No connections yet.</Text>}
        ListHeaderComponent={<View style={{ marginTop: 15 }} />}
      />
    </>
  );
}

const styles = StyleSheet.create({
  list: {
    marginBottom: 24,
    borderWidth: 5,
    borderColor: "#ddd",
    borderRadius: 5,
  },
});
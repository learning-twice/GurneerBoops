import { useState } from "react";
import { useUser } from "@/UserContext";
import { FlatList, Text, StyleSheet, View, RefreshControl, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function ConnectionList({ connections, fetchConnections }) {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchConnections();
    setRefreshing(false);
  };

  return (
    <>
      <FlatList
        style={styles.list}
        data={connections}
        renderItem={({ item }) => {
          const isInviter = item.inviter.id === user.id;
          const friend = isInviter ? item.invitee : item.inviter;
          return (
            <TouchableOpacity
              onPress={() => router.push(`/${friend.id}`)}
              style={[styles.card, isInviter ? styles.inviter : styles.invitee]}
            >
              <Text style={styles.name}>{friend.full_name}</Text>
            </TouchableOpacity>
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["grey"]} progressBackgroundColor={"black"} />
        }
        ListEmptyComponent={<Text style={{ fontWeight: "bold", paddingHorizontal: 10 }}>No connections yet.</Text>}
        ListHeaderComponent={<View style={{ marginTop: 15 }} />}
      />

      <View style={styles.legend}>
        <Text style={styles.legendTitle}>Legend:</Text>
        <View style={styles.legendItem}>
          <View style={[styles.box, { backgroundColor: "#d0f0ff" }]} />
          <Text>You invited</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.box, { backgroundColor: "#e0ffd8" }]} />
          <Text>Invited by</Text>
        </View>
      </View>
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
  card: {
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  inviter: {
    backgroundColor: "#d0f0ff",
  },
  invitee: {
    backgroundColor: "#e0ffd8",
  },
  legend: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 12,
  },
  legendTitle: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  box: {
    width: 16,
    height: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: "#aaa",
  },
});
import React, { useState } from "react";
import { FlatList, Text, StyleSheet, View, RefreshControl } from "react-native";
import { useRouter } from "expo-router";
import { useAppContext } from "@/AppContext";
import { useAuth } from "@/AuthContext";
import ConnectionCard from "@/components/ConnectionCard";
import Legend from "./Legend";

export default function ConnectionList() {
  const { connections, refreshConnections } = useAppContext();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const onRefresh = async () => {
    setRefreshing(true);
    await refreshConnections();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Connections</Text>
      <Text style={styles.subheading}>Tap a friend to send them a Boop 👆</Text>

      <FlatList
        style={styles.list}
        data={connections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const isInviter = item.inviter.id === user.id;
          const friend = isInviter ? item.invitee : item.inviter;
          return (
            <ConnectionCard name={friend.full_name} isInviter={isInviter} onPress={() => router.push(`/home/${friend.id}`)} />
          );
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={["#2563eb"]} progressBackgroundColor="#fff" />
        }
        ListEmptyComponent={<Text style={styles.empty}>No connections yet — invite someone!</Text>}
        ListHeaderComponent={<View style={{ marginTop: 8 }} />}
      />

      <Legend />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#e5e7eb", // gray-200
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
    color: "#111827", // gray-900
  },
  subheading: {
    fontSize: 14,
    color: "#6b7280", // gray-500
    marginBottom: 12,
  },
  list: {
    marginBottom: 16,
  },
  empty: {
    fontWeight: "600",
    fontSize: 15,
    textAlign: "center",
    paddingVertical: 20,
    color: "#6b7280", // gray-500
  },
});
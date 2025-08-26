import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ConnectionCard({ name, isInviter, onPress }: { name: string; isInviter: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, isInviter ? styles.inviter : styles.invitee]} activeOpacity={0.7}>
      <Text style={styles.name}>{name}</Text>
      <Ionicons name="chevron-forward" size={20} color="#6b7280" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb", 
    backgroundColor: "#f9fafb", 
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827", 
  },
  inviter: {
    backgroundColor: "#eff6ff", 
  },
  invitee: {
    backgroundColor: "#f0fdf4", 
  },
});
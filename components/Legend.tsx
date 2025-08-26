import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Legend() {
  return (
    <View style={styles.legend}>
      <Text style={styles.title}>Legend</Text>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: "#dbeafe" }]} />
        <Text style={styles.label}>You invited</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.box, { backgroundColor: "#dcfce7" }]} />
        <Text style={styles.label}>Invited by</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  legend: {
    borderTopWidth: 1,
    borderColor: "#e5e7eb",
    paddingTop: 12,
    marginTop: 8,
    gap: 6,
  },
  title: {
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 4,
    color: "#374151", 
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  box: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#9ca3af",
  },
  label: {
    fontSize: 13,
    color: "#374151", 
  },
});
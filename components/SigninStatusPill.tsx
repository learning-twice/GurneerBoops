import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function StatusPill({ phase }: { phase?: string }) {
  let icon: React.ReactNode = null;
  let text: string | null = null;
  const containerStyle: any[] = [styles.pill, styles.hidden];

  if (phase === "logging-in") {
    icon = <ActivityIndicator size="small" />;
    text = "Signing you in…";
    containerStyle.push(styles.neutral, { opacity: 1 });
  } else if (phase === "logged-in") {
    icon = <Ionicons name="checkmark-circle" size={18} color="#0a7f3f" />;
    text = "Signed in";
    containerStyle.push(styles.success, { opacity: 1 });
  }

  return (
    <View style={containerStyle}>
      {icon}
      {text && <Text style={phase === "logged-in" ? styles.textSuccess : styles.textNeutral}>{text}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    minHeight: 36,
    paddingHorizontal: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  hidden: {
    opacity: 0, // keeps layout but invisible
  },
  neutral: {
    backgroundColor: "#eef2ff",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e0e7ff",
  },
  success: {
    backgroundColor: "#ecfdf5",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#d1fae5",
  },
  textNeutral: {
    color: "#3730a3",
    fontSize: 14,
    fontWeight: "600",
  },
  textSuccess: {
    color: "#065f46",
    fontSize: 14,
    fontWeight: "700",
  },
});
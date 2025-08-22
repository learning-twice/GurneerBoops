import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type InvitePhase = "accepting" | "accepted" | "not-accepted";

export default function InviteStatusPill({ phase }: { phase?: InvitePhase }) {
  let icon: React.ReactNode = null;
  let text: string | null = null;
  const containerStyle: any[] = [styles.pill, styles.hidden];

  if (phase === "accepting") {
    icon = <ActivityIndicator size="small" />;
    text = "Accepting invite…";
    containerStyle.push(styles.neutral, { opacity: 1 });
  } else if (phase === "accepted") {
    icon = <Ionicons name="checkmark-circle" size={18} color="#0a7f3f" />;
    text = "Invite accepted";
    containerStyle.push(styles.success, { opacity: 1 });
  } else if (phase === "not-accepted") {
    icon = <Ionicons name="close-circle" size={18} color="#991b1b" />;
    text = "Invite not accepted";
    containerStyle.push(styles.error, { opacity: 1 });
  }

  return (
    <View style={containerStyle}>
      {icon}
      {text && (
        <Text
          style={phase === "accepted" ? styles.textSuccess : phase === "not-accepted" ? styles.textError : styles.textNeutral}
        >
          {text}
        </Text>
      )}
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
  error: {
    backgroundColor: "#fef2f2",
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#fecaca",
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
  textError: {
    color: "#991b1b",
    fontSize: 14,
    fontWeight: "700",
  },
});
import { useAuth } from "@/AuthContext";
import Page from "@/components/Page";
import { useEffect, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { deleteUser } from "@/lib/api";

export default function SettingsScreen() {
  const { user, signOut } = useAuth();

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteUser();
              await signOut();
            } catch (e) {
              console.error("Error deleting account:", e);
              Alert.alert("Error", "Could not delete account.");
            }
          },
        },
      ]
    );
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Page style={styles.page}>
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.greeting}>See you soon,</Text>
            <Text style={styles.username}>{user?.full_name || "User"}</Text>
          </View>

          <TouchableOpacity
            style={[styles.actionButton, styles.logoutButton]}
            activeOpacity={0.9}
            onPress={signOut}
          >
            <Text style={styles.actionText}>Log Out</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            activeOpacity={0.9}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.actionText}>Delete Account</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomAccent} />
      </Animated.View>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f0fdfa",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundCircle1: {
    position: "absolute",
    top: "12%",
    right: "-12%",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(75, 197, 196, 0.08)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: "18%",
    left: "-10%",
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "rgba(64, 224, 208, 0.07)",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 28,
    width: "100%",
    maxWidth: 420,
    padding: 24,
    shadowColor: "#40e0d0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(64, 224, 208, 0.12)",
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 18,
    color: "#1f2937",
    fontWeight: "600",
    marginBottom: 6,
  },
  username: {
    fontSize: 26,
    fontWeight: "900",
    color: "#4bc5c4",
  },
  actionButton: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logoutButton: {
    backgroundColor: "#4bc5c4",
    shadowColor: "#4bc5c4",
  },
  deleteButton: {
    backgroundColor: "#ef4444", 
    shadowColor: "#ef4444",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  bottomAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: "#4bc5c4",
  },
});

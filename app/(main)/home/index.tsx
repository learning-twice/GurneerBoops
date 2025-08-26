import ConnectionList from "@/components/ConnectionsList";
import Page from "@/components/Page";
import { createInvite } from "@/lib/api";
import { useEffect, useRef } from "react";
import {
  Animated,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAppContext } from "@/AppContext";

export default function ConnectionsScreen() {
  const { user } = useAppContext();
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

  const handleCreateInvite = async () => {
    try {
      const invite = await createInvite(user.id);
      await Share.share({
        message: `Hi! Use this code to Boop with me: https://boopapp.site/join/${invite.id}`,
      });
      console.log("Invite ID:", invite.id);
    } catch (e) {
      console.error(e);
    }
  };

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
          {}
          <View style={styles.header}>
            <Text style={styles.greeting}>👋 Heya</Text>
            <Text style={styles.username}>{user.full_name}!</Text>

            <TouchableOpacity
              style={styles.inviteButton}
              activeOpacity={0.9}
              onPress={handleCreateInvite}
            >
              <Text style={styles.inviteText}>+ Invite a Friend</Text>
            </TouchableOpacity>
          </View>

          {}
          <View style={styles.connectionsWrapper}>
            <Text style={styles.sectionTitle}>Your Connections</Text>
            <ConnectionList />
          </View>
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
    top: "10%",
    right: "-12%",
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "rgba(75, 197, 196, 0.08)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: "15%",
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
    flex: 1,
    padding: 20,
    shadowColor: "#40e0d0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(64, 224, 208, 0.12)",
    marginBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  greeting: {
    fontSize: 20,
    color: "#1f2937",
    fontWeight: "600",
    marginBottom: 10,
  },
  username: {
    fontSize: 28,
    fontWeight: "900",
    color: "#4bc5c4",
    marginBottom: 20,
  },
  inviteButton: {
    backgroundColor: "#4bc5c4",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: "#4bc5c4",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
  },
  inviteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  connectionsWrapper: {
    flex: 1, 
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#1f2937",
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

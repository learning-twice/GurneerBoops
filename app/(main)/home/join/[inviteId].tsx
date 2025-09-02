import { useEffect, useState, useRef } from "react";
import { Alert, StyleSheet, Animated, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import Page from "@/components/Page";
import { acceptInvite } from "@/lib/api";
import { useAppContext } from "@/AppContext";
import InviteStatusPill from "@/components/StatusPill";
import { Text } from "@react-navigation/elements";

type InvitePhase = "accepting" | "accepted" | "not-accepted";

export default function AcceptInvite() {
  const [phase, setPhase] = useState<InvitePhase>("accepting");
  const { refreshConnections } = useAppContext();
  const { inviteId } = useLocalSearchParams();

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

    handleAcceptInvite();
  }, []);

  const handleAcceptInvite = async () => {
    try {
      await acceptInvite(inviteId);
      setPhase("accepted");
      await refreshConnections();

      Alert.alert(
        "Connection Successful",
        "You’re now connected! Check your connections on the home screen.",
        [{ text: "OK", onPress: () => router.dismissAll() }]
      );
    } catch (e: any) {
      console.error(e);
      setPhase("not-accepted");
      Alert.alert("Error", String(e), [
        { text: "OK", onPress: () => router.dismissAll() },
      ]);
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
        {/* Subtle decorative circles */}
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />

        <View style={styles.card}>
          <Text style={styles.title}>
            {phase === "accepting"
              ? "Connecting..."
              : phase === "accepted"
              ? "Connected!"
              : "Connection Failed"}
          </Text>
          <InviteStatusPill phase={phase} />
        </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    position: "relative",
  },
  backgroundCircle1: {
    position: "absolute",
    top: "20%",
    right: "-10%",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(75, 197, 196, 0.08)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: "15%",
    left: "-12%",
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
    padding: 32,
    alignItems: "center",
    shadowColor: "#40e0d0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: "rgba(64, 224, 208, 0.12)",
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1f2937",
    marginBottom: 20,
    textAlign: "center",
  },
});

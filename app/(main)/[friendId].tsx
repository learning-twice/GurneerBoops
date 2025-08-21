import { useEffect, useRef, useState } from "react";
import {
  Text,
  Alert,
  TextInput,
  StyleSheet,
  View,
  ScrollView,
  Animated,
  Pressable,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { findProfile } from "@/lib/api";
import { sendPushNotification } from "@/lib/notifications";
import KeyboardScreen from "@/components/KeyboardScreen";

export default function Friend() {
  const { friendId } = useLocalSearchParams();
  const [friend, setFriend] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");


  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    async function getFriend() {
      const friend = await findProfile(friendId);
      setFriend(friend);
    }
    getFriend();

    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 60,
        friction: 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSend = async () => {
    if (!title || !message) {
      Alert.alert("Please enter a title and message");
      return;
    }
    await sendPushNotification(friend.expo_push_token, title, message);
    Alert.alert("Boop Sent!");
    setTitle("");
    setMessage("");
  };

  if (!friend) return null;

  return (
    <KeyboardScreen>
      <View style={styles.container}>
    
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />

       
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
            },
          ]}
        >
          <ScrollView
            contentContainerStyle={styles.cardContent}
            showsVerticalScrollIndicator={false}
          >
        
            <Text style={styles.header}>Send a Boop to</Text>
            <Text style={styles.friendName}>{friend.full_name}!</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter title..."
                placeholderTextColor="rgba(31,41,55,0.4)"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Message</Text>
              <TextInput
                style={[styles.input, styles.messageInput]}
                value={message}
                onChangeText={setMessage}
                placeholder="Enter your message..."
                placeholderTextColor="rgba(31,41,55,0.4)"
                multiline
              />
            </View>

            <Pressable style={styles.sendButton} onPress={handleSend}>
              <Text style={styles.sendButtonText}>Send Boop!</Text>
            </Pressable>
          </ScrollView>
        </Animated.View>
        <View style={styles.bottomAccent} />
      </View>
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0fdfa",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundCircle1: {
    position: "absolute",
    top: "5%",
    right: "-12%",
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(75, 197, 196, 0.08)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: "10%",
    left: "-10%",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(64, 224, 208, 0.07)",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    borderRadius: 28,
    backgroundColor: "#fff",
    shadowColor: "#40e0d0",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 20,
    overflow: "hidden",
  },
  cardContent: {
    padding: 28,
    alignItems: "center",
  },
  header: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1f2937",
    textAlign: "center",
    marginBottom: 12,
  },
  friendName: {
    fontSize: 24,
    fontWeight: "900",
    color: "#4bc5c4",
    textAlign: "center",
    marginBottom: 28,
  },
  inputContainer: {
    marginBottom: 18,
    width: "100%",
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
    color: "#4bc5c4",
  },
  input: {
    borderWidth: 1,
    borderColor: "rgba(64,224,208,0.3)",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#4bc5c4",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  sendButton: {
    marginTop: 24,
    backgroundColor: "#4bc5c4",
    paddingVertical: 16,
    borderRadius: 18,
    shadowColor: "#4bc5c4",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
    alignItems: "center",
    width: "100%",
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "800",
  },
  bottomAccent: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: "#4bc5c4",
  },
  backButton: {
  alignSelf: "flex-start",
  marginBottom: 16,
  paddingVertical: 6,
  paddingHorizontal: 12,
  borderRadius: 12,
  backgroundColor: "rgba(75,197,196,0.1)",
},
backButtonText: {
  color: "#4bc5c4",
  fontSize: 14,
  fontWeight: "700",
},
});

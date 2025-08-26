import { useState } from "react";
import { Text, Alert, TextInput, StyleSheet, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { sendPushNotification } from "@/lib/notifications";
import KeyboardScreen from "@/components/KeyboardScreen";
import { useAppContext } from "@/AppContext";

export default function Friend() {
  const { friendId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { connections } = useAppContext();

  const friend = connections
    .map((c) => (c.inviter?.id === friendId ? c.inviter : c.invitee?.id === friendId ? c.invitee : null))
    .find(Boolean);

  if (!friend) return null;

  const handleSend = async () => {
    if (!title || !message) {
      Alert.alert("Missing Info", "Please enter both a title and message.");
      return;
    }
    try {
      setLoading(true);
      await sendPushNotification(friend.expo_push_token, title, message);
      Alert.alert("Success", "Your boop has been sent!");
      setTitle("");
      setMessage("");
    } catch {
      Alert.alert("Error", "Could not send notification. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardScreen>
      <View style={styles.container}>
        <Text style={styles.heading}>Send a Boop</Text>
        <Text style={styles.subheading}>
          To <Text style={styles.friendName}>{friend.full_name}</Text>
        </Text>

        <View style={styles.card}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              style={styles.input}
              value={title}
              onChangeText={setTitle}
              placeholder="Enter a short title"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Message</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              value={message}
              onChangeText={setMessage}
              placeholder="Write your message…"
              placeholderTextColor="#9ca3af"
              multiline
            />
          </View>

          <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleSend} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Send Boop</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subheading: {
    fontSize: 15,
    color: "#6b7280",
    marginBottom: 20,
  },
  friendName: {
    fontWeight: "600",
    color: "#111827",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
    color: "#374151",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#111827",
  },
  messageInput: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#4f46e5",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
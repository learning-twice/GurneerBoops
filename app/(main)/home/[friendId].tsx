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
    .map((c: { inviter: { id: string | string[]; }; invitee: { id: string | string[]; }; }) => (c.inviter?.id === friendId ? c.inviter : c.invitee?.id === friendId ? c.invitee : null))
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
    backgroundColor: "#f0fdfa", 
    justifyContent: "center",
  },
  heading: {
    fontSize: 26,
    fontWeight: "900",
    color: "#1f2937",
    marginBottom: 6,
    textAlign: "center",
  },
  subheading: {
    fontSize: 16,
    color: "#6b7280",
    marginBottom: 20,
    textAlign: "center",
  },
  friendName: {
    fontWeight: "700",
    color: "#4bc5c4", 
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 24, 
    padding: 24,
    shadowColor: "#40e0d0",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 8,
    color: "#1f2937",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 14, 
    padding: 14,
    fontSize: 16,
    backgroundColor: "#f9fafb",
    color: "#111827",
  },
  messageInput: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#4bc5c4", 
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    shadowColor: "#4bc5c4",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "700",
  },
});
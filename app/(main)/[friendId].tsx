import KeyboardScreen from "@/components/KeyboardScreen";
import { findProfile } from "@/lib/api";
import { sendPushNotification } from "@/lib/notifications";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function Friend() {
  const { id } = useLocalSearchParams();
  const [friend, setFriend] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getFriend() {
      const friend = await findProfile(id);
      setFriend(friend);
    }

    getFriend();
  }, []);

  const handleSend = async () => {
    if (!title || !message) {
      Alert.alert("Please enter a title and message");
      return;
    }

    await sendPushNotification(friend.expo_push_token, title, message);
    Alert.alert("Boop Sent!");
  };

  if (!friend) return null;

  return (
    <KeyboardScreen>
      <Text>Friends!</Text>
      <Text style={styles.friendName}>{friend.full_name}</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Notification Title</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Enter title..." />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Notification Message</Text>
        <TextInput
          style={[styles.input, styles.messageInput]}
          value={message}
          onChangeText={setMessage}
          placeholder="Enter message..."
          multiline
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Send Boop!" onPress={handleSend} />
      </View>
    </KeyboardScreen>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 4,
    fontSize: 14,
    color: "#666",
  },
  friendName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  messageInput: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: "hidden",
  },
});
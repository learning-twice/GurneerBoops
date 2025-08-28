import { useAppContext } from "@/AppContext";
import KeyboardScreen from "@/components/KeyboardScreen";
import { sendPushNotification } from "@/lib/notifications";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useAudioPlayer } from "expo-audio"
import { Button } from "react-native";

const sounds: any = {
  "haha.wav": require("@/assets/sounds/haha.wav"),
  "offer_x.wav": require("@/assets/sounds/offer_x.wav"),
  "daddy.wav": require("@/assets/sounds/daddy.wav"),
  "good_morning.wav": require("@/assets/sounds/good_morning.wav"),
  "questions.wav": require("@/assets/sounds/questions.wav"),
  "be_quiet.wav": require("@/assets/sounds/be_quiet.wav"),
  "googleit.wav": require("@/assets/sounds/googleit.wav"),
  "HiyaGeorgie.wav": require("@/assets/sounds/HiyaGeorgie.wav"),
  "bye-bye.wav": require("@/assets/sounds/bye-bye.wav"),
};

export default function Friend() {
  const { friendId } = useLocalSearchParams();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { connections } = useAppContext();
  const [sound, setSound] = useState("default");
  const player = useAudioPlayer(sounds[sound]);

  const playSound = async () => {
    console.log(sound);
    if (sound !== "default") {
      player.seekTo(0);
      player.play();
    }
  };

  const friend = connections
    .map(
      (c: {
        inviter: { id: string | string[] };
        invitee: { id: string | string[] };
      }) =>
        c.inviter?.id === friendId
          ? c.inviter
          : c.invitee?.id === friendId
          ? c.invitee
          : null
    )
    .find(Boolean);

  if (!friend) return null;

  const handleSend = async () => {
    if (!title || !message) {
      Alert.alert("Missing Info", "Please enter both a title and message.");
      return;
    }
    try {
      setLoading(true);
      await sendPushNotification({expoPushToken:friend.expo_push_token, title, body:message, sound});
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
          <Text style={styles.label}>Sound</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={sound}
              onValueChange={(itemValue) => setSound(itemValue)}
               itemStyle={{ height: 100, fontSize: 16 }}
            >
            <Picker.Item label="Default" value="default" />
            <Picker.Item label="Nelson" value="haha.wav" />
            <Picker.Item label="Godfather" value="offer_x.wav" />
            <Picker.Item label="Daddy" value="daddy.wav" />
            <Picker.Item label="Good Morning" value="good_morning.wav" />
            <Picker.Item label="Questions" value="questions.wav" />
              <Picker.Item label="Be Quiet" value="be_quiet.wav" />
                <Picker.Item label="Bye-bye" value="bye-bye.wav" />
                  <Picker.Item label="Hiya" value="HiyaGeorgie.wav" />
                    <Picker.Item label="Google It" value="googleit.wav" />
             
            </Picker>
          </View>
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSend}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send Boop</Text>
            )}
        
          </TouchableOpacity>
           <TouchableOpacity style={styles.button} onPress={playSound}>
  <Text style={styles.buttonText}>▶️ Play Sound</Text>
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

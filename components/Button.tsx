import { Pressable, Text, StyleSheet } from "react-native";

type ButtonProps = {
  text: string;
  onPress?: () => void;
};

export default function Button({ text, onPress = () => {} }: ButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && { backgroundColor: "#d00" }, 
      ]}
      onPress={onPress}
    >
      <Text style={styles.buttonText}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#1E90FF",
    borderRadius: 6,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
});
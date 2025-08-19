import React from "react";
import { View, KeyboardAvoidingView, StyleSheet, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

const KeyboardScreen = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>{children}</View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardScreen;
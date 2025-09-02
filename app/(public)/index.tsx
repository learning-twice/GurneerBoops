import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, StyleSheet, Text, View } from "react-native";
import Page from "@/components/Page";
import SignInBlock from "@/components/SigninBlock";
import icon from "./../../assets/images/icon.png";

export default function SignInScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
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

  return (
    <Page style={styles.page}>
      <Animated.View
        style={[
          styles.container,
          { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
        ]}
      >
        {/* Background shapes */}
        <View style={styles.backgroundCircle1} />
        <View style={styles.backgroundCircle2} />
        <View style={styles.backgroundGradient} />

        {/* Card with logo and buttons */}
        <Animated.View style={[styles.card, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.logoContainer}>
            <View style={styles.logoGlow} />
            <Image source={icon} style={styles.logo} resizeMode="contain" />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.title}>
              <Text style={styles.titleAccent}>Boop</Text>
            </Text>
          </View>

          {/* SignInBlock handles Google + Apple buttons */}
          <SignInBlock />
        </Animated.View>

        <View style={styles.bottomAccent} />
      </Animated.View>
    </Page>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0fdfa",
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 24,
    position: "relative",
    width: "100%",
  },
  backgroundCircle1: {
    position: "absolute",
    top: "15%",
    right: "-10%",
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(75, 197, 196, 0.08)",
  },
  backgroundCircle2: {
    position: "absolute",
    bottom: "20%",
    left: "-15%",
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "rgba(64, 224, 208, 0.07)",
  },
  backgroundGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(75, 197, 196, 0.02)",
  },
  card: {
    backgroundColor: "#ffffff",
    paddingVertical: 44,
    paddingHorizontal: 28,
    borderRadius: 28,
    width: "100%",
    maxWidth: 380,
    alignItems: "center",
    shadowColor: "#40e0d0",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: "rgba(64, 224, 208, 0.12)",
  },
  logoContainer: {
    position: "relative",
    marginBottom: 28,
  },
  logoGlow: {
    position: "absolute",
    top: -12,
    left: -12,
    right: -12,
    bottom: -12,
    borderRadius: 90,
    backgroundColor: "rgba(75, 197, 196, 0.2)",
    shadowColor: "#4bc5c4",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 28,
  },
  logo: {
    width: 120,
    height: 120,
    zIndex: 2,
  },
  textContainer: {
    alignItems: "center",
    marginBottom: 28,
  },
  title: {
    fontSize: 48,
    fontWeight: "900",
    color: "#1f2937",
    marginBottom: 6,
    textAlign: "center",
    lineHeight: 54,
  },
  titleAccent: {
    color: "#4bc5c4",
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


import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAppContext } from "@/AppContext";
import Page from "@/components/Page";
import { useEffect } from "react";
import * as Linking from "expo-linking";

export default () => {

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="house" color={color} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <MaterialIcons size={28} name="settings" color={color} />,
        }}
      />

      <Tabs.Screen
        name="[freindId]"
        options={{
          title: "Send Boop!",
          href: null,
        }}
      />

      <Tabs.Screen
        name="join"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};
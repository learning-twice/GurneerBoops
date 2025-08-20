import { addPushToken } from "@/api";
import { registerForPushNotificationsAsync } from "@/notifications";
import { useUser } from "@/UserContext";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { useEffect } from "react";

export default () => {
  const { user } = useUser();

  useEffect(() => {
    try {
      regToken();
    } catch (e) {
      console.error(e);
    }
  }, []);

  const regToken = async () => {
    const token = await registerForPushNotificationsAsync();
    if (token) await addPushToken(user, token);
  };

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
        name="[id]"
        options={{
          title: "Send Boop!",
          href: null,
        }}
      />

      <Tabs.Screen
        name="join/[inviteid]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
};
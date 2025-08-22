import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
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

      {/* <Tabs.Screen
        name="[friendId]"
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
      /> */}
    </Tabs>
  );
};
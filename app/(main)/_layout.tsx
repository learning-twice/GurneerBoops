
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";
import { useAppContext } from "@/AppContext";
import Page from "@/components/Page";


export default () => {
 const { loaded } = useAppContext();
 if (!loaded) {
    return (
      <Page>
        <ActivityIndicator />
      </Page>
    );
  }

  

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
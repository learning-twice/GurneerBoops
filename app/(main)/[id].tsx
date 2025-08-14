import Page from "@/components/Page";

import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Friend() {
  const { id } = useLocalSearchParams();
  return (
    <Page>
      <Text>Friends!</Text>
      <Text>{id}</Text>
    </Page>
  );
}
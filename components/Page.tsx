import { View, StyleSheet } from "react-native";
import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  style?: any;
};

export default function Page({ children, style }: PageProps) {
  return <View style={[styles.container, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,         
    backgroundColor: "#fff",
  },
});

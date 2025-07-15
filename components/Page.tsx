import { View } from "react-native";
import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
  style?: any;
};

export default function Page({ children, style }: PageProps) {
  return <View style={[{ flex: 1 }, style]}>{children}</View>;
}
import { Text, TextProps, StyleProp, TextStyle } from "react-native";

type Props = TextProps & {
  style?: StyleProp<TextStyle>;
};

export function H1({ children, style, ...rest }: Props) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: 64,
          fontWeight: "bold",
          color: "#000", // or from a theme
          textAlign: "center",
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}

export function H3({ children, style, ...rest }: Props) {
  return (
    <Text
      {...rest}
      style={[
        {
          fontSize: 18,
          fontWeight: "600",
          color: "#444", // or from a theme
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
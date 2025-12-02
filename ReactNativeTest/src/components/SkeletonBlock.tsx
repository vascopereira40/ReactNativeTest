import React from "react";
import { View, StyleSheet } from "react-native";
import { Spacing } from "../styles/globals";

type Props = {
  height: number;
  width?: number | string;
  style?: object;
  testID?: string;
};

export const SkeletonBlock: React.FC<Props> = ({
  height,
  width = "100%",
  style,
  testID,
}) => {
  return (
    <View testID={testID} style={[styles.base, { height, width }, style]} />
  );
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#e0e0e0",
    borderRadius: Spacing.sm,
    overflow: "hidden",
  },
});

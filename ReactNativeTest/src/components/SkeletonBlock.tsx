import React from "react";
import { View, StyleSheet } from "react-native";
import { Spacing } from "../styles/globals";

type Props = {
  height: number;
  width?: number | string;
  style?: object;
};

export const SkeletonBlock: React.FC<Props> = ({
  height,
  width = "100%",
  style,
}) => {
  return <View style={[styles.base, { height, width }, style]} />;
};

const styles = StyleSheet.create({
  base: {
    backgroundColor: "#e0e0e0",
    borderRadius: Spacing.sm,
    overflow: "hidden",
  },
});

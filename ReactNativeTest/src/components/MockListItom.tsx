import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Colors, Spacing, Typography } from "../styles/globals";

type Props = {
  title: string;
  description: string;
  image?: string;
};

export const MockListItem: React.FC<Props> = ({
  title,
  description,
  image,
}) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: image ?? "https://via.placeholder.com/80" }}
        style={styles.image}
      />

      <View style={styles.right}>
        <Text style={Typography.subtitle}>{title}</Text>
        <Text style={Typography.small}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: Spacing.md,
    backgroundColor: Colors.surface,
    marginBottom: Spacing.sm,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 6,
    backgroundColor: Colors.skeleton,
    marginRight: Spacing.md,
  },
  right: {
    flex: 1,
    justifyContent: "center",
  },
});

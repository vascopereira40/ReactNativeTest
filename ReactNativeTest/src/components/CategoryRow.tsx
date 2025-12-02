import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CategoryNode } from "../types/categories";

type Props = {
  category: CategoryNode;
  onPress: () => void;
};

export const CategoryRow: React.FC<Props> = ({ category, onPress }) => {
  const hasChildren = category.children && category.children.length > 0;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.left}>
        <Image source={{ uri: category.image }} style={styles.image} />
        <Text style={styles.name}>{category.name}</Text>
      </View>
      <Text style={styles.chevron}>{hasChildren ? "›" : ""}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  chevron: {
    fontSize: 20,
    color: "#ccc",
  },
});

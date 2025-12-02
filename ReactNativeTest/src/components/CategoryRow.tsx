import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { CategoryNode } from "../types/categories";
import { GlobalStyles } from "../styles/globals";
import Octicons from "@expo/vector-icons/Octicons";

type Props = {
  category: CategoryNode;
  onPress: () => void;
};

export const CategoryRow: React.FC<Props> = ({ category, onPress }) => {
  const hasChildren = category.children && category.children.length > 0;

  return (
    <TouchableOpacity
      style={GlobalStyles.categoryRow}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.left}>
        <Image source={{ uri: category.image }} style={styles.image} />
        <Text style={styles.name}>{category.name}</Text>
      </View>
      <Octicons name="chevron-right" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#c9c9c9ff",
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
});

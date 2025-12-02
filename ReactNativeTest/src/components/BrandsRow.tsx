import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { BrandsNode } from "../types/categories";

type Props = {
  brands: BrandsNode;
  onPress: () => void;
};

export const BrandsRow: React.FC<Props> = ({ brands, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      {/* <Image source={{ uri: brands.image }} style={styles.image} /> */}
      <Text style={styles.name}>{brands.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
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
    fontWeight: "600",
  },
  chevron: {
    fontSize: 20,
    color: "#ccc",
  },
});

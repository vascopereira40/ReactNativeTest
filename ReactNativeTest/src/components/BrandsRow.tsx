import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { BrandsNode } from "../types/categories";
import { GlobalStyles } from "../styles/globals";

type Props = {
  brands: BrandsNode;
  onPress: () => void;
};

export const BrandsRow: React.FC<Props> = ({ brands, onPress }) => {
  return (
    <TouchableOpacity
      style={GlobalStyles.brandsRow}
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

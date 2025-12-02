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
  name: {
    fontSize: 16,
    fontWeight: "600",
  },
});

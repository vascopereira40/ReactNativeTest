import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type ProductListRouteProp = RouteProp<
  RootStackParamList,
  "ProductListPlaceholder"
>;

/**
 * ProductListPlaceholderScreen
 *
 * This is a generic placeholder used for:
 *  - PLP (Product Listing Page)
 *  - CLP (Category Landing Page)
 *  - PD  (Product Detail)
 *
 * It simply echoes the route parameters so reviewers can verify
 * that navigation is wired correctly from:
 *  - Leaf categories
 *  - "View all in {CategoryName}"
 *  - Highlight INTERNAL routes (PLP / CLP / PD)
 */

export const ProductListPlaceholderScreen: React.FC = () => {
  const { params } = useRoute<ProductListRouteProp>();
  const { source, id, screenType } = params;

  const title =
    screenType === "PLP"
      ? "Product Listing Page"
      : screenType === "CLP"
      ? "Category Landing Page"
      : "Product Detail";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <View style={styles.badgeRow}>
        <View style={[styles.badge, styles.badgePrimary]}>
          <Text style={styles.badgeText}>{screenType}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Source: {source}</Text>
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Received parameters</Text>
        <Text style={styles.value}>id: {id}</Text>
        <Text style={styles.value}>screenType: {screenType}</Text>
        <Text style={styles.value}>source: {source}</Text>
      </View>

      <Text style={styles.hint}>
        This is a placeholder screen. In a real app this would render a product
        grid, category content, or a product details page.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 32,
    backgroundColor: "#f3f3f3",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
  },
  badgeRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    backgroundColor: "#ddd",
    marginRight: 8,
  },
  badgePrimary: {
    backgroundColor: "#007bff",
  },
  badgeText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  infoBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "white",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  value: {
    fontSize: 13,
    color: "#444",
    marginBottom: 2,
  },
  hint: {
    fontSize: 12,
    color: "#777",
  },
});

import React from "react";
import { View, Text } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { GlobalStyles, Typography } from "../styles/globals";

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
    <View style={[GlobalStyles.screen, { paddingTop: 20 }]}>
      <Text style={Typography.title}>{title}</Text>

      <View style={GlobalStyles.badgeRow}>
        <View style={[GlobalStyles.badge, GlobalStyles.badgePrimary]}>
          <Text style={GlobalStyles.badgeText}>{screenType}</Text>
        </View>
        <View style={GlobalStyles.badge}>
          <Text style={GlobalStyles.badgeText}>Source: {source}</Text>
        </View>
      </View>

      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.label}>Received parameters</Text>
        <Text style={GlobalStyles.value}>id: {id}</Text>
        <Text style={GlobalStyles.value}>screenType: {screenType}</Text>
        <Text style={GlobalStyles.value}>source: {source}</Text>
      </View>

      <Text style={Typography.small}>
        This is a placeholder screen. In a real app this would render a product
        grid, category content, or a product details page.
      </Text>
    </View>
  );
};

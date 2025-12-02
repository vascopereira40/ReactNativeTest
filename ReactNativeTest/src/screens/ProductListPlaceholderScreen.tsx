import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";
import { Colors, GlobalStyles, Spacing, Typography } from "../styles/globals";
import { MockListItem } from "../components/MockListItem";
import { generateMockList } from "../utils/mockList";

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

  const mockList = generateMockList(10);
  const title =
    screenType === "PLP"
      ? "Product Listing Page"
      : screenType === "CLP"
      ? "Category Landing Page"
      : "Product Detail";

  return (
    <View style={[GlobalStyles.screen, { paddingTop: 20 }]}>
      <Text style={[Typography.title, { marginBottom: 10 }]}>{title}</Text>

      <View style={GlobalStyles.card}>
        <Text style={GlobalStyles.label}>Received parameters</Text>
        <Text style={GlobalStyles.value}>id: {id}</Text>
        <Text style={GlobalStyles.value}>screenType: {screenType}</Text>
        <Text style={GlobalStyles.value}>source: {source}</Text>
      </View>

      {/* IG SCREEN TYPE IS PD SHOW DETAIL MOCK IF NOT SHOW LIST */}
      {screenType === "PD" ? (
        <View style={styles.pdContainer}>
          <MockListItem
            title="Mock Product Detail"
            description="This is a simulated product detail screen."
            image="https://placehold.co/400x400/png"
          />
          <Text style={Typography.subtitle}>Description</Text>
          <Text style={Typography.body}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
            dolorum suscipit earum laboriosam soluta. Eveniet debitis vitae
            temporibus facilis odit totam ad maxime, assumenda, nisi esse
            adipisci accusamus corporis praesentium?
          </Text>
          <Text style={[Typography.subtitle, { marginTop: 10 }]}>
            Caracheteristics
          </Text>
          <Text style={Typography.body}>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo
            dolorum suscipit earum laboriosam soluta. Eveniet debitis vitae
            temporibus facilis odit totam ad maxime, assumenda, nisi esse
            adipisci accusamus corporis praesentium?
          </Text>
        </View>
      ) : (
        <FlatList
          data={mockList}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MockListItem
              title={item.title}
              description={item.description}
              image={item.image}
            />
          )}
          contentContainerStyle={{ paddingTop: Spacing.md }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: Spacing.lg,
    backgroundColor: Colors.background,
  },
  meta: {
    ...Typography.small,
    marginBottom: Spacing.md,
  },
  pdContainer: {
    marginTop: Spacing.md,
  },
  detailText: {
    ...Typography.body,
    marginTop: Spacing.md,
  },
});

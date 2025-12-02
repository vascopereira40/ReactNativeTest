import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { GlobalStyles, Typography } from "../styles/globals";
import { generateMockList } from "../utils/mockList";
import { MockListItem } from "../components/MockListItem";

/**
 * BrandListPlaceholderScreen
 *
 * The assignment requires a minimal placeholder screen for brand navigation,
 * and it also asks to show “route parameters received”.
 *
 * In this case, the BrandListPlaceholderScreen receives NO route params,
 * because the Brand node in the mock tree defines:
 *
 *   route: { screen: "BRAND_LIST" }
 *
 * and BrandListPlaceholder has “undefined” as its navigation param type.
 *
 * So this screen shows a clear message: no parameters were passed.
 */

export const BrandListPlaceholderScreen: React.FC = () => {
  const mockBrands = generateMockList(12);
  return (
    <View style={[GlobalStyles.screen, { paddingTop: 20 }]}>
      <Text style={Typography.title}>Brands</Text>
      <View style={GlobalStyles.card}>
        <Text style={styles.detailText}>
          This is the placeholder screen for the Brands section.
        </Text>
        <Text style={styles.detailText}>
          In the mock category tree, the brands node uses:
        </Text>
        <Text style={styles.codeText}>route: {"{ screen: 'BRAND_LIST' }"}</Text>
      </View>

      <FlatList
        data={mockBrands}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <MockListItem title={item.title} description={item.description} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detailText: {
    fontSize: 13,
    color: "#444",
    marginBottom: 4,
  },
  codeText: {
    fontSize: 13,
    fontFamily: "monospace",
    backgroundColor: "#d6d6d6ff",
    padding: 4,
    borderRadius: 6,
  },
});

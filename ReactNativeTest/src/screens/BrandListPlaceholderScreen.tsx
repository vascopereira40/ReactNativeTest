import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, GlobalStyles, Typography } from "../styles/globals";

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
  return (
    <View style={[GlobalStyles.screen, { paddingTop: 20 }]}>
      <Text style={Typography.title}>Brands</Text>

      <View style={styles.infoBox}>
        <Text style={GlobalStyles.label}>Route Parameters Received</Text>
        <Text style={GlobalStyles.value}>
          None (this route does not accept params)
        </Text>
      </View>

      <View style={GlobalStyles.card}>
        <Text style={styles.detailText}>
          This is the placeholder screen for the Brands section.
        </Text>
        <Text style={styles.detailText}>
          In the mock category tree, the brands node uses:
        </Text>
        <Text style={styles.codeText}>route: {"{ screen: 'BRAND_LIST' }"}</Text>
      </View>

      <Text style={Typography.small}>
        In a real application, this would render a list of available brands.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    marginVertical: 16,
  },
  detailBox: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
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

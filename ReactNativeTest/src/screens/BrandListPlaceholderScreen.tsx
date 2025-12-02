import React from "react";
import { View, Text, StyleSheet } from "react-native";

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
    <View style={styles.container}>
      <Text style={styles.title}>Brands</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Route Parameters Received</Text>
        <Text style={styles.value}>
          None (this route does not accept params)
        </Text>
      </View>

      <View style={styles.detailBox}>
        <Text style={styles.detailText}>
          This is the placeholder screen for the Brands section.
        </Text>
        <Text style={styles.detailText}>
          In the mock category tree, the brands node uses:
        </Text>
        <Text style={styles.codeText}>route: {"{ screen: 'BRAND_LIST' }"}</Text>
      </View>

      <Text style={styles.hint}>
        In a real application, this would render a list of available brands.
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
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
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
    backgroundColor: "#eee",
    padding: 4,
    borderRadius: 6,
  },
  hint: {
    fontSize: 12,
    color: "#777",
    marginTop: 12,
  },
});

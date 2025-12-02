import React, { useMemo, useState } from "react";
import { View, Text, FlatList, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useHighlights } from "../hooks/useHighlights";
import { useCategoryTree } from "../hooks/useCategoryTree";
import { SearchBar } from "../components/SearchBar";
import { HighlightCard } from "../components/HighlightCard";
import { CategoryRow } from "../components/CategoryRow";
import { BrandsRow } from "../components/BrandsRow";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { HighlightCard as HighlightCardType } from "../types/highlights";
import { CategoryNode, BrandsNode } from "../types/categories";
import { GlobalStyles } from "../styles/globals";
import { SafeAreaView } from "react-native-safe-area-context";
import { ErrorScreen } from "../components/ErrorScreen";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CategoryEntry"
>;

type ListItem =
  | { type: "highlight"; id: "highlight"; cards: HighlightCardType[] }
  | { type: "highlight-skeleton"; id: "highlight-skeleton" }
  | { type: "category"; id: string; category: CategoryNode }
  | { type: "category-skeleton"; id: string }
  | { type: "brands"; id: string; brands: BrandsNode }
  | { type: "brands-skeleton"; id: string };

/**
 * CategoryEntryScreen
 *
 * This is the main entry point for browsing categories.
 *
 * Requirements implemented from Section 2.2 of the test:
 *  - Sticky search bar
 *  - Highlight grid (only when EXACTLY 4 cards are returned)
 *  - Root category list
 *  - Brands row at bottom
 *  - Independent loading skeletons for:
 *      • Highlight grid
 *      • Category rows
 *      • Brands row
 *  - Partial loading (sections appear independently as they load)
 *  - Stale-while-revalidate with “Using cached data” banner
 */

export const CategoryEntryScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [search, setSearch] = useState("");

  // Highlights and Categories are fetched independently.
  // React Query allows partial rendering: one section may finish loading
  // earlier than the other, so each section must show its OWN skeletons
  // instead of blocking the entire screen with a full loader.
  const {
    data: highlights,
    isLoading: highlightsLoading,
    isError: highlightsError,
    refetch: refetchHighlights,
    isUsingCache: highlightsUsingCache,
  } = useHighlights();

  const {
    data: categoryTree,
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
    isUsingCache: categoriesUsingCache,
  } = useCategoryTree();

  // isLoading = still waiting for data
  // isError   = request failed
  // BUT: If cached data exists, we continue showing it and render the
  // “Using cached data” banner instead of an error screen.
  const isLoading = highlightsLoading || categoriesLoading;
  const isError = (highlightsError || categoriesError) && !isLoading;

  const isUsingCache = highlightsUsingCache || categoriesUsingCache;

  // Simple client-side search filtering.
  // Only filters root categories by name
  const filteredCategories = useMemo(() => {
    if (!categoryTree?.categories) return [];
    if (!search.trim()) return categoryTree.categories;
    const q = search.trim().toLowerCase();
    return categoryTree.categories.filter((cat) =>
      cat.name.toLowerCase().includes(q)
    );
  }, [categoryTree, search]);

  /**
   * We build a single mixed list for the FlatList.
   *
   * Items include:
   *  - highlight
   *  - highlight-skeleton
   *  - category
   *  - category-skeleton
   *  - brands
   *  - brands-skeleton
   *
   * This allows each section to:
   *  - Load independently
   *  - Show its own skeletons while loading
   *  - Re-render cleanly when data arrives
   */
  const listItems: ListItem[] = useMemo(() => {
    const items: ListItem[] = [];

    // 1️⃣ HIGHLIGHTS
    if (highlightsLoading) {
      items.push({
        type: "highlight-skeleton",
        id: "highlight-skeleton",
      });
    } else if (highlights && highlights.length === 4) {
      items.push({
        type: "highlight",
        id: "highlight",
        cards: highlights,
      });
    }

    // 2️⃣ CATEGORIES
    if (categoriesLoading) {
      items.push(
        { type: "category-skeleton", id: "cat-skel-1" },
        { type: "category-skeleton", id: "cat-skel-2" },
        { type: "category-skeleton", id: "cat-skel-3" },
        { type: "category-skeleton", id: "cat-skel-4" },
        { type: "category-skeleton", id: "cat-skel-5" }
      );
    } else if (filteredCategories) {
      filteredCategories.forEach((category) => {
        items.push({
          type: "category",
          id: category.id,
          category,
        });
      });
    }

    // 3️⃣ BRANDS
    if (categoriesLoading) {
      items.push({
        type: "brands-skeleton",
        id: "brands-skeleton",
      });
    } else if (categoryTree?.brands) {
      items.push({
        type: "brands",
        id: categoryTree.brands.id,
        brands: categoryTree.brands,
      });
    }

    return items;
  }, [
    highlights,
    highlightsLoading,
    filteredCategories,
    categoriesLoading,
    categoryTree,
  ]);

  const handleRetry = () => {
    refetchHighlights();
    refetchCategories();
  };

  // ---------------------
  // Highlight Section
  // ---------------------
  //
  // Per test requirement (section 2.1):
  //   "Only render the highlight section if exactly 4 cards are returned."
  //
  // Therefore:
  //   • highlight-skeleton when loading
  //   • render highlight grid ONLY if highlights.length === 4
  //   • otherwise hide the entire highlight section completely
  const renderHighlightGrid = (cards: HighlightCardType[]) => {
    if (cards.length !== 4) return null; // extra safety

    return (
      <View style={GlobalStyles.highlightContainer}>
        <Text style={GlobalStyles.sectionTitle}>Highlights</Text>

        <View style={GlobalStyles.highlightGrid}>
          {cards.map((card) => (
            <View key={card.id} style={GlobalStyles.highlightItem}>
              <HighlightCard
                card={card}
                onPress={() => handleHighlightPress(card)}
              />
            </View>
          ))}
        </View>
      </View>
    );
  };

  // Navigation logic matches test requirement:
  //
  //  - Leaf category → ProductListPlaceholder
  //  - Category with children → CategoryLevelScreen
  //  - Brands node → BrandListPlaceholder
  //  - Highlight INTERNAL → ProductListPlaceholder
  //  - Highlight EXTERNAL → open URL via Linking
  const handleHighlightPress = (card: HighlightCardType) => {
    const { route } = card;
    if (route.src === "EXTERNAL") {
      Linking.openURL(route.url).catch(() => {
        // could show toast or alert in real app
      });
      return;
    }

    navigation.navigate("ProductListPlaceholder", {
      source: "highlight",
      id: route.params.id,
      screenType: route.screen,
    });
  };

  const handleCategoryPress = (category: CategoryNode) => {
    if (category.children && category.children.length > 0) {
      navigation.navigate("CategoryLevel", {
        categoryId: category.id,
        categoryName: category.name,
      });
    } else {
      navigation.navigate("ProductListPlaceholder", {
        source: "category",
        id: category.route.params.id,
        screenType: category.route.screen,
      });
    }
  };

  const handleBrandsPress = () => {
    navigation.navigate("BrandListPlaceholder");
  };

  /**
   * renderItem handles ALL list row types:
   *   highlight, highlight-skeleton,
   *   category, category-skeleton,
   *   brands, brands-skeleton
   *
   * This ensures layout is predictable and visually consistent during loading
   * and after data loads.
   */
  const renderItem = ({ item }: { item: ListItem }) => {
    switch (item.type) {
      case "highlight":
        return renderHighlightGrid(item.cards);

      case "highlight-skeleton":
        return (
          <View
            style={GlobalStyles.highlightContainer}
            testID="highlight-skeleton"
          >
            <SkeletonBlock
              height={20}
              width={140}
              style={{ marginBottom: 12 }}
            />
            <View style={GlobalStyles.highlightGrid}>
              <SkeletonBlock style={GlobalStyles.highlightItem} height={120} />
              <SkeletonBlock style={GlobalStyles.highlightItem} height={120} />
              <SkeletonBlock style={GlobalStyles.highlightItem} height={120} />
              <SkeletonBlock style={GlobalStyles.highlightItem} height={120} />
            </View>
          </View>
        );

      case "category":
        return (
          <CategoryRow
            category={item.category}
            onPress={() => handleCategoryPress(item.category)}
          />
        );

      case "category-skeleton":
        return (
          <SkeletonBlock
            testID="category-skeleton"
            height={50}
            style={{ marginBottom: 12 }}
          />
        );

      case "brands":
        return <BrandsRow brands={item.brands} onPress={handleBrandsPress} />;

      case "brands-skeleton":
        return (
          <SkeletonBlock
            testID="brands-skeleton"
            height={70}
            style={{ marginTop: 12 }}
          />
        );

      default:
        return null;
    }
  };

  // --- Hard error (no cache) ---
  if (isError && !categoryTree && !highlights) {
    return <ErrorScreen handleRetry={handleRetry} />;
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[GlobalStyles.screen]}
    >
      {/* Banner shown only if:
           - The latest request failed
           - BUT React Query still has cached data 
          This matches the test requirement:
            “If the call fails but cache exists: show cached data + indicator"  */}
      {isUsingCache && (
        <View style={GlobalStyles.cacheBanner}>
          <Text style={GlobalStyles.cacheText}>Using cached data</Text>
        </View>
      )}

      {/* stickyHeaderIndices={[0]} makes the SearchBar stick to the top,
          creating a modern e-commerce browsing experience. */}
      <FlatList
        data={listItems}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ListHeaderComponent={
          <SearchBar value={search} onChangeText={setSearch} />
        }
        stickyHeaderIndices={[0]} // sticky search bar
        contentContainerStyle={[GlobalStyles.listContent]}
      />
    </SafeAreaView>
  );
};

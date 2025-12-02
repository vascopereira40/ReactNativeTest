import React, { useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { useCategoryTree } from "../hooks/useCategoryTree";
import { CategoryNode } from "../types/categories";
import { CategoryRow } from "../components/CategoryRow";
import { SkeletonBlock } from "../components/SkeletonBlock";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyles } from "../styles/globals";
import Octicons from "@expo/vector-icons/Octicons";
import { ErrorScreen } from "../components/ErrorScreen";

type CategoryLevelRouteProp = RouteProp<RootStackParamList, "CategoryLevel">;
type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CategoryLevel"
>;

/**
 * CategoryLevelScreen
 *
 * For a category that has children:
 *  - Header handled by navigator (back + category name)
 *  - First row: “View all in {CategoryName}” → uses category.route
 *  - Then list all children:
 *      • If child has children → navigate deeper to CategoryLevelScreen
 *      • If leaf → navigate to ProductListPlaceholder
 *  - Supports at least 2 levels of depth via recursive navigation.
 */

const findCategoryById = (
  nodes: CategoryNode[],
  id: string
): CategoryNode | null => {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children && node.children.length > 0) {
      const found = findCategoryById(node.children, id);
      if (found) return found;
    }
  }
  return null;
};

type ListItem =
  | { type: "view-all"; id: "view-all" }
  | { type: "child"; id: string; category: CategoryNode }
  | { type: "skeleton"; id: string };

export const CategoryLevelScreen: React.FC = () => {
  const route = useRoute<CategoryLevelRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { categoryId, categoryName } = route.params;

  const {
    data: categoryTree,
    isLoading,
    isError,
    refetch,
    isUsingCache,
  } = useCategoryTree();

  // Find the current category node within the full tree
  const currentCategory = useMemo(() => {
    if (!categoryTree?.categories) return null;
    return findCategoryById(categoryTree.categories, categoryId);
  }, [categoryTree, categoryId]);

  const children = currentCategory?.children ?? [];

  const listItems: ListItem[] = useMemo(() => {
    const items: ListItem[] = [];

    if (isLoading && !currentCategory) {
      // Initial loading skeletons: view all row + child rows
      items.push({ type: "skeleton", id: "sk-view-all" });
      items.push(
        { type: "skeleton", id: "sk-child-1" },
        { type: "skeleton", id: "sk-child-2" },
        { type: "skeleton", id: "sk-child-3" }
      );
      return items;
    }

    if (!currentCategory) return items;

    // 1️⃣ View all row
    items.push({ type: "view-all", id: "view-all" });

    // 2️⃣ Children
    if (isLoading && children.length === 0) {
      // Background loading but we have no children yet → skeletons
      items.push(
        { type: "skeleton", id: "sk-child-1" },
        { type: "skeleton", id: "sk-child-2" }
      );
    } else {
      children.forEach((child) => {
        items.push({ type: "child", id: child.id, category: child });
      });
    }

    return items;
  }, [isLoading, currentCategory, children]);

  const handleRetry = () => {
    refetch();
  };

  const handleViewAllPress = () => {
    if (!currentCategory) return;

    navigation.navigate("ProductListPlaceholder", {
      source: "category",
      id: currentCategory.route.params.id,
      screenType: currentCategory.route.screen,
    });
  };

  const handleChildPress = (child: CategoryNode) => {
    const hasChildren = child.children && child.children.length > 0;

    if (hasChildren) {
      // Navigate deeper into the tree
      navigation.push("CategoryLevel", {
        categoryId: child.id,
        categoryName: child.name,
      });
    } else {
      // Leaf category → product list placeholder
      navigation.navigate("ProductListPlaceholder", {
        source: "category",
        id: child.route.params.id,
        screenType: child.route.screen,
      });
    }
  };

  const renderItem = ({ item }: { item: ListItem }) => {
    switch (item.type) {
      case "view-all":
        return (
          <TouchableOpacity
            style={styles.viewAllRow}
            onPress={handleViewAllPress}
            activeOpacity={0.8}
          >
            <Text style={styles.viewAllText}>
              View all in {currentCategory?.name ?? categoryName}
              <Octicons
                name="chevron-right"
                size={12}
                color={styles.viewAllText.color}
              />
            </Text>
          </TouchableOpacity>
        );

      case "child":
        return (
          <CategoryRow
            category={item.category}
            onPress={() => handleChildPress(item.category)}
          />
        );

      case "skeleton":
        return <SkeletonBlock height={50} style={{ marginVertical: 6 }} />;

      default:
        return null;
    }
  };

  // Hard error and no cached data
  if (isError && !categoryTree) {
    return <ErrorScreen handleRetry={handleRetry} />;
  }

  // Category not found (edge case)
  if (!isLoading && categoryTree && !currentCategory) {
    return (
      <SafeAreaView
        edges={["bottom", "left", "right"]}
        style={[GlobalStyles.screen, GlobalStyles.center]}
      >
        <Text style={GlobalStyles.errorTitle}>Category not found</Text>
        <Text style={GlobalStyles.errorText}>
          This category could not be found in the tree.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={GlobalStyles.screen}
    >
      {isUsingCache && (
        <View style={GlobalStyles.cacheBanner}>
          <Text style={GlobalStyles.cacheText}>Using cached data</Text>
        </View>
      )}

      <FlatList
        data={listItems}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={GlobalStyles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewAllRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: "flex-end",
  },
  viewAllText: {
    fontSize: 16,
    fontWeight: "600",
    color: "gray",
  },
});

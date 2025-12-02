import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
import { CategoryEntryScreen } from "../screens/CategoryEntryScreen";
import { CategoryLevelScreen } from "../screens/CategoryLevelScreen";
import { ProductListPlaceholderScreen } from "../screens/ProductListPlaceholderScreen";
import { BrandListPlaceholderScreen } from "../screens/BrandListPlaceholderScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="CategoryEntry"
          component={CategoryEntryScreen}
          options={{ title: "Categories" }}
        />
        <Stack.Screen
          name="CategoryLevel"
          component={CategoryLevelScreen}
          options={({ route }) => ({
            title: route.params.categoryName,
          })}
        />
        <Stack.Screen
          name="ProductListPlaceholder"
          component={ProductListPlaceholderScreen}
          options={{ title: "Products" }}
        />
        <Stack.Screen
          name="BrandListPlaceholder"
          component={BrandListPlaceholderScreen}
          options={{ title: "Brands" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

import React from "react";
import { View, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../types/navigation";

type Props = {
  route: RouteProp<RootStackParamList, "ProductListPlaceholder">;
};

export const ProductListPlaceholderScreen: React.FC<Props> = ({ route }) => {
  const { source, id, screenType } = route.params;

  return (
    <View>
      <Text>ProductListPlaceholderScreen</Text>
      <Text>Source: {source}</Text>
      <Text>ID: {id}</Text>
      <Text>Screen type: {screenType}</Text>
    </View>
  );
};

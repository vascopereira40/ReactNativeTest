import React from "react";
import { Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { HighlightCard as HighlightCardType } from "../types/highlights";
import { GlobalStyles, Spacing } from "../styles/globals";

type Props = {
  card: HighlightCardType;
  onPress: () => void;
};

export const HighlightCard: React.FC<Props> = ({ card, onPress }) => {
  return (
    <TouchableOpacity
      style={GlobalStyles.highlightCard}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: card.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {card.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 80,
  },
  title: {
    padding: Spacing.sm,
    fontSize: 14,
    fontWeight: "500",
  },
});

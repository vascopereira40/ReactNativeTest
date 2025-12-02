import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Colors, GlobalStyles, Spacing } from "../styles/globals";

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({
  value,
  onChangeText,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder ?? "Search categories"}
        style={GlobalStyles.input}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
  },
});

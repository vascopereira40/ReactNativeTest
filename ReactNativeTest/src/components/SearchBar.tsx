import React, { useRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, GlobalStyles, Spacing } from "../styles/globals";
import Octicons from "@expo/vector-icons/Octicons";

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
  const inputRef = useRef<TextInput>(null);
  const handleClear = () => {
    onChangeText("");
    inputRef.current?.focus();
  };
  return (
    <View style={styles.container}>
      <View style={GlobalStyles.input}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Octicons name="search" size={20} color={Colors.textMuted} />
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder ?? "Search categories"}
            style={{ width: "90%" }}
          />
        </View>
        {value.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
            <Octicons name="x-circle-fill" size={20} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.background,
  },
  clearButton: {
    padding: 4,
  },
});

import { Text, TouchableOpacity } from "react-native";
import { GlobalStyles } from "../styles/globals";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  handleRetry: () => void;
};

//Error Component, to be used as falback
export const ErrorScreen: React.FC<Props> = ({ handleRetry }) => {
  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={[GlobalStyles.screen, GlobalStyles.center]}
    >
      <Text style={GlobalStyles.errorTitle}>Something went wrong</Text>
      <Text style={GlobalStyles.errorText}>Please try again.</Text>
      <TouchableOpacity style={GlobalStyles.retryButton} onPress={handleRetry}>
        <Text style={GlobalStyles.retryText}>Retry</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

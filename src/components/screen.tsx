import React from "react";
import { View, ViewProps } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../store/selectors";
import { themeTokens } from "../theme/theme";

type Props = ViewProps & {
  children: React.ReactNode;
};

export function Screen(props: Props) {
  const mode = useSelector(selectThemeMode);
  const t = themeTokens(mode);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <View style={[{ flex: 1 }, props.style]}>{props.children}</View>
    </SafeAreaView>
  );
}

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "../navigation/RootNavigator";

export function AppRoot() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

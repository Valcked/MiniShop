import React from "react";
import { Text, View } from "react-native";

export function CartScreen() {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Cart</Text>
      <Text>Redux cart + qty +/- + subtotal.</Text>
    </View>
  );
}

import React from "react";
import { Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export function ProductDetailScreen({ route }: Props) {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Product Detail</Text>
      <Text style={{ fontSize: 16 }}>Product ID: {route.params.id}</Text>
      <Text>DummyJSON detail + “Add to cart”.</Text>
    </View>
  );
}

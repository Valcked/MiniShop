import React from "react";
import { Pressable, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export function ProductListScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Product List</Text>
      <Text>DummyJSON productlijst + search.</Text>

      <Pressable
        onPress={() => navigation.navigate("ProductDetail", { id: 1 })}
        style={{
          paddingVertical: 12,
          paddingHorizontal: 12,
          borderRadius: 14,
          borderWidth: 1,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontWeight: "800" }}>Open detail van product #1</Text>
      </Pressable>
    </View>
  );
}

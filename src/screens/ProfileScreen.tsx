import React from "react";
import { Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../navigation/types";
import { selectSubtotal, selectTotalItems } from "../store/selectors";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);

  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>David Valcke</Text>
      <Text style={{ opacity: 0.7 }}>MiniShop — Profile</Text>

      <View style={{ borderWidth: 1, borderRadius: 14, padding: 12, gap: 6 }}>
        <Text style={{ fontWeight: "900" }}>Cart (global)</Text>
        <Text>Items: {totalItems}</Text>
        <Text>Subtotal: € {subtotal}</Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Cart")}
        style={{
          paddingVertical: 12,
          borderRadius: 14,
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "900" }}>Go to Cart</Text>
      </Pressable>
    </View>
  );
}

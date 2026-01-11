import React from "react";
import { Text, View } from "react-native";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../navigation/types";

type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
  return (
    <View style={{ flex: 1, padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Profile</Text>
      <Text>item count + subtotal + theme toggle.</Text>

      <Text style={{ fontWeight: "800" }} onPress={() => navigation.navigate("Cart")}>
        Go to Cart
      </Text>
    </View>
  );
}

import React from "react";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import type { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import type { RootTabParamList } from "../navigation/types";
import { selectSubtotal, selectTotalItems, selectThemeMode } from "../store/selectors";
import { themeTokens } from "../theme/theme";
import { toggleTheme } from "../store/themeSlice";


type Props = BottomTabScreenProps<RootTabParamList, "Profile">;

export function ProfileScreen({ navigation }: Props) {
    const totalItems = useSelector(selectTotalItems);
    const subtotal = useSelector(selectSubtotal);
    const mode = useSelector(selectThemeMode);
    const t = themeTokens(mode);
    const dispatch = useDispatch();

    return (
       <View
      style={{
        flex: 1,
        padding: 16,
        gap: 12,
        backgroundColor: t.bg,
      }}
    >
      <Text
        style={{
          fontSize: 22,
          fontWeight: "900",
          color: t.text,
        }}
      >
        David Valcke
      </Text>

      <Text style={{ opacity: 0.7, color: t.text }}>
        MiniShop — Profile
      </Text>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 14,
          padding: 12,
          gap: 6,
          borderColor: t.border,
          backgroundColor: t.card,
        }}
      >
        <Text style={{ fontWeight: "900", color: t.text }}>
          Cart (global)
        </Text>
        <Text style={{ color: t.text }}>
          Items: {totalItems}
        </Text>
        <Text style={{ color: t.text }}>
          Subtotal: € {subtotal}
        </Text>
      </View>

      <Pressable
        onPress={() => navigation.navigate("Cart")}
        style={{
          paddingVertical: 12,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: t.border,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "900", color: t.text }}>
          Go to Cart
        </Text>
      </Pressable>
      <Pressable
  onPress={() => dispatch(toggleTheme())}
  style={{
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: t.border,
    alignItems: "center",
  }}
>
  <Text style={{ fontWeight: "900", color: t.text }}>
    Toggle theme ({mode})
  </Text>
</Pressable>

    </View>
  );
}

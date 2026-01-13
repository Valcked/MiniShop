import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty, removeItem } from "../store/cartSlice";
import {
  selectCartItemsArray,
  selectSubtotal,
  selectTotalItems,
  selectThemeMode,
} from "../store/selectors";
import { EmptyState } from "../components/ScreenStates";
import { themeTokens } from "../theme/theme";

export function CartScreen() {
  const dispatch = useDispatch();

  const items = useSelector(selectCartItemsArray);
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);
  const mode = useSelector(selectThemeMode);

  const t = themeTokens(mode);

  if (items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
        <EmptyState title="Cart is empty" subtitle="Add something from Home." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "900", color: t.text }}>
          Cart
        </Text>

        {items.map((it) => (
          <View
            key={it.id}
            style={{
              borderWidth: 1,
              borderRadius: 14,
              padding: 12,
              flexDirection: "row",
              gap: 12,
              borderColor: t.border,
              backgroundColor: t.card,
            }}
          >
            <Image
              source={{ uri: it.thumbnail }}
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: "#ddd",
              }}
            />

            <View style={{ flex: 1, gap: 6 }}>
              <Text
                style={{ fontWeight: "900", color: t.text }}
                numberOfLines={1}
              >
                {it.title}
              </Text>

              <Text style={{ color: t.text }}>
                € {it.price} • line: € {it.price * it.qty}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <Pressable
                    onPress={() => dispatch(decQty(it.id))}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: t.border,
                    }}
                  >
                    <Text style={{ fontWeight: "900", color: t.text }}>-</Text>
                  </Pressable>

                  <Text style={{ fontWeight: "900", color: t.text }}>
                    {it.qty}
                  </Text>

                  <Pressable
                    onPress={() => dispatch(incQty(it.id))}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: t.border,
                    }}
                  >
                    <Text style={{ fontWeight: "900", color: t.text }}>+</Text>
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => dispatch(removeItem(it.id))}
                  style={{
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: t.border,
                  }}
                >
                  <Text style={{ fontWeight: "900", color: t.text }}>
                    Remove
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        <View
          style={{
            borderWidth: 1,
            borderRadius: 14,
            padding: 12,
            borderColor: t.border,
            backgroundColor: t.card,
          }}
        >
          <Text style={{ fontWeight: "900", color: t.text }}>Summary</Text>
          <Text style={{ marginTop: 6, color: t.text }}>
            Items: {totalItems}
          </Text>
          <Text style={{ color: t.text }}>Subtotal: € {subtotal}</Text>
        </View>

        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

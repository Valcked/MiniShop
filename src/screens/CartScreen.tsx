import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { decQty, incQty, removeItem } from "../store/cartSlice";
import { selectCartItemsArray, selectSubtotal, selectTotalItems } from "../store/selectors";
import { EmptyState } from "../components/ScreenStates";

export function CartScreen() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItemsArray);
  const totalItems = useSelector(selectTotalItems);
  const subtotal = useSelector(selectSubtotal);

  if (items.length == 0) {
    return <EmptyState title="Cart is empty" subtitle="Add something from Home." />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Cart</Text>

      {items.map((it) => (
        <View
          key={it.id}
          style={{ borderWidth: 1, borderRadius: 14, padding: 12, flexDirection: "row", gap: 12 }}
        >
          <Image
            source={{ uri: it.thumbnail }}
            style={{ width: 64, height: 64, borderRadius: 12, backgroundColor: "#ddd" }}
          />

          <View style={{ flex: 1, gap: 6 }}>
            <Text style={{ fontWeight: "900" }} numberOfLines={1}>
              {it.title}
            </Text>
            <Text>€ {it.price} • line: € {it.price * it.qty}</Text>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                <Pressable
                  onPress={() => dispatch(decQty(it.id))}
                  style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 }}
                >
                  <Text style={{ fontWeight: "900" }}>-</Text>
                </Pressable>

                <Text style={{ fontWeight: "900" }}>{it.qty}</Text>

                <Pressable
                  onPress={() => dispatch(incQty(it.id))}
                  style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 }}
                >
                  <Text style={{ fontWeight: "900" }}>+</Text>
                </Pressable>
              </View>

              <Pressable
                onPress={() => dispatch(removeItem(it.id))}
                style={{ paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10, borderWidth: 1 }}
              >
                <Text style={{ fontWeight: "900" }}>Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ))}

      <View style={{ borderWidth: 1, borderRadius: 14, padding: 12 }}>
        <Text style={{ fontWeight: "900" }}>Summary</Text>
        <Text style={{ marginTop: 6 }}>Items: {totalItems}</Text>
        <Text>Subtotal: € {subtotal}</Text>
      </View>
    </ScrollView>
  );
}

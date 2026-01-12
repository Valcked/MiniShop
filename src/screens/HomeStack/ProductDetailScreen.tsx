import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/dummyjson";
import { ErrorState, LoadingState } from "../../components/ScreenStates";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { selectThemeMode } from "../../store/selectors";
import { themeTokens } from "../../theme/theme";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export function ProductDetailScreen({ route }: Props) {
  const dispatch = useDispatch();

  const mode = useSelector(selectThemeMode);
  const t = themeTokens(mode);

  const id = route.params.id;

  const q = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (q.isLoading) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <LoadingState />
      </View>
    );
  }

  if (q.isError) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <ErrorState
          message={(q.error as Error).message}
          onRetry={() => q.refetch()}
        />
      </View>
    );
  }

  const p = q.data;

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 12,
        backgroundColor: t.bg,
        flexGrow: 1,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "900", color: t.text }}>
        {p.title}
      </Text>

      <Image
        source={{ uri: p.thumbnail }}
        style={{
          width: "100%",
          height: 220,
          borderRadius: 16,
          backgroundColor: "#ddd",
        }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "800", color: t.text }}>€ {p.price}</Text>
        <Text style={{ color: t.text }}>Rating: {p.rating}</Text>
      </View>

      <View
        style={{
          borderWidth: 1,
          borderRadius: 14,
          padding: 12,
          borderColor: t.border,
          backgroundColor: t.card,
        }}
      >
        <Text style={{ lineHeight: 20, color: t.text }}>{p.description}</Text>
      </View>

      <Pressable
        onPress={() => dispatch(addToCart(p))}
        style={{
          marginTop: 8,
          paddingVertical: 12,
          borderRadius: 14,
          borderWidth: 1,
          borderColor: t.border,
          alignItems: "center",
          backgroundColor: t.card,
        }}
      >
        <Text style={{ fontWeight: "900", color: t.text }}>Add to cart</Text>
      </Pressable>

      <Text style={{ opacity: 0.7, color: t.text }}>Product ID: {p.id}</Text>
    </ScrollView>
  );
}

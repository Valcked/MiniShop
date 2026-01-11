import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../../api/dummyjson";
import { EmptyState, ErrorState, LoadingState } from "../../components/ScreenStates";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export function ProductListScreen({ navigation }: Props) {
  const q = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (q.isLoading) {
    return <LoadingState />;
  }

  if (q.isError) {
    return (
      <ErrorState
        message={(q.error as Error).message}
        onRetry={() => q.refetch()}
      />
    );
  }

  const products = q.data ?? [];

  if (products.length == 0) {
    return <EmptyState title="No products" subtitle="DummyJSON returned empty." />;
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>Products</Text>

      {products.map((p: Product) => (
        <Pressable
          key={p.id}
          onPress={() => navigation.navigate("ProductDetail", { id: p.id })}
          style={{
            borderWidth: 1,
            borderRadius: 14,
            padding: 12,
          }}
        >
          <Text style={{ fontWeight: "900" }}>{p.title}</Text>
          <Text style={{ marginTop: 6 }} numberOfLines={2}>
            {p.description}
          </Text>
          <Text style={{ marginTop: 8, fontWeight: "800" }}>€ {p.price}</Text>
        </Pressable>
      ))}
    </ScrollView>
  );
}

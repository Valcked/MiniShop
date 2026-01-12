import React from "react";
import { Image, Pressable, ScrollView ,Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../../api/dummyjson";
import { ErrorState, LoadingState } from "../../components/ScreenStates";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductDetail">;

export function ProductDetailScreen({ route }: Props) {
  const id = route.params.id;

  const q = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
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

  const p = q.data;

  return (
    <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
      <Text style={{ fontSize: 22, fontWeight: "900" }}>{p.title}</Text>

      <Image
        source={{ uri: p.thumbnail }}
        style={{ width: "100%", height: 220, borderRadius: 16, backgroundColor: "#ddd" }}
      />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ fontWeight: "800" }}>€ {p.price}</Text>
        <Text>Rating: {p.rating}</Text>
      </View>

      <Text style={{ lineHeight: 20 }}>{p.description}</Text>

      <Pressable
        onPress={() => {}}
        style={{
          marginTop: 8,
          paddingVertical: 12,
          borderRadius: 14,
          borderWidth: 1,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "900" }}>Add to cart</Text>
      </Pressable>

      <Text style={{ opacity: 0.6 }}>Product ID: {p.id}</Text>
    </ScrollView>
  );
}

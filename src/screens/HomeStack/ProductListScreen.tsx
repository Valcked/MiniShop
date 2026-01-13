import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../../api/dummyjson";
import { EmptyState, ErrorState, LoadingState } from "../../components/ScreenStates";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../../store/selectors";
import { themeTokens } from "../../theme/theme";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";

type Props = NativeStackScreenProps<HomeStackParamList, "ProductList">;

export function ProductListScreen({ navigation }: Props) {
  const mode = useSelector(selectThemeMode);
  const t = themeTokens(mode);

  const [search, setSearch] = useState("");
  const debounced = useDebouncedValue(search, 300);

  const q = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
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
        <ErrorState message={(q.error as Error).message} onRetry={() => q.refetch()} />
      </View>
    );
  }

  const products = q.data ?? [];

  if (products.length === 0) {
    return (
      <View style={{ flex: 1, backgroundColor: t.bg }}>
        <EmptyState title="No products" subtitle="DummyJSON returned empty." />
      </View>
    );
  }

  const filtered = useMemo(() => {
    const s = debounced.trim().toLowerCase();
    if (s.length === 0) {
      return products;
    }

    return products.filter((p) => {
      const hay = `${p.title} ${p.description}`.toLowerCase();
      return hay.includes(s);
    });
  }, [products, debounced]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        gap: 12,
        backgroundColor: t.bg,
        flexGrow: 1,
      }}
    >
      <Text style={{ fontSize: 22, fontWeight: "900", color: t.text }}>Products</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search products…"
        placeholderTextColor={mode === "dark" ? "#AAB3C5" : "#6B7280"}
        style={{
          borderWidth: 1,
          borderColor: t.border,
          backgroundColor: t.card,
          borderRadius: 14,
          paddingHorizontal: 12,
          paddingVertical: 10,
          color: t.text,
        }}
      />

      {filtered.length === 0 ? (
        <EmptyState title="No results" subtitle="Try a different search term." />
      ) : (
        filtered.map((p: Product) => (
          <Pressable
            key={p.id}
            onPress={() => navigation.navigate("ProductDetail", { id: p.id })}
            style={{
              borderWidth: 1,
              borderRadius: 14,
              padding: 12,
              borderColor: t.border,
              backgroundColor: t.card,
            }}
          >
            <Text style={{ fontWeight: "900", color: t.text }}>{p.title}</Text>
            <Text style={{ marginTop: 6, color: t.text }} numberOfLines={2}>
              {p.description}
            </Text>
            <Text style={{ marginTop: 8, fontWeight: "800", color: t.text }}>€ {p.price}</Text>
          </Pressable>
        ))
      )}
    </ScrollView>
  );
}

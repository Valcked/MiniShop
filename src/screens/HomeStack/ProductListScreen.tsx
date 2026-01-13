import React, { useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { HomeStackParamList } from "../../navigation/types";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, Product } from "../../api/dummyjson";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../../components/ScreenStates";
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

  const products = q.data ?? [];

  const filtered = useMemo(() => {
    const s = debounced.trim().toLowerCase();
    if (s.length === 0) {
      return products;
    }

    return products.filter((p: Product) => {
      const hay = `${p.title} ${p.description}`.toLowerCase();
      return hay.includes(s);
    });
  }, [products, debounced]);

  if (q.isLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
        <LoadingState />
      </SafeAreaView>
    );
  }

  if (q.isError) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
        <ErrorState
          message={(q.error as Error).message}
          onRetry={() => q.refetch()}
        />
      </SafeAreaView>
    );
  }

  if (products.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
        <EmptyState title="No products" subtitle="DummyJSON returned empty." />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.bg }}>
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <Text style={{ fontSize: 22, fontWeight: "900", color: t.text }}>
          Products
        </Text>

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
              <Text style={{ marginTop: 8, fontWeight: "800", color: t.text }}>
                € {p.price}
              </Text>
            </Pressable>
          ))
        )}

        <View style={{ height: 16 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

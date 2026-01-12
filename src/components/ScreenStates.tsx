import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../store/selectors";
import { themeTokens } from "../theme/theme";

export function LoadingState() {
  const mode = useSelector(selectThemeMode);
  const t = themeTokens(mode);

  return (
    <View style={{ padding: 16, alignItems: "center" }}>
      <ActivityIndicator />
      <Text style={{ marginTop: 8, color: t.text }}>Loading…</Text>
    </View>
  );
}

export function ErrorState(props: { message: string; onRetry: () => void }) {
  const mode = useSelector(selectThemeMode);
  const t = themeTokens(mode);

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 14,
          padding: 16,
          borderColor: t.border,
          backgroundColor: t.card,
        }}
      >
        <Text style={{ fontWeight: "900", marginBottom: 8, color: t.text }}>
          Error
        </Text>
        <Text style={{ marginBottom: 12, color: t.text }}>{props.message}</Text>

        <Pressable
          onPress={props.onRetry}
          style={{
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: t.border,
            alignSelf: "flex-start",
          }}
        >
          <Text style={{ fontWeight: "800", color: t.text }}>Retry</Text>
        </Pressable>
      </View>
    </View>
  );
}

export function EmptyState(props: { title: string; subtitle?: string }) {
  const mode = useSelector(selectThemeMode);
  const t = themeTokens(mode);

  return (
    <View style={{ padding: 16 }}>
      <View
        style={{
          borderWidth: 1,
          borderRadius: 14,
          padding: 16,
          borderColor: t.border,
          backgroundColor: t.card,
        }}
      >
        <Text style={{ fontWeight: "900", marginBottom: 6, color: t.text }}>
          {props.title}
        </Text>
        {props.subtitle ? (
          <Text style={{ color: t.text }}>{props.subtitle}</Text>
        ) : null}
      </View>
    </View>
  );
}

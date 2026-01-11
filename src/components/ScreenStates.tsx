import React from "react";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

export function LoadingState() {
  return (
    <View style={{ padding: 16, alignItems: "center" }}>
      <ActivityIndicator />
      <Text style={{ marginTop: 8 }}>Loading…</Text>
    </View>
  );
}

export function ErrorState(props: { message: string; onRetry: () => void }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "900", marginBottom: 8 }}>Error</Text>
      <Text style={{ marginBottom: 12 }}>{props.message}</Text>
      <Pressable
        onPress={props.onRetry}
        style={{
          paddingVertical: 10,
          paddingHorizontal: 12,
          borderRadius: 12,
          borderWidth: 1,
          alignSelf: "flex-start",
        }}
      >
        <Text style={{ fontWeight: "800" }}>Retry</Text>
      </Pressable>
    </View>
  );
}

export function EmptyState(props: { title: string; subtitle?: string }) {
  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontWeight: "900", marginBottom: 6 }}>{props.title}</Text>
      {props.subtitle ? <Text>{props.subtitle}</Text> : null}
    </View>
  );
}

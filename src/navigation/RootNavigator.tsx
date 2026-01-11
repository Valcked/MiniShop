import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { HomeStackParamList, RootTabParamList } from "./types";

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function PlaceholderScreen(props: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, fontWeight: "800" }}>{props.title}</Text>
    </View>
  );
}

function ProductListPlaceholder() {
  return <PlaceholderScreen title="ProductList (Home)" />;
}

function ProductDetailPlaceholder() {
  return <PlaceholderScreen title="ProductDetail (Home)" />;
}

function CartPlaceholder() {
  return <PlaceholderScreen title="Cart" />;
}

function ProfilePlaceholder() {
  return <PlaceholderScreen title="Profile" />;
}

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator id="HomeStack">
      <HomeStack.Screen
        name="ProductList"
        component={ProductListPlaceholder}
        options={{ title: "MiniShop" }}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetailPlaceholder}
        options={{ title: "Product" }}
      />
    </HomeStack.Navigator>
  );
}

export function RootNavigator() {
  return (
    <Tab.Navigator id="RootTabs">
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen name="Cart" component={CartPlaceholder} />
      <Tab.Screen name="Profile" component={ProfilePlaceholder} />
    </Tab.Navigator>
  );
}

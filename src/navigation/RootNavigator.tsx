import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { HomeStackParamList, RootTabParamList } from "./types";
import { ProductListScreen } from "../screens/HomeStack/ProductListScreen";
import { ProductDetailScreen } from "../screens/HomeStack/ProductDetailScreen";
import { CartScreen } from "../screens/CartScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { selectThemeMode } from "../store/selectors";


const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator id="HomeStack">
      <HomeStack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "MiniShop" }}
      />
      <HomeStack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Product" }}
      />
    </HomeStack.Navigator>
  );
}

export function RootNavigator() {
  const mode = useSelector(selectThemeMode);

  return (
    <Tab.Navigator
      id="RootTabs"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: mode === "dark" ? "#F2F5F7" : "#101214",
        tabBarInactiveTintColor: mode === "dark" ? "#8A94A6" : "#6B7280",
        tabBarStyle: {
          backgroundColor: mode === "dark" ? "#0B0D10" : "#FFFFFF",
          borderTopColor: mode === "dark" ? "#2A3343" : "#D9DEE7",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "HomeTab") {
            iconName = "home-outline";
          } else if (route.name === "Cart") {
            iconName = "cart-outline";
          } else {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{ title: "Home" }}
      />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

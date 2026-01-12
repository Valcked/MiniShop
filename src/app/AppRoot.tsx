import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "../navigation/RootNavigator";
import { Provider } from "react-redux";
import { store } from "../store/store";


const queryClient = new QueryClient();

export function AppRoot() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </QueryClientProvider>
        </Provider>
    );
}

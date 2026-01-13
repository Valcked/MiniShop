import React, { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer } from "@react-navigation/native";
import { RootNavigator } from "../navigation/RootNavigator";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { hydratePersistedState, subscribePersist } from "../store/persist";
import { ActivityIndicator, View } from "react-native";



const queryClient = new QueryClient();

export function AppRoot() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    let active = true;

    const run = async () => {
      await hydratePersistedState(store);
      subscribePersist(store);

      if (active) {
        setHydrated(true);
      }
    };

    run();

    return () => {
      active = false;
    };
  }, []);

  if (hydrated == false) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
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

import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Store } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const STORAGE_KEY = "minishop.persist.v1";

type PersistedState = {
  cart: RootState["cart"];
  theme: RootState["theme"];
};

function pickPersistedState(state: RootState): PersistedState {
  return {
    cart: state.cart,
    theme: state.theme,
  };
}

export async function hydratePersistedState(store: Store) {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);

    if (raw == null) {
      return;
    }

    const parsed = JSON.parse(raw) as PersistedState | null;

    if (parsed == null) {
      return;
    }

    store.dispatch({ type: "persist/rehydrate", payload: parsed });
  } catch {
  }
}

let saveTimer: ReturnType<typeof setTimeout> | null = null;

export function subscribePersist(store: Store) {
  store.subscribe(() => {
    if (saveTimer != null) {
      clearTimeout(saveTimer);
    }

    saveTimer = setTimeout(async () => {
      const state = store.getState() as RootState;
      const data = pickPersistedState(state);

      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch {
      }
    }, 250);
  });
}

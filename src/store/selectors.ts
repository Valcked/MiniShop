import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "./store";

const selectCartItemsMap = (s: RootState) => s.cart.items;

export const selectCartItemsArray = createSelector(
  [selectCartItemsMap],
  (itemsMap) => Object.values(itemsMap)
);

export const selectTotalItems = createSelector(
  [selectCartItemsArray],
  (items) => items.reduce((sum, it) => sum + it.qty, 0)
);

export const selectSubtotal = createSelector(
  [selectCartItemsArray],
  (items) => items.reduce((sum, it) => sum + it.price * it.qty, 0)
);

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../api/dummyjson";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  qty: number;
};

type CartState = {
  items: Record<number, CartItem>;
};

const initialState: CartState = {
  items: {},
};

function toCartItem(p: Product): CartItem {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    thumbnail: p.thumbnail,
    qty: 1,
  };
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const p = action.payload;
      const existing = state.items[p.id];

      if (existing) {
        existing.qty = existing.qty + 1;
        return;
      }

      state.items[p.id] = toCartItem(p);
    },
    incQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items[id];
      if (item) {
        item.qty = item.qty + 1;
      }
    },
    decQty: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items[id];
      if (item) {
        const next = item.qty - 1;
        if (next <= 0) {
          delete state.items[id];
          return;
        }
        item.qty = next;
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      delete state.items[action.payload];
    },
  },
});

export const { addToCart, incQty, decQty, removeItem } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

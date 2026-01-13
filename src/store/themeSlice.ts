import { createSlice } from "@reduxjs/toolkit";

export type ThemeMode = "light" | "dark";

type ThemeState = {
  mode: ThemeMode;
};

const initialState: ThemeState = {
  mode: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
  extraReducers: (builder) => {
    builder.addCase("persist/rehydrate" as any, (state, action: any) => {
      const payload = action.payload as { theme?: ThemeState } | undefined;
      if (payload?.theme?.mode) {
        state.mode = payload.theme.mode;
      }
    });
  },
});

export const { toggleTheme } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;

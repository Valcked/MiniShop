export type ThemeMode = "light" | "dark";

export function themeTokens(mode: ThemeMode) {
  if (mode === "dark") {
    return {
      bg: "#0B0D10",
      card: "#141821",
      text: "#F2F5F7",
      border: "#2A3343",
    };
  }

  return {
    bg: "#F6F7FB",
    card: "#FFFFFF",
    text: "#101214",
    border: "#D9DEE7",
  };
}

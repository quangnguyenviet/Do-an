import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "gsa_theme";

const THEMES = {
  default: {
    name: "Mặc định",
    label: "Xanh dương",
    accent: "bg-blue-600",
    accentRing: "ring-blue-600",
    dot: "bg-blue-600",
  },
  forest: {
    name: "Rừng xanh",
    label: "Xanh lá",
    accent: "bg-emerald-600",
    accentRing: "ring-emerald-600",
    dot: "bg-emerald-600",
  },
  sunset: {
    name: "Hoàng hôn",
    label: "Cam đỏ",
    accent: "bg-orange-600",
    accentRing: "ring-orange-600",
    dot: "bg-orange-600",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "default";
    } catch {
      return "default";
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const current = THEMES[theme] || THEMES.default;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, current }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
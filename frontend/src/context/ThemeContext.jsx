import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "gsa_theme";

const THEMES = {
  dark: {
    name: "Tối",
    label: "Speedtest",
    accent: "bg-cyan-500",
    accentRing: "ring-cyan-500",
    dot: "bg-cyan-500",
  },
  light: {
    name: "Sáng",
    label: "Trắng",
    accent: "bg-blue-600",
    accentRing: "ring-blue-600",
    dot: "bg-blue-600",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(STORAGE_KEY) || "dark";
    } catch {
      return "dark";
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const current = THEMES[theme] || THEMES.dark;

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
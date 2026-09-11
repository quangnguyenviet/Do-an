import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "ep_theme";

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
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore
    }
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, themes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
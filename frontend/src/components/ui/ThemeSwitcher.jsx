import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-white/10 p-1">
      {Object.entries(themes).map(([key, t]) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          title={t.name}
          className={`h-5 w-5 rounded-full transition ${
            theme === key
              ? `${t.dot} ring-2 ring-offset-1 ring-offset-slate-900`
              : "bg-white/20"
          }`}
        />
      ))}
    </div>
  );
}
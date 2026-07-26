import { useTheme } from "../../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
      {Object.entries(themes).map(([key, t]) => (
        <button
          key={key}
          onClick={() => setTheme(key)}
          title={t.name}
          className={`h-5 w-5 rounded-full transition ${
            theme === key
              ? `${t.dot} ring-2 ring-offset-1 ring-offset-slate-100 dark:ring-offset-slate-800`
              : "bg-slate-300 dark:bg-slate-600"
          }`}
        />
      ))}
    </div>
  );
}
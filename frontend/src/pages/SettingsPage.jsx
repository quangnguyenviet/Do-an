import { useTheme } from "../context/ThemeContext";
import PageHeader from "../components/ui/PageHeader";
import Card from "../components/ui/Card";

const themePreviews = {
  default: {
    name: "Mặc định",
    desc: "Xanh dương — giao diện gốc của EnglishPath",
    colors: ["bg-blue-600", "bg-blue-400", "bg-blue-200", "bg-blue-100"],
  },
  forest: {
    name: "Rừng xanh",
    desc: "Xanh lá — tông màu thiên nhiên, dễ chịu cho mắt",
    colors: ["bg-emerald-600", "bg-emerald-400", "bg-emerald-200", "bg-emerald-100"],
  },
  sunset: {
    name: "Hoàng hôn",
    desc: "Cam đỏ — tông màu ấm áp, năng động",
    colors: ["bg-orange-600", "bg-orange-400", "bg-orange-200", "bg-orange-100"],
  },
};

export default function SettingsPage() {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div>
      <PageHeader title="Cài đặt" description="Tùy chỉnh giao diện và các thiết lập khác." />

      <Card>
        <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Giao diện</h2>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
          Chọn theme màu sắc yêu thích. Thay đổi được áp dụng ngay lập tức.
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          {Object.entries(themePreviews).map(([key, t]) => {
            const isActive = theme === key;
            return (
              <button
                key={key}
                onClick={() => setTheme(key)}
                className={`relative rounded-xl border-2 p-4 text-left transition ${
                  isActive
                    ? "border-slate-900 shadow-md dark:border-slate-50"
                    : "border-slate-200 hover:border-slate-300 dark:border-slate-800 dark:hover:border-slate-600"
                }`}
              >
                {isActive && (
                  <span className="absolute right-2.5 top-2.5 flex h-5 w-5 items-center justify-center rounded-full accent-bg text-[11px] text-white">
                    ✓
                  </span>
                )}

                <div className="mb-3 flex gap-1">
                  {t.colors.map((c, i) => (
                    <div key={i} className={`h-6 w-6 rounded-full ${c}`} />
                  ))}
                </div>

                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{t.name}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t.desc}</p>
              </button>
            );
          })}
        </div>
      </Card>

      <Card className="mt-4">
        <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Theme hiện tại</h2>
        <div className="flex items-center gap-3">
          <div className={`h-4 w-4 rounded-full ${themes[theme].dot}`} />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Đang dùng: <span className="font-medium text-slate-900 dark:text-slate-50">{themes[theme].name}</span>
          </p>
        </div>
      </Card>
    </div>
  );
}
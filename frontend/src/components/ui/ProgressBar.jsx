import clsx from "clsx";

export default function ProgressBar({ value, className, tone = "blue" }) {
  const bar = {
    blue: "bg-blue-600",
    emerald: "bg-emerald-600",
    amber: "bg-amber-500",
    rose: "bg-rose-600",
  }[tone];

  return (
    <div className={clsx("h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800", className)}>
      <div
        className={clsx("h-full rounded-full transition-all", bar)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}

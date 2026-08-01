import clsx from "clsx";

export default function ProgressBar({ value, className, tone = "blue" }) {
  const bar = {
    blue: "bg-cyan-500",
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
  }[tone];

  return (
    <div className={clsx("h-2 w-full overflow-hidden rounded-full bg-white/10", className)}>
      <div
        className={clsx("h-full rounded-full transition-all", bar)}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
}
import Card from "./Card";
import clsx from "clsx";

const toneText = {
  blue: "text-cyan-400",
  emerald: "text-emerald-400",
  amber: "text-amber-400",
  rose: "text-rose-400",
  slate: "text-slate-400",
};

export default function StatCard({ icon: Icon, label, value, tone = "blue", hint }) {
  return (
    <Card className="flex items-start gap-4 glow-box-hover">
      <div className={clsx("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/10", toneText[tone])}>
        {Icon && <Icon size={20} strokeWidth={1.75} />}
      </div>
      <div className="min-w-0">
        <p className="text-sm text-slate-400">{label}</p>
        <p className="mt-0.5 text-2xl font-semibold text-white">{value}</p>
        {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
      </div>
    </Card>
  );
}
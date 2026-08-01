import clsx from "clsx";
import { skillToneClass } from "../../lib/skillColors";

const tones = {
  neutral: "bg-white/10 text-slate-300",
  blue: "bg-cyan-500/20 text-cyan-300",
  emerald: "bg-emerald-500/20 text-emerald-300",
  amber: "bg-amber-500/20 text-amber-300",
  rose: "bg-rose-500/20 text-rose-300",
};

// Pass `skill` (e.g. "Viết") instead of `tone` to color-code by skill rather
// than by status — keeps the two kinds of badge visually distinct.
export default function Badge({ tone = "neutral", skill, children, className }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium",
        skill ? skillToneClass(skill) : tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
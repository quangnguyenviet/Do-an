// Fixed color per skill so a skill tag reads at a glance instead of every
// skill looking identical in blue (see UX audit: skill badges need to be
// scannable, and "Viết" for a student whose weak skill is Viết should not
// look the same as any other skill).
const SKILL_TONES = {
  "Nghe": "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  "Nói": "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300",
  "Đọc": "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "Viết": "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-950 dark:text-fuchsia-300",
  "Từ vựng": "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
  "Ngữ pháp": "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
};

const FALLBACK_TONE = "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";

export function skillToneClass(skill) {
  return SKILL_TONES[skill] || FALLBACK_TONE;
}

// Fixed display order shared by every skill-series chart (line, radar, ...)
export const SKILL_ORDER = Object.keys(SKILL_TONES);

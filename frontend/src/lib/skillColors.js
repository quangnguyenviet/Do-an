// Fixed color per skill so a skill tag reads at a glance instead of every
// skill looking identical in blue (see UX audit: skill badges need to be
// scannable, and "Viết" for a student whose weak skill is Viết should not
// look the same as any other skill).
const SKILL_TONES = {
  "Nghe": "bg-cyan-500/20 text-cyan-300",
  "Nói": "bg-amber-500/20 text-amber-300",
  "Đọc": "bg-emerald-500/20 text-emerald-300",
  "Viết": "bg-fuchsia-500/20 text-fuchsia-300",
  "Từ vựng": "bg-rose-500/20 text-rose-300",
  "Ngữ pháp": "bg-orange-500/20 text-orange-300",
};

const FALLBACK_TONE = "bg-white/10 text-slate-300";

export function skillToneClass(skill) {
  return SKILL_TONES[skill] || FALLBACK_TONE;
}
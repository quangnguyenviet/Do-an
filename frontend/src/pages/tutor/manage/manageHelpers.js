// Shared helpers used across student sub-pages

export const exerciseStatus = {
  graded: { label: "Đã chấm", tone: "emerald" },
  submitted: { label: "Chờ chấm", tone: "amber" },
  assigned: { label: "Đã giao", tone: "neutral" },
};

export const statusOptions = [
  { value: "upcoming", label: "Sắp tới" },
  { value: "in_progress", label: "Đang học" },
  { value: "done", label: "Đã hoàn thành" },
];

export const sessionStatusMeta = {
  done: { label: "Đã hoàn thành", iconTone: "bg-emerald-500 text-white", dotTone: "text-emerald-600 dark:text-emerald-400" },
  in_progress: { label: "Đang học", iconTone: "bg-amber-500 text-white", dotTone: "text-amber-600 dark:text-amber-400" },
  upcoming: { label: "Sắp tới", iconTone: "bg-slate-400 text-white dark:bg-slate-600", dotTone: "text-slate-500 dark:text-slate-400" },
};

export const difficultyOptions = ["Cơ bản", "Trung bình", "Nâng cao"];

export const materialTypeOptions = [
  { value: "doc", label: "Tài liệu" },
  { value: "video", label: "Video" },
];

// The session a tutor most needs to see on opening the page
export function findFocusSession(items) {
  const inProgress = items.find((it) => it.status === "in_progress");
  if (inProgress) return inProgress;
  const upcoming = items.filter((it) => it.status === "upcoming").sort((a, b) => a.session - b.session);
  return upcoming[0] ?? null;
}
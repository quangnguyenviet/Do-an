import { useState } from "react";
import { Sparkles, CheckCircle2, ClipboardCheck } from "lucide-react";
import { gradingQueue as initialQueue } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";

export default function GradingQueue() {
  const [queue, setQueue] = useState(initialQueue.map((g) => ({ ...g, finalScore: g.aiSuggestedScore, feedback: g.aiFeedback, reviewed: false })));
  const [selectedId, setSelectedId] = useState(initialQueue[0]?.id ?? null);
  const selected = queue.find((g) => g.id === selectedId);

  function updateSelected(patch) {
    setQueue((q) => q.map((g) => (g.id === selectedId ? { ...g, ...patch } : g)));
  }

  function approve() {
    updateSelected({ reviewed: true });
  }

  const pending = queue.filter((g) => !g.reviewed);
  const done = queue.filter((g) => g.reviewed);

  return (
    <div>
      <PageHeader
        title="Chấm bài"
        description="AI chấm sơ bộ các bài tự luận/bài nói, bạn duyệt lại điểm và nhận xét trước khi trả kết quả cho học sinh."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2" padded={false}>
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Chờ duyệt ({pending.length})</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pending.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedId(g.id)}
                className={`flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                  selectedId === g.id ? "bg-blue-50/60 dark:bg-blue-950/30" : ""
                }`}
              >
                <Avatar initials={g.studentName.split(" ").slice(-2).map((w) => w[0]).join("")} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{g.studentName}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">{g.title}</p>
                </div>
                <Badge tone="blue">{g.skill}</Badge>
              </button>
            ))}
            {pending.length === 0 && (
              <p className="p-6 text-center text-sm text-slate-400">Không còn bài nào chờ chấm 🎉</p>
            )}
          </div>

          {done.length > 0 && (
            <>
              <div className="border-b border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Đã duyệt ({done.length})</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {done.map((g) => (
                  <div key={g.id} className="flex items-center gap-3 p-4 opacity-60">
                    <Avatar initials={g.studentName.split(" ").slice(-2).map((w) => w[0]).join("")} size="sm" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{g.studentName}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">{g.title}</p>
                    </div>
                    <CheckCircle2 size={16} className="shrink-0 text-emerald-500" />
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>

        <div className="lg:col-span-3">
          {selected ? (
            <Card>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-50">{selected.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selected.studentName} &middot; Nộp ngày {selected.submittedAt}
                  </p>
                </div>
                {selected.reviewed && <Badge tone="emerald">Đã duyệt</Badge>}
              </div>

              {selected.content && (
                <div className="mb-4 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-800/50 dark:text-slate-300">
                  {selected.content}
                </div>
              )}

              <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/60 p-3 dark:border-blue-900 dark:bg-blue-950/30">
                <p className="mb-1 flex items-center gap-1.5 text-xs font-medium text-blue-700 dark:text-blue-300">
                  <Sparkles size={14} /> Gợi ý từ AI
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300">{selected.aiFeedback}</p>
              </div>

              <div className="mb-4 grid grid-cols-[120px_1fr] items-center gap-3">
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Điểm cuối cùng</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step={0.5}
                    min={0}
                    max={selected.aiSuggestedMax}
                    disabled={selected.reviewed}
                    value={selected.finalScore}
                    onChange={(e) => updateSelected({ finalScore: e.target.value })}
                    className="w-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:disabled:bg-slate-800/50"
                  />
                  <span className="text-sm text-slate-400">/ {selected.aiSuggestedMax}</span>
                </div>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Nhận xét cho học sinh</label>
                <textarea
                  rows={3}
                  disabled={selected.reviewed}
                  value={selected.feedback}
                  onChange={(e) => updateSelected({ feedback: e.target.value })}
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:disabled:bg-slate-800/50"
                />
              </div>

              {!selected.reviewed && (
                <Button onClick={approve}>
                  <ClipboardCheck size={16} /> Duyệt điểm & gửi kết quả
                </Button>
              )}
            </Card>
          ) : (
            <Card className="flex items-center justify-center py-16 text-sm text-slate-400">Chọn một bài để chấm</Card>
          )}
        </div>
      </div>
    </div>
  );
}

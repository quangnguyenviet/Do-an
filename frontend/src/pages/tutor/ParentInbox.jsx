import { useState } from "react";
import { Send, Bot, AlertCircle } from "lucide-react";
import { parentThreads as initialThreads, getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import clsx from "clsx";

function bubbleStyle(from) {
  if (from === "tutor")
    return "ml-auto bg-blue-600 text-white";
  if (from === "bot")
    return "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
  return "bg-white border border-slate-200 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-200";
}

export default function ParentInbox() {
  const [threads, setThreads] = useState(initialThreads);
  const [selectedId, setSelectedId] = useState(
    initialThreads.find((t) => t.status === "pending")?.id ?? initialThreads[0]?.id
  );
  const [draft, setDraft] = useState("");

  const selected = threads.find((t) => t.id === selectedId);
  const student = selected && getStudentById(selected.studentId);

  function sendReply() {
    if (!draft.trim()) return;
    setThreads((prev) =>
      prev.map((t) =>
        t.id === selectedId
          ? {
              ...t,
              status: "resolved",
              messages: [
                ...t.messages,
                { id: t.messages.length + 1, from: "tutor", text: draft.trim(), time: "Vừa xong" },
              ],
            }
          : t
      )
    );
    setDraft("");
  }

  return (
    <div>
      <PageHeader
        title="Hỏi đáp phụ huynh"
        description="Bot trả lời tự động trước; câu hỏi bot không xử lý được sẽ chuyển tới bạn qua Telegram."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2" padded={false}>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {threads.map((t) => {
              const s = getStudentById(t.studentId);
              const last = t.messages[t.messages.length - 1];
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedId(t.id)}
                  className={clsx(
                    "flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50",
                    selectedId === t.id && "bg-blue-50/60 dark:bg-blue-950/30"
                  )}
                >
                  <Avatar initials={s?.initials} size="sm" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{t.parentName}</p>
                      {t.status === "pending" && <Badge tone="rose">Cần trả lời</Badge>}
                    </div>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">PH của {s?.name}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{last?.text}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        <div className="lg:col-span-3">
          {selected ? (
            <Card className="flex h-[560px] flex-col" padded={false}>
              <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{selected.parentName}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Về học sinh: {student?.name}</p>
                </div>
                <Badge tone={selected.status === "pending" ? "rose" : "emerald"}>
                  {selected.status === "pending" ? "Chờ gia sư" : "Đã xử lý"}
                </Badge>
              </div>

              <div className="flex-1 space-y-3 overflow-y-auto p-4">
                {selected.messages.map((m) => (
                  <div key={m.id} className={clsx("max-w-[80%] rounded-xl px-3.5 py-2.5 text-sm", bubbleStyle(m.from))}>
                    {m.from === "bot" && (
                      <p className="mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide opacity-70">
                        <Bot size={12} /> Trợ lý tự động
                      </p>
                    )}
                    <p>{m.text}</p>
                    {m.escalated && (
                      <p className="mt-1.5 flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400">
                        <AlertCircle size={12} /> Đã chuyển cho gia sư
                      </p>
                    )}
                    <p className="mt-1 text-[11px] opacity-60">{m.time}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 border-t border-slate-200 p-3 dark:border-slate-800">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendReply()}
                  placeholder="Nhập phản hồi cho phụ huynh..."
                  className="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                />
                <Button size="sm" onClick={sendReply}>
                  <Send size={14} /> Gửi
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="flex items-center justify-center py-16 text-sm text-slate-400">Chọn một hội thoại</Card>
          )}
        </div>
      </div>
    </div>
  );
}

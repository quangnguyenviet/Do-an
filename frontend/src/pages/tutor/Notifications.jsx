import { useState } from "react";
import { Link } from "react-router-dom";
import { ClipboardCheck, ClipboardList, MessageCircle, CalendarClock, Sparkles, CheckCheck } from "lucide-react";
import { notifications as initialNotifications } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import clsx from "clsx";

const typeMeta = {
  request: { icon: ClipboardList, tone: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950" },
  grading: { icon: ClipboardCheck, tone: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950" },
  parent: { icon: MessageCircle, tone: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-950" },
  schedule: { icon: CalendarClock, tone: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-950" },
  system: { icon: Sparkles, tone: "text-violet-600 dark:text-violet-400", bg: "bg-violet-50 dark:bg-violet-950" },
};

function Row({ n, onRead }) {
  const meta = typeMeta[n.type];
  const Icon = meta.icon;
  return (
    <Link
      to={n.link}
      onClick={() => onRead(n.id)}
      className="flex items-start gap-3 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
    >
      <div className={clsx("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", meta.bg, meta.tone)}>
        <Icon size={17} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{n.title}</p>
          {!n.read && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />}
        </div>
        <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{n.body}</p>
        <p className="mt-1 text-xs text-slate-400">{n.time}</p>
      </div>
    </Link>
  );
}

export default function Notifications() {
  const [items, setItems] = useState(initialNotifications);

  function markRead(id) {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }

  function markAllRead() {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })));
  }

  const unread = items.filter((n) => !n.read);
  const read = items.filter((n) => n.read);

  return (
    <div>
      <PageHeader
        title="Notification"
        description="Tổng hợp bài chờ chấm, câu hỏi phụ huynh, lịch học và cập nhật từ Kho."
        actions={
          unread.length > 0 && (
            <Button variant="secondary" size="sm" onClick={markAllRead}>
              <CheckCheck size={14} /> Đánh dấu tất cả đã đọc
            </Button>
          )
        }
      />

      <Card padded={false}>
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Chưa đọc ({unread.length})</p>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {unread.map((n) => (
            <Row key={n.id} n={n} onRead={markRead} />
          ))}
          {unread.length === 0 && <p className="p-6 text-center text-sm text-slate-400">Không có thông báo mới 🎉</p>}
        </div>

        {read.length > 0 && (
          <>
            <div className="border-b border-t border-slate-200 px-4 py-3 dark:border-slate-800">
              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Đã đọc ({read.length})</p>
            </div>
            <div className="divide-y divide-slate-100 opacity-70 dark:divide-slate-800">
              {read.map((n) => (
                <Row key={n.id} n={n} onRead={markRead} />
              ))}
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

import { useState } from "react";
import { ClipboardList, Clock, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { assignments } from "../../../lib/dashboard-data";

export function AssignmentsView() {
  const [filter, setFilter] = useState("all");

  const filtered = assignments.filter((item) => {
    if (filter === "todo") return item.status === "todo";
    if (filter === "done") return item.status === "done";
    if (filter === "late") return item.status === "late";
    return true;
  });

  const getStatusBadge = (status, text, score) => {
    if (status === "done") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5" /> {text} ({score})
        </span>
      );
    }
    if (status === "late") {
      return (
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-500 border border-rose-500/20 flex items-center gap-1">
          <AlertTriangle className="w-3.5 h-3.5" /> {text}
        </span>
      );
    }
    return (
      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-500 border border-amber-500/20 flex items-center gap-1">
        <Clock className="w-3.5 h-3.5" /> {text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Bài tập & Thử thách</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Nộp bài tập về nhà và xem nhận xét chi tiết từ gia sư.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-muted border border-border text-xs font-semibold overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              filter === "all" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tất cả ({assignments.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("todo")}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              filter === "todo" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Cần làm ({assignments.filter((a) => a.status === "todo").length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("done")}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              filter === "done" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Đã nộp ({assignments.filter((a) => a.status === "done").length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("late")}
            className={`px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
              filter === "late" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Trễ hạn ({assignments.filter((a) => a.status === "late").length})
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          >
            <div className="space-y-2">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">{item.subject}</span>
              <h3 className="font-bold text-foreground text-base leading-snug">{item.title}</h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> Hạn nộp: {item.dueDate}
              </p>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
              {getStatusBadge(item.status, item.statusText, item.score)}

              {item.status === "todo" ? (
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1"
                >
                  <span>Làm bài</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                >
                  Xem nhận xét
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AssignmentsView;

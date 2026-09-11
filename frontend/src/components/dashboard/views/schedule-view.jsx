import { useState } from "react";
import { CalendarDays, Clock, Video, CheckCircle2, User } from "lucide-react";
import { scheduleList } from "../../../lib/dashboard-data";

export function ScheduleView() {
  const [tab, setTab] = useState("thisWeek");

  return (
    <div className="space-y-6">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Lịch học trực tuyến</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Quản lý các buổi học 1 kèm 1 và thời gian ôn luyện cùng gia sư.
          </p>
        </div>

        <div className="inline-flex p-1 rounded-xl bg-muted border border-border text-xs font-semibold">
          <button
            type="button"
            onClick={() => setTab("thisWeek")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tab === "thisWeek"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tuần này
          </button>
          <button
            type="button"
            onClick={() => setTab("nextWeek")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              tab === "nextWeek"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Tuần sau
          </button>
        </div>
      </div>

      {/* Schedule Grouped List */}
      <div className="space-y-6">
        {scheduleList.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
              <CalendarDays className="w-4 h-4 text-primary" />
              <span>{group.day}</span>
            </div>

            <div className="space-y-3">
              {group.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="p-5 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-foreground text-base">{lesson.title}</span>
                      {lesson.isLive && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-accent text-accent-foreground uppercase animate-pulse">
                          LIVE NOW
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-foreground font-medium">
                        <User className="w-3.5 h-3.5 text-primary" /> {lesson.tutor}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {lesson.time}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-border">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        lesson.status === "Hoàn thành"
                          ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                          : "bg-primary/10 text-primary border-primary/20"
                      }`}
                    >
                      {lesson.status}
                    </span>

                    {lesson.isLive ? (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-bold hover:bg-primary/90 transition-colors flex items-center gap-1.5 shadow"
                      >
                        <Video className="w-4 h-4" />
                        <span>Vào lớp ngay</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg border border-border text-xs font-semibold text-foreground hover:bg-muted transition-colors"
                      >
                        Xem tài liệu
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ScheduleView;

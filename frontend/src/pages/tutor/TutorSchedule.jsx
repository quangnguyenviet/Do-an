import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Video, MapPin, CheckCircle2, AlertCircle, RefreshCw, ExternalLink } from "lucide-react";
import clsx from "clsx";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";

// Mock schedule data
const mockSchedule = [
  {
    id: "sch-1",
    dayOfWeek: "Thứ 2",
    dayIndex: 1,
    dateStr: "03/08",
    fullDate: "2026-08-03",
    startTime: "18:00",
    endTime: "19:30",
    status: "confirmed",
    studentName: "Nguyễn Thảo Minh",
    initials: "NT",
    subject: "IELTS Foundation",
    topic: "Speaking Part 1: Fluency & Topic Vocabulary",
    location: "Online qua Jitsi Meet",
    platform: "Jitsi Meet HD",
    classCode: "JITSI-IELTS-0308",
    colorTheme: "indigo",
  },
  {
    id: "sch-2",
    dayOfWeek: "Thứ 2",
    dayIndex: 1,
    dateStr: "03/08",
    fullDate: "2026-08-03",
    startTime: "19:30",
    endTime: "21:00",
    status: "confirmed",
    studentName: "Trần Bảo Ngọc",
    initials: "BN",
    subject: "Giao tiếp cơ bản",
    topic: "Thì hiện tại đơn & Từ vựng chủ đề Gia đình",
    location: "Online qua Zoom HD",
    platform: "Zoom Pro Cloud",
    classCode: "ZOOM-IELTS-0308",
    colorTheme: "emerald",
  },
  {
    id: "sch-3",
    dayOfWeek: "Thứ 3",
    dayIndex: 2,
    dateStr: "04/08",
    fullDate: "2026-08-04",
    startTime: "19:00",
    endTime: "20:30",
    status: "live",
    studentName: "Lê Hoàng Nam",
    initials: "LH",
    subject: "IELTS Writing Task 2",
    topic: "Advanced Cohesion & Complex Sentences",
    location: "Tại nhà học sinh (124 Nguyễn Thị Minh Khai, Q.3)",
    platform: "Tại nhà",
    colorTheme: "blue",
  },
  {
    id: "sch-4",
    dayOfWeek: "Thứ 4",
    dayIndex: 3,
    dateStr: "05/08",
    fullDate: "2026-08-05",
    startTime: "19:30",
    endTime: "21:00",
    status: "upcoming",
    studentName: "Nguyễn Thảo Minh",
    initials: "NT",
    subject: "IELTS Foundation",
    topic: "Listening Section 3: Multiple Choice Tactics",
    location: "Online qua Jitsi Meet",
    platform: "Jitsi Meet HD",
    classCode: "JITSI-LIS-0508",
    colorTheme: "indigo",
  },
  {
    id: "sch-5",
    dayOfWeek: "Thứ 5",
    dayIndex: 4,
    dateStr: "06/08",
    fullDate: "2026-08-06",
    startTime: "18:00",
    endTime: "19:30",
    status: "upcoming",
    studentName: "Trần Bảo Ngọc",
    initials: "BN",
    subject: "Giao tiếp cơ bản",
    topic: "Small Talk & Networking in English",
    location: "Online qua Zoom HD",
    platform: "Zoom Pro",
    classCode: "ZOOM-TALK-0608",
    colorTheme: "emerald",
  },
  {
    id: "sch-6",
    dayOfWeek: "Thứ 6",
    dayIndex: 5,
    dateStr: "07/08",
    fullDate: "2026-08-06",
    startTime: "19:30",
    endTime: "21:00",
    status: "rescheduled",
    studentName: "Lê Hoàng Nam",
    initials: "LH",
    subject: "IELTS Writing Task 1",
    topic: "Process & Map Diagrams",
    location: "Phòng 302, Trung tâm EdTech Q.1 (15 Nguyễn Huệ)",
    platform: "Trung tâm EdTech Q.1",
    colorTheme: "blue",
  },
];

const weekDays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "CN"];

const statusMeta = {
  confirmed: {
    label: "Đã xác nhận",
    tone: "emerald",
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    border: "border-emerald-200 dark:border-emerald-900",
  },
  live: {
    label: "Đang diễn ra",
    tone: "blue",
    icon: AlertCircle,
    color: "text-blue-600",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    border: "border-blue-200 dark:border-blue-900",
  },
  upcoming: {
    label: "Sắp tới",
    tone: "amber",
    icon: Clock,
    color: "text-amber-600",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    border: "border-amber-200 dark:border-amber-900",
  },
  rescheduled: {
    label: "Đổi lịch",
    tone: "rose",
    icon: RefreshCw,
    color: "text-rose-600",
    bg: "bg-rose-50 dark:bg-rose-950/30",
    border: "border-rose-200 dark:border-rose-900",
  },
};

const colorMap = {
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-300",
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-300",
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-300",
};

function SessionCard({ session }) {
  const meta = statusMeta[session.status];
  const StatusIcon = meta.icon;

  return (
    <div
      className={clsx(
        "rounded-xl border p-3",
        meta.bg,
        meta.border
      )}
    >
      <div className="flex items-start gap-2.5">
        {/* Avatar */}
        <div
          className={clsx(
            "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 font-semibold text-xs",
            colorMap[session.colorTheme]
          )}
        >
          {session.initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                {session.studentName}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{session.subject}</p>
            </div>
            <Badge tone={meta.tone} className="flex-shrink-0 gap-1">
              <StatusIcon size={10} />
              {meta.label}
            </Badge>
          </div>

          {/* Topic */}
          <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-snug">
            {session.topic}
          </p>

          {/* Meta row */}
          <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1">
              <Clock size={11} />
              {session.startTime} – {session.endTime}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {session.location}
            </span>
          </div>

          {/* Action: Join or details */}
          {session.classCode && session.status !== "rescheduled" && (
            <div className="mt-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">Mã phòng</p>
                  <p className="text-xs font-mono font-medium text-slate-700 dark:text-slate-200">
                    {session.classCode}
                  </p>
                </div>
                <a
                  href={session.meetingLink || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                >
                  <Video size={12} />
                  Tham gia
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TutorSchedule() {
  // Week offset: 0 = current week
  const [weekOffset, setWeekOffset] = useState(0);

  const weekStart = new Date("2026-08-03");
  weekStart.setDate(weekStart.getDate() + weekOffset * 7);

  const daysOfWeek = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart);
    d.setDate(d.getDate() + i);
    return {
      dayOfWeek: weekDays[i],
      dateStr: `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}`,
      fullDate: d.toISOString().split("T")[0],
      dayIndex: i + 1,
    };
  });

  const sessionsThisWeek = mockSchedule;

  function sessionsForDay(dayIndex) {
    return sessionsThisWeek
      .filter((s) => s.dayIndex === dayIndex)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-6xl mx-auto space-y-4">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">Lịch dạy</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            {sessionsThisWeek.length} buổi trong tuần
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Tuần trước"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="text-sm font-medium text-slate-900 dark:text-white min-w-[160px] text-center">
            {daysOfWeek[0].dateStr} – {daysOfWeek[6].dateStr}
          </div>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Tuần sau"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Week grid — 7 columns */}
      <div className="grid grid-cols-7 gap-2 lg:gap-3">
        {daysOfWeek.map((day) => {
          const daySessions = sessionsForDay(day.dayIndex);
          const isToday = day.fullDate === "2026-08-03";

          return (
            <div key={day.fullDate} className="space-y-2">
              {/* Day header */}
              <div
                className={clsx(
                  "text-center py-2 rounded-xl border",
                  isToday
                    ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                    : "border-transparent"
                )}
              >
                <p
                  className={clsx(
                    "text-[11px] font-medium",
                    isToday
                      ? "text-blue-600 dark:text-blue-300"
                      : "text-slate-400 dark:text-slate-500"
                  )}
                >
                  {day.dayOfWeek}
                </p>
                <p
                  className={clsx(
                    "text-sm font-bold mt-0.5",
                    isToday
                      ? "text-blue-700 dark:text-blue-200"
                      : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  {parseInt(day.dateStr.split("/")[0])}
                </p>
              </div>

              {/* Sessions for this day */}
              <div className="space-y-2">
                {daySessions.length > 0 ? (
                  daySessions.map((sess) => (
                    <div
                      key={sess.id}
                      className={clsx(
                        "rounded-xl p-2 border text-xs",
                        sess.status === "live"
                          ? "bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800"
                          : sess.status === "rescheduled"
                          ? "bg-rose-50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900"
                          : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
                      )}
                    >
                      <p className="font-semibold text-slate-900 dark:text-white leading-tight">
                        {sess.initials}
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                        {sess.startTime}
                      </p>
                      <div className="mt-1 w-full h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={clsx(
                            "h-full rounded-full",
                            sess.status === "live"
                              ? "bg-blue-500"
                              : sess.status === "rescheduled"
                              ? "bg-rose-400"
                              : "bg-blue-400"
                          )}
                          style={{ width: sess.status === "live" ? "60%" : sess.status === "upcoming" ? "30%" : "80%" }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-16 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center">
                    <p className="text-[10px] text-slate-300 dark:text-slate-600 text-center px-1 leading-tight">
                      Không có lịch
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Full session list */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Chi tiết buổi học</h2>
        <div className="space-y-2">
          {sessionsThisWeek
            .sort((a, b) => {
              if (a.dayIndex !== b.dayIndex) return a.dayIndex - b.dayIndex;
              return a.startTime.localeCompare(b.startTime);
            })
            .map((sess) => (
              <SessionCard key={sess.id} session={sess} />
            ))}
        </div>
      </div>

      {/* Bottom padding for mobile nav */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}

import { BookOpen, Clock, Flame, Star, Video, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { student, stats, upcomingLessons, assignments, aiFeedback } from "../../../lib/dashboard-data";

export function HomeView({ onViewChange }) {
  const iconMap = {
    BookOpen: BookOpen,
    Clock: Clock,
    Flame: Flame,
    Star: Star,
  };

  const nextLesson = upcomingLessons[0];
  const pendingAssignments = assignments.filter((a) => a.status === "todo").slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header Welcome Card */}
      <div className="p-6 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs font-semibold text-accent uppercase tracking-wider bg-accent/10 px-2.5 py-1 rounded-md border border-accent/20">
            Học sinh xuất sắc
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight mt-2">
            Chào mừng trở lại, {student.name}! 👋
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Hôm nay bạn có <strong className="text-foreground font-semibold">1 buổi học trực tuyến</strong> và{" "}
            <strong className="text-foreground font-semibold">2 bài tập cần làm</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto p-3 rounded-xl bg-muted border border-border">
          <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-sm">
            {student.tutorAvatar}
          </div>
          <div className="text-xs">
            <div className="text-muted-foreground">Gia sư phụ trách</div>
            <div className="font-semibold text-foreground">{student.tutor}</div>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = iconMap[stat.iconName] || BookOpen;
          return (
            <div key={idx} className="p-5 rounded-xl bg-card border border-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium">{stat.label}</span>
                <div className="p-2 rounded-lg bg-muted text-primary">
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-foreground">{stat.value}</span>
                <span className="text-xs text-muted-foreground font-medium">{stat.sub}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Grid: Next Lesson + Assignments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Lesson Card (Col 7) */}
        <div className="lg:col-span-7 rounded-xl border border-primary/30 bg-card p-6 space-y-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
              <h2 className="font-bold text-foreground text-lg">Buổi học tiếp theo</h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/30">
              Hôm nay
            </span>
          </div>

          <div className="p-4 rounded-xl bg-muted/60 border border-border space-y-3">
            <h3 className="font-bold text-foreground text-base">{nextLesson.subject}</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="text-foreground font-medium">Gia sư:</span> {nextLesson.tutor}
              </div>
              <div>
                <span className="text-foreground font-medium">Thời gian:</span> {nextLesson.time}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={() => onViewChange && onViewChange("schedule")}
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              <span>Vào lớp học Workspace</span>
            </button>

            <button
              type="button"
              onClick={() => onViewChange && onViewChange("schedule")}
              className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Xem chi tiết lịch học →
            </button>
          </div>
        </div>

        {/* Assignments Todo (Col 5) */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-base">Bài tập cần nộp</h2>
            <button
              type="button"
              onClick={() => onViewChange && onViewChange("assignments")}
              className="text-xs text-primary font-semibold hover:underline"
            >
              Tất cả ({assignments.length})
            </button>
          </div>

          <div className="space-y-3">
            {pendingAssignments.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-lg border border-border bg-muted/30 hover:border-primary/40 transition-all flex items-start justify-between gap-3"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">{item.subject}</span>
                  <h4 className="text-xs font-semibold text-foreground line-clamp-1">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Hạn nộp: {item.dueDate}
                  </p>
                </div>
                <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20 text-[10px] font-bold shrink-0">
                  Cần làm
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Weekly Report Banner */}
      <div className="p-6 rounded-xl border border-accent/30 bg-card space-y-3 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-accent">
            <span className="p-1.5 rounded-md bg-accent/10">✨</span>
            <h3 className="font-bold text-foreground text-base">Tóm tắt đánh giá AI tuần này</h3>
          </div>
          <button
            type="button"
            onClick={() => onViewChange && onViewChange("progress")}
            className="text-xs font-semibold text-accent hover:underline flex items-center gap-1"
          >
            <span>Xem chi tiết tiến độ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{aiFeedback.summary}</p>
      </div>
    </div>
  );
}
export default HomeView;

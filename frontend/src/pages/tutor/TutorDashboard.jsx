import { Link } from "react-router-dom";
import { Users, ClipboardCheck, MessageCircle, CalendarClock } from "lucide-react";
import { students, gradingQueue, parentThreads } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import ProgressBar from "../../components/ui/ProgressBar";
import Badge from "../../components/ui/Badge";

export default function TutorDashboard() {
  const pendingParentThreads = parentThreads.filter((t) => t.status === "pending");
  const upcomingSessions = students
    .flatMap((s) => s.learningPath.map((lp) => ({ ...lp, studentName: s.name, studentId: s.id })))
    .filter((lp) => lp.status !== "done")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5);

  return (
    <div>
      <PageHeader title="Tổng quan" description="Xin chào! Đây là tình hình giảng dạy của bạn hôm nay." />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Học sinh đang phụ trách" value={students.length} tone="blue" />
        <StatCard icon={CalendarClock} label="Buổi học sắp tới" value={upcomingSessions.length} tone="emerald" />
        <StatCard icon={ClipboardCheck} label="Bài chờ chấm" value={gradingQueue.length} tone="amber" />
        <StatCard
          icon={MessageCircle}
          label="Câu hỏi phụ huynh chờ trả lời"
          value={pendingParentThreads.length}
          tone="rose"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3" padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Học sinh phụ trách</h2>
            <Link to="/tutor/students" className="text-sm font-medium accent-link">
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {students.map((s) => (
              <Link
                key={s.id}
                to={`/tutor/students/${s.id}`}
                className="flex items-center gap-4 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <Avatar initials={s.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{s.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {s.level} &middot; {s.goal}
                  </p>
                </div>
                <div className="w-28 shrink-0">
                  <div className="mb-1 flex justify-between text-xs text-slate-400">
                    <span>Tiến độ</span>
                    <span>{s.overallProgress}%</span>
                  </div>
                  <ProgressBar value={s.overallProgress} />
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Buổi học sắp tới</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {upcomingSessions.map((lp) => (
              <div key={`${lp.studentId}-${lp.id}`} className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{lp.studentName}</p>
                  <Badge tone={lp.status === "in_progress" ? "amber" : "neutral"}>
                    {lp.status === "in_progress" ? "Đang diễn ra" : lp.date}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{lp.topic}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {lp.skills.map((sk) => (
                    <Badge key={sk} tone="blue">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { CalendarDays, NotebookPen, TrendingUp, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";

export default function StudentDashboard() {
  const { session } = useAuth();
  const student = getStudentById(session.studentId);

  const upcoming = student.learningPath.filter((lp) => lp.status !== "done").slice(0, 3);
  const todoExercises = student.exercises.filter((e) => e.status === "assigned");

  return (
    <div>
      <PageHeader title={`Chào ${student.name.split(" ").pop()}!`} description="Đây là tình hình học tập của bạn." />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatCard icon={CalendarDays} label="Buổi học sắp tới" value={upcoming.length} tone="blue" />
        <StatCard icon={NotebookPen} label="Bài tập cần làm" value={todoExercises.length} tone="amber" />
        <StatCard icon={TrendingUp} label="Tiến độ lộ trình" value={`${student.overallProgress}%`} tone="emerald" />
      </div>

      {student.weakSkill && (
        <Card className="mb-6 flex items-center gap-3 border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/30">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Kỹ năng cần cải thiện nhất hiện tại: <strong>{student.weakSkill}</strong>. Hãy dành thêm thời gian luyện tập kỹ năng này.
          </p>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Buổi học sắp tới</h2>
            <Link to="/student/schedule" className="text-sm font-medium accent-link">
              Xem lịch
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {upcoming.map((lp) => (
              <div key={lp.id} className="p-4">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Buổi {lp.session}</p>
                  <span className="text-xs text-slate-400">{lp.date}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">{lp.topic}</p>
              </div>
            ))}
            {upcoming.length === 0 && <p className="p-6 text-center text-sm text-slate-400">Chưa có buổi học sắp tới.</p>}
          </div>
        </Card>

        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Bài tập cần làm</h2>
            <Link to="/student/exercises" className="text-sm font-medium accent-link">
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todoExercises.map((ex) => (
              <Link key={ex.id} to={`/student/exercises/${ex.id}`} className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{ex.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{ex.skill} &middot; {ex.difficulty}</p>
                </div>
                <Badge tone="amber">Chưa làm</Badge>
              </Link>
            ))}
            {todoExercises.length === 0 && <p className="p-6 text-center text-sm text-slate-400">Bạn đã hoàn thành hết bài tập!</p>}
          </div>
        </Card>
      </div>

      <Card className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="font-medium text-slate-900 dark:text-slate-50">Tiến độ lộ trình học</h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">{student.overallProgress}%</span>
        </div>
        <ProgressBar value={student.overallProgress} />
      </Card>
    </div>
  );
}

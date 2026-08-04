import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { Banknote, TrendingUp, AlertCircle, GraduationCap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { revenueData, studentFees, students } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";

const fmtMil = (n) => (n / 1_000_000).toFixed(1) + "M";
const fmtVND = (n) => n.toLocaleString("vi-VN") + "₫";

const exerciseActivity = [
  { month: "T11/2025", created: 12, completed: 10 },
  { month: "T12/2025", created: 15, completed: 13 },
  { month: "T1/2026",  created: 18, completed: 15 },
  { month: "T2/2026",  created: 22, completed: 19 },
  { month: "T3/2026",  created: 25, completed: 21 },
];

const skillKeys = ["Nghe", "Nói", "Đọc", "Viết", "Từ vựng", "Ngữ pháp"];

export default function AdminAnalytics() {
  const { tutorList, studentList } = useAuth();

  const current = revenueData[revenueData.length - 1];
  const prev    = revenueData[revenueData.length - 2];
  const growth  = prev ? Math.round(((current.total - prev.total) / prev.total) * 100) : 0;
  const avgFee  = studentList.length ? Math.round(current.total / studentList.length) : 0;
  const totalCreated   = exerciseActivity.reduce((s, r) => s + r.created, 0);
  const totalCompleted = exerciseActivity.reduce((s, r) => s + r.completed, 0);
  const completionRate = Math.round((totalCompleted / totalCreated) * 100);

  // Average skill score across each student's last progressHistory entry
  const skillChartData = skillKeys.map((k) => {
    const vals = students
      .filter((s) => s.progressHistory?.length)
      .map((s) => s.progressHistory[s.progressHistory.length - 1][k] ?? 0);
    const avg = vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
    return { skill: k, avg: parseFloat(avg.toFixed(1)) };
  });

  const topStudents = [...studentList]
    .sort((a, b) => b.overallProgress - a.overallProgress)
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        title="Báo cáo & Phân tích"
        description="Tổng quan doanh thu, hoạt động học tập và hiệu suất toàn hệ thống."
      />

      {/* Revenue stat cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Banknote}
          label="Doanh thu tháng này"
          value={fmtMil(current.total)}
          hint={`${growth >= 0 ? "+" : ""}${growth}% so với tháng trước`}
          tone="emerald"
        />
        <StatCard icon={TrendingUp}    label="Đã thu"               value={fmtMil(current.collected)} hint="Tháng hiện tại"   tone="blue"   />
        <StatCard icon={AlertCircle}   label="Còn nợ"               value={fmtMil(current.pending)}   hint="Chờ thanh toán"  tone="amber"  />
        <StatCard icon={GraduationCap} label="TB học phí / học sinh" value={fmtMil(avgFee)}            hint="Tháng này"       tone="violet" />
      </div>

      {/* Revenue chart + skill chart */}
      <div className="mb-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2" padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Doanh thu theo tháng</h2>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData} barGap={3}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v, name) => [fmtVND(v), name]} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="collected" name="Đã thu"  fill="#22c55e" radius={[3, 3, 0, 0]} />
                <Bar dataKey="pending"   name="Còn nợ"  fill="#f59e0b" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Điểm kỹ năng trung bình</h2>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={skillChartData} layout="vertical" barSize={13}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11 }} />
                <YAxis type="category" dataKey="skill" tick={{ fontSize: 11 }} width={54} />
                <Tooltip formatter={(v) => [`${v}/10`, "Trung bình"]} />
                <Bar dataKey="avg" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Exercise activity + summary */}
      <div className="mb-6 grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3" padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Hoạt động bài tập theo tháng</h2>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={190}>
              <BarChart data={exerciseActivity} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="created"   name="Đã tạo"     fill="#8b5cf6" radius={[3, 3, 0, 0]} />
                <Bar dataKey="completed" name="Hoàn thành"  fill="#06b6d4" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Tóm tắt bài tập</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tổng bài đã tạo</span>
              <span className="text-sm font-semibold">{totalCreated}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Đã hoàn thành</span>
              <span className="text-sm font-semibold">{totalCompleted}</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tỷ lệ hoàn thành</span>
              <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{completionRate}%</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tháng nhiều nhất</span>
              <span className="text-sm font-semibold">T3/2026 (25)</span>
            </div>
            <div className="flex justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Gia sư đang hoạt động</span>
              <span className="text-sm font-semibold">
                {tutorList.filter((t) => t.status === "active").length}
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* Student fees + top students */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Học phí tháng 3/2026</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {studentFees.map((f) => (
              <div key={f.studentId} className="flex items-center justify-between gap-4 p-4">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{f.name}</p>
                  <p className="text-xs text-slate-400">
                    {tutorList.find((t) => t.id === f.tutorId)?.name ?? "—"}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-sm font-semibold tabular-nums text-slate-700 dark:text-slate-200">
                    {fmtVND(f.monthlyFee)}
                  </span>
                  <Badge tone={f.status === "paid" ? "emerald" : "amber"}>
                    {f.status === "paid" ? "Đã thu" : "Chưa thu"}
                  </Badge>
                </div>
              </div>
            ))}
            <div className="flex items-center justify-between bg-slate-50 px-4 py-3 dark:bg-slate-800/50">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Tổng cộng</span>
              <span className="text-sm font-bold text-slate-900 dark:text-slate-50">
                {fmtVND(studentFees.reduce((s, f) => s + f.monthlyFee, 0))}
              </span>
            </div>
          </div>
        </Card>

        <Card padded={false}>
          <div className="border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Học sinh tiến bộ nhất</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {topStudents.map((s, i) => (
              <div key={s.id} className="flex items-center gap-3 p-4">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-500 dark:bg-slate-800">
                  {i + 1}
                </span>
                <Avatar initials={s.initials} size="sm" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{s.name}</p>
                  <p className="text-xs text-slate-400">{s.level} · kỹ năng yếu: {s.weakSkill}</p>
                </div>
                <span className="shrink-0 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
                  {s.overallProgress}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

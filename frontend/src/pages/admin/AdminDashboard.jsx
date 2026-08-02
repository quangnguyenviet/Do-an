import { Link } from "react-router-dom";
import { Users, UserCheck, UserX, Clock, ShieldCheck, GraduationCap, UserMinus, CheckCircle, XCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { activityLogs } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const statusMeta = {
  active: { label: "Đang hoạt động", tone: "emerald" },
  inactive: { label: "Ngưng hoạt động", tone: "slate" },
  pending: { label: "Chờ duyệt", tone: "amber" },
};

const actionLabel = {
  approve_tutor:   "Duyệt gia sư",
  add_student:     "Thêm học sinh",
  add_template:    "Thêm mẫu",
  mark_paid:       "Thu học phí",
  create_exercise: "Tạo bài tập",
  reply_parent:    "Trả lời phụ huynh",
  ai_grade:        "AI chấm bài",
};

function formatTs(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) + " " + d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" });
}

export default function AdminDashboard() {
  const { tutorList, updateTutor, studentList } = useAuth();

  const activeCount = tutorList.filter((t) => t.status === "active").length;
  const pendingCount = tutorList.filter((t) => t.status === "pending").length;
  const inactiveCount = tutorList.filter((t) => t.status === "inactive").length;
  const pendingTutors = tutorList.filter((t) => t.status === "pending");

  const assignedCount = studentList.filter((s) => s.assignedTutorId).length;
  const unassignedCount = studentList.length - assignedCount;

  return (
    <div>
      <PageHeader
        title="Bảng điều khiển quản trị"
        description="Quản lý đội ngũ gia sư và giám sát hoạt động toàn hệ thống."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard icon={Users} label="Tổng số gia sư" value={tutorList.length} tone="blue" />
        <StatCard icon={UserCheck} label="Gia sư đang hoạt động" value={activeCount} tone="emerald" />
        <StatCard icon={Clock} label="Gia sư chờ duyệt" value={pendingCount} tone="amber" />
        <StatCard icon={GraduationCap} label="Tổng số học sinh" value={studentList.length} tone="violet" />
        <StatCard icon={UserCheck} label="Đã có gia sư" value={assignedCount} tone="emerald" />
        <StatCard icon={UserMinus} label="Chưa có gia sư" value={unassignedCount} tone="rose" />
      </div>

      {/* Pending approvals panel */}
      {pendingTutors.length > 0 && (
        <Card className="mb-6" padded={false}>
          <div className="flex items-center justify-between border-b border-amber-100 bg-amber-50 p-5 dark:border-amber-900/40 dark:bg-amber-950/30">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-amber-600 dark:text-amber-400" />
              <h2 className="font-medium text-amber-900 dark:text-amber-200">
                Gia sư chờ duyệt ({pendingTutors.length})
              </h2>
            </div>
            <Link to="/admin/tutors" className="text-sm font-medium text-amber-700 hover:underline dark:text-amber-400">
              Xem tất cả
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pendingTutors.map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-4">
                <Avatar initials={t.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{t.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {t.email} &middot; Đăng ký {t.joinedDate}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => updateTutor(t.id, { status: "active" })}
                  >
                    <CheckCircle size={13} /> Duyệt
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateTutor(t.id, { status: "inactive" })}
                  >
                    <XCircle size={13} /> Từ chối
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tutor preview */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Danh sách gia sư</h2>
            <Link to="/admin/tutors" className="text-sm font-medium accent-link">
              Quản lý gia sư
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tutorList.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-4">
                <Avatar initials={t.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{t.name}</p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {t.specialization.slice(0, 2).join(", ")}
                    {t.specialization.length > 2 && ` +${t.specialization.length - 2}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs text-slate-400">{t.studentsCount} hs</span>
                  <Badge tone={statusMeta[t.status]?.tone}>{statusMeta[t.status]?.label}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Student preview */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Danh sách học sinh</h2>
            <Link to="/admin/students" className="text-sm font-medium accent-link">
              Quản lý học sinh
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {studentList.slice(0, 4).map((s) => {
              const tutor = tutorList.find((t) => t.id === s.assignedTutorId);
              return (
                <div key={s.id} className="flex items-center gap-4 p-4">
                  <Avatar initials={s.initials} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{s.name}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{s.goal}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge tone="neutral">{s.level}</Badge>
                    {tutor ? (
                      <span className="text-xs text-slate-400">{tutor.name}</span>
                    ) : (
                      <span className="text-xs text-amber-500">Chưa có gia sư</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* System stats row */}
      <Card className="mt-6" padded={false}>
        <div className="flex items-center gap-2 border-b border-slate-200 p-5 dark:border-slate-800">
          <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
          <h2 className="font-medium text-slate-900 dark:text-slate-50">Thống kê hệ thống</h2>
        </div>
        <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0 dark:divide-slate-800">
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">Tỷ lệ gia sư hoạt động</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {tutorList.length ? Math.round((activeCount / tutorList.length) * 100) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">Học sinh đã phân công</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {studentList.length ? Math.round((assignedCount / studentList.length) * 100) : 0}%
            </span>
          </div>
          <div className="flex items-center justify-between p-4">
            <span className="text-sm text-slate-600 dark:text-slate-300">TB học sinh / gia sư</span>
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {activeCount ? (assignedCount / activeCount).toFixed(1) : "—"}
            </span>
          </div>
        </div>
      </Card>

      {/* Recent activity feed */}
      <Card className="mt-6" padded={false}>
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <h2 className="font-medium text-slate-900 dark:text-slate-50">Hoạt động gần đây</h2>
          <Link to="/admin/logs" className="text-sm font-medium accent-link">Xem tất cả</Link>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-start gap-3 p-4">
              <span className="shrink-0 whitespace-nowrap text-xs text-slate-400">{formatTs(log.ts)}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-slate-700 dark:text-slate-200">
                <span className="font-medium">{log.actor}</span> — {log.detail}
              </span>
              <Badge tone="neutral" className="shrink-0">{actionLabel[log.action] ?? log.action}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

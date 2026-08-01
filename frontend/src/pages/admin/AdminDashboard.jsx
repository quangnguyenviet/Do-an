import { Link } from "react-router-dom";
import { Users, UserCheck, UserX, Clock, ShieldCheck, BookOpenCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import { students } from "../../data/mockData";

const statusMeta = {
  active: { label: "Đang hoạt động", tone: "emerald" },
  inactive: { label: "Ngưng hoạt động", tone: "slate" },
  pending: { label: "Chờ duyệt", tone: "amber" },
};

export default function AdminDashboard() {
  const { tutorList } = useAuth();

  const activeCount = tutorList.filter((t) => t.status === "active").length;
  const pendingCount = tutorList.filter((t) => t.status === "pending").length;
  const inactiveCount = tutorList.filter((t) => t.status === "inactive").length;

  return (
    <div>
      <PageHeader
        title="Bảng điều khiển quản trị"
        description="Quản lý đội ngũ gia sư và giám sát hoạt động toàn hệ thống."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Tổng số gia sư" value={tutorList.length} tone="blue" />
        <StatCard icon={UserCheck} label="Đang hoạt động" value={activeCount} tone="emerald" />
        <StatCard icon={Clock} label="Chờ duyệt" value={pendingCount} tone="amber" />
        <StatCard icon={UserX} label="Ngưng hoạt động" value={inactiveCount} tone="rose" />
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-3" padded={false}>
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
                    {t.email} &middot; {t.specialization.join(", ")}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-slate-400">{t.studentsCount} học sinh</span>
                  <Badge tone={statusMeta[t.status]?.tone}>{statusMeta[t.status]?.label}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2" padded={false}>
          <div className="flex items-center gap-2 border-b border-slate-200 p-5 dark:border-slate-800">
            <ShieldCheck size={16} className="text-blue-600 dark:text-blue-400" />
            <h2 className="font-medium text-slate-900 dark:text-slate-50">Thống kê hệ thống</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="flex items-center justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tổng số học sinh</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{students.length}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="text-sm text-slate-600 dark:text-slate-300">Tổng số gia sư</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">{tutorList.length}</span>
            </div>
            <div className="flex items-center justify-between p-4">
              <span className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300">
                <BookOpenCheck size={15} /> Tỷ lệ gia sư hoạt động
              </span>
              <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                {tutorList.length ? Math.round((activeCount / tutorList.length) * 100) : 0}%
              </span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
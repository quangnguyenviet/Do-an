import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users, UserCheck, Clock, ShieldCheck, GraduationCap, UserMinus,
  CheckCircle, XCircle, TrendingUp, Banknote, BookOpen, FileText,
  Activity, ArrowUpRight, Cpu, Bot, Database, Zap, RefreshCw, Sparkles
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";
import { useAuth } from "../../context/AuthContext";
import { activityLogs, revenueData } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
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
  approve_tutor: "Duyệt gia sư",
  add_student: "Thêm học sinh",
  add_template: "Thêm mẫu",
  mark_paid: "Thu học phí",
  create_exercise: "Tạo bài tập",
  reply_parent: "Trả lời phụ huynh",
  ai_grade: "AI chấm bài",
};

const fmtMil = (n) => (n / 1_000_000).toFixed(1) + "M";
const fmtVND = (n) => n.toLocaleString("vi-VN") + "₫";

function formatTs(ts) {
  const d = new Date(ts);
  return (
    d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit" }) +
    " " +
    d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function AdminDashboard() {
  const { tutorList, updateTutor, studentList } = useAuth();
  const [timeframe, setTimeframe] = useState("month");
  const [notification, setNotification] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const activeCount = tutorList.filter((t) => t.status === "active").length;
  const pendingCount = tutorList.filter((t) => t.status === "pending").length;
  const pendingTutors = tutorList.filter((t) => t.status === "pending");

  const assignedCount = studentList.filter((s) => s.assignedTutorId).length;
  const unassignedCount = studentList.length - assignedCount;
  const assignedPercentage = studentList.length
    ? Math.round((assignedCount / studentList.length) * 100)
    : 0;

  const currentRevenue = revenueData[revenueData.length - 1];
  const prevRevenue = revenueData[revenueData.length - 2];
  const growthRate = prevRevenue
    ? Math.round(((currentRevenue.total - prevRevenue.total) / prevRevenue.total) * 100)
    : 12;

  const handleApprove = (tutorId, name) => {
    updateTutor(tutorId, { status: "active" });
    showNotification(`Đã duyệt thành công gia sư ${name}!`);
  };

  const handleReject = (tutorId, name) => {
    updateTutor(tutorId, { status: "inactive" });
    showNotification(`Đã từ chối gia sư ${name}.`);
  };

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3500);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      showNotification("Dữ liệu dashboard đã được cập nhật mới nhất.");
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm text-white shadow-2xl transition-all dark:bg-emerald-950 dark:text-emerald-200 border border-slate-700/50 animate-bounce">
          <CheckCircle size={18} className="text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Top Banner & Timeframe Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeader
          title="Bảng điều khiển quản trị"
          description="Tổng quan điều hành toàn hệ thống, phê duyệt gia sư, quản lý học sinh & giám sát hoạt động."
        />

        <div className="flex items-center gap-3 shrink-0">
          <div className="inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              onClick={() => setTimeframe("today")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${timeframe === "today"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Hôm nay
            </button>
            <button
              onClick={() => setTimeframe("week")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${timeframe === "week"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Tuần này
            </button>
            <button
              onClick={() => setTimeframe("month")}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${timeframe === "month"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white"
                : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
            >
              Tháng này
            </button>
          </div>

          <Button variant="secondary" size="sm" onClick={handleRefresh} disabled={refreshing}>
            <RefreshCw size={14} className={refreshing ? "animate-spin" : ""} />
            <span className="hidden sm:inline">Làm mới</span>
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Gia sư */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-slate-50 to-blue-500/5 p-5 border border-blue-100 shadow-sm dark:border-blue-900/30 dark:from-blue-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Đội ngũ gia sư
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600/10 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {tutorList.length}
            </span>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight size={14} /> {activeCount} hoạt động
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Chờ phê duyệt:</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {pendingCount} gia sư
            </span>
          </div>
        </div>

        {/* Card 2: Học sinh */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-slate-50 to-purple-500/5 p-5 border border-purple-100 shadow-sm dark:border-purple-900/30 dark:from-purple-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400">
              Học sinh đăng ký
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-purple-600/10 text-purple-600 dark:bg-purple-400/10 dark:text-purple-400">
              <GraduationCap size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {studentList.length}
            </span>
            <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-semibold text-purple-700 dark:bg-purple-900/40 dark:text-purple-300">
              {assignedPercentage}% đã phân công
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Chưa có gia sư:</span>
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              {unassignedCount} học sinh
            </span>
          </div>
        </div>

        {/* Card 3: Doanh thu */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-slate-50 to-emerald-500/5 p-5 border border-emerald-100 shadow-sm dark:border-emerald-900/30 dark:from-emerald-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              Doanh thu tháng
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600/10 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400">
              <Banknote size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">
              {fmtMil(currentRevenue.total)}
            </span>
            <span className="flex items-center text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <TrendingUp size={14} className="mr-0.5" /> +{growthRate}%
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Đã thu: {fmtMil(currentRevenue.collected)}</span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              Còn nợ {fmtMil(currentRevenue.pending)}
            </span>
          </div>
        </div>

        {/* Card 4: Trạng thái tích hợp hệ thống */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-50 to-amber-500/5 p-5 border border-amber-100 shadow-sm dark:border-amber-900/30 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-900">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Tích hợp AI & Telegram
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-600/10 text-amber-600 dark:bg-amber-400/10 dark:text-amber-400">
              <Zap size={18} />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900 dark:text-white">100%</span>
            <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Sẵn sàng
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>OpenAI API & Bot:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-200">Online</span>
          </div>
        </div>
      </div>

      {/* Urgent Action Section: Pending Tutor Approvals */}
      {pendingTutors.length > 0 && (
        <Card padded={false} className="border-amber-300 shadow-md dark:border-amber-700/50">
          <div className="flex items-center justify-between border-b border-amber-200 bg-gradient-to-r from-amber-500/15 via-amber-500/5 to-transparent p-5 dark:border-amber-900/40">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500 text-white shadow-sm">
                <Clock size={18} />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                  Yêu cầu duyệt tài khoản gia sư ({pendingTutors.length})
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Vui lòng kiểm tra và duyệt quyền truy cập hệ thống cho gia sư mới.
                </p>
              </div>
            </div>
            <Link
              to="/admin/tutors"
              className="text-xs font-medium text-amber-700 hover:underline dark:text-amber-400"
            >
              Quản lý toàn bộ &rarr;
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pendingTutors.map((t) => (
              <div key={t.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center gap-3.5">
                  <Avatar initials={t.initials} size="lg" />
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-900 dark:text-slate-50">{t.name}</p>
                      <Badge tone="amber">Mới đăng ký</Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {t.email} &bull; SĐT: {t.phone || "Chưa cập nhật"} &bull; Đăng ký ngày {t.joinedDate}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {t.specialization.map((spec, idx) => (
                        <span key={idx} className="inline-block rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0 justify-end">
                  <Button
                    size="sm"
                    onClick={() => handleApprove(t.id, t.name)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white border-none shadow-sm"
                  >
                    <CheckCircle size={14} /> Duyệt tài khoản
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => handleReject(t.id, t.name)}
                    className="text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  >
                    <XCircle size={14} /> Từ chối
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Quick Action Navigation Shortcuts */}
      <div>
        <div className="mb-3.5 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Sparkles size={15} className="text-blue-500" /> Thao tác nhanh & Phím tắt quản trị
          </h2>
          <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">5 lối tắt</span>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {/* Card 1: Gia sư */}
          <Link
            to="/admin/tutors"
            className="group relative flex flex-col justify-between rounded-2xl bg-white p-4.5 border border-slate-200/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md hover:shadow-blue-500/10 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-blue-700/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Users size={22} />
              </div>
              <ArrowUpRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Quản lý Gia sư
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {tutorList.length} gia sư trên hệ thống
              </p>
            </div>
          </Link>

          {/* Card 2: Học sinh */}
          <Link
            to="/admin/students"
            className="group relative flex flex-col justify-between rounded-2xl bg-white p-4.5 border border-slate-200/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-purple-300 hover:shadow-md hover:shadow-purple-500/10 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-purple-700/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap size={22} />
              </div>
              <ArrowUpRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Quản lý Học sinh
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                {studentList.length} học sinh đang học
              </p>
            </div>
          </Link>

          {/* Card 3: Kho Tài liệu */}
          <Link
            to="/admin/materials"
            className="group relative flex flex-col justify-between rounded-2xl bg-white p-4.5 border border-slate-200/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md hover:shadow-emerald-500/10 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-emerald-700/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <FileText size={22} />
              </div>
              <ArrowUpRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Kho Tài liệu
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Tài liệu & bài giảng dùng chung
              </p>
            </div>
          </Link>

          {/* Card 4: Doanh thu */}
          <Link
            to="/admin/analytics"
            className="group relative flex flex-col justify-between rounded-2xl bg-white p-4.5 border border-slate-200/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-rose-300 hover:shadow-md hover:shadow-rose-500/10 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-rose-700/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white shadow-md shadow-rose-500/20 group-hover:scale-105 transition-transform">
                <TrendingUp size={22} />
              </div>
              <ArrowUpRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Doanh thu & Học phí
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Báo cáo tài chính & nợ phí
              </p>
            </div>
          </Link>

          {/* Card 5: Nhật ký */}
          <Link
            to="/admin/logs"
            className="group relative flex flex-col justify-between rounded-2xl bg-white p-4.5 border border-slate-200/80 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-sky-300 hover:shadow-md hover:shadow-sky-500/10 dark:bg-slate-900 dark:border-slate-800 dark:hover:border-sky-700/60"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <Activity size={22} />
              </div>
              <ArrowUpRight size={16} className="text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                Nhật ký hoạt động
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Audit logs hệ thống
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Core Analytics & System Health Split View */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Mini Revenue Chart (2 cols) */}
        <Card padded={false} className="lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                Xu hướng doanh thu & Thu học phí
              </h2>
            </div>
            <Link to="/admin/analytics" className="text-xs font-medium accent-link">
              Chi tiết báo cáo &rarr;
            </Link>
          </div>
          <div className="p-5">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={revenueData} barGap={4}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tickFormatter={(v) => `${(v / 1_000_000).toFixed(0)}M`} tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v, name) => [fmtVND(v), name]} />
                <Bar dataKey="collected" name="Đã thu" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="pending" name="Còn nợ" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Right Column: Live System Health Status Widget (1 col) */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} className="text-blue-600 dark:text-blue-400" />
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">
                Trạng thái hệ thống
              </h2>
            </div>
            <Badge tone="emerald">Hoạt động tốt</Badge>
          </div>
          <div className="divide-y divide-slate-100 p-2 dark:divide-slate-800 text-xs">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2.5">
                <Cpu size={16} className="text-purple-500" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">OpenAI-compatible AI API</p>
                  <p className="text-[10px] text-slate-400">Latency ~128ms &bull; Model active</p>
                </div>
              </div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Online</span>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2.5">
                <Bot size={16} className="text-blue-500" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Telegram Parent Bot</p>
                  <p className="text-[10px] text-slate-400">Webhook connected &bull; Auto-reply</p>
                </div>
              </div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Active</span>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2.5">
                <Database size={16} className="text-amber-500" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Database & Storage</p>
                  <p className="text-[10px] text-slate-400">Sync: OK &bull; Ping 14ms</p>
                </div>
              </div>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Synced</span>
            </div>

            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-2.5">
                <Activity size={16} className="text-emerald-500" />
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">Tải máy chủ (CPU/RAM)</p>
                  <p className="text-[10px] text-slate-400">Memory usage: 1.4 GB / 4.0 GB</p>
                </div>
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">28% CPU</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Tutor & Student Distribution Preview */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Tutor list preview */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-slate-50">
              Đội ngũ gia sư nổi bật
            </h2>
            <Link to="/admin/tutors" className="text-xs font-medium accent-link">
              Quản lý tất cả ({tutorList.length}) &rarr;
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {tutorList.slice(0, 4).map((t) => (
              <div key={t.id} className="flex items-center gap-4 p-4">
                <Avatar initials={t.initials} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
                    {t.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {t.specialization.slice(0, 2).join(", ")}
                    {t.specialization.length > 2 && ` +${t.specialization.length - 2}`}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="text-xs text-slate-400 font-medium">{t.studentsCount} học sinh</span>
                  <Badge tone={statusMeta[t.status]?.tone}>{statusMeta[t.status]?.label}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Student list preview */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-slate-50">
              Danh sách học sinh mới
            </h2>
            <Link to="/admin/students" className="text-xs font-medium accent-link">
              Quản lý phân công ({studentList.length}) &rarr;
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {studentList.slice(0, 4).map((s) => {
              const tutor = tutorList.find((t) => t.id === s.assignedTutorId);
              return (
                <div key={s.id} className="flex items-center gap-4 p-4">
                  <Avatar initials={s.initials} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
                      {s.name}
                    </p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{s.goal}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <Badge tone="neutral">{s.level}</Badge>
                    {tutor ? (
                      <span className="text-xs text-slate-400">{tutor.name}</span>
                    ) : (
                      <span className="text-xs font-semibold text-rose-500">Chưa gán gia sư</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Recent activity feed stream */}
      <Card padded={false}>
        <div className="flex items-center justify-between border-b border-slate-200 p-5 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Activity size={18} className="text-cyan-600 dark:text-cyan-400" />
            <h2 className="font-semibold text-slate-900 dark:text-slate-50">
              Nhật ký hoạt động hệ thống gần đây
            </h2>
          </div>
          <Link to="/admin/logs" className="text-xs font-medium accent-link">
            Xem toàn bộ nhật ký &rarr;
          </Link>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {activityLogs.slice(0, 5).map((log) => (
            <div key={log.id} className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50/60 dark:hover:bg-slate-800/30 transition-colors">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-semibold">
                  {log.actor.substring(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm text-slate-800 dark:text-slate-200">
                    <span className="font-semibold text-slate-900 dark:text-white">{log.actor}</span>: {log.detail}
                  </p>
                  <p className="text-[11px] text-slate-400">{formatTs(log.ts)}</p>
                </div>
              </div>
              <Badge tone="neutral" className="shrink-0 text-xs">
                {actionLabel[log.action] ?? log.action}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

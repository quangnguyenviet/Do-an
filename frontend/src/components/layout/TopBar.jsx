import { useLocation, useParams, useNavigate } from "react-router-dom";
import { Bell, Search, LogOut, ChevronRight, Bot } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useAiAssistant } from "../../context/AiAssistantContext";
import { notifications, getStudentById } from "../../data/mockData";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import Avatar from "../ui/Avatar";
import Button from "../ui/Button";

const roleLabel = { admin: "Quản trị viên", tutor: "Gia sư", student: "Học sinh" };

const routeMeta = {
  admin: {
    "/admin": { label: "Tổng quan" },
    "/admin/tutors": { label: "Quản lý gia sư" },
    "/admin/settings": { label: "Cài đặt" },
  },
  tutor: {
    "/tutor": { label: "Tổng quan" },
    "/tutor/students": { label: "Học sinh" },
    "/tutor/grading": { label: "Chấm bài" },
    "/tutor/inbox": { label: "Inbox" },
    "/tutor/notifications": { label: "Thông báo" },
    "/tutor/exercise-generator": { label: "Sinh bài tập" },
    "/tutor/library/paths": { label: "Kho lộ trình" },
    "/tutor/library/exercises": { label: "Kho bài tập" },
    "/tutor/library/materials": { label: "Kho video & tài liệu" },
    "/tutor/settings": { label: "Cài đặt" },
  },
  student: {
    "/student": { label: "Tổng quan" },
    "/student/schedule": { label: "Lịch học" },
    "/student/exercises": { label: "Bài tập & kiểm tra" },
    "/student/progress": { label: "Kết quả & tiến bộ" },
    "/student/materials": { label: "Tài liệu & video" },
    "/student/settings": { label: "Cài đặt" },
  },
};

const studentSubTabs = {
  overview: "Tổng quan",
  path: "Lộ trình học",
  exercises: "Bài tập",
  progress: "Kết quả & tiến bộ",
  materials: "Tài liệu & video",
};

function buildBreadcrumbs(pathname, studentId) {
  const crumbs = [];

  // Root: role-based
  if (pathname.startsWith("/admin")) {
    crumbs.push({ label: "Quản trị", to: "/admin" });
  } else if (pathname.startsWith("/tutor")) {
    crumbs.push({ label: "Gia sư", to: "/tutor" });
  } else if (pathname.startsWith("/student")) {
    crumbs.push({ label: "Học sinh", to: "/student" });
  }

  // Student detail pages
  if (studentId) {
    const student = getStudentById(studentId);
    const name = student?.name ?? "Học sinh";
    crumbs.push({ label: name, to: `/tutor/students/${studentId}` });

    // Sub-tab
    const segments = pathname.split("/").filter(Boolean);
    const subTabKey = segments[segments.length - 1]; // e.g. "path", "exercises"
    if (subTabKey && studentSubTabs[subTabKey]) {
      crumbs.push({ label: studentSubTabs[subTabKey] });
    }
  } else {
    // Non-student pages: look up from routeMeta
    const role = pathname.startsWith("/admin") ? "admin" : pathname.startsWith("/tutor") ? "tutor" : "student";
    const meta = routeMeta[role];
    if (meta) {
      // Try exact match first
      if (meta[pathname]) {
        crumbs.push({ label: meta[pathname].label });
      } else {
        // Try parent path
        const parent = pathname.substring(0, pathname.lastIndexOf("/")) || "/";
        if (meta[parent]) {
          crumbs.push({ label: meta[parent].label });
        }
      }
    }
  }

  return crumbs;
}

export default function TopBar() {
  const location = useLocation();
  const { studentId } = useParams();
  const { session, logout } = useAuth();
  const navigate = useNavigate();
  const { open: chatOpen, setOpen: setChatOpen } = useAiAssistant();
  const isTutor = session?.role === "tutor";
  const isAdmin = session?.role === "admin";

  const crumbs = buildBreadcrumbs(location.pathname, studentId);
  const unreadCount = notifications.filter((n) => !n.read).length;

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6 py-2.5 dark:border-slate-800 dark:bg-slate-950">
      {/* Breadcrumb */}
      <nav className="flex min-w-0 items-center gap-1.5 text-sm">
        {crumbs.map((crumb, i) => (
          <span key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && (
              <ChevronRight size={14} className="shrink-0 text-slate-400" />
            )}
            {crumb.to ? (
              <a
                href={crumb.to}
                className="truncate text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition"
              >
                {crumb.label}
              </a>
            ) : (
              <span className="truncate font-medium text-slate-900 dark:text-slate-50">
                {crumb.label}
              </span>
            )}
          </span>
        ))}
        {crumbs.length === 0 && (
          <span className="text-slate-500 dark:text-slate-400">
            {isAdmin ? "Quản trị viên" : isTutor ? "Gia sư" : "Học sinh"}
          </span>
        )}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2">
        {/* AI Assistant toggle — only for tutor */}
        {isTutor && (
          <Button
            variant={chatOpen ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setChatOpen((v) => !v)}
          >
            <Bot size={16} /> Trợ lý AI
          </Button>
        )}

        {/* Search */}
        <button
          title="Tìm kiếm"
          className="rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition"
        >
          <Search size={16} />
        </button>

        {/* Theme switcher */}
        <ThemeSwitcher />

        {/* Notifications — only for tutor */}
        {isTutor && !isAdmin && (
          <button
            title="Thông báo"
            onClick={() => navigate("/tutor/notifications")}
            className="relative rounded-md p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>
        )}

        {/* Avatar + logout — for student & admin (tutor already has this in sidebar) */}
        {!isTutor && session && (
          <div className="flex items-center gap-2 border-l border-slate-200 pl-3 dark:border-slate-800">
            <Avatar initials={session.initials} size="sm" />
            <div className="hidden min-w-0 sm:block">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
                {session.name}
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                {roleLabel[session.role]}
              </p>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:hover:text-slate-300 transition"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
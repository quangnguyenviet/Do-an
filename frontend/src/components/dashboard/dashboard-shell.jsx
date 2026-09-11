import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Home,
  CalendarDays,
  FolderOpen,
  ClipboardList,
  TrendingUp,
  User,
  GraduationCap,
  LogOut,
} from "lucide-react";
import ThemeToggle from "../theme-toggle";
import HomeView from "./views/home-view";
import ScheduleView from "./views/schedule-view";
import MaterialsView from "./views/materials-view";
import AssignmentsView from "./views/assignments-view";
import ProgressView from "./views/progress-view";
import ProfileView from "./views/profile-view";
import { student } from "../../lib/dashboard-data";

const navItems = [
  { id: "home", label: "Trang chủ", icon: Home },
  { id: "schedule", label: "Lịch học", icon: CalendarDays },
  { id: "materials", label: "Tài liệu", icon: FolderOpen },
  { id: "assignments", label: "Bài tập", icon: ClipboardList },
  { id: "progress", label: "Tiến độ", icon: TrendingUp },
  { id: "profile", label: "Hồ sơ", icon: User },
];

export function DashboardShell() {
  const [activeView, setActiveView] = useState("home");

  const renderView = () => {
    switch (activeView) {
      case "home":
        return <HomeView onViewChange={setActiveView} />;
      case "schedule":
        return <ScheduleView />;
      case "materials":
        return <MaterialsView />;
      case "assignments":
        return <AssignmentsView />;
      case "progress":
        return <ProgressView />;
      case "profile":
        return <ProfileView />;
      default:
        return <HomeView onViewChange={setActiveView} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col lg:flex-row selection:bg-primary selection:text-primary-foreground">
      {/* ===== Desktop Sidebar (lg+) ===== */}
      <aside className="hidden lg:flex flex-col w-64 border-r border-border bg-card p-4 fixed top-0 bottom-0 left-0 z-40 justify-between">
        <div className="space-y-6">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 px-3 py-2">
            <div className="p-2 rounded-xl bg-primary text-primary-foreground">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight text-foreground">
              English<span className="text-primary">Path</span>
            </span>
          </Link>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary/10 text-primary font-bold border border-primary/20"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-border space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-muted-foreground">Giao diện</span>
            <ThemeToggle />
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-muted/60 border border-border">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center shrink-0 border border-primary/30">
                MA
              </div>
              <div className="truncate">
                <p className="text-xs font-semibold text-foreground truncate">{student.name}</p>
                <p className="text-[10px] text-muted-foreground">{student.grade}</p>
              </div>
            </div>
            <Link to="/" title="Về trang chủ" className="text-muted-foreground hover:text-foreground p-1">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* ===== Top Header (Mobile only) ===== */}
      <header className="lg:hidden sticky top-0 z-30 w-full border-b border-border bg-background/80 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="font-bold text-lg text-foreground">EnglishPath</span>
        </Link>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary font-bold text-xs flex items-center justify-center border border-primary/30">
            MA
          </div>
        </div>
      </header>

      {/* ===== Main Content Workspace ===== */}
      <main className="flex-1 lg:pl-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8 max-w-7xl mx-auto w-full">
        {renderView()}
      </main>

      {/* ===== Mobile Bottom Navigation ===== */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border px-2 py-2 flex items-center justify-around shadow-lg">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center justify-center gap-1 px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
export default DashboardShell;

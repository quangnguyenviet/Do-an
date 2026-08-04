import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  NotebookPen,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  Video,
  User,
  Sparkles,
  ArrowRight,
  Filter,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import StatCard from "../../components/ui/StatCard";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import Button from "../../components/ui/Button";

export default function StudentDashboard() {
  const { session } = useAuth();
  const student = getStudentById(session?.studentId || "s1");

  const [selectedTutorFilter, setSelectedTutorFilter] = useState("all");

  const rawSchedule = student?.multiTutorSchedule || [];
  const rawExercises = student?.exercises || [];
  const tutorBreakdowns = student?.tutorProgressBreakdown || [];

  // Tutors List for filter
  const tutorsList = [
    { id: "all", name: "Tất cả Gia sư", color: "slate" },
    { id: "t1", name: "Nguyễn Lan Anh (IELTS)", color: "indigo" },
    { id: "t2", name: "Trần Minh Quân (Writing)", color: "blue" },
    { id: "t3", name: "Phạm Thu Hà (Giao tiếp)", color: "emerald" },
  ];

  // Active tutors overview cards data
  const activeTutorsData = [
    {
      id: "t1",
      name: "Nguyễn Lan Anh",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80",
      subject: "Luyện thi IELTS 6.5+",
      colorTheme: "indigo",
      nextSession: "Thứ 4 (19:30)",
      progress: 75,
      currentBand: "6.0/6.5 Band",
      statusBadge: "RẢNH 3 BUỔI/TUẦN",
      meetingLink: "https://meet.jit.si/EdTech_CoLanAnh_IELTS",
    },
    {
      id: "t2",
      name: "Trần Minh Quân",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80",
      subject: "IELTS Writing Task 2",
      colorTheme: "blue",
      nextSession: "Thứ 3 (19:00 - LIVE)",
      progress: 60,
      currentBand: "5.5/6.5 Band",
      statusBadge: "FULL LỊCH",
      meetingLink: "https://meet.jit.si/EdTech_ThayMinhQuan_WritingTask2",
    },
    {
      id: "t3",
      name: "Phạm Thu Hà",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80",
      subject: "Giao tiếp & Phát âm IPA",
      colorTheme: "emerald",
      nextSession: "Thứ 5 (18:00)",
      progress: 82,
      currentBand: "Trình độ B1",
      statusBadge: "RẢNH 4 BUỔI/TUẦN",
      meetingLink: "https://meet.jit.si/EdTech_CoThuHa_Pronunciation",
    },
  ];

  // Filter schedule & exercises
  const filteredSchedule = rawSchedule.filter(
    (s) => selectedTutorFilter === "all" || s.tutorId === selectedTutorFilter
  );
  const filteredExercises = rawExercises.filter(
    (e) => selectedTutorFilter === "all" || e.tutorId === selectedTutorFilter
  );

  const upcomingSessions = filteredSchedule.filter((s) => s.status !== "completed").slice(0, 3);
  const todoExercises = filteredExercises.filter((e) => e.status === "assigned" || e.status === "submitted");

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title={`Chào ${student.name.split(" ").pop()}! 👋`}
        description="Tổng quan Lộ trình Cá nhân hóa Multi-Tutor & Tiến độ học tập thích ứng Adaptive LMS."
      />

      {/* Quick Metrics Bar */}
      <div className="grid gap-4 sm:grid-cols-4">
        <StatCard icon={User} label="Gia sư đang ghép đôi" value="3 Gia sư" tone="indigo" />
        <StatCard icon={CalendarDays} label="Buổi học tuần này" value={`${rawSchedule.length} buổi`} tone="blue" />
        <StatCard icon={NotebookPen} label="Bài tập cần làm" value={`${todoExercises.length} bài`} tone="amber" />
      </div>

      {/* AI Roadmap Quick Action Banner */}
      <Card className="p-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <Sparkles size={20} className="text-amber-300" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold flex items-center gap-2">
                🤖 AI Lộ Trình Học Cá Nhân Hóa (3 Gia Sư)
              </h3>
              <p className="text-xs text-blue-100 mt-0.5">
                Xem lộ trình đường dài 3 giai đoạn (Phases) do AI & Gia sư biên soạn riêng dựa trên Placement Test.
              </p>
            </div>
          </div>
          <Link
            to="/student/progress"
            className="px-4 py-2 bg-white text-blue-700 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-sm shrink-0 flex items-center gap-1.5 transition-all hover:scale-105"
          >
            Xem lộ trình AI ngay <ArrowRight size={14} />
          </Link>
        </div>
      </Card>

      {/* 1. Active Tutors Cards Bar */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles size={18} className="text-amber-500" /> Gia sư cá nhân của bạn (3 Active Tutors)
          </h2>
          <Link to="/student/chat" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            Hộp thư trao đổi <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {activeTutorsData.map((tutor) => {
            const isLive = tutor.nextSession.includes("LIVE");
            return (
              <Card
                key={tutor.id}
                className={`p-4 border-t-4 ${
                  tutor.colorTheme === "indigo"
                    ? "border-t-indigo-500"
                    : tutor.colorTheme === "blue"
                    ? "border-t-blue-500"
                    : "border-t-emerald-500"
                } hover:shadow-lg transition-all`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={tutor.avatar}
                      alt={tutor.name}
                      className="w-12 h-12 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                        {tutor.name}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">{tutor.subject}</p>
                    </div>
                  </div>
                  <Badge tone={tutor.colorTheme === "indigo" ? "indigo" : tutor.colorTheme === "blue" ? "blue" : "emerald"}>
                    {tutor.currentBand}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Buổi tiếp theo:</span>
                    <span className={`font-bold flex items-center gap-1 ${isLive ? "text-rose-600 animate-pulse" : "text-slate-700 dark:text-slate-300"}`}>
                      <Clock size={12} /> {tutor.nextSession}
                    </span>
                  </div>
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Tiến độ khóa</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{tutor.progress}%</span>
                    </div>
                    <ProgressBar value={tutor.progress} size="xs" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to="/student/chat"
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    <MessageSquare size={14} /> Nhắn tin
                  </Link>
                  <a
                    href={tutor.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-semibold text-white shadow-sm transition-transform active:scale-95 ${
                      isLive ? "bg-rose-600 hover:bg-rose-700 animate-pulse" : "bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900"
                    }`}
                  >
                    <Video size={14} /> {isLive ? "Vào học LIVE" : "Phòng học"}
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Filter Bar */}
      <Card className="p-3">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-500 font-medium flex items-center gap-1 mr-1">
            <Filter size={14} /> Lọc dữ liệu theo Gia sư:
          </span>
          {tutorsList.map((t) => (
            <button
              key={t.id}
              onClick={() => setSelectedTutorFilter(t.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                selectedTutorFilter === t.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {t.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Weak Skill Alert */}
      {student?.weakSkill && (
        <Card className="flex items-center justify-between gap-4 border-amber-200 bg-amber-50/70 dark:border-amber-900/80 dark:bg-amber-950/30 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-xl shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                Kỹ năng trọng tâm cần ưu tiên: <span className="underline decoration-amber-400">{student.weakSkill}</span>
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">
                Gia sư <strong>Nguyễn Lan Anh & Trần Minh Quân</strong> đã giao 2 bài thực hành bổ trợ để bạn cải thiện trong tuần này.
              </p>
            </div>
          </div>
          <Link
            to="/student/exercises"
            className="shrink-0 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs"
          >
            Làm bài ngay
          </Link>
        </Card>
      )}

      {/* 2-Column Section: Upcoming Sessions & Todo Exercises */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Column 1: Upcoming Sessions */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2 text-sm">
              <CalendarDays size={18} className="text-blue-500" /> Buổi học sắp tới (Multi-Tutor)
            </h2>
            <Link to="/student/schedule" className="text-xs font-semibold accent-link hover:underline">
              Xem toàn bộ Lịch ➔
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {upcomingSessions.map((sessionItem) => (
              <div key={sessionItem.id} className="p-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2">
                    <img
                      src={sessionItem.tutorAvatar}
                      alt={sessionItem.tutorName}
                      className="w-7 h-7 rounded-full object-cover ring-2 ring-slate-100 dark:ring-slate-800"
                    />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sessionItem.tutorName}
                    </span>
                    <Badge tone={sessionItem.colorTheme === "indigo" ? "indigo" : sessionItem.colorTheme === "blue" ? "blue" : "emerald"} size="xs">
                      {sessionItem.subject}
                    </Badge>
                  </div>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    {sessionItem.dayOfWeek} ({sessionItem.startTime})
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 pl-9">
                  {sessionItem.topic}
                </p>
                <div className="mt-2 pl-9 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 italic">💡 {sessionItem.prepNote}</span>
                  <a
                    href={sessionItem.meetingLink}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                  >
                    Vào phòng ➔
                  </a>
                </div>
              </div>
            ))}
            {upcomingSessions.length === 0 && (
              <p className="p-6 text-center text-xs text-slate-400">Không có buổi học sắp tới nào.</p>
            )}
          </div>
        </Card>

        {/* Column 2: Todo Exercises */}
        <Card padded={false}>
          <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
            <h2 className="font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2 text-sm">
              <NotebookPen size={18} className="text-amber-500" /> Bài tập cần làm ({todoExercises.length})
            </h2>
            <Link to="/student/exercises" className="text-xs font-semibold accent-link hover:underline">
              Danh sách Bài tập ➔
            </Link>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {todoExercises.map((ex) => (
              <Link
                key={ex.id}
                to={`/student/exercises/${ex.id}`}
                className="flex items-center justify-between gap-3 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="min-w-0 flex items-start gap-3">
                  <img
                    src={ex.tutorAvatar}
                    alt={ex.tutorName}
                    className="w-8 h-8 rounded-full object-cover mt-0.5 ring-2 ring-slate-100 dark:ring-slate-800 shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-900 dark:text-slate-50">
                      {ex.title}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Giao bởi <strong className="text-slate-700 dark:text-slate-300">{ex.tutorName}</strong> &middot; {ex.skill} &middot; {ex.difficulty}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <Badge tone={ex.status === "assigned" ? "amber" : "neutral"}>
                    {ex.status === "assigned" ? "Chưa làm" : "Chờ chấm"}
                  </Badge>
                </div>
              </Link>
            ))}
            {todoExercises.length === 0 && (
              <p className="p-6 text-center text-xs text-slate-400">Bạn đã hoàn thành hết bài tập!</p>
            )}
          </div>
        </Card>
      </div>

      {/* 3. Multi-Tutor Progress Breakdown */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-500" /> Tiến độ Học tập Thích ứng theo từng Gia sư
            </h2>
            <p className="text-xs text-slate-500">So sánh điểm khởi điểm Baseline vs Tăng trưởng thực tế.</p>
          </div>
          <Link to="/student/progress" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Xem báo cáo 6 Kỹ năng ➔
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tutorBreakdowns.map((tb) => (
            <div
              key={tb.tutorId}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={tb.tutorAvatar}
                    alt={tb.tutorName}
                    className="w-7 h-7 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{tb.tutorName}</p>
                    <p className="text-[10px] text-slate-500">{tb.subject}</p>
                  </div>
                </div>
                <Badge tone="emerald" size="xs">
                  {tb.growthPercentage}
                </Badge>
              </div>

              <div className="grid grid-cols-3 gap-1 bg-white dark:bg-slate-900 p-2 rounded-lg text-center text-[10px]">
                <div>
                  <span className="text-slate-400 block">Đầu vào</span>
                  <span className="font-semibold text-slate-600 dark:text-slate-300">{tb.baselineScore}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Hiện tại</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{tb.currentScore}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Mục tiêu</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400">{tb.targetScore}</span>
                </div>
              </div>

              <div className="space-y-1.5">
                {tb.skills.map((sk) => (
                  <div key={sk.name} className="space-y-0.5">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-slate-600 dark:text-slate-400 font-medium">{sk.name}</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{sk.current}%</span>
                    </div>
                    <ProgressBar value={sk.current} size="xs" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

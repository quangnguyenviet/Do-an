import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Filter,
  CheckCircle2,
  Clock,
  MessageSquare,
  ArrowRight,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const statusMap = {
  assigned: { label: "Chưa làm", tone: "amber" },
  submitted: { label: "Chờ chấm", tone: "neutral" },
  graded: { label: "Đã chấm", tone: "emerald" },
};

export default function StudentExercises() {
  const { session } = useAuth();
  const student = getStudentById(session?.studentId || "s1");

  const [selectedTutor, setSelectedTutor] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const rawExercises = student?.exercises || [];

  const tutorList = [
    { id: "all", name: "Tất cả Gia sư" },
    { id: "t1", name: "Nguyễn Lan Anh (IELTS)" },
    { id: "t2", name: "Trần Minh Quân (Writing)" },
    { id: "t3", name: "Phạm Thu Hà (Giao tiếp)" },
  ];

  const statusList = [
    { id: "all", name: "Tất cả trạng thái" },
    { id: "assigned", name: "Chưa làm" },
    { id: "submitted", name: "Chờ chấm" },
    { id: "graded", name: "Đã chấm" },
  ];

  // Filter logic
  const filteredExercises = rawExercises.filter((ex) => {
    const matchTutor = selectedTutor === "all" || ex.tutorId === selectedTutor;
    const matchStatus = selectedStatus === "all" || ex.status === selectedStatus;
    return matchTutor && matchStatus;
  });

  // Calculate quick stats
  const totalCount = rawExercises.length;
  const assignedCount = rawExercises.filter((e) => e.status === "assigned").length;
  const submittedCount = rawExercises.filter((e) => e.status === "submitted").length;
  const gradedCount = rawExercises.filter((e) => e.status === "graded").length;

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <PageHeader
        title="Bài tập & Kiểm tra Thích ứng (Multi-Tutor)"
        description="Danh sách bài luyện tập và kiểm tra năng lực được giao bởi các Gia sư chuyên môn của bạn."
      />

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 flex items-center justify-between border-l-4 border-l-slate-500">
          <div>
            <p className="text-xs text-slate-500 font-medium">Tổng số bài tập</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{totalCount} bài</p>
          </div>
          <BookOpen className="text-slate-400" size={24} />
        </Card>
        <Card className="p-4 flex items-center justify-between border-l-4 border-l-amber-500">
          <div>
            <p className="text-xs text-slate-500 font-medium">Chưa làm</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">{assignedCount} bài</p>
          </div>
          <Clock className="text-amber-500" size={24} />
        </Card>
        <Card className="p-4 flex items-center justify-between border-l-4 border-l-blue-500">
          <div>
            <p className="text-xs text-slate-500 font-medium">Đang chờ chấm</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{submittedCount} bài</p>
          </div>
          <MessageSquare className="text-blue-500" size={24} />
        </Card>
        <Card className="p-4 flex items-center justify-between border-l-4 border-l-emerald-500">
          <div>
            <p className="text-xs text-slate-500 font-medium">Đã chấm điểm</p>
            <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400">{gradedCount} bài</p>
          </div>
          <CheckCircle2 className="text-emerald-500" size={24} />
        </Card>
      </div>

      {/* Controls & Filter Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tutor Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter size={14} /> Gia sư:
            </span>
            {tutorList.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTutor(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTutor === t.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 flex-wrap self-end md:self-auto">
            <span className="text-xs font-semibold text-slate-500">Trạng thái:</span>
            {statusList.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedStatus(s.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-all ${
                  selectedStatus === s.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Exercises Stream Cards */}
      <div className="space-y-4">
        {filteredExercises.map((ex) => {
          const isGraded = ex.status === "graded";
          const isAssigned = ex.status === "assigned";
          const isSubmitted = ex.status === "submitted";

          return (
            <Card
              key={ex.id}
              className={`p-5 hover:shadow-md transition-all border-l-4 ${
                ex.colorTheme === "indigo"
                  ? "border-l-indigo-500"
                  : ex.colorTheme === "blue"
                  ? "border-l-blue-500"
                  : "border-l-emerald-500"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                {/* Left Column: Tutor info & Title */}
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <img
                    src={ex.tutorAvatar}
                    alt={ex.tutorName}
                    className="w-11 h-11 rounded-2xl object-cover ring-2 ring-slate-100 dark:ring-slate-800 shrink-0 mt-0.5"
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {ex.tutorName}
                      </span>
                      <Badge tone={ex.colorTheme === "indigo" ? "indigo" : ex.colorTheme === "blue" ? "blue" : "emerald"} size="xs">
                        {ex.subject}
                      </Badge>
                      <span className="text-xs text-slate-400">&middot;</span>
                      <span className="text-xs text-slate-500">Giao ngày {ex.assignedDate}</span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {ex.title}
                    </h3>

                    <div className="flex items-center gap-2 flex-wrap pt-0.5">
                      <Badge tone="slate" size="xs">{ex.skill}</Badge>
                      <Badge tone="slate" size="xs">{ex.difficulty}</Badge>
                      <Badge tone="slate" size="xs">{ex.type}</Badge>
                      {ex.dueDate && (
                        <span className="text-[11px] text-amber-600 dark:text-amber-400 font-medium">
                          ⏱️ Hạn nộp: {ex.dueDate}
                        </span>
                      )}
                    </div>

                    {/* Tutor Feedback Box if Graded */}
                    {isGraded && ex.feedback && (
                      <div className="mt-3 p-3 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-xs">
                        <p className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5 mb-0.5">
                          <Sparkles size={14} /> Nhận xét của {ex.tutorName}:
                        </p>
                        <p className="text-emerald-900 dark:text-emerald-200 italic">
                          &quot;{ex.feedback}&quot;
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Status & Action Button */}
                <div className="flex items-center md:flex-col md:items-end justify-between gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    {isGraded && (
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Điểm số</span>
                        <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                          {ex.score}/{ex.maxScore}
                        </span>
                      </div>
                    )}
                    <Badge tone={statusMap[ex.status].tone}>
                      {statusMap[ex.status].label}
                    </Badge>
                  </div>

                  {isAssigned ? (
                    <Link
                      to={`/student/exercises/${ex.id}`}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-transform active:scale-95"
                    >
                      Làm bài ngay <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link
                      to={`/student/exercises/${ex.id}`}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1"
                    >
                      Xem chi tiết <FileText size={13} />
                    </Link>
                  )}
                </div>
              </div>
            </Card>
          );
        })}

        {filteredExercises.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-sm font-semibold text-slate-500">Không tìm thấy bài tập nào phù hợp với bộ lọc.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { CheckCircle2, Clock, Play, Sparkles, RefreshCw, FileText, ArrowRight, UserCheck, AlertCircle } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import { useStudentMatching } from "../../context/StudentMatchingContext";

export default function QuizMessageCard({ message }) {
  const navigate = useNavigate();
  const { approveTutorMatching, rejectTutorMatching, selectTutorAndStartOnboarding } = useStudentMatching();

  if (message.type === "onboarding_card") {
    const data = message.data || {};
    return (
      <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-900/50 dark:bg-blue-950/20">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <FileText size={15} />
            <span>Hồ sơ Mục tiêu Đầu vào</span>
          </div>
          <Badge tone="blue">Học sinh đã nộp</Badge>
        </div>

        <div className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
          <p>🎯 <strong>Mục tiêu:</strong> {data.targetGoal}</p>
          <p>📊 <strong>Trình độ hiện tại:</strong> {data.currentLevel}</p>
          <p>⚠️ <strong>Kỹ năng yếu:</strong> {Array.isArray(data.weakSkills) ? data.weakSkills.join(", ") : data.weakSkills}</p>
          <p>📅 <strong>Lịch học mong muốn:</strong> {data.weeklySchedule}</p>
          {data.note && <p className="italic text-slate-500">💬 &quot;{data.note}&quot;</p>}
        </div>
      </Card>
    );
  }

  if (message.type === "quiz_proposal_card") {
    const data = message.data || {};
    return (
      <Card className="border-amber-200 bg-amber-50/60 dark:border-amber-900/50 dark:bg-amber-950/20">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
            <Sparkles size={15} />
            <span>Bài Quiz Đánh giá Đầu vào</span>
          </div>
          <Badge tone="amber">15 phút</Badge>
        </div>

        <h4 className="mb-1 font-semibold text-slate-900 dark:text-slate-50">{data.quizTitle}</h4>
        <p className="mb-3 text-xs text-slate-600 dark:text-slate-300">
          Bài test trắc nghiệm & tự luận ngắn kiểm tra 6 kỹ năng để AI & Gia sư lập lộ trình phù hợp nhất cho bạn.
        </p>

        <div className="mb-4 flex flex-wrap gap-1">
          {data.skills?.map((sk) => (
            <span key={sk} className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800 dark:bg-amber-900/50 dark:text-amber-300">
              {sk}
            </span>
          ))}
        </div>

        <Button onClick={() => navigate("/student/exercises/placement-test")} className="w-full text-xs">
          <Play size={14} className="fill-current" /> Bắt đầu làm bài test ngay
        </Button>
      </Card>
    );
  }

  if (message.type === "quiz_result_card") {
    const data = message.data || {};
    const skillEntries = Object.entries(data.skillBreakdown || {});

    return (
      <Card className="border-emerald-200 bg-emerald-50/50 dark:border-emerald-900/50 dark:bg-emerald-950/20">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 size={15} />
            <span>Kết quả Placement Test</span>
          </div>
          <span className="text-xs text-slate-400">{data.completedAt}</span>
        </div>

        <div className="mb-3 flex items-center gap-4 rounded-lg bg-white p-3 shadow-sm dark:bg-slate-900">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xl font-extrabold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
            {data.score}/100
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500">Đề xuất phân lớp:</p>
            <p className="text-sm font-bold text-slate-900 dark:text-slate-50">{data.recommendedLevel}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">{data.tutorComment}</p>
          </div>
        </div>

        {/* Skill scores */}
        <div className="grid grid-cols-3 gap-2">
          {skillEntries.map(([skill, score]) => (
            <div key={skill} className="rounded bg-white/80 p-2 text-center shadow-xs dark:bg-slate-900/60">
              <span className="block text-[10px] text-slate-400">{skill}</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-100">{score}%</span>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (message.type === "roadmap_preview_card") {
    const data = message.data || {};

    return (
      <Card className="border-blue-300 bg-gradient-to-br from-blue-50/80 to-indigo-50/60 dark:border-blue-800 dark:from-blue-950/40 dark:to-indigo-950/30">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-300">
            <Sparkles size={15} />
            <span>Lộ trình Cá nhân hóa do Gia sư khởi tạo</span>
          </div>
          <Badge tone="blue">Sẵn sàng kích hoạt</Badge>
        </div>

        <h4 className="mb-1 font-bold text-slate-900 dark:text-slate-50">{data.recommendedPath}</h4>
        <p className="mb-3 text-xs text-slate-600 dark:text-slate-300">
          Mục tiêu Band: <strong className="text-blue-600 dark:text-blue-400">{data.targetBand}</strong> &middot; Lộ trình 12 buổi thiết kế dựa trên kết quả Quiz Placement Test của bạn.
        </p>

        <div className="mb-4 space-y-1 rounded-lg bg-white/80 p-3 text-xs text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
          <p>✅ <strong>Giai đoạn 1 (Buổi 1-4):</strong> Củng cố Ngữ pháp & Từ vựng nền tảng</p>
          <p>✅ <strong>Giai đoạn 2 (Buổi 5-8):</strong> Chiến thuật Viết luận Task 1 & Task 2</p>
          <p>✅ <strong>Giai đoạn 3 (Buổi 9-12):</strong> Luyện phản xạ Speaking & Thi thử Mock Test</p>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={approveTutorMatching} className="flex-1 text-xs">
            <UserCheck size={14} /> Chấp nhận & Bắt đầu khóa học
          </Button>
          <Button variant="secondary" onClick={() => rejectTutorMatching()} className="text-xs">
            Từ chối
          </Button>
        </div>
      </Card>
    );
  }

  if (message.type === "rejection_card") {
    const data = message.data || {};
    return (
      <Card className="border-rose-200 bg-rose-50/50 dark:border-rose-900/50 dark:bg-rose-950/20">
        <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-rose-700 dark:text-rose-400">
          <AlertCircle size={15} />
          <span>Gia sư tạm chưa thể nhận lớp này</span>
        </div>

        <p className="mb-3 text-xs text-slate-700 dark:text-slate-300">
          Lý do: <em>{data.reason}</em>
        </p>

        <div className="rounded-lg bg-white p-3 shadow-xs dark:bg-slate-900">
          <p className="mb-2 text-xs font-semibold text-slate-900 dark:text-slate-50">
            🔄 Hệ thống tự động chuyển kết quả Quiz ({data.savedQuizScore} điểm) & gợi ý 3 Gia sư tương đương:
          </p>

          <div className="space-y-2">
            {data.fallbackTutors?.map((ft) => (
              <div key={ft.id} className="flex items-center justify-between rounded border border-slate-100 p-2 text-xs dark:border-slate-800">
                <div>
                  <p className="font-semibold text-slate-900 dark:text-slate-100">{ft.name}</p>
                  <p className="text-[11px] text-slate-500">{ft.specialization?.slice(0, 2).join(", ")} &middot; {ft.ratePerHour}</p>
                </div>
                <Button size="sm" onClick={() => selectTutorAndStartOnboarding(ft)} className="text-[11px]">
                  Kết nối <ArrowRight size={12} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return null;
}

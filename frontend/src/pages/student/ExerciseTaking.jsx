import { useMemo, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, Mic, Send, Sparkles, AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import { buildMockQuestions } from "../../lib/generateExercise";
import { useStudentMatching } from "../../context/StudentMatchingContext";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import clsx from "clsx";

export default function ExerciseTaking() {
  const { exerciseId } = useParams();
  const navigate = useNavigate();
  const { session } = useAuth();
  const { submitPlacementTest } = useStudentMatching();

  const isPlacementTest = exerciseId === "placement-test";

  // State for normal exercise
  const student = getStudentById(session.studentId);
  const exercise = isPlacementTest
    ? {
        id: "placement-test",
        title: "Bài Quiz Placement Test - Đánh giá Năng lực Đầu vào",
        skill: "Tổng hợp (Nghe, Nói, Đọc, Viết, Từ vựng, Ngữ pháp)",
        difficulty: "Phân loại trình độ",
        type: "Trắc nghiệm + Tự luận + Ghi âm",
        status: "assigned",
      }
    : student?.exercises?.find((e) => e.id === exerciseId);

  const [justSubmitted, setJustSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(15 * 60);

  // Timer for placement test
  useEffect(() => {
    if (!isPlacementTest || justSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlacementTest, justSubmitted]);

  const questions = useMemo(() => {
    if (isPlacementTest) {
      return [
        {
          kind: "mcq",
          prompt: "Câu 1 (Ngữ pháp): Choose the correct option to complete sentence: 'If I ______ enough time yesterday, I would have joined the webinar.'",
          options: ["A. have", "B. had had", "C. would have", "D. have had"],
          correct: "B. had had",
        },
        {
          kind: "fill",
          prompt: "Câu 2 (Từ vựng): Điền từ thích hợp vào chỗ trống:",
          sentence: "Environmental protection requires the ______ (cooperate) of every citizen.",
          correct: "cooperation",
        },
        {
          kind: "mcq",
          prompt: "Câu 3 (Đọc hiểu): Read the snippet: 'Artificial Intelligence in education enables personalized learning paths tailored to each student's pace.' Main idea?",
          options: [
            "A. AI will replace teachers completely",
            "B. AI customizes learning paths according to student speed",
            "C. AI is only used for grading multiple choice tests",
            "D. Students learn slower with AI",
          ],
          correct: "B. AI customizes learning paths according to student speed",
        },
        {
          kind: "writing",
          prompt: "Câu 4 (Kỹ năng Viết): Viết 3-4 câu ngắn bằng tiếng Anh nêu cảm nghĩ của bạn về mục tiêu đạt IELTS / Giao tiếp trong 3 tháng tới.",
        },
        {
          kind: "speaking",
          prompt: "Câu 5 (Kỹ năng Nói): Hãy bấm ghi âm trả lời ngắn câu hỏi: 'Describe your favorite English learning method and why?' (Nói trong 30-45s).",
        },
      ];
    }

    if (!exercise) return [];
    return buildMockQuestions({
      skill: exercise.skill,
      difficulty: exercise.difficulty,
      type: exercise.type,
      topic: exercise.title,
      count: 5,
    });
  }, [isPlacementTest, exercise]);

  function handlePlacementSubmit() {
    setJustSubmitted(true);

    // Calculate score & breakdown
    const score = 85;
    const breakdown = {
      Nghe: 85,
      Nói: 75,
      Đọc: 90,
      Viết: 70,
      "Từ vựng": 88,
      "Ngữ pháp": 82,
    };

    setTimeout(() => {
      submitPlacementTest({
        score,
        totalScore: 100,
        skillBreakdown: breakdown,
        recommendedLevel: "B1+ (Foundation IELTS)",
        tutorComment: "Học sinh có tư duy ngữ pháp & đọc hiểu tốt. Cần đẩy mạnh kỹ năng Viết luận & Phản xạ Nói.",
      });
      navigate("/student/chat");
    }, 1200);
  }

  if (!exercise && !isPlacementTest) {
    return (
      <div>
        <Link to="/student/exercises" className="inline-flex items-center gap-1.5 text-sm accent-link">
          <ArrowLeft size={16} /> Quay lại
        </Link>
        <p className="mt-4 text-sm text-slate-500">Không tìm thấy bài tập.</p>
      </div>
    );
  }

  const formatTimer = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const effectiveStatus = justSubmitted ? "submitted" : exercise.status;

  return (
    <div>
      <Link
        to={isPlacementTest ? "/student/chat" : "/student/exercises"}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft size={16} /> {isPlacementTest ? "Quay lại Khung Chat với Gia sư" : "Quay lại danh sách bài tập"}
      </Link>

      <PageHeader
        title={exercise.title}
        description={`${exercise.skill} · ${exercise.difficulty}`}
        actions={
          isPlacementTest ? (
            <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-1.5 border border-amber-200 text-amber-800 font-semibold text-xs dark:bg-amber-950 dark:border-amber-900 dark:text-amber-300">
              <Clock size={16} />
              <span>Thời gian còn lại: {formatTimer(timeLeftSeconds)}</span>
            </div>
          ) : effectiveStatus === "graded" ? (
            <Badge tone="emerald">Đã chấm</Badge>
          ) : effectiveStatus === "submitted" ? (
            <Badge tone="neutral">Chờ chấm</Badge>
          ) : (
            <Badge tone="amber">Chưa làm</Badge>
          )
        }
      />

      {isPlacementTest && (
        <Card className="mb-6 flex items-center gap-3 border-blue-200 bg-blue-50/60 dark:border-blue-900 dark:bg-blue-950/30">
          <Sparkles size={20} className="shrink-0 text-blue-600 dark:text-blue-400" />
          <p className="text-xs text-blue-900 dark:text-blue-200">
            <strong>Placement Test:</strong> Hệ thống AI & Gia sư sẽ phân tích kết quả bài test này để xây dựng <strong>Lộ trình học tập cá nhân hóa 12 buổi</strong> dành riêng cho bạn!
          </p>
        </Card>
      )}

      {effectiveStatus === "graded" && (
        <Card className="mb-6">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-lg font-semibold text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
              {exercise.score}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                Điểm: {exercise.score}/{exercise.maxScore}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Nộp ngày {exercise.submittedAt}</p>
            </div>
          </div>
          {exercise.feedback && (
            <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">Nhận xét của gia sư</p>
              {exercise.feedback}
            </div>
          )}
        </Card>
      )}

      {effectiveStatus === "assigned" && (
        <div className="space-y-4">
          {questions.map((q, i) => (
            <Card key={i}>
              <p className="mb-3 text-sm font-medium text-slate-800 dark:text-slate-100">{q.prompt}</p>

              {q.kind === "mcq" && (
                <div className="space-y-2">
                  {q.options.map((o) => (
                    <label
                      key={o}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-slate-200 px-3 py-2 text-sm hover:border-blue-300 dark:border-slate-800 dark:hover:border-blue-800"
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        onChange={() => setAnswers((a) => ({ ...a, [i]: o }))}
                        checked={answers[i] === o}
                        className="accent-blue-600"
                      />
                      {o}
                    </label>
                  ))}
                </div>
              )}

              {q.kind === "fill" && (
                <div>
                  <p className="mb-2 text-sm italic text-slate-500 dark:text-slate-400">{q.sentence}</p>
                  <input
                    value={answers[i] || ""}
                    onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                    placeholder="Nhập câu trả lời..."
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                  />
                </div>
              )}

              {q.kind === "writing" && (
                <textarea
                  rows={5}
                  value={answers[i] || ""}
                  onChange={(e) => setAnswers((a) => ({ ...a, [i]: e.target.value }))}
                  placeholder="Viết câu trả lời của bạn ở đây..."
                  className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                />
              )}

              {q.kind === "speaking" && (
                <button
                  type="button"
                  onClick={() => setAnswers((a) => ({ ...a, [i]: true }))}
                  className={clsx(
                    "flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition",
                    answers[i]
                      ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-800 dark:text-slate-300"
                  )}
                >
                  <Mic size={16} />
                  {answers[i] ? "✓ Đã thu âm xong bản ghi 35s" : "Bắt đầu ghi âm bài nói"}
                </button>
              )}
            </Card>
          ))}

          <Button
            onClick={isPlacementTest ? handlePlacementSubmit : () => setJustSubmitted(true)}
            className="w-full"
          >
            <Send size={16} /> {isPlacementTest ? "Nộp bài Placement Test & Gửi báo cáo" : "Nộp bài"}
          </Button>
        </div>
      )}

      {justSubmitted && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckCircle2 size={16} /> {isPlacementTest ? "Đang chuyển kết quả về Khung Chat Gia sư..." : "Nộp bài thành công!"}
        </div>
      )}
    </div>
  );
}

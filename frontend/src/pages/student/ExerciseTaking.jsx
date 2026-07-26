import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Clock, Mic, Send } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import { buildMockQuestions } from "../../lib/generateExercise";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import clsx from "clsx";

export default function ExerciseTaking() {
  const { exerciseId } = useParams();
  const { session } = useAuth();
  const student = getStudentById(session.studentId);
  const exercise = student.exercises.find((e) => e.id === exerciseId);

  const [justSubmitted, setJustSubmitted] = useState(false);
  const [answers, setAnswers] = useState({});

  const questions = useMemo(() => {
    if (!exercise) return [];
    return buildMockQuestions({
      skill: exercise.skill,
      difficulty: exercise.difficulty,
      type: exercise.type,
      topic: exercise.title,
      count: 5,
    });
  }, [exercise]);

  if (!exercise) {
    return (
      <div>
        <Link to="/student/exercises" className="inline-flex items-center gap-1.5 text-sm accent-link">
          <ArrowLeft size={16} /> Quay lại
        </Link>
        <p className="mt-4 text-sm text-slate-500">Không tìm thấy bài tập.</p>
      </div>
    );
  }

  const effectiveStatus = justSubmitted ? "submitted" : exercise.status;

  return (
    <div>
      <Link
        to="/student/exercises"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft size={16} /> Quay lại danh sách bài tập
      </Link>

      <PageHeader
        title={exercise.title}
        description={`${exercise.skill} · ${exercise.difficulty} · ${exercise.type}`}
        actions={
          effectiveStatus === "graded" ? (
            <Badge tone="emerald">Đã chấm</Badge>
          ) : effectiveStatus === "submitted" ? (
            <Badge tone="neutral">Chờ chấm</Badge>
          ) : (
            <Badge tone="amber">Chưa làm</Badge>
          )
        }
      />

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

      {effectiveStatus === "submitted" && (
        <Card className="mb-6 flex items-center gap-3 border-slate-200 bg-slate-50/60 dark:bg-slate-800/40">
          <Clock size={18} className="shrink-0 text-slate-500" />
          <p className="text-sm text-slate-600 dark:text-slate-300">
            {justSubmitted ? "Bạn vừa nộp bài. " : "Bạn đã nộp bài. "}Gia sư sẽ chấm và gửi nhận xét sớm nhất có thể.
          </p>
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
                  rows={6}
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
                  {answers[i] ? "Đã ghi âm xong" : "Bắt đầu ghi âm"}
                </button>
              )}
            </Card>
          ))}

          <Button onClick={() => setJustSubmitted(true)} className="w-full">
            <Send size={16} /> Nộp bài
          </Button>
        </div>
      )}

      {justSubmitted && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <CheckCircle2 size={16} /> Nộp bài thành công!
        </div>
      )}
    </div>
  );
}

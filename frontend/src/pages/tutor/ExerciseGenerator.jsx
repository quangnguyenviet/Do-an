import { useState } from "react";
import { Sparkles, Loader2, CheckCircle2, RefreshCw, Send } from "lucide-react";
import { students, skillList } from "../../data/mockData";
import { buildMockQuestions } from "../../lib/generateExercise";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import clsx from "clsx";

const difficulties = ["Cơ bản", "Trung bình", "Nâng cao"];
const questionTypes = [
  "Trắc nghiệm",
  "Điền từ",
  "Viết đoạn văn",
  "Bài nói (role-play)",
];

export default function ExerciseGenerator() {
  const [studentId, setStudentId] = useState(students[0].id);
  const [topic, setTopic] = useState("");
  const [skill, setSkill] = useState(skillList[0]);
  const [difficulty, setDifficulty] = useState(difficulties[1]);
  const [type, setType] = useState(questionTypes[0]);
  const [count, setCount] = useState(5);

  const [status, setStatus] = useState("idle"); // idle | generating | preview | assigned
  const [questions, setQuestions] = useState([]);

  function handleGenerate(e) {
    e.preventDefault();
    setStatus("generating");
    setTimeout(() => {
      setQuestions(buildMockQuestions({ skill, difficulty, type, topic, count }));
      setStatus("preview");
    }, 1400);
  }

  function handleAssign() {
    setStatus("assigned");
  }

  const student = students.find((s) => s.id === studentId);

  return (
    <div>
      <PageHeader
        title="Sinh bài tập bằng AI"
        description="Hệ thống gọi API AI bên thứ ba (chuẩn OpenAI-compatible) để sinh bài tập bám sát lộ trình học."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Học sinh</label>
              <select
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
              >
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.level})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Chủ đề / nội dung buổi học
              </label>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder='VD: "Writing Task 2 - bài luận quan điểm"'
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Kỹ năng</label>
              <div className="flex flex-wrap gap-2">
                {skillList.map((sk) => (
                  <button
                    type="button"
                    key={sk}
                    onClick={() => setSkill(sk)}
                    className={clsx(
                      "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                      skill === sk
                        ? "border-blue-600 bg-blue-600 text-white"
                        : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
                    )}
                  >
                    {sk}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Độ khó</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                >
                  {difficulties.map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Dạng bài</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                >
                  {questionTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {(type === "Trắc nghiệm" || type === "Điền từ") && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Số lượng câu hỏi</label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="w-28 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                />
              </div>
            )}

            <Button type="submit" disabled={status === "generating"} className="w-full">
              {status === "generating" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Đang sinh bài tập...
                </>
              ) : (
                <>
                  <Sparkles size={16} /> Sinh bài tập bằng AI
                </>
              )}
            </Button>
          </form>
        </Card>

        <Card className="flex flex-col">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Xem trước & duyệt bài</h3>
            {status === "preview" && (
              <Badge tone="amber">Chưa giao</Badge>
            )}
            {status === "assigned" && <Badge tone="emerald">Đã giao cho học sinh</Badge>}
          </div>

          {status === "idle" && (
            <div className="flex flex-1 items-center justify-center py-12 text-center">
              <p className="max-w-xs text-sm text-slate-400">
                Điền thông tin bên trái và bấm "Sinh bài tập bằng AI" để xem bản nháp bài tập ở đây.
              </p>
            </div>
          )}

          {status === "generating" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 py-12">
              <Loader2 size={28} className="animate-spin text-blue-500" />
              <p className="text-sm text-slate-400">AI đang soạn bài tập cho {student?.name}...</p>
            </div>
          )}

          {(status === "preview" || status === "assigned") && (
            <>
              <p className="mb-3 text-xs text-slate-500 dark:text-slate-400">
                {skill} &middot; {difficulty} &middot; {type} &middot; Học sinh: {student?.name}
              </p>
              <div className="max-h-[420px] space-y-3 overflow-y-auto pr-1">
                {questions.map((q, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-800">
                    <p className="font-medium text-slate-800 dark:text-slate-100">{q.prompt}</p>
                    {q.kind === "mcq" && (
                      <ul className="mt-2 space-y-1 text-slate-500 dark:text-slate-400">
                        {q.options.map((o) => (
                          <li key={o} className={o.startsWith(q.answer) ? "font-medium text-emerald-600 dark:text-emerald-400" : ""}>
                            {o}
                          </li>
                        ))}
                      </ul>
                    )}
                    {q.kind === "fill" && (
                      <p className="mt-2 italic text-slate-500 dark:text-slate-400">{q.sentence}</p>
                    )}
                  </div>
                ))}
              </div>

              {status === "preview" && (
                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                  <Button variant="secondary" size="sm" onClick={handleGenerate} type="button">
                    <RefreshCw size={14} /> Sinh lại
                  </Button>
                  <Button size="sm" onClick={handleAssign} type="button" className="ml-auto">
                    <Send size={14} /> Duyệt & giao cho học sinh
                  </Button>
                </div>
              )}

              {status === "assigned" && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <CheckCircle2 size={16} />
                  Đã giao bài tập cho {student?.name}. Học sinh sẽ thấy bài này trong mục "Bài tập & kiểm tra".
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

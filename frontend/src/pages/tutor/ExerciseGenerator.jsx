import { useState, useRef } from "react";
import {
  Sparkles,
  Upload,
  FileText,
  Loader2,
  CheckCircle2,
  RefreshCw,
  Send,
  Download,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  X,
} from "lucide-react";
import clsx from "clsx";
import { students } from "../../data/mockData";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";

// --- Mock questions builder ---
function buildMockQuestions({ skill, difficulty, topic, count }) {
  return Array.from({ length: count }, (_, i) => ({
    number: i + 1,
    type: "mcq",
    prompt: `Câu ${i + 1}: Which option is correct for: "${topic || skill}"?`,
    options: ["A. First option", "B. Second option", "C. Third option", "D. Fourth option"],
    answer: "A. First option",
    explanation: `Giải thích: Đáp án đúng là A vì đây là quy tắc cơ bản của ${skill}. Lưu ý rằng các đáp án khác chứa lỗi phổ biến mà học sinh hay mắc phải khi mới bắt đầu.`,
  }));
}

// --- Mode tabs ---
const MODES = {
  AI: "ai",
  IMPORT: "import",
};

const CLASSIFICATION = {
  PRACTICE: {
    value: "PRACTICE",
    label: "Bài tập luyện tập",
    description: "Học sinh xem đáp án & lời giải chi tiết ngay sau từng câu",
    tone: "blue",
  },
  ASSESSMENT: {
    value: "ASSESSMENT",
    label: "Bài kiểm tra định kỳ",
    description: "Học sinh nộp toàn bộ bài rồi mới xem kết quả",
    tone: "amber",
  },
};

function ModeTab({ mode, current, onChange }) {
  return (
    <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
      <button
        type="button"
        onClick={() => onChange(MODES.AI)}
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
          current === MODES.AI
            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        )}
      >
        <Sparkles size={13} />
        Sinh bằng AI
      </button>
      <button
        type="button"
        onClick={() => onChange(MODES.IMPORT)}
        className={clsx(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
          current === MODES.IMPORT
            ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
            : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
        )}
      >
        <Upload size={13} />
        Import file
      </button>
    </div>
  );
}

function QuestionCard({ q, onUpdate }) {
  const [expanded, setExpanded] = useState(false);

  function updateField(field, value) {
    onUpdate(q.number - 1, { ...q, [field]: value });
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
      {/* Header */}
      <div className="bg-slate-50 dark:bg-slate-800/50 px-4 py-3 flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
          {q.number}
        </div>
        <div className="flex-1 min-w-0">
          <input
            value={q.prompt}
            onChange={(e) => updateField("prompt", e.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-900 dark:text-white outline-none placeholder:text-slate-400"
            placeholder="Nhập câu hỏi..."
          />
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="flex-shrink-0 p-1 rounded-md text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {/* Options */}
      <div className="px-4 py-3 space-y-2">
        {q.options.map((opt, i) => (
          <label
            key={i}
            className={clsx(
              "flex items-center gap-2.5 p-2 rounded-lg border cursor-pointer transition-colors",
              opt === q.answer
                ? "border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30"
                : "border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            )}
          >
            <input
              type="radio"
              name={`q-${q.number}`}
              checked={opt === q.answer}
              onChange={() => updateField("answer", opt)}
              className="accent-blue-600"
            />
            <input
              value={opt}
              onChange={(e) => {
                const updated = [...q.options];
                updated[i] = e.target.value;
                updateField("options", updated);
              }}
              className="flex-1 bg-transparent text-sm text-slate-700 dark:text-slate-200 outline-none placeholder:text-slate-400"
              placeholder={`Đáp án ${String.fromCharCode(65 + i)}`}
            />
            {opt === q.answer && (
              <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
            )}
          </label>
        ))}
      </div>

      {/* AI Explanation */}
      {expanded && (
        <div className="px-4 pb-4">
          <div className="rounded-lg border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/20 p-3">
            <p className="mb-1.5 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              <Lightbulb size={12} />
              Lời giải thích AI
            </p>
            <textarea
              value={q.explanation}
              onChange={(e) => updateField("explanation", e.target.value)}
              rows={3}
              className="w-full resize-none rounded-md bg-white/60 dark:bg-slate-800/60 border border-emerald-200 dark:border-emerald-800 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-emerald-400"
              placeholder="Lời giải thích chi tiết cho câu này..."
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default function ExerciseGenerator() {
  const [mode, setMode] = useState(MODES.AI);
  const [studentId, setStudentId] = useState(students[0].id);
  const [notes, setNotes] = useState("");
  const [classification, setClassification] = useState(CLASSIFICATION.PRACTICE.value);

  const [generating, setGenerating] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [preview, setPreview] = useState(false);
  const [assigned, setAssigned] = useState(false);
  const [importText, setImportText] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const fileRef = useRef(null);

  const student = students.find((s) => s.id === studentId);

  function handleGenerate() {
    setGenerating(true);
    setPreview(false);
    setAssigned(false);
    setTimeout(() => {
      const qs = buildMockQuestions({
        skill: "Ngữ pháp",
        difficulty: "Trung bình",
        topic: notes || "ôn tập chủ đề học sinh đang học",
        count: 5,
      });
      setQuestions(qs);
      setGenerating(false);
      setPreview(true);
    }, 1600);
  }

  function handleImport() {
    setGenerating(true);
    setPreview(false);
    setAssigned(false);
    setTimeout(() => {
      const qs = buildMockQuestions({
        skill: "Ngữ pháp",
        difficulty: "Trung bình",
        topic: importText || "bài tập từ file import",
        count: 5,
      });
      setQuestions(qs);
      setGenerating(false);
      setPreview(true);
      setImportText("");
    }, 1200);
  }

  function updateQuestion(idx, updated) {
    setQuestions((qs) => qs.map((q, i) => (i === idx ? updated : q)));
  }

  function handleAssign() {
    setAssigned(true);
  }

  return (
    <div className="px-4 lg:px-8 py-6 lg:py-8 max-w-6xl mx-auto space-y-5">
      {/* Page header */}
      <div>
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-slate-900 dark:text-white">
              Soạn bài tập AI
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Tutor Assistant — sinh bài tập cá nhân hóa trong 2 phút, giao ngay cho học sinh.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <ModeTab mode={mode} current={mode} onChange={setMode} />
          </div>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-5">

        {/* --- Left panel: Form (3/5) or Import (3/5) --- */}
        <div className="lg:col-span-3 space-y-4">
          {/* Student selector */}
          <Card>
            <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Chọn học sinh</h2>
            <div className="space-y-2">
              {students.map((s) => (
                <label
                  key={s.id}
                  className={clsx(
                    "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors",
                    studentId === s.id
                      ? "border-blue-300 dark:border-blue-800 bg-blue-50/60 dark:bg-blue-950/30"
                      : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  )}
                >
                  <input
                    type="radio"
                    name="student"
                    value={s.id}
                    checked={studentId === s.id}
                    onChange={() => setStudentId(s.id)}
                    className="accent-blue-600"
                  />
                  <Avatar initials={s.initials} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate">{s.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{s.level} · {s.goal}</p>
                  </div>
                  {studentId === s.id && (
                    <CheckCircle2 size={16} className="text-blue-500 ml-auto flex-shrink-0" />
                  )}
                </label>
              ))}
            </div>
          </Card>

          {/* Mode A: AI generation */}
          {mode === MODES.AI && (
            <Card>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Mô tả nội dung bài dạy</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Nhập ghi chú bài giảng hoặc mô tả yêu cầu bằng ngôn ngữ tự nhiên. AI sẽ tự sinh bài tập phù hợp.
              </p>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={5}
                placeholder={`Ví dụ: "Sinh 5 câu trắc nghiệm ôn tập Thì hiện tại đơn và Từ vựng chủ đề Thói quen hàng ngày cho học sinh 13 tuổi"`}
                className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-sm text-slate-700 dark:text-slate-200 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-950 placeholder:text-slate-400"
              />
              <div className="mt-3 flex justify-end">
                <Button
                  onClick={handleGenerate}
                  disabled={generating || preview || assigned}
                  className="gap-1.5"
                >
                  {generating ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      AI đang sinh bài tập...
                    </>
                  ) : (
                    <>
                      <Sparkles size={15} />
                      Sinh bài tập bằng AI
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* Mode B: Import structured file */}
          {mode === MODES.IMPORT && (
            <Card>
              <div className="mb-3">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-1">Import từ ChatGPT / Claude</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tải prompt mẫu → dán vào AI ngoài → upload file kết quả (JSON/Text) để trích xuất bài tập tự động.{" "}
                  <strong className="text-emerald-600 dark:text-emerald-400">0 chi phí token.</strong>
                </p>
              </div>

              {/* Prompt template download */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="mb-3 inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
              >
                <Download size={12} />
                Tải Prompt mẫu cho ChatGPT / Claude
              </a>

              {/* Upload zone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => setImportText(ev.target.result);
                    reader.readAsText(file);
                  }
                }}
                className={clsx(
                  "mb-3 rounded-xl border-2 border-dashed p-6 text-center transition-colors cursor-pointer",
                  dragOver
                    ? "border-blue-400 bg-blue-50 dark:bg-blue-950/30"
                    : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                )}
                onClick={() => fileRef.current?.click()}
              >
                <FileText size={24} className="mx-auto mb-2 text-slate-300 dark:text-slate-600" />
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  Kéo thả file hoặc bấm để chọn
                </p>
                <p className="text-xs text-slate-400 mt-1">JSON · Markdown · Text · định dạng cấu trúc</p>
                <input
                  ref={fileRef}
                  type="file"
                  accept=".json,.md,.txt"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) => setImportText(ev.target.result);
                      reader.readAsText(file);
                    }
                  }}
                />
              </div>

              {/* Paste area */}
              {importText ? (
                <div className="mb-3 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                  <div className="px-3 py-2 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                    <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                      Nội dung file đã tải lên
                    </p>
                    <button
                      type="button"
                      onClick={() => setImportText("")}
                      className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={4}
                    className="w-full resize-none border-0 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none font-mono"
                    placeholder="Nội dung file..."
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-300 mb-1.5">
                    Hoặc dán nội dung trực tiếp:
                  </p>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    rows={4}
                    placeholder="Dán kết quả JSON hoặc text từ ChatGPT/Claude vào đây..."
                    className="w-full resize-none rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs text-slate-700 dark:text-slate-200 outline-none focus:border-blue-400 font-mono"
                  />
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  onClick={handleImport}
                  disabled={generating || !importText.trim() || preview || assigned}
                  variant="secondary"
                  className="gap-1.5"
                >
                  {generating ? (
                    <>
                      <Loader2 size={15} className="animate-spin" />
                      Đang trích xuất...
                    </>
                  ) : (
                    <>
                      <Upload size={15} />
                      Trích xuất bài tập
                    </>
                  )}
                </Button>
              </div>
            </Card>
          )}

          {/* Classification + assign (when preview) */}
          {preview && !assigned && (
            <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/40 dark:bg-blue-950/20">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Phân loại bài tập
              </h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {Object.values(CLASSIFICATION).map((opt) => (
                  <label
                    key={opt.value}
                    className={clsx(
                      "flex flex-col gap-1 p-3 rounded-xl border cursor-pointer transition-colors",
                      classification === opt.value
                        ? opt.value === "PRACTICE"
                          ? "border-blue-400 bg-blue-100/60 dark:bg-blue-900/40 dark:border-blue-700"
                          : "border-amber-400 bg-amber-100/60 dark:bg-amber-900/40 dark:border-amber-700"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="classification"
                        value={opt.value}
                        checked={classification === opt.value}
                        onChange={() => setClassification(opt.value)}
                        className="accent-blue-600"
                      />
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{opt.label}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug pl-5">
                      {opt.description}
                    </p>
                  </label>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleAssign} className="gap-1.5">
                  <Send size={15} />
                  Giao bài cho {student?.name}
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={mode === MODES.AI ? handleGenerate : handleImport}
                  className="gap-1"
                >
                  <RefreshCw size={13} />
                  Sinh lại
                </Button>
              </div>
            </Card>
          )}

          {/* Assigned success */}
          {assigned && (
            <div className="rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/60 dark:bg-emerald-950/30 p-4 flex items-start gap-3">
              <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                  Đã giao bài tập cho {student?.name}
                </p>
                <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {classification === "PRACTICE"
                    ? "Học sinh xem đáp án & lời giải chi tiết ngay sau từng câu."
                    : "Học sinh nộp toàn bộ bài rồi mới xem kết quả."}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* --- Right panel: Preview (2/5) --- */}
        <div className="lg:col-span-2">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">Xem trước bài tập</h2>
              {preview && questions.length > 0 && (
                <Badge tone="blue">{questions.length} câu</Badge>
              )}
            </div>

            {!preview && !generating && (
              <Card className="flex items-center justify-center py-12">
                <div className="text-center">
                  <Sparkles size={28} className="mx-auto mb-3 text-slate-200 dark:text-slate-700" />
                  <p className="text-sm text-slate-400 max-w-[180px] mx-auto leading-relaxed">
                    {mode === MODES.AI
                      ? "Điền mô tả và bấm Sinh bài tập bằng AI để xem nháp."
                      : "Upload file JSON/text từ ChatGPT rồi bấm Trích xuất."}
                  </p>
                </div>
              </Card>
            )}

            {generating && (
              <Card className="flex flex-col items-center justify-center py-12 gap-3">
                <Loader2 size={28} className="animate-spin text-blue-500" />
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    {mode === MODES.AI ? "AI đang soạn bài tập..." : "Đang trích xuất bài tập..."}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Thường mất dưới 5 giây</p>
                </div>
              </Card>
            )}

            {preview && questions.length > 0 && !assigned && (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {questions.map((q) => (
                  <QuestionCard key={q.number} q={q} onUpdate={updateQuestion} />
                ))}
              </div>
            )}

            {assigned && (
              <Card className="flex items-center justify-center py-12">
                <div className="text-center">
                  <CheckCircle2 size={36} className="mx-auto mb-3 text-emerald-500" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Bài tập đã được giao
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Xem lại tại "Bài tập & kiểm tra" của học sinh
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Bottom padding */}
      <div className="h-20 lg:hidden" />
    </div>
  );
}

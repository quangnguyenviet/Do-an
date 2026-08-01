import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Loader2, Send, PlusCircle, CheckCircle2 } from "lucide-react";
import Button from "../ui/Button";
import { craftAiReply } from "../../lib/aiAssistant";

// Context-aware quick-start prompts so the tutor can tap instead of typing a
// prompt from scratch every time (max 3, most useful first).
function buildChips(student, focusSession) {
  if (!student) return [];
  const chips = [];
  if (focusSession) {
    chips.push({
      id: "focus-exercise",
      label: `Bài tập cho Buổi ${focusSession.session}`,
      text: `Soạn bài tập cho Buổi ${focusSession.session}: ${focusSession.topic}`,
    });
  }
  if (student.weakSkill) {
    chips.push({
      id: "weak-path",
      label: `2 buổi học tập trung ${student.weakSkill}`,
      text: `Soạn 2 buổi học tiếp theo tập trung ${student.weakSkill}`,
    });
    chips.push({
      id: "weak-exercise",
      label: `Bài tập kỹ năng ${student.weakSkill}`,
      text: `Soạn bài tập kỹ năng ${student.weakSkill}`,
    });
  }
  return chips.slice(0, 3);
}

function greeting(student) {
  const text = student
    ? `Chào cô! Em có thể giúp soạn nháp lộ trình học hoặc bài tập cho ${student.name}. Cô mô tả yêu cầu, ví dụ: "Tạo 2 buổi tiếp theo tập trung Writing" hoặc "Soạn bài tập Nghe nâng cao".`
    : `Chào cô! Em có thể giúp soạn nháp lộ trình học hoặc bài tập. Cô mô tả yêu cầu ở đây, hoặc mở trang một học sinh cụ thể để em soạn nháp và thêm thẳng vào lộ trình/bài tập của bạn đó.`;
  return [{ id: "greet", role: "ai", text }];
}

export default function TutorAiAssistant({ student, nextSession, pathItems, focusSession, onApplyPath, onApplyExercise }) {
  const [messages, setMessages] = useState(() => greeting(student));
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);
  const chips = useMemo(() => buildChips(student, focusSession), [student, focusSession]);

  useEffect(() => {
    setMessages(greeting(student));
  }, [student?.id]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  function sendMessage(text) {
    const trimmed = text.trim();
    if (!trimmed || thinking) return;
    setMessages((prev) => [...prev, { id: `u-${prev.length}-${trimmed.length}`, role: "user", text: trimmed }]);
    setDraft("");
    setThinking(true);
    setTimeout(() => {
      const { replyText, draft: aiDraft } = craftAiReply(trimmed, { student, nextSession, pathItems });
      setMessages((prev) => [
        ...prev,
        { id: `a-${prev.length}`, role: "ai", text: replyText, draft: aiDraft, applied: false },
      ]);
      setThinking(false);
    }, 1100);
  }

  function handleSend() {
    sendMessage(draft);
  }

  function handleChipClick(chip) {
    sendMessage(chip.text);
  }

  function applyDraft(msgId) {
    const msg = messages.find((m) => m.id === msgId);
    if (!msg?.draft || msg.applied) return;
    if (msg.draft.type === "path") {
      if (!onApplyPath) return;
      onApplyPath(msg.draft.items);
    }
    if (msg.draft.type === "exercise") {
      if (!onApplyExercise) return;
      onApplyExercise(msg.draft.exercise);
    }
    setMessages((prev) => prev.map((m) => (m.id === msgId ? { ...m, applied: true } : m)));
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2 border-b border-white/10 p-3">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
          <Bot size={16} />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">Trợ lý AI</p>
          <p className="truncate text-xs text-slate-400">Soạn nháp lộ trình & bài tập</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3">
        {messages.map((m) => (
          <div key={m.id} className={m.role === "user" ? "ml-auto max-w-[92%]" : "max-w-[95%]"}>
            <div
              className={
                m.role === "user"
                  ? "ml-auto rounded-xl bg-cyan-500 px-3 py-2 text-sm text-white"
                  : "rounded-xl bg-white/10 px-3 py-2 text-sm text-slate-200"
              }
            >
              {m.text}
            </div>

            {m.draft?.type === "path" && (
              <div className="mt-2 space-y-2 rounded-lg border border-white/10 bg-white/5 p-3 text-xs">
                <p className="font-medium text-slate-400">Bản nháp lộ trình</p>
                {m.draft.items.map((it) => (
                  <div key={it.id} className="rounded-md bg-white/5 p-2">
                    <p className="font-medium text-slate-100">
                      Buổi {it.session}: {it.topic}
                    </p>
                    <p className="mt-0.5 text-slate-400">
                      {it.phase} &middot; {it.skills.join(", ")}
                    </p>
                  </div>
                ))}
                {m.applied ? (
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 size={14} /> Đã thêm vào lộ trình
                  </div>
                ) : onApplyPath ? (
                  <Button size="sm" variant="secondary" onClick={() => applyDraft(m.id)} className="w-full">
                    <PlusCircle size={14} /> Thêm vào lộ trình
                  </Button>
                ) : (
                  <p className="text-slate-400">Mở trang một học sinh để thêm bản nháp này vào lộ trình của bạn đó.</p>
                )}
              </div>
            )}

            {m.draft?.type === "exercise" && (
              <div className="mt-2 space-y-2 rounded-lg border border-white/10 bg-white/5 p-3 text-xs">
                <p className="font-medium text-slate-400">
                  Bản nháp bài tập &middot; {m.draft.exercise.skill} &middot; {m.draft.exercise.difficulty}
                </p>
                <p className="text-slate-400">
                  Gắn với:{" "}
                  <span className="font-medium text-slate-200">
                    {m.draft.exercise.sessionLabel ?? "Chưa gắn buổi học"}
                  </span>
                </p>
                <div className="max-h-32 space-y-1.5 overflow-y-auto">
                  {m.draft.exercise.questions.slice(0, 3).map((q, i) => (
                    <p key={i} className="rounded-md bg-white/5 p-2 text-slate-300">
                      {q.prompt}
                    </p>
                  ))}
                  {m.draft.exercise.questions.length > 3 && (
                    <p className="text-slate-400">+{m.draft.exercise.questions.length - 3} câu khác...</p>
                  )}
                </div>
                {m.applied ? (
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 size={14} /> Đã thêm vào danh sách bài tập
                  </div>
                ) : onApplyExercise ? (
                  <Button size="sm" variant="secondary" onClick={() => applyDraft(m.id)} className="w-full">
                    <PlusCircle size={14} /> Thêm vào danh sách bài tập
                  </Button>
                ) : (
                  <p className="text-slate-400">Mở trang một học sinh để thêm bản nháp này vào danh sách bài tập của bạn đó.</p>
                )}
              </div>
            )}
          </div>
        ))}

        {thinking && (
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Loader2 size={14} className="animate-spin" /> AI đang soạn...
          </div>
        )}
      </div>

      <div className="border-t border-white/10">
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-3 pt-3">
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => handleChipClick(c)}
                disabled={thinking}
                className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-end gap-2 p-3">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="VD: Tạo 2 buổi tiếp theo tập trung Writing..."
            rows={2}
            className="flex-1 resize-none rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 placeholder:text-slate-500"
          />
          <Button size="sm" onClick={handleSend} disabled={thinking} className="shrink-0">
            <Send size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
}
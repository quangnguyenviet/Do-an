// Mock "AI chat" helper for the tutor's right-side assistant — no real backend,
// just keyword heuristics that produce a draft the tutor can review and apply.
import { skillList } from "../data/mockData";
import { buildMockQuestions } from "./generateExercise";

const EXERCISE_KEYWORDS = ["bài tập", "bai tap", "câu hỏi", "cau hoi", "đề kiểm tra", "kiểm tra", "quiz", "exercise"];
const PATH_KEYWORDS = ["lộ trình", "lo trinh", "buổi học", "buoi hoc", "kế hoạch", "ke hoach", "giáo án", "giao an"];

function normalize(s) {
  return (s || "").toLowerCase();
}

function detectSkills(text) {
  const t = normalize(text);
  return skillList.filter((sk) => t.includes(sk.toLowerCase()));
}

function detectDifficulty(text) {
  const t = normalize(text);
  if (t.includes("nâng cao") || t.includes("nang cao") || t.includes("khó")) return "Nâng cao";
  if (t.includes("cơ bản") || t.includes("co ban") || t.includes("dễ")) return "Cơ bản";
  return "Trung bình";
}

function detectExerciseType(text) {
  const t = normalize(text);
  if (t.includes("viết") || t.includes("viet") || t.includes("tự luận") || t.includes("essay")) return "Viết đoạn văn";
  if (t.includes("nói") || t.includes("noi") || t.includes("speaking") || t.includes("ghi âm")) return "Bài nói (role-play)";
  if (t.includes("điền từ") || t.includes("dien tu") || t.includes("fill")) return "Điền từ";
  return "Trắc nghiệm";
}

// Picks which learning-path session a drafted exercise should attach to: an explicit
// "buổi N" mention wins, otherwise fall back to the session currently in progress,
// else the most recently added one.
function detectTargetSession(text, pathItems) {
  if (!pathItems?.length) return null;
  const m = normalize(text).match(/bu[oổ]i\s*(\d+)/i);
  if (m) {
    const found = pathItems.find((it) => it.session === Number(m[1]));
    if (found) return found;
  }
  const inProgress = pathItems.find((it) => it.status === "in_progress");
  if (inProgress) return inProgress;
  return [...pathItems].sort((a, b) => (b.session || 0) - (a.session || 0))[0];
}

// Returns { replyText, draft } where draft is { type: 'path', items } or { type: 'exercise', exercise } or null.
export function craftAiReply(message, { student, nextSession, pathItems }) {
  const t = normalize(message);
  const wantsExercise =
    EXERCISE_KEYWORDS.some((k) => t.includes(k)) && !PATH_KEYWORDS.some((k) => t.includes(k));

  if (wantsExercise) {
    const detected = detectSkills(message);
    const skill = detected[0] || student?.weakSkill || skillList[0];
    const difficulty = detectDifficulty(message);
    const type = detectExerciseType(message);
    const questions = buildMockQuestions({ skill, difficulty, type, topic: message, count: 5 });
    const targetSession = detectTargetSession(message, pathItems);
    const sessionNote = targetSession
      ? ` Em gắn bài này với Buổi ${targetSession.session}: ${targetSession.topic}.`
      : " Lộ trình chưa có buổi học nào nên em để bài tập này chưa gắn buổi, cô có thể gắn sau.";
    return {
      replyText: `Em soạn nháp một bài tập kỹ năng ${skill} (${difficulty}, ${type}) theo yêu cầu của cô.${sessionNote} Cô xem thử bên dưới, ổn thì bấm "Thêm vào danh sách bài tập" nhé.`,
      draft: {
        type: "exercise",
        exercise: {
          title: message.trim() || `Bài tập ${skill}`,
          skill,
          difficulty,
          type,
          questions,
          sessionId: targetSession?.id ?? null,
          sessionLabel: targetSession ? `Buổi ${targetSession.session}: ${targetSession.topic}` : null,
        },
      },
    };
  }

  // Default: draft learning-path sessions.
  const detected = detectSkills(message);
  const finalSkills = detected.length ? detected : [student?.weakSkill || skillList[0]];
  const phaseMatch = message.match(/giai đoạn[^,.\n]*/i);
  const phase = phaseMatch ? phaseMatch[0].trim() : "Giai đoạn bổ sung (AI đề xuất)";
  const count = 2;
  const items = Array.from({ length: count }).map((_, i) => ({
    id: `ai-${nextSession + i}-${Math.round(Math.random() * 1e6)}`,
    phase,
    session: nextSession + i,
    date: "Chưa xếp lịch",
    skills: finalSkills,
    topic: `${message.trim()}${count > 1 ? ` (Buổi ${i + 1})` : ""}`,
    status: "upcoming",
  }));
  return {
    replyText: `Em đề xuất ${count} buổi học mới cho "${phase}", tập trung kỹ năng ${finalSkills.join(", ")}. Cô xem thử bên dưới và bấm "Thêm vào lộ trình" nếu đồng ý nhé.`,
    draft: { type: "path", items },
  };
}

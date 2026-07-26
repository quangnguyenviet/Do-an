// Mock "AI generation" helper shared by the tutor's exercise generator
// and the student's exercise-taking view (no real backend in this prototype).
export function buildMockQuestions({ skill, difficulty, type, topic, count }) {
  const n = Number(count) || 5;
  if (type === "Trắc nghiệm") {
    return Array.from({ length: n }, (_, i) => ({
      kind: "mcq",
      prompt: `Câu ${i + 1}: Chọn đáp án đúng liên quan đến chủ đề "${topic || skill}" (độ khó: ${difficulty}).`,
      options: ["A. Phương án A", "B. Phương án B", "C. Phương án C", "D. Phương án D"],
      answer: "B",
    }));
  }
  if (type === "Điền từ") {
    return Array.from({ length: n }, (_, i) => ({
      kind: "fill",
      prompt: `Câu ${i + 1}: Điền từ còn thiếu vào chỗ trống — chủ đề "${topic || skill}".`,
      sentence: "She ____ (go) to school every day.",
    }));
  }
  if (type === "Viết đoạn văn" || type === "Tự luận") {
    return [
      {
        kind: "writing",
        prompt: `Viết một đoạn văn (${difficulty === "Nâng cao" ? "150-180" : "80-100"} từ) về chủ đề "${topic || skill}".`,
      },
    ];
  }
  return [
    {
      kind: "speaking",
      prompt: `Ghi âm phần nói theo tình huống role-play: "${topic || skill}". Thời lượng gợi ý: 1-2 phút.`,
    },
  ];
}

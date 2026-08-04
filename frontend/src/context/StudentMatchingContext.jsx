import { createContext, useContext, useState, useEffect } from "react";
import { tutors } from "../data/mockData";

const StudentMatchingContext = createContext(null);
const STORAGE_KEY = "gsa_student_matching_threads_v2";

const DEFAULT_ONBOARDING = {
  targetGoal: "Luyện thi IELTS 6.5",
  currentLevel: "B1 / Trung cấp",
  weakSkills: ["Viết", "Nói"],
  weeklySchedule: "3 buổi/tuần (Tối T2 - T4 - T6)",
  note: "Em muốn tập trung cải thiện từ vựng và cấu trúc câu cho Writing Task 2.",
};

const DEFAULT_PLACEMENT_RESULT = {
  score: 82,
  totalScore: 100,
  completedAt: "14:30 04/08/2026",
  skillBreakdown: {
    "Nghe": 85,
    "Nói": 70,
    "Đọc": 90,
    "Viết": 65,
    "Từ vựng": 88,
    "Ngữ pháp": 80,
  },
  recommendedLevel: "B1+ (Foundation IELTS)",
  tutorComment: "Học sinh có khả năng Đọc & Từ vựng tốt. Cần tập trung nâng cao kỹ năng Viết luận và Phản xạ Nói.",
};

// Default initial threads for prototype testing with multiple tutors
const INITIAL_THREADS = {
  t1: {
    tutor: tutors[0], // Nguyễn Lan Anh
    studentStatus: "MATCHED",
    onboardingData: DEFAULT_ONBOARDING,
    placementTestResult: DEFAULT_PLACEMENT_RESULT,
    chatMessages: [
      { id: "m1-1", sender: "system", timestamp: "09:00", text: "Bạn đã kết nối thành công với Gia sư Nguyễn Lan Anh." },
      { id: "m1-2", sender: "student", timestamp: "09:01", type: "onboarding_card", data: DEFAULT_ONBOARDING },
      { id: "m1-3", sender: "tutor", timestamp: "09:02", type: "quiz_result_card", data: DEFAULT_PLACEMENT_RESULT },
      {
        id: "m1-4",
        sender: "tutor",
        timestamp: "09:05",
        text: "🎉 Chúc mừng! Tôi đã chấp nhận hồ sơ và kích hoạt Lộ trình học 12 buổi. Em hãy kiểm tra phần Lịch học & Bài tập nhé!",
      },
    ],
  },
  t2: {
    tutor: tutors[1], // Trần Minh Quân
    studentStatus: "WAITING_APPROVAL",
    onboardingData: {
      targetGoal: "IELTS Writing 7.0+",
      currentLevel: "B2 / Khá",
      weakSkills: ["Viết"],
      weeklySchedule: "2 buổi/tuần (Tối T3 - T5)",
      note: "Muốn học chuyên sâu kỹ năng Viết luận IELTS Task 2.",
    },
    placementTestResult: {
      score: 88,
      totalScore: 100,
      completedAt: "10:15 Hôm nay",
      skillBreakdown: { "Nghe": 90, "Nói": 80, "Đọc": 95, "Viết": 75, "Từ vựng": 92, "Ngữ pháp": 86 },
      recommendedLevel: "IELTS Writing Intensive (Target 7.0+)",
      tutorComment: "Điểm Viết của học sinh khá tốt, cần luyện thêm cách mở rộng ý tưởng và dùng từ nối học thuật.",
    },
    chatMessages: [
      { id: "m2-1", sender: "system", timestamp: "10:00", text: "Bạn đã gửi yêu cầu kết nối tới Gia sư Trần Minh Quân." },
      {
        id: "m2-2",
        sender: "student",
        timestamp: "10:01",
        type: "onboarding_card",
        data: {
          targetGoal: "IELTS Writing 7.0+",
          currentLevel: "B2 / Khá",
          weakSkills: ["Viết"],
          weeklySchedule: "2 buổi/tuần (Tối T3 - T5)",
        },
      },
      {
        id: "m2-3",
        sender: "tutor",
        timestamp: "10:15",
        type: "quiz_result_card",
        data: {
          score: 88,
          totalScore: 100,
          completedAt: "10:15 Hôm nay",
          skillBreakdown: { "Nghe": 90, "Nói": 80, "Đọc": 95, "Viết": 75, "Từ vựng": 92, "Ngữ pháp": 86 },
          recommendedLevel: "IELTS Writing Intensive (Target 7.0+)",
          tutorComment: "Điểm Viết của học sinh khá tốt, cần luyện thêm cách mở rộng ý tưởng và dùng từ nối học thuật.",
        },
      },
      {
        id: "m2-4",
        sender: "tutor",
        timestamp: "Vừa xong",
        type: "roadmap_preview_card",
        data: {
          status: "pending_approval",
          recommendedPath: "Lộ trình 10 Buổi: IELTS Writing Task 1 & Task 2 Master",
          targetBand: "6.5 -> 7.5",
        },
      },
    ],
  },
  t3: {
    tutor: tutors[2], // Phạm Thu Hà
    studentStatus: "CHAT_&_QUIZ",
    onboardingData: {
      targetGoal: "Phát âm IPA & Giao tiếp phản xạ",
      currentLevel: "A2 / Sơ cấp",
      weakSkills: ["Nói", "Phát âm"],
      weeklySchedule: "2 buổi/tuần (Tối T7 - CN)",
      note: "Muốn học phát âm chuẩn và tự tin nói chuyện.",
    },
    placementTestResult: null,
    chatMessages: [
      { id: "m3-1", sender: "system", timestamp: "11:00", text: "Bạn đã gửi yêu cầu kết nối tới Gia sư Phạm Thu Hà." },
      {
        id: "m3-2",
        sender: "tutor",
        timestamp: "11:05",
        text: "Chào em! Tôi chào đón em đến với khóa học Phát âm & Giao tiếp. Em làm bài Quiz 15 phút bên dưới để tôi xếp lớp nhé!",
      },
      {
        id: "m3-3",
        sender: "tutor",
        timestamp: "11:05",
        type: "quiz_proposal_card",
        data: {
          quizTitle: "Bài Quiz Đánh giá Phát âm & Phản xạ Đầu vào",
          durationMinutes: 15,
          totalQuestions: 8,
          skills: ["Phát âm", "Nói", "Nghe"],
        },
      },
    ],
  },
};

export function StudentMatchingProvider({ children }) {
  const [threads, setThreads] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved).threads || INITIAL_THREADS : INITIAL_THREADS;
    } catch {
      return INITIAL_THREADS;
    }
  });

  const [activeTutorId, setActiveTutorId] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved && JSON.parse(saved).activeTutorId ? JSON.parse(saved).activeTutorId : "t1";
    } catch {
      return "t1";
    }
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ threads, activeTutorId }));
  }, [threads, activeTutorId]);

  // Current active thread
  const activeThread = threads[activeTutorId] || threads["t1"] || Object.values(threads)[0];
  const selectedTutor = activeThread?.tutor || tutors[0];
  const studentStatus = activeThread?.studentStatus || "SEARCHING";
  const onboardingData = activeThread?.onboardingData || DEFAULT_ONBOARDING;
  const placementTestResult = activeThread?.placementTestResult || DEFAULT_PLACEMENT_RESULT;
  const chatMessages = activeThread?.chatMessages || [];

  // Check overall LMS unlocked status (if ANY tutor is matched)
  const isAnyMatched = Object.values(threads).some((t) => t.studentStatus === "MATCHED");

  // Global student status for top-level navigation:
  // If active thread is matched OR any thread is matched -> MATCHED for LMS
  const globalStudentStatus = isAnyMatched ? "MATCHED" : studentStatus;

  // Actions
  function setStudentStatus(status) {
    if (!activeTutorId) return;
    setThreads((prev) => ({
      ...prev,
      [activeTutorId]: {
        ...prev[activeTutorId],
        studentStatus: status,
      },
    }));
  }

  function selectTutorAndStartOnboarding(tutorItem) {
    const tid = tutorItem.id;
    setActiveTutorId(tid);

    setThreads((prev) => {
      const existing = prev[tid];
      if (existing) {
        return {
          ...prev,
          [tid]: {
            ...existing,
            studentStatus: existing.studentStatus === "MATCHED" ? "MATCHED" : "ONBOARDING",
          },
        };
      }

      return {
        ...prev,
        [tid]: {
          tutor: tutorItem,
          studentStatus: "ONBOARDING",
          onboardingData: DEFAULT_ONBOARDING,
          placementTestResult: null,
          chatMessages: [],
        },
      };
    });
  }

  function submitOnboarding(data) {
    if (!activeTutorId) return;

    setThreads((prev) => {
      const current = prev[activeTutorId] || { tutor: selectedTutor };
      const updatedOnboarding = { ...(current.onboardingData || DEFAULT_ONBOARDING), ...data };

      const initialMessages = [
        {
          id: `msg-${Date.now()}-1`,
          sender: "system",
          timestamp: "Vừa xong",
          text: `Bạn đã gửi yêu cầu kết nối tới Gia sư ${current.tutor?.name}.`,
        },
        {
          id: `msg-${Date.now()}-2`,
          sender: "student",
          timestamp: "Vừa xong",
          type: "onboarding_card",
          data: updatedOnboarding,
        },
        {
          id: `msg-${Date.now()}-3`,
          sender: "tutor",
          timestamp: "Vừa xong",
          text: `Chào em! Thầy/Cô đã nhận được hồ sơ mục tiêu của em. Em làm bài Quiz đánh giá 15 phút dưới đây để thầy/cô lên lộ trình nhé!`,
        },
        {
          id: `msg-${Date.now()}-4`,
          sender: "tutor",
          timestamp: "Vừa xong",
          type: "quiz_proposal_card",
          data: {
            quizTitle: `Bài Quiz Placement Test - ${current.tutor?.name}`,
            durationMinutes: 15,
            totalQuestions: 10,
            skills: ["Nghe", "Nói", "Đọc", "Viết", "Từ vựng", "Ngữ pháp"],
          },
        },
      ];

      return {
        ...prev,
        [activeTutorId]: {
          ...current,
          studentStatus: "CHAT_&_QUIZ",
          onboardingData: updatedOnboarding,
          chatMessages: initialMessages,
        },
      };
    });
  }

  function submitPlacementTest(results) {
    if (!activeTutorId) return;

    setThreads((prev) => {
      const current = prev[activeTutorId];
      if (!current) return prev;

      const updatedResults = {
        ...DEFAULT_PLACEMENT_RESULT,
        ...results,
        completedAt: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }) + " Hôm nay",
      };

      const newMessages = [
        ...(current.chatMessages || []),
        {
          id: `msg-${Date.now()}-1`,
          sender: "student",
          timestamp: "Vừa xong",
          type: "quiz_result_card",
          data: updatedResults,
        },
        {
          id: `msg-${Date.now()}-2`,
          sender: "system",
          timestamp: "Vừa xong",
          text: "Hệ thống đã chấm bài Placement Test và chuyển báo cáo cho Gia sư xem xét...",
        },
        {
          id: `msg-${Date.now()}-3`,
          sender: "tutor",
          timestamp: "Vừa xong",
          type: "roadmap_preview_card",
          data: {
            status: "pending_approval",
            recommendedPath: `Lộ trình Cá nhân hóa cùng ${current.tutor?.name}`,
            targetBand: "6.0 -> 7.0",
          },
        },
      ];

      return {
        ...prev,
        [activeTutorId]: {
          ...current,
          studentStatus: "WAITING_APPROVAL",
          placementTestResult: updatedResults,
          chatMessages: newMessages,
        },
      };
    });
  }

  function approveTutorMatching() {
    if (!activeTutorId) return;

    setThreads((prev) => {
      const current = prev[activeTutorId];
      if (!current) return prev;

      const updatedMessages = [
        ...(current.chatMessages || []),
        {
          id: `msg-${Date.now()}`,
          sender: "tutor",
          timestamp: "Vừa xong",
          text: "🎉 Chúc mừng! Gia sư đã chấp nhận kết nối và kích hoạt Lộ trình học tập. LMS đã mở khóa đầy đủ cho em!",
        },
      ];

      return {
        ...prev,
        [activeTutorId]: {
          ...current,
          studentStatus: "MATCHED",
          chatMessages: updatedMessages,
        },
      };
    });
  }

  function rejectTutorMatching(reason = "Lịch dạy bị trùng hoặc cần gia sư có chuyên môn khác.") {
    if (!activeTutorId) return;

    setThreads((prev) => {
      const current = prev[activeTutorId];
      if (!current) return prev;

      const fallbackTutors = tutors.filter((t) => t.id !== activeTutorId).slice(0, 3);
      const updatedMessages = [
        ...(current.chatMessages || []),
        {
          id: `msg-${Date.now()}-rej`,
          sender: "tutor",
          timestamp: "Vừa xong",
          type: "rejection_card",
          data: {
            reason,
            fallbackTutors,
            savedQuizScore: current.placementTestResult?.score || 80,
          },
        },
      ];

      return {
        ...prev,
        [activeTutorId]: {
          ...current,
          chatMessages: updatedMessages,
        },
      };
    });
  }

  function setChatMessages(newMsgsOrFn) {
    if (!activeTutorId) return;
    setThreads((prev) => {
      const current = prev[activeTutorId];
      if (!current) return prev;
      const nextMsgs = typeof newMsgsOrFn === "function" ? newMsgsOrFn(current.chatMessages || []) : newMsgsOrFn;

      return {
        ...prev,
        [activeTutorId]: {
          ...current,
          chatMessages: nextMsgs,
        },
      };
    });
  }

  function resetMatchingFlow() {
    setThreads(INITIAL_THREADS);
    setActiveTutorId("t1");
  }

  // Threads list array for rendering sidebars
  const threadsList = Object.keys(threads).map((tid) => ({
    id: tid,
    ...threads[tid],
  }));

  return (
    <StudentMatchingContext.Provider
      value={{
        threads,
        threadsList,
        activeTutorId,
        setActiveTutorId,
        studentStatus: globalStudentStatus,
        activeThreadStatus: studentStatus,
        setStudentStatus,
        selectedTutor,
        onboardingData,
        chatMessages,
        setChatMessages,
        placementTestResult,
        selectTutorAndStartOnboarding,
        submitOnboarding,
        submitPlacementTest,
        approveTutorMatching,
        rejectTutorMatching,
        resetMatchingFlow,
      }}
    >
      {children}
    </StudentMatchingContext.Provider>
  );
}

export function useStudentMatching() {
  const ctx = useContext(StudentMatchingContext);
  if (!ctx) throw new Error("useStudentMatching must be used within StudentMatchingProvider");
  return ctx;
}

export const student = {
  name: "Nguyễn Minh Anh",
  grade: "Lớp 6A2",
  level: "Pre-Intermediate (B1)",
  tutor: "Cô Nguyễn Thu Hà",
  tutorAvatar: "TH",
  streak: 12,
  completedLessons: 24,
  totalHours: 36,
  averageScore: "8.8",
};

export const stats = [
  { label: "Buổi đã học", value: "24", sub: "buổi", iconName: "BookOpen" },
  { label: "Tổng giờ học", value: "36", sub: "giờ", iconName: "Clock" },
  { label: "Chuỗi ngày liên tiếp", value: "12", sub: "ngày", iconName: "Flame" },
  { label: "Điểm trung bình", value: "8.8", sub: "/ 10", iconName: "Star" },
];

export const upcomingLessons = [
  {
    id: "l1",
    subject: "Communication Practice — Topic: Environmental Protection",
    tutor: "Cô Nguyễn Thu Hà",
    date: "Hôm nay, 11/09",
    time: "19:30 - 20:30",
    status: "upcoming",
    meetLink: "#",
  },
  {
    id: "l2",
    subject: "Grammar Deep Dive — Present Perfect vs Past Simple",
    tutor: "Cô Nguyễn Thu Hà",
    date: "Thứ 7, 13/09",
    time: "09:00 - 10:00",
    status: "scheduled",
  },
  {
    id: "l3",
    subject: "Listening & Pronunciation — Linking Sounds",
    tutor: "Cô Nguyễn Thu Hà",
    date: "Chủ nhật, 14/09",
    time: "15:00 - 16:00",
    status: "scheduled",
  },
];

export const scheduleList = [
  {
    day: "Thứ Tư (11/09)",
    lessons: [
      {
        id: "s1",
        title: "Communication Practice — Topic: Environmental Protection",
        tutor: "Cô Nguyễn Thu Hà",
        time: "19:30 - 20:30",
        status: "Sắp diễn ra",
        isLive: true,
      },
    ],
  },
  {
    day: "Thứ Sáu (13/09)",
    lessons: [
      {
        id: "s2",
        title: "Grammar Deep Dive — Present Perfect vs Past Simple",
        tutor: "Cô Nguyễn Thu Hà",
        time: "09:00 - 10:00",
        status: "Đã lên lịch",
        isLive: false,
      },
    ],
  },
  {
    day: "Chủ Nhật (14/09)",
    lessons: [
      {
        id: "s3",
        title: "Listening & Pronunciation — Linking Sounds",
        tutor: "Cô Nguyễn Thu Hà",
        time: "15:00 - 16:00",
        status: "Đã lên lịch",
        isLive: false,
      },
    ],
  },
  {
    day: "Thứ Hai tuần trước (08/09)",
    lessons: [
      {
        id: "s4",
        title: "Vocabulary Expansion — Academic Words Unit 4",
        tutor: "Cô Nguyễn Thu Hà",
        time: "19:30 - 20:30",
        status: "Hoàn thành",
        isLive: false,
      },
    ],
  },
];

export const assignments = [
  {
    id: "a1",
    title: "Bài tập phát âm: Thu âm đoạn văn Unit 4 (Focus: /θ/ and /ð/)",
    dueDate: "23:59 Hôm nay",
    status: "todo", // todo | done | late
    statusText: "Cần làm",
    subject: "Phát âm & Nói",
  },
  {
    id: "a2",
    title: "Trắc nghiệm ngữ pháp: Thì hiện tại hoàn thành",
    dueDate: "23:59 Ngày mai",
    status: "todo",
    statusText: "Cần làm",
    subject: "Ngữ pháp",
  },
  {
    id: "a3",
    title: "Viết đoạn văn ngắn (100 từ) về chuyến du lịch yêu thích",
    dueDate: "09/09/2026",
    status: "done",
    statusText: "Đã hoàn thành",
    score: "9.2/10",
    subject: "Kỹ năng Viết",
  },
  {
    id: "a4",
    title: "Nghe & điền từ bài thoại 3 (Intermediate Dialogue)",
    dueDate: "05/09/2026",
    status: "late",
    statusText: "Quá hạn",
    subject: "Kỹ năng Nghe",
  },
];

export const materials = [
  {
    id: "m1",
    title: "Ebook: English Grammar in Use (Unit 1 - 15 Summarized)",
    type: "pdf",
    size: "4.2 MB",
    lesson: "Buổi 10 - Ngữ pháp",
    date: "10/09/2026",
  },
  {
    id: "m2",
    title: "Video bài giảng: Bí quyết phản xạ nói tiếng Anh tự nhiên",
    type: "video",
    size: "45 phút",
    lesson: "Buổi 11 - Phản xạ",
    date: "08/09/2026",
  },
  {
    id: "m3",
    title: "File nghe luyện tai: British English Conversations Track 04",
    type: "audio",
    size: "12.5 MB",
    lesson: "Buổi 12 - Luyện nghe",
    date: "06/09/2026",
  },
  {
    id: "m4",
    title: "Tài liệu từ vựng chủ đề Environment & Nature (Wordlist + Audio)",
    type: "pdf",
    size: "2.1 MB",
    lesson: "Buổi 13 - Từ vựng",
    date: "04/09/2026",
  },
];

export const weeklyScores = [
  { week: "T1 (08/08)", score: 7.5, isCurrent: false },
  { week: "T2 (15/08)", score: 8.0, isCurrent: false },
  { week: "T3 (22/08)", score: 8.2, isCurrent: false },
  { week: "T4 (29/08)", score: 8.4, isCurrent: false },
  { week: "Tuần này (05/09)", score: 8.8, isCurrent: true }, // Highlight cyan
];

export const skills = [
  { name: "Kỹ năng Nghe (Listening)", score: 85, color: "bg-primary" },
  { name: "Kỹ năng Nói (Speaking)", score: 78, color: "bg-accent" },
  { name: "Kỹ năng Đọc (Reading)", score: 92, color: "bg-emerald-500" },
  { name: "Kỹ năng Viết (Writing)", score: 80, color: "bg-indigo-500" },
];

export const aiFeedback = {
  summary:
    "Minh Anh có sự tiến bộ rõ rệt ở kỹ năng Phát âm và Đọc hiểu trong tuần này. Khả năng phản xạ câu ngắn cải thiện 15% so với tuần trước.",
  strengths: [
    "Phát âm chuẩn các âm đuôi /s/, /z/, /ed/ trong đoạn thu âm bài tập 3.",
    "Từ vựng chủ đề Trường học & Gia đình phong phú, vận dụng tự nhiên.",
    "Thái độ tương tác trong lớp tích cực, chủ động đặt câu hỏi cho gia sư.",
  ],
  improvements: [
    "Cần chú ý thêm nối âm (Linking sounds) giữa phụ âm đuôi và nguyên âm đầu.",
    "Chia thì Hiện tại hoàn thành đôi khi còn nhầm lẫn với Quá khứ đơn.",
  ],
};

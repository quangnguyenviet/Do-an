// Mock data cho prototype - không có backend thật, toàn bộ dữ liệu tĩnh ở đây.

export const tutor = {
  id: "t1",
  name: "Cô Lan Anh",
  email: "lananh.tutor@example.com",
  initials: "LA",
};

// Danh sách gia sư — chỉ admin mới quản lý được
export const tutors = [
  {
    id: "t1",
    name: "Cô Lan Anh",
    email: "lananh.tutor@example.com",
    initials: "LA",
    phone: "0987 654 321",
    status: "active",
    joinedDate: "2025-09-01",
    studentsCount: 3,
    specialization: ["IELTS", "Giao tiếp cơ bản", "Ngữ pháp"],
  },
  {
    id: "t2",
    name: "Thầy Minh Quân",
    email: "minhquan.tutor@example.com",
    initials: "MQ",
    phone: "0912 345 678",
    status: "active",
    joinedDate: "2025-10-15",
    studentsCount: 2,
    specialization: ["IELTS Writing", "Từ vựng nâng cao"],
  },
  {
    id: "t3",
    name: "Cô Thu Hà",
    email: "thuha.tutor@example.com",
    initials: "TH",
    phone: "0909 111 222",
    status: "inactive",
    joinedDate: "2025-07-20",
    studentsCount: 0,
    specialization: ["Phát âm", "Nghe hiểu"],
  },
  {
    id: "t4",
    name: "Thầy Đức Anh",
    email: "ducanh.tutor@example.com",
    initials: "ĐA",
    phone: "0933 444 555",
    status: "active",
    joinedDate: "2026-01-05",
    studentsCount: 4,
    specialization: ["Speaking nâng cao", "Debate"],
  },
  {
    id: "t5",
    name: "Cô Mai Phương",
    email: "maiphuong.tutor@example.com",
    initials: "MP",
    phone: "0966 777 888",
    status: "pending",
    joinedDate: "2026-03-01",
    studentsCount: 0,
    specialization: ["IELTS Reading", "Từ vựng học thuật"],
  },
];

export const skillList = [
  "Nghe",
  "Nói",
  "Đọc",
  "Viết",
  "Từ vựng",
  "Ngữ pháp",
];

// Hồ sơ năng lực của gia sư đang đăng nhập (TS-01 → TS-03) — dùng để Admin tra cứu/giới thiệu.
export const tutorProfile = {
  tutorId: "t1",
  subjects: ["IELTS", "Giao tiếp cơ bản", "Ngữ pháp", "Phát âm"],
  qualificationLevel: "teacher", // "teacher" | "student"
  experienceYears: 5,
  bio: "Giáo viên tiếng Anh với 5 năm kinh nghiệm luyện thi IELTS và giao tiếp cho học sinh cấp 2-3.",
  certificates: [
    { id: "c1", name: "IELTS 8.5 Overall", issuer: "British Council", year: "2022" },
    { id: "c2", name: "Chứng chỉ nghiệp vụ sư phạm", issuer: "ĐH Sư phạm TP.HCM", year: "2019" },
  ],
  serviceAreas: ["Quận 1, TP.HCM", "Quận 3, TP.HCM", "Dạy online"],
  // Mỗi phần tử: "Ngày|Buổi"
  availability: ["Thứ 2|Tối", "Thứ 4|Tối", "Thứ 6|Tối", "Thứ 7|Sáng", "Thứ 7|Chiều", "Chủ nhật|Sáng"],
};

export const students = [
  {
    id: "s1",
    name: "Nguyễn Minh Khôi",
    initials: "MK",
    level: "B1",
    goal: "Thi chứng chỉ IELTS 6.0",
    schedule: "Thứ 3 - 5 - 7, 19:00-20:30",
    parentName: "Anh Nguyễn Văn Hùng",
    parentTelegram: "@hung_nguyen",
    joinedDate: "2026-02-10",
    overallProgress: 68,
    weakSkill: "Viết",
    templateSource: "tpl1",
    learningPath: [
      { id: "lp1", phase: "Giai đoạn 1: Củng cố nền tảng", week: 1, session: 1, date: "2026-02-11", skills: ["Ngữ pháp", "Từ vựng"], topic: "Thì hiện tại & quá khứ, từ vựng chủ đề gia đình", status: "done" },
      { id: "lp2", phase: "Giai đoạn 1: Củng cố nền tảng", week: 1, session: 2, date: "2026-02-13", skills: ["Nghe", "Nói"], topic: "Luyện nghe hội thoại đời sống, phát âm trọng âm", status: "done" },
      { id: "lp3", phase: "Giai đoạn 1: Củng cố nền tảng", week: 2, session: 3, date: "2026-02-18", skills: ["Đọc"], topic: "Kỹ thuật Skimming/Scanning với bài đọc IELTS", status: "done" },
      { id: "lp4", phase: "Giai đoạn 2: Luyện kỹ năng thi", week: 3, session: 4, date: "2026-02-25", skills: ["Viết"], topic: "Task 1: Mô tả biểu đồ", status: "done" },
      { id: "lp5", phase: "Giai đoạn 2: Luyện kỹ năng thi", week: 4, session: 5, date: "2026-03-04", skills: ["Viết", "Ngữ pháp"], topic: "Task 2: Bài luận quan điểm, câu phức", status: "in_progress" },
      { id: "lp6", phase: "Giai đoạn 2: Luyện kỹ năng thi", week: 4, session: 6, date: "2026-03-06", skills: ["Nói"], topic: "IELTS Speaking Part 2 - Cue card", status: "upcoming" },
      { id: "lp7", phase: "Giai đoạn 3: Luyện đề tổng hợp", week: 5, session: 7, date: "2026-03-11", skills: ["Nghe", "Đọc"], topic: "Full mock test Listening + Reading", status: "upcoming" },
    ],
    exercises: [
      { id: "e1", title: "Bài tập từ vựng chủ đề gia đình", skill: "Từ vựng", difficulty: "Cơ bản", type: "Trắc nghiệm", status: "graded", score: 9, maxScore: 10, assignedDate: "2026-02-11", submittedAt: "2026-02-12", sessionId: "lp1" },
      { id: "e2", title: "Luyện nghe hội thoại đời sống #3", skill: "Nghe", difficulty: "Trung bình", type: "Trắc nghiệm", status: "graded", score: 7, maxScore: 10, assignedDate: "2026-02-13", submittedAt: "2026-02-14", sessionId: "lp2" },
      { id: "e3", title: "Đọc hiểu: Biến đổi khí hậu", skill: "Đọc", difficulty: "Trung bình", type: "Trắc nghiệm + Điền từ", status: "graded", score: 8, maxScore: 10, assignedDate: "2026-02-18", submittedAt: "2026-02-19", sessionId: "lp3" },
      { id: "e4", title: "Writing Task 1: Biểu đồ dân số", skill: "Viết", difficulty: "Trung bình", type: "Tự luận", status: "graded", score: 6, maxScore: 9, assignedDate: "2026-02-25", submittedAt: "2026-02-26", feedback: "Bố cục ổn nhưng còn thiếu từ nối, cần đa dạng cấu trúc câu hơn.", sessionId: "lp4" },
      { id: "e5", title: "Writing Task 2: Ưu nhược điểm mạng xã hội", skill: "Viết", difficulty: "Nâng cao", type: "Tự luận", status: "submitted", assignedDate: "2026-03-04", submittedAt: "2026-03-05", sessionId: "lp5" },
      { id: "e6", title: "Speaking Part 2: Tả một chuyến đi", skill: "Nói", difficulty: "Trung bình", type: "Bài nói (ghi âm)", status: "assigned", assignedDate: "2026-03-06", dueDate: "2026-03-08", sessionId: "lp6" },
    ],
    progressHistory: [
      { date: "Tuần 1", Nghe: 5, Nói: 5, Đọc: 5, Viết: 4, "Từ vựng": 6, "Ngữ pháp": 5 },
      { date: "Tuần 2", Nghe: 6, Nói: 5, Đọc: 6, Viết: 4, "Từ vựng": 7, "Ngữ pháp": 6 },
      { date: "Tuần 3", Nghe: 6, Nói: 6, Đọc: 7, Viết: 5, "Từ vựng": 7, "Ngữ pháp": 6 },
      { date: "Tuần 4", Nghe: 7, Nói: 6, Đọc: 7, Viết: 5, "Từ vựng": 8, "Ngữ pháp": 7 },
      { date: "Tuần 5", Nghe: 7, Nói: 7, Đọc: 8, Viết: 6, "Từ vựng": 8, "Ngữ pháp": 7 },
    ],
    materials: [
      { id: "m1", title: "Video: Chiến lược làm bài Writing Task 1", type: "video", topic: "Viết", date: "2026-02-25", duration: "18:20", sessionId: "lp4" },
      { id: "m2", title: "Tài liệu: 50 collocations thường gặp IELTS", type: "doc", topic: "Từ vựng", date: "2026-02-11", sessionId: "lp1" },
      { id: "m3", title: "Video: Phát âm trọng âm từ trong tiếng Anh", type: "video", topic: "Nói", date: "2026-02-13", duration: "12:05", sessionId: "lp2" },
    ],
  },
  {
    id: "s2",
    name: "Trần Bảo Ngọc",
    initials: "BN",
    level: "A2",
    goal: "Lấy lại gốc, giao tiếp cơ bản",
    schedule: "Thứ 2 - 4 - 6, 17:30-19:00",
    parentName: "Chị Trần Thu Hà",
    parentTelegram: "@ha_tran92",
    joinedDate: "2026-03-01",
    overallProgress: 42,
    weakSkill: "Ngữ pháp",
    templateSource: "tpl2",
    learningPath: [
      { id: "lp1", phase: "Giai đoạn 1: Xây nền tảng", week: 1, session: 1, date: "2026-03-02", skills: ["Ngữ pháp"], topic: "Thì hiện tại đơn, cấu trúc câu cơ bản", status: "done" },
      { id: "lp2", phase: "Giai đoạn 1: Xây nền tảng", week: 1, session: 2, date: "2026-03-04", skills: ["Từ vựng", "Nói"], topic: "Từ vựng chào hỏi, giới thiệu bản thân", status: "done" },
      { id: "lp3", phase: "Giai đoạn 1: Xây nền tảng", week: 2, session: 3, date: "2026-03-06", skills: ["Nghe"], topic: "Nghe số đếm, giờ giấc", status: "in_progress" },
      { id: "lp4", phase: "Giai đoạn 2: Giao tiếp tình huống", week: 3, session: 4, date: "2026-03-11", skills: ["Nói", "Từ vựng"], topic: "Hội thoại mua sắm", status: "upcoming" },
    ],
    exercises: [
      { id: "e1", title: "Bài tập thì hiện tại đơn", skill: "Ngữ pháp", difficulty: "Cơ bản", type: "Trắc nghiệm", status: "graded", score: 6, maxScore: 10, assignedDate: "2026-03-02", submittedAt: "2026-03-03", sessionId: "lp1" },
      { id: "e2", title: "Giới thiệu bản thân - viết đoạn ngắn", skill: "Viết", difficulty: "Cơ bản", type: "Tự luận", status: "graded", score: 5, maxScore: 10, assignedDate: "2026-03-04", submittedAt: "2026-03-05", feedback: "Câu còn ngắn, cần luyện thêm cách nối câu.", sessionId: "lp2" },
      { id: "e3", title: "Luyện nghe số đếm", skill: "Nghe", difficulty: "Cơ bản", type: "Trắc nghiệm", status: "submitted", assignedDate: "2026-03-06", submittedAt: "2026-03-07", sessionId: "lp3" },
    ],
    progressHistory: [
      { date: "Tuần 1", Nghe: 3, Nói: 4, Đọc: 3, Viết: 3, "Từ vựng": 4, "Ngữ pháp": 3 },
      { date: "Tuần 2", Nghe: 4, Nói: 4, Đọc: 4, Viết: 3, "Từ vựng": 5, "Ngữ pháp": 4 },
      { date: "Tuần 3", Nghe: 4, Nói: 5, Đọc: 4, Viết: 4, "Từ vựng": 5, "Ngữ pháp": 4 },
    ],
    materials: [
      { id: "m1", title: "Tài liệu: Bảng động từ bất quy tắc thông dụng", type: "doc", topic: "Ngữ pháp", date: "2026-03-02", sessionId: "lp1" },
    ],
  },
  {
    id: "s3",
    name: "Phạm Gia Hân",
    initials: "GH",
    level: "B2",
    goal: "Giao tiếp phản xạ nhanh",
    schedule: "Thứ 3 - 6, Chủ nhật 9:00-10:30",
    parentName: "Anh Phạm Quốc Việt",
    parentTelegram: "@viet_pham",
    joinedDate: "2026-01-15",
    overallProgress: 81,
    weakSkill: "Nghe",
    templateSource: "tpl3",
    learningPath: [
      { id: "lp1", phase: "Giai đoạn 2: Phản xạ giao tiếp", week: 6, session: 10, date: "2026-02-24", skills: ["Nói"], topic: "Thảo luận chủ đề công nghệ", status: "done" },
      { id: "lp2", phase: "Giai đoạn 2: Phản xạ giao tiếp", week: 6, session: 11, date: "2026-02-27", skills: ["Nghe"], topic: "Nghe podcast tốc độ tự nhiên", status: "done" },
      { id: "lp3", phase: "Giai đoạn 3: Nâng cao", week: 7, session: 12, date: "2026-03-05", skills: ["Nói", "Từ vựng"], topic: "Debate: Ưu nhược điểm làm việc từ xa", status: "in_progress" },
    ],
    exercises: [
      { id: "e1", title: "Debate chuẩn bị luận điểm", skill: "Nói", difficulty: "Nâng cao", type: "Bài nói (ghi âm)", status: "graded", score: 8, maxScore: 10, assignedDate: "2026-03-05", submittedAt: "2026-03-06", sessionId: "lp3" },
      { id: "e2", title: "Podcast Listening Challenge #5", skill: "Nghe", difficulty: "Nâng cao", type: "Trắc nghiệm", status: "graded", score: 6, maxScore: 10, assignedDate: "2026-02-27", submittedAt: "2026-02-28", sessionId: "lp2" },
    ],
    progressHistory: [
      { date: "Tuần 4", Nghe: 6, Nói: 8, Đọc: 8, Viết: 7, "Từ vựng": 8, "Ngữ pháp": 8 },
      { date: "Tuần 5", Nghe: 6, Nói: 8, Đọc: 8, Viết: 7, "Từ vựng": 8, "Ngữ pháp": 8 },
      { date: "Tuần 6", Nghe: 7, Nói: 9, Đọc: 8, Viết: 8, "Từ vựng": 9, "Ngữ pháp": 8 },
    ],
    materials: [
      { id: "m1", title: "Video: Kỹ năng debate tiếng Anh", type: "video", topic: "Nói", date: "2026-03-05", duration: "22:40", sessionId: "lp3" },
    ],
  },
];

// Hàng chờ chấm bài: các bài tự luận/bài nói đã nộp, cần AI chấm sơ bộ + gia sư duyệt
export const gradingQueue = [
  {
    id: "g1",
    studentId: "s1",
    exerciseId: "e5",
    studentName: "Nguyễn Minh Khôi",
    title: "Writing Task 2: Ưu nhược điểm mạng xã hội",
    skill: "Viết",
    submittedAt: "2026-03-05",
    aiSuggestedScore: 6.5,
    aiSuggestedMax: 9,
    aiFeedback:
      "Bài viết có bố cục rõ ràng 4 đoạn, luận điểm hợp lý. Tuy nhiên còn một số lỗi hòa hợp chủ ngữ - động từ và lặp từ 'social media' nhiều lần thay vì dùng từ đồng nghĩa. Đề xuất band 6.5.",
    content:
      "Nowadays, social media becoming an important part of everyone life. Social media have many advantages such as helping people connect with friends and family easily. However, social media also has some disadvantages...",
  },
  {
    id: "g2",
    studentId: "s2",
    exerciseId: "e3",
    studentName: "Trần Bảo Ngọc",
    title: "Luyện nghe số đếm",
    skill: "Nghe",
    submittedAt: "2026-03-07",
    aiSuggestedScore: 7,
    aiSuggestedMax: 10,
    aiFeedback: "Học sinh làm đúng 7/10 câu, chủ yếu sai ở các số có đuôi -teen và -ty. Đề xuất ôn lại phát âm số đếm.",
    content: null,
  },
];

// Hội thoại hỏi đáp Phụ huynh - Gia sư (qua Telegram bot)
export const parentThreads = [
  {
    id: "pt1",
    studentId: "s1",
    parentName: "Anh Nguyễn Văn Hùng",
    messages: [
      { id: 1, from: "parent", text: "Chào cô, con Khôi dạo này học Writing thế nào ạ?", time: "2026-03-06 20:15" },
      { id: 2, from: "bot", text: "Chào anh Hùng! Điểm Writing gần nhất của Khôi là 6/9 (Task 1 - Biểu đồ dân số, ngày 26/02). Xu hướng điểm kỹ năng Viết đang tăng dần qua các tuần. Anh có thể xem chi tiết biểu đồ tiến bộ trong tài khoản của con.", time: "2026-03-06 20:15" },
      { id: 3, from: "parent", text: "Vậy con có cần học thêm buổi phụ đạo Writing không cô?", time: "2026-03-06 20:17" },
      { id: 4, from: "bot", text: "Xin lỗi anh, câu hỏi này cần đánh giá chuyên môn cụ thể nên em đã chuyển tới cô Lan Anh. Cô sẽ phản hồi anh sớm nhất có thể.", time: "2026-03-06 20:17", escalated: true },
      { id: 5, from: "tutor", text: "Chào anh Hùng, em thấy Khôi tiến bộ khá tốt ở Task 1 rồi ạ. Tuần tới em sẽ bổ sung thêm 1 buổi luyện Task 2 chuyên sâu, chưa cần học phụ đạo thêm đâu ạ. Em sẽ theo dõi thêm 2 tuần nữa rồi báo lại tình hình cho anh.", time: "2026-03-06 21:02" },
    ],
    status: "resolved",
  },
  {
    id: "pt2",
    studentId: "s2",
    parentName: "Chị Trần Thu Hà",
    messages: [
      { id: 1, from: "parent", text: "Cô ơi bé Ngọc nhà em học có theo kịp không ạ, em thấy bé hơi nhút nhát", time: "2026-03-07 19:40" },
      { id: 2, from: "bot", text: "Chào chị Hà! Bé Bảo Ngọc đang ở trình độ A2, tiến độ hoàn thành lộ trình hiện tại là 42%. Điểm số các bài gần đây: Ngữ pháp 6/10, Viết 5/10. Chị có câu hỏi cụ thể nào cần cô tư vấn thêm không ạ?", time: "2026-03-07 19:40" },
      { id: 3, from: "parent", text: "Em muốn hỏi cô xem có nên cho bé học thêm buổi nói chuyện với người nước ngoài không ạ?", time: "2026-03-07 19:42" },
      { id: 4, from: "bot", text: "Câu hỏi này cần ý kiến chuyên môn từ cô Lan Anh, em đã chuyển thông tin tới cô. Cô sẽ phản hồi chị sớm nhất ạ.", time: "2026-03-07 19:42", escalated: true },
    ],
    status: "pending",
  },
  {
    id: "pt3",
    studentId: "s3",
    parentName: "Anh Phạm Quốc Việt",
    messages: [
      { id: 1, from: "parent", text: "Chào cô, tuần này Hân có bài kiểm tra nào không cô?", time: "2026-03-08 08:10" },
      { id: 2, from: "bot", text: "Chào anh Việt! Tuần này Hân có 1 bài tập Nói (Debate) đã nộp ngày 06/03, đạt 8/10 điểm. Chưa có bài kiểm tra tổng hợp nào được giao trong tuần này ạ.", time: "2026-03-08 08:10" },
    ],
    status: "resolved",
  },
];

/* ===== Kho lộ trình =====
 * Mỗi template có thể được clone cho nhiều học sinh.
 * Trường "studentsUsing" là mảng id các học sinh đang dùng template này,
 * giúp tracking usageCount chính xác và xem danh sách học sinh cụ thể.
 */
export const pathTemplates = [
  {
    id: "tpl1",
    name: "Lộ trình luyện thi IELTS 6.0 - Trung cấp",
    level: "B1",
    goal: "Thi chứng chỉ IELTS 6.0",
    usageCount: 14,
    studentsUsing: ["s1"],
    sessions: [
      { phase: "Giai đoạn 1: Củng cố nền tảng", topic: "Ngữ pháp & từ vựng học thuật cơ bản", skills: ["Ngữ pháp", "Từ vựng"] },
      { phase: "Giai đoạn 1: Củng cố nền tảng", topic: "Kỹ thuật Skimming/Scanning cho bài đọc IELTS", skills: ["Đọc"] },
      { phase: "Giai đoạn 2: Luyện kỹ năng thi", topic: "Task 1: Mô tả biểu đồ", skills: ["Viết"] },
      { phase: "Giai đoạn 2: Luyện kỹ năng thi", topic: "Task 2: Bài luận quan điểm", skills: ["Viết", "Ngữ pháp"] },
      { phase: "Giai đoạn 2: Luyện kỹ năng thi", topic: "Speaking Part 2 - Cue card", skills: ["Nói"] },
      { phase: "Giai đoạn 3: Luyện đề tổng hợp", topic: "Full mock test Listening + Reading", skills: ["Nghe", "Đọc"] },
    ],
  },
  {
    id: "tpl2",
    name: "Lộ trình giao tiếp cơ bản A2 → B1",
    level: "A2",
    goal: "Lấy lại gốc, giao tiếp cơ bản",
    usageCount: 9,
    studentsUsing: ["s2"],
    sessions: [
      { phase: "Giai đoạn 1: Xây nền tảng", topic: "Thì hiện tại đơn, cấu trúc câu cơ bản", skills: ["Ngữ pháp"] },
      { phase: "Giai đoạn 1: Xây nền tảng", topic: "Từ vựng chào hỏi, giới thiệu bản thân", skills: ["Từ vựng", "Nói"] },
      { phase: "Giai đoạn 2: Giao tiếp tình huống", topic: "Hội thoại mua sắm", skills: ["Nói", "Từ vựng"] },
      { phase: "Giai đoạn 2: Giao tiếp tình huống", topic: "Hội thoại tại nhà hàng", skills: ["Nói", "Nghe"] },
    ],
  },
  {
    id: "tpl3",
    name: "Lộ trình phản xạ giao tiếp nâng cao B2",
    level: "B2",
    goal: "Giao tiếp phản xạ nhanh",
    usageCount: 5,
    studentsUsing: ["s3"],
    sessions: [
      { phase: "Giai đoạn 1: Phản xạ giao tiếp", topic: "Thảo luận chủ đề công nghệ", skills: ["Nói"] },
      { phase: "Giai đoạn 1: Phản xạ giao tiếp", topic: "Nghe podcast tốc độ tự nhiên", skills: ["Nghe"] },
      { phase: "Giai đoạn 2: Nâng cao", topic: "Debate: Ưu nhược điểm làm việc từ xa", skills: ["Nói", "Từ vựng"] },
      { phase: "Giai đoạn 2: Nâng cao", topic: "Phỏng vấn xin việc mô phỏng", skills: ["Nói", "Ngữ pháp"] },
    ],
  },
  // === Mẫu mới ===
  {
    id: "tpl4",
    name: "IELTS Writing chuyên sâu 5.0 → 6.5",
    level: "B1",
    goal: "Cải thiện kỹ năng Viết, đạt band 6.5 Writing",
    usageCount: 3,
    studentsUsing: [],
    sessions: [
      { phase: "Giai đoạn 1: Xây nền tảng Viết", topic: "Cấu trúc câu phức, mệnh đề quan hệ", skills: ["Viết", "Ngữ pháp"] },
      { phase: "Giai đoạn 1: Xây nền tảng Viết", topic: "Từ nối học thuật và collocations", skills: ["Viết", "Từ vựng"] },
      { phase: "Giai đoạn 2: Luyện Task 1", topic: "Biểu đồ đường, cột — cách chọn số liệu chính", skills: ["Viết"] },
      { phase: "Giai đoạn 2: Luyện Task 1", topic: "Biểu đồ tròn, bảng — so sánh và tổng hợp", skills: ["Viết"] },
      { phase: "Giai đoạn 3: Luyện Task 2", topic: "Dạng Opinion — bố cục luận 4 đoạn", skills: ["Viết", "Ngữ pháp"] },
      { phase: "Giai đoạn 3: Luyện Task 2", topic: "Dạng Advantages/Disadvantages — cân bằng lợi ích", skills: ["Viết", "Từ vựng"] },
    ],
  },
  {
    id: "tpl5",
    name: "Phát âm & Nghe hiểu A1 → A2",
    level: "A2",
    goal: "Cải thiện phát âm, nghe hiểu hội thoại cơ bản",
    usageCount: 2,
    studentsUsing: [],
    sessions: [
      { phase: "Giai đoạn 1: Bảng phiên âm IPA", topic: "Nguyên âm đơn, nguyên âm đôi — nhận diện và phát âm", skills: ["Nói", "Nghe"] },
      { phase: "Giai đoạn 1: Bảng phiên âm IPA", topic: "Phụ âm hữu thanh/vô thanh — luyện nói phân biệt", skills: ["Nói"] },
      { phase: "Giai đoạn 2: Nghe số và thông tin cơ bản", topic: "Nghe giờ giấc, ngày tháng, số đếm", skills: ["Nghe"] },
      { phase: "Giai đoạn 2: Nghe số và thông tin cơ bản", topic: "Nghe hội thoại mua sắm, hỏi đường", skills: ["Nghe", "Nói"] },
    ],
  },
];

// Kho bài tập: ngân hàng bài tập dùng chung, chọn rồi giao cho học sinh (bản sao độc lập).
export const exerciseBank = [
  { id: "bank1", title: "Bài tập từ vựng chủ đề gia đình", skill: "Từ vựng", difficulty: "Cơ bản", type: "Trắc nghiệm", usageCount: 12 },
  { id: "bank2", title: "Luyện nghe hội thoại đời sống", skill: "Nghe", difficulty: "Trung bình", type: "Trắc nghiệm", usageCount: 9 },
  { id: "bank3", title: "Đọc hiểu: Biến đổi khí hậu", skill: "Đọc", difficulty: "Trung bình", type: "Trắc nghiệm + Điền từ", usageCount: 6 },
  { id: "bank4", title: "Writing Task 1: Mô tả biểu đồ", skill: "Viết", difficulty: "Trung bình", type: "Tự luận", usageCount: 15 },
  { id: "bank5", title: "Writing Task 2: Bài luận quan điểm", skill: "Viết", difficulty: "Nâng cao", type: "Tự luận", usageCount: 11 },
  { id: "bank6", title: "Speaking Part 2: Cue card ngẫu nhiên", skill: "Nói", difficulty: "Trung bình", type: "Bài nói (ghi âm)", usageCount: 8 },
  { id: "bank7", title: "Ngữ pháp: Câu điều kiện", skill: "Ngữ pháp", difficulty: "Trung bình", type: "Trắc nghiệm", usageCount: 10 },
  { id: "bank8", title: "Từ vựng: Collocations IELTS", skill: "Từ vựng", difficulty: "Nâng cao", type: "Điền từ", usageCount: 7 },
];

// Kho video & tài liệu: thư viện dùng chung, gán (bản sao) vào hồ sơ học sinh.
export const materialLibrary = [
  { id: "lib1", title: "Video: Chiến lược làm bài Writing Task 1", type: "video", topic: "Viết", duration: "18:20", usageCount: 20 },
  { id: "lib2", title: "Video: Phát âm trọng âm từ trong tiếng Anh", type: "video", topic: "Nói", duration: "12:05", usageCount: 14 },
  { id: "lib3", title: "Tài liệu: 50 collocations thường gặp IELTS", type: "doc", topic: "Từ vựng", usageCount: 25 },
  { id: "lib4", title: "Tài liệu: Bảng động từ bất quy tắc thông dụng", type: "doc", topic: "Ngữ pháp", usageCount: 18 },
  { id: "lib5", title: "Video: Kỹ năng debate tiếng Anh", type: "video", topic: "Nói", duration: "22:40", usageCount: 9 },
  { id: "lib6", title: "Video: Chiến lược Skimming/Scanning", type: "video", topic: "Đọc", duration: "15:30", usageCount: 11 },
];

// Thông báo cho gia sư: gộp các sự kiện cần chú ý (bài chờ chấm, câu hỏi phụ huynh, lịch học, cập nhật kho).
export const notifications = [
  {
    id: "n1",
    type: "grading",
    title: "Bài chờ chấm mới",
    body: "Writing Task 2 của Nguyễn Minh Khôi đã nộp, AI đã chấm sơ bộ và đang chờ bạn duyệt.",
    time: "2026-03-05 09:12",
    read: false,
    link: "/tutor/grading",
  },
  {
    id: "n2",
    type: "parent",
    title: "Câu hỏi từ phụ huynh cần trả lời",
    body: "Chị Trần Thu Hà hỏi về việc có nên cho Bảo Ngọc học thêm buổi nói chuyện với người nước ngoài.",
    time: "2026-03-07 19:42",
    read: false,
    link: "/tutor/inbox",
  },
  {
    id: "n3",
    type: "grading",
    title: "Bài chờ chấm mới",
    body: "Luyện nghe số đếm của Trần Bảo Ngọc đã nộp, cần bạn duyệt điểm.",
    time: "2026-03-07 20:05",
    read: false,
    link: "/tutor/grading",
  },
  {
    id: "n4",
    type: "schedule",
    title: "Sắp tới buổi học",
    body: "Phạm Gia Hân có buổi học 'Debate: Ưu nhược điểm làm việc từ xa' vào 2026-03-05.",
    time: "2026-03-04 08:00",
    read: true,
    link: "/tutor/students/s3",
  },
  {
    id: "n5",
    type: "system",
    title: "Kho lộ trình có mẫu mới",
    body: "Đã thêm mẫu 'Lộ trình phản xạ giao tiếp nâng cao B2' vào Kho lộ trình.",
    time: "2026-03-02 10:30",
    read: true,
    link: "/tutor/library/paths",
  },
  {
    id: "n6",
    type: "parent",
    title: "Hội thoại đã được xử lý",
    body: "Anh Nguyễn Văn Hùng đã nhận được phản hồi của bạn về tiến độ Writing của Khôi.",
    time: "2026-03-06 21:02",
    read: true,
    link: "/tutor/inbox",
  },
];

export function getStudentById(id) {
  return students.find((s) => s.id === id);
}

export function getPathTemplateById(id) {
  return pathTemplates.find((t) => t.id === id);
}

/** Đếm usageCount thực tế dựa trên students có templateSource === templateId */
export function computeActualUsage(templateId) {
  return students.filter((s) => s.templateSource === templateId).length;
}
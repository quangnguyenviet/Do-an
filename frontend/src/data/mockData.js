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
    assignedTutorId: "t1",
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
    assignedTutorId: "t1",
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
    assignedTutorId: "t4",
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

// === Doanh thu & học phí — prototype mock ===
export const revenueData = [
  { month: "T10/2025", total: 5000000,  collected: 5000000,  pending: 0 },
  { month: "T11/2025", total: 7500000,  collected: 7500000,  pending: 0 },
  { month: "T12/2025", total: 7500000,  collected: 6000000,  pending: 1500000 },
  { month: "T1/2026",  total: 10000000, collected: 10000000, pending: 0 },
  { month: "T2/2026",  total: 12500000, collected: 11000000, pending: 1500000 },
  { month: "T3/2026",  total: 15000000, collected: 13500000, pending: 1500000 },
];

export const studentFees = [
  { studentId: "s1", name: "Nguy\u1ec5n Minh Kh\u00f4i", tutorId: "t1", monthlyFee: 2500000, status: "paid",    month: "2026-03" },
  { studentId: "s2", name: "Tr\u1ea7n B\u1ea3o Ng\u1ecdc",    tutorId: "t1", monthlyFee: 2000000, status: "pending", month: "2026-03" },
];

// === Kho tài liệu mẫu theo cấp độ & kỹ năng ===
export const adminMaterials = [
  // A1
  { id: "am1",  level: "A1", skill: "Nói",      type: "video",    title: "Video: Phát âm bảng chữ cái & âm cơ bản",                     description: "Hướng dẫn phát âm 26 chữ cái, nguyên âm và phụ âm cơ bản, luyện đọc từ đơn.",        duration: "12:30", source: "EnglishPath" },
  { id: "am2",  level: "A1", skill: "Từ vựng",  type: "doc",      title: "Tài liệu: 200 từ vựng thiết yếu A1",                           description: "Danh sách 200 từ vựng cơ bản nhất kèm phiên âm, nghĩa việt và ví dụ câu.",        source: "EnglishPath" },
  { id: "am3",  level: "A1", skill: "Nghe",     type: "audio",    title: "Bài nghe: Hội thoại chào hỏi & giới thiệu bản thân",           description: "10 đoạn hội thoại ngắn về chào hỏi, tự giới thiệu và hỏi thăm đời sống.",           duration: "08:45", source: "EnglishPath" },
  { id: "am4",  level: "A1", skill: "Ngữ pháp", type: "doc",      title: "Tài liệu: Thì hiện tại đơn — công thức & bài tập",             description: "Bảng công thức khẳng định/phủ định/nghi vấn kèm 40 bài tập áp dụng.",               source: "EnglishPath" },
  // A2
  { id: "am5",  level: "A2", skill: "Nghe",     type: "video",    title: "Video: Nghe số đếm, ngày tháng & giờ giấc",                    description: "Luyện nghe nhận diện số 0–1000, ngày tháng năm và giờ giấc qua video tương tác.",    duration: "15:00", source: "BBC Learning English" },
  { id: "am6",  level: "A2", skill: "Nói",      type: "exercise", title: "Bài tập: Hội thoại tình huống mua sắm & nhà hàng",             description: "20 cặp hội thoại role-play: mua sắm, gọi món, hỏi đường, đặt phòng khách sạn.",     source: "EnglishPath" },
  { id: "am7",  level: "A2", skill: "Đọc",      type: "doc",      title: "Tài liệu: Đọc hiểu đoạn ngắn — gia đình & cuộc sống",          description: "5 bài đọc 100–150 từ với câu hỏi trắc nghiệm và từ vựng được chú thích chi tiết.",   source: "EnglishPath" },
  { id: "am8",  level: "A2", skill: "Viết",     type: "doc",      title: "Tài liệu: Viết email đơn giản — cấu trúc & mẫu câu",           description: "Hướng dẫn viết email giới thiệu bản thân, cảm ơn và xin lỗi kèm 10 email mẫu.",       source: "EnglishPath" },
  // B1
  { id: "am9",  level: "B1", skill: "Nghe",     type: "video",    title: "Video: Chiến lược nghe IELTS — Section 1 & 2",                  description: "Kỹ thuật đọc câu hỏi trước, lọc từ khóa và dự đoán đáp án cho bài nghe IELTS.",     duration: "20:15", source: "IELTS Liz" },
  { id: "am10", level: "B1", skill: "Đọc",      type: "video",    title: "Video: Kỹ thuật Skimming & Scanning cho IELTS Reading",         description: "Hướng dẫn đọc nhanh tìm ý chính và định vị thông tin trong bài đọc IELTS.",            duration: "18:40", source: "IELTS Simon" },
  { id: "am11", level: "B1", skill: "Từ vựng",  type: "doc",      title: "Tài liệu: 500 collocations thông dụng theo chủ đề IELTS",       description: "Collocation phân 10 chủ đề: môi trường, giáo dục, công nghệ, xã hội...",          source: "EnglishPath" },
  { id: "am12", level: "B1", skill: "Ngữ pháp", type: "doc",      title: "Tài liệu: Câu điều kiện loại 1, 2 & 3 — đầy đủ",              description: "Bảng so sánh 3 loại câu điều kiện, điểm phân biệt và 50 bài tập từ dễ đến khó.",     source: "EnglishPath" },
  { id: "am13", level: "B1", skill: "Viết",     type: "video",    title: "Video: Chiến lược IELTS Writing Task 1 — Biểu đồ",             description: "Cách mô tả biểu đồ đường, cột, tròn, so sánh dữ liệu và viết overview.",            duration: "18:20", source: "EnglishPath" },
  // B2
  { id: "am14", level: "B2", skill: "Nói",      type: "video",    title: "Video: IELTS Speaking Part 2 — Cue card & follow-up",         description: "Ghi chú nhanh, sắp xếp ý, nói trôi chảy 2 phút và xử lý câu hỏi follow-up Part 3.",   duration: "22:00", source: "IELTS Advantage" },
  { id: "am15", level: "B2", skill: "Viết",     type: "doc",      title: "Tài liệu: IELTS Task 2 — Từ nối & Hedging phrases",           description: "80 từ nối phân loại theo chức năng và hedging expressions dùng trong bài luận.",     source: "EnglishPath" },
  { id: "am16", level: "B2", skill: "Nghe",     type: "audio",    title: "Bài nghe: Podcast tốc độ tự nhiên — TED Talks tóm tắt",       description: "5 đoạn TED Talk ngắn (~3 phút) với câu hỏi kiểm tra hiểu và full transcript.",       duration: "25:00", source: "TED.com" },
  { id: "am17", level: "B2", skill: "Đọc",      type: "doc",      title: "Tài liệu: Bài đọc nâng cao — khoa học & xã hội",               description: "3 bài đọc 500–700 từ dạng IELTS Academic kèm câu hỏi phân tích ý và từ vựng.",         source: "EnglishPath" },
  { id: "am18", level: "B2", skill: "Từ vựng",  type: "doc",      title: "Tài liệu: Academic Word List — 570 từ học thuật",             description: "AWL đầy đủ phân sublists 1–10, kèm ví dụ trong văn bản học thuật chuẩn.",            source: "Coxhead (2000)" },
  // C1
  { id: "am19", level: "C1", skill: "Nói",      type: "video",    title: "Video: Kỹ năng Debate học thuật — lập luận & phản biện",       description: "Cấu trúc lập luận persuasive, cách phản biện và respond under pressure.",                 duration: "28:10", source: "EnglishPath" },
  { id: "am20", level: "C1", skill: "Viết",     type: "doc",      title: "Tài liệu: Essay học thuật C1 — cấu trúc & academic style",    description: "Viết introduction, body, conclusion chuẩn C1/IELTS 7.0+ với bài mẫu annotated.",      source: "Cambridge English" },
  { id: "am21", level: "C1", skill: "Nghe",     type: "audio",    title: "Bài nghe: TED Talks nguyên bản — Công nghệ & Tương lai",      description: "3 bài nghe nguyên bản không subtitle, dài 8–12 phút mỗi bài, có câu hỏi phân tích.",   duration: "35:00", source: "TED.com" },
  { id: "am22", level: "C1", skill: "Ngữ pháp", type: "doc",      title: "Tài liệu: Inversion & Cleft sentences — ngữ pháp nâng cao",   description: "Cấu trúc đảo ngữ và câu chẻ dùng trong văn học thuật và văn nói trang trọng.",           source: "EnglishPath" },
  // C2
  { id: "am23", level: "C2", skill: "Nói",      type: "video",    title: "Video: Public speaking chuyên nghiệp — Toastmasters style",   description: "Kiểm soát giọng điệu, ngôn ngữ cơ thể và pause chiến lược trong diễn thuyết.",             duration: "32:00", source: "Toastmasters Int'l" },
  { id: "am24", level: "C2", skill: "Viết",     type: "doc",      title: "Tài liệu: Research paper & báo cáo học thuật chuẩn APA",      description: "Cấu trúc research paper, trích dẫn APA 7th ed. và paraphrasing tránh đạo văn.",         source: "Cambridge English" },
  { id: "am25", level: "C2", skill: "Đọc",      type: "doc",      title: "Tài liệu: Critical reading — Phân tích văn bản học thuật",      description: "Nhận biết bias, evaluate evidence và synthesis thông tin từ nhiều nguồn.",               source: "EnglishPath" },
  { id: "am26", level: "C2", skill: "Từ vựng",  type: "doc",      title: "Tài liệu: Idioms & Phrasal verbs nâng cao — 300 cụm",         description: "300 idiom và phrasal verb học thuật kèm ngữ cảnh văn phong trang trọng.",              source: "EnglishPath" },
];

// === Nhật ký hoạt động hệ thống ===
export const activityLogs = [
  { id: "log1",  ts: "2026-03-07T20:05:00", actor: "H\u1ec7 th\u1ed1ng",       role: "system", action: "ai_grade",        detail: "AI ch\u1ea5m s\u01a1 b\u1ed9: Luy\u1ec7n nghe s\u1ed1 \u0111\u1ebfm (Tr\u1ea7n B\u1ea3o Ng\u1ecdc)" },
  { id: "log2",  ts: "2026-03-07T19:42:00", actor: "C\u00f4 Lan Anh",     role: "tutor",  action: "reply_parent",    detail: "Tr\u1ea3 l\u1eddi ph\u1ee5 huynh Ch\u1ecb Tr\u1ea7n Thu H\u00e0 (@ha_tran92)" },
  { id: "log3",  ts: "2026-03-06T21:02:00", actor: "Qu\u1ea3n tr\u1ecb vi\u00ean",  role: "admin",  action: "mark_paid",       detail: "X\u00e1c nh\u1eadn \u0111\u00e3 thu h\u1ecdc ph\u00ed th\u00e1ng 3 \u2014 Nguy\u1ec5n Minh Kh\u00f4i" },
  { id: "log4",  ts: "2026-03-05T14:22:00", actor: "Qu\u1ea3n tr\u1ecb vi\u00ean",  role: "admin",  action: "add_student",     detail: "Th\u00eam h\u1ecdc sinh m\u1edbi: Ph\u1ea1m Gia H\u00e2n" },
  { id: "log5",  ts: "2026-03-05T09:12:00", actor: "C\u00f4 Lan Anh",     role: "tutor",  action: "create_exercise", detail: "T\u1ea1o b\u00e0i t\u1eadp Writing Task 2 cho Nguy\u1ec5n Minh Kh\u00f4i" },
  { id: "log6",  ts: "2026-03-04T10:00:00", actor: "Qu\u1ea3n tr\u1ecb vi\u00ean",  role: "admin",  action: "approve_tutor",   detail: "Duy\u1ec7t gia s\u01b0: Th\u1ea7y \u0110\u1ee9c Anh" },
  { id: "log7",  ts: "2026-03-02T10:30:00", actor: "Qu\u1ea3n tr\u1ecb vi\u00ean",  role: "admin",  action: "add_template",    detail: "Th\u00eam m\u1eabu l\u1ed9 tr\u00ecnh: Ph\u1ea3n x\u1ea1 giao ti\u1ebfp n\u00e2ng cao B2" },
  { id: "log8",  ts: "2026-02-25T08:00:00", actor: "C\u00f4 Lan Anh",     role: "tutor",  action: "create_exercise", detail: "T\u1ea1o b\u00e0i t\u1eadp Writing Task 1 cho Nguy\u1ec5n Minh Kh\u00f4i" },
  { id: "log9",  ts: "2026-02-10T09:00:00", actor: "Qu\u1ea3n tr\u1ecb vi\u00ean",  role: "admin",  action: "add_student",     detail: "Th\u00eam h\u1ecdc sinh m\u1edbi: Nguy\u1ec5n Minh Kh\u00f4i" },
  { id: "log10", ts: "2025-09-01T08:00:00", actor: "Qu\u1ea3n tr\u1ecb vi\u00ean",  role: "admin",  action: "approve_tutor",   detail: "Duy\u1ec7t gia s\u01b0: C\u00f4 Lan Anh" },
];
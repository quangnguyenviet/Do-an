---
title: Kế hoạch triển khai đề tài — Ứng dụng AI hỗ trợ vận hành & giảng dạy gia sư tiếng Anh 1-1
version: 1.1
ngày lập: 2026-09-04
nhóm: 3 thành viên
thời lượng: 2,5 tháng (10 tuần)
---
# 1. Mô tả ngắn đề tài

**Tên đề tài:** Ứng dụng AI hỗ trợ vận hành và giảng dạy cho mô hình gia sư tiếng Anh 1-1

Nền tảng Web **single-tenant** hỗ trợ vận hành và nâng cao chất lượng giảng dạy cho mô hình gia sư tiếng Anh 1-1, với AI là công cụ giúp gia sư **tiết kiệm thời gian soạn bài** và học sinh **tự học hiệu quả hơn**

**Giá trị cốt lõi:**

- **Gia sư**: nhận lớp, soạn chương trình, giao bài tập cá nhân hóa — tất cả trên di động, trong vài phút.
- **Học sinh**: làm bài, được chấm tức thì, và tự hiểu lý do sai qua lời giải thích AI.
- **Phụ huynh**: đăng ký học thử nhanh, xem tiến bộ con bằng biểu đồ.
- **Admin**: ghép lớp, duyệt phí, và quản lý vận hành trung tâm tập trung tại một nơi.

**Kiến trúc công nghệ:**

| Thành phần | Công nghệ                               | Vai trò                                                                                                                                |
| ------------ | ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Frontend     | ReactJS                                   | Parent Portal, Tutor Portal (mobile-first), Student Portal, Admin Dashboard                                                             |
| Backend      | Spring Boot                               | API Gateway duy nhất, nghiệp vụ, RBAC theo`Enrollment`, PostgreSQL, Audit log                                                      |
| AI Service   | Python + LangGraph                        | Agent sinh Khung chương trình, Agent Tutor Assistant (sinh bài tập + đáp án + giải thích), Content Moderation, Cost guardrail |
| Hạ tầng    | PostgreSQL, S3-compatible storage, Docker | Lưu trữ dữ liệu, tài liệu/video, đóng gói triển khai                                                                          |

---

# 2. Mô tả phạm vi (Scope)

## 2.1 Trong phạm vi

| Module                           | Nội dung chính                                                                                                                                                                                                                                                                                                                                                                                   | FR liên quan                           |
| -------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| **Parent Portal**          | Landing page, Form tìm gia sư trực quan, danh sách gia sư kèm Matching Score, đăng ký học thử (OTP SMS), FAQ                                                                                                                                                                                                                                                           | FR-1, FR-2, FR-3, FR-4                  |
| **Tutor Portal**           | Nhận/từ chối lời mời nhận lớp, nộp minh chứng phí (QR proof),**Curriculum Management Dual-Mode** (tối đa 2 cấp), **Tutor Assistant Dual-Mode** (Direct AI Generation / Import File), duyệt & giao bài, upload video/tài liệu (S3), lịch dạy, đổi lịch/báo nghỉ, cấu hình lịch học thử & lịch cố định, Rate Card, danh sách học sinh & Private Notes | FR-6, FR-8, FR-9, FR-21, FR-25 → FR-30 |
| **Student Portal**         | Làm bài trực tuyến (trắc nghiệm/điền từ/sửa lỗi), tự động chấm điểm, xem lời giải thích AI (chế độ per-question hoặc submit-all), xem video/tài liệu theo bài học, báo cáo tiến bộ cá nhân (Chỉ số Chăm chỉ + Biểu đồ Năng lực)                                                                                                                         | FR-11, FR-12, FR-13, FR-15, FR-22       |
| **Admin Dashboard**        | Quản lý Match Request, tạo Match Offer, tính phí tự động, duyệt phí QR proof & mở khóa liên hệ, phân quyền RBAC theo Enrollment, audit log, báo cáo vận hành                                                                                                                                                                                                                   | FR-16, FR-19, FR-20, FR-23, FR-24       |
| **AI Service (LangGraph)** | Agent sinh khung chương trình 2 cấp; Agent sinh bài tập + đáp án + giải thích chi tiết; Parser cho chế độ Import (JSON/Text từ ChatGPT/Claude ngoài); Content Moderation filter                                                                                                                                                                                                   | FR-8, FR-30                             |
| **Nền tảng kỹ thuật**  | Spring Boot API Gateway, JWT Auth (24h), Row-level security theo Enrollment, PostgreSQL, S3 storage, Docker deployment, APM logging cơ bản                                                                                                                                                                                                                                                       | Mục 8 (NFR)                            |

## 2.2 Ngoài phạm vi

- Đánh giá gia sư sau buổi học thử (Trial Lesson Review).
- Nhật ký buổi dạy (Lesson Log) thủ công.
- Khung chương trình học đa cấp phức tạp (> 2 cấp).
- Thanh toán trực tuyến tự động (chỉ chuyển khoản thủ công + Admin duyệt).
- Học trực tuyến tích hợp (dùng Zoom/Meet ngoài).
- Báo cáo email tự động định kỳ cho phụ huynh.

## 2.3 Ràng buộc dự án

- Đội ngũ: **3 thành viên**, thời gian: **2,5 tháng (≈10 tuần làm việc)**.

---

# 3. WBS — Work Breakdown Structure

| Mã           | Hạng mục công việc                                                                                                          | Đầu ra chính                                      |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| **1.0** | **Khởi tạo & Thiết kế**                                                                                               |                                                      |
| 1.1           | Rà soát PRD, chốt phạm vi MVP, phân công vai trò                                                                         | Scope Statement, phân công 3 người               |
| 1.2           | Thiết kế kiến trúc hệ thống (FE–BE–AI, luồng REST nội bộ)                                                            | Sơ đồ kiến trúc                                 |
| 1.3           | Thiết kế CSDL (ERD: Enrollment, Match Request, Curriculum, Homework, Payment...)                                              | ERD + DDL PostgreSQL                                 |
| 1.4           | Dựng prototype ReactJS 4 cổng (Parent/Tutor/Student/Admin) — thay wireframe/Figma                                            | Prototype ReactJS 4 cổng chạy được              |
| 1.5           | Thiết lập môi trường: Git repo, CI/CD cơ bản, Docker Compose (BE+FE+AI+DB)                                               | Repo khởi tạo, pipeline chạy được              |
| 1.6           | Dựng layout chung, routing & component thư viện dùng chung cho 4 cổng                                                      | Design system, layout & component dùng chung        |
| **2.0** | **Module Phụ huynh (Parent Portal)**                                                                                     |                                                      |
| 2.1           | Auth JWT + RBAC theo`Enrollment`                                                                                              | API Auth, middleware phân quyền                    |
| 2.2           | Module Parent/Match Request (FR-1→FR-4)                                                                                        | API tìm gia sư, matching score, đăng ký học thử |
| 2.3           | Module Parent Tra cứu FAQ & Thông tin trung tâm (FR-4)                                                                       | API + Giao diện FAQ & thông tin                    |
| **3.0** | **Module Gia sư (Tutor Portal)**                                                                                         |                                                      |
| 3.1           | Enrollment, Match Offer acceptance, QR proof payment                                                                            | API CRUD tương ứng                                |
| 3.2           | Curriculum Management Dual-Mode (FR-30): AI sinh khung chương trình 2 cấp + Import JSON từ ChatGPT ngoài                  | API CRUD curriculum, tích hợp AI Service           |
| 3.3           | Tutor Assistant Dual-Mode (FR-8, FR-9): AI sinh bài tập + đáp án + giải thích + Import File                              | API sinh bài tập, duyệt & giao bài               |
| 3.4           | Vận hành: Rate Card, Private Notes, Lịch dạy, Đổi lịch/Báo nghỉ, Upload tài liệu/S3 (FR-21, FR-25→FR-29)            | API tương ứng                                     |
| **4.0** | **Module Học sinh (Student Portal)**                                                                                     |                                                      |
| 4.1           | Làm bài trực tuyến, Auto-grading, AI Explanation (FR-11→FR-13)                                                             | Giao diện & API hoàn chỉnh                        |
| 4.2           | Báo cáo tiến bộ cá nhân: Chỉ số Chăm chỉ + Biểu đồ Năng lực (FR-15); Xem tài liệu/video theo bài học (FR-22) | Giao diện & API hoàn chỉnh                        |
| **5.0** | **Module Admin (Admin Dashboard)**                                                                                        |                                                      |
| 5.1           | Match Request Management, Tạo Match Offer, Tính phí tự động (FR-16)                                                       | Giao diện & API hoàn chỉnh                        |
| 5.2           | Duyệt phí QR proof, Mở khóa liên hệ Phụ huynh (FR-23)                                                                    | Giao diện & API hoàn chỉnh                        |
| 5.3           | RBAC Audit log, Báo cáo vận hành (FR-19, FR-20, FR-24)                                                                      | Giao diện & API hoàn chỉnh                        |
| **6.0** | **AI Service (Python + LangGraph)**                                                                                       |                                                      |
| 6.1           | Thiết kế LangGraph flow (state, node, guardrail)                                                                              | Kiến trúc agent                                    |
| 6.2           | Agent sinh Khung chương trình 2 cấp (Option A)                                                                              | Endpoint`/curriculum/generate`                     |
| 6.3           | Agent Tutor Assistant: sinh câu hỏi + đáp án + giải thích (Option A)                                                     | Endpoint`/homework/generate`                       |
| 6.4           | Parser chế độ Import (Option B — JSON/Text từ Web AI ngoài)                                                               | Module parse & validate                              |
| 6.5           | Content Moderation filter + Privacy (ẩn danh hoá input)                                                                       | Middleware kiểm duyệt                              |
| **7.0** | **Tích hợp & Kiểm thử**                                                                                               |                                                      |
| 7.1           | Tích hợp end-to-end theo từng UJ (UJ-1→UJ-4)                                                                                | Luồng chạy thông suốt                            |
| 7.2           | Unit test + Integration test (ưu tiên RBAC, tính phí, chấm điểm)                                                         | Test suite                                           |
| 7.3           | UAT nội bộ (đóng vai Phụ huynh/Gia sư/Học sinh/Admin), sửa lỗi                                                         | Bug list đã fix                                    |
| **8.0** | **Triển khai & Bàn giao**                                                                                               |                                                      |
| 8.1           | Đóng gói Docker, deploy môi trường staging/demo                                                                           | Hệ thống chạy online                              |
| 8.2           | Viết tài liệu kỹ thuật (README, API doc) + tài liệu hướng dẫn sử dụng                                               | Tài liệu bàn giao                                 |
| 8.3           | Chuẩn bị & thực hiện demo, bàn giao đề tài                                                                              | Buổi báo cáo/demo                                 |

---

# 4. Kế hoạch triển khai chi tiết (10 tuần / 2,5 tháng)

Mỗi tuần phân công theo module, không theo vai trò cố định — cả 3 thành viên đều có thể đảm nhận BE, FE hoặc AI tùy hạng mục.

| Tuần                   | Mã WBS                      | Giai đoạn                 | Module chính               | Công việc cụ thể                                                                                                                                                                                                                 |
| ----------------------- | ---------------------------- | --------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1                       | 1.1, 1.2, 1.3, 1.4, 1.5, 6.1 | Khởi tạo                  | Hạ tầng & Thiết kế      | Rà soát PRD, chốt phạm vi MVP; Thiết kế kiến trúc hệ thống (FE–BE–AI); Thiết kế ERD, setup Spring Boot skeleton, Docker Compose; Dựng prototype ReactJS 4 cổng; Thiết kế LangGraph flow, setup AI service skeleton |
| 2                       | 1.6, 2.1, 6.2                | Nền tảng                  | Auth & Layout chung         | Auth JWT + RBAC theo Enrollment; Layout chung, routing, component thư viện dùng chung; Xây prompt template Curriculum Agent                                                                                                      |
| 3                       | 2.2, 2.3, 6.2                | Parent Portal               | Module Phụ huynh           | API + UI FR-1→FR-4 (tìm gia sư, matching score, đăng ký học thử, FAQ); Hoàn thiện Curriculum Agent (Option A)                                                                                                                |
| 4                       | 3.1, 3.2, 3.4, 6.4           | Tutor — Curriculum         | Module Gia sư              | API + UI nhận lớp + QR proof; Cấu hình lịch học thử & chốt lịch cố định (FR-29); UI Curriculum Dual-Mode; Parser Import Option B (Curriculum)                                                                            |
| 5                       | 3.3, 6.3, 6.4                | Tutor — Assistant AI       | Module Gia sư + AI Service | UI Tutor Assistant; API FR-8, FR-9 (sinh bài, duyệt & giao bài); Tutor Assistant Agent (sinh câu hỏi/đáp án/giải thích); Parser Import Option B (bài tập)                                                                |
| 6                       | 3.4, 6.5                     | Tutor — vận hành         | Module Gia sư              | API + UI Rate Card, Private Notes, Lịch dạy, Đổi lịch/Báo nghỉ; Upload tài liệu/S3; Content Moderation + Privacy filter                                                                                                     |
| 7                       | 4.1, 4.2                     | Student Portal              | Module Học sinh            | API + UI FR-11→FR-13 (làm bài, chấm điểm, giải thích AI 2 chế độ); FR-15 (báo cáo tiến bộ); FR-22 (xem tài liệu/video)                                                                                              |
| 8                       | 5.1, 5.2, 5.3, 6.3           | Admin Dashboard             | Module Admin                | API + UI FR-16, FR-23 (Match Request, Match Offer, duyệt phí QR, mở khóa liên hệ); FR-19, FR-20, FR-24 (RBAC audit, báo cáo vận hành); Tối ưu độ trễ AI Service                                                       |
| 9                       | 7.1, 7.2                     | Tích hợp toàn hệ thống | Tích hợp                  | Tích hợp BE↔AI Service qua API Gateway; Nối toàn bộ FE với API thật; Rà soát RBAC; Kiểm thử tải AI Service, benchmark <5s; Test luồng UJ-1→UJ-4                                                                       |
| 10                      | 7.2, 7.3, 8.1, 8.2           | Kiểm thử & Triển khai    | Kiểm thử & Triển khai    | Fix bug; Unit test + Integration test; UAT; Deploy staging; Viết API doc, tài liệu kỹ thuật, hướng dẫn sử dụng                                                                                                             |
| 10.5 (2–3 ngày cuối) | 8.1, 8.3                     | Bàn giao                   | Bàn giao                   | Đóng gói Docker production; Chuẩn bị & sắn sàng demo                                                                                                                                                                         |

## 4.1 Cột mốc (Milestones)

| Mốc                                                              | Thời điểm                | Tiêu chí hoàn thành                                                                                          |
| ----------------------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **M1 — Kiến trúc & Nền tảng sẵn sàng**               | Cuối tuần 2               | Auth hoạt động, repo/CI/CD/Docker chạy được, prototype ReactJS được duyệt                             |
| **M2 — Parent Portal + Curriculum AI hoàn chỉnh**        | Cuối tuần 4               | UJ-1 chạy end-to-end; Parent Portal (FR-1→FR-4) hoàn thiện; Curriculum Dual-Mode hoạt động (cả 2 option) |
| **M3 — Tutor Assistant & Vận hành Gia sư hoàn chỉnh** | Cuối tuần 6               | UJ-2 chạy end-to-end                                                                                            |
| **M4 — Student Portal + Admin Dashboard hoàn chỉnh**     | Cuối tuần 8               | UJ-3, UJ-4 chạy end-to-end; chấm điểm + giải thích hoạt động                                            |
| **M5 — Tích hợp toàn hệ thống**                       | Cuối tuần 9               | Toàn bộ 4 cổng liên thông qua dữ liệu thật, RBAC kiểm chứng                                            |
| **M6 — Bàn giao đề tài**                               | Cuối tuần 10 (2,5 tháng) | Deploy staging thành công, tài liệu đầy đủ, sẵn sàng demo                                             |

## 4.2 Rủi ro chính & phương án ứng phó

| Rủi ro                                                                                    | Ảnh hưởng                                | Phương án                                                                                                   |
| ------------------------------------------------------------------------------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Chất lượng nội dung AI sinh ra chưa đạt (câu hỏi/giải thích không chính xác) | Gia sư phải sửa nhiều, giảm hiệu quả | Cho phép gia sư luôn xem trước & chỉnh sửa trước khi giao bài; tinh chỉnh prompt sớm ở tuần 5–6 |
| Thời gian sinh nội dung AI > 5s                                                          | Ảnh hưởng SM-3, trải nghiệm Gia sư    | Benchmark sớm ở tuần 5–6, tối ưu prompt/streaming nếu cần                                              |
| Tích hợp 3 khối (FE-BE-AI) trễ do phụ thuộc lẫn nhau                                | Trễ tiến độ tuần 9                     | Định nghĩa API contract (OpenAPI) ngay từ tuần 1–2, mock API để FE/AI phát triển song song           |
| Chỉ 3 người, khối lượng công việc lớn                                             | Quá tải, giảm chất lượng              | Bám sát MVP scope (mục 2.2), không mở rộng tính năng ngoài phạm vi trong 2,5 tháng                  |

---

*Tài liệu này được biên soạn dựa trên PRD "Ứng dụng AI hỗ trợ vận hành và giảng dạy cho mô hình gia sư tiếng Anh 1-1" (v.final, cập nhật 2026-09-04).*

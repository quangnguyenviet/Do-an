# Vai trò Admin — Tổng hợp

> Tài liệu này tổng hợp toàn bộ vai trò, quyền hạn, chức năng và giao diện của **Admin** trong hệ thống nền tảng gia sư tiếng Anh 1-1 có tích hợp AI.
> Nguồn tham khảo: `de-cuong-xin-huong-dan.md`, `problem-statement.md`, `specs/` và các trang giao diện tại `frontend/src/pages/admin/`.

---

## Mục lục

- [1. Định nghĩa vai trò](#1-định-nghĩa-vai-trò)
- [2. Nguyên tắc phân quyền](#2-nguyên-tắc-phân-quyền)
- [3. Nhóm chức năng](#3-nhóm-chức-năng)
  - [3.1 Bảng điều khiển tổng quan (Dashboard)](#31-bảng-điều-khiển-tổng-quan-dashboard)
  - [3.2 Quản lý gia sư](#32-quản-lý-gia-sư)
  - [3.3 Quản lý học sinh & phân công](#33-quản-lý-học-sinh--phân-công)
  - [3.4 Kho tài liệu mẫu](#34-kho-tài-liệu-mẫu)
  - [3.5 Kho lộ trình mẫu (Templates)](#35-kho-lộ-trình-mẫu-templates)
  - [3.6 Báo cáo & Phân tích (Analytics)](#36-báo-cáo--phân-tích-analytics)
  - [3.7 Nhật ký hoạt động (Audit Logs)](#37-nhật-ký-hoạt-động-audit-logs)
- [4. Chức năng KHÔNG thuộc Admin](#4-chức-năng-không-thuộc-admin)
- [5. Liên kết trang giao diện](#5-liên-kết-trang-giao-diện)

---

## 1. Định nghĩa vai trò

Admin là **người vận hành trung tâm** — vai trò duy nhất có quyền quản trị toàn diện hệ thống. Hệ thống là **single-tenant** (phục vụ một trung tâm/cá nhân), do đó Admin thường là chủ trung tâm hoặc nhân viên quản lý.

| Thuộc tính | Mô tả |
|---|---|
| Số lượng tài khoản | Một hoặc một vài (không giới hạn về kỹ thuật) |
| Phạm vi dữ liệu | Toàn bộ hệ thống — tất cả gia sư, học sinh, doanh thu, log |
| Mối quan hệ | Giám sát gia sư & học sinh, **không** trực tiếp dạy học |
| Tương tác với AI | Giám sát hoạt động AI agent tư vấn, không vận hành AI trực tiếp |

---

## 2. Nguyên tắc phân quyền

Theo thiết kế hệ thống:

- **Admin** thấy và quản lý **tất cả** dữ liệu (gia sư, học sinh, lớp, doanh thu, log).
- **Gia sư** chỉ xem học sinh được gán cho mình.
- **Học sinh** chỉ xem nội dung của bản thân.
- **AI (agent tư vấn & AI soạn bài)** chỉ hỗ trợ và đề xuất — **không tự quyết định**; mọi hành động của AI đều được ghi log để Admin giám sát.
- Admin có thể can thiệp (override) kết quả ghép lớp tự động khi cần.

---

## 3. Nhóm chức năng

### 3.1 Bảng điều khiển tổng quan (Dashboard)

**Trang:** `AdminDashboard.jsx` — route `/admin`

Màn hình trung tâm cung cấp cái nhìn tức thì toàn bộ hệ thống.

#### KPI Cards (4 thẻ chỉ số)

| Chỉ số | Nội dung hiển thị |
|---|---|
| **Đội ngũ gia sư** | Tổng số gia sư · Số đang hoạt động · Số chờ duyệt |
| **Học sinh đăng ký** | Tổng số học sinh · % đã phân công · Số chưa có gia sư |
| **Doanh thu tháng** | Tổng doanh thu (đơn vị triệu ₫) · Tăng trưởng so tháng trước · Số đã thu / còn nợ |
| **Tích hợp AI & Telegram** | Trạng thái sẵn sàng của OpenAI API và Telegram Bot |

#### Phê duyệt gia sư khẩn cấp

- Hiển thị **danh sách gia sư đang chờ duyệt** ngay trên Dashboard (ưu tiên hành động).
- Mỗi dòng hiện: tên, email, SĐT, ngày đăng ký, chuyên môn.
- Hai nút hành động trực tiếp: **Duyệt tài khoản** / **Từ chối**.

#### Thao tác nhanh (5 shortcut)

Lối tắt điều hướng nhanh đến 5 khu vực quản trị chính:

1. Quản lý Gia sư → `/admin/tutors`
2. Quản lý Học sinh → `/admin/students`
3. Kho Tài liệu → `/admin/materials`
4. Doanh thu & Học phí → `/admin/analytics`
5. Nhật ký hoạt động → `/admin/logs`

#### Widgets bổ sung

- **Biểu đồ doanh thu & thu học phí** theo tháng (bar chart: đã thu / còn nợ).
- **Trạng thái hệ thống (System Health):** OpenAI API, Telegram Bot, Database & Storage, CPU/RAM — hiển thị trạng thái real-time.
- **Danh sách gia sư nổi bật** (4 gia sư đầu tiên, kèm số học sinh & trạng thái).
- **Danh sách học sinh mới** (4 học sinh đầu tiên, kèm gia sư phụ trách & trình độ).
- **Nhật ký hoạt động hệ thống gần đây** (5 hành động gần nhất).

---

### 3.2 Quản lý gia sư

**Trang:** `TutorManagement.jsx` — route `/admin/tutors`

Quản lý toàn bộ vòng đời tài khoản gia sư.

#### Xem & lọc danh sách

- **Tab lọc theo trạng thái:** Tất cả · Đang hoạt động · Chờ duyệt · Ngưng (kèm số đếm từng loại).
- **Tìm kiếm:** theo tên, email hoặc chuyên môn.
- Mỗi dòng hiển thị: avatar, tên, trạng thái, email, SĐT, chuyên môn (tags), số học sinh đang dạy.

#### Hành động trên từng gia sư

| Hành động | Điều kiện | Mô tả |
|---|---|---|
| **Duyệt** | Trạng thái `pending` | Chuyển sang `active` |
| **Từ chối** | Trạng thái `pending` | Chuyển sang `inactive` |
| **Chỉnh sửa** | Luôn có | Mở form chỉnh sửa thông tin |
| **Xóa** | Luôn có | Xóa vĩnh viễn (có xác nhận) |

#### Form thêm / chỉnh sửa gia sư

Các trường: Họ tên* · Email* · Số điện thoại · Trạng thái · Ngày gia nhập · **Chuyên môn** (multi-select tags: IELTS, Writing, Reading, Giao tiếp, Phát âm, Nghe hiểu, Speaking nâng cao, Debate, Ngữ pháp, Từ vựng...).

---

### 3.3 Quản lý học sinh & phân công

**Trang:** `StudentManagement.jsx` — route `/admin/students`

Thêm mới, cập nhật thông tin và **phân công gia sư** cho từng học sinh.

#### Xem & lọc danh sách

- **Tab lọc theo trình độ:** Tất cả · A1 · A2 · B1 · B2 · C1 · C2.
- **Tìm kiếm:** theo tên, mục tiêu học, trình độ.
- **Lọc theo gia sư:** Tất cả / Chưa có gia sư / theo từng gia sư cụ thể.
- Mỗi dòng hiển thị: tên, trình độ (badge màu), mục tiêu, gia sư phụ trách (hoặc cảnh báo "Chưa có gia sư"), lịch học, % hoàn thành tổng thể.

#### Hành động trên từng học sinh

| Hành động | Mô tả |
|---|---|
| **Chỉnh sửa** | Mở form cập nhật toàn bộ thông tin |
| **Xóa** | Xóa vĩnh viễn (có xác nhận) |

#### Form thêm / chỉnh sửa học sinh

Các trường: Họ tên* · Trình độ (A1–C2) · Mục tiêu học · Lịch học · Tên phụ huynh · Telegram phụ huynh · Ngày tham gia · **Gia sư phụ trách** (dropdown chỉ hiện gia sư `active`).

> **Lưu ý nghiệp vụ:** Admin là người duy nhất thực hiện việc phân công/điều chuyển gia sư–học sinh. Gia sư không tự chọn học sinh; học sinh không tự chọn gia sư.

---

### 3.4 Kho tài liệu mẫu

**Trang:** `AdminMaterials.jsx` — route `/admin/materials`

Thư viện tài liệu học tiếng Anh dùng chung — gia sư có thể gán cho học sinh.

#### Xem & lọc

- **Tab cấp độ:** Tất cả · A1 · A2 · B1 · B2 · C1 · C2 (kèm số tài liệu).
- **Pills kỹ năng:** Tất cả · Nghe · Nói · Đọc · Viết · Từ vựng · Ngữ pháp.
- **Tìm kiếm:** theo tiêu đề hoặc mô tả.
- Hiển thị dạng card grid (2–3 cột): icon loại tài liệu, tiêu đề, badge cấp độ, badge kỹ năng, loại (Video/Tài liệu/Âm thanh/Bài tập/PDF), mô tả ngắn, nguồn, thời lượng.

#### Loại tài liệu được hỗ trợ

| Loại | Mô tả |
|---|---|
| `video` | Video bài giảng |
| `doc` | Tài liệu văn bản |
| `audio` | File âm thanh |
| `exercise` | Bài tập thực hành |
| `pdf` | Tài liệu PDF |

#### Hành động

- **Thêm tài liệu mới:** form với tiêu đề, cấp độ, kỹ năng, loại, thời lượng, nguồn, mô tả.
- **Xóa tài liệu** khỏi kho (có xác nhận).

---

### 3.5 Báo cáo & Phân tích (Analytics)

**Trang:** `AdminAnalytics.jsx` — route `/admin/analytics`

Tổng quan doanh thu, hoạt động học tập và hiệu suất toàn hệ thống.

#### Stat Cards (4 thẻ)

| Chỉ số | Nội dung |
|---|---|
| Doanh thu tháng này | So sánh % tăng trưởng so tháng trước |
| Đã thu | Giá trị thu được tháng hiện tại |
| Còn nợ | Học phí chưa thanh toán |
| TB học phí / học sinh | Trung bình theo tháng |

#### Biểu đồ

| Biểu đồ | Loại | Nội dung |
|---|---|---|
| Doanh thu theo tháng | Bar Chart (2 series) | Đã thu (xanh) vs Còn nợ (vàng) |
| Điểm kỹ năng trung bình | Horizontal Bar Chart | 6 kỹ năng: Nghe, Nói, Đọc, Viết, Từ vựng, Ngữ pháp (thang 0–10) |
| Hoạt động bài tập theo tháng | Bar Chart (2 series) | Số bài đã tạo vs Đã hoàn thành |

#### Bảng dữ liệu

- **Học phí tháng:** danh sách từng học sinh — học phí tháng, gia sư phụ trách, trạng thái (Đã thu / Chưa thu). Kèm tổng cộng cuối bảng.
- **Học sinh tiến bộ nhất (Top 5):** xếp hạng theo `overallProgress` — tên, trình độ, kỹ năng yếu nhất, % hoàn thành.

---

### 3.6 Nhật ký hoạt động (Audit Logs)

**Trang:** `AdminLogs.jsx` — route `/admin/logs`

Lịch sử các thao tác quan trọng trong hệ thống — phục vụ giám sát, kiểm toán và debug.

#### Lọc theo vai trò

| Bộ lọc | Nội dung |
|---|---|
| Tất cả | Hiển thị log của mọi nguồn |
| Admin | Hành động do Admin thực hiện |
| Gia sư | Hành động do Gia sư thực hiện |
| Hệ thống | Hành động tự động (AI, bot, scheduler) |

#### Các loại hành động được ghi log

| action key | Nhãn hiển thị |
|---|---|
| `approve_tutor` | Duyệt gia sư |
| `add_student` | Thêm học sinh |
| `add_template` | Thêm mẫu |
| `mark_paid` | Thu học phí |
| `create_exercise` | Tạo bài tập |
| `reply_parent` | Trả lời phụ huynh |
| `ai_grade` | AI chấm bài |

#### Thông tin mỗi dòng log

- **Icon vai trò** (Admin / Gia sư / Hệ thống)
- **Tên người thực hiện** (actor)
- **Badge loại hành động** (màu sắc phân biệt)
- **Chi tiết hành động** (chuỗi mô tả)
- **Thời gian** (ngày/giờ định dạng vi-VN)

---

## 4. Chức năng KHÔNG thuộc Admin

Theo thiết kế, Admin **không** thực hiện các việc sau (thuộc về Gia sư hoặc Học sinh):

| Chức năng | Vai trò đảm nhiệm |
|---|---|
| Trực tiếp giảng dạy / dạy thử | Gia sư |
| Tạo lộ trình học riêng cho học sinh | Gia sư |
| Soạn bài tập với AI hỗ trợ | Gia sư |
| Chấm điểm & đánh giá học sinh | Gia sư |
| Làm bài tập / bài kiểm tra | Học sinh |
| Xem báo cáo tiến bộ cá nhân | Học sinh |
| Hỏi đáp với AI tích hợp khi học | Học sinh |
| Tư vấn và đề xuất gia sư cho phụ huynh | AI agent (giám sát bởi Admin) |

---

## 5. Liên kết trang giao diện

| Route | File nguồn | Mô tả |
|---|---|---|
| `/admin` | `AdminDashboard.jsx` | Bảng điều khiển tổng quan |
| `/admin/tutors` | `TutorManagement.jsx` | Quản lý gia sư |
| `/admin/students` | `StudentManagement.jsx` | Quản lý học sinh & phân công |
| `/admin/materials` | `AdminMaterials.jsx` | Kho tài liệu mẫu |
| `/admin/templates` | `AdminTemplates.jsx` | Kho lộ trình mẫu |
| `/admin/analytics` | `AdminAnalytics.jsx` | Báo cáo & Phân tích |
| `/admin/logs` | `AdminLogs.jsx` | Nhật ký hoạt động |

---


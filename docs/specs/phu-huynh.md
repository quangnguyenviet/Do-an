# Phạm vi chức năng — Vai trò Phụ huynh

> Tài liệu con chi tiết hóa mục 4.4 trong `docs/problem-statement.md`. Dùng làm tài liệu tham chiếu khi thiết kế, triển khai và kiểm thử các tính năng cho vai trò **Phụ huynh**.
>
> **Lưu ý cập nhật (04/08/2026):** bổ sung **trang tìm kiếm gia sư** cho phụ huynh — đây là phần mở rộng so với mô tả gốc ("Phụ huynh không có tài khoản riêng"). Xem chi tiết mục 1, 2 và 3.1.

## 1. Tổng quan vai trò

Phụ huynh là người có nhu cầu tìm gia sư tiếng Anh cho con và theo dõi tình hình học tập sau khi con đã có gia sư. Vai trò này nằm ở **khâu đầu** (tìm gia sư, đăng ký nhu cầu) và **khâu cuối** (theo dõi tiến bộ) của quy trình vận hành.

**Nguyên tắc cốt lõi:**
- Phụ huynh có thể **tìm kiếm gia sư** theo nhu cầu (môn/kỹ năng, trình độ, khu vực, lịch học, mục tiêu) trước khi quyết định đăng ký.
- Sau khi có học sinh được gán gia sư, phụ huynh theo dõi tình hình học tập qua **tài khoản học sinh**.
- Hệ thống chỉ ghi nhận trạng thái nghĩa vụ tài chính, **không xử lý thanh toán thực** qua cổng thanh toán.
- Giao diện hỗ trợ tiếng Việt và tiếng Anh.

## 2. Mô hình quyền & phạm vi dữ liệu

| Hạng mục | Mô tả |
|---|---|
| Truy cập trang tìm gia sư | Công khai (không bắt buộc đăng nhập) — phụ huynh xem danh sách gia sư tiêu biểu do trung tâm giới thiệu |
| Gửi yêu cầu tìm gia sư | Phụ huynh điền form đăng ký nhu cầu; Admin tiếp nhận và phản hồi |
| Phạm vi dữ liệu | Chỉ thấy thông tin gia sư được trung tâm công khai (hồ sơ minh bạch, không lộ toàn bộ danh bạ nội bộ) |
| Quyền xem tiến độ | Qua tài khoản học sinh được gán cho con mình |
| Không có quyền | Quản lý hệ thống, quản lý gia sư, chỉnh sửa dữ liệu giảng dạy |

> **Mô hình dữ liệu:** mỗi học sinh có thông tin liên hệ phụ huynh (`parentName`) trong hồ sơ học sinh. Trang tìm gia sư hiển thị danh sách gia sư đang nhận lớp (trạng thái `active` / `pending`).

## 3. Phạm vi chức năng chi tiết

### 3.1. Trang tìm kiếm gia sư (bổ sung mới)

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| PH-01 | Xem danh sách gia sư | Hiển thị hồ sơ công khai gia sư: tên, chuyên môn, kinh nghiệm, khu vực, lịch rảnh | ⬜ Chưa triển khai |
| PH-02 | Lọc/tìm gia sư theo nhu cầu | Lọc theo môn/kỹ năng, trình độ, khu vực, khung giờ rảnh, mục tiêu của con | ⬜ Chưa triển khai |
| PH-03 | Xem chi tiết hồ sơ gia sư | Xem trang hồ sơ chi tiết từng gia sư (bằng cấp, kinh nghiệm, nhận xét nếu có) | ⬜ Chưa triển khai |
| PH-04 | Đăng ký nhu cầu | Gửi form đăng ký: môn/lớp của con, lịch mong muốn, địa chỉ, mục tiêu, yêu cầu đặc biệt | ⬜ Chưa triển khai (mô tả gốc trong problem-statement mục 4.4) |

> **Quan hệ với Admin:** nhu cầu từ PH-04 được lưu vào hệ thống; Admin (bước 2-3 của quy trình vận hành) tiếp nhận, tư vấn và giới thiệu gia sư phù hợp.

### 3.2. Đăng ký nhu cầu ban đầu

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| PH-05 | Điền form đăng ký | Qua website/form trực tuyến hoặc do Admin nhập hộ khi liên hệ qua điện thoại/trực văn phòng | ⬜️ Chưa có form riêng |
| PH-06 | Theo dõi trạng thái yêu cầu | Xem trạng thái xử lý của yêu cầu mình đã gửi (đang tư vấn, đã giới thiệu, đang dạy thử, đã nhận lớp) | ⬜️ Chưa triển khai |

### 3.3. Theo dõi tình hình học tập (qua tài khoản học sinh)

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| PH-07 | Xem lịch học | Lịch học của con (qua tài khoản học sinh) | ✅ Xem trong StudentSchedule |
| PH-08 | Xem bài tập & kết quả | Danh sách bài tập, điểm, phản hồi của con | ✅ Xem trong StudentExercises / Progress |
| PH-09 | Xem tiến bộ | Biểu đồ tiến bộ theo kỹ năng theo thời gian | ✅ Xem trong StudentProgress |

## 4. Tổng hợp trạng thái prototype

| Nhóm chức năng | Đã có màn hình | Chưa có / một phần |
|---|---|---|
| 3.1 Trang tìm kiếm gia sư | — | ⬜️ Toàn bộ (PH-01 → PH-04) |
| 3.2 Đăng ký nhu cầu | — | ⬜️ Toàn bộ (PH-05 → PH-06) |
| 3.3 Theo dõi học qua tài khoản | ✅ PH-07 → PH-09 | — |

## 5. Ngoài phạm vi

- Phụ huynh **không** truy cập quản lý hệ thống, không sửa hồ sơ gia sư/học sinh.
- Không xử lý thanh toán học phí trực tiếp trên hệ thống (thanh toán thực ngoài hệ thống).
- Không dạy trực tuyến / video call tích hợp trong hệ thống.

## 6. Ghi chú triển khai

- **Trang tìm gia sư (3.1):** đây là bổ sung **mới** so với mô tả gốc "Phụ huynh không có tài khoản riêng". Cần thiết kế là trang công khai (public) của hệ thống, không nằm trong vùng đăng nhập của 3 vai trò hiện có. Gia sư đưa lên trang này phải có trạng thái `active`/`pending` (không hiển thị `inactive`).
- **Số hóa quy trình vận hành:** các nhóm 3.1, 3.2 là phần đầu của quy trình vận hành (bước 1-2) — cần ưu tiên cùng admin để hoàn thiện luồng "phụ huynh tìm/tư - admin tiếp nhận - giới thiệu gia sư".
# Phạm vi chức năng — Vai trò Gia sư

> Tài liệu con chi tiết hóa mục 4.2 trong `docs/problem-statement.md`. Dùng làm tài liệu tham chiếu khi thiết kế, triển khai và kiểm thử các tính năng cho vai trò **Gia sư** trên cả hai nhóm mục tiêu: (A) số hóa quy trình vận hành và (B) nâng cao chất lượng giảng dạy.

## 1. Tổng quan vai trò

Gia sư là người trực tiếp giảng dạy học sinh sau khi được Admin phân công lớp. Vai trò này trải dài từ khâu nhận lớp (tương tác với yêu cầu từ phụ huynh) đến khâu giảng dạy hàng ngày (lộ trình, bài tập, đánh giá).

**Nguyên tắc cốt lõi:**
- **Mô hình dạy:** hệ thống hỗ trợ dạy kèm **1-1** (1 gia sư – 1 học sinh). Dạy nhóm nhỏ (nhiều học sinh trong một buổi học) nằm **ngoài phạm vi** giai đoạn này.
- Gia sư chỉ xem và quản lý các học sinh **được gán cho mình** (mỗi học sinh được gán trong một lớp 1-1 riêng).
- AI chỉ hỗ trợ gợi ý/sinh nháp (lộ trình, bài tập, chấm điểm sơ bộ); **gia sư luôn là người quyết định nội dung/điểm cuối cùng**.
- Hệ thống chỉ theo dõi trạng thái nghĩa vụ tài chính, **không xử lý thanh toán thực**.

## 2. Mô hình quyền & phạm vi dữ liệu

| Hạng mục | Mô tả |
|---|---|
| Phạm vi học sinh | Chỉ các học sinh được Admin gán cho gia sư (sau khi nhận lớp chính thức); mỗi học sinh thuộc một lớp 1-1 riêng |
| Phạm vi yêu cầu lớp | Chỉ các yêu cầu được Admin giới thiệu/phân công cho gia sư |
| Quyền chỉnh sửa | Tạo/sửa hồ sơ của bản thân; tạo/sửa lộ trình, bài tập, tài liệu, điểm số cho học sinh được gán |
| Quyền xem | Báo cáo năng lực học sinh, thông báo, thư viện dùng chung |
| Không có quyền | Quản lý tài khoản gia sư khác, xem học sinh của gia sư khác, xử lý thanh toán |

> **Mô hình dữ liệu (hệ quả của mô hình 1-1):** mỗi lớp học (Class) gắn đúng 1 gia sư và 1 học sinh. Việc giao bài, lộ trình, chấm điểm, phí nhận lớp đều quy về theo cặp gia sư–học sinh này.

## 3. Phạm vi chức năng chi tiết

### 3.1. Hồ sơ năng lực gia sư

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TS-01 | Khai báo hồ sơ cá nhân | Môn/kỹ năng dạy, trình độ (giáo viên/sinh viên), kinh nghiệm, lý lịch học tập (năm sinh, quê quán, nơi ở, trường Cấp 3, điểm thi THPT/ĐH, GPA) & giải thưởng khen thưởng | ✅ `TutorProfile.jsx` |
| TS-02 | Cập nhật hồ sơ | Sửa thông tin năng lực bất kỳ lúc nào | ✅ TutorProfile (chỉnh sửa trực tiếp trên trang, chưa lưu bền vững) |
| TS-03 | Khai báo khu vực & lịch rảnh | Khu vực có thể nhận lớp, khung giờ rảnh — dùng cho Admin tra cứu | ✅ TutorProfile |

> Dữ liệu hồ sơ là đầu vào để Admin tra cứu/giới thiệu gia sư khi có yêu cầu từ phụ huynh (số hóa bước 2-3 quy trình vận hành).

### 3.2. Nhận và phản hồi yêu cầu lớp

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TC-01 | Nhận thông báo yêu cầu | Nhận thông báo khi Admin phân công yêu cầu từ phụ huynh | ✅ Notifications (loại "request") + ClassRequests |
| TC-02 | Xem chi tiết yêu cầu | Môn học, lịch mong muốn, địa chỉ/khu vực, mục tiêu học tập, yêu cầu đặc biệt | ✅ ClassRequests |
| TC-03 | Nhận lớp / từ chối | Xác nhận nhận lớp hoặc từ chối kèm lý do ngay trên hệ thống | ✅ ClassRequests |
| TC-04 | Theo dõi trạng thái yêu cầu | Các trạng thái: chờ dạy thử → đang dạy thử → đã nhận lớp chính thức | ✅ ClassRequests (dữ liệu mock, chuyển trạng thái thủ công — chưa gắn với lịch dạy thử thực ở mục 3.3) |

### 3.3. Dạy thử

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TT-01 | Lên lịch dạy thử | Sắp lịch 1-3 buổi dạy thử với học sinh/phụ huynh | ⬜ Chưa có màn hình chuyên dụng |
| TT-02 | Ghi nhận kết quả buổi dạy thử | Nhận xét sau mỗi buổi; xem phản hồi của phụ huynh/học sinh | ⬜ Chưa có màn hình chuyên dụng |
| TT-03 | Cập nhật kết quả cuối | Nhận lớp chính thức hoặc không — làm cơ sở cho Admin xử lý phí nhận lớp/bảo lãnh | ⬜ Chưa có màn hình chuyên dụng |

### 3.4. Nghĩa vụ tài chính với trung tâm

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TC-FIN-01 | Xem phí nhận lớp | Số phí phải đóng (~35-50% lương tháng đầu) và trạng thái đã đóng/chưa đóng | ⬜ Chưa có màn hình chuyên dụng |
| TC-FIN-02 | Theo dõi bảo lãnh | Trạng thái áp dụng chính sách bảo lãnh/hoàn phí khi sự cố khách quan trong 15-30 ngày đầu | ⬜ Chưa có màn hình chuyên dụng |

> **Ngoài phạm vi:** hệ thống chỉ ghi nhận trạng thái, không tích hợp cổng thanh toán.

### 3.5. Quản lý học sinh & lộ trình học

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TL-01 | Tạo hồ sơ học sinh | Trình độ đầu vào, mục tiêu học tập, thời gian biểu | ✅ StudentsList + StudentDetail (Overview) |
| TL-02 | Tạo lộ trình học | Lộ trình theo giai đoạn/tuần/buổi; gắn kỹ năng (Nghe, Nói, Đọc, Viết, Từ vựng, Ngữ pháp) cho từng mốc | ✅ LibraryPaths + LibraryPathDetail + StudentDetail (Learning Path) |
| TL-03 | Theo dõi tiến độ lộ trình | Xem tiến độ hoàn thành lộ trình của từng học sinh được gán | ✅ StudentDetail (Learning Path) + ProgressChart |

### 3.6. Soạn bài tập với sự hỗ trợ của AI

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TB-01 | Sinh nháp bài tập bằng AI | Chọn chủ đề/kỹ năng/độ khó; AI gợi ý/sinh nháp (trắc nghiệm, điền từ, viết đoạn, bài nói role-play...) | ✅ ExerciseGenerator |
| TB-02 | Chỉnh sửa/duyệt trước khi giao | Gia sư xem, sửa và quyết định nội dung cuối cùng | ✅ ExerciseGenerator |
| TB-03 | Giao bài tập cho học sinh | Gán bài tập cho học sinh/buổi học | ✅ ExerciseGenerator + ManageAssignments |
| TB-04 | Lịch sử bài tập theo buổi | Xem lại bài tập từng buổi để tránh trùng lặp | ✅ LibraryExercises |

> **Lưu ý hiện tại:** module AI trong prototype (`frontend/src/lib/aiAssistant.js`, `generateExercise.js`) dùng heuristic giả lập, chưa gọi API OpenAI-compatible thực.

### 3.7. Tạo bài giảng video và tài liệu

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TL-MAT-01 | Quản lý video bài giảng | Tải lên/xem video bài giảng có sẵn | ⬜ Chưa có (chỉ dữ liệu mock cho video) |
| TL-MAT-02 | Tạo tài liệu học tập | Dùng AI hỗ trợ tạo tài liệu/file tham khảo cho học sinh/buổi học | ✅ LibraryMaterials + ManageMaterials (dữ liệu mock) |
| TL-MAT-03 | Phân loại nội dung | Phân loại theo học sinh, chủ đề hoặc buổi học để dễ tra cứu | ✅ LibraryMaterials (phân loại theo danh mục) |

### 3.8. Đánh giá học sinh

| Mã | Chức năng | Mô tả | Trạng thái prototype |
|---|---|---|---|
| TG-01 | Chấm điểm tự động | Dạng bài có đáp án chuẩn chấm tự động | ✅ GradingQueue (mock) |
| TG-02 | Duyệt điểm do AI chấm sơ bộ | Dạng tự luận/viết: gia sư quyết định điểm cuối | ✅ GradingQueue |
| TG-03 | Báo cáo năng lực tổng hợp | Thống kê theo kỹ năng, theo thời gian (biểu đồ tiến bộ) | ✅ StudentDetail (Overview + ProgressChart + CompetencyRadar) |
| TG-04 | Gợi ý/cảnh báo kỹ năng yếu | Nhận cảnh báo khi học sinh yếu một kỹ năng cụ thể | ⚠️ Một phần (dữ liệu mock hiển thị, chưa có cơ chế gợi ý chủ động) |

## 4. Tổng hợp trạng thái prototype

| Nhóm chức năng | Đã có màn hình | Chưa có / một phần |
|---|---|---|
| 3.1 Hồ sơ năng lực | ✅ TS-01 → TS-03 | — |
| 3.2 Nhận & phản hồi yêu cầu | ✅ TC-01 → TC-04 (ClassRequests) | — |
| 3.3 Dạy thử | — | ⬜ Toàn bộ (TT-01 → TT-03) |
| 3.4 Nghĩa vụ tài chính | — | ⬜ Toàn bộ (TC-FIN-01 → 02) |
| 3.5 Quản lý học sinh & lộ trình | ✅ TL-01 → TL-03 | — |
| 3.6 Soạn bài tập với AI | ✅ TB-01 → TB-04 | — |
| 3.7 Bài giảng video & tài liệu | ⚠️ TL-MAT-02, 03 | ⬜ TL-MAT-01 |
| 3.8 Đánh giá học sinh | ✅ TG-01 → TG-03 | ⚠️ TG-04 |

## 5. Ngoài phạm vi (vai trò Gia sư)

- **Dạy nhóm nhỏ** (một buổi học có nhiều học sinh cùng lúc) — giai đoạn này chỉ hỗ trợ dạy kèm **1-1**. Khi mở rộng sau này cần bổ sung: quản lý lớp nhiều học sinh, lộ trình dùng chung + điều chỉnh riêng, giao bài hàng loạt, chấm điểm theo từng em trong nhóm, phí nhận lớp theo nhóm.
- Xử lý thanh toán thực (học phí phụ huynh–gia sư; phí nhận lớp gia sư–trung tâm) qua cổng thanh toán — hệ thống chỉ theo dõi trạng thái.
- Dạy trực tuyến qua video call tích hợp — dùng công cụ bên thứ ba nếu cần.
- Xem/quản lý dữ liệu học sinh thuộc gia sư khác.
- Tự tạo/sửa tài khoản của bản thân (do Admin quản lý).

## 6. Ghi chú triển khai

- **AI assistant:** thay module mock (`frontend/src/lib/aiAssistant.js`, `generateExercise.js`) bằng API OpenAI-compatible thực khi có backend; giữ nguyên nguyên tắc "gia sư duyệt trước khi giao".
- **Số hóa quy trình vận hành:** các nhóm 3.1, 3.2, 3.3, 3.4 là phần số hóa các bước 2-5 của quy trình vận hành. Đã có màn hình cho 3.1 (`TutorProfile`) và 3.2 (`ClassRequests`); 3.3, 3.4 vẫn thiếu màn hình, cần ưu tiên bổ sung để hoàn thiện prototype Gia sư.
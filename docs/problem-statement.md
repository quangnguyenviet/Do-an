# Mô tả bài toán: Website hỗ trợ gia sư tiếng Anh

## 1. Bối cảnh

Gia sư tiếng Anh dạy 1-1 hoặc nhóm nhỏ hiện gặp nhiều khó khăn mang tính lặp lại trong quá trình giảng dạy:

- Phải tự thiết kế lộ trình học phù hợp với trình độ và mục tiêu của từng học sinh, tốn nhiều thời gian và thiếu tính hệ thống.
- Phải tự soạn bài tập cho từng buổi học, dễ trùng lặp dạng bài, khó cá nhân hóa theo điểm yếu của học sinh.
- Không có công cụ đánh giá năng lực học sinh một cách định lượng, khách quan dựa trên kết quả luyện tập/kiểm tra theo thời gian.
- Phụ huynh không có kênh chính thức để theo dõi tình hình học tập của con, thường phải hỏi trực tiếp gia sư qua tin nhắn rời rạc, thiếu dữ liệu minh chứng.
- Đội ngũ quản lý/trung tâm không có công cụ tập trung để duyệt hồ sơ gia sư, phân công học sinh, kiểm soát chất lượng lộ trình/tài liệu và theo dõi tổng thể hoạt động & doanh thu.

## 2. Mục tiêu dự án

Xây dựng một nền tảng web giúp gia sư tiếng Anh và trung tâm quản lý:

1. **Tạo lộ trình học tập** cá nhân hóa cho từng học sinh dựa trên trình độ đầu vào, mục tiêu (ví dụ: giao tiếp, thi chứng chỉ, lấy lại gốc) và thời gian học.
2. **Sinh bài tập cho từng buổi học bằng AI bên thứ ba theo chuẩn OpenAI-compatible**, bám sát nội dung/kỹ năng đã lên trong lộ trình, có thể tùy chỉnh độ khó và dạng bài, bao gồm cả bài nói.
3. **Đánh giá học sinh** một cách tự động dựa trên kết quả các bài luyện tập và bài kiểm tra, thể hiện tiến bộ theo thời gian.
4. **Kênh hỏi đáp giữa phụ huynh và gia sư** về tình hình học tập của con, trong đó bot sẽ trả lời trước; nếu bot không thể trả lời thì mới chuyển câu hỏi tới gia sư để phản hồi.
5. **Quản trị toàn diện hệ thống (Admin)**: Duyệt và quản lý gia sư, phân công gia sư phụ trách học sinh, quản lý kho lộ trình mẫu & tài liệu dùng chung, giám sát báo cáo doanh thu/học phí và nhật ký hoạt động hệ thống.

## 3. Đối tượng người dùng

| Vai trò | Nhu cầu chính |
|---|---|
| Admin (Quản trị viên) | Duyệt/quản lý tài khoản gia sư, phân công học sinh, quản lý thư viện lộ trình mẫu & tài liệu dùng chung, giám sát báo cáo tài chính/doanh thu và theo dõi nhật ký hoạt động hệ thống |
| Gia sư | Quản lý các học sinh được gán cho mình, tạo lộ trình, sinh bài tập bằng AI, chấm/đánh giá kết quả, trả lời phụ huynh |
| Học sinh | Xem lịch học, bài tập và bài kiểm tra của mình, làm bài được giao, xem kết quả và tiến bộ của bản thân |
| Phụ huynh | Không có tài khoản riêng; xem tình hình học tập của con qua tài khoản của học sinh hoặc hỏi qua Telegram bot |

## 4. Phạm vi chức năng (dự kiến)

### 4.1. Quản lý học sinh & lộ trình học
- Tạo hồ sơ học sinh (trình độ đầu vào, mục tiêu, thời gian biểu).
- Gia sư tạo lộ trình học theo giai đoạn/tuần/buổi, gắn kỹ năng (Nghe, Nói, Đọc, Viết, Từ vựng, Ngữ pháp) cho từng mốc.
- Theo dõi tiến độ hoàn thành lộ trình.

### 4.2. Sinh bài tập bằng AI
- Gia sư chọn chủ đề/kỹ năng/độ khó cho buổi học, hệ thống dùng API AI bên thứ ba để sinh bộ bài tập tương ứng (trắc nghiệm, điền từ, viết đoạn, bài nói theo dạng role-play, v.v.).
- Cho phép gia sư chỉnh sửa/duyệt lại bài tập trước khi giao cho học sinh.
- Lưu lại lịch sử bài tập theo từng buổi để tránh trùng lặp.

### 4.3. Tạo bài giảng video và tài liệu
- Gia sư có thể tải lên video bài giảng có sẵn, hoặc dùng AI hỗ trợ tạo tài liệu học tập và file tham khảo cho từng học sinh hoặc từng buổi học.
- Học sinh có thể xem lại video và tài liệu được gán cho mình trong lịch sử học tập.
- Hệ thống lưu trữ và phân loại nội dung theo học sinh, chủ đề hoặc buổi học để dễ tra cứu.

### 4.4. Đánh giá học sinh
- Học sinh làm bài tập/bài kiểm tra trên hệ thống, hệ thống chấm điểm tự động (với dạng bài có đáp án chuẩn) hoặc dùng AI chấm sơ bộ rồi gia sư duyệt (với dạng bài tự luận/viết).
- Tổng hợp kết quả thành báo cáo đánh giá năng lực theo từng kỹ năng, theo thời gian (biểu đồ tiến bộ).
- Đưa ra gợi ý/cảnh báo khi học sinh yếu ở một kỹ năng cụ thể.

### 4.5. Tương tác Phụ huynh - Gia sư
- Phụ huynh xem được báo cáo tình hình học tập, kết quả các buổi học của con.
- Phụ huynh xem tình hình học tập của con thông qua tài khoản của học sinh hoặc hỏi qua Telegram bot.
- Phụ huynh gửi câu hỏi/thắc mắc qua Telegram, hệ thống dùng bot để trả lời tự động trước; nếu LLM đánh giá là không đủ khả năng trả lời thì hệ thống sẽ chuyển câu hỏi cho gia sư phản hồi qua Telegram.

### 4.6. Quản trị hệ thống & Báo cáo (Dành cho Admin)
- **Quản lý & Phê duyệt gia sư**: Tiếp nhận đăng ký, phê duyệt/từ chối tài khoản gia sư mới, tạm khóa hoặc kích hoạt lại tài khoản gia sư.
- **Phân công học sinh - gia sư**: Quản lý danh sách học sinh toàn hệ thống, thực hiện gán hoặc điều chuyển gia sư phụ trách.
- **Quản lý tài nguyên mẫu dùng chung**: Khởi tạo và quản lý thư viện khung lộ trình học mẫu (templates) và kho tài liệu tham khảo cho gia sư toàn hệ thống.
- **Báo cáo & Phân tích tổng thể**: Theo dõi biến động doanh thu, tình hình nộp học phí, tỷ lệ học sinh được gán lớp, và điểm kỹ năng trung bình toàn trung tâm.
- **Nhật ký hoạt động & Giám sát hệ thống**: Theo dõi nhật ký thao tác người dùng (Audit logs) và kiểm tra trạng thái hoạt động của AI API (OpenAI-compatible) cùng Telegram Bot Webhook.

## 5. Ngoài phạm vi (giai đoạn đầu)

- Không xử lý thanh toán học phí (có thể bổ sung sau).
- Không hỗ trợ dạy trực tuyến qua video call trong hệ thống (dùng công cụ bên thứ ba nếu cần).

## 6. Các quyết định đã chốt

- Nguồn AI sử dụng để sinh bài tập sẽ là API bên thứ ba theo chuẩn OpenAI-compatible.
- Gia sư chỉ xem và quản lý các học sinh được gán cho mình; học sinh chỉ xem lịch học, bài tập và bài kiểm tra của mình.
- Phụ huynh không có tài khoản riêng; chỉ xem tình hình học tập của con qua tài khoản của học sinh hoặc hỏi qua Telegram bot.
- Video bài giảng là nội dung có sẵn; tài liệu học tập có thể được tạo hoặc hỗ trợ tạo bằng AI.
- Admin có quyền cao nhất trong hệ thống: quản lý toàn bộ gia sư & học sinh, duyệt tài khoản, gán lớp, quản lý thư viện mẫu, xem báo cáo tài chính và giám sát nhật ký hoạt động.
- Giao diện chỉ hỗ trợ tiếng Việt và tiếng Anh.


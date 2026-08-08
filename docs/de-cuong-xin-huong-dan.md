# Đề cương sơ bộ — Xin ý kiến hướng dẫn đồ án

> Tài liệu tóm tắt hệ thống dùng để trình bày với thầy/cô khi xin nhận hướng dẫn đồ án. Nội dung tổng hợp từ `docs/problem-statement.md` và `docs/specs/` — xem các tài liệu đó để biết chi tiết đầy đủ.

## 1. Tên đề tài (dự kiến)

Ứng dụng AI hỗ trợ vận hành và giảng dạy cho mô hình gia sư tiếng Anh 1-1.

*Người thực hiện: [điền: cá nhân / nhóm — số thành viên]*

## 2. Lý do chọn đề tài

Nhiều trung tâm/cá nhân dạy gia sư tiếng Anh 1-1 hiện nay đã có kênh trực tuyến để tiếp nhận nhu cầu (website, fanpage, form đăng ký), và một số nền tảng lớn đã cho phụ huynh tự lọc gia sư theo tiêu chí cơ bản (môn, khu vực, mức phí). Tuy vậy, hai khoảng trống vẫn tồn tại rõ:

**Ở giai đoạn tìm gia sư:** các nền tảng/web gia sư hiện tại chủ yếu dừng ở mức đăng tin và tra cứu tĩnh — phụ huynh tự điền form hoặc tự chọn bộ lọc theo tiêu chí có sẵn, chưa có chatbot/AI agent tư vấn có khả năng hội thoại tự nhiên để hiểu nhu cầu và tự đề xuất gia sư phù hợp, hay trả lời trực tiếp các câu hỏi thường gặp (chính sách phí, quy trình dạy thử, bảo lãnh...). Đề tài đề xuất bổ sung một AI agent tư vấn cho giai đoạn này, kỳ vọng giúp phụ huynh được hỗ trợ nhanh hơn với các nhu cầu khó diễn đạt thành tiêu chí lọc cứng, đồng thời giảm bớt khối lượng câu hỏi lặp lại mà nhân viên tư vấn phải xử lý thủ công.

**Ở giai đoạn sau khi đã nhận lớp:** phần lớn các nền tảng hiện có dừng lại ở việc kết nối phụ huynh–gia sư, gần như bỏ trống giai đoạn dạy thực tế — nơi chất lượng dạy được quyết định. Gia sư vẫn tự thiết kế lộ trình và soạn bài tập thủ công (tốn thời gian, dễ trùng lặp, khó cá nhân hóa), không có công cụ đánh giá năng lực học sinh định lượng theo thời gian; còn học sinh và phụ huynh cũng không có một nền tảng chính thức để theo dõi việc học — học sinh không có nơi tập trung xem lịch học, làm bài tập trực tuyến, và nhìn lại tiến bộ của chính mình, phụ huynh cũng không có kênh chính thức để theo dõi việc học của con.

Đề tài hướng tới giải quyết đồng thời hai khoảng trống này: (A) một **AI agent tư vấn** hội thoại tự nhiên với phụ huynh, tự tra cứu và đề xuất gia sư phù hợp, trả lời câu hỏi thường gặp, giảm tải cho nhân viên tư vấn; và (B) một **bộ công cụ giảng dạy và học tập có AI hỗ trợ** (lộ trình cá nhân hóa, soạn bài tập, đánh giá năng lực định lượng, nền tảng học tập cho học sinh) cho giai đoạn sau khi đã nhận lớp.

## 3. Mục tiêu đề tài

Xây dựng nền tảng web **single-tenant** (phục vụ một trung tâm/cá nhân vận hành duy nhất, không phải SaaS đa khách hàng) với hai nhóm mục tiêu song song:

**A. AI agent tư vấn (điểm mới) và luồng vận hành cơ bản:**

Hệ thống hỗ trợ toàn bộ luồng vận hành từ tiếp nhận nhu cầu đến khi chính thức nhận lớp, có thêm hỗ trợ của AI ở bước tiếp nhận nhu cầu — đây là điểm mới của nhóm A. AI agent không chỉ tư vấn/đề xuất gia sư phù hợp mà còn có thể trực tiếp gửi yêu cầu của phụ huynh tới gia sư khi phụ huynh muốn liên hệ với một gia sư cụ thể.

**B. Nâng cao chất lượng giảng dạy** sau khi gia sư đã nhận lớp:

1. AI hỗ trợ tạo lộ trình học và soạn bài tập cho gia sư, cá nhân hóa theo trình độ và mục tiêu từng học sinh — gia sư luôn là người duyệt và quyết định nội dung cuối cùng.
2. Đánh giá năng lực học sinh tự động, thể hiện tiến bộ theo thời gian.
3. Ứng dụng hỗ trợ học sinh: xem lịch học, làm bài tập/kiểm tra trực tuyến, xem kết quả và tiến bộ của bản thân; có AI tích hợp để học sinh hỏi đáp nhanh chóng, tiện lợi khi cần.
4. Admin quản trị toàn diện: duyệt gia sư, phân công học sinh, quản lý thư viện mẫu dùng chung, giám sát báo cáo và nhật ký hoạt động.

## 4. Trọng tâm kỹ thuật

Đây là phần "chất xám" chính mà đồ án muốn tập trung giải quyết, ngoài phần xây dựng ứng dụng nghiệp vụ thông thường:

- **Trích xuất tiêu chí có cấu trúc từ hội thoại tự nhiên** (NLU/intent extraction): chuyển mô tả tự do của phụ huynh thành các tiêu chí lọc (môn, trình độ, lịch, khu vực, yêu cầu đặc biệt...).
- **Tool-calling / tra cứu có kiểm soát**: AI agent gọi đúng công cụ tra cứu database gia sư thay vì tự "bịa" thông tin, đảm bảo danh sách đề xuất luôn khớp dữ liệu thật.
- **Thuật toán xếp hạng gia sư đa tiêu chí** khi nhiều gia sư cùng phù hợp.
- **Cơ chế fallback/escalate**: AI agent tự nhận biết khi không đủ tin cậy để trả lời hoặc phụ huynh yêu cầu người thật, và chuyển tiếp cho nhân viên tư vấn.
- **Sinh bài tập cá nhân hóa có kiểm soát chất lượng**: AI đề xuất, gia sư luôn duyệt/chỉnh sửa trước khi giao cho học sinh.
- **Mô hình đánh giá năng lực định lượng** theo từng kỹ năng (Nghe, Nói, Đọc, Viết, Từ vựng, Ngữ pháp), thể hiện tiến bộ theo thời gian.

## 5. Đối tượng người dùng & phạm vi quyền

Hệ thống có 3 vai trò tài khoản; phụ huynh tương tác gián tiếp (không có tài khoản riêng):

| Vai trò | Nhu cầu chính |
|---|---|
| **Admin** | Tiếp nhận nhu cầu (giám sát AI agent tư vấn), duyệt/quản lý tài khoản gia sư, phân công học sinh, giám sát báo cáo & nhật ký hệ thống. Không trực tiếp dạy hay tạo lộ trình. |
| **Gia sư** | Xem/phản hồi yêu cầu lớp, dạy thử, quản lý học sinh được gán, tạo lộ trình, soạn bài tập AI, chấm/đánh giá. |
| **Học sinh** | Xem lịch học, bài tập/kiểm tra, làm bài, xem kết quả và tiến bộ của bản thân. |
| **Phụ huynh** (không có tài khoản) | Trước khi nhận lớp: tìm gia sư qua trang công khai, trò chuyện với AI agent tư vấn để được đề xuất gia sư phù hợp và giải đáp thắc mắc. Sau khi đã nhận lớp: theo dõi việc học của con qua tài khoản học sinh. |

**Nguyên tắc phân quyền:** gia sư chỉ xem học sinh được gán cho mình; học sinh chỉ xem nội dung của bản thân; AI (agent tư vấn lẫn AI hỗ trợ soạn bài/đánh giá) chỉ hỗ trợ và đề xuất, không tự quyết định nội dung, điểm số, hay xác nhận nhận lớp cuối cùng — luôn có thể chuyển cho người thật xử lý, và mọi hành động của AI đều được ghi log để admin giám sát.

## 6. Giới hạn phạm vi (đã cân nhắc và chủ động loại trừ)

- **Mô hình dạy:** chỉ hỗ trợ dạy kèm **1-1** (1 gia sư – 1 học sinh) ở giai đoạn này; dạy nhóm nhỏ (2-5 học sinh) nằm ngoài phạm vi để giữ đồ án tập trung vào phần lõi (AI agent tư vấn, lộ trình, bài tập AI, đánh giá).
- **Không xử lý thanh toán thực** qua cổng thanh toán (học phí phụ huynh–gia sư, phí nhận lớp gia sư–trung tâm) — hệ thống chỉ ghi nhận trạng thái.
- **Không dạy trực tuyến qua video call tích hợp** — dùng công cụ bên thứ ba (Zoom/Meet/Jitsi) nếu cần.
- **AI agent tư vấn chỉ hoạt động trong phạm vi đã định nghĩa**: đề xuất/tra cứu gia sư theo dữ liệu có sẵn và trả lời các câu hỏi thường gặp đã chuẩn bị trước; không tự thương lượng giá, không tự xác nhận nhận lớp thay nhân viên.
- Giao diện chỉ hỗ trợ tiếng Việt và tiếng Anh.

## 7. Định hướng công nghệ

| Thành phần | Hiện tại | Ghi chú |
|---|---|---|
| Frontend | React 19 + Vite + Tailwind v4 + react-router-dom v7 | Đã triển khai |
| Backend | Chưa có | Cần chọn stack (Node/Express, hoặc khác) + database |
| AI | Dự kiến API bên thứ ba chuẩn OpenAI-compatible, dùng cho 2 nhóm chức năng: (1) AI agent tư vấn — trích xuất tiêu chí từ hội thoại, tool-calling tra cứu gia sư, trả lời FAQ; (2) AI hỗ trợ soạn bài tập & gợi ý lộ trình | Hiện chỉ có phần (2) ở dạng mock heuristic; phần (1) chưa triển khai |


# Đề cương sơ bộ — Xin ý kiến hướng dẫn đồ án

> Tài liệu tóm tắt hệ thống dùng để trình bày với thầy/cô khi xin nhận hướng dẫn đồ án. Nội dung tổng hợp từ `docs/problem-statement.md` và `docs/specs/` — xem các tài liệu đó để biết chi tiết đầy đủ.

## Mục lục

- [1. Tên đề tài (dự kiến)](#1-tên-đề-tài-dự-kiến)
- [2. Lý do chọn đề tài](#2-lý-do-chọn-đề-tài)
- [3. Mục tiêu đề tài](#3-mục-tiêu-đề-tài)
- [4. Đối tượng người dùng & phạm vi quyền](#4-đối-tượng-người-dùng--phạm-vi-quyền)
- [5. Mô hình chức năng sản phẩm](#5-mô-hình-chức-năng-sản-phẩm)
- [6. Giới hạn phạm vi (đã cân nhắc và chủ động loại trừ)](#6-giới-hạn-phạm-vi-đã-cân-nhắc-và-chủ-động-loại-trừ)
- [7. Kiến trúc tổng quan](#7-kiến-trúc-tổng-quan)
- [8. Định hướng công nghệ](#8-định-hướng-công-nghệ)

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
4. Admin quản trị toàn diện: duyệt gia sư, phân công học sinh, giám sát báo cáo và nhật ký hoạt động.

## 4. Đối tượng người dùng & phạm vi quyền

Hệ thống có 3 vai trò tài khoản; phụ huynh tương tác gián tiếp (không có tài khoản riêng):

| Vai trò | Nhu cầu chính |
|---|---|
| **Admin** | Tiếp nhận nhu cầu (giám sát AI agent tư vấn), duyệt/quản lý tài khoản gia sư, phân công học sinh, giám sát báo cáo & nhật ký hệ thống. Không trực tiếp dạy hay tạo lộ trình. |
| **Gia sư** | Xem/phản hồi yêu cầu lớp, dạy thử, quản lý học sinh được gán, tạo lộ trình, soạn bài tập AI, chấm/đánh giá. |
| **Học sinh** | Xem lịch học, bài tập/kiểm tra, làm bài, xem kết quả và tiến bộ của bản thân. |
| **Phụ huynh** (không có tài khoản) | Trước khi nhận lớp: tìm gia sư qua trang công khai, trò chuyện với AI agent tư vấn để được đề xuất gia sư phù hợp và giải đáp thắc mắc. Sau khi đã nhận lớp: theo dõi việc học của con qua tài khoản học sinh. |

**Nguyên tắc phân quyền:** gia sư chỉ xem học sinh được gán cho mình; học sinh chỉ xem nội dung của bản thân; AI (agent tư vấn lẫn AI hỗ trợ soạn bài/đánh giá) chỉ hỗ trợ và đề xuất, không tự quyết định nội dung, điểm số, hay xác nhận nhận lớp cuối cùng — luôn có thể chuyển cho người thật xử lý, và mọi hành động của AI đều được ghi log để admin giám sát.

## 5. Mô hình chức năng sản phẩm

Chức năng hệ thống phân theo 4 nhóm người dùng:

```
Nền tảng gia sư tiếng Anh
├── Phụ huynh   (không có tài khoản)
├── Admin
├── Gia sư
└── Học sinh
```

**Phụ huynh** (không có tài khoản riêng)
- Trang tìm kiếm gia sư công khai: xem hồ sơ, lọc theo môn/trình độ/khu vực/lịch — không cần đăng nhập.
- Trò chuyện với AI agent tư vấn: mô tả nhu cầu tự nhiên, được trích xuất tiêu chí và đề xuất gia sư phù hợp, hỏi đáp các câu hỏi thường gặp.
- Đăng ký nhu cầu — qua form trực tuyến, qua AI agent, hoặc Admin nhập hộ khi liên hệ điện thoại/trực tiếp.

**Admin**
- Tiếp nhận và giám sát các yêu cầu đăng ký nhu cầu (kể cả giám sát AI agent tư vấn).
- Giám sát/can thiệp cơ chế ghép lớp tự động khi cần (VD: yêu cầu treo quá lâu không ai nhận).
- Theo dõi trạng thái phí nhận lớp và chính sách bảo lãnh của từng gia sư.
- Duyệt/quản lý tài khoản gia sư (tạo, khóa, xóa, phân quyền).
- Phân công và điều chuyển gia sư — học sinh.
- Báo cáo doanh thu, tỷ lệ gán lớp, điểm kỹ năng trung bình toàn trung tâm.
- Nhật ký hoạt động (audit log) và giám sát trạng thái hoạt động của AI.

**Gia sư**
- Khai báo hồ sơ năng lực: môn/kỹ năng, trình độ, kinh nghiệm, khu vực, khung giờ rảnh.
- Nhận và phản hồi (xác nhận/từ chối) offer nhận lớp do hệ thống tự động gửi.
- Dạy thử: lên lịch, ghi nhận kết quả và nhận xét sau mỗi buổi.
- Xem và theo dõi nghĩa vụ phí nhận lớp, trạng thái áp dụng chính sách bảo lãnh.
- Quản lý học sinh được gán, tạo lộ trình học cá nhân hóa theo giai đoạn/tuần/buổi.
- Soạn bài tập với AI hỗ trợ gợi ý/sinh nháp — luôn xem, chỉnh sửa và duyệt trước khi giao.
- Tạo/quản lý bài giảng video và tài liệu học tập.
- Chấm điểm và đánh giá năng lực học sinh theo từng kỹ năng, theo thời gian.

**Học sinh**
- Xem lịch học, bài tập/bài kiểm tra được giao.
- Làm bài trên hệ thống.
- Xem lại video bài giảng và tài liệu được gán.
- Xem kết quả và báo cáo tiến bộ theo từng kỹ năng, theo thời gian.
- Hỏi đáp nhanh với AI tích hợp khi cần.

## 6. Giới hạn phạm vi (đã cân nhắc và chủ động loại trừ)

- **Mô hình dạy:** chỉ hỗ trợ dạy kèm **1-1** (1 gia sư – 1 học sinh) ở giai đoạn này; dạy nhóm nhỏ (2-5 học sinh) nằm ngoài phạm vi để giữ đồ án tập trung vào phần lõi (AI agent tư vấn, lộ trình, bài tập AI, đánh giá).
- **Không dạy trực tuyến qua video call tích hợp** — dùng công cụ bên thứ ba (Zoom/Meet/Jitsi) nếu cần.
- **AI agent tư vấn chỉ hoạt động trong phạm vi đã định nghĩa**: đề xuất/tra cứu gia sư theo dữ liệu có sẵn và trả lời các câu hỏi thường gặp đã chuẩn bị trước; không tự thương lượng giá, không tự xác nhận nhận lớp thay nhân viên.
- Giao diện chỉ hỗ trợ tiếng Việt và tiếng Anh.

## 7. Kiến trúc tổng quan

Hệ thống dự kiến chia thành 3 thành phần độc lập, giao tiếp qua API:

- **Frontend** — React SPA, giao diện cho cả 3 vai trò (admin/gia sư/học sinh) và trang công khai cho phụ huynh.
- **Backend Service** (Spring Boot, Java + PostgreSQL) — nắm toàn bộ dữ liệu và logic nghiệp vụ: xác thực/phân quyền, CRUD gia sư/học sinh/lớp/bài tập, và là **API gateway duy nhất** mà frontend gọi tới (kể cả các tính năng có AI).
- **AI Service** (Python, LangGraph) — chạy các agent/graph AI: agent tư vấn cho phụ huynh (trích xuất tiêu chí, tool-calling, FAQ, fallback/escalate) và các flow hỗ trợ soạn bài tập/đánh giá năng lực.

Cả 3 thành phần đóng gói bằng **Docker** (mỗi service một container riêng).

```
┌────────────┐                  ┌────────────────────────┐                 ┌──────────────────────┐
│  Frontend  │ ───────────────▶ │     Backend Service      │ ──────────────▶ │      AI Service        │
│ (React SPA)│ ◀─────────────── │ (Spring Boot + PostgreSQL)│ ◀────────────── │ (Python, LangGraph)    │
└────────────┘                  └────────────────────────┘   tool-calling   └──────────────────────┘
                                                              (tra cứu dữ liệu
                                                               qua Backend)
```

- Frontend ↔ Backend, và Backend ↔ AI Service: đều qua REST/HTTPS, hỗ trợ **cả streaming (SSE/WS) lẫn non-streaming** — streaming dùng cho chat với AI agent (trả lời dần theo thời gian thực), non-streaming cho các tác vụ khác.
- AI Service gọi ngược lại Backend (mũi tên phải sang trái) khi cần tool-calling để tra cứu dữ liệu thật.

**Nguyên tắc luồng dữ liệu:**

1. Frontend **chỉ** gọi Backend Service — kể cả khi thao tác liên quan AI (chat với agent tư vấn, yêu cầu AI soạn bài tập...). Frontend không gọi thẳng AI Service.
2. Backend Service là nguồn dữ liệu nghiệp vụ duy nhất (gia sư, học sinh, lớp, bài tập...), lưu trên **PostgreSQL**, và chịu trách nhiệm xác thực/phân quyền.
3. Khi có yêu cầu cần AI xử lý, Backend gọi sang AI Service (API nội bộ) kèm ngữ cảnh cần thiết (lịch sử hội thoại, hồ sơ học sinh...). Với các tác vụ hội thoại (chat với agent tư vấn/AI hỗ trợ), giao thức hỗ trợ **cả streaming lẫn non-streaming** — streaming để trả lời dần theo thời gian thực trên giao diện chat, non-streaming cho các tác vụ chạy nền hoặc không cần hiển thị tức thời.
4. Khi agent trong AI Service cần tra cứu dữ liệu thật (VD: tìm gia sư phù hợp), nó gọi **ngược lại** Backend Service qua tool-calling thay vì truy cập CSDL trực tiếp, đảm bảo danh sách đề xuất luôn khớp dữ liệu thật và Backend là nơi kiểm soát phân quyền dữ liệu duy nhất.

**Câu hỏi mở / cần quyết định thêm:** cơ chế streaming cụ thể (SSE hay WebSocket) giữa Frontend↔Backend và Backend↔AI Service; cấu hình docker-compose/orchestration khi triển khai nhiều service cùng lúc.

## 8. Định hướng công nghệ

| Thành phần | Công nghệ |
|---|---|
| Frontend | React 19 + Vite + Tailwind v4 + react-router-dom v7 |
| Backend Service | Spring Boot (Java) + PostgreSQL |
| AI Service | Python + LangGraph |


# Mô tả bài toán: Chuyển đổi số quy trình vận hành & giảng dạy gia sư tiếng Anh

## 1. Bối cảnh

### 1.1. Quy trình vận hành hiện tại (thủ công)

Một trung tâm/cá nhân vận hành dịch vụ gia sư tiếng Anh theo mô hình 1-1 hiện đang xử lý toàn bộ quy trình kết nối phụ huynh — gia sư gồm 5 bước:

1. **Phụ huynh liên hệ và đăng ký nhu cầu**: qua điện thoại, đến trực tiếp văn phòng, hoặc website/nền tảng trực tuyến. Trung tâm thu thập thủ công các thông tin: môn học/lớp của con, lịch học mong muốn (số buổi/tuần, khung giờ), địa chỉ, mục tiêu học tập (điểm yếu, mục tiêu điểm số, kỳ thi sắp tới), yêu cầu đặc biệt với gia sư (giáo viên/sinh viên, giới tính, kinh nghiệm...).
2. **Trung tâm tư vấn và tìm gia sư phù hợp**: nhân viên tư vấn, báo giá học phí tham khảo, rồi tra cứu thủ công (thường qua trí nhớ, Excel hoặc tin nhắn nội bộ) trong đội ngũ gia sư đã qua sàng lọc để tìm ứng viên phù hợp.
3. **Trung tâm giới thiệu và sắp xếp gia sư**: gửi hồ sơ/kinh nghiệm/bằng cấp của gia sư cho phụ huynh xem xét; khi gia sư đồng ý và phụ huynh chấp thuận, gia sư đóng phí nhận lớp (khoảng 35-50% lương tháng đầu) cho trung tâm.
4. **Gia sư dạy thử và bắt đầu hợp tác**: dạy thử miễn phí 1-3 buổi để hai bên đánh giá lẫn nhau; trung tâm áp dụng chính sách bảo lãnh (hoàn phí nhận lớp một phần/toàn bộ hoặc sắp xếp lớp khác nếu có sự cố khách quan trong 15-30 ngày đầu).
5. **Vận hành tài chính**: phụ huynh thanh toán học phí trực tiếp cho gia sư (thường cuối tháng); trung tâm không giữ học phí hàng tháng, chỉ thu phí nhận lớp một lần từ gia sư.

Quy trình này hiện gần như hoàn toàn thủ công (điện thoại, tin nhắn, giấy tờ, Excel), dẫn đến các hạn chế:

- Thông tin nhu cầu phụ huynh và hồ sơ gia sư nằm rời rạc, không có nơi tra cứu tập trung, dễ thất lạc hoặc sai lệch.
- Việc ghép gia sư phù hợp phụ thuộc vào trí nhớ/kinh nghiệm cá nhân của nhân viên tư vấn, không có công cụ lọc theo tiêu chí (môn, lịch, khu vực, yêu cầu đặc biệt).
- Không có cách theo dõi minh bạch trạng thái từng yêu cầu (đang tư vấn, đã giới thiệu, đang dạy thử, đã nhận lớp chính thức) cho cả trung tâm, gia sư lẫn phụ huynh.
- Phí nhận lớp và chính sách bảo lãnh được quản lý thủ công, khó đối chiếu khi có tranh chấp hoặc cần hoàn phí.

### 1.2. Vấn đề chất lượng giảng dạy sau khi đã nhận lớp

Song song với quy trình vận hành, việc giảng dạy sau khi gia sư đã nhận lớp cũng gặp nhiều khó khăn mang tính lặp lại:

- Gia sư phải tự thiết kế lộ trình học phù hợp với trình độ và mục tiêu của từng học sinh, tốn nhiều thời gian và thiếu tính hệ thống.
- Gia sư phải tự soạn bài tập cho từng buổi học, dễ trùng lặp dạng bài, khó cá nhân hóa theo điểm yếu của học sinh.
- Không có công cụ đánh giá năng lực học sinh một cách định lượng, khách quan dựa trên kết quả luyện tập/kiểm tra theo thời gian.
- Người quản lý không có công cụ tập trung để theo dõi gia sư và học sinh trong hệ thống — dữ liệu nằm rời rạc theo từng gia sư, khó giám sát chất lượng chung.
- Phụ huynh không có kênh chính thức để theo dõi tình hình học tập của con, thường phải hỏi trực tiếp gia sư qua tin nhắn rời rạc, thiếu dữ liệu minh chứng.
- Đội ngũ quản lý/trung tâm không có công cụ tập trung để duyệt hồ sơ gia sư, phân công học sinh, kiểm soát chất lượng lộ trình/tài liệu và theo dõi tổng thể hoạt động & doanh thu.

## 2. Mục tiêu dự án

Xây dựng một nền tảng web single-tenant giúp gia sư tiếng Anh và trung tâm quản lý với hai nhóm mục tiêu song song:

**A. Chuyển đổi số quy trình vận hành 5 bước ở mục 1.1**, số hóa từng khâu để thay thế cách làm thủ công qua điện thoại/tin nhắn/Excel:

| Bước thủ công | Số hóa thành |
|---|---|
| 1. Phụ huynh liên hệ, cung cấp nhu cầu | Form đăng ký nhu cầu trực tuyến, lưu tập trung trên hệ thống |
| 2. Trung tâm tư vấn, tìm gia sư phù hợp | Admin lọc/tìm gia sư theo môn, lịch, khu vực, yêu cầu đặc biệt trên hệ thống thay vì tra cứu thủ công |
| 3. Trung tâm giới thiệu, gia sư nhận lớp | Gia sư nhận thông báo yêu cầu được phân công, xem thông tin phụ huynh/học sinh, xác nhận nhận lớp hoặc từ chối trên hệ thống |
| 4. Dạy thử | Lên lịch dạy thử, ghi nhận kết quả/nhận xét hai chiều, theo dõi trạng thái (đang thử, đạt, không đạt) |
| 5. Phí nhận lớp & bảo lãnh | Theo dõi trạng thái nghĩa vụ phí nhận lớp của gia sư và chính sách bảo lãnh/hoàn phí trong hệ thống (không xử lý thanh toán thực qua cổng thanh toán) |

**B. Nâng cao chất lượng giáo dục** sau khi gia sư đã chính thức nhận lớp, thông qua các tính năng cho gia sư và học sinh:

1. **Gia sư tạo lộ trình học tập** cá nhân hóa cho từng học sinh dựa trên trình độ đầu vào, mục tiêu (ví dụ: giao tiếp, thi chứng chỉ, lấy lại gốc) và thời gian học.
2. **Gia sư soạn bài tập cho từng buổi học với sự hỗ trợ của AI bên thứ ba theo chuẩn OpenAI-compatible**, bám sát nội dung/kỹ năng đã lên trong lộ trình, có thể tùy chỉnh độ khó và dạng bài, bao gồm cả bài nói; gia sư luôn xem lại và duyệt trước khi giao cho học sinh.
3. **Đánh giá học sinh** tự động dựa trên kết quả các bài luyện tập và bài kiểm tra, thể hiện tiến bộ theo thời gian; học sinh tự xem được kết quả và tiến bộ của mình.
4. **Kênh hỏi đáp giữa phụ huynh và gia sư** về tình hình học tập của con, trong đó bot sẽ trả lời trước; nếu bot không thể trả lời thì mới chuyển câu hỏi tới gia sư để phản hồi.
5. **Quản trị toàn diện hệ thống (Admin)**: Duyệt và quản lý gia sư, phân công gia sư phụ trách học sinh, quản lý kho lộ trình mẫu & tài liệu dùng chung, giám sát báo cáo doanh thu/học phí và nhật ký hoạt động hệ thống.

Ở giai đoạn hiện tại, tài liệu này tập trung mô tả chi tiết phạm vi chức năng cho vai trò **Gia sư** (mục 4.2), bao gồm cả phần số hóa quy trình vận hành (mục A) lẫn phần nâng cao chất lượng giảng dạy (mục B) áp dụng cho vai trò này. Các vai trò Admin, Học sinh và Phụ huynh giữ mô tả ở mức tổng quan, sẽ được chi tiết hóa ở giai đoạn sau.

## 3. Đối tượng người dùng

Nền tảng được xây dựng cho **một đơn vị/cá nhân vận hành duy nhất** (single-tenant: một trung tâm hoặc một gia sư chính quản lý toàn bộ hệ thống), không phải mô hình SaaS đa khách hàng. Trong phạm vi đó, hệ thống có 3 vai trò tài khoản:

| Vai trò | Nhu cầu chính |
|---|---|
| Admin (Quản trị viên) | Tiếp nhận nhu cầu phụ huynh, duyệt/quản lý tài khoản gia sư (tạo/khóa/xóa, phân quyền), phân công học sinh, quản lý thư viện lộ trình mẫu & tài liệu dùng chung, giám sát báo cáo tài chính/doanh thu, theo dõi nhật ký hoạt động hệ thống và giám sát toàn bộ hoạt động hệ thống; không trực tiếp dạy hay tạo lộ trình cho học sinh |
| Gia sư | Xem/phản hồi yêu cầu lớp được phân công, dạy thử, quản lý các học sinh được gán cho mình, tạo lộ trình, soạn bài tập với sự hỗ trợ của AI, chấm/đánh giá kết quả, trả lời phụ huynh |
| Học sinh | Xem lịch học, bài tập và bài kiểm tra của mình, làm bài được giao, xem kết quả và tiến bộ của bản thân |
| Phụ huynh | Tìm kiếm gia sư qua trang công khai (không cần đăng nhập), đăng ký nhu cầu ban đầu; xem tình hình học tập của con qua tài khoản của học sinh hoặc hỏi qua Telegram bot |

## 4. Phạm vi chức năng (dự kiến)

Chức năng được phân theo 3 vai trò tài khoản (Admin, Gia sư, Học sinh); Phụ huynh tương tác gián tiếp qua tài khoản học sinh hoặc Telegram bot.

### 4.1. Admin (tổng quan — sẽ chi tiết hóa sau)
- Tiếp nhận và quản lý các yêu cầu đăng ký nhu cầu từ phụ huynh (bước 1-2 của quy trình vận hành).
- Tìm kiếm, lọc và giới thiệu gia sư phù hợp cho từng yêu cầu; phân công lớp cho gia sư (bước 3).
- Theo dõi trạng thái phí nhận lớp và chính sách bảo lãnh của từng gia sư (bước 5).
- Tạo, khóa, xóa tài khoản gia sư; quản lý phân quyền truy cập.
- Giám sát toàn bộ hoạt động của hệ thống (danh sách gia sư, học sinh, tình trạng sử dụng AI, v.v.).
- Không trực tiếp tạo lộ trình, bài tập hay chấm điểm cho học sinh — vai trò thuần vận hành/quản trị hệ thống.

### 4.2. Gia sư (chi tiết)

#### 4.2.1. Hồ sơ năng lực gia sư
- Khai báo và cập nhật hồ sơ cá nhân: môn/kỹ năng có thể dạy, trình độ (giáo viên/sinh viên), kinh nghiệm, bằng cấp/chứng chỉ, khu vực có thể nhận lớp, khung giờ rảnh.
- Hồ sơ này là dữ liệu để Admin tra cứu và giới thiệu cho phụ huynh khi có yêu cầu phù hợp (số hóa bước 2-3 của quy trình vận hành).

#### 4.2.2. Nhận và phản hồi yêu cầu lớp được phân công
- Nhận thông báo khi Admin giới thiệu/phân công một yêu cầu từ phụ huynh, xem chi tiết: môn học, lịch mong muốn, địa chỉ/khu vực, mục tiêu học tập, yêu cầu đặc biệt của phụ huynh.
- Xác nhận nhận lớp hoặc từ chối (nêu lý do) ngay trên hệ thống, thay vì trao đổi qua điện thoại/tin nhắn với Admin.
- Xem trạng thái xử lý của từng yêu cầu mình đã nhận: chờ dạy thử, đang dạy thử, đã nhận lớp chính thức.

#### 4.2.3. Dạy thử
- Lên lịch buổi dạy thử (1-3 buổi) với học sinh/phụ huynh ngay trên hệ thống.
- Ghi nhận kết quả và nhận xét sau mỗi buổi dạy thử; xem phản hồi của phụ huynh/học sinh về buổi dạy thử (nếu có).
- Cập nhật kết quả cuối cùng: nhận lớp chính thức hay không, làm cơ sở cho Admin xử lý phí nhận lớp/chính sách bảo lãnh.

#### 4.2.4. Nghĩa vụ tài chính với trung tâm
- Xem thông tin phí nhận lớp phải đóng cho trung tâm khi chính thức nhận lớp (khoảng 35-50% lương tháng đầu) và trạng thái đã đóng/chưa đóng.
- Theo dõi trạng thái áp dụng chính sách bảo lãnh (hoàn phí một phần/toàn bộ hoặc chuyển lớp khác) khi có sự cố khách quan từ phía phụ huynh trong 15-30 ngày đầu.
- Hệ thống chỉ theo dõi và ghi nhận trạng thái nghĩa vụ này, không xử lý thanh toán thực qua cổng thanh toán.

#### 4.2.5. Quản lý học sinh & lộ trình học
- Tạo hồ sơ học sinh (trình độ đầu vào, mục tiêu, thời gian biểu) sau khi đã nhận lớp chính thức.
- Tạo lộ trình học theo giai đoạn/tuần/buổi, gắn kỹ năng (Nghe, Nói, Đọc, Viết, Từ vựng, Ngữ pháp) cho từng mốc.
- Theo dõi tiến độ hoàn thành lộ trình của từng học sinh được gán cho mình.

#### 4.2.6. Soạn bài tập với sự hỗ trợ của AI
- Chọn chủ đề/kỹ năng/độ khó cho buổi học; hệ thống dùng API AI bên thứ ba (OpenAI-compatible) để hỗ trợ gợi ý/sinh nháp bộ bài tập tương ứng (trắc nghiệm, điền từ, viết đoạn, bài nói theo dạng role-play, v.v.), gia sư là người quyết định nội dung cuối cùng.
- Chỉnh sửa/duyệt lại bài tập trước khi giao cho học sinh.
- Xem lại lịch sử bài tập theo từng buổi để tránh trùng lặp.

#### 4.2.7. Tạo bài giảng video và tài liệu
- Tải lên video bài giảng có sẵn, hoặc dùng AI hỗ trợ tạo tài liệu học tập và file tham khảo cho từng học sinh hoặc từng buổi học.
- Quản lý, phân loại nội dung theo học sinh, chủ đề hoặc buổi học để dễ tra cứu.

#### 4.2.8. Đánh giá học sinh
- Chấm điểm tự động (với dạng bài có đáp án chuẩn) hoặc duyệt lại điểm do AI hỗ trợ chấm sơ bộ, gia sư là người quyết định điểm cuối cùng (với dạng bài tự luận/viết).
- Xem báo cáo tổng hợp năng lực học sinh theo từng kỹ năng, theo thời gian (biểu đồ tiến bộ).
- Nhận gợi ý/cảnh báo khi học sinh yếu ở một kỹ năng cụ thể.

#### 4.2.9. Trả lời phụ huynh
- Nhận và phản hồi qua Telegram các câu hỏi của phụ huynh mà bot không đủ khả năng trả lời tự động.

### 4.3. Học sinh (tổng quan — sẽ chi tiết hóa sau)
- Xem lịch học, bài tập và bài kiểm tra được giao.
- Làm bài tập/bài kiểm tra trên hệ thống.
- Xem lại video bài giảng và tài liệu được gán cho mình.
- Xem kết quả và báo cáo tiến bộ của bản thân theo từng kỹ năng, theo thời gian.

### 4.4. Phụ huynh (tổng quan — sẽ chi tiết hóa sau; đã bổ sung trang tìm kiếm gia sư 04/08/2026)
- **Trang tìm kiếm gia sư:** phụ huynh xem danh sách gia sư đang nhận lớp (hồ sơ công khai do trung tâm giới thiệu) và lọc theo môn/kỹ năng, trình độ, khu vực, lịch học; từ đó đăng ký nhu cầu cho con. Xem chi tiết tại docs/specs/phu-huynh.md mục 3.1.
- Đăng ký nhu cầu ban đầu (bước 1 của quy trình vận hành) qua form trực tuyến hoặc được Admin nhập hộ khi liên hệ qua điện thoại/trực tiếp.
- Xem tình hình học tập, kết quả các buổi học của con thông qua tài khoản của học sinh.
- Gửi câu hỏi/thắc mắc qua Telegram: bot trả lời tự động trước; nếu LLM đánh giá không đủ khả năng trả lời thì hệ thống chuyển câu hỏi cho gia sư phản hồi qua Telegram.

### 4.6. Quản trị hệ thống & Báo cáo (Dành cho Admin)
- **Quản lý & Phê duyệt gia sư**: Tiếp nhận đăng ký, phê duyệt/từ chối tài khoản gia sư mới, tạm khóa hoặc kích hoạt lại tài khoản gia sư.
- **Phân công học sinh - gia sư**: Quản lý danh sách học sinh toàn hệ thống, thực hiện gán hoặc điều chuyển gia sư phụ trách.
- **Quản lý tài nguyên mẫu dùng chung**: Khởi tạo và quản lý thư viện khung lộ trình học mẫu (templates) và kho tài liệu tham khảo cho gia sư toàn hệ thống.
- **Báo cáo & Phân tích tổng thể**: Theo dõi biến động doanh thu, tình hình nộp học phí, tỷ lệ học sinh được gán lớp, và điểm kỹ năng trung bình toàn trung tâm.
- **Nhật ký hoạt động & Giám sát hệ thống**: Theo dõi nhật ký thao tác người dùng (Audit logs) và kiểm tra trạng thái hoạt động của AI API (OpenAI-compatible) cùng Telegram Bot Webhook.

## 5. Ngoài phạm vi (giai đoạn đầu)

- Không xử lý thanh toán học phí hàng tháng giữa phụ huynh và gia sư (vẫn thanh toán trực tiếp ngoài hệ thống); hệ thống chỉ ghi nhận trạng thái, không tích hợp cổng thanh toán.
- Không xử lý thanh toán thực tế của phí nhận lớp (gia sư → trung tâm) qua cổng thanh toán; chỉ theo dõi trạng thái đã đóng/chưa đóng.
- Không hỗ trợ dạy trực tuyến qua video call trong hệ thống (dùng công cụ bên thứ ba nếu cần).

## 6. Các quyết định đã chốt

- Nền tảng triển khai single-tenant, phục vụ một đơn vị/cá nhân vận hành duy nhất — không phải mô hình SaaS đa khách hàng (multi-tenant).
- **Mô hình dạy:** giai đoạn hiện tại chỉ hỗ trợ dạy kèm **1-1** (1 gia sư – 1 học sinh). Đã cân nhắc thực tế rằng các trung tâm gia sư thường nhận cả nhu cầu nhóm nhỏ (2-5 học sinh, ví dụ anh chị em hoặc nhóm bạn cùng lớp), nhưng **dạy nhóm nhỏ nằm ngoài phạm vi** giai đoạn này để giữ prototype đơn giản và tập trung phần lõi (lộ trình, bài tập AI, đánh giá — vốn luôn theo từng học sinh). Hệ quả thiết kế: giao bài, lộ trình, chấm điểm, phí nhận lớp đều theo cặp 1 gia sư – 1 học sinh; không có khái niệm lớp nhiều học sinh.
- Khi mở rộng sang nhóm nhỏ sau này, cần bổ sung: quản lý lớp nhiều học sinh, lộ trình dùng chung + điều chỉnh riêng từng em, giao bài cho nhiều học sinh (1 bài → nhiều học sinh, mỗi em vẫn có nộp bài/điểm riêng), chấm điểm theo từng em trong nhóm, phí nhận lớp theo nhóm.
- Mục tiêu dự án gồm hai phần song song: (A) chuyển đổi số quy trình vận hành 5 bước (đăng ký nhu cầu → tư vấn/tìm gia sư → giới thiệu/nhận lớp → dạy thử → phí nhận lớp) và (B) nâng cao chất lượng giáo dục qua các tính năng cho gia sư và học sinh.
- Ở giai đoạn hiện tại, chỉ vai trò Gia sư được đặc tả chi tiết đầy đủ (mục 4.2); Admin, Học sinh, Phụ huynh giữ ở mức tổng quan và sẽ được bổ sung chi tiết sau.
- Hệ thống có 3 vai trò tài khoản: **Admin** (quản lý gia sư, tiếp nhận/giới thiệu yêu cầu, giám sát hệ thống), **Gia sư**, **Học sinh**; Phụ huynh không có tài khoản riêng nhưng có thể sử dụng **trang tìm kiếm gia sư công khai** (xem hồ sơ gia sư, lọc theo nhu cầu, đăng ký nhu cầu) mà không cần đăng nhập (04/08/2026).
- Nguồn AI sử dụng để hỗ trợ soạn bài tập sẽ là API bên thứ ba theo chuẩn OpenAI-compatible; AI chỉ hỗ trợ gợi ý/sinh nháp, gia sư luôn là người xem, chỉnh sửa và quyết định nội dung cuối cùng trước khi giao cho học sinh.
- Gia sư chỉ xem và quản lý các học sinh được gán cho mình; học sinh chỉ xem lịch học, bài tập và bài kiểm tra của mình.
- Phụ huynh không có tài khoản riêng; có thể xem hồ sơ gia sư qua **trang tìm kiếm gia sư công khai** (không cần đăng nhập) và xem tình hình học tập của con qua tài khoản của học sinh hoặc hỏi qua Telegram bot.
- **Ghép gia sư (bước 3, cập nhật 04/08/2026):** khi nhiều gia sư cùng thỏa mãn tiêu chí của một yêu cầu, hệ thống **tự động** lọc và gửi offer đồng thời tới tất cả gia sư thỏa mãn (không phải Admin chọn thủ công từng người); gia sư nào xác nhận nhận lớp **đầu tiên** thì được gán yêu cầu, các offer còn lại tự đóng. Nếu phụ huynh chỉ định đích danh một gia sư (qua trang tìm kiếm gia sư công khai), offer chỉ gửi tới gia sư đó. Offer không có hạn — tồn tại đến khi có gia sư nhận hoặc phụ huynh hủy yêu cầu. Vai trò Admin trong luồng này là giám sát/can thiệp khi cần (ví dụ yêu cầu treo quá lâu không ai nhận), không trực tiếp chọn hay gửi từng offer. Chi tiết cơ chế tránh tranh chấp khi nhiều gia sư cùng nhận (race condition) sẽ được đặc tả khi chi tiết hóa vai trò Admin.
- Video bài giảng là nội dung có sẵn; tài liệu học tập có thể được tạo hoặc hỗ trợ tạo bằng AI.
- Hệ thống chỉ theo dõi trạng thái phí nhận lớp và chính sách bảo lãnh, không xử lý thanh toán thực qua cổng thanh toán (áp dụng cho cả học phí phụ huynh-gia sư và phí nhận lớp gia sư-trung tâm).
- Admin có quyền cao nhất trong hệ thống: quản lý toàn bộ gia sư & học sinh, duyệt tài khoản, gán lớp, quản lý thư viện mẫu, xem báo cáo tài chính và giám sát nhật ký hoạt động.
- Giao diện chỉ hỗ trợ tiếng Việt và tiếng Anh.


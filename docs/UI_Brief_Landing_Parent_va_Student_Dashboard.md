# UI/UX Brief — Tutor-Parent Hub
### Tài liệu mô tả giao diện: (1) Landing Page cho Phụ huynh & (2) Giao diện Học sinh
Dùng làm đầu vào để yêu cầu thiết kế (Claude Design / Figma / dev frontend)

---

## 0. Bối cảnh chung (đọc trước khi thiết kế)

**Sản phẩm:** Tutor-Parent Hub — nền tảng kết nối gia sư kết hợp Learning Workspace quản lý toàn bộ quá trình học tập sau khi kết nối (không chỉ dừng ở "tìm được gia sư").

**Định vị thương hiệu:** Đáng tin cậy (verified tutor, KYC, thanh toán an toàn) + Minh bạch (phụ huynh luôn biết con đang học gì) + Hiện đại, gọn nhẹ (không rối, không màu mè trẻ con).

**Đối tượng của 2 giao diện trong brief này:**
- Landing Page: Phụ huynh **chưa có tài khoản / chưa đăng nhập**, mục tiêu là thuyết phục họ đăng ký & tìm gia sư.
- Student Dashboard: Học sinh **đã có tài khoản**, mục tiêu là dùng hằng ngày để xem lịch, tài liệu, bài tập, tiến độ.

**Tone & Style chung:**
- Màu chủ đạo gợi ý: xanh dương/indigo (tin cậy, giáo dục) làm primary, cam hoặc vàng làm accent cho CTA, nền sáng trắng/xám nhạt.
- Font: sans-serif hiện đại, dễ đọc (kiểu Inter/Be Vietnam Pro để hỗ trợ tiếng Việt có dấu tốt).
- Không dùng hình minh họa "trẻ con" quá mức — vì đối tượng chính (landing) là phụ huynh, cần cảm giác chuyên nghiệp như một dịch vụ giáo dục nghiêm túc, nhưng giao diện học sinh có thể thân thiện, nhiều màu hơn một chút.
- Responsive bắt buộc: thiết kế ưu tiên mobile-first vì phụ huynh và học sinh phần lớn thao tác trên điện thoại.

---

## 1. LANDING PAGE — DÀNH CHO PHỤ HUYNH

### 1.1 Mục tiêu của trang
- Giải thích trong 3 giây đầu: đây là nền tảng gì, giải quyết vấn đề gì.
- Nêu bật điểm khác biệt: không chỉ "tìm gia sư" mà còn "theo dõi con học gì mỗi ngày".
- Dẫn dắt phụ huynh đến hành động: Đăng ký / Tìm gia sư ngay / Đăng tin tuyển gia sư.
- Xây dựng niềm tin: gia sư đã xác minh (KYC), thanh toán an toàn (escrow), có đánh giá thật.

### 1.2 Cấu trúc trang (thứ tự section từ trên xuống)

**a) Header / Navigation (sticky)**
- Logo (trái).
- Menu: Tìm gia sư · Đăng tin tuyển gia sư · Cách hoạt động · Dành cho gia sư · Về chúng tôi.
- Bên phải: nút "Đăng nhập" (dạng text/outline) + nút "Đăng ký miễn phí" (CTA nổi bật).

**b) Hero Section**
- Headline lớn, tập trung vào lợi ích kép: tìm được gia sư phù hợp **và** biết con đang học gì.
  - Gợi ý: "Tìm gia sư phù hợp. Biết con học gì mỗi ngày."
- Sub-headline (1-2 câu): giải thích ngắn gọn Learning Workspace là gì.
- 2 CTA: nút chính "Tìm gia sư ngay" (primary), nút phụ "Xem cách hoạt động" (secondary/outline).
- Hình ảnh/illustration bên phải hoặc nền: hình ảnh phụ huynh xem báo cáo học tập trên điện thoại/tablet, hoặc mockup giao diện dashboard.
- Thanh chỉ số tin cậy nhỏ bên dưới hero (số gia sư đã xác minh, số buổi học đã hoàn thành, đánh giá trung bình) — dạng social proof ngắn gọn.

**c) Vấn đề (Pain Points Section)**
- Tiêu đề: kiểu "Tìm gia sư không khó — khó là biết con học được gì sau đó."
- 2 cột so sánh hoặc 3-4 card liệt kê nỗi đau của phụ huynh hiện tại:
  - Không biết hôm nay con học gì.
  - Không biết con có hoàn thành bài tập không.
  - Dữ liệu học tập nằm rải rác ở Zalo, Messenger, Google Drive...
  - Khó đánh giá tiến bộ sau nhiều tuần.
- Style: dùng icon đơn giản + câu ngắn, tránh chữ nhiều.

**d) Giải pháp / Cách hoạt động (How it works)**
- Trình bày quy trình 5 bước theo vòng lặp sản phẩm: **Kết nối → Dạy → Ghi nhận → Phân tích → Cải thiện**.
- Dạng timeline ngang (desktop) / dọc (mobile), mỗi bước có icon + tiêu đề ngắn + mô tả 1 câu.
- Có thể thêm 3 bước hành động cụ thể hơn cho phụ huynh: "1. Tìm & đặt gia sư → 2. Theo dõi buổi học & bài tập → 3. Nhận báo cáo tiến bộ hàng tuần."

**e) Tính năng nổi bật (Feature Highlights)**
- Layout dạng 3-4 khối lớn xen kẽ ảnh trái/phải, mỗi khối là một tính năng chính dành cho phụ huynh:
  1. **Tìm & xác minh gia sư** — lọc theo môn, lớp, giá, khu vực, xem hồ sơ KYC đã duyệt.
  2. **Learning Workspace / Parent Dashboard** — xem lịch sử buổi học, tài liệu, bài tập, điểm danh.
  3. **Weekly Learning Report** — báo cáo tuần tự động, có AI hỗ trợ tóm tắt dễ hiểu.
  4. **Thanh toán an toàn (Escrow)** — tiền chỉ được giải ngân cho gia sư sau khi buổi học hoàn tất và xác nhận.
- Mỗi khối nên có mockup ảnh chụp màn hình (screenshot) minh họa tính năng thật, không chỉ icon.

**f) Vì sao chọn chúng tôi (Trust & Differentiators)**
- Dạng grid 4-6 card ngắn, mỗi card 1 icon + tiêu đề + 1 dòng mô tả:
  - Gia sư đã xác minh danh tính (KYC)
  - Theo dõi tiến độ dựa trên dữ liệu thật, không phải một bài test
  - Thanh toán an toàn, có hoàn tiền/khiếu nại
  - AI hỗ trợ gia sư, không thay thế gia sư

**g) Đánh giá / Testimonial**
- Carousel hoặc grid 3 đánh giá từ phụ huynh mẫu: tên, ảnh đại diện (placeholder), số sao, trích dẫn ngắn.

**h) Dành cho gia sư (mini CTA phụ)**
- Section ngắn hướng đến gia sư muốn tham gia nền tảng: "Bạn là gia sư? Tham gia ngay" — vì đây cũng là 2 mặt của marketplace.

**i) FAQ**
- Accordion 5-6 câu hỏi thường gặp: Chi phí ra sao, gia sư có được xác minh không, thanh toán như thế nào, làm sao khiếu nại...

**j) CTA cuối trang**
- Banner full-width với nền màu nhấn: "Sẵn sàng tìm gia sư phù hợp cho con?" + nút "Đăng ký miễn phí".

**k) Footer**
- Logo, mô tả ngắn, các cột link (Sản phẩm, Công ty, Hỗ trợ, Pháp lý), social icon, thông tin liên hệ, copyright.

### 1.3 Trạng thái / lưu ý kỹ thuật cho thiết kế
- Cần thiết kế cả bản mobile (ưu tiên) và desktop.
- Header chuyển thành hamburger menu trên mobile.
- Hero trên mobile: ảnh xuống dưới hoặc làm nền mờ, text lên trước.
- Tốc độ tải nhẹ: ưu tiên ảnh/illustration dạng vector hoặc ảnh nén nhẹ.

---

## 2. GIAO DIỆN HỌC SINH (LEARNER DASHBOARD)

### 2.1 Mục tiêu của giao diện
- Học sinh có thể tự quản lý việc học của mình một cách đơn giản: xem lịch, tài liệu, bài tập, nộp bài, xem tiến độ.
- Giao diện cần đơn giản, ít thao tác, dễ dùng kể cả với học sinh nhỏ tuổi (ví dụ cấp 2, cấp 3).
- Ghi nhớ: ở phiên bản đầu, phụ huynh có thể quản lý thay học sinh — nên giao diện học sinh cần rõ ràng, không yêu cầu thao tác phức tạp.

### 2.2 Cấu trúc điều hướng chính
Gợi ý dùng **Sidebar bên trái (desktop) / Bottom navigation bar (mobile)** với các mục:
1. **Trang chủ** (Home/Overview)
2. **Lịch học** (Schedule)
3. **Tài liệu** (Documents)
4. **Bài tập** (Homework)
5. **Tiến độ học tập** (Progress)
6. *(tuỳ chọn)* **Trò chuyện** (Chat với gia sư)
7. **Hồ sơ cá nhân** (Profile) — thường ở góc trên phải, không nằm trong nav chính

### 2.3 Chi tiết từng màn hình

**a) Trang chủ / Overview**
- Lời chào cá nhân hoá: "Chào [Tên học sinh], hôm nay bạn có gì cần làm?"
- Card "Buổi học sắp tới": tên gia sư, môn, giờ, nút "Vào lớp online" (link Google Meet/Zoom) nếu buổi học là online.
- Card "Bài tập cần làm": danh sách bài tập chưa nộp, sắp đến hạn, có màu cảnh báo nếu gần deadline hoặc quá hạn.
- Card tóm tắt nhanh: số buổi đã học trong tuần, % bài tập hoàn thành, streak học tập (nếu muốn tạo động lực).
- Thông báo mới nhất (session mới, feedback mới từ gia sư).

**b) Lịch học**
- Dạng calendar (tuần/tháng) hoặc danh sách theo timeline.
- Mỗi buổi học hiển thị: môn học, tên gia sư, giờ, trạng thái (sắp diễn ra / đã học / đã huỷ).
- Nhấn vào 1 buổi học → xem chi tiết Session Log (nếu gia sư đã ghi nhận): nội dung đã học, bài tập giao, ghi chú của gia sư.

**c) Tài liệu (Documents)**
- Danh sách tài liệu được gia sư upload, có thể lọc/nhóm theo buổi học hoặc theo môn.
- Mỗi tài liệu: tên file, loại file (PDF/ảnh), ngày upload, nút xem/tải về.
- Có thể hiển thị dạng "theo từng buổi học" giống cấu trúc trong tài liệu dự án (Session 30/08 → các file đính kèm).

**d) Bài tập (Homework)**
- Danh sách bài tập, chia theo trạng thái (tab hoặc filter): **Đang chờ làm / Đã nộp / Đã có nhận xét / Quá hạn**.
- Mỗi bài tập card gồm: tên bài, môn, deadline, trạng thái, tài liệu đính kèm.
- Màn hình chi tiết bài tập: mô tả bài, tài liệu, khu vực nộp bài (upload ảnh/file bài làm), sau khi gia sư chấm → hiển thị feedback + kết quả.
- Trạng thái rõ ràng bằng màu: vàng (đang chờ), xanh (đã nộp/hoàn thành), đỏ (quá hạn), xám (đã có feedback).

**e) Tiến độ học tập (Progress)**
- Biểu đồ đơn giản, dễ hiểu với học sinh: số buổi học theo tuần/tháng, tỷ lệ hoàn thành bài tập, chủ đề đã học.
- Danh sách "Chủ đề cần củng cố" — lấy từ ghi chú/phân tích của gia sư, trình bày nhẹ nhàng, không gây áp lực (tránh ngôn ngữ tiêu cực).
- Có thể thêm phần "Nhận xét gần đây của gia sư" dạng timeline.

**f) Hồ sơ cá nhân (Profile)**
- Ảnh đại diện, tên, lớp/khối, môn đang học.
- Danh sách gia sư đang học cùng.
- Cài đặt thông báo cơ bản.

### 2.4 Trạng thái đặc biệt cần thiết kế
- **Empty state**: chưa có buổi học nào, chưa có bài tập nào — cần hình minh hoạ nhẹ nhàng + câu gợi ý thân thiện (ví dụ "Chưa có bài tập nào, tận hưởng thời gian rảnh nhé!").
- **Loading state** cho danh sách tài liệu/bài tập.
- **Thông báo (notification) dạng chuông** ở header, có badge số lượng chưa đọc.
- Vì học sinh dùng chủ yếu trên điện thoại: đảm bảo bottom navigation dễ bấm bằng ngón tay cái, các nút CTA (nộp bài, xem tài liệu) đủ lớn.

### 2.5 Gợi ý phong cách hình ảnh cho giao diện học sinh
- Có thể dùng tông màu tươi sáng hơn landing page một chút (thêm accent xanh lá/cam cho các trạng thái hoàn thành/tiến bộ) để tạo cảm giác tích cực, có động lực học tập — nhưng vẫn giữ cùng hệ màu thương hiệu.
- Dùng icon minh hoạ (không phải ảnh chụp) cho các card thống kê để nhẹ nhàng, dễ nhìn.
- Tránh thiết kế quá "trẻ con" nếu đối tượng bao gồm học sinh cấp 3 — nên trung tính, hiện đại.

---

## 3. Ghi chú khi đưa brief này cho Claude Design

Khi yêu cầu thiết kế, nên cung cấp thêm:
- Bạn muốn thiết kế ở dạng nào: wireframe (bố cục) hay high-fidelity mockup (có màu, font, ảnh thật)?
- Ưu tiên desktop, mobile, hay cả hai?
- Có bảng màu/logo có sẵn chưa, hay để Claude Design đề xuất?
- Muốn bắt đầu từ 1 trang cụ thể trước (ví dụ Hero + How it works của Landing Page) hay toàn bộ trang một lúc?

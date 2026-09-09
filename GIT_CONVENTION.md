# GIT CONVENTION — Quy ước làm việc Git & Branching Strategy

Tài liệu này định nghĩa quy ước quản lý mã nguồn Git cho dự án Ứng dụng AI hỗ trợ vận hành & giảng dạy gia sư tiếng Anh 1-1, đảm bảo 3 thành viên phối hợp an toàn và không gây xung đột code.

---

## 1. Quy định nhánh (Branching Strategy)

- **`main`**: Nhánh Production. Chỉ chứa code đã kiểm thử hoàn chỉnh, được duyệt qua Pull Request và pass CI/CD. **Tuyệt đối không commit trực tiếp lên `main`**.
- **`dev`**: Nhánh Tích hợp chính. Các tính năng mới được merge vào `dev` sau khi pass CI.
- **`feature/<tên-tính-năng>`**: Nhánh phát triển tính năng mới (ví dụ: `feature/tutor-curriculum`, `feature/auth-jwt`). Được rẽ nhánh từ `dev`.
- **`fix/<tên-lỗi>`**: Nhánh sửa lỗi (ví dụ: `fix/ai-response-timeout`).

---

## 2. Quy ước đặt tên Commit (Commit Message Format)

Mỗi commit message phải tuân theo cấu trúc:
`<type>: <mô tả ngắn bằng tiếng Việt hoặc tiếng Anh>`

### Các loại `<type>` quy định:
- `feat`: Tính năng mới (Feature).
- `fix`: Sửa lỗi (Bug fix).
- `infra`: Khởi tạo/Cấu hình hạ tầng, Docker, CI/CD.
- `docs`: Thêm hoặc sửa tài liệu.
- `refactor`: Tái cấu trúc code nhưng không thay đổi logic/chức năng.
- `test`: Thêm hoặc bổ sung Unit Test / Integration Test.
- `style`: Thay đổi format, css, linting không ảnh hưởng logic.

**Ví dụ hợp lệ:**
- `infra: khởi tạo docker-compose cho BE, FE, AI và DB`
- `feat: tích hợp API JWT login cho tutor portal`
- `fix: xử lý lỗi timeout khi gọi AI Service`

---

## 3. Quy trình Merge & Pull Request (PR Flow)

1. **Khởi tạo nhánh**:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/ten-tinh-nang
   ```
2. **Phát triển & Commit**:
   ```bash
   git add .
   git commit -m "feat: mô tả công việc"
   git push origin feature/ten-tinh-nang
   ```
3. **Tạo Pull Request (PR)**:
   - Tạo PR từ `feature/ten-tinh-nang` vào nhánh `dev`.
   - Gắn label và gán người review trong nhóm (tối thiểu 1 thành viên review và approve).
   - Kiểm tra pipeline **GitHub Actions CI** chạy màu xanh (Passed).
4. **Merge**:
   - Chọn **Squash and merge** hoặc **Rebase and merge** để giữ history sạch sẽ.
   - Xóa feature branch sau khi merge thành công.

---

## 4. Definition of Done (DoD) trước khi Merge
1. Code đã được test chạy ổn định ở môi trường local.
2. `docker compose up --build` chạy thành công không có lỗi crash.
3. GitHub Actions CI pass 100%.
4. Đã có ít nhất 1 thành viên review và đồng ý merge.

# Quy tắc Git & Làm việc với GitHub — Frontend

## 1. Branch Strategy

- `main` — nhánh chính, luôn ở trạng thái ổn định, có thể build thành công.
- Không commit trực tiếp lên `main`. Mọi thay đổi phải thông qua Pull Request (PR).

## 2. Branch naming

Đặt tên nhánh theo công thức: `<loại>/<mô-tả-ngắn>`

| Loại     | Ví dụ                                  |
| -------- | -------------------------------------- |
| `feat/`  | `feat/add-exercise-page`               |
| `fix/`   | `fix/header-whitespace`                |
| `refactor/` | `refactor/extract-student-sidebar` |
| `chore/` | `chore/update-deps`                    |

- Dùng dấu gạch ngang (`-`) để ngăn cách các từ.
- Chữ thường, không dấu, không khoảng trắng.

## 3. Commit message format

Mỗi commit phải theo cấu trúc:

```
<loại>: <mô tả ngắn (dưới 72 ký tự)>

<giải thích thêm nếu cần>
```

**Loại commit:**

| Loại       | Khi nào dùng                                      |
| ---------- | ------------------------------------------------- |
| `feat`     | Thêm tính năng mới                                |
| `fix`      | Sửa lỗi                                           |
| `refactor` | Tái cấu trúc code, không thay đổi hành vi         |
| `style`    | Chỉnh sửa CSS, UI, spacing (không ảnh hưởng logic)|
| `chore`    | Cập nhật dependencies, config, tooling             |
| `docs`     | Sửa tài liệu, README, convention                  |

**Ví dụ:**

```
feat: thêm trang thêm bài tập cho học sinh

- Form nhập tiêu đề, kỹ năng, độ khó
- Tự động gán sessionId nếu đang chọn buổi học
```

```
fix: giảm khoảng trắng header trong StudentPath

Đưa nút "Áp dụng lộ trình từ Kho" vào cùng hàng với
tiêu đề "Lộ trình học" để loại bỏ vùng trống bên trái.
```

## 4. Trước khi commit

- Kiểm tra file đã được format đúng chuẩn (dùng Prettier nếu có).
- Chạy `npm run build` để đảm bảo không có lỗi.
- Kiểm tra console browser không có cảnh báo / lỗi.

## 5. Quy trình làm việc

1. **Cập nhật nhánh `main` mới nhất:**

   ```bash
   git checkout main
   git pull origin main
   ```

2. **Tạo nhánh mới cho tính năng / sửa lỗi:**

   ```bash
   git checkout -b feat/add-exercise-page
   ```

3. **Commit thường xuyên, mỗi commit một thay đổi nhỏ.**

4. **Khi xong, đẩy nhánh lên GitHub:**

   ```bash
   git push -u origin feat/add-exercise-page
   ```

5. **Tạo Pull Request trên GitHub:**
   - Title mô tả rõ thay đổi.
   - Ghi rõ "Closes #<issue-number>" nếu có.

6. **Chờ review, fix feedback nếu có, rồi merge vào `main`.**

7. **Sau khi merge, xoá nhánh cũ (trên GitHub).**

## 6. Một số nguyên tắc khác

- **Không commit file build** (`dist/`, `node_modules/`).
- **Không commit file chứa biến môi trường / secret** (`.env`, `.env.local`).
- **Không sửa trực tiếp file trên GitHub web UI** (trừ README, docs).
- **Commit message bằng tiếng Việt** (có dấu hoặc không dấu đều được, miễn là rõ ràng).
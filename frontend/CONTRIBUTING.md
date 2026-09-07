# Contributing Guide

## Git Workflow

### Branching

```
main          ← branch chính, chỉ merge khi đã review xong
dev           ← branch tích hợp hàng ngày
feat/<ten>    ← branch cho tính năng mới
fix/<ten>     ← branch sửa lỗi
```

**Tạo branch mới:**
```bash
git checkout dev
git pull origin dev
git checkout -b feat/ten-tinh-nang
```

### Commit Message

Format: `<type>: <mô tả ngắn>`

| Type      | Dùng khi                       | Ví dụ                          |
|-----------|--------------------------------|--------------------------------|
| `feat`    | Thêm tính năng mới             | `feat: thêm trang đăng nhập`   |
| `fix`     | Sửa lỗi                       | `fix: sửa validate email`      |
| `refactor`| Cải thiện code, không đổi logic| `refactor: gộp API service`    |
| `docs`    | Chỉnh sửa tài liệu            | `docs: cập nhật README`        |
| `chore`   | Việc vặt (config, build, deps) | `chore: nâng cấp eslint`       |
| `test`    | Thêm/sửa test                 | `test: viết unit test cho auth`|
| `style`   | Format code, không đổi logic  | `style: format lại Button`     |

**Lưu ý:**
- Viết tiếng Việt, không viết tắt
- Mô tả rõ ràng, đọc vào hiểu ngay thay đổi gì

### PR (Pull Request)

1. Mỗi PR chỉ làm **một việc** (1 tính năng, 1 lỗi, 1 refactor...)
2. PR phải có:
   - **Title:** mô tả ngắn gọn
   - **Description:**
     - Mục đích thay đổi
     - Tóm tắt những gì đã làm
     - Cách test / reviewer có thể verify
3. Cần **ít nhất 1 người approve** trước khi merge
4. Sau khi merge, xóa branch đã merge

## Code Convention

### TypeScript

- **Bắt buộc dùng TypeScript.** Không dùng `any`.
- Khai báo kiểu rõ ràng cho function params và return value.
- Tách type ra file riêng `types/` nếu dùng chung nhiều chỗ.

```typescript
// ✅ Đúng
interface UserProps {
  id: string;
  name: string;
  email: string;
}

// ❌ Sai
const handleUser = (user: any) => { ... }
```

### Component

- Dùng **functional component + hooks**. Không dùng class component.
- Mỗi file chỉ export **một component chính**.
- Component dùng chung đặt trong `components/`.

```typescript
// ✅
export function Button({ label, onClick }: ButtonProps) { ... }

// ❌
export default function Button() { ... }
```

### Đặt tên

| Loại              | Quy tắc       | Ví dụ              |
|-------------------|---------------|--------------------|
| Component file    | PascalCase    | `UserProfile.tsx`  |
| Component function| PascalCase    | `UserProfile`      |
| Hook              | camelCase + `use` prefix | `useAuth.ts` |
| Type/Interface    | PascalCase    | `TUser`, `UserProps`|
| Variable/Function | camelCase     | `getUserById`      |
| File thường      | camelCase     | `formatDate.ts`    |
| CSS class         | kebab-case    | `user-profile`     |

### Import

- Dùng alias `@/` thay cho đường dẫn tương đối dài.

```typescript
// ✅
import { Button } from '@/components/Button';
import { useAuth } from '@/hooks/useAuth';

// ❌
import { Button } from '../../components/Button';
```

### Console & Debug

- **Không commit** `console.log`, `console.debug`, `debugger`.
- Nếu cần log khi dev: dùng logger riêng và disable trước khi commit.

## Cấu trúc thư mục

```
src/
├── components/     # Component UI dùng chung (Button, Modal, Card...)
├── pages/          # Page component (ứng với mỗi route)
├── features/       # Feature module (auth/, users/, posts/...)
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── types/
├── hooks/          # Custom hooks dùng chung
├── services/       # API calls / API service
├── store/          # Redux store
├── types/          # Global types
├── utils/          # Helper functions
├── App.tsx
└── main.tsx
```

**Nguyên tắc:**
- Code liên quan đến feature X → `features/X/`
- Code dùng chung toàn app → `components/`, `hooks/`, `utils/`

## API & Data Fetching

- Gọi API **chỉ qua service layer** (`services/` hoặc `features/*/services/`).
- Không gọi fetch trực tiếp trong component.
- Dùng React Query cho server state.
- Dùng Redux Toolkit cho global state (auth, user preferences...).

## UI & Styling

- Component UI dùng chung đặt trong `components/`.
- Responsive: test trên mobile (375px) trước khi commit.
- Icon: dùng thư viện đã chọn (Lucide, Heroicons...).

## Testing

- Viết test cho:
  - Utility functions
  - Custom hooks phức tạp
  - Component logic quan trọng
- Unit test: Vitest + React Testing Library
- Integration test với test database (không mock database).

## Checklist trước khi tạo PR

- [ ] Code chạy đúng, không lỗi TypeScript
- [ ] Không có `console.log` thừa
- [ ] Commit message đúng format
- [ ] Đã chạy lint & format (`npm run lint`, `npm run format`)
- [ ] Test tay các flow chính

## Khi bắt đầu ngày làm việc

```bash
# 1. Lấy code mới nhất
git checkout dev
git pull origin dev

# 2. Tạo branch cho task
git checkout -b feat/ten-task

# 3. Làm việc...

# 4. Commit & push
git add .
git commit -m "feat: mô tả"
git push origin feat/ten-task

# 5. Tạo PR trên GitHub/GitLab
```

## Khi nhận feedback trên PR

1. Đọc kỹ comment
2. Fix nếu hợp lý
3. Reply comment để confirm đã fix
4. Nếu không đồng ý — thảo luận, không im lặng

## Liên lạc

- Thảo luận về architecture / thay đổi lớn **trước khi làm**, trong Slack/Discord/Zalo.
- Khi stuck hơn 30 phút — hỏi team, không bí một mình.
- Update status trên board thường xuyên để team biết tiến độ.

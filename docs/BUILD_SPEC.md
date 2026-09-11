# EnglishPath — Build Spec (Antigravity Implementation Guide)

> Tài liệu này mô tả **chính xác** cách code lại 2 giao diện (Landing Page cho phụ huynh + Student Dashboard) trên nền **design system "Midnight Academic"**.
> Thực hiện **tuần tự theo từng TASK**. Không nhảy bước. Mỗi task có: mục tiêu, file cần tạo, chi tiết layout/nội dung, và **Definition of Done (DoD)**.

---

## 0. Tech stack & quy ước chung

| Hạng mục | Lựa chọn |
|---|---|
| Framework | React (App Router, RSC mặc định) |
| Ngôn ngữ | TypeScript |
| Styling | Tailwind CSS v4 (`@import "tailwindcss"`, `@theme inline` trong `globals.css`) |
| Theme | `next-themes` (light + dark, mặc định dark) |
| Icons | `lucide-react` (KHÔNG dùng emoji làm icon) |
| Font | `Inter` (sans) + `Geist Mono` (mono) qua `next/font/google` |
| Package manager | `pnpm` |

### Nguyên tắc bất di bất dịch (từ DESIGN.md)
- **Chỉ 3–5 màu tổng.** 1 brand (xanh dương) + 2–3 neutral + 1–2 accent (cyan cho highlight).
- **KHÔNG** dùng `text-white`/`bg-black`/`bg-white` trực tiếp — mọi màu qua design token.
- **KHÔNG** hero căn giữa. Hero phải **split / left-aligned**.
- **KHÔNG** màu tím "AI-generic", **KHÔNG** pure black `#000`.
- **KHÔNG** emoji làm icon. **KHÔNG** SVG vẽ tay phức tạp.
- Cyan `#00BFFF` chỉ cho **highlight** (live, progress bar, cột tuần hiện tại) — không dùng làm màu nền lớn.
- Tên người/dữ liệu là **tiếng Việt thật** (bé Minh Anh, cô Nguyễn Thu Hà...).
- Card bo góc `rounded-xl`. Line-height body `leading-relaxed`.
- Mobile-first, dùng flexbox là chính; grid chỉ cho layout 2D.
- Escape ký tự JSX (`&apos;`, `{'<'}`...).

---

## TASK 1 — Design System ("Midnight Academic")

**Mục tiêu:** thiết lập tokens, font, theme provider, nút chuyển theme. Đây là nền cho tất cả các task sau.

### 1.1 Files
```
app/globals.css                 # tokens light/dark + @theme inline
app/layout.tsx                  # font Inter + Geist Mono, ThemeProvider, <html className="bg-background">
components/theme-provider.tsx    # wrapper next-themes
components/theme-toggle.tsx      # nút Sun/Moon
```

### 1.2 Design tokens (đặt trong `globals.css`)

**Dark (mặc định) — nền navy:**
| Token | Giá trị | Ghi chú |
|---|---|---|
| `--background` | `#0B1220` (navy đậm) | nền chính, có thể phủ gradient nhẹ sang `#0F1A2E` |
| `--foreground` | `#E5EAF2` | chữ chính |
| `--card` | `#111C31` | nền card |
| `--card-foreground` | `#E5EAF2` | |
| `--muted` | `#1A2740` | nền phụ |
| `--muted-foreground` | `#93A1B8` | chữ phụ |
| `--border` | `#22304C` | viền |
| `--primary` | `#3B82F6` (Sky-500) | brand / CTA |
| `--primary-foreground` | `#F8FAFC` | chữ trên nút primary |
| `--accent` | `#00BFFF` (cyan) | **chỉ highlight** |
| `--ring` | `#3B82F6` | focus ring |
| `--radius` | `0.75rem` | = `rounded-xl` |

**Light — off-white:**
| Token | Giá trị |
|---|---|
| `--background` | `#F7F9FC` |
| `--foreground` | `#0B1220` |
| `--card` | `#FFFFFF` |
| `--muted` | `#EEF2F8` |
| `--muted-foreground` | `#5A6B85` |
| `--border` | `#DCE3EE` |
| `--primary` | `#3B82F6` |
| `--accent` | `#0EA5E9` (dịu hơn cyan) |

> Mapping token vào Tailwind qua `@theme inline` (ví dụ `--color-background: var(--background)`), rồi dùng class `bg-background`, `text-foreground`, `border-border`, `bg-primary`, `text-accent`...

### 1.3 Font (layout.tsx)
```ts
import { Inter } from 'next/font/google'
import { GeistMono } from 'geist/font/mono' // hoặc Geist_Mono từ next/font/google
```
- `--font-sans: Inter`, `--font-mono: Geist Mono`.
- Dùng class `font-sans` / `font-mono` trong code.
- `<html lang="vi" className="bg-background" suppressHydrationWarning>`.
- Metadata: title `EnglishPath — Học tiếng Anh 1 kèm 1`, description phù hợp SEO tiếng Việt.

### 1.4 ThemeProvider
- `next-themes`, `attribute="class"`, `defaultTheme="dark"`, `enableSystem`.
- `theme-toggle.tsx`: nút icon `Sun`/`Moon`, `aria-label` rõ ràng, tránh hydration mismatch (chỉ render sau mounted).

### ✅ DoD Task 1
- [ ] Chuyển light/dark hoạt động, không nhấp nháy sai màu.
- [ ] `<html>` có `bg-background`.
- [ ] Không còn màu hardcode; tất cả qua token.
- [ ] Font Inter/Geist Mono áp dụng đúng.

---

## TASK 2 — Landing Page cho Phụ huynh (`/`)

**Mục tiêu:** trang marketing thuyết phục phụ huynh, 11 khối theo thứ tự. Route: `app/page.tsx` import các section.

### 2.1 Files
```
app/page.tsx
components/landing/site-header.tsx
components/landing/hero.tsx
components/landing/pain-points.tsx
components/landing/how-it-works.tsx
components/landing/features.tsx
components/landing/trust.tsx
components/landing/testimonials.tsx
components/landing/tutor-cta.tsx
components/landing/faq.tsx
components/landing/final-cta.tsx
components/landing/site-footer.tsx
```

### 2.2 Thứ tự & đặc tả từng section

1. **SiteHeader** (sticky top)
   - Trái: logo chữ `EnglishPath` (dùng icon `GraduationCap` + wordmark).
   - Giữa (desktop): nav ẩn trên mobile — "Cách hoạt động", "Tính năng", "Học phí", "Câu hỏi".
   - Phải: `ThemeToggle` + nút text "Đăng nhập" + nút primary "Đăng ký học thử". Cả 2 nút → `/dashboard`.
   - Nền `bg-background/80 backdrop-blur border-b border-border`.

2. **Hero** (SPLIT, không căn giữa)
   - Cột trái (~55%): eyebrow nhỏ (badge cyan "Học 1 kèm 1 với gia sư Việt"), H1 lớn (`text-balance`), mô tả `leading-relaxed text-muted-foreground`, 2 CTA (primary "Tìm gia sư miễn phí" + ghost "Xem cách hoạt động"), hàng trust nhỏ (sao + "4.9/5 từ 2.000+ phụ huynh").
   - Cột phải: **mockup báo cáo học tập** dạng card (không dùng ảnh thật bắt buộc) — card `rounded-xl border`, hiển thị: tên bé, điểm tuần, 1 progress bar cyan, vài dòng chỉ số. Có thể thêm 1 card nổi nhỏ "Buổi học tiếp theo".
   - Nền: navy gradient nhẹ, tuyệt đối không glowing orb trang trí.

3. **PainPoints** — 3–4 card nỗi đau của phụ huynh
   - Ví dụ: "Không biết con học tới đâu", "Gia sư không cam kết chất lượng", "Con mất gốc, sợ nói tiếng Anh", "Học phí đóng trước, rủi ro cao".
   - Mỗi card: icon lucide (`Eye`, `ShieldQuestion`, `MessageCircleOff`, `Wallet`), tiêu đề, mô tả ngắn.

4. **HowItWorks** — 5 bước, layout ngang/stagger
   - Bước: 1) Chọn mục tiêu & trình độ → 2) Ghép gia sư phù hợp → 3) Học thử miễn phí → 4) Học 1 kèm 1 trên Workspace → 5) Nhận báo cáo AI hàng tuần.
   - Mỗi bước có số thứ tự (đây LÀ sequence thật nên được phép đánh số), icon, tiêu đề, mô tả.

5. **Features** — 4 tính năng lõi (grid 2x2 desktop)
   - "Tìm & ghép gia sư" (`Search`), "Lớp học Workspace trực tuyến" (`MonitorPlay`), "Báo cáo tiến độ bằng AI" (`Sparkles` — nhưng KHÔNG tím), "Thanh toán ký quỹ an toàn" (`ShieldCheck`).
   - Mỗi feature: icon trong ô `bg-muted rounded-lg`, tiêu đề, mô tả, có thể 2–3 bullet.

6. **Trust** — dải số liệu tin cậy
   - 4 chỉ số: "2.000+ phụ huynh", "500+ gia sư đã xác minh", "4.9/5 đánh giá", "98% gia hạn khóa học".
   - **KHÔNG** để stat trang trí vô nghĩa — các số này là load-bearing (bằng chứng tin cậy).

7. **Testimonials** — 2–3 lời chứng thực phụ huynh
   - Card: quote, avatar (ảnh generate hoặc chữ cái), tên "Chị Nguyễn Lan Anh — phụ huynh bé Minh Anh", sao.

8. **TutorCTA** — khối kêu gọi gia sư đăng ký dạy
   - Nền tương phản (`bg-muted` hoặc dải primary nhạt), tiêu đề "Bạn là giáo viên tiếng Anh?", CTA "Trở thành gia sư".

9. **FAQ** — accordion 5–6 câu
   - Học phí, cam kết chất lượng, đổi gia sư, học thử, ký quỹ, lịch học linh hoạt.
   - Dùng accordion (shadcn `accordion` hoặc `<details>` có style). Escape ký tự đúng.

10. **FinalCTA** — dải CTA cuối màn
    - Tiêu đề mạnh + 1 nút primary lớn "Bắt đầu học thử miễn phí" → `/dashboard`.

11. **SiteFooter**
    - 4 cột: Giới thiệu / Sản phẩm / Hỗ trợ / Liên hệ. Social icons hợp lệ trong lucide (`Instagram`, `Twitter`, `Linkedin` — **không** dùng `Facebook`/`Youtube` vì đã bỏ khỏi lucide). Copyright tiếng Việt.

### ✅ DoD Task 2
- [ ] Đủ 11 section đúng thứ tự.
- [ ] Hero là split, không căn giữa.
- [ ] Mọi CTA đăng ký/đăng nhập/tìm gia sư → `/dashboard`.
- [ ] Responsive: mobile xếp chồng gọn, nav thu gọn.
- [ ] Light & dark đều đúng token, đủ tương phản chữ/nền.
- [ ] Không lỗi build, không import icon không tồn tại.

---

## TASK 3 — Student Dashboard (`/dashboard`)

**Mục tiêu:** app học tập cho học sinh với **sidebar (desktop) + bottom-nav (mobile)**, 6 mục điều hướng bằng **client state** (không đổi route).

### 3.1 Files
```
lib/dashboard-data.ts                          # mock data tiếng Việt
app/dashboard/page.tsx                         # render <DashboardShell />
components/dashboard/dashboard-shell.tsx       # 'use client', state activeView + layout
components/dashboard/views/home-view.tsx
components/dashboard/views/schedule-view.tsx
components/dashboard/views/materials-view.tsx
components/dashboard/views/assignments-view.tsx
components/dashboard/views/progress-view.tsx
components/dashboard/views/profile-view.tsx
```

### 3.2 Điều hướng (6 mục)
| id | Nhãn | Icon lucide |
|---|---|---|
| `home` | Trang chủ | `Home` |
| `schedule` | Lịch học | `CalendarDays` |
| `materials` | Tài liệu | `FolderOpen` |
| `assignments` | Bài tập | `ClipboardList` |
| `progress` | Tiến độ | `TrendingUp` |
| `profile` | Hồ sơ | `User` |

- **Desktop (`lg+`)**: sidebar trái cố định `w-64`, logo trên cùng, list item active có nền `bg-primary/10 text-primary`, dưới cùng có ThemeToggle + avatar học sinh.
- **Mobile**: bottom-nav cố định `fixed bottom-0`, 6 icon + nhãn nhỏ, item active màu primary. Content có `pb-20` để không bị che.
- `DashboardShell` giữ `const [view, setView] = useState('home')` và switch render view tương ứng. Có header nội dung hiển thị tên view + lời chào "Chào Minh Anh".

### 3.3 Mock data (`lib/dashboard-data.ts`)
Export các object/array tiếng Việt, ví dụ cấu trúc:
```ts
export const student = { name: 'Nguyễn Minh Anh', grade: 'Lớp 6', level: 'Pre-Intermediate', tutor: 'Cô Nguyễn Thu Hà', streak: 12 }

export const stats = [
  { label: 'Buổi đã học', value: 24, icon: 'BookOpen' },
  { label: 'Giờ học', value: 36, icon: 'Clock' },
  { label: 'Chuỗi ngày', value: 12, icon: 'Flame' },
  { label: 'Điểm trung bình', value: '8.6', icon: 'Star' },
]

export const upcomingLessons = [ /* {id, subject, tutor, date, time, status} */ ]
export const assignments = [ /* {id, title, subject, due, status: 'todo'|'done'|'late'} */ ]
export const materials = [ /* {id, title, type: 'pdf'|'video'|'audio', size, lesson} */ ]
export const weeklyReport = { summary, strengths: [], improvements: [] }
export const weeklyScores = [ /* {week: 'T1', score} — cột tuần hiện tại tô accent cyan */ ]
export const skills = [ /* {name: 'Nghe'|'Nói'|'Đọc'|'Viết', score 0-100} */ ]
```

### 3.4 Đặc tả từng view

- **HomeView**
  - Hàng **stat cards** (4 card: buổi đã học, giờ học, chuỗi ngày, điểm TB) — mỗi card icon + số lớn `font-mono` + nhãn muted.
  - **Buổi học tiếp theo**: card nổi bật với gia sư, thời gian, nút "Vào lớp" (primary), badge trạng thái.
  - **Bài tập cần làm**: list 3 item gần hạn, badge trạng thái màu (todo/xong/trễ).
  - **Báo cáo tuần**: tóm tắt ngắn + link "Xem chi tiết" chuyển sang view `progress`.

- **ScheduleView**
  - Danh sách buổi học theo ngày (nhóm theo thứ), mỗi item: môn/chủ đề, gia sư, giờ, trạng thái (`Sắp tới`/`Hoàn thành`/`Đã hủy`), nút vào lớp nếu sắp tới.
  - Có thể thêm bộ lọc tuần đơn giản (tab tuần này / tuần sau).

- **MaterialsView**
  - Grid card tài liệu: icon theo loại (`FileText` pdf, `Video`, `Headphones` audio), tên, buổi liên quan, dung lượng, nút "Tải xuống"/"Mở".

- **AssignmentsView**
  - Tabs trạng thái: Tất cả / Cần làm / Đã nộp / Trễ hạn.
  - List bài tập: tiêu đề, môn, hạn nộp, badge trạng thái, nút "Làm bài"/"Xem lại".

- **ProgressView** (khối quan trọng nhất)
  - **Biểu đồ cột theo tuần** (`weeklyScores`) — cột **tuần hiện tại tô màu accent cyan**, các tuần khác dùng primary/muted. Có thể dựng bằng div-bar hoặc `recharts`.
  - **4 kỹ năng** (Nghe/Nói/Đọc/Viết): mỗi kỹ năng 1 progress bar + %.
  - **Nhận xét AI**: card `border-accent/30`, icon `Sparkles`, gồm tóm tắt, điểm mạnh (list check xanh), cần cải thiện (list). Văn phong khích lệ, tiếng Việt.

- **ProfileView**
  - Thông tin học sinh (avatar, tên, lớp, trình độ, gia sư phụ trách), mục tiêu học tập, và vài toggle cài đặt (thông báo, ngôn ngữ) — chỉ UI, không cần lưu.

### ✅ DoD Task 3
- [ ] Sidebar desktop + bottom-nav mobile, item active đúng màu primary.
- [ ] Chuyển 6 view mượt bằng state, content mobile không bị bottom-nav che.
- [ ] ProgressView: cột tuần hiện tại nổi bật bằng cyan; 4 kỹ năng có progress bar; có card nhận xét AI.
- [ ] Toàn bộ dữ liệu tiếng Việt từ `lib/dashboard-data.ts`, không hardcode rải rác.
- [ ] Light & dark đều đạt tương phản.

---

## TASK 4 — Kiểm thử & hoàn thiện

1. **Build sạch:** `pnpm build` không lỗi TypeScript/ESLint (đặc biệt import icon lucide phải tồn tại — tránh `Facebook`, `Youtube`).
2. **Kiểm tra trực quan** (desktop 1600px + mobile 390px, cả light & dark):
   - Landing: hero split, các section đủ, footer ổn.
   - Dashboard: sidebar/bottom-nav, 6 view, biểu đồ tiến độ.
3. **A11y:** `alt` cho ảnh, `aria-label` cho nút icon, heading `main`/`header` hợp lý, `sr-only` khi cần.
4. **Liên kết:** CTA landing → `/dashboard` hoạt động.

### ✅ DoD Task 4
- [ ] Không lỗi build.
- [ ] 4 ảnh chụp (landing desktop/mobile, dashboard desktop/mobile) đúng thiết kế.
- [ ] Chuyển theme không vỡ layout.

---

## Phụ lục A — Bảng màu nhanh (copy nhanh)

```
Brand/CTA   #3B82F6   (primary, dùng cho nút, link, item active)
Highlight   #00BFFF   (accent — chỉ live/progress/cột tuần hiện tại)
Dark bg     #0B1220 → #0F1A2E (gradient nhẹ)
Dark card   #111C31
Dark border #22304C
Dark text   #E5EAF2 / muted #93A1B8
Light bg    #F7F9FC
Light card  #FFFFFF
Light text  #0B1220 / muted #5A6B85
```

## Phụ lục B — Danh sách icon lucide dùng (đều còn tồn tại)
`GraduationCap, Home, CalendarDays, FolderOpen, ClipboardList, TrendingUp, User, BookOpen, Clock, Flame, Star, Search, MonitorPlay, Sparkles, ShieldCheck, Eye, Wallet, MessageCircleOff, FileText, Video, Headphones, Sun, Moon, Instagram, Twitter, Linkedin`

> ⚠️ KHÔNG dùng `Facebook`, `Youtube` (đã bị gỡ khỏi lucide-react).

## Phụ lục C — Thứ tự thực thi bắt buộc
`TASK 1 (design system)` → `TASK 2 (landing)` → `TASK 3 (dashboard)` → `TASK 4 (QA)`.
Không bắt đầu task sau khi task trước chưa đạt hết DoD.

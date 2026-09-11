import { User, BookOpen, Bell, Shield, Globe, Award } from "lucide-react";
import { student } from "../../../lib/dashboard-data";

export function ProfileView() {
  return (
    <div className="space-y-8 max-w-4xl">
      {/* Title */}
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Hồ sơ cá nhân</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Thông tin học sinh, cài đặt tài khoản và mục tiêu học tập.
        </p>
      </div>

      {/* Main Student Card */}
      <div className="p-6 rounded-2xl border border-border bg-card flex flex-col sm:flex-row items-center gap-6 shadow-sm">
        <div className="w-20 h-20 rounded-full bg-primary/20 text-primary border-2 border-primary/40 flex items-center justify-center font-extrabold text-2xl shrink-0">
          MA
        </div>
        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 inline-block self-center sm:self-auto">
              {student.grade}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">Trình độ hiện tại: <strong className="text-foreground">{student.level}</strong></p>
          <p className="text-xs text-muted-foreground">Gia sư phụ trách: <strong className="text-foreground">{student.tutor}</strong></p>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Goals */}
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <div className="flex items-center gap-2 font-bold text-foreground text-base">
            <Award className="w-5 h-5 text-amber-400" />
            <h3>Mục tiêu học tập 2026</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>Đạt trình độ Intermediate (B2) trước tháng 12/2026.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>Duy trì chuỗi học tập tối thiểu 3 buổi/tuần.</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Tăng điểm phản xạ nói lên 8.5/10.</span>
            </li>
          </ul>
        </div>

        {/* Toggles */}
        <div className="p-6 rounded-xl border border-border bg-card space-y-4">
          <div className="flex items-center gap-2 font-bold text-foreground text-base">
            <Bell className="w-5 h-5 text-primary" />
            <h3>Cài đặt thông báo</h3>
          </div>
          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-foreground">Nhắc nhở lịch học trước 30 phút</span>
              <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-foreground">Nhận báo cáo tiến độ tuần qua Email</span>
              <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-foreground">Thông báo bài tập mới từ gia sư</span>
              <input type="checkbox" defaultChecked className="accent-primary w-4 h-4" />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfileView;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, User, ArrowLeft, BookOpenCheck, Users, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { students } from "../data/mockData";
import Card from "../components/ui/Card";
import Avatar from "../components/ui/Avatar";

const roles = [
  {
    key: "tutor",
    title: "Gia sư",
    desc: "Quản lý học sinh, lộ trình học, sinh bài tập AI, chấm bài",
    icon: GraduationCap,
  },
  {
    key: "student",
    title: "Học sinh",
    desc: "Xem lịch học, làm bài tập, theo dõi tiến bộ của bản thân",
    icon: User,
  },
];

export default function LoginPage() {
  const [picking, setPicking] = useState(false);
  const { loginAsTutor, loginAsStudent } = useAuth();
  const navigate = useNavigate();

  function handleRoleClick(key) {
    if (key === "tutor") {
      loginAsTutor();
      navigate("/tutor");
      return;
    }
    setPicking(true);
  }

  function handlePickStudent(studentId) {
    loginAsStudent(studentId);
    navigate("/student");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full accent-bg text-white speedtest-btn">
            <BookOpenCheck size={26} strokeWidth={1.75} />
          </div>
          <h1 className="text-3xl font-bold text-white glow-text">EnglishPath</h1>
          <p className="mt-2 text-sm text-slate-400">
            Nền tảng hỗ trợ gia sư tiếng Anh &mdash; lộ trình học, bài tập AI, đánh giá & kết nối phụ huynh
          </p>
        </div>

        {!picking ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((r) => (
                <button key={r.key} onClick={() => handleRoleClick(r.key)} className="text-left">
                  <Card className="h-full transition hover:shadow-md glow-box-hover">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 accent-text">
                      <r.icon size={20} strokeWidth={1.75} />
                    </div>
                    <p className="font-medium text-white">{r.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-400">{r.desc}</p>
                  </Card>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/5 p-3 text-xs text-slate-400">
              <Users size={15} className="mt-0.5 shrink-0" />
              <p>
                Phụ huynh không có tài khoản riêng — theo dõi tình hình học tập của con qua chính tài khoản Học sinh,
                hoặc hỏi đáp trực tiếp với gia sư qua Telegram bot.
              </p>
            </div>
          </>
        ) : (
          <Card>
            <button
              onClick={() => setPicking(false)}
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
            >
              <ArrowLeft size={16} /> Quay lại
            </button>
            <p className="mb-4 text-sm font-medium text-slate-300">Chọn tài khoản học sinh (demo)</p>
            <div className="space-y-2">
              {students.map((s) => (
                <button key={s.id} onClick={() => handlePickStudent(s.id)} className="w-full text-left">
                  <div className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10">
                    <Avatar initials={s.initials} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-white">{s.name}</p>
                      <p className="truncate text-xs text-slate-400">
                        Trình độ {s.level} &middot; {s.goal}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        <p className="mt-6 text-center text-xs text-slate-500">
          Đây là bản prototype — đăng nhập chỉ mang tính minh họa, không cần mật khẩu.
        </p>
      </div>
    </div>
  );
}
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GraduationCap, User, ArrowLeft, BookOpenCheck, Users } from "lucide-react";
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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 dark:bg-slate-950">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl accent-bg text-white">
            <BookOpenCheck size={24} strokeWidth={1.75} />
          </div>
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">EnglishPath</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Nền tảng hỗ trợ gia sư tiếng Anh &mdash; lộ trình học, bài tập AI, đánh giá &amp; kết nối phụ huynh
          </p>
        </div>

        {!picking ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              {roles.map((r) => (
                <button key={r.key} onClick={() => handleRoleClick(r.key)} className="text-left">
                  <Card className="h-full transition hover:shadow-md">
                    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg accent-bg-light accent-text dark:accent-bg-dark dark:accent-text-dark">
                      <r.icon size={20} strokeWidth={1.75} />
                    </div>
                    <p className="font-medium text-slate-900 dark:text-slate-50">{r.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">{r.desc}</p>
                  </Card>
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
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
              className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              <ArrowLeft size={16} /> Quay lại
            </button>
            <p className="mb-4 text-sm font-medium text-slate-700 dark:text-slate-300">Chọn tài khoản học sinh (demo)</p>
            <div className="space-y-2">
              {students.map((s) => (
                <button key={s.id} onClick={() => handlePickStudent(s.id)} className="w-full text-left">
                  <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-3 transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50">
                    <Avatar initials={s.initials} />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{s.name}</p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                        Trình độ {s.level} &middot; {s.goal}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
        )}

        <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-600">
          Đây là bản prototype — đăng nhập chỉ mang tính minh họa, không cần mật khẩu.
        </p>
      </div>
    </div>
  );
}

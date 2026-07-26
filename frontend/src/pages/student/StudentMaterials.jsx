import { PlayCircle, FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";

export default function StudentMaterials() {
  const { session } = useAuth();
  const student = getStudentById(session.studentId);

  function sessionLabel(sessionId) {
    const item = student.learningPath.find((it) => it.id === sessionId);
    return item ? `Buổi ${item.session}: ${item.topic}` : null;
  }

  return (
    <div>
      <PageHeader title="Tài liệu & video" description="Video bài giảng và tài liệu học tập được gia sư gán cho bạn." />

      <div className="grid gap-4 sm:grid-cols-2">
        {student.materials.map((m) => (
          <Card key={m.id} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
              {m.type === "video" ? <PlayCircle size={20} /> : <FileText size={20} />}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{m.title}</p>
              <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                {m.topic} &middot; {m.date} {m.duration && `· ${m.duration}`}
              </p>
              {sessionLabel(m.sessionId) && (
                <p className="mt-1 text-xs text-blue-600 dark:text-blue-400">{sessionLabel(m.sessionId)}</p>
              )}
            </div>
          </Card>
        ))}
        {student.materials.length === 0 && (
          <p className="col-span-full py-10 text-center text-sm text-slate-400">Chưa có tài liệu nào được gán.</p>
        )}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const statusMap = {
  assigned: { label: "Chưa làm", tone: "amber" },
  submitted: { label: "Chờ chấm", tone: "neutral" },
  graded: { label: "Đã chấm", tone: "emerald" },
};

export default function StudentExercises() {
  const { session } = useAuth();
  const student = getStudentById(session.studentId);

  function sessionLabel(sessionId) {
    const item = student.learningPath.find((it) => it.id === sessionId);
    return item ? `Buổi ${item.session}: ${item.topic}` : null;
  }

  return (
    <div>
      <PageHeader title="Bài tập & kiểm tra" description="Danh sách bài tập được gia sư giao cho bạn." />

      <Card padded={false}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {student.exercises.map((ex) => (
            <Link
              key={ex.id}
              to={`/student/exercises/${ex.id}`}
              className="flex flex-wrap items-center justify-between gap-3 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{ex.title}</p>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {ex.skill} &middot; {ex.difficulty} &middot; {ex.type} &middot; Giao ngày {ex.assignedDate}
                </p>
                {sessionLabel(ex.sessionId) && (
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400">
                    <FileText size={11} /> {sessionLabel(ex.sessionId)}
                  </p>
                )}
              </div>
              <div className="flex shrink-0 items-center gap-3">
                {ex.status === "graded" && (
                  <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                    {ex.score}/{ex.maxScore}
                  </span>
                )}
                <Badge tone={statusMap[ex.status].tone}>{statusMap[ex.status].label}</Badge>
              </div>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}

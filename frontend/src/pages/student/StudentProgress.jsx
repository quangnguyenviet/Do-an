import { AlertTriangle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import ProgressChart from "../../components/charts/ProgressChart";

export default function StudentProgress() {
  const { session } = useAuth();
  const student = getStudentById(session.studentId);
  const graded = student.exercises.filter((e) => e.status === "graded");

  return (
    <div>
      <PageHeader title="Kết quả & tiến bộ" description="Theo dõi sự tiến bộ của bạn qua từng kỹ năng theo thời gian." />

      <Card className="mb-6">
        <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Điểm trung bình theo kỹ năng (thang 10)</h3>
        <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Tổng hợp từ kết quả bài tập & bài kiểm tra.</p>
        <ProgressChart data={student.progressHistory} />
      </Card>

      {student.weakSkill && (
        <Card className="mb-6 flex items-center gap-3 border-amber-200 bg-amber-50/60 dark:border-amber-900 dark:bg-amber-950/30">
          <AlertTriangle size={18} className="shrink-0 text-amber-600 dark:text-amber-400" />
          <p className="text-sm text-amber-800 dark:text-amber-300">
            Bạn đang yếu nhất ở kỹ năng <strong>{student.weakSkill}</strong>. Gia sư gợi ý dành thêm thời gian luyện tập kỹ năng này.
          </p>
        </Card>
      )}

      <Card padded={false}>
        <div className="border-b border-slate-200 p-5 dark:border-slate-800">
          <h3 className="font-medium text-slate-900 dark:text-slate-50">Lịch sử điểm bài tập đã chấm</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {graded.map((ex) => (
            <div key={ex.id} className="flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{ex.title}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{ex.skill} &middot; {ex.submittedAt}</p>
              </div>
              <span className="shrink-0 text-sm font-semibold text-slate-900 dark:text-slate-50">
                {ex.score}/{ex.maxScore}
              </span>
            </div>
          ))}
          {graded.length === 0 && <p className="p-6 text-center text-sm text-slate-400">Chưa có bài nào được chấm.</p>}
        </div>
      </Card>
    </div>
  );
}

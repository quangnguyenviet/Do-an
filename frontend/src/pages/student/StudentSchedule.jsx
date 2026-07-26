import { CheckCircle2, PlayCircle, Circle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

export default function StudentSchedule() {
  const { session } = useAuth();
  const student = getStudentById(session.studentId);

  return (
    <div>
      <PageHeader title="Lịch học" description={`Lịch cố định: ${student.schedule}`} />

      <Card padded={false}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {student.learningPath.map((item) => (
            <div key={item.id} className="flex items-start gap-3 p-4">
              {item.status === "done" ? (
                <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />
              ) : item.status === "in_progress" ? (
                <PlayCircle size={20} className="mt-0.5 shrink-0 text-amber-500" />
              ) : (
                <Circle size={20} className="mt-0.5 shrink-0 text-slate-300 dark:text-slate-700" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                    Buổi {item.session}: {item.topic}
                  </p>
                  <span className="text-xs text-slate-400">{item.date}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-400">{item.phase}</p>
                <div className="mt-1.5 flex flex-wrap gap-1">
                  {item.skills.map((sk) => (
                    <Badge key={sk} tone="blue">
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

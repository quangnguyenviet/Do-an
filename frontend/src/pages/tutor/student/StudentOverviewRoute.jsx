import { useOutletContext } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import ProgressBar from "../../../components/ui/ProgressBar";
import { findFocusSession } from "./studentHelpers";

export default function StudentOverviewRoute() {
  const { student, pathItems } = useOutletContext();
  const focusSession = findFocusSession(pathItems);

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <Card>
        <p className="text-xs font-medium text-slate-400">Tiến độ tổng</p>
        <div className="mt-2.5 flex items-center gap-3">
          <ProgressBar value={student.overallProgress} className="flex-1" />
          <span className="shrink-0 text-sm font-semibold tabular-nums text-slate-900 dark:text-slate-50">
            {student.overallProgress}%
          </span>
        </div>
      </Card>
      <Card>
        <p className="text-xs font-medium text-slate-400">Kỹ năng cần chú ý</p>
        <div className="mt-2.5 flex items-center gap-1.5">
          <AlertTriangle size={14} className="shrink-0 text-amber-500" />
          <Badge skill={student.weakSkill}>{student.weakSkill}</Badge>
        </div>
      </Card>
      <Card>
        <p className="text-xs font-medium text-slate-400">Buổi học tiếp theo</p>
        {focusSession ? (
          <div className="mt-1.5">
            <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
              Buổi {focusSession.session}: {focusSession.topic}
            </p>
            <p className="mt-0.5 text-xs text-slate-400">{focusSession.date}</p>
          </div>
        ) : (
          <p className="mt-1.5 text-sm text-slate-400">Chưa có buổi nào sắp tới</p>
        )}
      </Card>
    </div>
  );
}
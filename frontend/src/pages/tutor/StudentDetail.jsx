import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";
import { getStudentById } from "../../data/mockData";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import ProgressBar from "../../components/ui/ProgressBar";
import { findFocusSession } from "./student/studentHelpers";

export default function StudentDetail() {
  const { studentId } = useParams();
  const student = getStudentById(studentId);

  // Shared state lifted up so all child routes can access it via Outlet context
  const [pathItems, setPathItems] = useState(() => student?.learningPath ?? []);
  const [exercisesList, setExercisesList] = useState(() => student?.exercises ?? []);
  const [materialsList, setMaterialsList] = useState(() => student?.materials ?? []);

  useEffect(() => {
    setPathItems(student?.learningPath ?? []);
    setExercisesList(student?.exercises ?? []);
    setMaterialsList(student?.materials ?? []);
  }, [studentId]);

  if (!student) {
    return (
      <p className="text-sm text-slate-500">Không tìm thấy học sinh.</p>
    );
  }

  const focusSession = findFocusSession(pathItems);

  return (
    <div>
      {/* Summary cards */}
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
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

      {/* Child route content */}
      <div>
        <Outlet context={{ student, pathItems, setPathItems, exercisesList, setExercisesList, materialsList, setMaterialsList }} />
      </div>
    </div>
  );
}

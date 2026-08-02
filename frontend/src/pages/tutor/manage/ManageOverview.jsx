import { Link, useOutletContext } from "react-router-dom";
import { AlertTriangle, ArrowRight, ClipboardCheck, Send } from "lucide-react";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import ProgressChart from "../../../components/charts/ProgressChart";
import CompetencyRadar from "../../../components/charts/CompetencyRadar";
import { findFocusSession } from "./manageHelpers";

export default function ManageOverview() {
  const { student, pathItems, exercisesList } = useOutletContext();
  const focusSession = findFocusSession(pathItems);
  const pendingGrading = exercisesList.filter((ex) => ex.status === "submitted").length;
  const telegramHandle = student.parentTelegram?.replace(/^@/, "");

  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-xs font-medium text-slate-400">Bài tập chờ chấm</p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <ClipboardCheck size={16} className={pendingGrading > 0 ? "shrink-0 text-amber-500" : "shrink-0 text-slate-300 dark:text-slate-700"} />
              <span className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-50">{pendingGrading}</span>
            </div>
            {pendingGrading > 0 && (
              <Link
                to={`/tutor/students/${student.id}/exercises`}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium accent-text hover:underline dark:accent-text-dark"
              >
                Chấm bài <ArrowRight size={12} />
              </Link>
            )}
          </div>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-400">Kỹ năng cần chú ý</p>
          <div className="mt-2.5 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <AlertTriangle size={14} className="shrink-0 text-amber-500" />
              <Badge skill={student.weakSkill}>{student.weakSkill}</Badge>
            </div>
            <Link
              to={`/tutor/students/${student.id}/exercises/add?skill=${encodeURIComponent(student.weakSkill)}`}
              className="inline-flex shrink-0 items-center gap-1 text-xs font-medium accent-text hover:underline dark:accent-text-dark"
            >
              Giao bài tập <ArrowRight size={12} />
            </Link>
          </div>
        </Card>
        <Card>
          <p className="text-xs font-medium text-slate-400">Buổi học tiếp theo</p>
          {focusSession ? (
            <div className="mt-1.5 flex items-end justify-between gap-2">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">
                  Buổi {focusSession.session}: {focusSession.topic}
                </p>
                <p className="mt-0.5 text-xs text-slate-400">{focusSession.date}</p>
              </div>
              <Link
                to={`/tutor/students/${student.id}/path`}
                className="inline-flex shrink-0 items-center gap-1 text-xs font-medium accent-text hover:underline dark:accent-text-dark"
              >
                Chi tiết <ArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <p className="mt-1.5 text-sm text-slate-400">Chưa có buổi nào sắp tới</p>
          )}
        </Card>
      </div>

      {student.parentName && (
        <Card className="flex flex-wrap items-center justify-between gap-3 !py-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Phụ huynh: <span className="font-medium text-slate-700 dark:text-slate-200">{student.parentName}</span>
          </p>
          {telegramHandle && (
            <a
              href={`https://t.me/${telegramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:accent-border hover:accent-text dark:border-slate-700 dark:text-slate-300 dark:hover:accent-text-dark"
            >
              <Send size={13} /> Nhắn Telegram
            </a>
          )}
        </Card>
      )}

      <div className="grid gap-3 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Điểm trung bình theo kỹ năng (thang 10)</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Tổng hợp từ kết quả bài tập & bài kiểm tra theo thời gian. Kỹ năng{" "}
            <span className="font-medium text-slate-600 dark:text-slate-300">{student.weakSkill}</span> đang được làm nổi bật — di chuột vào chú thích để xem kỹ năng khác.
          </p>
          <ProgressChart data={student.progressHistory} highlightSkill={student.weakSkill} />
        </Card>

        <Card>
          <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Hồ sơ năng lực hiện tại</h3>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Điểm từng kỹ năng ở tuần gần nhất — hình càng lệch, kỹ năng càng mất cân đối.
            {student.progressHistory.length > 1 && " Viền đứt mờ là điểm ở tuần đầu tiên, để so sánh mức tiến bộ."}
          </p>
          <CompetencyRadar
            scores={student.progressHistory[student.progressHistory.length - 1] ?? {}}
            baselineScores={student.progressHistory.length > 1 ? student.progressHistory[0] : undefined}
            height={240}
          />
        </Card>
      </div>
    </div>
  );
}
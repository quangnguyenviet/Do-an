import { useState } from "react";
import {
  BookOpen,
  Calendar,
  MapPin,
  Target,
  AlertTriangle,
  Check,
  X,
  PlayCircle,
  GraduationCap,
} from "lucide-react";
import { classRequests as initialRequests } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";
import Avatar from "../../components/ui/Avatar";
import clsx from "clsx";

const statusMeta = {
  pending_response: { label: "Chờ phản hồi", tone: "amber" },
  waiting_trial: { label: "Chờ dạy thử", tone: "slate" },
  in_trial: { label: "Đang dạy thử", tone: "blue" },
  accepted: { label: "Đã nhận lớp chính thức", tone: "emerald" },
  rejected: { label: "Đã từ chối", tone: "rose" },
};

const trackSteps = [
  { key: "waiting_trial", label: "Chờ dạy thử" },
  { key: "in_trial", label: "Đang dạy thử" },
  { key: "accepted", label: "Đã nhận lớp chính thức" },
];

function StatusTrack({ status }) {
  const activeIndex = trackSteps.findIndex((s) => s.key === status);
  return (
    <div className="flex items-center">
      {trackSteps.map((step, i) => {
        const done = activeIndex >= 0 && i <= activeIndex;
        return (
          <div key={step.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={clsx(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                  done
                    ? "accent-bg text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-500"
                )}
              >
                {i + 1}
              </div>
              <span
                className={clsx(
                  "whitespace-nowrap text-[11px] font-medium",
                  done ? "text-slate-700 dark:text-slate-200" : "text-slate-400 dark:text-slate-500"
                )}
              >
                {step.label}
              </span>
            </div>
            {i < trackSteps.length - 1 && (
              <div
                className={clsx(
                  "mx-2 mb-4 h-0.5 flex-1",
                  activeIndex > i ? "accent-bg" : "bg-slate-100 dark:bg-slate-800"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-slate-400" />
      <div className="min-w-0">
        <p className="text-xs text-slate-400">{label}</p>
        <p className="text-sm text-slate-700 dark:text-slate-200">{value}</p>
      </div>
    </div>
  );
}

export default function ClassRequests() {
  const [requests, setRequests] = useState(initialRequests);
  const [selectedId, setSelectedId] = useState(
    initialRequests.find((r) => r.status === "pending_response")?.id ?? initialRequests[0]?.id
  );
  const [rejecting, setRejecting] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const selected = requests.find((r) => r.id === selectedId);

  function selectRequest(id) {
    setSelectedId(id);
    setRejecting(false);
    setRejectReason("");
  }

  function updateSelected(patch) {
    setRequests((prev) => prev.map((r) => (r.id === selectedId ? { ...r, ...patch } : r)));
  }

  function accept() {
    updateSelected({ status: "waiting_trial" });
  }

  function confirmReject() {
    if (!rejectReason.trim()) return;
    updateSelected({ status: "rejected", rejectReason: rejectReason.trim() });
    setRejecting(false);
    setRejectReason("");
  }

  const pending = requests.filter((r) => r.status === "pending_response");
  const inProgress = requests.filter((r) => r.status === "waiting_trial" || r.status === "in_trial");
  const done = requests.filter((r) => r.status === "accepted" || r.status === "rejected");

  function RequestRow({ r }) {
    return (
      <button
        key={r.id}
        onClick={() => selectRequest(r.id)}
        className={clsx(
          "flex w-full items-start gap-3 p-4 text-left transition hover:bg-slate-50 dark:hover:bg-slate-800/50",
          selectedId === r.id && "bg-blue-50/60 dark:bg-blue-950/30"
        )}
      >
        <Avatar initials={r.studentName.split(" ").slice(-2).map((w) => w[0]).join("")} size="sm" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{r.studentName}</p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{r.subject}</p>
        </div>
        <Badge tone={statusMeta[r.status].tone}>{statusMeta[r.status].label}</Badge>
      </button>
    );
  }

  return (
    <div>
      <PageHeader
        title="Yêu cầu lớp"
        description="Các yêu cầu từ phụ huynh do Admin giới thiệu/phân công — xem chi tiết, nhận hoặc từ chối, theo dõi trạng thái."
      />

      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2" padded={false}>
          <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Chờ phản hồi ({pending.length})</p>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {pending.map((r) => (
              <RequestRow key={r.id} r={r} />
            ))}
            {pending.length === 0 && (
              <p className="p-6 text-center text-sm text-slate-400">Không có yêu cầu nào chờ phản hồi 🎉</p>
            )}
          </div>

          {inProgress.length > 0 && (
            <>
              <div className="border-b border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Đang xử lý ({inProgress.length})</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {inProgress.map((r) => (
                  <RequestRow key={r.id} r={r} />
                ))}
              </div>
            </>
          )}

          {done.length > 0 && (
            <>
              <div className="border-b border-t border-slate-200 px-4 py-3 dark:border-slate-800">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Đã hoàn tất ({done.length})</p>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {done.map((r) => (
                  <RequestRow key={r.id} r={r} />
                ))}
              </div>
            </>
          )}
        </Card>

        <div className="lg:col-span-3">
          {selected ? (
            <Card>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium text-slate-900 dark:text-slate-50">{selected.subject}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Học sinh dự kiến: {selected.studentName} ({selected.studentAge} tuổi) &middot; PH: {selected.parentName}
                  </p>
                </div>
                <Badge tone={statusMeta[selected.status].tone}>{statusMeta[selected.status].label}</Badge>
              </div>

              <div className="mb-5 grid gap-4 sm:grid-cols-2">
                <InfoRow icon={BookOpen} label="Môn học" value={selected.subject} />
                <InfoRow icon={Calendar} label="Lịch mong muốn" value={selected.desiredSchedule} />
                <InfoRow icon={MapPin} label="Khu vực / hình thức" value={selected.area} />
                <InfoRow icon={GraduationCap} label="Ngày Admin phân công" value={selected.assignedAt} />
                <InfoRow icon={Target} label="Mục tiêu học tập" value={selected.goal} />
                <InfoRow icon={AlertTriangle} label="Yêu cầu đặc biệt" value={selected.specialRequirements || "Không có"} />
              </div>

              {selected.status !== "rejected" && selected.status !== "pending_response" && (
                <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <StatusTrack status={selected.status} />
                </div>
              )}

              {selected.status === "rejected" && (
                <div className="mb-5 rounded-lg border border-rose-100 bg-rose-50/60 p-3 dark:border-rose-900 dark:bg-rose-950/30">
                  <p className="mb-1 text-xs font-medium text-rose-700 dark:text-rose-300">Lý do từ chối</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{selected.rejectReason}</p>
                </div>
              )}

              {selected.status === "pending_response" && !rejecting && (
                <div className="flex items-center gap-2">
                  <Button onClick={accept}>
                    <Check size={16} /> Nhận lớp
                  </Button>
                  <Button variant="danger" onClick={() => setRejecting(true)}>
                    <X size={16} /> Từ chối
                  </Button>
                </div>
              )}

              {selected.status === "pending_response" && rejecting && (
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Lý do từ chối
                  </label>
                  <textarea
                    rows={3}
                    autoFocus
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Ví dụ: lịch mong muốn trùng lịch dạy hiện tại..."
                    className="mb-3 w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                  />
                  <div className="flex items-center gap-2">
                    <Button variant="danger" disabled={!rejectReason.trim()} onClick={confirmReject}>
                      <X size={16} /> Xác nhận từ chối
                    </Button>
                    <Button variant="ghost" onClick={() => { setRejecting(false); setRejectReason(""); }}>
                      Hủy
                    </Button>
                  </div>
                </div>
              )}

              {selected.status === "waiting_trial" && (
                <Button onClick={() => updateSelected({ status: "in_trial" })}>
                  <PlayCircle size={16} /> Bắt đầu dạy thử
                </Button>
              )}

              {selected.status === "in_trial" && (
                <Button onClick={() => updateSelected({ status: "accepted" })}>
                  <GraduationCap size={16} /> Nhận lớp chính thức
                </Button>
              )}

              {selected.status === "accepted" && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  Đã nhận lớp chính thức. Phí nhận lớp & bảo lãnh được theo dõi tại mục Nghĩa vụ tài chính.
                </p>
              )}
            </Card>
          ) : (
            <Card className="flex items-center justify-center py-16 text-sm text-slate-400">Chọn một yêu cầu</Card>
          )}
        </div>
      </div>
    </div>
  );
}

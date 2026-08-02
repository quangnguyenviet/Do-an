import { useState } from "react";
import { ShieldCheck, GraduationCap, Bot } from "lucide-react";
import { activityLogs } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

const actionMeta = {
  approve_tutor:   { label: "Duyệt gia sư",       tone: "emerald" },
  add_student:     { label: "Thêm học sinh",       tone: "blue"    },
  add_template:    { label: "Thêm mẫu",            tone: "violet"  },
  mark_paid:       { label: "Thu học phí",         tone: "emerald" },
  create_exercise: { label: "Tạo bài tập",         tone: "neutral" },
  reply_parent:    { label: "Trả lời phụ huynh",   tone: "neutral" },
  ai_grade:        { label: "AI chấm bài",         tone: "slate"   },
};

const roleMeta = {
  admin:  { label: "Admin",     Icon: ShieldCheck    },
  tutor:  { label: "Gia sư",    Icon: GraduationCap  },
  system: { label: "Hệ thống",  Icon: Bot            },
};

const filterOpts = [
  { key: "all",    label: "Tất cả"    },
  { key: "admin",  label: "Admin"     },
  { key: "tutor",  label: "Gia sư"    },
  { key: "system", label: "Hệ thống"  },
];

function formatTs(ts) {
  const d = new Date(ts);
  return (
    d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }) +
    " " +
    d.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })
  );
}

export default function AdminLogs() {
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = activityLogs.filter(
    (l) => roleFilter === "all" || l.role === roleFilter
  );

  return (
    <div>
      <PageHeader
        title="Nhật ký hoạt động"
        description="Lịch sử các thao tác quan trọng trong hệ thống."
      />

      <div className="mb-4 flex flex-wrap gap-2">
        {filterOpts.map((opt) => (
          <button
            key={opt.key}
            onClick={() => setRoleFilter(opt.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              roleFilter === opt.key
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <Card padded={false}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((log) => {
            const rm = roleMeta[log.role];
            const am = actionMeta[log.action];
            const { Icon } = rm ?? { Icon: ShieldCheck };
            return (
              <div key={log.id} className="flex items-start gap-4 p-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
                  <Icon size={15} className="text-slate-500 dark:text-slate-400" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-50">
                      {log.actor}
                    </span>
                    {am && <Badge tone={am.tone}>{am.label}</Badge>}
                  </div>
                  <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">{log.detail}</p>
                </div>
                <span className="shrink-0 whitespace-nowrap text-xs text-slate-400">{formatTs(log.ts)}</span>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">Không có nhật ký nào.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

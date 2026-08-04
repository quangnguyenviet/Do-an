import { useState } from "react";
import { Plus, ChevronDown, ChevronRight, Trash2, X, Check, Users } from "lucide-react";
import { pathTemplates, computeActualUsage } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];
const levelTone = { A1: "slate", A2: "slate", B1: "blue", B2: "blue", C1: "violet", C2: "violet" };

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950";

function emptyForm() {
  return { name: "", level: "B1", goal: "" };
}

export default function AdminTemplates() {
  const [templates, setTemplates] = useState(() => [...pathTemplates]);
  const [expandedId, setExpandedId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());

  function handleAdd() {
    if (!form.name.trim()) return;
    setTemplates((prev) => [
      {
        id: `tpl-${Date.now()}`,
        name: form.name.trim(),
        level: form.level,
        goal: form.goal.trim(),
        usageCount: 0,
        studentsUsing: [],
        sessions: [],
      },
      ...prev,
    ]);
    setShowForm(false);
    setForm(emptyForm());
  }

  function handleDelete(id) {
    if (window.confirm("Xóa mẫu lộ trình này?")) {
      setTemplates((prev) => prev.filter((t) => t.id !== id));
    }
  }

  return (
    <div>
      <PageHeader
        title="Kho lộ trình mẫu"
        description="Quản lý các lộ trình học mẫu. Gia sư có thể clone và chỉnh sửa cho từng học sinh."
        actions={
          <Button size="sm" onClick={() => { setShowForm(true); setForm(emptyForm()); }}>
            <Plus size={14} /> Thêm mẫu
          </Button>
        }
      />

      {showForm && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Thêm mẫu lộ trình mới</h3>
            <button
              onClick={() => setShowForm(false)}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800"
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Tên lộ trình <span className="text-rose-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="VD: IELTS 6.5 — 4 tháng"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Trình độ đầu vào</label>
              <select
                value={form.level}
                onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                className={inputClass}
              >
                {levelOptions.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Mục tiêu</label>
              <input
                value={form.goal}
                onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                placeholder="VD: Đạt IELTS 6.5"
                className={inputClass}
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>Hủy</Button>
            <Button size="sm" onClick={handleAdd} disabled={!form.name.trim()}>
              <Check size={14} /> Thêm mẫu
            </Button>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {templates.map((tpl) => {
          const isExpanded = expandedId === tpl.id;
          const actualUsage = computeActualUsage(tpl.id);
          return (
            <Card key={tpl.id} padded={false}>
              <div
                className="flex cursor-pointer items-center gap-4 p-4"
                onClick={() => setExpandedId(isExpanded ? null : tpl.id)}
              >
                {isExpanded
                  ? <ChevronDown size={16} className="shrink-0 text-slate-400" />
                  : <ChevronRight size={16} className="shrink-0 text-slate-400" />
                }
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{tpl.name}</p>
                    <Badge tone={levelTone[tpl.level] ?? "neutral"}>{tpl.level}</Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{tpl.goal}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Users size={13} /> {actualUsage} học sinh dùng
                  </span>
                  <span className="text-xs text-slate-400">{tpl.sessions.length} buổi</span>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(tpl.id); }}
                    className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {isExpanded && tpl.sessions.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-800">
                  {tpl.sessions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 border-b border-slate-50 px-6 py-3 last:border-0 dark:border-slate-800/60"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-medium text-slate-500 dark:bg-slate-800">
                        {i + 1}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-slate-400 dark:text-slate-500">{s.phase}</p>
                        <p className="text-sm text-slate-700 dark:text-slate-200">{s.topic}</p>
                      </div>
                      <div className="flex flex-wrap justify-end gap-1">
                        {s.skills.map((sk) => <Badge key={sk} tone="neutral">{sk}</Badge>)}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {isExpanded && tpl.sessions.length === 0 && (
                <p className="border-t border-slate-100 px-6 py-4 text-sm text-slate-400 dark:border-slate-800">
                  Chưa có buổi học nào trong mẫu này.
                </p>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

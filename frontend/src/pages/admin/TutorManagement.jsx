import { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Check, UserCheck, UserX } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const statusOptions = [
  { value: "active", label: "Đang hoạt động", tone: "emerald" },
  { value: "inactive", label: "Ngưng hoạt động", tone: "slate" },
  { value: "pending", label: "Chờ duyệt", tone: "amber" },
];

const specializationOptions = [
  "IELTS",
  "IELTS Writing",
  "IELTS Reading",
  "Giao tiếp cơ bản",
  "Phát âm",
  "Nghe hiểu",
  "Speaking nâng cao",
  "Debate",
  "Ngữ pháp",
  "Từ vựng nâng cao",
  "Từ vựng học thuật",
];

function emptyForm() {
  return {
    name: "",
    email: "",
    phone: "",
    status: "pending",
    joinedDate: new Date().toISOString().slice(0, 10),
    specialization: [],
    studentsCount: 0,
  };
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950";

export default function TutorManagement() {
  const { tutorList, addTutor, updateTutor, removeTutor } = useAuth();

  const [query, setQuery] = useState("");
  const [statusTab, setStatusTab] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());

  const filtered = tutorList.filter(
    (t) =>
      (statusTab === "all" || t.status === statusTab) &&
      (
        t.name.toLowerCase().includes(query.toLowerCase()) ||
        t.email.toLowerCase().includes(query.toLowerCase()) ||
        t.specialization.some((s) => s.toLowerCase().includes(query.toLowerCase()))
      )
  );

  function resetForm() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(t) {
    setEditingId(t.id);
    setForm({
      name: t.name,
      email: t.email,
      phone: t.phone || "",
      status: t.status,
      joinedDate: t.joinedDate,
      specialization: [...t.specialization],
      studentsCount: t.studentsCount ?? 0,
    });
    setShowForm(true);
  }

  function toggleSpecialization(s) {
    setForm((f) => {
      const set = new Set(f.specialization);
      if (set.has(s)) set.delete(s);
      else set.add(s);
      return { ...f, specialization: Array.from(set) };
    });
  }

  function handleSubmit() {
    if (!form.name.trim() || !form.email.trim()) return;
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      status: form.status,
      joinedDate: form.joinedDate,
      specialization: form.specialization,
      studentsCount: form.studentsCount ?? 0,
      initials: form.name
        .trim()
        .split(/\s+/)
        .slice(-2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
    };

    if (editingId) {
      updateTutor(editingId, payload);
    } else {
      addTutor(payload);
    }
    resetForm();
  }

  return (
    <div>
      <PageHeader
        title="Quản lý gia sư"
        description="Thêm mới, cập nhật trạng thái và thông tin của đội ngũ gia sư."
        actions={
          <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus size={14} /> Thêm gia sư
          </Button>
        }
      />

      {/* Status tab filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {[
          { key: "all",      label: "Tất cả" },
          { key: "active",   label: "Đang hoạt động" },
          { key: "pending",  label: "Chờ duyệt" },
          { key: "inactive", label: "Ngưng" },
        ].map((opt) => (
          <button
            key={opt.key}
            onClick={() => setStatusTab(opt.key)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              statusTab === opt.key
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            {opt.label}
            {opt.key !== "all" && (
              <span className="ml-1.5 tabular-nums">
                ({tutorList.filter((t) => t.status === opt.key).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="mb-4 relative max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm gia sư theo tên, email, chuyên môn..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
        />
      </div>

      {showForm && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {editingId ? "Chỉnh sửa thông tin gia sư" : "Thêm gia sư mới"}
            </h3>
            <button
              onClick={resetForm}
              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Họ tên <span className="text-rose-500">*</span>
              </label>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="VD: Cô Nguyễn Thu Hà"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Email <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                placeholder="tutor@example.com"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Số điện thoại</label>
              <input
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="VD: 0987 654 321"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Trạng thái</label>
              <select
                value={form.status}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                className={inputClass}
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Ngày gia nhập</label>
              <input
                type="date"
                value={form.joinedDate}
                onChange={(e) => setForm((f) => ({ ...f, joinedDate: e.target.value }))}
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Chuyên môn</label>
            <div className="flex flex-wrap gap-2">
              {specializationOptions.map((s) => (
                <button
                  type="button"
                  key={s}
                  onClick={() => toggleSpecialization(s)}
                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                    form.specialization.includes(s)
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={resetForm} type="button">
              Hủy
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={!form.name.trim() || !form.email.trim()} type="button">
              <Check size={14} /> {editingId ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Card>
      )}

      <Card padded={false}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((t) => (
            <div key={t.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
              <div className="flex min-w-0 items-center gap-3">
                <Avatar initials={t.initials} />
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{t.name}</p>
                    <Badge tone={statusOptions.find((o) => o.value === t.status)?.tone}>
                      {statusOptions.find((o) => o.value === t.status)?.label}
                    </Badge>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                    {t.email} {t.phone && `· ${t.phone}`}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-1">
                    {t.specialization.map((s) => (
                      <Badge key={s} tone="neutral">{s}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className="text-xs text-slate-400">{t.studentsCount} học sinh</span>
                <div className="flex items-center gap-1">
                  {t.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateTutor(t.id, { status: "active" })}
                        title="Duyệt"
                        className="rounded-md p-1.5 text-emerald-500 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-950 dark:hover:text-emerald-400"
                      >
                        <UserCheck size={15} />
                      </button>
                      <button
                        onClick={() => updateTutor(t.id, { status: "inactive" })}
                        title="Từ chối"
                        className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-500 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                      >
                        <UserX size={15} />
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleEdit(t)}
                    title="Chỉnh sửa"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa gia sư ${t.name}?`)) removeTutor(t.id);
                    }}
                    title="Xóa"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">Không tìm thấy gia sư phù hợp.</p>
          )}
        </div>
      </Card>
    </div>
  );
}
import { useState } from "react";
import { Plus, Pencil, Trash2, Search, X, Check, GraduationCap } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Avatar from "../../components/ui/Avatar";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];

const levelTone = { A1: "slate", A2: "slate", B1: "blue", B2: "blue", C1: "violet", C2: "violet" };

function emptyForm() {
  return {
    name: "",
    level: "A1",
    goal: "",
    schedule: "",
    parentName: "",
    parentTelegram: "",
    joinedDate: new Date().toISOString().slice(0, 10),
    assignedTutorId: "",
  };
}

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950";

export default function StudentManagement() {
  const { studentList, addStudent, updateStudent, removeStudent, tutorList } = useAuth();

  const [query, setQuery] = useState("");
  const [levelTab, setLevelTab] = useState("all");
  const [tutorFilter, setTutorFilter] = useState("all");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm());

  const activeTutors = tutorList.filter((t) => t.status === "active");

  const filtered = studentList.filter((s) => {
    const matchQuery =
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.goal?.toLowerCase().includes(query.toLowerCase()) ||
      s.level?.toLowerCase().includes(query.toLowerCase());
    const matchTutor =
      tutorFilter === "all" ||
      (tutorFilter === "unassigned" && !s.assignedTutorId) ||
      s.assignedTutorId === tutorFilter;
    const matchLevel = levelTab === "all" || s.level === levelTab;
    return matchQuery && matchTutor && matchLevel;
  });

  function resetForm() {
    setForm(emptyForm());
    setEditingId(null);
    setShowForm(false);
  }

  function handleEdit(s) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      level: s.level || "A1",
      goal: s.goal || "",
      schedule: s.schedule || "",
      parentName: s.parentName || "",
      parentTelegram: s.parentTelegram || "",
      joinedDate: s.joinedDate,
      assignedTutorId: s.assignedTutorId || "",
    });
    setShowForm(true);
  }

  function handleSubmit() {
    if (!form.name.trim()) return;
    const payload = {
      name: form.name.trim(),
      level: form.level,
      goal: form.goal.trim(),
      schedule: form.schedule.trim(),
      parentName: form.parentName.trim(),
      parentTelegram: form.parentTelegram.trim(),
      joinedDate: form.joinedDate,
      assignedTutorId: form.assignedTutorId || null,
    };
    if (editingId) {
      updateStudent(editingId, payload);
    } else {
      addStudent(payload);
    }
    resetForm();
  }

  return (
    <div>
      <PageHeader
        title="Quản lý học sinh"
        description="Thêm mới, cập nhật thông tin và phân công gia sư cho từng học sinh."
        actions={
          <Button size="sm" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus size={14} /> Thêm học sinh
          </Button>
        }
      />

      {/* Level tab filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["all", "A1", "A2", "B1", "B2", "C1", "C2"].map((lv) => (
          <button
            key={lv}
            onClick={() => setLevelTab(lv)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
              levelTab === lv
                ? "border-blue-600 bg-blue-600 text-white"
                : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            {lv === "all" ? "Tất cả" : lv}
          </button>
        ))}
      </div>

      {/* Search & filter bar */}
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative max-w-sm flex-1">
          <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Tìm học sinh theo tên, mục tiêu, trình độ..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
          />
        </div>
        <select
          value={tutorFilter}
          onChange={(e) => setTutorFilter(e.target.value)}
          className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
        >
          <option value="all">Tất cả gia sư</option>
          <option value="unassigned">Chưa có gia sư</option>
          {activeTutors.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
      </div>

      {showForm && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">
              {editingId ? "Chỉnh sửa thông tin học sinh" : "Thêm học sinh mới"}
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
                placeholder="VD: Nguyễn Minh An"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Trình độ</label>
              <select
                value={form.level}
                onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))}
                className={inputClass}
              >
                {levelOptions.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Mục tiêu học</label>
              <input
                value={form.goal}
                onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
                placeholder="VD: Thi chứng chỉ IELTS 6.5"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Lịch học</label>
              <input
                value={form.schedule}
                onChange={(e) => setForm((f) => ({ ...f, schedule: e.target.value }))}
                placeholder="VD: Thứ 3 - 5 - 7, 19:00-20:30"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Tên phụ huynh</label>
              <input
                value={form.parentName}
                onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                placeholder="VD: Anh Nguyễn Văn Hùng"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Telegram phụ huynh</label>
              <input
                value={form.parentTelegram}
                onChange={(e) => setForm((f) => ({ ...f, parentTelegram: e.target.value }))}
                placeholder="VD: @parent_username"
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Ngày tham gia</label>
              <input
                type="date"
                value={form.joinedDate}
                onChange={(e) => setForm((f) => ({ ...f, joinedDate: e.target.value }))}
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Gia sư phụ trách</label>
              <select
                value={form.assignedTutorId}
                onChange={(e) => setForm((f) => ({ ...f, assignedTutorId: e.target.value }))}
                className={inputClass}
              >
                <option value="">— Chưa phân công —</option>
                {activeTutors.map((t) => (
                  <option key={t.id} value={t.id}>{t.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={resetForm} type="button">
              Hủy
            </Button>
            <Button size="sm" onClick={handleSubmit} disabled={!form.name.trim()} type="button">
              <Check size={14} /> {editingId ? "Cập nhật" : "Thêm mới"}
            </Button>
          </div>
        </Card>
      )}

      <Card padded={false}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {filtered.map((s) => {
            const assignedTutor = tutorList.find((t) => t.id === s.assignedTutorId);
            return (
              <div key={s.id} className="flex flex-wrap items-center justify-between gap-4 p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar initials={s.initials} />
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{s.name}</p>
                      <Badge tone={levelTone[s.level] ?? "neutral"}>{s.level}</Badge>
                    </div>
                    <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">{s.goal}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {assignedTutor ? (
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <GraduationCap size={12} />
                          {assignedTutor.name}
                        </span>
                      ) : (
                        <span className="text-xs text-amber-500">Chưa có gia sư</span>
                      )}
                      {s.schedule && (
                        <span className="text-xs text-slate-400">&middot; {s.schedule}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <span className="mr-2 text-xs text-slate-400">{s.overallProgress}% hoàn thành</span>
                  <button
                    onClick={() => handleEdit(s)}
                    title="Chỉnh sửa"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Xóa học sinh ${s.name}?`)) removeStudent(s.id);
                    }}
                    title="Xóa"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
          {filtered.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">Không tìm thấy học sinh phù hợp.</p>
          )}
        </div>
      </Card>
    </div>
  );
}

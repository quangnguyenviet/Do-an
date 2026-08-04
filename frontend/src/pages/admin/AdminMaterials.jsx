import { useState } from "react";
import {
  Video, FileText, Headphones, NotebookPen, BookOpen,
  Plus, Trash2, X, Check, Clock, Search,
} from "lucide-react";
import { adminMaterials } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

const levelOptions = ["A1", "A2", "B1", "B2", "C1", "C2"];
const skillOptions = ["Nghe", "Nói", "Đọc", "Viết", "Từ vựng", "Ngữ pháp"];

const levelTone = {
  A1: "slate", A2: "slate",
  B1: "blue",  B2: "blue",
  C1: "violet", C2: "violet",
};

const typeConfig = {
  video:    { Icon: Video,       label: "Video",     cls: "bg-violet-100 text-violet-600 dark:bg-violet-950/60 dark:text-violet-400" },
  doc:      { Icon: FileText,    label: "Tài liệu",  cls: "bg-blue-100 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400" },
  audio:    { Icon: Headphones,  label: "Âm thanh",  cls: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" },
  exercise: { Icon: NotebookPen, label: "Bài tập",   cls: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400" },
  pdf:      { Icon: BookOpen,    label: "PDF",       cls: "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" },
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950";

function emptyForm() {
  return { title: "", level: "A1", skill: "Nghe", type: "doc", description: "", duration: "", source: "" };
}

export default function AdminMaterials() {
  const [materials, setMaterials] = useState(() => [...adminMaterials]);
  const [levelFilter, setLevelFilter] = useState("all");
  const [skillFilter, setSkillFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm());

  const filtered = materials.filter((m) => {
    const matchLevel = levelFilter === "all" || m.level === levelFilter;
    const matchSkill = skillFilter === "all" || m.skill === skillFilter;
    const matchQuery = !query || m.title.toLowerCase().includes(query.toLowerCase()) || m.description.toLowerCase().includes(query.toLowerCase());
    return matchLevel && matchSkill && matchQuery;
  });

  // Counts for filter badges
  const countByLevel = (lv) => materials.filter((m) => m.level === lv).length;
  const countBySkill = (sk) => materials.filter((m) => m.skill === sk).length;

  function handleAdd() {
    if (!form.title.trim()) return;
    setMaterials((prev) => [
      { ...form, id: `am-${Date.now()}`, title: form.title.trim(), description: form.description.trim(), source: form.source.trim() },
      ...prev,
    ]);
    setShowForm(false);
    setForm(emptyForm());
  }

  function handleDelete(id) {
    if (window.confirm("Xóa tài liệu này khỏi kho?")) {
      setMaterials((prev) => prev.filter((m) => m.id !== id));
    }
  }

  return (
    <div>
      <PageHeader
        title="Kho tài liệu mẫu"
        description="Thư viện tài liệu học tiếng Anh phân theo cấp độ và kỹ năng. Gia sư có thể gán cho học sinh."
        actions={
          <Button size="sm" onClick={() => { setShowForm(true); setForm(emptyForm()); }}>
            <Plus size={14} /> Thêm tài liệu
          </Button>
        }
      />

      {/* Add form */}
      {showForm && (
        <Card className="mb-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">Thêm tài liệu mới</h3>
            <button onClick={() => setShowForm(false)} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800">
              <X size={16} />
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Tiêu đề <span className="text-rose-500">*</span>
              </label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="VD: Video: Chiến lược IELTS Listening Section 3" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Cấp độ</label>
              <select value={form.level} onChange={(e) => setForm((f) => ({ ...f, level: e.target.value }))} className={inputClass}>
                {levelOptions.map((l) => <option key={l} value={l}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Kỹ năng</label>
              <select value={form.skill} onChange={(e) => setForm((f) => ({ ...f, skill: e.target.value }))} className={inputClass}>
                {skillOptions.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Loại</label>
              <select value={form.type} onChange={(e) => setForm((f) => ({ ...f, type: e.target.value }))} className={inputClass}>
                <option value="video">Video</option>
                <option value="doc">Tài liệu</option>
                <option value="audio">Âm thanh</option>
                <option value="exercise">Bài tập</option>
                <option value="pdf">PDF</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Thời lượng (nếu có)</label>
              <input value={form.duration} onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))} placeholder="VD: 18:30" className={inputClass} />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Nguồn</label>
              <input value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} placeholder="VD: IELTS Liz, EnglishPath..." className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Mô tả ngắn</label>
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} placeholder="Nội dung chính của tài liệu này..." className={inputClass} />
            </div>
          </div>
          <div className="mt-4 flex justify-end gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
            <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>Hủy</Button>
            <Button size="sm" onClick={handleAdd} disabled={!form.title.trim()}>
              <Check size={14} /> Thêm tài liệu
            </Button>
          </div>
        </Card>
      )}

      {/* Level tabs */}
      <div className="mb-3 flex flex-wrap gap-2">
        <button
          onClick={() => setLevelFilter("all")}
          className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${levelFilter === "all" ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"}`}
        >
          Tất cả cấp độ <span className="ml-1 tabular-nums">({materials.length})</span>
        </button>
        {levelOptions.map((lv) => (
          <button
            key={lv}
            onClick={() => setLevelFilter(lv)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${levelFilter === lv ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"}`}
          >
            {lv} <span className="ml-1 tabular-nums">({countByLevel(lv)})</span>
          </button>
        ))}
      </div>

      {/* Skill pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setSkillFilter("all")}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition ${skillFilter === "all" ? "border-slate-700 bg-slate-700 text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900" : "border-slate-200 text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400"}`}
        >
          Tất cả kỹ năng
        </button>
        {skillOptions.map((sk) => (
          <button
            key={sk}
            onClick={() => setSkillFilter(sk)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition ${skillFilter === sk ? "border-slate-700 bg-slate-700 text-white dark:border-slate-200 dark:bg-slate-200 dark:text-slate-900" : "border-slate-200 text-slate-500 hover:border-slate-400 dark:border-slate-700 dark:text-slate-400"}`}
          >
            {sk} ({countBySkill(sk)})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Tìm kiếm tài liệu..."
          className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
        />
      </div>

      {/* Material cards grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((m) => {
            const tc = typeConfig[m.type] ?? typeConfig.doc;
            return (
              <Card key={m.id} className="flex flex-col gap-0 p-0" padded={false}>
                <div className="flex items-start gap-3 p-4">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tc.cls}`}>
                    <tc.Icon size={18} strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug text-slate-900 dark:text-slate-50">{m.title}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      <Badge tone={levelTone[m.level] ?? "neutral"}>{m.level}</Badge>
                      <Badge skill={m.skill}>{m.skill}</Badge>
                      <span className="text-[11px] text-slate-400">{tc.label}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(m.id)}
                    className="ml-1 shrink-0 rounded-md p-1 text-slate-300 hover:bg-rose-50 hover:text-rose-500 dark:text-slate-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <p className="px-4 pb-3 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {m.description}
                </p>

                <div className="flex items-center justify-between border-t border-slate-100 px-4 py-2.5 dark:border-slate-800">
                  <span className="text-xs text-slate-400">{m.source}</span>
                  {m.duration && (
                    <span className="flex items-center gap-1 text-xs text-slate-400">
                      <Clock size={11} /> {m.duration}
                    </span>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card>
          <p className="py-4 text-center text-sm text-slate-400">
            Không có tài liệu nào phù hợp với bộ lọc hiện tại.
          </p>
        </Card>
      )}
    </div>
  );
}

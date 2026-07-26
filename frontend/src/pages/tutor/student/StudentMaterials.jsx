import { useState } from "react";
import { Library, Plus, Pencil, Trash2, Check, X, PlayCircle, FileText } from "lucide-react";
import { materialLibrary, skillList } from "../../../data/mockData";
import Card from "../../../components/ui/Card";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import { materialTypeOptions } from "./studentHelpers";

function emptyMaterialForm(sessionId) {
  return { title: "", type: "doc", topic: skillList[0], date: "", duration: "", sessionId: sessionId ?? "" };
}

export default function StudentMaterials({
  materialsList,
  setMaterialsList,
  pathItems,
}) {
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [materialForm, setMaterialForm] = useState(null);
  const [showMaterialPicker, setShowMaterialPicker] = useState(false);

  function sessionLabel(sessionId) {
    const item = pathItems.find((it) => it.id === sessionId);
    return item ? `Buổi ${item.session}: ${item.topic}` : null;
  }

  function startAddMaterial() {
    const id = `mat-new-${Date.now()}`;
    setMaterialsList((prev) => [
      { id, title: "", type: "doc", topic: skillList[0], date: "Hôm nay", duration: "", sessionId: null, __isNew: true },
      ...prev,
    ]);
    setEditingMaterialId(id);
    setMaterialForm(emptyMaterialForm());
  }

  function startEditMaterial(m) {
    setEditingMaterialId(m.id);
    setMaterialForm({
      title: m.title,
      type: m.type,
      topic: m.topic,
      date: m.date,
      duration: m.duration || "",
      sessionId: m.sessionId ?? "",
    });
  }

  function saveMaterial() {
    if (!materialForm.title.trim()) return;
    setMaterialsList((prev) =>
      prev.map((m) =>
        m.id === editingMaterialId
          ? {
              ...m,
              title: materialForm.title.trim(),
              type: materialForm.type,
              topic: materialForm.topic,
              date: materialForm.date.trim() || "Chưa rõ ngày",
              duration: materialForm.type === "video" ? materialForm.duration.trim() : "",
              sessionId: materialForm.sessionId || null,
              __isNew: undefined,
            }
          : m
      )
    );
    setEditingMaterialId(null);
    setMaterialForm(null);
  }

  function cancelMaterial() {
    setMaterialsList((prev) => prev.filter((m) => !(m.id === editingMaterialId && m.__isNew)));
    setEditingMaterialId(null);
    setMaterialForm(null);
  }

  function deleteMaterial(id) {
    setMaterialsList((prev) => prev.filter((m) => m.id !== id));
    if (editingMaterialId === id) {
      setEditingMaterialId(null);
      setMaterialForm(null);
    }
  }

  function applyLibraryMaterial(item) {
    setMaterialsList((prev) => [
      {
        id: `mat-lib-${item.id}-${Date.now()}`,
        title: item.title,
        type: item.type,
        topic: item.topic,
        date: "Hôm nay",
        duration: item.duration || "",
        sessionId: null,
        fromLibrary: true,
      },
      ...prev,
    ]);
    setShowMaterialPicker(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowMaterialPicker((v) => !v)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-blue-400"
        >
          <Library size={14} /> Gán từ Kho video & tài liệu
        </button>
      </div>

      {showMaterialPicker && (
        <Card>
          <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">Chọn tài liệu / video từ Kho</h3>
          <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
            {materialLibrary.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{item.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.topic} {item.duration && `· ${item.duration}`}
                  </p>
                </div>
                <Button size="sm" onClick={() => applyLibraryMaterial(item)} type="button">
                  Gán
                </Button>
              </div>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-400">
            Được gán dưới dạng bản sao riêng, không ảnh hưởng tới mục gốc trong Kho.
          </p>
        </Card>
      )}

      <Card padded={false}>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {materialsList.map((m) =>
            editingMaterialId === m.id ? (
              <div key={m.id} className="space-y-3 p-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Tên tài liệu / video</label>
                  <input
                    value={materialForm.title}
                    onChange={(e) => setMaterialForm((f) => ({ ...f, title: e.target.value }))}
                    placeholder="VD: Video: Chiến lược làm bài Writing Task 1"
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Chủ đề / kỹ năng</label>
                  <div className="flex flex-wrap gap-2">
                    {skillList.map((sk) => (
                      <button
                        type="button"
                        key={sk}
                        onClick={() => setMaterialForm((f) => ({ ...f, topic: sk }))}
                        className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                          materialForm.topic === sk
                            ? "border-blue-600 bg-blue-600 text-white"
                            : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {sk}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Loại</label>
                    <select
                      value={materialForm.type}
                      onChange={(e) => setMaterialForm((f) => ({ ...f, type: e.target.value }))}
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                    >
                      {materialTypeOptions.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Ngày</label>
                    <input
                      value={materialForm.date}
                      onChange={(e) => setMaterialForm((f) => ({ ...f, date: e.target.value }))}
                      placeholder="VD: 2026-03-11"
                      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                    />
                  </div>
                  {materialForm.type === "video" && (
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Thời lượng</label>
                      <input
                        value={materialForm.duration}
                        onChange={(e) => setMaterialForm((f) => ({ ...f, duration: e.target.value }))}
                        placeholder="VD: 18:20"
                        className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                      />
                    </div>
                  )}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Gắn với buổi học</label>
                  <select
                    value={materialForm.sessionId}
                    onChange={(e) => setMaterialForm((f) => ({ ...f, sessionId: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950 sm:w-80"
                  >
                    <option value="">Không gắn buổi học</option>
                    {pathItems.map((it) => (
                      <option key={it.id} value={it.id}>
                        Buổi {it.session}: {it.topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="secondary" size="sm" onClick={cancelMaterial} type="button">
                    <X size={14} /> Hủy
                  </Button>
                  <Button size="sm" onClick={saveMaterial} type="button">
                    <Check size={14} /> Lưu
                  </Button>
                </div>
              </div>
            ) : (
              <div key={m.id} className="group flex flex-wrap items-start justify-between gap-3 p-4">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg accent-bg-light accent-text dark:accent-bg-dark dark:accent-text-dark">
                    {m.type === "video" ? <PlayCircle size={20} /> : <FileText size={20} />}
                  </div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{m.title}</p>
                      {m.fromLibrary && (
                        <Badge tone="neutral">
                          <Library size={11} /> Từ kho
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                      {m.topic} &middot; {m.date} {m.duration && `· ${m.duration}`}
                    </p>
                    <p className="mt-1 text-xs">
                      {sessionLabel(m.sessionId) ? (
                        <span className="accent-text dark:accent-text-dark">{sessionLabel(m.sessionId)}</span>
                      ) : (
                        <span className="text-slate-400">Chưa gắn buổi học</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-1 opacity-40 transition group-hover:opacity-100">
                  <button
                    onClick={() => startEditMaterial(m)}
                    title="Chỉnh sửa"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => deleteMaterial(m.id)}
                    title="Xóa"
                    className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            )
          )}
          {materialsList.length === 0 && (
            <p className="p-6 text-center text-sm text-slate-400">Chưa có tài liệu nào được gán.</p>
          )}
        </div>
        <div className="border-t border-slate-100 p-3 dark:border-slate-800">
          <button
            onClick={startAddMaterial}
            className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
          >
            <Plus size={14} /> Thêm tài liệu / video
          </button>
        </div>
      </Card>
    </div>
  );
}
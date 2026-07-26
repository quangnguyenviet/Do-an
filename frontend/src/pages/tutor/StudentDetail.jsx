import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Library,
} from "lucide-react";
import { getStudentById, students, pathTemplates, exerciseBank, materialLibrary, skillList } from "../../data/mockData";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import ProgressBar from "../../components/ui/ProgressBar";
import ProgressChart from "../../components/charts/ProgressChart";
import { useAiAssistant } from "../../context/AiAssistantContext";
import clsx from "clsx";

const TABS = [
  { key: "path", label: "Lộ trình học" },
  { key: "exercises", label: "Bài tập" },
  { key: "progress", label: "Kết quả & tiến bộ" },
  { key: "materials", label: "Tài liệu & video" },
];

const exerciseStatus = {
  graded: { label: "Đã chấm", tone: "emerald" },
  submitted: { label: "Chờ chấm", tone: "amber" },
  assigned: { label: "Đã giao", tone: "neutral" },
};

const statusOptions = [
  { value: "upcoming", label: "Sắp tới" },
  { value: "in_progress", label: "Đang học" },
  { value: "done", label: "Đã hoàn thành" },
];

const sessionStatusMeta = {
  done: { label: "Đã hoàn thành", iconTone: "bg-emerald-500 text-white", dotTone: "text-emerald-600 dark:text-emerald-400" },
  in_progress: { label: "Đang học", iconTone: "bg-amber-500 text-white", dotTone: "text-amber-600 dark:text-amber-400" },
  upcoming: { label: "Sắp tới", iconTone: "bg-slate-400 text-white dark:bg-slate-600", dotTone: "text-slate-500 dark:text-slate-400" },
};

const DETAIL_TABS = [
  { key: "overview", label: "Tổng quan" },
  { key: "exercises", label: "Bài tập" },
  { key: "materials", label: "Tài liệu" },
];

const difficultyOptions = ["Cơ bản", "Trung bình", "Nâng cao"];

const materialTypeOptions = [
  { value: "doc", label: "Tài liệu" },
  { value: "video", label: "Video" },
];

function emptyForm(phase, session) {
  return {
    phase,
    session,
    date: "",
    topic: "",
    status: "upcoming",
    skillsSet: new Set(),
    exerciseIdsSet: new Set(),
    materialIdsSet: new Set(),
  };
}

function emptyExerciseForm(sessionId) {
  return { title: "", skill: skillList[0], difficulty: "Trung bình", type: "Trắc nghiệm", sessionId: sessionId ?? "" };
}

function emptyMaterialForm(sessionId) {
  return { title: "", type: "doc", topic: skillList[0], date: "", duration: "", sessionId: sessionId ?? "" };
}

// The session a tutor most needs to see on opening the page: whichever one is
// in progress, otherwise the earliest upcoming one.
function findFocusSession(items) {
  const inProgress = items.find((it) => it.status === "in_progress");
  if (inProgress) return inProgress;
  const upcoming = items.filter((it) => it.status === "upcoming").sort((a, b) => a.session - b.session);
  return upcoming[0] ?? null;
}

export default function StudentDetail() {
  const { studentId, tab: tabParam } = useParams();
  const navigate = useNavigate();
  const student = getStudentById(studentId);
  const tab = TABS.some((t) => t.key === tabParam) ? tabParam : "path";
  const { registerTarget, clearTarget } = useAiAssistant();

  const [pathItems, setPathItems] = useState(() => student?.learningPath ?? []);
  const [exercisesList, setExercisesList] = useState(() => student?.exercises ?? []);
  const [materialsList, setMaterialsList] = useState(() => student?.materials ?? []);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editForm, setEditForm] = useState(null);
  const [editingExerciseId, setEditingExerciseId] = useState(null);
  const [exerciseForm, setExerciseForm] = useState(null);
  const [editingMaterialId, setEditingMaterialId] = useState(null);
  const [materialForm, setMaterialForm] = useState(null);
  const [showPathPicker, setShowPathPicker] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);
  const [showMaterialPicker, setShowMaterialPicker] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState(
    () => findFocusSession(student?.learningPath ?? [])?.id ?? null
  );
  const [detailTab, setDetailTab] = useState("overview");

  useEffect(() => {
    setPathItems(student?.learningPath ?? []);
    setExercisesList(student?.exercises ?? []);
    setMaterialsList(student?.materials ?? []);
    setEditingItemId(null);
    setEditForm(null);
    setEditingExerciseId(null);
    setExerciseForm(null);
    setEditingMaterialId(null);
    setMaterialForm(null);
    setShowPathPicker(false);
    setShowExercisePicker(false);
    setShowMaterialPicker(false);
    setSelectedSessionId(findFocusSession(student?.learningPath ?? [])?.id ?? null);
  }, [studentId]);

  useEffect(() => {
    if (tabParam !== tab) navigate(`/tutor/students/${studentId}/${tab}`, { replace: true });
  }, [tabParam, tab, studentId, navigate]);

  useEffect(() => {
    setDetailTab("overview");
  }, [selectedSessionId]);

  function goToTab(nextTab) {
    navigate(`/tutor/students/${studentId}/${nextTab}`);
  }

  const groupedPath = useMemo(() => {
    const groups = [];
    for (const item of pathItems) {
      let g = groups.find((g) => g.phase === item.phase);
      if (!g) {
        g = { phase: item.phase, items: [] };
        groups.push(g);
      }
      g.items.push(item);
    }
    return groups;
  }, [pathItems]);

  const nextSession = useMemo(
    () => pathItems.reduce((max, it) => Math.max(max, it.session || 0), 0) + 1,
    [pathItems]
  );

  const focusSession = useMemo(() => findFocusSession(pathItems), [pathItems]);

  const exercisesBySession = useMemo(() => {
    const map = {};
    for (const ex of exercisesList) {
      if (!ex.sessionId) continue;
      (map[ex.sessionId] ??= []).push(ex);
    }
    return map;
  }, [exercisesList]);

  const materialsBySession = useMemo(() => {
    const map = {};
    for (const m of materialsList) {
      if (!m.sessionId) continue;
      (map[m.sessionId] ??= []).push(m);
    }
    return map;
  }, [materialsList]);

  function sessionLabel(sessionId) {
    const item = pathItems.find((it) => it.id === sessionId);
    return item ? `Buổi ${item.session}: ${item.topic}` : null;
  }

  const selectedSession = useMemo(
    () => pathItems.find((it) => it.id === selectedSessionId) ?? null,
    [pathItems, selectedSessionId]
  );

  function startEdit(item) {
    setEditingItemId(item.id);
    setEditForm({
      ...item,
      skillsSet: new Set(item.skills),
      exerciseIdsSet: new Set((exercisesBySession[item.id] || []).map((ex) => ex.id)),
      materialIdsSet: new Set((materialsBySession[item.id] || []).map((m) => m.id)),
    });
    setSelectedSessionId(item.id);
  }

  function startAddItem(phase) {
    const id = `lp-new-${Date.now()}`;
    setPathItems((prev) => [...prev, { id, phase, session: nextSession, date: "", topic: "", skills: [], status: "upcoming", __isNew: true }]);
    setEditingItemId(id);
    setEditForm(emptyForm(phase, nextSession));
    setSelectedSessionId(id);
  }

  function startAddPhase() {
    startAddItem("Giai đoạn mới");
  }

  function toggleEditSkill(sk) {
    setEditForm((f) => {
      const set = new Set(f.skillsSet);
      if (set.has(sk)) set.delete(sk);
      else set.add(sk);
      return { ...f, skillsSet: set };
    });
  }

  function toggleEditExercise(id) {
    setEditForm((f) => {
      const set = new Set(f.exerciseIdsSet);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...f, exerciseIdsSet: set };
    });
  }

  function toggleEditMaterial(id) {
    setEditForm((f) => {
      const set = new Set(f.materialIdsSet);
      if (set.has(id)) set.delete(id);
      else set.add(id);
      return { ...f, materialIdsSet: set };
    });
  }

  function saveEdit() {
    if (!editForm.topic.trim() || !editForm.phase.trim()) return;
    setPathItems((prev) =>
      prev.map((it) =>
        it.id === editingItemId
          ? {
              ...it,
              phase: editForm.phase.trim(),
              topic: editForm.topic.trim(),
              date: editForm.date.trim() || "Chưa xếp lịch",
              status: editForm.status,
              skills: Array.from(editForm.skillsSet),
              __isNew: undefined,
            }
          : it
      )
    );
    setExercisesList((prev) =>
      prev.map((ex) => {
        if (editForm.exerciseIdsSet.has(ex.id)) return { ...ex, sessionId: editingItemId };
        if (ex.sessionId === editingItemId) return { ...ex, sessionId: null };
        return ex;
      })
    );
    setMaterialsList((prev) =>
      prev.map((m) => {
        if (editForm.materialIdsSet.has(m.id)) return { ...m, sessionId: editingItemId };
        if (m.sessionId === editingItemId) return { ...m, sessionId: null };
        return m;
      })
    );
    setEditingItemId(null);
    setEditForm(null);
  }

  function cancelEdit() {
    const wasNew = pathItems.some((it) => it.id === editingItemId && it.__isNew);
    setPathItems((prev) => prev.filter((it) => !(it.id === editingItemId && it.__isNew)));
    if (wasNew) setSelectedSessionId(null);
    setEditingItemId(null);
    setEditForm(null);
  }

  function deleteItem(id) {
    setPathItems((prev) => prev.filter((it) => it.id !== id));
    if (editingItemId === id) {
      setEditingItemId(null);
      setEditForm(null);
    }
    if (selectedSessionId === id) setSelectedSessionId(null);
  }

  function setSessionStatus(id, status) {
    setPathItems((prev) => prev.map((it) => (it.id === id ? { ...it, status } : it)));
  }

  function startAddExercise() {
    const id = `ex-new-${Date.now()}`;
    setExercisesList((prev) => [
      { id, title: "", skill: skillList[0], difficulty: "Trung bình", type: "Trắc nghiệm", status: "assigned", assignedDate: "Hôm nay", sessionId: null, __isNew: true },
      ...prev,
    ]);
    setEditingExerciseId(id);
    setExerciseForm(emptyExerciseForm());
  }

  function startEditExercise(ex) {
    setEditingExerciseId(ex.id);
    setExerciseForm({
      title: ex.title,
      skill: ex.skill,
      difficulty: ex.difficulty,
      type: ex.type,
      sessionId: ex.sessionId ?? "",
    });
  }

  function saveExercise() {
    if (!exerciseForm.title.trim()) return;
    setExercisesList((prev) =>
      prev.map((ex) =>
        ex.id === editingExerciseId
          ? {
              ...ex,
              title: exerciseForm.title.trim(),
              skill: exerciseForm.skill,
              difficulty: exerciseForm.difficulty,
              type: exerciseForm.type,
              sessionId: exerciseForm.sessionId || null,
              __isNew: undefined,
            }
          : ex
      )
    );
    setEditingExerciseId(null);
    setExerciseForm(null);
  }

  function cancelExercise() {
    setExercisesList((prev) => prev.filter((ex) => !(ex.id === editingExerciseId && ex.__isNew)));
    setEditingExerciseId(null);
    setExerciseForm(null);
  }

  function deleteExercise(id) {
    setExercisesList((prev) => prev.filter((ex) => ex.id !== id));
    if (editingExerciseId === id) {
      setEditingExerciseId(null);
      setExerciseForm(null);
    }
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

  function handleApplyPathDraft(items) {
    setPathItems((prev) => [...prev, ...items]);
  }

  function handleApplyExerciseDraft(exercise) {
    setExercisesList((prev) => [
      {
        id: `ex-ai-${Date.now()}`,
        title: exercise.title,
        skill: exercise.skill,
        difficulty: exercise.difficulty,
        type: exercise.type,
        status: "assigned",
        assignedDate: "Hôm nay",
        sessionId: exercise.sessionId ?? null,
      },
      ...prev,
    ]);
  }

  function applyPathTemplate(tpl) {
    const startSession = nextSession;
    const cloned = tpl.sessions.map((s, i) => ({
      id: `lp-tpl-${tpl.id}-${Date.now()}-${i}`,
      phase: s.phase,
      session: startSession + i,
      date: "Chưa xếp lịch",
      skills: s.skills,
      topic: s.topic,
      status: "upcoming",
      sourceTemplateName: tpl.name,
    }));
    setPathItems((prev) => [...prev, ...cloned]);
    setShowPathPicker(false);
  }

  function applyBankExercise(bankEx) {
    setExercisesList((prev) => [
      {
        id: `ex-bank-${bankEx.id}-${Date.now()}`,
        title: bankEx.title,
        skill: bankEx.skill,
        difficulty: bankEx.difficulty,
        type: bankEx.type,
        status: "assigned",
        assignedDate: "Hôm nay",
        sessionId: null,
        fromLibrary: true,
      },
      ...prev,
    ]);
    setShowExercisePicker(false);
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

  useEffect(() => {
    if (!student) return undefined;
    registerTarget({
      student,
      nextSession,
      pathItems,
      focusSession,
      onApplyPath: handleApplyPathDraft,
      onApplyExercise: handleApplyExerciseDraft,
    });
    return () => clearTarget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [student, nextSession, pathItems]);

  if (!student) {
    return (
      <div>
        <Link to="/tutor/students" className="inline-flex items-center gap-1.5 text-sm accent-link">
          <ArrowLeft size={16} /> Quay lại danh sách
        </Link>
        <p className="mt-4 text-sm text-slate-500">Không tìm thấy học sinh.</p>
      </div>
    );
  }

  return (
    <div>
      <Link
        to="/tutor/students"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
      >
        <ArrowLeft size={16} /> Quay lại danh sách học sinh
      </Link>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {students.map((s) => (
          <Link
            key={s.id}
            to={`/tutor/students/${s.id}/${tab}`}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition ${
              s.id === studentId
                ? "accent-pill"
                : "border-slate-200 text-slate-600 accent-pill-outline dark:border-slate-700 dark:text-slate-300"
            }`}
          >
            <Avatar initials={s.initials} size="sm" />
            {s.name}
          </Link>
        ))}
      </div>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar initials={student.initials} size="lg" />
          <div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-slate-50">{student.name}</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {student.level} &middot; {student.goal} &middot; {student.schedule}
            </p>
          </div>
        </div>
        <Button as={Link} to="/tutor/exercise-generator" variant="primary" size="sm">
          <Plus size={16} /> Sinh bài tập cho học sinh này
        </Button>
      </div>

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
            <button
              type="button"
              onClick={() => {
                setSelectedSessionId(focusSession.id);
                if (tab !== "path") goToTab("path");
              }}
              className="mt-1.5 block w-full text-left"
            >
              <p className="truncate text-sm font-medium text-slate-900 hover:accent-text dark:text-slate-50 dark:hover:accent-text-dark">
                Buổi {focusSession.session}: {focusSession.topic}
              </p>
              <p className="mt-0.5 text-xs text-slate-400">{focusSession.date}</p>
            </button>
          ) : (
            <p className="mt-1.5 text-sm text-slate-400">Chưa có buổi nào sắp tới</p>
          )}
        </Card>
      </div>

      <div className="mb-6 flex gap-1 border-b border-slate-200 dark:border-slate-800">
        {TABS.map((t) => (
          <Link
            key={t.key}
            to={`/tutor/students/${studentId}/${t.key}`}
            className={`border-b-2 px-4 py-2.5 text-sm font-medium transition ${
              tab === t.key
                ? "accent-border accent-text dark:accent-text-dark"
                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div>
        {tab === "path" && (
            <div className="flex items-start gap-6">
            <div className="min-w-0 flex-1 space-y-6">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowPathPicker((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 accent-border-light-hover hover:accent-text dark:border-slate-700 dark:text-slate-300 dark:hover:accent-text-dark"
                >
                  <Library size={14} /> Áp dụng lộ trình từ Kho
                </button>
              </div>

              {showPathPicker && (
                <Card>
                  <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">Chọn mẫu lộ trình từ Kho</h3>
                  <div className="space-y-2">
                    {pathTemplates.map((tpl) => (
                      <div
                        key={tpl.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{tpl.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {tpl.sessions.length} buổi học &middot; {tpl.goal}
                          </p>
                        </div>
                        <Button size="sm" onClick={() => applyPathTemplate(tpl)} type="button">
                          Áp dụng
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Các buổi học sẽ được thêm vào lộ trình của {student.name} dưới dạng bản sao độc lập — chỉnh sửa sau này sẽ không ảnh hưởng tới mẫu gốc trong Kho.
                  </p>
                </Card>
              )}

              {groupedPath.map((g) => (
                <Card key={g.phase} padded={false}>
                  <div className="border-b border-slate-200 px-5 py-3 dark:border-slate-800">
                    <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-50">{g.phase}</h3>
                  </div>
                  <div className="divide-y divide-slate-100 dark:divide-slate-800">
                    {g.items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setSelectedSessionId(item.id)}
                          className={clsx(
                            "group flex cursor-pointer items-start gap-3 p-4 transition",
                            selectedSessionId === item.id
                              ? "bg-blue-50 dark:bg-blue-950/40"
                              : "hover:bg-slate-50 dark:hover:bg-slate-900/60"
                          )}
                        >
                          {item.status === "done" ? (
                            <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-emerald-500" />
                          ) : item.status === "in_progress" ? (
                            <PlayCircle size={20} className="mt-0.5 shrink-0 text-amber-500" />
                          ) : (
                            <Circle size={20} className="mt-0.5 shrink-0 text-slate-300 dark:text-slate-700" />
                          )}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                                Buổi {item.session}: {item.topic}
                              </p>
                              <span className="text-xs text-slate-400">{item.date}</span>
                            </div>
                            <div className="mt-1.5 flex flex-wrap items-center gap-1">
                              {item.skills.map((sk) => (
                                <Badge key={sk} skill={sk}>
                                  {sk}
                                </Badge>
                              ))}
                              {item.sourceTemplateName && (
                                <Badge tone="neutral">
                                  <Library size={11} /> Từ kho: {item.sourceTemplateName}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex shrink-0 items-center gap-1 opacity-40 transition group-hover:opacity-100">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEdit(item);
                              }}
                              title="Chỉnh sửa"
                              className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteItem(item.id);
                              }}
                              title="Xóa"
                              className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                  <div className="border-t border-slate-100 p-3 dark:border-slate-800">
                    <button
                      onClick={() => startAddItem(g.phase)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium accent-text hover:accent-bg-light dark:accent-text-dark dark:hover:accent-bg-dark"
                    >
                      <Plus size={14} /> Thêm buổi học
                    </button>
                  </div>
                </Card>
              ))}

              <button
                onClick={startAddPhase}
                className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-500 accent-border-light-hover hover:accent-text dark:border-slate-700 dark:text-slate-400 dark:hover:accent-text-dark"
              >
                <Plus size={16} /> Thêm giai đoạn mới
              </button>
            </div>

            {selectedSession && (
              <div className="fixed inset-0 z-40 flex justify-end">
                <div
                  className="absolute inset-0 bg-slate-900/40 [animation:fade-in_0.2s_ease-out] dark:bg-black/60"
                  onClick={() => (editingItemId === selectedSession.id ? cancelEdit() : setSelectedSessionId(null))}
                />
                <aside className="relative flex h-full w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl [animation:slide-in-right_0.25s_ease-out] dark:border-slate-800 dark:bg-slate-900">
                  <div className="shrink-0 border-b border-slate-200 px-6 py-5 dark:border-slate-800">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-start gap-3">
                        <div
                          className={clsx(
                            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-base font-bold tabular-nums",
                            sessionStatusMeta[selectedSession.status].iconTone
                          )}
                        >
                          {selectedSession.session}
                        </div>
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <h2 className="truncate text-base font-semibold text-slate-900 dark:text-slate-50">
                              {editingItemId === selectedSession.id
                                ? "Chỉnh sửa buổi học"
                                : `Buổi ${selectedSession.session}: ${selectedSession.topic}`}
                            </h2>
                            {editingItemId !== selectedSession.id && (
                              <span
                                className={clsx(
                                  "inline-flex shrink-0 items-center gap-1 text-xs font-medium",
                                  sessionStatusMeta[selectedSession.status].dotTone
                                )}
                              >
                                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                {sessionStatusMeta[selectedSession.status].label}
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-slate-400">
                            {selectedSession.phase} &middot; {selectedSession.date}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => (editingItemId === selectedSession.id ? cancelEdit() : setSelectedSessionId(null))}
                        title="Đóng"
                        className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      >
                        <X size={18} />
                      </button>
                    </div>

                    {editingItemId !== selectedSession.id && (
                      <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Button size="sm" onClick={() => startEdit(selectedSession)}>
                          <Pencil size={14} /> Chỉnh sửa
                        </Button>
                        {selectedSession.status !== "done" && (
                          <Button variant="secondary" size="sm" onClick={() => setSessionStatus(selectedSession.id, "done")}>
                            <Check size={14} /> Đánh dấu hoàn thành
                          </Button>
                        )}
                        <button
                          onClick={() => deleteItem(selectedSession.id)}
                          className="ml-auto inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950"
                        >
                          <Trash2 size={14} /> Xóa buổi học
                        </button>
                      </div>
                    )}
                  </div>

                  {editingItemId === selectedSession.id ? (
                    <div className="flex min-h-0 flex-1 flex-col">
                      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-6">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Giai đoạn</label>
                          <input
                            value={editForm.phase}
                            onChange={(e) => setEditForm((f) => ({ ...f, phase: e.target.value }))}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Ngày học</label>
                          <input
                            value={editForm.date}
                            onChange={(e) => setEditForm((f) => ({ ...f, date: e.target.value }))}
                            placeholder="VD: 2026-03-11"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Nội dung buổi học</label>
                          <input
                            value={editForm.topic}
                            onChange={(e) => setEditForm((f) => ({ ...f, topic: e.target.value }))}
                            placeholder="VD: Task 2: Bài luận quan điểm"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                          />
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Kỹ năng</label>
                          <div className="flex flex-wrap gap-2">
                            {skillList.map((sk) => (
                              <button
                                type="button"
                                key={sk}
                                onClick={() => toggleEditSkill(sk)}
                                className={clsx(
                                  "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                                  editForm.skillsSet.has(sk)
                                    ? "border-blue-600 bg-blue-600 text-white"
                                    : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
                                )}
                              >
                                {sk}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Trạng thái</label>
                          <select
                            value={editForm.status}
                            onChange={(e) => setEditForm((f) => ({ ...f, status: e.target.value }))}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                          >
                            {statusOptions.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Bài tập gắn với buổi học</label>
                          <div className="max-h-40 space-y-0.5 overflow-y-auto rounded-lg border border-slate-200 p-1.5 dark:border-slate-800">
                            {exercisesList.length === 0 && (
                              <p className="p-1.5 text-xs text-slate-400">Chưa có bài tập nào cho học sinh này.</p>
                            )}
                            {exercisesList.map((ex) => (
                              <label
                                key={ex.id}
                                className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <input
                                  type="checkbox"
                                  checked={editForm.exerciseIdsSet.has(ex.id)}
                                  onChange={() => toggleEditExercise(ex.id)}
                                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-400 dark:border-slate-600"
                                />
                                <span className="min-w-0 flex-1 truncate text-slate-700 dark:text-slate-200">
                                  {ex.title || "(Chưa đặt tên)"}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Tài liệu & video gắn với buổi học</label>
                          <div className="max-h-40 space-y-0.5 overflow-y-auto rounded-lg border border-slate-200 p-1.5 dark:border-slate-800">
                            {materialsList.length === 0 && (
                              <p className="p-1.5 text-xs text-slate-400">Chưa có tài liệu / video nào cho học sinh này.</p>
                            )}
                            {materialsList.map((m) => (
                              <label
                                key={m.id}
                                className="flex cursor-pointer items-center gap-2 rounded-md px-1.5 py-1 text-xs hover:bg-slate-50 dark:hover:bg-slate-800"
                              >
                                <input
                                  type="checkbox"
                                  checked={editForm.materialIdsSet.has(m.id)}
                                  onChange={() => toggleEditMaterial(m.id)}
                                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-400 dark:border-slate-600"
                                />
                                <span className="min-w-0 flex-1 truncate text-slate-700 dark:text-slate-200">
                                  {m.title || "(Chưa đặt tên)"}
                                </span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex shrink-0 justify-end gap-2 border-t border-slate-200 px-6 py-4 dark:border-slate-800">
                        <Button variant="secondary" size="sm" onClick={cancelEdit} type="button">
                          <X size={14} /> Hủy
                        </Button>
                        <Button size="sm" onClick={saveEdit} type="button">
                          <Check size={14} /> Lưu
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex shrink-0 gap-5 border-b border-slate-200 px-6 dark:border-slate-800">
                        {DETAIL_TABS.map((t) => (
                          <button
                            key={t.key}
                            onClick={() => setDetailTab(t.key)}
                            className={clsx(
                              "border-b-2 py-2.5 text-sm font-medium transition",
                              detailTab === t.key
                                ? "accent-border accent-text dark:accent-text-dark"
                                : "border-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                            )}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>

                      <div className="min-h-0 flex-1 overflow-y-auto p-6">
                        {detailTab === "overview" && (
                          <div className="space-y-6">
                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Tổng quan nhanh</p>
                              <div className="grid grid-cols-3 gap-3">
                                <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                                  <p className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-50">
                                    {(exercisesBySession[selectedSession.id] || []).length}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Bài tập</p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                                  <p className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-50">
                                    {(materialsBySession[selectedSession.id] || []).length}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Tài liệu</p>
                                </div>
                                <div className="rounded-xl border border-slate-200 p-3 dark:border-slate-800">
                                  <p className="text-lg font-semibold tabular-nums text-slate-900 dark:text-slate-50">
                                    {selectedSession.skills.length}
                                  </p>
                                  <p className="text-xs text-slate-500 dark:text-slate-400">Kỹ năng</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Kỹ năng</p>
                              <div className="flex flex-wrap gap-1.5">
                                {selectedSession.skills.map((sk) => (
                                  <Badge key={sk} skill={sk}>
                                    {sk}
                                  </Badge>
                                ))}
                                {selectedSession.skills.length === 0 && (
                                  <p className="text-xs text-slate-400">Chưa gắn kỹ năng nào.</p>
                                )}
                              </div>
                            </div>

                            {selectedSession.sourceTemplateName && (
                              <div>
                                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Nguồn</p>
                                <Badge tone="neutral">
                                  <Library size={11} /> Từ kho: {selectedSession.sourceTemplateName}
                                </Badge>
                              </div>
                            )}
                          </div>
                        )}

                        {detailTab === "exercises" && (
                          (exercisesBySession[selectedSession.id] || []).length > 0 ? (
                            <ul className="space-y-1.5">
                              {exercisesBySession[selectedSession.id].map((ex) => (
                                <li key={ex.id}>
                                  <Link
                                    to={`/tutor/students/${studentId}/exercises/${ex.id}`}
                                    state={{ exercise: ex, studentName: student.name, sessionLabel: sessionLabel(ex.sessionId) }}
                                    className="flex items-start gap-2 rounded-lg p-2.5 text-sm text-slate-600 hover:bg-slate-100 hover:accent-text dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:accent-text-dark"
                                  >
                                    <FileText size={15} className="mt-0.5 shrink-0" />
                                    <span className="min-w-0">
                                      {ex.title}
                                      <span className="block text-xs text-slate-400">{ex.skill} &middot; {ex.difficulty}</span>
                                    </span>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-slate-400">Chưa có bài tập nào gắn với buổi học này.</p>
                          )
                        )}

                        {detailTab === "materials" && (
                          (materialsBySession[selectedSession.id] || []).length > 0 ? (
                            <ul className="space-y-1.5">
                              {materialsBySession[selectedSession.id].map((m) => (
                                <li key={m.id}>
                                  <button
                                    onClick={() => goToTab("materials")}
                                    title={m.title}
                                    className="flex w-full items-start gap-2 rounded-lg p-2.5 text-left text-sm text-slate-600 hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-indigo-400"
                                  >
                                    {m.type === "video" ? (
                                      <PlayCircle size={15} className="mt-0.5 shrink-0" />
                                    ) : (
                                      <FileText size={15} className="mt-0.5 shrink-0" />
                                    )}
                                    <span className="min-w-0">
                                      {m.title}
                                      {m.duration && <span className="block text-xs text-slate-400">{m.duration}</span>}
                                    </span>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-slate-400">Chưa có tài liệu / video nào gắn với buổi học này.</p>
                          )
                        )}
                      </div>
                    </>
                  )}
                </aside>
              </div>
            )}
            </div>
          )}

          {tab === "exercises" && (
            <div className="space-y-4">
              <div className="flex justify-end">
                <button
                  onClick={() => setShowExercisePicker((v) => !v)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:border-blue-300 hover:text-blue-600 dark:border-slate-700 dark:text-slate-300 dark:hover:text-blue-400"
                >
                  <Library size={14} /> Chọn từ Kho bài tập
                </button>
              </div>

              {showExercisePicker && (
                <Card>
                  <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-slate-50">Chọn bài tập từ Kho</h3>
                  <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
                    {exerciseBank.map((bankEx) => (
                      <div
                        key={bankEx.id}
                        className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 dark:border-slate-800"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-900 dark:text-slate-50">{bankEx.title}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {bankEx.skill} &middot; {bankEx.difficulty} &middot; {bankEx.type}
                          </p>
                        </div>
                        <Button size="sm" onClick={() => applyBankExercise(bankEx)} type="button">
                          Thêm
                        </Button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-slate-400">
                    Bài được thêm là bản sao riêng cho {student.name} — sửa nội dung sau đó không ảnh hưởng tới bài gốc trong Kho.
                  </p>
                </Card>
              )}

            <Card padded={false}>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {exercisesList.map((ex) =>
                  editingExerciseId === ex.id ? (
                    <div key={ex.id} className="space-y-3 p-4">
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Tên bài tập</label>
                        <input
                          value={exerciseForm.title}
                          onChange={(e) => setExerciseForm((f) => ({ ...f, title: e.target.value }))}
                          placeholder="VD: Writing Task 2: Bài luận quan điểm"
                          className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Kỹ năng</label>
                        <div className="flex flex-wrap gap-2">
                          {skillList.map((sk) => (
                            <button
                              type="button"
                              key={sk}
                              onClick={() => setExerciseForm((f) => ({ ...f, skill: sk }))}
                              className={clsx(
                                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                                exerciseForm.skill === sk
                                  ? "accent-pill"
                                  : "border-slate-200 text-slate-600 accent-pill-outline dark:border-slate-700 dark:text-slate-300"
                              )}
                            >
                              {sk}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Độ khó</label>
                          <select
                            value={exerciseForm.difficulty}
                            onChange={(e) => setExerciseForm((f) => ({ ...f, difficulty: e.target.value }))}
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                          >
                            {difficultyOptions.map((d) => (
                              <option key={d}>{d}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Dạng bài</label>
                          <input
                            value={exerciseForm.type}
                            onChange={(e) => setExerciseForm((f) => ({ ...f, type: e.target.value }))}
                            placeholder="VD: Trắc nghiệm"
                            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-medium text-slate-500 dark:text-slate-400">Gắn với buổi học</label>
                        <select
                          value={exerciseForm.sessionId}
                          onChange={(e) => setExerciseForm((f) => ({ ...f, sessionId: e.target.value }))}
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
                        <Button variant="secondary" size="sm" onClick={cancelExercise} type="button">
                          <X size={14} /> Hủy
                        </Button>
                        <Button size="sm" onClick={saveExercise} type="button">
                          <Check size={14} /> Lưu
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div key={ex.id} className="group flex flex-wrap items-center justify-between gap-3 p-4">
                      <div className="min-w-0">
                        <Link
                          to={`/tutor/students/${studentId}/exercises/${ex.id}`}
                          state={{ exercise: ex, studentName: student.name, sessionLabel: sessionLabel(ex.sessionId) }}
                          className="text-sm font-medium text-slate-900 hover:accent-text hover:underline dark:text-slate-50 dark:hover:accent-text-dark"
                        >
                          {ex.title}
                        </Link>
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {ex.skill} &middot; {ex.difficulty} &middot; {ex.type} &middot; Giao ngày {ex.assignedDate}
                        </p>
                        <p className="mt-1 text-xs">
                          {sessionLabel(ex.sessionId) ? (
                            <span className="inline-flex items-center gap-1 accent-text dark:accent-text-dark">
                              <FileText size={11} /> {sessionLabel(ex.sessionId)}
                            </span>
                          ) : (
                            <span className="text-slate-400">Chưa gắn buổi học</span>
                          )}
                        </p>
                        {ex.feedback && (
                          <p className="mt-1.5 rounded-md bg-slate-50 px-2 py-1.5 text-xs text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            Nhận xét: {ex.feedback}
                          </p>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        {ex.status === "graded" && (
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                            {ex.score}/{ex.maxScore}
                          </span>
                        )}
                        {ex.fromLibrary && (
                          <Badge tone="neutral">
                            <Library size={11} /> Từ kho
                          </Badge>
                        )}
                        <Badge tone={exerciseStatus[ex.status].tone}>{exerciseStatus[ex.status].label}</Badge>
                        <div className="flex items-center gap-1 opacity-40 transition group-hover:opacity-100">
                          <button
                            onClick={() => startEditExercise(ex)}
                            title="Chỉnh sửa"
                            className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                          >
                            <Pencil size={15} />
                          </button>
                          <button
                            onClick={() => deleteExercise(ex.id)}
                            title="Xóa"
                            className="rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}
                {exercisesList.length === 0 && (
                  <p className="p-6 text-center text-sm text-slate-400">Chưa có bài tập nào.</p>
                )}
              </div>
              <div className="border-t border-slate-100 p-3 dark:border-slate-800">
                <button
                  onClick={startAddExercise}
                  className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-950"
                >
                  <Plus size={14} /> Thêm bài tập
                </button>
              </div>
            </Card>
            </div>
          )}

          {tab === "progress" && (
            <Card>
              <h3 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Điểm trung bình theo kỹ năng (thang 10)</h3>
              <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">Tổng hợp từ kết quả bài tập & bài kiểm tra theo thời gian.</p>
              <ProgressChart data={student.progressHistory} />
            </Card>
          )}

          {tab === "materials" && (
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
                    Được gán dưới dạng bản sao riêng cho {student.name}, không ảnh hưởng tới mục gốc trong Kho.
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
                              className={clsx(
                                "rounded-full border px-3 py-1.5 text-xs font-medium transition",
                                materialForm.topic === sk
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
                              )}
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
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
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
          )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { Check, MapPin, Plus, Save, X } from "lucide-react";
import clsx from "clsx";
import { tutorProfile } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";

const subjectOptions = [
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

const levelOptions = [
  { value: "teacher", label: "Giáo viên" },
  { value: "student", label: "Sinh viên" },
];

const weekDays = ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"];
const dayBlocks = ["Sáng", "Chiều", "Tối"];

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:border-slate-800 dark:bg-slate-900 dark:focus:ring-blue-950";

const chipClass = (active) =>
  clsx(
    "rounded-full border px-3 py-1.5 text-xs font-medium transition",
    active
      ? "border-blue-600 bg-blue-600 text-white"
      : "border-slate-200 text-slate-600 hover:border-blue-300 dark:border-slate-700 dark:text-slate-300"
  );

function emptyCertForm() {
  return { name: "", issuer: "", year: "" };
}

export default function TutorProfile() {
  const [subjects, setSubjects] = useState(tutorProfile.subjects);
  const [level, setLevel] = useState(tutorProfile.qualificationLevel);
  const [experienceYears, setExperienceYears] = useState(tutorProfile.experienceYears);
  const [bio, setBio] = useState(tutorProfile.bio);
  const [certificates, setCertificates] = useState(tutorProfile.certificates);
  const [serviceAreas, setServiceAreas] = useState(tutorProfile.serviceAreas);
  const [availability, setAvailability] = useState(tutorProfile.availability);

  const [certForm, setCertForm] = useState(emptyCertForm());
  const [newArea, setNewArea] = useState("");
  const [saved, setSaved] = useState(false);

  function toggleSubject(s) {
    setSaved(false);
    setSubjects((prev) => (prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]));
  }

  function toggleSlot(day, block) {
    setSaved(false);
    const key = `${day}|${block}`;
    setAvailability((prev) => (prev.includes(key) ? prev.filter((x) => x !== key) : [...prev, key]));
  }

  function addCertificate() {
    if (!certForm.name.trim()) return;
    setCertificates((prev) => [
      ...prev,
      { id: `c${Date.now()}`, name: certForm.name.trim(), issuer: certForm.issuer.trim(), year: certForm.year.trim() },
    ]);
    setCertForm(emptyCertForm());
    setSaved(false);
  }

  function removeCertificate(id) {
    setCertificates((prev) => prev.filter((c) => c.id !== id));
    setSaved(false);
  }

  function addServiceArea() {
    const value = newArea.trim();
    if (!value || serviceAreas.includes(value)) return;
    setServiceAreas((prev) => [...prev, value]);
    setNewArea("");
    setSaved(false);
  }

  function removeServiceArea(area) {
    setServiceAreas((prev) => prev.filter((a) => a !== area));
    setSaved(false);
  }

  function handleSave() {
    setSaved(true);
  }

  return (
    <div>
      <PageHeader
        title="Hồ sơ năng lực"
        description="Khai báo môn/kỹ năng giảng dạy, trình độ, kinh nghiệm, khu vực và lịch rảnh — Admin dùng thông tin này để giới thiệu bạn với yêu cầu phù hợp từ phụ huynh."
        actions={
          <Button size="sm" onClick={handleSave}>
            <Save size={14} /> Lưu thay đổi
          </Button>
        }
      />

      {saved && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
          <Check size={16} /> Đã lưu thay đổi hồ sơ năng lực.
        </div>
      )}

      <div className="space-y-4">
        <Card>
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Môn / kỹ năng có thể dạy</h2>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Chọn các môn hoặc kỹ năng bạn có thể nhận dạy.
          </p>
          <div className="flex flex-wrap gap-2">
            {subjectOptions.map((s) => (
              <button type="button" key={s} onClick={() => toggleSubject(s)} className={chipClass(subjects.includes(s))}>
                {s}
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Trình độ &amp; kinh nghiệm</h2>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Thông tin nền tảng để Admin đánh giá mức độ phù hợp với yêu cầu của phụ huynh.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Trình độ</label>
              <div className="flex flex-wrap gap-2">
                {levelOptions.map((o) => (
                  <button
                    type="button"
                    key={o.value}
                    onClick={() => {
                      setLevel(o.value);
                      setSaved(false);
                    }}
                    className={chipClass(level === o.value)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">
                Số năm kinh nghiệm
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={experienceYears}
                onChange={(e) => {
                  setExperienceYears(e.target.value);
                  setSaved(false);
                }}
                className={clsx(inputClass, "w-28")}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="mb-1.5 block text-xs font-medium text-slate-500 dark:text-slate-400">Giới thiệu ngắn</label>
            <textarea
              value={bio}
              onChange={(e) => {
                setBio(e.target.value);
                setSaved(false);
              }}
              rows={3}
              placeholder="Kinh nghiệm giảng dạy, thế mạnh, phong cách dạy..."
              className={inputClass}
            />
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Bằng cấp / chứng chỉ</h2>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Danh sách bằng cấp, chứng chỉ liên quan tới năng lực giảng dạy.
          </p>

          {certificates.length > 0 && (
            <ul className="mb-4 divide-y divide-slate-100 rounded-lg border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
              {certificates.map((c) => (
                <li key={c.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-slate-50">{c.name}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                      {[c.issuer, c.year].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                  <button
                    onClick={() => removeCertificate(c.id)}
                    title="Xóa"
                    className="shrink-0 rounded-md p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950 dark:hover:text-rose-400"
                  >
                    <X size={15} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <div className="grid gap-2 sm:grid-cols-[2fr_1.5fr_1fr_auto]">
            <input
              value={certForm.name}
              onChange={(e) => setCertForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Tên bằng cấp/chứng chỉ"
              className={inputClass}
            />
            <input
              value={certForm.issuer}
              onChange={(e) => setCertForm((f) => ({ ...f, issuer: e.target.value }))}
              placeholder="Đơn vị cấp"
              className={inputClass}
            />
            <input
              value={certForm.year}
              onChange={(e) => setCertForm((f) => ({ ...f, year: e.target.value }))}
              placeholder="Năm"
              className={inputClass}
            />
            <Button variant="secondary" size="md" type="button" onClick={addCertificate} disabled={!certForm.name.trim()}>
              <Plus size={14} /> Thêm
            </Button>
          </div>
        </Card>

        <Card>
          <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Khu vực nhận lớp</h2>
          <p className="mb-4 text-xs text-slate-500 dark:text-slate-400">
            Khu vực bạn có thể di chuyển tới dạy, hoặc chọn "Dạy online" — Admin dùng để tra cứu khi có yêu cầu mới.
          </p>
          <div className="mb-3 flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
              >
                <MapPin size={12} /> {area}
                <button
                  onClick={() => removeServiceArea(area)}
                  title="Xóa"
                  className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {serviceAreas.length === 0 && <p className="text-sm text-slate-400">Chưa khai báo khu vực nào.</p>}
          </div>
          <div className="flex max-w-sm gap-2">
            <input
              value={newArea}
              onChange={(e) => setNewArea(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addServiceArea();
                }
              }}
              placeholder="VD: Quận 7, TP.HCM"
              className={inputClass}
            />
            <Button variant="secondary" type="button" onClick={addServiceArea} disabled={!newArea.trim()}>
              <Plus size={14} /> Thêm
            </Button>
          </div>
        </Card>

        <Card padded={false} className="overflow-hidden">
          <div className="p-5 pb-4">
            <h2 className="mb-1 text-sm font-semibold text-slate-900 dark:text-slate-50">Lịch rảnh</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Chọn khung giờ bạn có thể nhận lớp mới — Admin dùng để sắp lịch dạy thử phù hợp.
            </p>
          </div>
          <div className="overflow-x-auto px-5 pb-5">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr>
                  <th className="w-20"></th>
                  {weekDays.map((day) => (
                    <th
                      key={day}
                      className="pb-2 text-center text-xs font-medium text-slate-500 dark:text-slate-400"
                    >
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dayBlocks.map((block) => (
                  <tr key={block}>
                    <td className="py-1 pr-3 text-xs font-medium text-slate-500 dark:text-slate-400">{block}</td>
                    {weekDays.map((day) => {
                      const key = `${day}|${block}`;
                      const active = availability.includes(key);
                      return (
                        <td key={day} className="p-1 text-center">
                          <button
                            type="button"
                            onClick={() => toggleSlot(day, block)}
                            title={`${day} - ${block}`}
                            className={clsx(
                              "flex h-8 w-full items-center justify-center rounded-md border transition",
                              active
                                ? "border-blue-600 bg-blue-600 text-white"
                                : "border-slate-200 text-transparent hover:border-blue-300 dark:border-slate-700"
                            )}
                          >
                            <Check size={14} />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

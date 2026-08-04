import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, Sparkles, SlidersHorizontal } from "lucide-react";
import { tutors } from "../../data/mockData";
import { useStudentMatching } from "../../context/StudentMatchingContext";
import PageHeader from "../../components/ui/PageHeader";
import TutorCard from "../../components/cards/TutorCard";
import TutorDetailModal from "./TutorDetailModal";

export default function StudentMarketplace() {
  const navigate = useNavigate();
  const { selectTutorAndStartOnboarding } = useStudentMatching();

  const [selectedTutorForDetail, setSelectedTutorForDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpec, setSelectedSpec] = useState("all");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [selectedMode, setSelectedMode] = useState("all");
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  // Filter tutors
  const filteredTutors = useMemo(() => {
    return tutors.filter((t) => {
      // Search
      const matchesSearch =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.specialization.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        t.bio.toLowerCase().includes(searchQuery.toLowerCase());

      // Specialization
      const matchesSpec =
        selectedSpec === "all" || t.specialization.some((s) => s.toLowerCase().includes(selectedSpec.toLowerCase()));

      // Grade
      const matchesGrade = selectedGrade === "all" || t.gradeLevels?.includes(selectedGrade);

      // Mode
      const matchesMode =
        selectedMode === "all" || t.learningMode === selectedMode || t.learningMode === "both";

      // Available
      const matchesAvailable = !onlyAvailable || t.scheduleBadgeTone !== "rose";

      return matchesSearch && matchesSpec && matchesGrade && matchesMode && matchesAvailable;
    });
  }, [searchQuery, selectedSpec, selectedGrade, selectedMode, onlyAvailable]);

  function handleConnectTutor(tutorItem) {
    selectTutorAndStartOnboarding(tutorItem);
    navigate("/student/onboarding");
  }

  return (
    <div>
      {/* Hero Banner */}
      <div className="mb-8 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 text-white shadow-xl dark:from-blue-900 dark:via-indigo-900 dark:to-purple-900">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold backdrop-blur-md">
              <Sparkles size={14} /> Active Tutor Matching System
            </div>
            <h1 className="text-2xl font-bold md:text-3xl">Khám phá & Ghép đôi Gia sư Cá nhân hóa</h1>
            <p className="mt-1 text-xs text-blue-100 md:text-sm">
              Tìm gia sư phù hợp với mục tiêu, lịch rảnh và lực học của bạn. Làm bài Quiz Placement Test 15 phút để sinh Lộ trình Adaptive tự động.
            </p>
          </div>
          <div className="shrink-0">
            <div className="rounded-xl bg-white/10 p-4 text-center backdrop-blur-md border border-white/20">
              <p className="text-2xl font-black">{tutors.length}</p>
              <p className="text-xs text-blue-100">Gia sư chất lượng cao</p>
            </div>
          </div>
        </div>
      </div>

      <PageHeader
        title="Danh sách Gia sư Sẵn sàng Ghép đôi"
        description="Lọc theo môn học, khung giờ rảnh và mức học phí mong muốn."
      />

      {/* Filter Bar */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-5">
          {/* Search Input */}
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên gia sư, môn học..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs outline-none focus:border-blue-500 focus:bg-white dark:border-slate-700 dark:bg-slate-800 dark:focus:bg-slate-900"
            />
          </div>

          {/* Learning Mode Filter */}
          <div className="flex items-center gap-2">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-medium outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="all">Tất cả Hình thức</option>
              <option value="online">💻 Học Online Trực tuyến</option>
              <option value="offline">🏠 Học Offline Tại nhà / Trung tâm</option>
            </select>
          </div>

          {/* Specialization Filter */}
          <div className="flex items-center gap-2">
            <Filter size={14} className="shrink-0 text-slate-400" />
            <select
              value={selectedSpec}
              onChange={(e) => setSelectedSpec(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="all">Tất cả Chuyên môn</option>
              <option value="IELTS">IELTS</option>
              <option value="Giao tiếp">Giao tiếp</option>
              <option value="Ngữ pháp">Ngữ pháp / Lấy gốc</option>
              <option value="Writing">Writing chuyên sâu</option>
              <option value="Speaking">Speaking & Debate</option>
            </select>
          </div>

          {/* Grade Level Filter */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal size={14} className="shrink-0 text-slate-400" />
            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800"
            >
              <option value="all">Tất cả Cấp học</option>
              <option value="Cấp 1">Cấp 1 (Tiểu học)</option>
              <option value="Cấp 2">Cấp 2 (THCS)</option>
              <option value="Cấp 3">Cấp 3 (THPT)</option>
              <option value="Đại học">Đại học / Người đi làm</option>
            </select>
          </div>

          {/* Only Available Toggle */}
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="accent-blue-600"
            />
            <span>Chỉ hiện gia sư còn lịch</span>
          </label>
        </div>
      </div>

      {/* Tutor Grid */}
      {filteredTutors.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onViewDetail={(t) => setSelectedTutorForDetail(t)}
              onSelectTutor={(t) => handleConnectTutor(t)}
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-slate-400">
          <p className="text-sm">Không tìm thấy Gia sư nào phù hợp với bộ lọc.</p>
        </div>
      )}

      {/* Tutor Detail Modal */}
      {selectedTutorForDetail && (
        <TutorDetailModal
          tutor={selectedTutorForDetail}
          onClose={() => setSelectedTutorForDetail(null)}
          onSelectTutor={(t) => handleConnectTutor(t)}
        />
      )}
    </div>
  );
}

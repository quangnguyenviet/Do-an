import React, { useState } from "react";
import {
  PlayCircle,
  FileText,
  Filter,
  Download,
  X,
  ExternalLink,
  Video,
  BookOpen,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { getStudentById } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Button from "../../components/ui/Button";

export default function StudentMaterials() {
  const { session } = useAuth();
  const student = getStudentById(session?.studentId || "s1");

  const [selectedTutor, setSelectedTutor] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [previewVideo, setPreviewVideo] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const rawMaterials = student?.materials || [];

  const tutorList = [
    { id: "all", name: "Tất cả Gia sư" },
    { id: "t1", name: "Nguyễn Lan Anh (IELTS)" },
    { id: "t2", name: "Trần Minh Quân (Writing)" },
    { id: "t3", name: "Phạm Thu Hà (Giao tiếp)" },
  ];

  const typeList = [
    { id: "all", name: "Tất cả loại" },
    { id: "video", name: "🎥 Video Bài giảng" },
    { id: "doc", name: "📄 Tài liệu / Slide" },
  ];

  // Filter materials
  const filteredMaterials = rawMaterials.filter((m) => {
    const matchTutor = selectedTutor === "all" || m.tutorId === selectedTutor;
    const matchType = selectedType === "all" || m.type === selectedType;
    return matchTutor && matchType;
  });

  const handleDownloadDoc = (docTitle) => {
    setToastMessage(`Đã bắt đầu tải xuống tài liệu "${docTitle}"!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <Download size={20} />
          <span className="text-sm font-medium">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-80">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Page Header */}
      <PageHeader
        title="Tài liệu & Video Bài giảng (Multi-Tutor)"
        description="Kho tài liệu số hóa cá nhân hóa: Video xem lại, slide bài giảng & Ebook được đính kèm bởi các Gia sư của bạn."
      />

      {/* Filter Toolbar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Tutor Filter */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Filter size={14} /> Gia sư:
            </span>
            {tutorList.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTutor(t.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedTutor === t.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5 flex-wrap self-end md:self-auto">
            {typeList.map((tp) => (
              <button
                key={tp.id}
                onClick={() => setSelectedType(tp.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedType === tp.id
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                }`}
              >
                {tp.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      {/* Materials Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMaterials.map((m) => {
          const isVideo = m.type === "video";
          return (
            <Card
              key={m.id}
              className={`p-5 flex flex-col justify-between hover:shadow-lg transition-all border-t-4 ${
                m.colorTheme === "indigo"
                  ? "border-t-indigo-500"
                  : m.colorTheme === "blue"
                  ? "border-t-blue-500"
                  : "border-t-emerald-500"
              }`}
            >
              <div className="space-y-3">
                {/* Header: Type icon & Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
                      isVideo
                        ? "bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400"
                        : "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400"
                    }`}
                  >
                    {isVideo ? <PlayCircle size={24} /> : <FileText size={24} />}
                  </div>

                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    <Badge tone={m.colorTheme === "indigo" ? "indigo" : m.colorTheme === "blue" ? "blue" : "emerald"} size="xs">
                      {m.subject}
                    </Badge>
                    <Badge tone="slate" size="xs">
                      {isVideo ? "Video HD" : "File PDF"}
                    </Badge>
                  </div>
                </div>

                {/* Title */}
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                    {m.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 flex items-center gap-2">
                    <span>Chủ đề: {m.topic}</span>
                    <span>&middot;</span>
                    <span>{m.date}</span>
                  </p>
                </div>

                {/* Tutor Attribution Tag */}
                <div className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                  <img
                    src={m.tutorAvatar}
                    alt={m.tutorName}
                    className="w-6 h-6 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0 flex-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
                      Giao bởi {m.tutorName}
                    </span>
                    {isVideo ? (
                      <span className="text-[11px] text-slate-400 font-mono">⏱️ {m.duration}</span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-mono">📄 {m.pages} trang</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Footer Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                {isVideo ? (
                  <Button
                    size="sm"
                    onClick={() => setPreviewVideo(m)}
                    className="w-full flex items-center justify-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-xs"
                  >
                    <PlayCircle size={15} /> Xem Video bài giảng
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadDoc(m.title)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs font-bold"
                  >
                    <Download size={14} /> Tải file PDF ({m.pages} trang)
                  </Button>
                )}
              </div>
            </Card>
          );
        })}

        {filteredMaterials.length === 0 && (
          <Card className="col-span-full p-12 text-center">
            <p className="text-sm font-semibold text-slate-500">Chưa có tài liệu nào thuộc bộ lọc này.</p>
          </Card>
        )}
      </div>

      {/* Video Preview Modal */}
      {previewVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-50 dark:bg-rose-950/50 text-rose-600 rounded-xl">
                  <Video size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {previewVideo.title}
                  </h3>
                  <p className="text-xs text-slate-500">Bài giảng từ {previewVideo.tutorName}</p>
                </div>
              </div>
              <button
                onClick={() => setPreviewVideo(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mock Video Iframe Container */}
            <div className="relative aspect-video rounded-xl bg-black overflow-hidden shadow-inner flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title={previewVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>Chủ đề: <strong>{previewVideo.topic}</strong> &middot; Thời lượng: <strong>{previewVideo.duration}</strong></span>
              <Button size="sm" variant="outline" onClick={() => setPreviewVideo(null)}>
                Đóng Player
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

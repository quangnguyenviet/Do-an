import { Star, Clock, TrendingUp, Calendar, ArrowRight } from "lucide-react";
import Card from "../ui/Card";
import Badge from "../ui/Badge";
import Button from "../ui/Button";
import Avatar from "../ui/Avatar";

export default function TutorCard({ tutor, onViewDetail, onSelectTutor }) {
  const isFull = tutor.scheduleBadgeTone === "rose";

  return (
    <Card className="flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:hover:shadow-slate-900/50">
      <div>
        {/* Header: Avatar, Name, Rating & Status Badge */}
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar initials={tutor.initials} size="md" />
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-50">{tutor.name}</h3>
              <div className="mt-0.5 flex items-center gap-1.5 text-xs text-amber-500">
                <Star size={14} className="fill-amber-400 text-amber-400" />
                <span className="font-medium text-slate-700 dark:text-slate-200">{tutor.rating}</span>
                <span className="text-slate-400">({tutor.reviewsCount} đánh giá)</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <Badge tone={tutor.scheduleBadgeTone || "emerald"}>
              {tutor.scheduleBadge || "RẢNH LỊCH"}
            </Badge>
            <Badge tone={tutor.learningMode === "offline" ? "amber" : "blue"} size="xs">
              {tutor.learningMode === "offline" ? "🏠 Offline" : tutor.learningMode === "both" ? "🌐 Hybrid" : "💻 Online"}
            </Badge>
          </div>
        </div>

        {/* Bio */}
        <p className="mb-3 line-clamp-2 text-xs text-slate-600 dark:text-slate-300">
          {tutor.bio}
        </p>

        {/* Quick Academic Background */}
        {tutor.university && (
          <div className="mb-3 space-y-1 rounded-lg bg-slate-50/80 p-2 text-[11px] text-slate-600 dark:bg-slate-800/40 dark:text-slate-300 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200 truncate">
              <span>🎓</span> <span className="truncate">{tutor.university}</span>
            </div>
            {tutor.awards && tutor.awards.length > 0 && (
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-medium truncate">
                <span>🏆</span> <span className="truncate">{tutor.awards[0].title}</span>
              </div>
            )}
          </div>
        )}

        {/* Specialization Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {tutor.specialization.map((spec, i) => (
            <span
              key={i}
              className="rounded-md bg-blue-50 px-2 py-0.5 text-[11px] font-medium text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
            >
              {spec}
            </span>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-2.5 text-center text-xs dark:bg-slate-800/50">
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <Clock size={12} />
              <span>Đã dạy</span>
            </div>
            <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">{tutor.teachingHours}</p>
          </div>
          <div className="border-x border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <TrendingUp size={12} />
              <span>Tiến bộ</span>
            </div>
            <p className="mt-0.5 font-semibold text-emerald-600 dark:text-emerald-400">{tutor.progressRate}</p>
          </div>
          <div>
            <div className="flex items-center justify-center gap-1 text-slate-400">
              <Calendar size={12} />
              <span>Học phí</span>
            </div>
            <p className="mt-0.5 font-semibold text-slate-800 dark:text-slate-200">{tutor.ratePerHour}</p>
          </div>
        </div>
      </div>

      {/* Footer Action Buttons */}
      <div className="flex items-center gap-2 pt-2">
        <Button
          variant="secondary"
          className="flex-1 text-xs"
          onClick={() => onViewDetail(tutor)}
        >
          Xem hồ sơ
        </Button>
        <Button
          disabled={isFull}
          className="flex-1 text-xs"
          onClick={() => onSelectTutor(tutor)}
        >
          {isFull ? "Hết chỗ" : "Kết nối ngay"} <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </Card>
  );
}

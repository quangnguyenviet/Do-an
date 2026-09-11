import { Sparkles, CheckCircle2, TrendingUp, AlertCircle, Award } from "lucide-react";
import { weeklyScores, skills, aiFeedback } from "../../../lib/dashboard-data";

export function ProgressView() {
  const maxScore = 10;

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Tiến độ & Phân tích AI</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Theo dõi sự tăng trưởng năng lực theo tuần và nhận xét tự động từ AI theo sát từng kỹ năng.
        </p>
      </div>

      {/* Main Grid: Weekly Chart + 4 Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weekly Bar Chart (Col 7) */}
        <div className="lg:col-span-7 rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-foreground text-lg">Điểm đánh giá theo tuần</h2>
              <p className="text-xs text-muted-foreground">Tuần hiện tại được nổi bật bằng màu Cyan</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-accent">
              <TrendingUp className="w-4 h-4 text-accent" />
              <span>Tăng +0.4 so với tuần trước</span>
            </div>
          </div>

          {/* Render Bar Chart */}
          <div className="h-64 pt-8 pb-4 flex items-end justify-between gap-3 sm:gap-6 border-b border-border">
            {weeklyScores.map((item, idx) => {
              const heightPercent = (item.score / maxScore) * 100;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <span
                    className={`text-xs font-mono font-bold transition-all ${
                      item.isCurrent ? "text-accent text-sm" : "text-muted-foreground"
                    }`}
                  >
                    {item.score}
                  </span>
                  <div className="w-full bg-muted rounded-t-lg h-full max-h-[180px] flex items-end overflow-hidden p-1">
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full rounded-t transition-all duration-500 ${
                        item.isCurrent
                          ? "bg-accent shadow-[0_0_15px_rgba(0,191,255,0.4)]"
                          : "bg-primary/60 hover:bg-primary"
                      }`}
                    />
                  </div>
                  <span
                    className={`text-[11px] font-medium text-center truncate max-w-full ${
                      item.isCurrent ? "text-accent font-bold" : "text-muted-foreground"
                    }`}
                  >
                    {item.week}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-accent" /> Tuần hiện tại (Cyan Highlight)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-primary/60" /> Các tuần trước
            </span>
          </div>
        </div>

        {/* 4 Skills Breakdown (Col 5) */}
        <div className="lg:col-span-5 rounded-xl border border-border bg-card p-6 space-y-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-foreground text-lg">Chi tiết 4 kỹ năng</h2>
            <Award className="w-5 h-5 text-amber-400" />
          </div>

          <div className="space-y-5">
            {skills.map((skill, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-foreground">{skill.name}</span>
                  <span className="font-mono text-foreground">{skill.score} / 100</span>
                </div>
                <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                  <div
                    style={{ width: `${skill.score}%` }}
                    className={`h-full rounded-full transition-all duration-500 ${skill.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Feedback Card */}
      <div className="rounded-xl border border-accent/40 bg-card p-6 space-y-6 shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-3 pb-4 border-b border-border">
          <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/30 text-accent">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-lg">Nhận xét chi tiết từ AI Tutor</h2>
            <p className="text-xs text-muted-foreground">Tự động phân tích từ dữ liệu học tập và phản xạ nói</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-muted/50 border border-border text-sm text-foreground leading-relaxed">
          {aiFeedback.summary}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Strengths */}
          <div className="space-y-3 p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
            <h3 className="font-bold text-emerald-500 text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Điểm mạnh nổi bật
            </h3>
            <ul className="space-y-2 text-xs text-foreground">
              {aiFeedback.strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Improvements */}
          <div className="space-y-3 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
            <h3 className="font-bold text-amber-500 text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Cần tập trung cải thiện
            </h3>
            <ul className="space-y-2 text-xs text-foreground">
              {aiFeedback.improvements.map((imp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">•</span>
                  <span>{imp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProgressView;

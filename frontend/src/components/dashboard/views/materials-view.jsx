import { FileText, Video, Headphones, Download, ExternalLink } from "lucide-react";
import { materials } from "../../../lib/dashboard-data";

export function MaterialsView() {
  const getIcon = (type) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-6 h-6 text-rose-500" />;
      case "video":
        return <Video className="w-6 h-6 text-primary" />;
      case "audio":
        return <Headphones className="w-6 h-6 text-accent" />;
      default:
        return <FileText className="w-6 h-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-border">
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Kho tài liệu học tập</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Tổng hợp bài giảng, ebook, file âm thanh và bài tập ôn luyện theo từng buổi học.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {materials.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 shadow-sm"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-muted border border-border shrink-0">{getIcon(item.type)}</div>
              <div className="space-y-1">
                <span className="text-[11px] font-semibold text-accent uppercase tracking-wider">
                  {item.lesson} • {item.date}
                </span>
                <h3 className="font-bold text-foreground text-base leading-snug">{item.title}</h3>
                <p className="text-xs text-muted-foreground">Dung lượng / Độ dài: {item.size}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-border/60">
              <button
                type="button"
                className="flex-1 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Tải xuống</span>
              </button>
              <button
                type="button"
                className="p-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors"
                title="Mở trong tab mới"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MaterialsView;

import { Search, MonitorPlay, Sparkles, ShieldCheck, Check } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Tìm & ghép gia sư thông minh",
    description: "Bộ lọc chi tiết theo trình độ, mục tiêu học (giao tiếp, thi cử, lấy lại gốc) và khung giờ rảnh của bé.",
    bullets: ["Hồ sơ gia sư minh bạch", "Đánh giá thực từ phụ huynh khác", "Đổi gia sư miễn phí nếu không hợp"],
  },
  {
    icon: MonitorPlay,
    title: "Lớp học Workspace trực tuyến",
    description: "Môi trường tương tác đa phương tiện với bảng trắng kỹ thuật số, bài tập tương tác và ghi hình buổi học.",
    bullets: ["Bảng vẽ tương tác 2 chiều", "Ghi âm & xem lại video buổi học", "Kho tài liệu phong phú tích hợp"],
  },
  {
    icon: Sparkles,
    title: "Báo cáo tiến độ bằng AI",
    description: "Công nghệ phân tích âm thanh và dữ liệu bài tập để chấm điểm chi tiết 4 kỹ năng Nghe - Nói - Đọc - Viết.",
    bullets: ["Phát hiện từ vựng & ngữ pháp yếu", "Theo dõi biểu đồ tiến bộ theo tuần", "Gợi ý lộ trình bổ trợ cá nhân"],
  },
  {
    icon: ShieldCheck,
    title: "Thanh toán ký quỹ an toàn",
    description: "Học phí được giữ trong tài khoản ký quỹ an toàn và chỉ giải ngân cho gia sư sau khi buổi học hoàn thành.",
    bullets: ["Hoàn tiền 100% nếu gia sư nghỉ", "Không bắt buộc đóng hợp đồng dài hạn", "Thanh toán linh hoạt từng gói"],
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 lg:py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Nền tảng toàn diện
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-3">
            4 tính năng lõi nâng tầm hiệu quả học tập
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Kết hợp giữa đội ngũ gia sư giỏi và công nghệ học tập hiện đại.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-xl border border-border bg-card hover:border-primary/40 transition-all space-y-5"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-muted border border-border text-primary">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>

                <div className="pt-2 border-t border-border/60 space-y-2">
                  {item.bullets.map((b, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-foreground">
                      <div className="w-4 h-4 rounded-full bg-primary/15 text-primary flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default Features;

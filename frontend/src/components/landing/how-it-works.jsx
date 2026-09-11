import { Target, UserCheck, Sparkles, Monitor, LineChart } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Chọn mục tiêu & trình độ",
    description: "Đánh giá đầu vào nhanh chóng để xác định điểm mạnh và vùng cần cải thiện của học sinh.",
    icon: Target,
  },
  {
    step: "02",
    title: "Ghép gia sư phù hợp",
    description: "Hệ thống đề xuất các gia sư có chứng chỉ TOEFL/IELTS, kinh nghiệm dạy phù hợp với cá tính của bé.",
    icon: UserCheck,
  },
  {
    step: "03",
    title: "Học thử miễn phí",
    description: "Buổi trải nghiệm 45 phút hoàn toàn miễn phí để bé và gia sư làm quen, đánh giá mức độ tương tác.",
    icon: Sparkles,
  },
  {
    step: "04",
    title: "Học 1 kèm 1 Workspace",
    description: "Lớp học trực tuyến tương tác cao, tích hợp bảng vẽ, tài liệu và thực hành phản xạ liên tục.",
    icon: Monitor,
  },
  {
    step: "05",
    title: "Nhận báo cáo AI hàng tuần",
    description: "Phụ huynh nhận báo cáo tự động phân tích chi tiết kỹ năng Nghe - Nói - Đọc - Viết qua ứng dụng.",
    icon: LineChart,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Quy trình minh bạch
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-3">
            5 bước đơn giản bắt đầu hành trình học tập
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Quy trình được thiết kế tối ưu giúp phụ huynh dễ dàng đăng ký và đồng hành cùng con.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative rounded-xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-2xl font-extrabold text-accent">{item.step}</span>
                    <div className="p-2.5 rounded-lg bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground text-base mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default HowItWorks;

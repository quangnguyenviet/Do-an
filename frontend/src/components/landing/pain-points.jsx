import { Eye, ShieldQuestion, MessageCircleOff, Wallet } from "lucide-react";

const painPoints = [
  {
    icon: Eye,
    title: "Không biết con học tới đâu",
    description: "Phụ huynh bận rộn không thể ngồi kèm con, thông tin từ trung tâm thường chung chung và thiếu tính liên tục.",
  },
  {
    icon: ShieldQuestion,
    title: "Gia sư không cam kết chất lượng",
    description: "Khó kiểm chứng bằng cấp, phương pháp dạy và thái độ của gia sư nếu chỉ qua giới thiệu truyền miệng.",
  },
  {
    icon: MessageCircleOff,
    title: "Con mất gốc, sợ nói tiếng Anh",
    description: "Lớp học đông khiến con ngượng ngùng, ít có cơ hội thực hành phản xạ nói trực tiếp với giáo viên.",
  },
  {
    icon: Wallet,
    title: "Học phí đóng trước, rủi ro cao",
    description: "Nhiều trung tâm bắt đóng trọn gói 6-12 tháng nhưng chất lượng không như cam kết, khó hoàn tiền.",
  },
];

export function PainPoints() {
  return (
    <section className="py-16 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Những lo lắng phổ biến của phụ huynh khi chọn lớp học tiếng Anh
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            EnglishPath giải quyết triệt để từng điểm nghẽn bằng công nghệ và quy trình minh bạch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {painPoints.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="w-12 h-12 rounded-xl bg-muted border border-border flex items-center justify-center text-primary">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground text-base">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default PainPoints;

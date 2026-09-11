import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Chị Nguyễn Lan Anh",
    role: "Phụ huynh bé Minh Anh (Lớp 6, Hà Nội)",
    avatar: "LA",
    content:
      "Bé Minh Anh từng rất ngại nói tiếng Anh vì sợ sai. Từ khi học 1 kèm 1 với cô Thu Hà trên EnglishPath, bé tự tin hẳn. Báo cáo tiến độ gửi về hàng tuần giúp tôi nắm rõ con đã cải thiện phát âm ra sao.",
    rating: 5,
  },
  {
    name: "Anh Trần Hoàng Nam",
    role: "Phụ huynh bé Đức Huy (Lớp 8, TP.HCM)",
    avatar: "HN",
    content:
      "Điều tôi thích nhất là chính sách thanh toán ký quỹ và báo cáo AI chi tiết. Học phí chỉ được thanh toán sau mỗi buổi học thành công nên tôi rất yên tâm về mặt tài chính và chất lượng dạy.",
    rating: 5,
  },
  {
    name: "Chị Phạm Thu Trang",
    role: "Phụ huynh bé Bảo Ngọc (Lớp 4, Đà Nẵng)",
    avatar: "TT",
    content:
      "Gia sư tận tâm, giáo trình rõ ràng. Bé nhà tôi học thử buổi đầu thích ngay nên tôi đăng ký gói 3 tháng luôn. Tính năng xem lại video bài học giúp con tự ôn lại trước kỳ thi ở trường rất tiện.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Lời chứng thực
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-3">
            Phụ huynh nói gì về EnglishPath?
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Cảm nhận thực tế từ hàng nghìn phụ huynh đã và đang đồng hành cùng chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-border bg-card hover:border-primary/40 transition-all flex flex-col justify-between space-y-4 relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <div className="space-y-3">
                <div className="flex items-center text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground leading-relaxed italic">&ldquo;{item.content}&rdquo;</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-sm">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground text-sm">{item.name}</h4>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Testimonials;

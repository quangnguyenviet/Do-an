import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    q: "Học phí 1 kèm 1 tại EnglishPath tính như thế nào?",
    a: "Học phí được tính theo buổi học thực tế, dao động từ 150.000đ - 250.000đ/buổi tùy theo trình độ gia sư và cấp học của bé. Phụ huynh có thể đóng theo gói linh hoạt 10 buổi, 20 buổi mà không bắt buộc cam kết dài hạn.",
  },
  {
    q: "Cam kết chất lượng và chính sách đổi gia sư ra sao?",
    a: "EnglishPath cam kết 100% gia sư đã qua xác minh bằng cấp và phỏng vấn sư phạm. Nếu sau 1-2 buổi học đầu tiên bé cảm thấy không hợp phong cách dạy, phụ huynh được đổi gia sư hoàn toàn miễn phí.",
  },
  {
    q: "Buổi học thử miễn phí kéo dài bao lâu và gồm những gì?",
    a: "Buổi học thử kéo dài 45 phút bao gồm: 10 phút kiểm tra trình độ phản xạ đầu vào của bé, 25 phút học thử trực tiếp 1 kèm 1 với gia sư, và 10 phút gia sư nhận xét tư vấn lộ trình cho phụ huynh.",
  },
  {
    q: "Cơ chế thanh toán ký quỹ an toàn hoạt động như thế nào?",
    a: "Học phí phụ huynh nạp vào sẽ được giữ an toàn trong ví ký quỹ của hệ thống. Sau mỗi buổi học hoàn thành và được phụ huynh hoặc hệ thống xác nhận, tiền mới được chuyển cho gia sư.",
  },
  {
    q: "Lịch học có linh hoạt khi con bận việc đột xuất không?",
    a: "Hoàn toàn linh hoạt. Phụ huynh hoặc học sinh có thể xin nghỉ hoặc đổi lịch học trước 4 tiếng thông qua ứng dụng mà không bị tính phí hay mất buổi học.",
  },
  {
    q: "Phụ huynh nhận báo cáo tiến độ học tập bằng cách nào?",
    a: "Sau mỗi tuần học, hệ thống AI tự động tổng hợp kết quả bài tập, điểm chuyên cần và chuyên sâu 4 kỹ năng gửi trực tiếp qua trang Dashboard phụ huynh và thông báo ứng dụng.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-background border-b border-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-wider text-primary uppercase bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Giải đáp thắc mắc
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground tracking-tight mt-3">
            Câu hỏi thường gặp
          </h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Mọi thắc mắc của phụ huynh về quy trình, học phí và cam kết chất lượng.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-border bg-card overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-foreground text-base hover:bg-muted/50 transition-colors"
                >
                  <span>{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-200 shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
export default FAQ;

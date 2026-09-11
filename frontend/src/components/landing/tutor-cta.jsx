import { Link } from "react-router-dom";
import { GraduationCap, ArrowRight } from "lucide-react";

export function TutorCTA() {
  return (
    <section className="py-14 bg-muted/60 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-10 rounded-2xl bg-card border border-border flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4 text-left">
            <div className="p-3.5 rounded-xl bg-primary/10 text-primary border border-primary/20 shrink-0 hidden sm:flex">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Bạn là gia sư hoặc giáo viên tiếng Anh?</h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-xl">
                Gia nhập cộng đồng hơn 500+ gia sư chất lượng cao tại EnglishPath. Chủ động thời gian dạy, thu nhập hấp dẫn và công cụ giảng dạy thông minh.
              </p>
            </div>
          </div>
          <Link
            to="/dashboard"
            className="px-6 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors flex items-center gap-2 shrink-0"
          >
            <span>Trở thành gia sư</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
export default TutorCTA;

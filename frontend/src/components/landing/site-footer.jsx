import { Link } from "react-router-dom";
import { GraduationCap, Globe, Share2, Mail } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-card border-t border-border text-card-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground">
                English<span className="text-primary">Path</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Nền tảng học tiếng Anh 1 kèm 1 trực tuyến hàng đầu cho học sinh. Kết nối gia sư chất lượng cao với công nghệ theo dõi tiến độ học tập AI minh bạch.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#website"
                aria-label="Website"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#share"
                aria-label="Share"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#contact"
                aria-label="Email Contact"
                className="p-2 rounded-lg bg-muted text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Sản phẩm */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Sản phẩm</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Học 1 kèm 1
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Workspace trực tuyến
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Báo cáo tiến độ AI
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-foreground transition-colors">
                  Tìm gia sư
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Hỗ trợ */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Hỗ trợ</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  Trung tâm trợ giúp
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  Chính sách hoàn tiền
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  Quy trình thanh toán
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-foreground transition-colors">
                  Điều khoản sử dụng
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Liên hệ */}
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground text-sm">Liên hệ</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
              <li>Hotline: 1900 6868</li>
              <li>Email: hotro@englishpath.edu.vn</li>
              <li>Địa chỉ: Hà Nội & TP. Hồ Chí Minh</li>
              <li>Giờ làm việc: 08:00 - 21:00 (T2 - CN)</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 EnglishPath. Tất cả các quyền được bảo lưu.</p>
          <p>Thiết kế hệ thống Midnight Academic Design System.</p>
        </div>
      </div>
    </footer>
  );
}
export default SiteFooter;

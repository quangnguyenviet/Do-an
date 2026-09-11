import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";
import ThemeToggle from "../theme-toggle";

export function SiteHeader({ onOpenContactModal }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="p-2 rounded-xl bg-primary text-primary-foreground group-hover:bg-primary/90 transition-colors">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-foreground">
            English<span className="text-primary">Path</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#how-it-works" className="hover:text-foreground transition-colors">
            Cách hoạt động
          </a>
          <a href="#features" className="hover:text-foreground transition-colors">
            Tính năng
          </a>
          <a href="#faq" className="hover:text-foreground transition-colors">
            Học phí & FAQ
          </a>
          <a href="#testimonials" className="hover:text-foreground transition-colors">
            Đánh giá
          </a>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Đăng nhập học sinh
          </Link>
          <button
            type="button"
            onClick={onOpenContactModal}
            className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors shadow-sm cursor-pointer"
          >
            Đăng ký học thử
          </button>
        </div>
      </div>
    </header>
  );
}
export default SiteHeader;

import { useState } from "react";
import { X, CheckCircle2, PhoneCall, User, GraduationCap, FileText, Send, MapPin } from "lucide-react";

const PROVINCES = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "Bình Dương",
  "Đồng Nai",
  "Quảng Ninh",
  "Thừa Thiên Huế",
  "Khác",
];

const DISTRICTS_MAP = {
  "Hà Nội": ["Cầu Giấy", "Đống Đa", "Ba Đình", "Thanh Xuân", "Hai Bà Trưng", "Hoàn Kiếm", "Nam Từ Liêm", "Bắc Từ Liêm", "Hà Đông", "Khác"],
  "TP. Hồ Chí Minh": ["Quận 1", "Quận 3", "Quận 7", "Quận 10", "Bình Thạnh", "Tân Bình", "Thủ Đức", "Gò Vấp", "Khác"],
  "Đà Nẵng": ["Hải Châu", "Thanh Khê", "Sơn Trà", "Ngũ Hành Sơn", "Khác"],
  "Khác": ["Quận / Huyện trung tâm", "Quận / Huyện ngoại thành", "Khác"],
};

export function ParentContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    parentName: "",
    phone: "",
    childName: "",
    grade: "Lớp 6",
    province: "Hà Nội",
    district: "Cầu Giấy",
    note: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setFormData({
      parentName: "",
      phone: "",
      childName: "",
      grade: "Lớp 6",
      province: "Hà Nội",
      district: "Cầu Giấy",
      note: "",
    });
    onClose();
  };

  const availableDistricts = DISTRICTS_MAP[formData.province] || DISTRICTS_MAP["Khác"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl space-y-6 text-card-foreground">
        {/* Close button */}
        <button
          type="button"
          onClick={handleResetAndClose}
          className="absolute top-4 right-4 p-2 rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            {/* Header */}
            <div className="space-y-2 pr-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Tư vấn 1 kèm 1 miễn phí</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
                Đăng ký nhận tư vấn & Học thử
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Vui lòng để lại thông tin, chuyên viên EnglishPath sẽ liên hệ tư vấn gia sư phù hợp tại khu vực của bạn.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-primary" />
                  Họ và tên Phụ huynh <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Lan Anh"
                  value={formData.parentName}
                  onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <PhoneCall className="w-3.5 h-3.5 text-primary" />
                  Số điện thoại / Zalo <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0912 345 678"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Province & District */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    Tỉnh / Thành phố
                  </label>
                  <select
                    value={formData.province}
                    onChange={(e) => {
                      const newProv = e.target.value;
                      const districts = DISTRICTS_MAP[newProv] || DISTRICTS_MAP["Khác"];
                      setFormData({
                        ...formData,
                        province: newProv,
                        district: districts[0] || "",
                      });
                    }}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Quận / Huyện</label>
                  <select
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Child Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-primary" />
                    Tên của bé (Học sinh)
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Minh Anh"
                    value={formData.childName}
                    onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-foreground">Trình độ / Khối lớp</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Tiểu học (Lớp 1 - 5)">Tiểu học (Lớp 1 - 5)</option>
                    <option value="Lớp 6">Lớp 6</option>
                    <option value="Lớp 7">Lớp 7</option>
                    <option value="Lớp 8">Lớp 8</option>
                    <option value="Lớp 9">Lớp 9</option>
                    <option value="THPT (Lớp 10 - 12)">THPT (Lớp 10 - 12)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-foreground flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-primary" />
                  Mục tiêu học tập / Ghi chú
                </label>
                <textarea
                  rows={2}
                  placeholder="Ví dụ: Bé mất gốc phát âm, cần gia sư kiên nhẫn..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-background text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Gửi thông tin tư vấn</span>
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-foreground">Đăng ký thành công!</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                Cảm ơn anh/chị <strong className="text-foreground">{formData.parentName}</strong> ({formData.district}, {formData.province}). Chuyên viên EnglishPath sẽ liên hệ tư vấn gia sư phù hợp qua SĐT <strong className="text-foreground">{formData.phone}</strong> trong 15 phút.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetAndClose}
              className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default ParentContactModal;

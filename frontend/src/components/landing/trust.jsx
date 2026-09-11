const trustStats = [
  { value: "2.000+", label: "Phụ huynh tin dùng", subtext: "Đồng hành trên cả nước" },
  { value: "500+", label: "Gia sư đã xác minh", subtext: "Có bằng đại học & IELTS/TOEFL" },
  { value: "4.9 / 5", label: "Đánh giá hài lòng", subtext: "Hơn 5.000+ lượt phản hồi" },
  { value: "98%", label: "Tỷ lệ gia hạn", subtext: "Phụ huynh tiếp tục đồng hành" },
];

export function Trust() {
  return (
    <section className="py-14 bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {trustStats.map((item, idx) => (
            <div key={idx} className="p-6 rounded-xl bg-card border border-border space-y-1">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-primary">{item.value}</div>
              <div className="text-sm font-semibold text-foreground">{item.label}</div>
              <div className="text-xs text-muted-foreground">{item.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Trust;

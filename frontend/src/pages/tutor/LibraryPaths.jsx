import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Users } from "lucide-react";
import { pathTemplates } from "../../data/mockData";
import PageHeader from "../../components/ui/PageHeader";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";

export default function LibraryPaths() {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <div>
      <PageHeader
        title="Kho lộ trình"
        description="Các mẫu lộ trình dùng chung. Mở trang một học sinh và áp dụng mẫu để tạo bản sao riêng, tùy biến thoải mái mà không ảnh hưởng tới mẫu gốc ở đây."
      />

      <div className="space-y-4">
        {pathTemplates.map((tpl) => {
          const expanded = expandedId === tpl.id;
          return (
            <Card key={tpl.id} padded={false}>
              <div className="flex flex-wrap items-start justify-between gap-3 p-5">
                <div className="min-w-0">
                  <h3 className="font-medium text-slate-900 dark:text-slate-50">{tpl.name}</h3>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{tpl.goal}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <Badge tone="blue">{tpl.level}</Badge>
                    <Badge tone="neutral">{tpl.sessions.length} buổi học</Badge>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Users size={12} /> Đã dùng cho {tpl.usageCount} học sinh
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setExpandedId(expanded ? null : tpl.id)}
                  className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  {expanded ? "Thu gọn" : "Xem chi tiết"}
                  {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>

              {expanded && (
                <div className="divide-y divide-slate-100 border-t border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                  {tpl.sessions.map((s, i) => (
                    <div key={i} className="p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-medium text-slate-900 dark:text-slate-50">
                          Buổi {i + 1}: {s.topic}
                        </p>
                        <span className="text-xs text-slate-400">{s.phase}</span>
                      </div>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {s.skills.map((sk) => (
                          <Badge key={sk} tone="blue">
                            {sk}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                  <div className="p-4">
                    <Link
                      to="/tutor/students"
                      className="text-sm font-medium accent-link"
                    >
                      Chọn học sinh để áp dụng lộ trình này →
                    </Link>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

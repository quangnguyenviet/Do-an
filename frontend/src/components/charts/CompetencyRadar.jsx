import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";
import { SKILL_ORDER } from "../../lib/skillColors";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const skill = payload[0].payload.skill;
  const current = payload.find((p) => p.dataKey === "current")?.value;
  const baseline = payload.find((p) => p.dataKey === "baseline")?.value;
  const delta = baseline != null && current != null ? current - baseline : null;

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="font-medium text-slate-700 dark:text-slate-200">{skill}</p>
      <p className="mt-0.5 font-semibold tabular-nums text-slate-900 dark:text-white">{current}/10</p>
      {baseline != null && (
        <p className="mt-1 flex items-center justify-between gap-3 text-slate-500 dark:text-slate-400">
          <span>Tuần đầu: {baseline}/10</span>
          <span
            className={clsx(
              "font-medium tabular-nums",
              delta > 0 ? "text-emerald-600 dark:text-emerald-400" : delta < 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-400"
            )}
          >
            {delta > 0 ? "+" : ""}
            {delta}
          </span>
        </p>
      )}
    </div>
  );
}

export default function CompetencyRadar({ scores, baselineScores, height = 280 }) {
  const showBaseline = Boolean(baselineScores);
  const data = SKILL_ORDER.map((skill) => ({
    skill,
    current: scores[skill] ?? 0,
    ...(showBaseline && { baseline: baselineScores[skill] ?? 0 }),
  }));

  return (
    <div className="viz-root">
      <style>{`
        .viz-root {
          --surface-1: #ffffff;
          --muted: #94a3b8;
          --grid: #e2e8f0;
        }
        [data-theme="dark"] .viz-root {
          --surface-1: #12143a;
          --muted: #64748b;
          --grid: rgba(255, 255, 255, 0.14);
        }
      `}</style>

      {showBaseline && (
        <div className="mb-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: "var(--accent-500)" }} />
            Hiện tại
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0 w-3 shrink-0 border-t-2 border-dashed" style={{ borderColor: "var(--muted)" }} />
            Tuần đầu tiên
          </span>
        </div>
      )}

      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid gridType="polygon" stroke="var(--grid)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          {showBaseline && (
            <Radar
              dataKey="baseline"
              stroke="var(--muted)"
              fill="var(--muted)"
              fillOpacity={0}
              strokeOpacity={0.7}
              strokeWidth={1.5}
              strokeDasharray="4 3"
              strokeLinejoin="round"
              isAnimationActive={false}
              dot={false}
            />
          )}
          <Radar
            dataKey="current"
            stroke="var(--accent-500)"
            fill="var(--accent-500)"
            fillOpacity={0.15}
            strokeWidth={2}
            strokeLinejoin="round"
            isAnimationActive={false}
            dot={{ r: 4, strokeWidth: 2, stroke: "var(--surface-1)", fill: "var(--accent-500)" }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

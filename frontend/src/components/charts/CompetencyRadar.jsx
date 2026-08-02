import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SKILL_ORDER } from "../../lib/skillColors";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="font-medium text-slate-700 dark:text-slate-200">{p.payload.skill}</p>
      <p className="mt-0.5 font-semibold tabular-nums text-slate-900 dark:text-white">{p.value}/10</p>
    </div>
  );
}

export default function CompetencyRadar({ scores, height = 280 }) {
  const data = SKILL_ORDER.map((skill) => ({ skill, value: scores[skill] ?? 0 }));

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

      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={data} outerRadius="72%">
          <PolarGrid gridType="polygon" stroke="var(--grid)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--muted)", fontSize: 12 }} />
          <PolarRadiusAxis domain={[0, 10]} tick={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Radar
            dataKey="value"
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

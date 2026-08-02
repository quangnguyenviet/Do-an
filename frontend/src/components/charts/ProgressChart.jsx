import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";
import { SKILL_ORDER } from "../../lib/skillColors";

// Palette: validated categorical order (dataviz skill), slots 1-6.
const SERIES = SKILL_ORDER.map((key, i) => ({ key, varName: `--series-${i + 1}` }));

function CustomTooltip({ active, payload, label, highlight }) {
  if (!active || !payload?.length) return null;
  const sorted = highlight
    ? [...payload].sort((a, b) => (a.dataKey === highlight ? -1 : b.dataKey === highlight ? 1 : 0))
    : payload;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1.5 font-medium text-slate-700 dark:text-slate-200">{label}</p>
      <div className="space-y-1">
        {sorted.map((p) => (
          <div
            key={p.dataKey}
            className={clsx(
              "flex items-center justify-between gap-4",
              p.dataKey === highlight ? "text-slate-700 dark:text-slate-100" : "text-slate-500 dark:text-slate-400"
            )}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-0.5 w-3 shrink-0 rounded-full" style={{ background: p.color }} />
              {p.dataKey}
            </span>
            <span
              className={clsx(
                "tabular-nums",
                p.dataKey === highlight ? "font-semibold text-slate-900 dark:text-white" : "font-medium"
              )}
            >
              {p.value}/10
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressChart({ data, skills = SERIES.map((s) => s.key), highlightSkill, height = 280 }) {
  const activeSeries = SERIES.filter((s) => skills.includes(s.key));
  const [hovered, setHovered] = useState(null);
  const focused = hovered ?? (activeSeries.some((s) => s.key === highlightSkill) ? highlightSkill : null);

  return (
    <div className="viz-root">
      <style>{`
        .viz-root {
          --surface-1: #ffffff;
          --muted: #94a3b8;
          --grid: #e2e8f0;
          --series-1: #2a78d6;
          --series-2: #eb6834;
          --series-3: #1baf7a;
          --series-4: #eda100;
          --series-5: #e87ba4;
          --series-6: #008300;
        }
        [data-theme="dark"] .viz-root {
          --surface-1: #12143a;
          --muted: #64748b;
          --grid: rgba(255, 255, 255, 0.1);
          --series-1: #3987e5;
          --series-2: #d95926;
          --series-3: #199e70;
          --series-4: #c98500;
          --series-5: #d55181;
          --series-6: #008300;
        }
      `}</style>

      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5" onMouseLeave={() => setHovered(null)}>
        {activeSeries.map((s) => (
          <button
            key={s.key}
            type="button"
            onMouseEnter={() => setHovered(s.key)}
            onFocus={() => setHovered(s.key)}
            onBlur={() => setHovered(null)}
            className={clsx(
              "flex items-center gap-1.5 rounded px-1 text-xs transition-colors",
              focused === s.key
                ? "font-semibold text-slate-900 dark:text-slate-50"
                : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
            )}
          >
            <span
              className="h-2 w-2 shrink-0 rounded-full transition-opacity"
              style={{ background: `var(${s.varName})`, opacity: !focused || focused === s.key ? 1 : 0.35 }}
            />
            {s.key}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 36, left: 0, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="var(--grid)" />
          <XAxis
            dataKey="date"
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--grid)" }}
            tickLine={false}
            padding={{ left: 12, right: 12 }}
          />
          <YAxis
            domain={[0, 10]}
            tick={{ fill: "var(--muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={32}
          />
          <Tooltip content={<CustomTooltip highlight={focused} />} cursor={{ stroke: "var(--grid)" }} />
          {activeSeries.map((s) => {
            const dimmed = focused && focused !== s.key;
            const isLast = (i) => i === data.length - 1;
            return (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                stroke={`var(${s.varName})`}
                strokeOpacity={dimmed ? 0.3 : 1}
                strokeWidth={dimmed ? 1.5 : 2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                isAnimationActive={false}
                dot={dimmed ? false : { r: 4, strokeWidth: 2, stroke: "var(--surface-1)", fill: `var(${s.varName})` }}
                activeDot={{ r: 6, strokeWidth: 2, stroke: "var(--surface-1)" }}
                label={
                  focused === s.key
                    ? (props) =>
                        isLast(props.index) ? (
                          <text
                            x={props.x + 8}
                            y={props.y}
                            dy={4}
                            fontSize={11}
                            fontWeight={600}
                            fill={`var(${s.varName})`}
                          >
                            {s.key}
                          </text>
                        ) : null
                    : undefined
                }
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

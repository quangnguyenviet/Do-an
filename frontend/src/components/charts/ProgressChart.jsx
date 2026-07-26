import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Palette: validated categorical order (dataviz skill), slots 1-6.
const SERIES = [
  { key: "Nghe", varName: "--series-1" },
  { key: "Nói", varName: "--series-2" },
  { key: "Đọc", varName: "--series-3" },
  { key: "Viết", varName: "--series-4" },
  { key: "Từ vựng", varName: "--series-5" },
  { key: "Ngữ pháp", varName: "--series-6" },
];

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg dark:border-slate-700 dark:bg-slate-900">
      <p className="mb-1.5 font-medium text-slate-700 dark:text-slate-200">{label}</p>
      <div className="space-y-1">
        {payload.map((p) => (
          <div key={p.dataKey} className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
              <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
              {p.dataKey}
            </span>
            <span className="font-medium tabular-nums text-slate-700 dark:text-slate-200">{p.value}/10</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProgressChart({ data, skills = SERIES.map((s) => s.key), height = 280 }) {
  const activeSeries = SERIES.filter((s) => skills.includes(s.key));

  return (
    <div className="viz-root">
      <style>{`
        .viz-root {
          --surface-1: #fcfcfb;
          --text-secondary: #52514e;
          --muted: #898781;
          --grid: #e1e0d9;
          --series-1: #2a78d6;
          --series-2: #eb6834;
          --series-3: #1baf7a;
          --series-4: #eda100;
          --series-5: #e87ba4;
          --series-6: #008300;
        }
        @media (prefers-color-scheme: dark) {
          .viz-root {
            --surface-1: #1a1a19;
            --text-secondary: #c3c2b7;
            --muted: #898781;
            --grid: #2c2c2a;
            --series-1: #3987e5;
            --series-2: #d95926;
            --series-3: #199e70;
            --series-4: #c98500;
            --series-5: #d55181;
            --series-6: #008300;
          }
        }
      `}</style>

      <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {activeSeries.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full" style={{ background: `var(${s.varName})` }} />
            {s.key}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
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
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--grid)" }} />
          {activeSeries.map((s) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              stroke={`var(${s.varName})`}
              strokeWidth={2}
              isAnimationActive={false}
              dot={{ r: 3, strokeWidth: 0, fill: `var(${s.varName})` }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ChartTooltip from "./ChartTooltip";
import { CHART, SERIES } from "@/lib/palette";
import type { Impact } from "@/types";

// Canonical activity order + validated categorical colors (5 slots).
const CATS = [
  { key: "Finding & retrieving evidence", short: "Finding evidence", color: SERIES[0] },
  { key: "Reformatting & mapping to questions", short: "Reformatting", color: SERIES[1] },
  { key: "Cross-checking traceability", short: "Traceability", color: SERIES[2] },
  { key: "Expert synthesis & judgement", short: "Expert judgement", color: SERIES[3] },
  { key: "Review & approval", short: "Review & approval", color: SERIES[4] },
];

function row(label: string, items: { activity: string; pct: number }[]) {
  const r: Record<string, number | string> = { stage: label };
  for (const c of CATS) r[c.short] = items.find((i) => i.activity === c.key)?.pct ?? 0;
  return r;
}

export default function EffortSplitChart({ effort }: { effort: Impact["effort_split"] }) {
  const data = [row("Before", effort.before), row("With agent", effort.after)];
  return (
    <ResponsiveContainer width="100%" height={170}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 12, top: 4, bottom: 4 }} barCategoryGap={22}>
        <XAxis type="number" domain={[0, 100]} hide />
        <YAxis
          type="category" dataKey="stage" width={80} axisLine={false} tickLine={false}
          tick={{ fill: CHART.text, fontSize: 12, fontWeight: 600 }}
        />
        <Tooltip content={<ChartTooltip unit="%" />} cursor={{ fill: "rgba(148,163,184,0.06)" }} />
        <Legend wrapperStyle={{ fontSize: 11, color: CHART.text }} formatter={(v) => <span style={{ color: CHART.text }}>{v}</span>} />
        {CATS.map((c, i) => (
          <Bar
            key={c.short} dataKey={c.short} name={c.short} stackId="a" fill={c.color}
            stroke={CHART.surface} strokeWidth={2}
            radius={i === 0 ? [4, 0, 0, 4] : i === CATS.length - 1 ? [0, 4, 4, 0] : 0}
            barSize={26} isAnimationActive animationDuration={900}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

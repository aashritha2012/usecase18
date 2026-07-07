import { Bar, BarChart, Cell, LabelList, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { CHART } from "@/lib/palette";
import type { Impact } from "@/types";

export default function TurnaroundChart({ turnaround }: { turnaround: Impact["turnaround"] }) {
  const data = [
    { name: "Manual baseline", days: turnaround.baseline_days, fill: CHART.manual },
    { name: "Agent-assisted", days: turnaround.agent_assisted_days, fill: CHART.agent },
  ];
  const max = Math.max(...data.map((d) => d.days));
  return (
    <ResponsiveContainer width="100%" height={140}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 40, top: 4, bottom: 4 }} barCategoryGap={16}>
        <XAxis type="number" hide domain={[0, max * 1.15]} />
        <YAxis
          type="category" dataKey="name" width={110} axisLine={false} tickLine={false}
          tick={{ fill: CHART.text, fontSize: 12 }}
        />
        <Bar dataKey="days" radius={[4, 4, 4, 4]} barSize={22} isAnimationActive animationDuration={900}>
          {data.map((d, i) => <Cell key={i} fill={d.fill} />)}
          <LabelList
            dataKey="days" position="right"
            formatter={(v: number) => `${v} days`}
            style={{ fill: CHART.text, fontSize: 12, fontWeight: 600 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

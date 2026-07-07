import {
  CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from "recharts";
import ChartTooltip from "./ChartTooltip";
import { CHART } from "@/lib/palette";
import type { Impact } from "@/types";

export default function ThroughputChart({ data }: { data: Impact["throughput_projection"] }) {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <LineChart data={data} margin={{ left: -18, right: 12, top: 8, bottom: 4 }}>
        <CartesianGrid stroke={CHART.grid} vertical={false} />
        <XAxis dataKey="period" axisLine={false} tickLine={false} tick={{ fill: CHART.text, fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: CHART.text, fontSize: 12 }} />
        <Tooltip content={<ChartTooltip unit=" dossiers" />} cursor={{ stroke: CHART.grid }} />
        <Legend
          iconType="plainline" wrapperStyle={{ fontSize: 12, color: CHART.text }}
          formatter={(v) => <span style={{ color: CHART.text }}>{v}</span>}
        />
        <Line
          type="monotone" dataKey="agent" name="Agent-assisted" stroke={CHART.agent}
          strokeWidth={2.5} dot={{ r: 3, fill: CHART.agent }} activeDot={{ r: 5 }} animationDuration={1000}
        />
        <Line
          type="monotone" dataKey="manual" name="Manual" stroke={CHART.manual}
          strokeWidth={2} strokeDasharray="5 4" dot={{ r: 3, fill: CHART.manual }} activeDot={{ r: 5 }} animationDuration={1000}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

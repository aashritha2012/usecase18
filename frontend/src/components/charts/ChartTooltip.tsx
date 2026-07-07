import type { TooltipProps } from "recharts";

/** Shared dark tooltip — text in ink tokens, colored dot carries identity. */
export default function ChartTooltip({ active, payload, label, unit = "" }: TooltipProps<number, string> & { unit?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-surface-2/95 px-3 py-2 text-xs shadow-card backdrop-blur">
      {label != null && <div className="mb-1 font-medium text-text">{label}</div>}
      <div className="space-y-1">
        {payload.map((p, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm" style={{ background: p.color }} />
            <span className="text-muted">{p.name}</span>
            <span className="ml-auto font-semibold tabular-nums text-text">
              {p.value}{unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

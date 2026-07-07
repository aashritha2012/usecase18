import { motion } from "framer-motion";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import type { Move } from "@/types";

export function StatusBadge({ status }: { status: "answered" | "gap" }) {
  if (status === "answered")
    return (
      <span className="chip border-answered/30 text-answered">
        <CheckCircle2 size={13} /> Answered
      </span>
    );
  return (
    <span className="chip border-gap/30 text-gap">
      <AlertTriangle size={13} /> Evidence gap
    </span>
  );
}

export function ConfidenceMeter({ value, className = "" }: { value: number; className?: string }) {
  const pct = Math.round(value * 100);
  const color = value >= 0.75 ? "bg-answered" : value >= 0.5 ? "bg-primary" : "bg-gap";
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="h-1.5 w-24 rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
      <span className="text-xs tabular-nums text-muted">{pct}%</span>
    </div>
  );
}

const MOVE_ORDER: Move[] = ["map", "retrieve", "synthesise", "adapt"];
const MOVE_LABEL: Record<string, string> = {
  map: "Mapping", retrieve: "Retrieving", synthesise: "Synthesising", adapt: "Adapting",
};

export function LiveMoves({ current }: { current?: Move }) {
  const activeIdx = current ? MOVE_ORDER.indexOf(current) : -1;
  return (
    <div className="flex items-center gap-1.5">
      {MOVE_ORDER.map((m, i) => {
        const active = i === activeIdx;
        const done = activeIdx > i || current === "done";
        return (
          <div key={m} className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  active ? "bg-primary animate-pulse-ring" : done ? "bg-answered" : "bg-surface-2"
                }`}
              />
              {active && <span className="text-[11px] text-primary">{MOVE_LABEL[m]}…</span>}
            </div>
            {i < MOVE_ORDER.length - 1 && <span className="text-faint text-[10px]">·</span>}
          </div>
        );
      })}
    </div>
  );
}

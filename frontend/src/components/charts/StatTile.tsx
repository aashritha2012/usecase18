import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import type { LucideIcon } from "lucide-react";

type Accent = "primary" | "answered" | "gap" | "accent" | "critical";

// Concrete class strings so Tailwind's purge keeps them.
const ACCENT: Record<Accent, { text: string; bg: string; blur: string }> = {
  primary:  { text: "text-primary",  bg: "bg-primary/15",  blur: "bg-primary/10" },
  answered: { text: "text-answered", bg: "bg-answered/15", blur: "bg-answered/10" },
  gap:      { text: "text-gap",      bg: "bg-gap/15",      blur: "bg-gap/10" },
  accent:   { text: "text-accent",   bg: "bg-accent/15",   blur: "bg-accent/10" },
  critical: { text: "text-critical", bg: "bg-critical/15", blur: "bg-critical/10" },
};

interface Props {
  label: string;
  value: number;
  suffix?: string;
  caption?: string;
  icon?: LucideIcon;
  accent?: Accent;
  index?: number;
  decimals?: number;
}

export default function StatTile({
  label, value, suffix = "", caption, icon: Icon, accent = "primary", index = 0, decimals = 0,
}: Props) {
  const n = useCountUp(value, 1100 + index * 120, decimals);
  const c = ACCENT[accent];
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="card p-5 relative overflow-hidden"
    >
      <div className={`absolute -right-6 -top-6 h-20 w-20 rounded-full blur-xl ${c.blur}`} />
      <div className="flex items-start justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
        {Icon && (
          <span className={`grid place-items-center h-8 w-8 rounded-lg ${c.bg} ${c.text}`}>
            <Icon size={16} />
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-1">
        <span className={`stat-value ${c.text}`}>{n}</span>
        <span className={`text-xl font-semibold ${c.text}`}>{suffix}</span>
      </div>
      {caption && <div className="mt-1 text-xs text-faint">{caption}</div>}
    </motion.div>
  );
}

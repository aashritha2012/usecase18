import { motion } from "framer-motion";
import { Compass, Search, PenLine, Globe2 } from "lucide-react";

const MOVES = [
  { key: "map", label: "Map", icon: Compass, desc: "Classify the payer's intent & evidence needs", color: "text-primary", ring: "ring-primary/30 bg-primary/10" },
  { key: "retrieve", label: "Retrieve", icon: Search, desc: "Pull evidence across PubMed, labels, RWE, SOPs", color: "text-accent", ring: "ring-accent/30 bg-accent/10" },
  { key: "synthesise", label: "Synthesise", icon: PenLine, desc: "Draft answer & value message with citations", color: "text-answered", ring: "ring-answered/30 bg-answered/10" },
  { key: "adapt", label: "Adapt", icon: Globe2, desc: "Flag gaps & localise to the market", color: "text-gap", ring: "ring-gap/30 bg-gap/10" },
];

export default function FourMoves({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`grid ${compact ? "grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"} gap-3`}>
      {MOVES.map((m, i) => (
        <motion.div
          key={m.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 + i * 0.08 }}
          className="card p-4 relative"
        >
          <div className="flex items-center gap-2">
            <span className={`grid place-items-center h-8 w-8 rounded-lg ring-1 ${m.ring} ${m.color}`}>
              <m.icon size={16} />
            </span>
            <span className="text-xs font-mono text-faint">0{i + 1}</span>
          </div>
          <div className={`mt-3 font-semibold ${m.color}`}>{m.label}</div>
          <div className="text-xs text-muted mt-1 leading-snug">{m.desc}</div>
          {i < MOVES.length - 1 && (
            <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-faint">›</div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

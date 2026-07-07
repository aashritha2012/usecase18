import { motion } from "framer-motion";
import { ExternalLink, Quote } from "lucide-react";
import type { Citation } from "@/types";

const SOURCE_STYLE: Record<string, string> = {
  PubMed: "text-primary border-primary/30",
  "FDA Label": "text-accent border-accent/30",
  "RWE Registry": "text-answered border-answered/30",
  "RWE / Cost-of-Illness": "text-answered border-answered/30",
  "Internal SOP": "text-gap border-gap/30",
};

export default function CitationPanel({ citations }: { citations: Citation[] }) {
  if (!citations.length) {
    return (
      <div className="text-sm text-muted italic px-1 py-3">
        No citations — this question is flagged as an evidence gap rather than answered from unsourced claims.
      </div>
    );
  }
  return (
    <div className="space-y-2.5">
      {citations.map((c, i) => (
        <motion.div
          key={`${c.source_id}-${i}`}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
          className="rounded-xl border border-border bg-surface-2/50 p-3"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <span className={`chip ${SOURCE_STYLE[c.source_label ?? ""] ?? "text-muted border-border"}`}>
              {c.source_label}
            </span>
            <span className="text-[11px] font-mono text-faint">{c.loc}</span>
          </div>
          <div className="flex gap-2">
            <Quote size={14} className="shrink-0 mt-0.5 text-faint" />
            <p className="text-sm text-text leading-snug">"{c.quote}"</p>
          </div>
          {c.citation && (
            <div className="mt-2 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
              <span className="text-[11px] text-muted truncate">{c.citation}</span>
              {c.url && (
                <a href={c.url} target="_blank" rel="noreferrer"
                  className="shrink-0 text-faint hover:text-primary transition-colors" title="Open source">
                  <ExternalLink size={13} />
                </a>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

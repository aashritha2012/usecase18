import { motion } from "framer-motion";
import { AlertTriangle, Globe2, Lightbulb, Sparkles } from "lucide-react";
import CitationPanel from "./CitationPanel";
import { ConfidenceMeter, StatusBadge } from "./bits";
import { intentLabel } from "@/lib/intents";
import type { EvidenceMapEntry, Question } from "@/types";

export default function EvidenceDetail({ question, entry }: { question: Question; entry: EvidenceMapEntry }) {
  const { synthesis, adaptation, mapping } = entry;
  return (
    <motion.div
      key={entry.question_id}
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 flex-wrap mb-2">
          <StatusBadge status={entry.status} />
          <span className="chip">{intentLabel(mapping.intent)}</span>
          <ConfidenceMeter value={entry.confidence} className="ml-auto" />
        </div>
        <p className="text-text font-medium leading-snug">{question.text}</p>
      </div>

      {/* Answer */}
      <section className="card p-4">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-faint mb-2">
          <Sparkles size={13} className="text-primary" /> Synthesised answer
        </div>
        <p className="text-sm text-text leading-relaxed">{synthesis.answer}</p>
      </section>

      {/* Value message */}
      <section className="card p-4 border-l-2 border-l-primary bg-primary/[0.04]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-primary mb-2">
          <Lightbulb size={13} /> Payer value message
        </div>
        <p className="text-sm text-text leading-relaxed">{synthesis.value_message}</p>
      </section>

      {/* Gap + localisation */}
      {(adaptation.gap || adaptation.localisation?.flag) && (
        <div className="grid sm:grid-cols-2 gap-3">
          {adaptation.gap && (
            <div className="card p-3 border-l-2 border-l-gap">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-gap mb-1">
                <AlertTriangle size={13} /> Evidence gap
              </div>
              <p className="text-xs text-muted leading-snug">{adaptation.gap.note}</p>
            </div>
          )}
          {adaptation.localisation?.flag && (
            <div className="card p-3 border-l-2 border-l-accent">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-accent mb-1">
                <Globe2 size={13} /> Localisation
              </div>
              <p className="text-xs text-muted leading-snug">{adaptation.localisation.note}</p>
            </div>
          )}
        </div>
      )}

      {/* Citations */}
      <section>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-sm font-semibold">Sources & citations</h4>
          <span className="text-xs text-muted">{synthesis.citations.length} traceable</span>
        </div>
        <CitationPanel citations={synthesis.citations} />
      </section>
    </motion.div>
  );
}

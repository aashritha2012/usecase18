import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, FileQuestion, Inbox } from "lucide-react";
import PageHeader from "./PageHeader";
import { useContextData } from "@/hooks/useApi";
import { intentClass, intentLabel } from "@/lib/intents";

export default function Questions() {
  const { data: ctx } = useContextData();
  if (!ctx) return null;
  const { question_set, payer } = ctx;

  return (
    <div>
      <PageHeader
        title="Payer Questions"
        subtitle="The payer's evidence questions, received as a set. The agent classifies each by intent, then maps it to the evidence that answers it."
      />

      {/* Intake banner */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        className="card p-5 mb-5 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-11 w-11 rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Inbox size={20} />
          </span>
          <div>
            <div className="font-semibold">{question_set.title}</div>
            <div className="text-xs text-muted flex items-center gap-3 mt-0.5">
              <span className="flex items-center gap-1"><FileQuestion size={12} /> {question_set.questions.length} questions</span>
              <span className="flex items-center gap-1"><CalendarClock size={12} /> Received {question_set.received}</span>
              <span>·</span>
              <span>Deadline in {payer.deadline_days} days</span>
            </div>
          </div>
        </div>
        <Link to="/evidence" className="btn-primary">
          Send to Evidence Agent <ArrowRight size={16} />
        </Link>
      </motion.div>

      {/* Question list */}
      <div className="space-y-3">
        {question_set.questions.map((q, i) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="card p-4 flex items-start gap-4 hover:border-primary/30 transition-colors"
          >
            <div className="grid place-items-center h-8 w-8 shrink-0 rounded-lg bg-surface-2 text-sm font-semibold text-muted tabular-nums">
              {q.order}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-text leading-snug">{q.text}</p>
              <div className="mt-2">
                <span className={`chip ${intentClass(q.intent)}`}>{intentLabel(q.intent)}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

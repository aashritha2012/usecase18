import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarClock, FlaskConical, Pill, Target, ShieldCheck } from "lucide-react";
import FourMoves from "@/components/agent/FourMoves";
import { useContextData } from "@/hooks/useApi";

export default function Dashboard() {
  const { data: ctx } = useContextData();
  if (!ctx) return null;
  const { therapy, payer, question_set } = ctx;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="card p-6 lg:p-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/[0.07] to-transparent" />
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="chip border-primary/30 text-primary"><FlaskConical size={13} /> Live payer dossier</span>
              <span className="chip">{therapy.modality}</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              {therapy.brand_name} <span className="text-muted font-medium">({therapy.inn})</span>
            </h2>
            <p className="mt-2 text-muted">{therapy.indication}</p>
            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              <Meta icon={Pill} label="Dosing" value={therapy.dosing} />
              <Meta icon={Target} label="Payer" value={`${payer.name} · ${payer.market}`} />
              <Meta icon={CalendarClock} label="Deadline" value={`${payer.deadline_days} days`} />
            </div>
          </div>
          <Link to="/evidence" className="btn-primary shrink-0">
            Run the Evidence Agent <ArrowRight size={16} />
          </Link>
        </div>
      </motion.div>

      {/* The payer's framing */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="card p-5 border-l-2 border-l-primary">
        <div className="text-xs uppercase tracking-wide text-faint mb-1">How this payer decides</div>
        <p className="text-sm text-text">{payer.framing}</p>
      </motion.div>

      {/* Four moves */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">How the agent works</h3>
          <span className="text-xs text-muted">{question_set.questions.length} payer questions in this set</span>
        </div>
        <FourMoves />
      </div>

      {/* Trust strip */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="card p-5 flex flex-wrap items-center gap-x-8 gap-y-3">
        <div className="flex items-center gap-2 text-sm">
          <ShieldCheck size={16} className="text-answered" />
          <span className="text-muted">Every claim source-linked — audit-ready</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-gap" />
          <span className="text-muted">Honest gap-flagging — no hallucinated evidence</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="text-muted">Public data now · client corpus after NDA/GxP</span>
        </div>
      </motion.div>
    </div>
  );
}

function Meta({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} className="text-muted" />
      <div>
        <div className="text-[11px] text-faint uppercase tracking-wide">{label}</div>
        <div className="font-medium">{value}</div>
      </div>
    </div>
  );
}

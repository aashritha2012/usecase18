import { motion } from "framer-motion";
import { Clock, ListChecks, CheckCircle2, Quote, AlertTriangle, Library, TrendingDown, Euro } from "lucide-react";
import PageHeader from "./PageHeader";
import StatTile from "@/components/charts/StatTile";
import TurnaroundChart from "@/components/charts/TurnaroundChart";
import EffortSplitChart from "@/components/charts/EffortSplitChart";
import ThroughputChart from "@/components/charts/ThroughputChart";
import { useImpact } from "@/hooks/useApi";
import { useCountUp } from "@/hooks/useCountUp";

type Accent = "primary" | "answered" | "gap" | "accent";
const KPI_META: Record<string, { icon: any; accent: Accent }> = {
  turnaround: { icon: Clock, accent: "primary" },
  questions: { icon: ListChecks, accent: "accent" },
  coverage: { icon: CheckCircle2, accent: "answered" },
  citations: { icon: Quote, accent: "primary" },
  gaps: { icon: AlertTriangle, accent: "gap" },
  sources: { icon: Library, accent: "accent" },
};

export default function Impact() {
  const { data: impact, offline } = useImpact();
  const roi = (impact?.roi ?? {}) as Record<string, number | string>;
  const annualValue = useCountUp(Number(roi.annual_value_eur) || 0, 1400);
  if (!impact) return null;

  return (
    <div>
      <PageHeader
        title="Impact & ROI"
        subtitle="What the Evidence Agent changes for a payer dossier — faster turnaround, expert time redirected to judgement, and every claim traceable."
      />

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {impact.kpis.map((k, i) => {
          const meta = KPI_META[k.id] ?? { icon: TrendingDown, accent: "primary" as Accent };
          return (
            <StatTile
              key={k.id} index={i} label={k.label} value={k.value} suffix={k.suffix}
              caption={k.caption} icon={meta.icon} accent={meta.accent}
            />
          );
        })}
      </div>

      {/* Charts */}
      <div className="mt-6 grid lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Time to first defensible draft</h3>
            <span className="chip border-primary/30 text-primary">
              <TrendingDown size={13} /> {impact.turnaround.reduction_pct}% faster
            </span>
          </div>
          <p className="text-xs text-muted mt-1 mb-3">{impact.turnaround.unit}</p>
          <TurnaroundChart turnaround={impact.turnaround} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="card p-5">
          <h3 className="font-semibold">Where the analyst's time goes</h3>
          <p className="text-xs text-muted mt-1 mb-3">Effort shifts from finding evidence to expert judgement</p>
          <EffortSplitChart effort={impact.effort_split} />
        </motion.div>
      </div>

      <div className="mt-4 grid lg:grid-cols-3 gap-4">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="card p-5 lg:col-span-2">
          <h3 className="font-semibold">Dossier throughput projection</h3>
          <p className="text-xs text-muted mt-1 mb-2">Dossiers completed per quarter — same team</p>
          <ThroughputChart data={impact.throughput_projection} />
        </motion.div>

        {/* ROI */}
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }} className="card p-5 flex flex-col">
          <div className="flex items-center gap-2 text-primary">
            <Euro size={18} />
            <h3 className="font-semibold text-text">Annual value</h3>
          </div>
          <div className="mt-4">
            <div className="stat-value text-primary">€{annualValue.toLocaleString()}</div>
            <div className="text-xs text-faint mt-1">estimated annual value</div>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            <Row label="Dossiers / year" value={String(roi.dossiers_per_year)} />
            <Row label="Days saved / dossier" value={String(roi.days_saved_per_dossier)} />
            <Row label="Analyst loaded / day" value={`€${Number(roi.analyst_loaded_day_cost_eur).toLocaleString()}`} />
            <Row label="Annual days saved" value={String(roi.annual_days_saved)} />
          </div>
          <p className="mt-auto pt-4 text-[11px] text-faint leading-relaxed">{String(roi.note)}</p>
        </motion.div>
      </div>

      {offline && <p className="mt-4 text-[11px] text-faint">Showing bundled demo data (backend offline).</p>}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b border-border/60 pb-1.5">
      <span className="text-muted">{label}</span>
      <span className="font-semibold tabular-nums">{value}</span>
    </div>
  );
}

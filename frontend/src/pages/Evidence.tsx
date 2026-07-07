import { motion } from "framer-motion";
import { Network, Play, RotateCcw, Sparkles } from "lucide-react";
import PageHeader from "./PageHeader";
import EvidenceDetail from "@/components/agent/EvidenceDetail";
import { ConfidenceMeter, LiveMoves, StatusBadge } from "@/components/agent/bits";
import { useContextData } from "@/hooks/useApi";
import { useAgentRunner } from "@/hooks/useAgentRunner";

export default function Evidence() {
  const { data: ctx } = useContextData();
  const questions = ctx?.question_set.questions ?? [];
  const { state, running, selected, setSelected, runAll, reset, doneCount } = useAgentRunner(questions);
  if (!ctx) return null;

  const selectedQ = questions.find((q) => q.id === selected);
  const selectedEntry = selected ? state[selected]?.entry : undefined;
  const started = doneCount > 0 || running;

  return (
    <div>
      <PageHeader
        title="Evidence Map"
        subtitle="The agent runs its four moves — Map, Retrieve, Synthesise, Adapt — over each payer question, producing a traceable, source-cited evidence map."
      />

      {/* Control bar */}
      <div className="card p-4 mb-5 flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-3">
          <span className="grid place-items-center h-10 w-10 rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
            <Network size={18} />
          </span>
          <div>
            <div className="font-semibold text-sm">Evidence Agent</div>
            <div className="text-xs text-muted">
              {running ? `Processing… ${doneCount}/${questions.length}` :
                doneCount ? `${doneCount}/${questions.length} questions mapped` :
                "Ready to run the four-move pipeline"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {started && !running && (
            <button onClick={reset} className="btn-ghost"><RotateCcw size={15} /> Reset</button>
          )}
          <button onClick={runAll} disabled={running} className="btn-primary">
            {running ? <><Sparkles size={16} className="animate-pulse" /> Running…</> : <><Play size={16} /> Run Evidence Agent</>}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      {started && (
        <div className="h-1 w-full rounded-full bg-surface-2 overflow-hidden mb-5">
          <motion.div className="h-full bg-primary rounded-full"
            animate={{ width: `${(doneCount / questions.length) * 100}%` }} transition={{ ease: "easeOut" }} />
        </div>
      )}

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] gap-5">
        {/* Left — evidence map list */}
        <div className="space-y-2.5">
          {questions.map((q, i) => {
            const s = state[q.id];
            const isSel = selected === q.id;
            return (
              <motion.button
                key={q.id}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
                onClick={() => s?.entry && setSelected(q.id)}
                className={`w-full text-left card p-3.5 transition-colors ${
                  isSel ? "border-primary/50 bg-surface-2/60" : s?.entry ? "hover:border-primary/30" : "opacity-90"
                } ${s?.entry ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`grid place-items-center h-7 w-7 shrink-0 rounded-lg text-xs font-semibold tabular-nums ${
                    s?.status === "done" ? "bg-primary/15 text-primary" : "bg-surface-2 text-muted"
                  }`}>{q.order}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text leading-snug line-clamp-2">{q.text}</p>
                    <div className="mt-2 h-5 flex items-center">
                      {s?.status === "running" && <LiveMoves current={s.move} />}
                      {s?.status === "done" && s.entry && (
                        <div className="flex items-center gap-3 w-full">
                          <StatusBadge status={s.entry.status} />
                          <ConfidenceMeter value={s.entry.confidence} className="ml-auto" />
                        </div>
                      )}
                      {(!s || s.status === "pending") && (
                        <span className="text-[11px] text-faint">Queued</span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Right — detail / citation panel */}
        <div className="lg:sticky lg:top-4 self-start">
          {selectedQ && selectedEntry ? (
            <EvidenceDetail question={selectedQ} entry={selectedEntry} />
          ) : (
            <div className="card p-10 grid place-items-center text-center min-h-[300px]">
              <div className="max-w-xs">
                <div className="grid place-items-center h-12 w-12 mx-auto rounded-2xl bg-primary/10 text-primary mb-3">
                  <Sparkles size={22} />
                </div>
                <p className="text-sm text-muted">
                  {running ? "The agent is working through the question set…"
                    : "Run the Evidence Agent to generate a source-cited answer and value message for each payer question."}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

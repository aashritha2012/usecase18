import { useCallback, useRef, useState } from "react";
import { api } from "@/lib/api";
import { buildEntry } from "@/data/demo";
import type { EvidenceMapEntry, Move, Question } from "@/types";

export type QStatus = "pending" | "running" | "done";

export interface RunState {
  status: QStatus;
  move?: Move;
  progress: number;
  entry?: EvidenceMapEntry;
}

const MOVES: Move[] = ["map", "retrieve", "synthesise", "adapt"];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Drives the four-move animation across a question set. Uses a deterministic
 * client-side stepper for reliable visuals (online or offline), and resolves
 * each entry from the API with a bundled fallback. This keeps the demo identical
 * whether or not the backend is running.
 */
export function useAgentRunner(questions: Question[], stepMs = 480) {
  const initial = () =>
    Object.fromEntries(questions.map((q) => [q.id, { status: "pending", progress: 0 } as RunState]));
  const [state, setState] = useState<Record<string, RunState>>(initial);
  const [running, setRunning] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const cancelled = useRef(false);

  const patch = (qid: string, s: Partial<RunState>) =>
    setState((prev) => ({ ...prev, [qid]: { ...prev[qid], ...s } }));

  const resolveEntry = async (qid: string): Promise<EvidenceMapEntry> => {
    try {
      return await api.runOne(qid);
    } catch {
      return buildEntry(qid);
    }
  };

  const runQuestion = useCallback(async (q: Question) => {
    patch(q.id, { status: "running", progress: 0 });
    setSelected(q.id);
    for (let i = 0; i < MOVES.length; i++) {
      if (cancelled.current) return;
      patch(q.id, { move: MOVES[i], progress: (i + 1) / (MOVES.length + 1) });
      await sleep(stepMs);
    }
    const entry = await resolveEntry(q.id);
    patch(q.id, { status: "done", move: "done", progress: 1, entry });
  }, [stepMs]);

  const runAll = useCallback(async () => {
    cancelled.current = false;
    setRunning(true);
    setState(initial());
    for (const q of questions) {
      if (cancelled.current) break;
      await runQuestion(q);
    }
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions, runQuestion]);

  const reset = useCallback(() => {
    cancelled.current = true;
    setState(initial());
    setSelected(null);
    setRunning(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questions]);

  const doneCount = Object.values(state).filter((s) => s.status === "done").length;

  return { state, running, selected, setSelected, runAll, reset, doneCount };
}

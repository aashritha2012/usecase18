// API client for the Evidence Agent backend.
// In dev, Vite proxies /api -> http://localhost:8000 (see vite.config.ts).
// If the backend is unreachable, callers fall back to bundled demo data so the
// UI is always presentable (see hooks/useApi.ts).

import type {
  Context, EvidenceMapEntry, Impact, RunSummary, Source, StepEvent,
} from "@/types";

const BASE = "/api";

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`POST ${path} -> ${res.status}`);
  return res.json() as Promise<T>;
}

export const api = {
  context: () => get<Context>("/context"),
  sources: () => get<Source[]>("/sources"),
  impact: () => get<Impact>("/impact"),
  runAll: () => post<{ provider: string; summary: RunSummary; entries: EvidenceMapEntry[] }>("/agent/run"),
  runOne: (qid: string) => post<EvidenceMapEntry>(`/agent/question/${qid}`),
  ask: (text: string) => post<EvidenceMapEntry>("/agent/ask", { text }),
};

/**
 * Stream one question's four moves via Server-Sent Events.
 * Calls `onStep` for each move and `onResult` with the final entry.
 * Returns a cancel function.
 */
export function streamQuestion(
  qid: string,
  onStep: (e: StepEvent) => void,
  onResult: (e: EvidenceMapEntry) => void,
  onError?: (err: unknown) => void,
): () => void {
  const es = new EventSource(`${BASE}/agent/stream/${qid}`);
  es.onmessage = (evt) => {
    try {
      const data = JSON.parse(evt.data);
      if (data.kind === "step") onStep(data as StepEvent);
      else if (data.kind === "result") {
        onResult(data as EvidenceMapEntry);
        es.close();
      }
    } catch (err) {
      onError?.(err);
    }
  };
  es.onerror = (err) => {
    onError?.(err);
    es.close();
  };
  return () => es.close();
}

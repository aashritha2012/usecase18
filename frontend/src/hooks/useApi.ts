import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { buildAllEntries, demoContext, demoImpact, demoSources, demoSummary } from "@/data/demo";
import type { Context, EvidenceMapEntry, Impact, RunSummary, Source } from "@/types";

interface AsyncState<T> { data?: T; loading: boolean; error?: string; offline: boolean; }

function useAsync<T>(fn: () => Promise<T>, fallback: T, deps: unknown[] = []): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({ loading: true, offline: false });
  useEffect(() => {
    let alive = true;
    fn()
      .then((data) => alive && setState({ data, loading: false, offline: false }))
      .catch(() => alive && setState({ data: fallback, loading: false, offline: true }));
    return () => { alive = false; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return state;
}

export const useContextData = () => useAsync<Context>(api.context, demoContext);
export const useImpact = () => useAsync<Impact>(api.impact, demoImpact);
export const useSources = () => useAsync<Source[]>(api.sources, demoSources);

/** Run the whole set, API-first with bundled fallback. */
export function useEvidenceRun() {
  const [entries, setEntries] = useState<EvidenceMapEntry[]>([]);
  const [summary, setSummary] = useState<RunSummary>();
  const [loading, setLoading] = useState(true);
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    let alive = true;
    api.runAll()
      .then((r) => { if (alive) { setEntries(r.entries); setSummary(r.summary); setLoading(false); } })
      .catch(() => { if (alive) { setEntries(buildAllEntries()); setSummary(demoSummary()); setLoading(false); setOffline(true); } });
    return () => { alive = false; };
  }, []);

  return { entries, summary, loading, offline };
}

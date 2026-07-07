// Bundled fallback demo data.
// Mirrors the backend seed so the UI is fully presentable even if the API is
// down (offline demo, screenshots, static hosting). When the backend is up, the
// live API takes precedence — this only fills gaps. The offline evidence entries
// are assembled from the curated evidence map + corpus (same shape the backend
// orchestrator returns).

import therapyJson from "./seed/therapy.json";
import corpusJson from "./seed/evidence_corpus.json";
import questionsJson from "./seed/payer_questions.json";
import mapJson from "./seed/evidence_map.json";
import impactJson from "./seed/impact.json";
import type {
  Context, EvidenceMapEntry, Impact, Mapping, RunSummary, Source, Synthesis,
} from "@/types";

export const demoSources: Source[] = (corpusJson as any).sources;

const sourceById = Object.fromEntries(demoSources.map((s) => [s.id, s]));

export const demoContext: Context = {
  therapy: (therapyJson as any).therapy,
  payer: (questionsJson as any).payer,
  question_set: (questionsJson as any).question_set,
  provider: "mock",
  environment: "demo",
  synthetic: true,
};

export const demoImpact: Impact = impactJson as any;

const EVIDENCE_TYPE_HINTS: Record<string, string[]> = {
  comparative_efficacy: ["comparative_efficacy", "clinical_outcomes"],
  clinical_outcomes: ["clinical_outcomes"],
  quality_of_life: ["quality_of_life"],
  safety: ["safety"],
  real_world_evidence: ["real_world_evidence"],
  burden_of_disease: ["burden_of_disease"],
  dosing_adherence: ["dosing", "real_world_evidence"],
  budget_impact: ["budget_impact"],
};

function enrichCitation(c: any) {
  const src = sourceById[c.source_id];
  return {
    source_id: c.source_id,
    loc: c.loc,
    quote: c.quote,
    source_label: src?.source_label,
    title: src?.title,
    citation: src?.citation,
    url: src?.url,
  };
}

export function buildEntry(questionId: string): EvidenceMapEntry {
  const q = demoContext.question_set.questions.find((x) => x.id === questionId)!;
  const gold = (mapJson as any).entries.find((e: any) => e.question_id === questionId);
  const evidenceTypes = gold?.evidence_types ?? EVIDENCE_TYPE_HINTS[q.intent] ?? [q.intent];

  const mapping: Mapping = {
    intent: q.intent,
    evidence_types: evidenceTypes,
    rationale: `Classified as '${q.intent}' from question phrasing; routing to matching evidence types.`,
  };

  const citations = (gold?.citations ?? []).map(enrichCitation);
  const synthesis: Synthesis = {
    answer: gold?.answer ?? "No answer available in demo data.",
    value_message: gold?.value_message ?? "",
    citations,
    confidence: gold?.confidence ?? 0.5,
  };

  const retrieved = citations.map((c: any, i: number) => ({
    source_id: c.source_id,
    source_label: c.source_label,
    title: c.title,
    loc: c.loc,
    text: c.quote,
    score: Number((0.9 - i * 0.08).toFixed(3)),
  }));

  return {
    question_id: questionId,
    status: gold?.status ?? (citations.length ? "answered" : "gap"),
    mapping,
    retrieved,
    synthesis,
    adaptation: {
      gap: gold?.gap ?? null,
      localisation: gold?.localisation ?? { flag: false, note: null },
    },
    confidence: synthesis.confidence,
    evidence_types: evidenceTypes,
  };
}

export function buildAllEntries(): EvidenceMapEntry[] {
  return demoContext.question_set.questions.map((q) => buildEntry(q.id));
}

export function demoSummary(): RunSummary {
  const entries = buildAllEntries();
  const answered = entries.filter((e) => e.status === "answered").length;
  const gaps = entries.filter((e) => e.status === "gap").length;
  const citations = entries.reduce((n, e) => n + e.synthesis.citations.length, 0);
  const avg = entries.reduce((n, e) => n + e.confidence, 0) / (entries.length || 1);
  return {
    questions: entries.length,
    answered,
    gaps,
    citations,
    coverage_pct: Math.round((100 * answered) / (entries.length || 1)),
    avg_confidence: Number(avg.toFixed(2)),
  };
}

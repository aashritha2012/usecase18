// Mirrors backend app/schemas/models.py — the cross-layer data contract.

export interface Passage { loc: string; text: string; }

export type SourceType = "pubmed" | "fda_label" | "rwe" | "sop";

export interface Source {
  id: string;
  type: SourceType;
  source_label: string;
  title: string;
  year?: number;
  citation: string;
  url?: string;
  evidence_type: string;
  authors?: string;
  journal?: string;
  passages: Passage[];
}

export interface Question { id: string; order: number; intent: string; text: string; }

export interface Payer {
  id: string; name: string; market: string; region: string;
  flag: string; framing: string; deadline_days: number;
}

export interface QuestionSet { id: string; title: string; received: string; questions: Question[]; }

export interface Mapping { intent: string; evidence_types: string[]; rationale: string; }

export interface RetrievedPassage {
  source_id: string; source_label: string; title: string;
  loc: string; text: string; score: number;
}

export interface Citation {
  source_id: string; loc: string; quote: string;
  source_label?: string; title?: string; citation?: string; url?: string;
}

export interface Gap { type: string; note: string; }
export interface Localisation { flag: boolean; note?: string | null; }

export interface Synthesis {
  answer: string; value_message: string; citations: Citation[]; confidence: number;
}

export interface Adaptation { gap?: Gap | null; localisation: Localisation; }

export type EntryStatus = "answered" | "gap";

export interface EvidenceMapEntry {
  question_id: string;
  status: EntryStatus;
  mapping: Mapping;
  retrieved: RetrievedPassage[];
  synthesis: Synthesis;
  adaptation: Adaptation;
  confidence: number;
  evidence_types: string[];
}

export type Move = "map" | "retrieve" | "synthesise" | "adapt" | "done";

export interface StepEvent {
  question_id: string; move: Move; label: string; detail: string; progress: number;
}

export interface Therapy {
  id: string; brand_name: string; inn: string; modality: string;
  indication: string; route: string; dosing: string;
  comparators: { id: string; name: string; class: string }[];
  key_endpoints: { id: string; label: string; description: string; week: number }[];
}

export interface Context {
  therapy: Therapy;
  payer: Payer;
  question_set: QuestionSet;
  provider: string;
  environment: string;
  synthetic: boolean;
}

export interface RunSummary {
  questions: number; answered: number; gaps: number;
  citations: number; coverage_pct: number; avg_confidence: number;
}

export interface Kpi { id: string; label: string; value: number; suffix: string; caption: string; trend?: string; }

export interface Impact {
  turnaround: { baseline_days: number; agent_assisted_days: number; reduction_pct: number; reduction_band: string; unit: string; };
  effort_split: { before: { activity: string; pct: number }[]; after: { activity: string; pct: number }[]; };
  kpis: Kpi[];
  throughput_projection: { period: string; manual: number; agent: number }[];
  roi: Record<string, number | string>;
}

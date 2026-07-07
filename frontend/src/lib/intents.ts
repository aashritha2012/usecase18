// Intent presentation metadata (label + accent). Mirrors backend intents.
export const INTENT_META: Record<string, { label: string; className: string }> = {
  comparative_efficacy: { label: "Comparative efficacy", className: "text-primary border-primary/30" },
  clinical_outcomes: { label: "Clinical outcomes", className: "text-primary border-primary/30" },
  quality_of_life: { label: "Quality of life", className: "text-accent border-accent/30" },
  safety: { label: "Safety", className: "text-answered border-answered/30" },
  real_world_evidence: { label: "Real-world evidence", className: "text-accent border-accent/30" },
  burden_of_disease: { label: "Burden of disease", className: "text-gap border-gap/30" },
  dosing_adherence: { label: "Dosing & adherence", className: "text-primary border-primary/30" },
  budget_impact: { label: "Budget impact", className: "text-critical border-critical/30" },
};

export function intentLabel(intent: string): string {
  return INTENT_META[intent]?.label ?? intent.replace(/_/g, " ");
}
export function intentClass(intent: string): string {
  return INTENT_META[intent]?.className ?? "text-muted border-border";
}

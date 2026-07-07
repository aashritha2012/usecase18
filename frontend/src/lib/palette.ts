// Chart palette — validated categorical set (dataviz skill validator, dark mode:
// all checks PASS, worst adjacent ΔE 15.7). The app is dark-first; these are the
// dark-surface steps. UI chrome uses the brand tokens in index.css; charts use
// these validated series colors so identity is CVD-safe.

export const SERIES = ["#3987e5", "#199e70", "#c98500", "#9085e9", "#e66767"] as const;

// Semantic roles
export const CHART = {
  agent: "#3987e5",     // slot 1 — the product
  manual: "#64748b",    // neutral gray — the baseline/reference (comparison)
  answered: "#34d399",
  gap: "#fbbf24",
  grid: "rgba(148,163,184,0.12)",
  axis: "#64748b",
  text: "#94a3b8",
  surface: "#111828",
} as const;

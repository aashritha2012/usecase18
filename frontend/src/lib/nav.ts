import { LayoutDashboard, ListChecks, Network, TrendingUp, type LucideIcon } from "lucide-react";

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
  step: string;
  description: string;
}

// Navigation mirrors the LOCKED user journey:
// Intake -> Map/Retrieve/Synthesise/Adapt (Evidence workspace) -> Review -> Impact.
export const NAV: NavItem[] = [
  { to: "/", label: "Overview", icon: LayoutDashboard, step: "Start", description: "Dossier context & status" },
  { to: "/questions", label: "Payer Questions", icon: ListChecks, step: "Intake", description: "The payer's evidence questions" },
  { to: "/evidence", label: "Evidence Map", icon: Network, step: "Agent", description: "Map · Retrieve · Synthesise · Adapt" },
  { to: "/impact", label: "Impact", icon: TrendingUp, step: "Value", description: "Turnaround & ROI" },
];

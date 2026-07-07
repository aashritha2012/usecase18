import { useLocation } from "react-router-dom";
import { CircleDot, Sparkles } from "lucide-react";
import { NAV } from "@/lib/nav";
import { useContextData } from "@/hooks/useApi";

export default function Topbar() {
  const { pathname } = useLocation();
  const active = NAV.find((n) => (n.to === "/" ? pathname === "/" : pathname.startsWith(n.to)));
  const { data: ctx } = useContextData();

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-6 border-b border-border bg-bg/70 backdrop-blur-md">
      <div>
        <div className="text-[11px] uppercase tracking-wider text-faint">{active?.step}</div>
        <h1 className="text-lg font-semibold leading-tight">{active?.label ?? "Overview"}</h1>
      </div>

      <div className="flex items-center gap-3">
        {ctx && (
          <div className="hidden sm:flex items-center gap-2 chip">
            <span className="text-base leading-none">🇩🇪</span>
            <span className="text-text font-medium">{ctx.payer.name}</span>
            <span className="text-faint">· {ctx.payer.market}</span>
          </div>
        )}
        <div className="chip border-primary/30 text-primary">
          <Sparkles size={13} />
          <span className="capitalize">{ctx?.provider ?? "mock"} AI</span>
        </div>
        <div className="chip border-answered/30 text-answered">
          <CircleDot size={12} className="animate-pulse" />
          <span>Live</span>
        </div>
      </div>
    </header>
  );
}

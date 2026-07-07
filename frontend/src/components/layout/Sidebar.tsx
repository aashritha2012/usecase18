import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, ShieldCheck } from "lucide-react";
import { NAV } from "@/lib/nav";

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col border-r border-border bg-surface/60 backdrop-blur-sm">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-border">
        <div className="grid place-items-center h-9 w-9 rounded-xl bg-primary/15 text-primary ring-1 ring-primary/30">
          <Activity size={20} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold">Evidence Agent</div>
          <div className="text-[11px] text-muted">Market Access · HTA</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {NAV.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"}>
            {({ isActive }) => (
              <motion.div
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                  isActive ? "bg-surface-2 text-text" : "text-muted hover:text-text hover:bg-surface-2/60"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-full bg-primary"
                  />
                )}
                <item.icon size={18} className={isActive ? "text-primary" : ""} />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-[11px] text-faint">{item.step}</div>
                </div>
              </motion.div>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border">
        <div className="flex items-center gap-2 text-[11px] text-muted">
          <ShieldCheck size={14} className="text-answered" />
          <span>Synthetic demo data · GxP-ready design</span>
        </div>
      </div>
    </aside>
  );
}

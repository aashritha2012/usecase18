import { NavLink } from "react-router-dom";
import { NAV } from "@/lib/nav";

/** Bottom tab bar for small screens (sidebar is hidden below md). */
export default function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-30 border-t border-border bg-surface/95 backdrop-blur-md">
      <div className="grid grid-cols-4">
        {NAV.map((item) => (
          <NavLink
            key={item.to} to={item.to} end={item.to === "/"}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 py-2.5 text-[11px] ${isActive ? "text-primary" : "text-muted"}`
            }
          >
            <item.icon size={19} />
            <span className="truncate max-w-[72px]">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

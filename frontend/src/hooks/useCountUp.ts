import { useEffect, useRef, useState } from "react";

/** Animate a number from 0 to `target` once, on mount / when target changes. */
export function useCountUp(target: number, durationMs = 1100, decimals = 0): number {
  const [value, setValue] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      const v = target * eased;
      setValue(decimals ? Number(v.toFixed(decimals)) : Math.round(v));
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => { if (raf.current) cancelAnimationFrame(raf.current); };
  }, [target, durationMs, decimals]);

  return value;
}

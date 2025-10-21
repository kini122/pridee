import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, durationMs = 2000, start = false) {
  const [value, setValue] = useState(0);
  const raf = useRef<number | null>(null);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
    const step = (ts: number) => {
      if (startTime.current == null) startTime.current = ts;
      const elapsed = ts - startTime.current;
      const p = Math.min(1, elapsed / durationMs);
      const eased = easeOutQuart(p);
      setValue(Math.round(target * eased));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
      startTime.current = null;
    };
  }, [target, durationMs, start]);

  return value;
}

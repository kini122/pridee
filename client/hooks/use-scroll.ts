import { useEffect, useRef, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(m.matches);
    onChange();
    m.addEventListener("change", onChange);
    return () => m.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function usePageScrollProgress() {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = docHeight > 0 ? scrollTop / docHeight : 0;
        setProgress(Math.min(1, Math.max(0, p)));
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return progress;
}

export function useSectionScrollProgress(
  ref: React.RefObject<HTMLElement>,
  extraHeight = 0,
) {
  const [progress, setProgress] = useState(0);
  const ticking = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + extraHeight - vh;
        const traveled = Math.min(Math.max(-rect.top, 0), total);
        const p = total > 0 ? traveled / total : 0;
        setProgress(Math.min(1, Math.max(0, p)));
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, extraHeight]);
  return progress;
}

export function useInView<T extends Element = Element>(
  ref: React.RefObject<T>,
  options: IntersectionObserverInit = { threshold: 0.2 },
) {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      setEntry(e);
      setInView(e.isIntersecting);
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, [
    ref,
    options.root,
    options.rootMargin,
    JSON.stringify(options.threshold),
  ]);
  return { inView, entry };
}

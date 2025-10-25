import { useEffect, useMemo, useRef, useState } from "react";
import {
  usePrefersReducedMotion,
  useSectionScrollProgress,
} from "@/hooks/use-scroll";

const ITEMS = [
  {
    client: "Tech Summit",
    title: "Tech Summit 2024",
    desc: "Global technology conference for 1000+ attendees",
    stats: ["1000+ Attendees", "Expo Center", "2024"],
    img: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    client: "Luxury Brand",
    title: "Luxury Brand Gala",
    desc: "An evening of elegance and sophistication",
    stats: ["500 Guests", "Grand Ballroom", "2024"],
    img: "https://images.pexels.com/photos/34362959/pexels-photo-34362959.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    client: "Innovate Co.",
    title: "Product Launch Spectacular",
    desc: "Unveiling innovation with theatrical impact",
    stats: ["Live Stream", "Theater Venue", "2025"],
    img: "https://images.pexels.com/photos/14999408/pexels-photo-14999408.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    client: "Industry Assoc.",
    title: "Annual Awards Night",
    desc: "Celebrating industry excellence",
    stats: ["Black Tie", "Downtown Hall", "2025"],
    img: "https://images.pexels.com/photos/19793934/pexels-photo-19793934.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    client: "Global Corp.",
    title: "Corporate Retreat",
    desc: "Strategic planning in paradise",
    stats: ["3 Days", "Resort Venue", "2024"],
    img: "https://images.pexels.com/photos/7108958/pexels-photo-7108958.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    client: "Charity Org.",
    title: "Charity Fundraiser",
    desc: "An unforgettable night for a cause",
    stats: ["$1M Raised", "City Center", "2024"],
    img: "https://images.pexels.com/photos/6994994/pexels-photo-6994994.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function PortfolioHorizontal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useSectionScrollProgress(containerRef, window.innerHeight * 3);

  const [manualProgress, setManualProgress] = useState(0); // 0..1 fraction
  const manualPxRef = useRef(0); // current horizontal px scrolled
  const [maxScrollPx, setMaxScrollPx] = useState(0);
  const [isLocking, setIsLocking] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // compute pixel sizes for precise mapping
  useEffect(() => {
    const el = containerRef.current;
    const inner = innerRef.current;
    const left = leftRef.current;
    if (!el || !inner || !left) return;

    const compute = () => {
      const containerRect = el.getBoundingClientRect();
      const leftWidth = left.getBoundingClientRect().width;
      const visibleWidth = Math.max(1, containerRect.width - leftWidth);
      const innerWidth = inner.scrollWidth;
      const max = Math.max(0, innerWidth - visibleWidth);
      setMaxScrollPx(max);
      manualPxRef.current = Math.max(0, Math.min(manualPxRef.current, max));
      setManualProgress(max > 0 ? manualPxRef.current / max : 0);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    ro.observe(inner);
    ro.observe(left);
    return () => ro.disconnect();
  }, [ITEMS.length]);

  // body lock helpers
  const bodyStateRef = useRef<any>(null);
  const lockBody = () => {
    if (bodyStateRef.current) return;
    const scrollY = window.scrollY || window.pageYOffset;
    bodyStateRef.current = {
      scrollY,
      overflow: document.body.style.overflow,
      position: document.body.style.position,
      top: document.body.style.top,
      left: document.body.style.left,
      width: document.body.style.width,
    };
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.width = '100%';
  };
  const unlockBody = () => {
    const prev = bodyStateRef.current;
    if (!prev) return;
    document.body.style.overflow = prev.overflow || '';
    document.body.style.position = prev.position || '';
    document.body.style.top = prev.top || '';
    document.body.style.left = prev.left || '';
    document.body.style.width = prev.width || '';
    const scrollY = prev.scrollY || 0;
    window.scrollTo(0, scrollY);
    bodyStateRef.current = null;
  };

  // global wheel handler with strict interception
  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      const el = containerRef.current;
      const inner = innerRef.current;
      const left = leftRef.current;
      if (!el || !inner || !left) return;
      const rect = el.getBoundingClientRect();
      const atTop = rect.top <= 0 && rect.bottom > 0; // section reached top
      if (!atTop) return; // don't intercept

      const containerRect = el.getBoundingClientRect();
      const leftWidth = left.getBoundingClientRect().width;
      const visibleWidth = Math.max(1, containerRect.width - leftWidth);
      const max = Math.max(0, inner.scrollWidth - visibleWidth);
      if (max <= 0) return;

      e.preventDefault();
      e.stopPropagation();

      if (!bodyStateRef.current) lockBody();

      const delta = e.deltaY;
      const sensitivity = 0.9; // px per delta
      let nextPx = manualPxRef.current + delta * sensitivity;

      if (nextPx <= 0 && delta < 0) {
        manualPxRef.current = 0;
        setManualProgress(0);
        unlockBody();
        setIsLocking(false);
        window.scrollBy(0, delta);
        return;
      }

      if (nextPx >= max && delta > 0) {
        manualPxRef.current = max;
        setManualProgress(1);
        unlockBody();
        setIsLocking(false);
        window.scrollBy(0, delta);
        return;
      }

      manualPxRef.current = Math.max(0, Math.min(max, nextPx));
      setManualProgress(max > 0 ? manualPxRef.current / max : 0);
      setIsLocking(true);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, []);

  // touch handlers
  useEffect(() => {
    let touchStartY: number | null = null;
    const onStart = (e: TouchEvent) => (touchStartY = e.touches[0].clientY);
    const onMove = (e: TouchEvent) => {
      const start = touchStartY;
      if (start === null) return;
      const el = containerRef.current;
      const inner = innerRef.current;
      const left = leftRef.current;
      if (!el || !inner || !left) return;
      const rect = el.getBoundingClientRect();
      const atTop = rect.top <= 0 && rect.bottom > 0;
      if (!atTop) return;

      const deltaY = start - e.touches[0].clientY;
      if (Math.abs(deltaY) < 2) return;

      const containerRect = el.getBoundingClientRect();
      const leftWidth = left.getBoundingClientRect().width;
      const visibleWidth = Math.max(1, containerRect.width - leftWidth);
      const max = Math.max(0, inner.scrollWidth - visibleWidth);
      if (max <= 0) return;

      e.preventDefault();
      e.stopPropagation();

      if (!bodyStateRef.current) lockBody();

      const sensitivity = 1.0;
      let nextPx = manualPxRef.current + deltaY * sensitivity;

      if (nextPx <= 0 && deltaY < 0) {
        manualPxRef.current = 0;
        setManualProgress(0);
        unlockBody();
        setIsLocking(false);
        window.scrollBy(0, deltaY);
        return;
      }

      if (nextPx >= max && deltaY > 0) {
        manualPxRef.current = max;
        setManualProgress(1);
        unlockBody();
        setIsLocking(false);
        window.scrollBy(0, deltaY);
        return;
      }

      manualPxRef.current = Math.max(0, Math.min(max, nextPx));
      setManualProgress(max > 0 ? manualPxRef.current / max : 0);
      setIsLocking(true);
    };

    window.addEventListener('touchstart', onStart, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    return () => {
      window.removeEventListener('touchstart', onStart as any);
      window.removeEventListener('touchmove', onMove as any);
    };
  }, []);

  const progress = isLocking ? manualProgress : scrollProgress;

  const translate = useMemo(() => {
    // translate in pixels based on manual progress and measured maxScrollPx
    const max = maxScrollPx || (ITEMS.length * 50 + (ITEMS.length - 1) * 6 - 70);
    const px = -progress * max;
    return px;
  }, [progress, maxScrollPx]);

  return (
    <section
      id="portfolio"
      ref={containerRef}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      className="relative h-[100vh] bg-black text-white overflow-hidden snap-start"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-white/20">
        <div
          className="h-full bg-white transition-[width] duration-150"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* Left intro */}
      <div ref={leftRef} className="absolute left-0 top-0 h-full w-[30vw] min-w-[280px] p-10 md:p-20 z-10">
        <div className="sticky top-20">
          <h2 className="text-[clamp(28px,4.5vw,64px)] font-serif tracking-[-0.04em] mb-4">
            Our Portfolio
          </h2>
          <div className="h-[2px] w-full bg-white/30 overflow-hidden mb-4">
            <div
              className="h-full bg-white"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <p className="text-white/80 max-w-[400px] text-[18px] leading-relaxed">
            Every event tells a story. Explore the extraordinary experiences
            we've crafted for leading brands and organizations.
          </p>
          <div className="mt-6 text-white/60 text-sm">
            {String(
              Math.min(
                ITEMS.length,
                Math.max(1, Math.round(progress * ITEMS.length)),
              ),
            ).padStart(2, "0")}{" "}
            / {String(ITEMS.length).padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Horizontal gallery */}
      <div className="absolute top-0 left-[30vw] h-full w-[70vw] overflow-hidden">
        <div
          ref={innerRef}
          className="h-full flex items-center gap-[60px] pr-[20vw] will-change-transform"
          style={{
            width: `${ITEMS.length * 50 + (ITEMS.length - 1) * 6}vw`,
            transform: `translate3d(${reduced ? 0 : translate}px, 0, 0)`,
            transition: isLocking ? 'transform 0.12s linear' : undefined,
          }}
        >
          {ITEMS.map((it, idx) => (
            <div key={idx} className="relative w-[50vw] h-[70vh] flex-shrink-0">
              <div className="absolute inset-0 rounded-[24px] overflow-hidden">
                <img
                  src={it.img}
                  alt={it.title}
                  className="w-full h-full object-cover will-change-transform"
                  style={{
                    transform: `scale(${mounted ? 1.1 - progress * 0.1 : 1.1})`,
                  }}
                />
                <div
                  className="absolute bottom-0 left-0 right-0 translate-y-full data-[active=true]:translate-y-0 transition-all duration-500"
                  data-active={
                    idx === Math.round(progress * (ITEMS.length - 1))
                  }
                >
                  <div className="bg-black/80 backdrop-blur-md px-8 py-6">
                    <div className="uppercase tracking-[1.4px] text-[14px] text-white/60 mb-2">
                      {it.client}
                    </div>
                    <div className="text-[28px] font-serif mb-3">
                      {it.title}
                    </div>
                    <div className="text-[16px] text-white/90 leading-snug line-clamp-3">
                      {it.desc}
                    </div>
                    <div className="flex gap-6 text-[14px] text-white/70 mt-4 flex-wrap">
                      {it.stats.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

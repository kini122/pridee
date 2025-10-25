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

  const [manualProgress, setManualProgress] = useState(0);
  const manualRef = useRef(0);
  const [isLocking, setIsLocking] = useState(false);
  const innerRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Handlers for converting vertical scroll to horizontal when section is pinned
  const handleWheel = (e: any) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const atTop = rect.top <= 1 && rect.bottom > 200;
    if (!atTop) return; // allow normal scrolling

    // prevent vertical page scroll while handling
    e.preventDefault();
    e.stopPropagation();

    const delta = e.deltaY;
    const sensitivity = 0.0018; // controls how fast progress changes
    let next = manualRef.current + delta * sensitivity;
    next = Math.max(0, Math.min(1, next));
    manualRef.current = next;
    setManualProgress(next);

    // locking state
    if (next > 0 && next < 1) setIsLocking(true);
    if ((next === 0 && delta < 0) || (next === 1 && delta > 0)) {
      // release lock to allow natural scroll past section
      setIsLocking(false);
    }
  };

  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: any) => {
    touchStartY.current = e.touches[0].clientY;
  };
  const handleTouchMove = (e: any) => {
    const start = touchStartY.current;
    if (start === null) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const atTop = rect.top <= 1 && rect.bottom > 200;
    if (!atTop) return;

    const currentY = e.touches[0].clientY;
    const dy = start - currentY;
    if (Math.abs(dy) < 2) return;
    e.preventDefault();
    e.stopPropagation();

    const sensitivity = 0.0022;
    let next = manualRef.current + dy * sensitivity;
    next = Math.max(0, Math.min(1, next));
    manualRef.current = next;
    setManualProgress(next);
    if (next > 0 && next < 1) setIsLocking(true);
    if ((next === 0 && dy < 0) || (next === 1 && dy > 0)) setIsLocking(false);
  };

  const progress = isLocking ? manualProgress : scrollProgress;

  const translate = useMemo(() => {
    const max = -(ITEMS.length * 50 + (ITEMS.length - 1) * 6 - 70); // -300vw approx
    return max * progress;
  }, [progress]);

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
            transform: `translate3d(${reduced ? 0 : translate}vw, 0, 0)`,
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

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion, useSectionScrollProgress } from "@/hooks/use-scroll";

const IMAGES = {
  layer1: "https://images.pexels.com/photos/14636319/pexels-photo-14636319.jpeg?auto=compress&cs=tinysrgb&w=1600",
  layer2: "https://images.pexels.com/photos/11570131/pexels-photo-11570131.jpeg?auto=compress&cs=tinysrgb&w=1600",
  layer3: "https://images.pexels.com/photos/6405768/pexels-photo-6405768.jpeg?auto=compress&cs=tinysrgb&w=1600",
};

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useSectionScrollProgress(ref);
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const p = progress; // 0..1 through section
  const opacity1 = 0.4 + (reduced ? 0 : p * 0.2);
  const opacity2 = 0.6 + (reduced ? 0 : p * 0.2);
  const opacity3 = 0.8 + (reduced ? 0 : p * 0.2);

  const translateY1 = reduced ? 0 : p * -30; // slowest
  const translateY2 = reduced ? 0 : p * -60; // medium
  const translateY3 = reduced ? 0 : p * -100; // fastest
  const translateX3 = reduced ? 0 : (p - 0.5) * 20;

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-[100vh] bg-soft overflow-hidden snap-start"
      aria-label="From Vision to Unforgettable Reality"
    >
      {/* Parallax layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0 will-change-transform">
        <img
          src={IMAGES.layer1}
          alt="Corporate conference hall"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate3d(0, ${translateY1}px, 0)`,
            opacity: opacity1,
          }}
        />
        <img
          src={IMAGES.layer2}
          alt="Event staging detail"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: `translate3d(0, ${translateY2}px, 0) scale3d(${1.1 - p * 0.1}, ${1.1 - p * 0.1}, 1)`,
            opacity: opacity2,
          }}
        />
        <img
          src={IMAGES.layer3}
          alt="Pride Events signature work"
          className="absolute bottom-0 left-0 w-full h-full object-contain"
          style={{
            transform: `translate3d(${translateX3}px, ${translateY3}px, 0)`,
            opacity: opacity3,
          }}
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 h-full flex items-center justify-center p-[40px] pt-[145px] pb-[100px]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center text-center gap-8">
          <h1
            className={`max-w-[600px] font-serif leading-[1.1] tracking-[-0.04em] text-[clamp(36px,6vw,90px)] ${
              mounted ? "animate-[blur-in_1.2s_ease-out_forwards]" : "opacity-0"
            }`}
            style={{ filter: `blur(${p * 3}px)` }}
          >
            From Vision to Unforgettable Reality
          </h1>
          <div className={`flex items-center gap-4 ${mounted ? "animate-[blur-in_0.8s_ease-out_0.3s_forwards] opacity-0" : ""}`}>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-black text-white px-6 py-3 text-[16px] font-medium transition-transform duration-300 hover:scale-[1.05] shadow-sm"
            >
              Plan your event
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-2 rounded-full bg-white text-black px-6 py-3 text-[16px] font-medium transition-transform duration-300 hover:scale-[1.05] shadow-sm"
            >
              Our portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Exit fade with scroll */}
      <div
        aria-hidden
        className="absolute inset-0 bg-white"
        style={{ opacity: 1 - (reduced ? 1 : 0.7 + p * 0.3) }}
      />
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import {
  usePrefersReducedMotion,
  useSectionScrollProgress,
} from "@/hooks/use-scroll";
import HeroPreview from "./HeroPreview";

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
      {/* Video background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="https://www.pexels.com/download/video/4916813/"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* Center content */}
      <div className="relative z-10 h-full flex items-center justify-center p-[40px] pt-[145px] pb-[100px]">
        <div className="max-w-[1200px] w-full mx-auto flex flex-col items-center text-center gap-8">
          {/* Use the new animated Preview component */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

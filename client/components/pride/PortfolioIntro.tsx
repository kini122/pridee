import React, { useRef, useEffect } from "react";
import { useInView } from "@/hooks/use-scroll";

export default function PortfolioIntro() {
  const ref = useRef<HTMLDivElement>(null);
  const { inView } = useInView(ref, { threshold: 0.2 });

  const images = [
    "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/34362959/pexels-photo-34362959.jpeg?auto=compress&cs=tinysrgb&w=1600",
    "https://images.pexels.com/photos/14999408/pexels-photo-14999408.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ];

  useEffect(() => {
    // simple stagger reveal handled by tailwind classes based on inView
  }, [inView]);

  return (
    <section
      id="portfolio-intro"
      ref={ref}
      className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-[1200px] mx-auto"
    >
      <div className="p-6 md:p-0">
        <h3 className={`text-[clamp(24px,3.5vw,40px)] font-serif tracking-[-0.02em] mb-4 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700`}>
          Our Portfolio
        </h3>
        <p className={`text-[18px] text-gray-700 max-w-[600px] mb-6 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"} transition-all duration-700 delay-100`}>
          Every event tells a story. Explore the extraordinary experiences we've crafted for leading brands and organizations.
        </p>
        <div className={`text-sm text-gray-500 ${inView ? "opacity-100" : "opacity-0"} transition-opacity duration-700 delay-200`}>
          <span className="font-mono">01</span>
          <span className="mx-2">/</span>
          <span className="text-gray-400">06</span>
        </div>
      </div>

      <div className="flex gap-4 justify-center md:justify-end">
        {images.map((src, i) => (
          <div key={i} className={`w-[120px] h-[80px] rounded-lg overflow-hidden shadow-lg ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700 delay-${i * 100}`}>
            <img src={src} alt={`portfolio-${i}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}

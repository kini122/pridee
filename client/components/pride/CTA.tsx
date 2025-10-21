import { useRef } from "react";
import { useInView, useSectionScrollProgress } from "@/hooks/use-scroll";

export default function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { inView } = useInView(ref, { threshold: 0.3 });
  const progress = useSectionScrollProgress(ref);

  return (
    <section
      id="cta"
      ref={ref}
      className="relative min-h-[600px] md:min-h-[100vh] py-[100px] px-[40px] bg-black text-white snap-start overflow-hidden"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage: `url(https://images.pexels.com/photos/3719037/pexels-photo-3719037.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translateY(${-(progress * 0.4) * 100}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
      <div
        className="absolute inset-0 -z-[9]"
        style={{
          background: `linear-gradient(to bottom, rgba(0,0,0,${0.3 + progress * 0.2}), rgba(0,0,0,${0.5 + progress * 0.2}), rgba(0,0,0,${0.3 + progress * 0.2}))`,
          transition: "all 0.6s ease",
        }}
      />

      <div className="max-w-[1200px] mx-auto min-h-[50vh] flex flex-col items-center justify-center gap-10 text-center">
        <h2
          className={`max-w-[800px] text-[clamp(36px,5.5vw,72px)] font-serif tracking-[-0.04em] leading-[1.1] ${inView ? "scale-100 opacity-100" : "scale-[0.95] opacity-0"} transition-all duration-700`}
          style={{ filter: `blur(${inView ? 0 : 10}px)` }}
        >
          Transform your corporate events into extraordinary experiences.
        </h2>
        <a
          href="#contact"
          className={`inline-block bg-white text-black rounded-full px-8 py-4 text-[18px] font-medium transition-all duration-300 hover:scale-[1.05] ${inView ? "animate-float" : ""}`}
        >
          Let's create magic together
        </a>
      </div>
    </section>
  );
}

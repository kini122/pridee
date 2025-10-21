import { useMemo, useRef } from "react";
import { useInView } from "@/hooks/use-scroll";

const TESTIMONIALS = [
  {
    quote:
      "Pride Events delivered an experience that exceeded every expectation — innovative, flawlessly executed, and deeply aligned with our brand.",
    author: "Avery Chen",
    title: "CEO, TechNova",
  },
  {
    quote:
      "Their attention to detail and understanding of premium brand experiences is second to none. Our gala was a masterpiece.",
    author: "Jordan Patel",
    title: "CMO, Luxuria Group",
  },
  {
    quote:
      "Creative, flexible, and professional. The team transformed our vision into an unforgettable event.",
    author: "Samira Al-Farouq",
    title: "Founder, Nimbus Labs",
  },
  {
    quote:
      "Reliable partners with impeccable taste. From planning to execution, everything was seamless.",
    author: "Diego Fernández",
    title: "Director of Events, ProCore",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full snap-start">
      {TESTIMONIALS.map((t, i) => (
        <Testimonial key={i} {...t} index={i} />
      ))}
    </section>
  );
}

function Testimonial({ quote, author, title, index }: { quote: string; author: string; title: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { inView } = useInView(ref, { threshold: 0.4 });

  const words = useMemo(() => quote.split(" "), [quote]);

  return (
    <div
      ref={ref}
      className={`relative min-h-[100vh] px-[40px] py-[120px] flex items-center justify-center ${index % 2 === 0 ? "bg-soft" : "bg-white"}`}
    >
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_20%_20%,#000_0,transparent_40%),radial-gradient(circle_at_80%_60%,#000_0,transparent_35%)]" aria-hidden />
      <div className="max-w-[900px] relative">
        <div className={`absolute -top-10 -left-6 text-[180px] text-black/5 font-serif select-none ${inView ? "scale-100" : "scale-90"}`} aria-hidden>
          “
        </div>
        <p className={`text-[clamp(22px,3.2vw,36px)] leading-[1.5] text-[#1a1a1a] tracking-[-0.04em] mask-gradient transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {words.map((w, i) => (
            <span
              key={i}
              className="inline-block"
              style={{ transition: `opacity 0.6s ease ${i * 0.05}s, transform 0.6s ease ${i * 0.05}s`, opacity: inView ? 1 : 0, transform: `translateY(${inView ? 0 : 10}px)` }}
            >
              {w}
              {" "}
            </span>
          ))}
        </p>
        <div className={`mt-12 flex flex-col ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} transition-all duration-700`}
             style={{ transitionDelay: `${words.length * 0.05 + 0.1}s` }}>
          <div className="text-[18px] font-medium">{author}</div>
          <div className="text-[16px] text-black/60">{title}</div>
        </div>
      </div>
    </div>
  );
}

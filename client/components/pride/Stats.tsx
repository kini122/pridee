import { useRef } from "react";
import { useInView } from "@/hooks/use-scroll";
import { useCountUp } from "@/hooks/use-count-up";

const STATS = [
  { target: 500, suffix: "+", label: "Events Delivered" },
  { target: 50000, suffix: "+", label: "Attendees Delighted" },
  { target: 98, suffix: "%", label: "Client Satisfaction" },
  { target: 15, suffix: "+", label: "Years of Excellence" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const { inView } = useInView(ref, { threshold: 0.3 });

  return (
    <section
      id="stats"
      className="relative min-h-[80vh] py-[120px] px-[40px] snap-start"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.85)), url(https://images.pexels.com/photos/17552417/pexels-photo-17552417.jpeg?auto=compress&cs=tinysrgb&w=1600)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `scale(${inView ? 1.05 : 1})`,
          transition: "transform 1s ease-out",
        }}
      />
      <div className="max-w-[1200px] mx-auto text-center text-white" />
    </section>
  );
}

function Stat({
  target,
  suffix,
  label,
  start,
  index,
}: {
  target: number;
  suffix: string;
  label: string;
  start: boolean;
  index: number;
}) {
  const value = useCountUp(target, 2000, start);
  return (
    <div className="text-center px-5 py-10">
      <div
        className="mx-auto bg-white/60 h-[2px] w-10 mb-6 origin-center"
        style={{
          width: start ? 40 : 0,
          transition: "width 0.6s ease-out",
          transitionDelay: `${index * 150}ms`,
        }}
      />
      <div className="text-[72px] leading-none font-serif tracking-[-0.04em] mb-4">
        {value.toLocaleString()}
        {suffix}
      </div>
      <div className="text-[18px] text-white/80 max-w-[200px] mx-auto">
        {label}
      </div>
    </div>
  );
}

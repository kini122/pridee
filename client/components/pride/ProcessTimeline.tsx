import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "@/hooks/use-scroll";

const STEPS = [
  {
    num: 1,
    title: "Understanding Your Vision",
    step: "Discovery & Consultation",
    desc:
      "Every extraordinary event begins with listening. We immerse ourselves in your goals, brand, and audience to craft a tailored strategy.",
    points: [
      "Initial consultation and goal setting",
      "Audience analysis and event objectives",
      "Budget framework and timeline planning",
      "Brand alignment workshop",
    ],
  },
  {
    num: 2,
    title: "Designing the Experience",
    step: "Creative Conceptualization",
    desc:
      "Our creative team transforms your vision into a compelling event concept with mood boards, themes, and innovative ideas.",
    points: [
      "Theme development and visual identity",
      "Venue scouting and selection",
      "Entertainment and speaker curation",
      "Technology integration planning",
    ],
  },
  {
    num: 3,
    title: "Precision in Every Detail",
    step: "Detailed Planning",
    desc:
      "Meticulous planning ensures flawless execution. We coordinate every element from logistics to guest experience.",
    points: [
      "Comprehensive timeline development",
      "Vendor selection and management",
      "Budget optimization and tracking",
      "Contingency planning",
    ],
  },
  {
    num: 4,
    title: "Bringing It to Life",
    step: "Production & Coordination",
    desc:
      "Our production team handles all technical aspects, ensuring seamless integration of AV, staging, lighting, and décor.",
    points: [
      "Technical production and staging",
      "Lighting and sound design",
      "Décor installation and styling",
      "Rehearsals and run-throughs",
    ],
  },
  {
    num: 5,
    title: "Flawless Delivery",
    step: "Event Execution",
    desc:
      "On event day, our team orchestrates every moment, managing logistics and ensuring your guests have an unforgettable experience.",
    points: [
      "On-site event management",
      "Real-time problem solving",
      "Guest experience optimization",
      "Photography and documentation",
    ],
  },
  {
    num: 6,
    title: "Measuring Success",
    step: "Post-Event Analysis",
    desc:
      "We provide comprehensive post-event analysis, gathering insights and feedback to measure impact and inform future events.",
    points: [
      "Attendee feedback collection",
      "ROI analysis and reporting",
      "Photo and video deliverables",
      "Continuous improvement recommendations",
    ],
  },
];

export default function ProcessTimeline() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const els = Array.from(
      sectionRef.current?.querySelectorAll("[data-step-block]") || []
    ) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.index || 0);
            setActive(idx);
          }
        });
      },
      { threshold: 0.4 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const progressHeight = useMemo(() => ((active + 1) / STEPS.length) * 100, [active]);

  return (
    <section id="process" className="bg-soft py-[80px] px-[40px] min-h-[400vh] snap-start">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-[100px]">
          <h2 className="text-[clamp(28px,4.5vw,64px)] font-serif">Our Process</h2>
          <p className="text-black/60 mt-2">Six steps to extraordinary events</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-10 gap-10" ref={sectionRef}>
          {/* Left sticky nav */}
          <aside className="lg:col-span-4 relative lg:sticky lg:top-[20vh] self-start pr-[60px]">
            <div className="relative">
              <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-black/10" aria-hidden />
              <div className="absolute left-[23px] top-0 w-[2px] bg-black transition-all" style={{ height: `${progressHeight}%` }} aria-hidden />
              <ul className="relative z-10">
                {STEPS.map((s, i) => (
                  <li key={s.num} className="flex items-center mb-10 cursor-pointer" onClick={() => document.getElementById(`step-${s.num}`)?.scrollIntoView({ behavior: "smooth" })}>
                    <div className={`w-12 h-12 rounded-full grid place-items-center border-2 transition-all ${i <= active ? "bg-black text-white border-black scale-100" : "bg-white text-black border-black scale-90"}`}>
                      {s.num}
                    </div>
                    <div className={`ml-5 text-[20px] transition-colors ${i <= active ? "text-black" : "text-black/40"}`}>{s.step}</div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Right content */}
          <div className="lg:col-span-6 pl-[0] lg:pl-[60px]">
            {STEPS.map((s, i) => (
              <article key={s.num} id={`step-${s.num}`} data-step-block data-index={i} className="min-h-[100vh] py-[60px]">
                <div className={`transition-all duration-700 ${i <= active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                  <div className="uppercase text-[14px] tracking-[1.4px] text-black/40 mb-4">Step {s.num}</div>
                  <h3 className="text-[clamp(28px,3.5vw,48px)] font-serif tracking-[-0.04em] mb-4">{s.title}</h3>
                  <p className="text-[18px] text-black/70 leading-[1.7] max-w-[500px] mb-8">{s.desc}</p>
                  <ul className="space-y-4">
                    {s.points.map((p) => (
                      <li key={p} className="relative pl-6 text-[16px] text-black/80">
                        <span className="absolute left-0 top-2 w-2 h-2 bg-black rounded-full" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

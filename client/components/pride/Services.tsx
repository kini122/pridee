import { useEffect, useRef } from "react";
import { useInView, usePrefersReducedMotion } from "@/hooks/use-scroll";
import PortfolioIntro from "./PortfolioIntro";

const SERVICES = [
  {
    title: "Corporate Conferences",
    desc: "Transform business gatherings into inspiring experiences",
    img: "https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Gala Celebrations",
    desc: "Elegant affairs that leave lasting impressions",
    img: "https://images.pexels.com/photos/34362959/pexels-photo-34362959.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Product Launches",
    desc: "Unveil innovations with unforgettable impact",
    img: "https://images.pexels.com/photos/14999408/pexels-photo-14999408.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Team Building Events",
    desc: "Strengthen bonds through curated experiences",
    img: "https://images.pexels.com/photos/4427815/pexels-photo-4427815.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Award Ceremonies",
    desc: "Celebrate excellence with sophistication",
    img: "https://images.pexels.com/photos/19793934/pexels-photo-19793934.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Executive Retreats",
    desc: "Strategic planning in inspiring settings",
    img: "https://images.pexels.com/photos/7108958/pexels-photo-7108958.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-white py-[120px] px-[40px] snap-start">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-[clamp(32px,5vw,72px)] font-serif text-center max-w-[800px] mx-auto leading-tight opacity-0 animate-[blur-in_0.8s_ease-out_forwards]">
          Crafting Extraordinary Moments
        </h2>
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>

        {/* Portfolio intro section */}
        <PortfolioIntro />

      </div>
    </section>
  );
}

function ServiceCard({
  title,
  desc,
  img,
  index,
}: {
  title: string;
  desc: string;
  img: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { inView, entry } = useInView(ref, { threshold: 0.2 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const el = ref.current;
    const bg = el.querySelector(".bg-img") as HTMLElement | null;
    const onScroll = () => {
      if (!entry) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const visible = Math.min(Math.max(vh - rect.top, 0), rect.height + vh);
      const p = Math.min(1, Math.max(0, visible / (rect.height + vh)));
      if (bg)
        bg.style.transform = `translateY(${(-30 * p).toFixed(2)}px) scale3d(${1 + p * 0.05}, ${1 + p * 0.05}, 1)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [entry, reduced]);

  return (
    <div
      ref={ref}
      className={`relative min-h-[500px] rounded-2xl overflow-hidden shadow-sm bg-white transform transition duration-500 will-change-transform ${
        inView
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-10 scale-[0.98]"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-[1]" />
      <div
        className="bg-img absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "transform 0.2s ease-out",
          willChange: "transform",
        }}
      />
      <div className="absolute bottom-0 z-[2] p-10 text-white">
        <h3 className="text-[32px] leading-tight font-serif tracking-[-0.02em] mb-4 transition-transform duration-300 group-hover:-translate-y-1">
          {title}
        </h3>
        <p className="text-[16px] opacity-90 max-w-[90%]">{desc}</p>
      </div>
      <div className="absolute inset-0 transition-transform duration-300 hover:scale-[1.02]" />
    </div>
  );
}

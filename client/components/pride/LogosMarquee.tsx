const LOGOS = [
  "Acme Corp",
  "TechNova",
  "Luxuria",
  "Finexus",
  "Healix",
  "Retailo",
  "ProCore",
  "Studioplex",
  "Voyageon",
  "Cinematica",
  "Nimbus",
  "Harbor & Co",
];

export default function LogosMarquee() {
  return (
    <section id="clients" className="bg-soft py-20 overflow-hidden snap-start">
      <div className="max-w-[1200px] mx-auto px-[40px]">
        <h2 className="text-[clamp(28px,4vw,48px)] font-serif text-center mb-12">
          Trusted by Industry Leaders
        </h2>
      </div>
      <div className="relative">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-soft to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-soft to-transparent"
          aria-hidden
        />
        <div className="flex gap-20 whitespace-nowrap animate-marquee">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <div key={i} className="flex items-center gap-3 px-10">
              <div className="h-10 w-10 rounded bg-black/10" aria-hidden />
              <span className="text-[20px] text-black/70 hover:text-black transition-colors">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

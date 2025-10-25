import { useState } from "react";

export default function CardNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-[9000] bg-white/60 backdrop-blur-sm">
      <div className="max-w-[1200px] mx-auto px-[24px] md:px-[40px] py-4 flex items-center justify-between">
        <a href="#home" className="inline-flex items-center gap-4">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F86b5be3675304cd89cd4a784fb255846%2Ffae401bec529488ca769ffd597166704?format=webp&width=1200"
            alt="Pride Events logo"
            className="h-14 w-auto"
          />
          <span className="hidden sm:inline-block font-serif text-[18px] text-black">
            Pride Events
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-[14px]">
          <a href="#services" className="hover:opacity-60">
            Services
          </a>
          <a href="#portfolio" className="hover:opacity-60">
            Portfolio
          </a>
          <a href="#process" className="hover:opacity-60">
            Process
          </a>
          <a href="#testimonials" className="hover:opacity-60">
            Testimonials
          </a>
          <a href="#contact" className="hover:opacity-60">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden sm:inline-flex rounded-full bg-black text-white px-4 py-2 text-sm"
          >
            Plan your event
          </a>

          <button
            className="md:hidden p-2 rounded-md bg-black/5"
            aria-label="Open menu"
            onClick={() => setOpen((s) => !s)}
          >
            <svg
              className="w-5 h-5 text-black"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white/95 border-t">
          <div className="px-6 py-4 flex flex-col gap-3">
            <a href="#services" className="py-2" onClick={() => setOpen(false)}>
              Services
            </a>
            <a
              href="#portfolio"
              className="py-2"
              onClick={() => setOpen(false)}
            >
              Portfolio
            </a>
            <a href="#process" className="py-2" onClick={() => setOpen(false)}>
              Process
            </a>
            <a
              href="#testimonials"
              className="py-2"
              onClick={() => setOpen(false)}
            >
              Testimonials
            </a>
            <a href="#contact" className="py-2" onClick={() => setOpen(false)}>
              Contact
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

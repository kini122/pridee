import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Check if body is fixed (during portfolio horizontal scroll)
      const isBodyFixed = document.body.style.position === 'fixed';

      if (isBodyFixed) {
        // Hide button during horizontal scroll lock
        setVisible(false);
      } else {
        // Normal scroll behavior
        setVisible(window.scrollY > 200);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Also listen for style changes on body (when lock/unlock happens)
    const observer = new MutationObserver(onScroll);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style']
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <button
      aria-label="Scroll to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-10 right-10 w-14 h-14 rounded-full bg-white shadow-[0_4px_24px_rgba(0,0,0,0.15)] grid place-items-center z-[1000] transition-all duration-300 ${visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
        } hover:-translate-y-1`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M6 15l6-6 6 6"
          stroke="#000"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
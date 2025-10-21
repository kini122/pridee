import { usePageScrollProgress } from "@/hooks/use-scroll";

export default function ScrollProgress() {
  const progress = usePageScrollProgress();
  return (
    <div aria-hidden className="fixed top-0 left-0 w-full h-[3px] z-[9999] bg-black/10">
      <div
        className="h-full bg-gradient-to-r from-black via-black to-black transition-[width] duration-150 ease-linear"
        style={{ width: `${progress * 100}%` }}
      />
    </div>
  );
}

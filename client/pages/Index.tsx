import ScrollProgress from "@/components/pride/ScrollProgress";
import ScrollToTop from "@/components/pride/ScrollToTop";
import Hero from "@/components/pride/Hero";
import Services from "@/components/pride/Services";
import PortfolioHorizontal from "@/components/pride/PortfolioHorizontal";
import Testimonials from "@/components/pride/Testimonials";
import Stats from "@/components/pride/Stats";
import ProcessTimeline from "@/components/pride/ProcessTimeline";
import CTA from "@/components/pride/CTA";
import LogosMarquee from "@/components/pride/LogosMarquee";
import ContactFooter from "@/components/pride/ContactFooter";

export default function Index() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <Header />
      <Hero />
      <Services />
      <PortfolioHorizontal />
      <Testimonials />
      <Stats />
      <ProcessTimeline />
      <CTA />
      <LogosMarquee />
      <ContactFooter />
      <ScrollToTop />
    </main>
  );
}

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-[9000]">
      <div className="max-w-[1200px] mx-auto px-[40px] py-4 flex items-center justify-between">
        <a href="#home" className="font-serif text-[20px]">Pride Events</a>
        <nav className="hidden md:flex items-center gap-6 text-[14px]">
          <a href="#services" className="hover:opacity-60">Services</a>
          <a href="#portfolio" className="hover:opacity-60">Portfolio</a>
          <a href="#process" className="hover:opacity-60">Process</a>
          <a href="#testimonials" className="hover:opacity-60">Testimonials</a>
          <a href="#contact" className="hover:opacity-60">Contact</a>
        </nav>
        <a href="#contact" className="hidden sm:inline-flex rounded-full bg-black text-white px-4 py-2 text-sm">Plan your event</a>
      </div>
    </header>
  );
}

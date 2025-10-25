import ScrollProgress from "@/components/pride/ScrollProgress";
import ScrollToTop from "@/components/pride/ScrollToTop";
import Hero from "@/components/pride/Hero";
import Services from "@/components/pride/Services";
import PortfolioHorizontal from "@/components/pride/PortfolioHorizontal";
import ProcessTimeline from "@/components/pride/ProcessTimeline";
import CTA from "@/components/pride/CTA";
import LogosMarquee from "@/components/pride/LogosMarquee";
import ContactFooter from "@/components/pride/ContactFooter";
import CardNav from "@/components/ui/CardNav";

export default function Index() {
  return (
    <main className="min-h-screen">
      <ScrollProgress />
      <CardNav />
      <Hero />
      <Services />
      <PortfolioHorizontal />
      <ProcessTimeline />
      <CTA />
      <LogosMarquee />
      <ContactFooter />
      <ScrollToTop />
    </main>
  );
}

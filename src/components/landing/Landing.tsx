import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { Faq } from "@/components/landing/Faq";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { LogoStrip } from "@/components/landing/LogoStrip";
import { Nav } from "@/components/landing/Nav";
import { Roadmap } from "@/components/landing/Roadmap";
import { Steps } from "@/components/landing/Steps";
import { TwoWays } from "@/components/landing/TwoWays";

export function Landing() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background text-foreground">
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <LogoStrip />
        <Steps />
        <TwoWays />
        <ArchitectureDiagram />
        <Roadmap />
        <Faq />
      </main>
      <Footer />
    </div>
  );
}

import { ArrowRight, Sparkles } from "lucide-react";

import { HeroArtifact } from "@/components/landing/HeroArtifact";
import { Container } from "@/components/primitives/Container";
import { GradientBlur } from "@/components/primitives/GradientBlur";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <Section id="top" className="pt-16 md:pt-24 lg:pt-28">
      <GradientBlur variant="hero" />
      <Container>
        <div className="flex flex-col items-center text-center">
          <Reveal>
            <Badge variant="accent" className="gap-1.5 border border-foreground/10 px-3 py-1 text-[11px]">
              <Sparkles className="size-3" />
              Closed beta · M0
            </Badge>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-serif-display mt-6 max-w-4xl text-balance text-5xl font-normal leading-[1.02] tracking-tight md:text-6xl lg:text-[80px]">
              Flights, the way agents{" "}
              <span className="italic text-foreground/70">should</span> book them.
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p className="mt-6 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg">
              Search, book, and check in for flights through chat — or wire the same toolkit
              into your own agent over MCP. One backbone, two surfaces, real airline rails.
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-11 px-6 text-sm">
                <a href="#waitlist">
                  Join the waitlist
                  <ArrowRight className="size-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-11 px-6 text-sm">
                <a href="#two-ways">For developers</a>
              </Button>
            </div>
          </Reveal>

          <Reveal delay={320} className="mt-20 w-full md:mt-24">
            <HeroArtifact />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

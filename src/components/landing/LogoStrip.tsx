import { Container } from "@/components/primitives/Container";
import { Section } from "@/components/primitives/Section";

const logos = ["Duffel", "Amadeus", "Anthropic", "Browserbase", "Bun", "MCP"];

export function LogoStrip() {
  return (
    <Section className="py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center gap-6">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Built on a stack you already trust
          </p>
          <div className="grid w-full grid-cols-3 items-center gap-y-6 sm:grid-cols-6 sm:gap-x-8">
            {logos.map((name) => (
              <div
                key={name}
                className="flex items-center justify-center text-center font-serif-display text-base text-foreground/55 transition-colors hover:text-foreground/80 md:text-lg"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}

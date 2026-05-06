import { CircleCheckBig, Plane, Search } from "lucide-react";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";

const steps = [
  {
    icon: Search,
    eyebrow: "01",
    title: "Search",
    body: "Plain-English itinerary in, structured offers out. Trippy hits multiple suppliers in parallel and ranks results.",
  },
  {
    icon: Plane,
    eyebrow: "02",
    title: "Book",
    body: "Confirm fare, pay, and lock the seat — all inside the conversation. Idempotent, with full audit trail.",
  },
  {
    icon: CircleCheckBig,
    eyebrow: "03",
    title: "Check in",
    body: "When the window opens, Trippy checks you in, picks the seat you wanted, and drops the boarding pass in chat.",
  },
];

export function Steps() {
  return (
    <Section id="steps">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>The flow</Eyebrow>
          <h2 className="font-serif-display mt-3 max-w-2xl text-balance text-3xl leading-tight md:text-5xl">
            Three steps. One conversation.
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            From "I need to be in Lisbon Friday" to a boarding pass in your inbox — without
            tab-juggling or fare-hunting.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-3 md:gap-6">
          {steps.map((step, i) => (
            <Reveal
              key={step.title}
              delay={i * 80}
              className="group relative flex flex-col gap-4 rounded-xl border bg-card/60 p-6 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-card md:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex size-9 items-center justify-center rounded-md border bg-background/60 text-foreground/70 transition-colors group-hover:text-foreground">
                  <step.icon className="size-4" />
                </span>
                <span className="font-mono text-[11px] tracking-wider text-muted-foreground">
                  {step.eyebrow}
                </span>
              </div>
              <h3 className="font-serif-display text-2xl">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

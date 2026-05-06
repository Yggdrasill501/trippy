import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { Badge } from "@/components/ui/badge";

type Status = "shipped" | "in-progress" | "next" | "later";

const milestones: { id: string; title: string; body: string; status: Status }[] = [
  {
    id: "M0",
    title: "Foundations",
    body: "Bun + Hono + MCP scaffold, provider abstraction, dev environment.",
    status: "shipped",
  },
  {
    id: "M1",
    title: "Search & book",
    body: "Duffel and Amadeus offers, structured ranking, paid bookings end-to-end.",
    status: "in-progress",
  },
  {
    id: "M2",
    title: "Check-in & seats",
    body: "Online check-in window detection, seat preferences, boarding-pass delivery.",
    status: "next",
  },
  {
    id: "M3",
    title: "Multi-traveler & loyalty",
    body: "Group bookings, frequent-flyer numbers, corporate policy hooks.",
    status: "later",
  },
];

const statusStyles: Record<Status, { label: string; className: string }> = {
  shipped: { label: "Shipped", className: "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  "in-progress": {
    label: "In progress",
    className: "border-foreground/20 bg-foreground/5 text-foreground",
  },
  next: { label: "Next", className: "border-foreground/15 bg-background/40 text-foreground/80" },
  later: { label: "Later", className: "border-dashed border-foreground/15 bg-transparent text-muted-foreground" },
};

export function Roadmap() {
  return (
    <Section id="roadmap">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Roadmap</Eyebrow>
          <h2 className="font-serif-display mt-3 max-w-2xl text-balance text-3xl leading-tight md:text-5xl">
            What's shipped, what's next.
          </h2>
        </Reveal>

        <Reveal delay={100} className="relative mt-14 md:mt-20">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[34px] hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block"
          />
          <ol className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
            {milestones.map((m, i) => {
              const status = statusStyles[m.status];
              return (
                <li key={m.id} className="relative flex flex-col gap-3">
                  <div className="flex items-center gap-3 md:flex-col md:items-start md:gap-4">
                    <span className="relative flex size-7 items-center justify-center rounded-full border bg-background text-[11px] font-mono text-foreground/70 md:size-9 md:text-xs">
                      {m.id}
                      {m.status === "in-progress" && (
                        <span className="absolute inset-0 -z-10 rounded-full bg-foreground/10 animate-pulse-soft" />
                      )}
                    </span>
                    <Badge className={status.className} variant="outline">
                      {status.label}
                    </Badge>
                  </div>
                  <div className="flex flex-col gap-1.5 md:mt-2">
                    <h3 className="font-serif-display text-xl">{m.title}</h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Is Trippy actually booking real flights?",
    a: "Yes — through Duffel and Amadeus, the same rails most online travel agencies use. Bookings are confirmed by the airline, with PNRs delivered to your inbox.",
  },
  {
    q: "How is this different from a chat-shaped meta-search?",
    a: "Trippy doesn't bounce you to a third-party site at checkout. Search, payment, ticketing, and online check-in all happen inside the agent — the same toolkit on chat or MCP.",
  },
  {
    q: "Do you store payment details?",
    a: "Card data is tokenized at the PSP. Trippy keeps the token and the order; the PAN never touches our servers. PCI scope is kept minimal by design.",
  },
  {
    q: "Can I run my own agent on top?",
    a: "That's the point. The MCP server exposes the same tools (search_offers, create_order, check_in) the consumer chat uses. Add it to Claude Desktop or wire it into your own agent.",
  },
  {
    q: "What about cancellations and changes?",
    a: "Voluntary changes follow each fare's rules; involuntary disruptions trigger reaccommodation through the provider. Both flows are conversational — no portal-hopping.",
  },
  {
    q: "Where is Trippy hosted?",
    a: "The runtime is a single Bun process on a EU region by default; data residency for non-EU users is on the M3 roadmap.",
  },
];

export function Faq() {
  return (
    <Section id="faq">
      <Container>
        <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:gap-16">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="font-serif-display mt-3 text-balance text-3xl leading-tight md:text-4xl">
              Questions, answered.
            </h2>
            <p className="mt-4 text-sm text-muted-foreground">
              Still curious? <a href="mailto:hi@trippy.app" className="text-foreground underline-offset-4 hover:underline">Email us</a>.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <Accordion type="single" defaultValue="q-0" className="rounded-xl border bg-card/40 px-5 backdrop-blur-sm">
              {faqs.map((item, i) => (
                <AccordionItem key={item.q} value={`q-${i}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent>{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

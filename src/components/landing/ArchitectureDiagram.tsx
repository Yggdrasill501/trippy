import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";

function Diagram() {
  return (
    <svg
      role="img"
      aria-label="Architecture: client surfaces hit a Trippy provider abstraction that routes to Duffel, Amadeus, or Stagehand fallback."
      viewBox="0 0 920 360"
      className="w-full text-foreground"
    >
      <defs>
        <linearGradient id="dashGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.05" />
          <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* clients */}
      <g className="text-foreground/80">
        <rect x="20" y="40" width="160" height="56" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <text x="100" y="66" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">Chat (trippy.app)</text>
        <text x="100" y="84" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">Streaming UI</text>

        <rect x="20" y="160" width="160" height="56" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <text x="100" y="186" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">MCP host</text>
        <text x="100" y="204" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">Claude / Cursor / agent</text>

        <rect x="20" y="280" width="160" height="56" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <text x="100" y="306" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">REST / Webhooks</text>
        <text x="100" y="324" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">3rd-party automation</text>
      </g>

      {/* core */}
      <g>
        <rect
          x="340"
          y="120"
          width="240"
          height="120"
          rx="14"
          fill="currentColor"
          fillOpacity="0.04"
          stroke="currentColor"
          strokeOpacity="0.3"
        />
        <text x="460" y="160" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.6" letterSpacing="2">
          PROVIDER ABSTRACTION
        </text>
        <text x="460" y="190" textAnchor="middle" fontSize="20" fill="currentColor" fillOpacity="0.95" fontFamily="Instrument Serif, serif">
          Trippy core
        </text>
        <text x="460" y="214" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">
          search · book · check-in · payments
        </text>
      </g>

      {/* providers */}
      <g className="text-foreground/80">
        <rect x="740" y="40" width="160" height="56" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <text x="820" y="66" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">Duffel</text>
        <text x="820" y="84" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">primary GDS</text>

        <rect x="740" y="160" width="160" height="56" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <text x="820" y="186" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">Amadeus</text>
        <text x="820" y="204" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">long-haul / corporate</text>

        <rect x="740" y="280" width="160" height="56" rx="10" fill="none" stroke="currentColor" strokeOpacity="0.2" />
        <text x="820" y="306" textAnchor="middle" fontSize="13" fill="currentColor" fillOpacity="0.85">Stagehand</text>
        <text x="820" y="324" textAnchor="middle" fontSize="11" fill="currentColor" fillOpacity="0.5">browser fallback</text>
      </g>

      {/* connections — clients to core */}
      <g stroke="currentColor" strokeOpacity="0.25" fill="none">
        <path d="M180 68 C 260 68, 280 168, 340 168" strokeWidth="1.2" />
        <path d="M180 188 L 340 188" strokeWidth="1.2" />
        <path d="M180 308 C 260 308, 280 208, 340 208" strokeWidth="1.2" />
      </g>

      {/* connections — core to providers, top one is "active" */}
      <g fill="none">
        <path
          d="M580 168 C 640 68, 680 68, 740 68"
          stroke="currentColor"
          strokeOpacity="0.55"
          strokeWidth="1.4"
          strokeDasharray="3 6"
          className="animate-dash-flow"
        />
        <path d="M580 180 L 740 188" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
        <path d="M580 200 C 640 308, 680 308, 740 308" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.2" />
      </g>

      {/* moving dot on active path */}
      <circle r="3" fill="currentColor" fillOpacity="0.7">
        <animateMotion dur="3.6s" repeatCount="indefinite" path="M580 168 C 640 68, 680 68, 740 68" />
      </circle>
    </svg>
  );
}

export function ArchitectureDiagram() {
  return (
    <Section id="architecture">
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Under the hood</Eyebrow>
          <h2 className="font-serif-display mt-3 max-w-2xl text-balance text-3xl leading-tight md:text-5xl">
            One provider abstraction. Multiple rails.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Duffel for breadth, Amadeus for depth, and a Stagehand-driven browser fallback for the
            long tail. Failover happens at the offer level, not at the booking step.
          </p>
        </Reveal>

        <Reveal delay={100} className="mt-12 rounded-2xl border bg-card/40 p-6 backdrop-blur-sm md:p-10">
          <Diagram />
        </Reveal>
      </Container>
    </Section>
  );
}

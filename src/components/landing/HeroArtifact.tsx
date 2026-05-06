import { ArrowUpRight, Plane, User } from "lucide-react";

function ChatCard() {
  return (
    <div className="absolute left-0 top-6 w-[260px] rounded-xl border bg-card/90 p-4 shadow-2xl shadow-black/10 backdrop-blur-md md:left-2 md:top-2 md:w-[300px] dark:bg-card/80 dark:shadow-black/40 animate-float-y-slow">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="size-6 rounded-full bg-foreground/5 ring-1 ring-foreground/10 flex items-center justify-center">
            <User className="size-3 text-foreground/70" />
          </span>
          <span className="text-xs font-medium text-foreground/80">You</span>
        </div>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Now</span>
      </div>
      <p className="mt-3 text-sm leading-snug text-foreground">
        Find me a Friday flight to Lisbon, under €250, window seat, back Sunday.
      </p>
      <div className="mt-4 flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
        <span className="relative flex size-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-foreground/40 animate-pulse-soft" />
          <span className="relative inline-flex size-2 rounded-full bg-foreground/80" />
        </span>
        <span className="text-xs text-muted-foreground">searching 3 providers…</span>
      </div>
    </div>
  );
}

const offers = [
  { airline: "TAP", route: "PRG → LIS", time: "07:40 — 10:25", price: "€198", tag: "Best" },
  { airline: "Ryanair", route: "PRG → LIS", time: "12:10 — 15:00", price: "€164", tag: "Cheapest" },
  { airline: "Lufthansa", route: "PRG → LIS", time: "16:35 — 21:50", price: "€231", tag: "Flex" },
];

function OffersCard() {
  return (
    <div className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-card/95 p-4 shadow-2xl shadow-black/10 backdrop-blur-md md:w-[320px] dark:bg-card/85 dark:shadow-black/50 animate-float-y">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">3 offers</span>
        <span className="text-[10px] text-muted-foreground">streaming</span>
      </div>
      <div className="mt-3 flex flex-col gap-2">
        {offers.map((offer, i) => (
          <div
            key={offer.airline}
            className="group/offer flex items-center justify-between rounded-lg border bg-background/40 px-3 py-2.5 text-xs transition-colors hover:border-foreground/20 hover:bg-background/70"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="flex items-center gap-3">
              <span className="size-7 rounded-md bg-foreground/5 ring-1 ring-foreground/10" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{offer.airline}</span>
                <span className="text-[11px] text-muted-foreground">{offer.time}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-mono text-sm font-medium text-foreground">{offer.price}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{offer.tag}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BoardingPassCard() {
  return (
    <div className="absolute right-0 bottom-4 w-[260px] rounded-xl border bg-card/90 p-4 shadow-2xl shadow-black/10 backdrop-blur-md md:right-2 md:bottom-2 md:w-[300px] dark:bg-card/80 dark:shadow-black/40 animate-float-y-slow [animation-delay:1.2s]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Boarding pass
        </span>
        <Plane className="size-4 text-foreground/60" />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">From</span>
          <div className="font-serif-display text-2xl leading-none">PRG</div>
          <div className="mt-1 text-[11px] text-muted-foreground">07:40</div>
        </div>
        <div className="text-right">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">To</span>
          <div className="font-serif-display text-2xl leading-none">LIS</div>
          <div className="mt-1 text-[11px] text-muted-foreground">10:25</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between border-t pt-3">
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Seat</span>
          <div className="font-mono text-sm text-foreground">14A</div>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Gate</span>
          <div className="font-mono text-sm text-foreground">B12</div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-foreground/5 px-2 py-1 text-[11px] font-medium ring-1 ring-foreground/10">
          checked in
          <ArrowUpRight className="size-3" />
        </span>
      </div>
    </div>
  );
}

function ConnectorPaths() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 h-full w-full text-foreground/30"
      viewBox="0 0 800 420"
      fill="none"
      preserveAspectRatio="none"
    >
      <path
        d="M 240 90 C 320 90, 320 200, 400 210"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 6"
        className="animate-dash-flow"
      />
      <path
        d="M 400 210 C 480 220, 480 340, 560 340"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 6"
        className="animate-dash-flow"
      />
    </svg>
  );
}

export function HeroArtifact() {
  return (
    <div className="relative mx-auto aspect-[16/10] w-full max-w-4xl">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-3xl border border-border/60 bg-gradient-to-b from-background/40 to-background/0 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-3xl text-foreground/5 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)] dotted-grid"
      />
      <ConnectorPaths />
      <div className="relative h-full w-full">
        <ChatCard />
        <OffersCard />
        <BoardingPassCard />
      </div>
    </div>
  );
}

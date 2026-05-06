# Trippy

An AI agent that searches, books, and checks in for flights. Callable by other agents over MCP, or directly by users through a chat UI.

## What it does

Given a user's travel preferences (origin, destination, dates, budget, carrier preferences), the agent:

1. **Searches** flights across providers and ranks results against the user's preferences.
2. **Books** the chosen flight end-to-end, handling passenger details and payment.
3. **Checks in** at the right time and delivers a boarding pass — automatically, without the user lifting a finger.

It works through aggregator APIs where possible (Duffel, Amadeus) and falls back to browser automation for carriers and flows that have no API — primarily airline-direct booking and online check-in.

## Two ways to use it

- **As a tool for other agents (A2A).** The agent exposes its capabilities over MCP (Model Context Protocol) and a REST API. Any MCP-compatible client (Claude, Cursor, custom agents) can discover and call its tools.
- **Directly, as a user.** A React chat UI talks to the same backend. Streaming responses, booking confirmations, and boarding passes all in one place.

## Status

Early stage. Active milestone: **Milestone 0 — Foundations** (see [`MILESTONE-0.md`](./MILESTONE-0.md)).

| Milestone | Goal                                          | Status      |
| --------- | --------------------------------------------- | ----------- |
| 0         | Plumbing: server, registry, mock provider, CI | In progress |
| 1         | Search agent against real provider, MCP + UI  | Not started |
| 2         | Booking flow with API + browser fallback      | Not started |
| 3         | Automated check-in, boarding pass delivery    | Not started |

## Architecture at a glance

```
   Web UI (React)         External agents (MCP)
        │                          │
        └────────────┬─────────────┘
                     ▼
            Hono server (Bun)
                     │
            ┌────────┴────────┐
            │  Tool registry  │   one definition, many transports
            └────────┬────────┘
                     ▼
              Agent loop (LLM)
                     │
            ┌────────┴─────────┐
            │ FlightProvider   │
            └──────────────────┘
              │       │       │
           Duffel  Amadeus  Browser (Stagehand)
```

Two architectural decisions worth knowing up front:

- **One capability registry, multiple transports.** Tools are defined once with Zod schemas. The MCP server, REST API, and agent loop all consume the same registry. No duplicated logic.
- **API where you can, browser where you must.** Aggregator APIs cover most carriers for search and booking. Browser automation is the fallback, not the default — same `FlightProvider` interface, different implementation.

Full design rationale lives in [`ARCHITECTURE.md`](./ARCHITECTURE.md).

## Stack

| Layer           | Choice                               |
| --------------- | ------------------------------------ |
| Runtime         | Bun                                  |
| HTTP server     | Hono                                 |
| Validation      | Zod                                  |
| Database        | Postgres + Drizzle ORM               |
| Background jobs | pg-boss (added in milestone 3)       |
| LLM             | Anthropic Claude via SDK             |
| Flight APIs     | Duffel (primary), Amadeus (fallback) |
| Browser agent   | Stagehand on Browserbase             |
| Web UI          | Vite + React + shadcn/ui + Tailwind  |
| Tests           | Vitest                               |
| Lint / format   | Biome                                |
| CI              | GitHub Actions                       |

## Repo layout

```
flight-agent/
├── src/
│   ├── server.ts          # Hono entry, mounts routes/MCP
│   ├── env.ts             # Zod-validated env
│   ├── tools/             # Tool registry + tool definitions
│   ├── providers/         # FlightProvider implementations
│   ├── agent/             # LLM loop (added in M1)
│   ├── mcp/               # MCP server (added in M1)
│   ├── routes/            # REST routes
│   ├── db/                # Drizzle schema + client
│   ├── lib/               # Shared schemas, utils
│   └── jobs/              # Background workers (added in M3)
├── web/                   # Vite + React UI (added in M1)
├── tests/                 # Vitest
├── drizzle/               # Generated migrations
├── ARCHITECTURE.md        # Full system design
├── MILESTONE-0.md         # Current implementation plan
└── README.md              # You are here
```

## Quick start

Prereqs: [Bun](https://bun.sh) and Docker.

```bash
# 1. Clone and install
git clone <repo-url> flight-agent
cd flight-agent
bun install

# 2. Local Postgres
docker compose up -d

# 3. Env
cp .env.example .env

# 4. DB migrations
bun run db:migrate

# 5. Run
bun run dev
```

Smoke test:

```bash
curl -s -X POST localhost:3000/api/flights/search \
  -H 'content-type: application/json' \
  -d '{"origin":"PRG","destination":"LIS","departDate":"2026-06-15","passengers":{"adults":1}}' \
  | jq
```

You should see a JSON object with mock offers sorted by price.

## Scripts

| Command               | What it does                                 |
| --------------------- | -------------------------------------------- |
| `bun run dev`         | Start the server with file watching          |
| `bun run start`       | Start without watching (for prod-like runs)  |
| `bun run typecheck`   | TypeScript with `--noEmit`                   |
| `bun run lint`        | Biome check                                  |
| `bun run lint:fix`    | Biome check with auto-fix                    |
| `bun run format`      | Biome format                                 |
| `bun run test`        | Vitest, run once                             |
| `bun run test:watch`  | Vitest in watch mode                         |
| `bun run db:generate` | Generate a new migration from schema changes |
| `bun run db:migrate`  | Apply pending migrations                     |
| `bun run db:studio`   | Open Drizzle Studio                          |

## Development principles

A short list, in priority order:

1. **Run it after every step.** Each milestone doc has Verify checkpoints. Skipping them means debugging compound failures later.
2. **One registry, validated at the edges.** Every tool is defined once with input + output Zod schemas. The registry is the only thing that calls `execute`.
3. **Idempotency on writes.** Booking and check-in must be safe to retry. Every write tool takes a client-generated key. (Enforced from M2 onward.)
4. **Sandbox by default.** Real provider credentials default to test environments. Production keys require an explicit env flag.
5. **Defer aggressively.** Each milestone has an explicit "deliberately defer" list. If you're building something not in the current milestone, stop and write it down for later instead.

## Documentation

- [`ARCHITECTURE.md`](./ARCHITECTURE.md) — full system design, milestone breakdown, decision log
- [`MILESTONE-0.md`](./MILESTONE-0.md) — current implementation plan with file-by-file steps
- Future: `MILESTONE-1.md`, `MILESTONE-2.md`, `MILESTONE-3.md`

## Contributing

Solo for now. When this opens up, expect: PRs go through CI (typecheck, lint, test), no direct commits to `main`, every PR references a milestone.

## License

TBD.

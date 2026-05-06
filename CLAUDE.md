# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun install          # install deps
bun dev              # dev server with HMR (src/index.ts, hot reload)
bun start            # production server (NODE_ENV=production)
bun run build        # bundle to ./dist via build.ts
bun test             # run tests (use `bun:test`, not jest/vitest)
bun test path/to/file.test.ts   # run a single test file

bunx --bun shadcn@latest add <component>   # add a shadcn/ui component into src/components/ui
```

There is no separate lint/typecheck script. For typechecking, run `bunx tsc --noEmit`.

Smoke-test the running server:

```bash
curl -sS http://localhost:3000/api/hello
curl -sS -X POST http://localhost:3000/mcp \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## Architecture

**Single Bun process serves the SPA, the HTTP API, and the MCP server.** `src/index.ts` calls `Bun.serve({ routes })` with three entries, in this order of specificity (Bun matches exact > param > wildcard):

- `"/api/*"` and `"/mcp"` → `req => app.fetch(req)`, delegating to the Hono app in `src/server/app.ts`.
- `"/*"` → `index` (imported from `src/index.html`), the SPA catch-all.

Bun handles bundling of the SPA on demand in dev and via `build.ts` for production — there is no Vite, webpack, or esbuild config. **Do not** add a `"/*": index` wildcard above the `/api/*` entry; routes are matched by specificity, but a stray exact `/` mapping to `index` would also intercept other paths if reordered. Keep all server-side logic inside the Hono app.

**Hono app (`src/server/app.ts`).** Owns every non-SPA route. New API endpoints go here as `app.get(...)`, `app.post(...)`, etc. The `/mcp` route is `app.all(...)`, since Streamable HTTP uses GET (SSE), POST (JSON-RPC), and DELETE (session terminate) on the same path.

**MCP server (`src/server/mcp.ts`).** Exports a singleton `McpServer` from `@modelcontextprotocol/sdk`. Tools are added with `mcpServer.registerTool(name, { title, description, inputSchema }, handler)` where `inputSchema` is a Zod *raw shape* (`{ field: z.string() }`), not `z.object({...})`. The handler receives the parsed args and returns `{ content: [{ type: "text", text }] }`. The transport (`StreamableHTTPTransport` from `@hono/mcp`) is created once in `app.ts` and connected lazily on the first request via `mcpServer.isConnected()` — this is the stateless pattern; if you need per-session state, switch to creating a transport per request and tracking session IDs.

**HTML-driven entry chain.** `src/index.html` loads `./frontend.tsx`, which mounts `<App />` into `#root`. Bun transpiles `.tsx` automatically when imported from HTML. `frontend.tsx` uses `import.meta.hot.data` to keep the React root across HMR reloads — do not replace this with a plain `createRoot(...).render(...)` or HMR will remount the tree on every change.

**Tailwind v4 with CSS-only config.** `styles/globals.css` uses `@import "tailwindcss"` plus `@theme inline { ... }` and defines every shadcn CSS variable (background, foreground, primary, …) under `:root` and `.dark`. There is no `tailwind.config.js`. `bun-plugin-tailwind` (configured globally in `bunfig.toml` for dev, and passed in `build.ts` for prod) processes Tailwind during bundling. `src/index.css` imports `globals.css` and adds page-level base styles.

**Production build.** `build.ts` globs `src/**/*.html` as entrypoints, runs `Bun.build` with `bun-plugin-tailwind`, minifies, and emits to `dist/`. To add another page, create another `.html` file under `src/` — it will be picked up automatically.

**Path alias.** `@/*` maps to `./src/*` (`tsconfig.json`). shadcn's `components.json` uses this alias for `components`, `lib`, `hooks`, and `ui`. The shadcn config is `style: "new-york"`, `baseColor: "neutral"`, `iconLibrary: "lucide"`, and writes Tailwind tokens into `styles/globals.css`.

## Bun conventions (from `.cursor/rules/`)

Always prefer Bun built-ins over Node ecosystem packages:

- `bun <file>` instead of `node` or `ts-node`; `bunx` instead of `npx`.
- `Bun.serve()` for HTTP/WebSockets — do not add `express`.
- `bun:sqlite`, `Bun.redis`, `Bun.sql` for SQLite/Redis/Postgres — do not add `better-sqlite3`, `ioredis`, `pg`.
- `Bun.file` over `node:fs` `readFile`/`writeFile`; `Bun.$` over `execa`.
- Bun auto-loads `.env` — do not add `dotenv`.
- `bun test` (`import { test, expect } from "bun:test"`) — do not add jest/vitest.
- For frontend, keep using HTML imports with `Bun.serve()` — do not introduce Vite.

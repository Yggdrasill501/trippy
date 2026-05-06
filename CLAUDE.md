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

## Architecture

**Single Bun process serves both frontend and API.** `src/index.ts` calls `Bun.serve({ routes })` and maps `"/*": index` where `index` is imported directly from `src/index.html`. Bun handles bundling on demand in dev and via `build.ts` for production — there is no Vite, webpack, or esbuild config. Add API routes alongside the `"/*"` route in `src/index.ts`.

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

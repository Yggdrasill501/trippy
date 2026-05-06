import { serve } from "bun";
import index from "./index.html";
import { app } from "./server/app";

const server = serve({
  routes: {
    "/api/*": req => app.fetch(req),
    "/mcp": req => app.fetch(req),
    "/health": req => app.fetch(req),
    "/*": index,
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});

console.log(`Server running at ${server.url}`);

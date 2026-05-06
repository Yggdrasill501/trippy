import { StreamableHTTPTransport } from "@hono/mcp";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { registry, ToolValidationError } from "@/tools";
import { mcpServer } from "./mcp";

const app = new Hono();

app.use("*", logger());

app.get("/health", c => c.json({ status: "ok", uptime: process.uptime() }));

app.get("/api/hello", c => c.json({ message: "Hello, world!" }));
app.get("/api/hello/:name", c => c.json({ message: `Hello, ${c.req.param("name")}!` }));

app.post("/api/flights/search", async c => {
  const body = await c.req.json().catch(() => null);
  const requestId = crypto.randomUUID();
  try {
    const result = await registry.execute("search_flights", body, { requestId });
    return c.json(result);
  } catch (err) {
    if (err instanceof ToolValidationError) {
      return c.json(
        { error: err.message, side: err.side, issues: err.zodError.issues },
        400,
      );
    }
    throw err;
  }
});

const transport = new StreamableHTTPTransport();

app.all("/mcp", async c => {
  if (!mcpServer.isConnected()) {
    await mcpServer.connect(transport);
  }
  return (await transport.handleRequest(c)) ?? c.body(null, 204);
});

app.notFound(c => c.json({ error: "Not found" }, 404));
app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

export { app };

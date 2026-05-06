import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export const mcpServer = new McpServer({
  name: "trippy",
  version: "0.1.0",
});

mcpServer.registerTool(
  "echo",
  {
    title: "Echo",
    description: "Returns the input message verbatim.",
    inputSchema: { message: z.string() },
  },
  async ({ message }) => ({
    content: [{ type: "text", text: message }],
  }),
);

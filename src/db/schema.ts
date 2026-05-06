import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const agentRuns = pgTable("agent_runs", {
  id: uuid("id").defaultRandom().primaryKey(),
  toolName: text("tool_name").notNull(),
  status: text("status", { enum: ["ok", "error"] }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

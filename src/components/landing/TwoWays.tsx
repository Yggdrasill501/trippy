import { MessageSquare, Plug, Send, Terminal } from "lucide-react";

import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { GradientBlur } from "@/components/primitives/GradientBlur";
import { Reveal } from "@/components/primitives/Reveal";
import { Section } from "@/components/primitives/Section";
import { CodeBlock } from "@/components/primitives/CodeBlock";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ChatMock() {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card/70 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-emerald-500/80" />
          <span className="text-xs text-muted-foreground">trippy.app/chat</span>
        </div>
        <MessageSquare className="size-3.5 text-muted-foreground" />
      </div>

      <div className="self-end max-w-[80%] rounded-2xl rounded-tr-sm bg-foreground/5 px-3.5 py-2 text-sm">
        Cheapest one-way Prague to Lisbon next Friday, hand luggage only.
      </div>
      <div className="self-start max-w-[88%] rounded-2xl rounded-tl-sm border bg-background/60 px-3.5 py-2.5 text-sm">
        <p>Three options under €200. Ryanair at €164 is the lowest, no checked bag.</p>
        <div className="mt-2 grid gap-1.5 font-mono text-[12px]">
          <div className="flex justify-between">
            <span>Ryanair · 12:10 → 15:00</span>
            <span className="text-foreground/70">€164</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>TAP · 07:40 → 10:25</span>
            <span>€198</span>
          </div>
        </div>
      </div>

      <div className="self-end max-w-[60%] rounded-2xl rounded-tr-sm bg-foreground/5 px-3.5 py-2 text-sm">
        Book the Ryanair one.
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-lg border bg-muted/40 p-2.5">
        <input
          aria-label="Message Trippy (mock)"
          disabled
          placeholder="Ask anything…"
          className="flex-1 bg-transparent text-sm text-muted-foreground outline-none"
        />
        <button
          type="button"
          aria-label="Send"
          className="inline-flex size-7 items-center justify-center rounded-md bg-foreground/10 text-foreground/70"
          disabled
        >
          <Send className="size-3.5" />
        </button>
      </div>
    </div>
  );
}

const mcpToolsList = `// MCP tools/list response
{
  "tools": [
    { "name": "search_offers",
      "description": "Search flight offers across Duffel, Amadeus, fallbacks." },
    { "name": "create_order",
      "description": "Book a selected offer; idempotent on client_token." },
    { "name": "check_in",
      "description": "Perform online check-in at the airline window." }
  ]
}`;

const claudeDesktopConfig = `// ~/.config/claude/claude_desktop_config.json
{
  "mcpServers": {
    "trippy": {
      "command": "bunx",
      "args": ["-y", "@trippy/mcp", "--profile", "personal"]
    }
  }
}`;

export function TwoWays() {
  return (
    <Section id="two-ways" className="relative">
      <GradientBlur variant="mid" />
      <Container>
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow>Two surfaces, one engine</Eyebrow>
          <h2 className="font-serif-display mt-3 max-w-2xl text-balance text-3xl leading-tight md:text-5xl">
            Use it as a chat. Or wire it into your own agent.
          </h2>
          <p className="mt-4 max-w-2xl text-sm text-muted-foreground md:text-base">
            Trippy ships an end-user chat at <span className="font-mono text-foreground/80">trippy.app</span>{" "}
            and an MCP server with the same toolkit. Same calls, same guarantees.
          </p>
        </Reveal>

        <Reveal delay={120} className="mx-auto mt-12 max-w-4xl">
          <Tabs defaultValue="chat">
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="chat">
                  <MessageSquare className="size-3.5" />
                  Chat
                </TabsTrigger>
                <TabsTrigger value="mcp">
                  <Terminal className="size-3.5" />
                  MCP
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="mt-8">
              <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-center">
                <ChatMock />
                <div className="flex flex-col gap-3">
                  <span className="inline-flex w-fit items-center gap-2 rounded-md border bg-background/40 px-2 py-1 text-[11px] text-muted-foreground">
                    <Plug className="size-3" />
                    Hosted at trippy.app/chat
                  </span>
                  <h3 className="font-serif-display text-2xl">A consumer-grade UI</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Streaming responses, structured offer cards, payment, and check-in — all in one
                    pane of glass. Built on the same MCP toolkit shipped to developers.
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mcp" className="mt-8">
              <div className="grid gap-6 md:grid-cols-[1.1fr_1fr] md:items-start">
                <div className="flex flex-col gap-4">
                  <CodeBlock language="json" filename="trippy/tools.json">
                    <code>{mcpToolsList}</code>
                  </CodeBlock>
                  <CodeBlock language="json" filename="claude_desktop_config.json">
                    <code>{claudeDesktopConfig}</code>
                  </CodeBlock>
                </div>
                <div className="flex flex-col gap-3 md:pt-4">
                  <span className="inline-flex w-fit items-center gap-2 rounded-md border bg-background/40 px-2 py-1 text-[11px] text-muted-foreground">
                    <Terminal className="size-3" />
                    Streamable HTTP · @hono/mcp
                  </span>
                  <h3 className="font-serif-display text-2xl">Drop into any MCP host</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Add Trippy to Claude Desktop, Cursor, or your own agent. The server speaks the
                    Streamable HTTP transport — no SDKs, no glue code.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Reveal>
      </Container>
    </Section>
  );
}

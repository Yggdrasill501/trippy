import type { z } from "zod";

export type ToolContext = {
  requestId: string;
};

export type Tool<I = unknown, O = unknown> = {
  name: string;
  description: string;
  inputSchema: z.ZodType<I>;
  outputSchema: z.ZodType<O>;
  execute: (input: I, ctx: ToolContext) => Promise<O>;
};

export function defineTool<I, O>(tool: Tool<I, O>): Tool<I, O> {
  return tool;
}

export class ToolValidationError extends Error {
  constructor(
    public side: "input" | "output",
    public tool: string,
    public zodError: z.ZodError,
  ) {
    super(`Tool ${tool} ${side} validation failed`);
    this.name = "ToolValidationError";
  }
}

export class ToolRegistry {
  private tools = new Map<string, Tool<unknown, unknown>>();

  register<I, O>(tool: Tool<I, O>): void {
    if (this.tools.has(tool.name)) {
      throw new Error(`Tool already registered: ${tool.name}`);
    }
    this.tools.set(tool.name, tool as Tool<unknown, unknown>);
  }

  get(name: string): Tool<unknown, unknown> | undefined {
    return this.tools.get(name);
  }

  list(): Tool<unknown, unknown>[] {
    return [...this.tools.values()];
  }

  async execute(name: string, rawInput: unknown, ctx: ToolContext): Promise<unknown> {
    const tool = this.tools.get(name);
    if (!tool) throw new Error(`Unknown tool: ${name}`);

    const parsedInput = tool.inputSchema.safeParse(rawInput);
    if (!parsedInput.success) {
      throw new ToolValidationError("input", name, parsedInput.error);
    }

    const result = await tool.execute(parsedInput.data, ctx);

    const parsedOutput = tool.outputSchema.safeParse(result);
    if (!parsedOutput.success) {
      throw new ToolValidationError("output", name, parsedOutput.error);
    }
    return parsedOutput.data;
  }
}

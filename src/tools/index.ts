import { ToolRegistry } from "./registry";
import { searchFlights } from "./search-flights";

export { ToolValidationError } from "./registry";
export type { Tool, ToolContext } from "./registry";

export const registry = new ToolRegistry();
registry.register(searchFlights);

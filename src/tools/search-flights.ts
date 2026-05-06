import { z } from "zod";
import { Offer, SearchInput } from "@/lib/schemas";
import { mockProvider } from "@/providers/mock";
import { defineTool } from "./registry";

const Output = z.object({ offers: z.array(Offer) });

export const searchFlights = defineTool({
  name: "search_flights",
  description:
    "Search flights and return offers ranked by price. Currently uses a mock provider.",
  inputSchema: SearchInput,
  outputSchema: Output,
  async execute(input) {
    const offers = await mockProvider.search(input);
    offers.sort((a, b) => a.price.amount - b.price.amount);
    return { offers };
  },
});

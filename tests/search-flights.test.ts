import { describe, expect, it } from "bun:test";
import { registry } from "@/tools";

const ctx = { requestId: "test" };

type SearchResult = { offers: Array<{ price: { amount: number } }> };

describe("search_flights", () => {
  it("returns offers sorted by price", async () => {
    const result = (await registry.execute(
      "search_flights",
      {
        origin: "PRG",
        destination: "LIS",
        departDate: "2026-06-15",
        passengers: { adults: 1, children: 0, infants: 0 },
      },
      ctx,
    )) as SearchResult;

    expect(result.offers.length).toBeGreaterThan(0);
    for (let i = 1; i < result.offers.length; i++) {
      expect(result.offers[i]!.price.amount).toBeGreaterThanOrEqual(
        result.offers[i - 1]!.price.amount,
      );
    }
  });

  it("is deterministic for the same input", async () => {
    const input = {
      origin: "PRG",
      destination: "LIS",
      departDate: "2026-06-15",
      passengers: { adults: 1, children: 0, infants: 0 },
    };
    const a = await registry.execute("search_flights", input, ctx);
    const b = await registry.execute("search_flights", input, ctx);
    expect(a).toEqual(b);
  });

  it("rejects invalid IATA code", async () => {
    await expect(
      registry.execute(
        "search_flights",
        {
          origin: "prague",
          destination: "LIS",
          departDate: "2026-06-15",
          passengers: { adults: 1 },
        },
        ctx,
      ),
    ).rejects.toThrow();
  });
});

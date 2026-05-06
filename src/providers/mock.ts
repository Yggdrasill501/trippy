import type { Offer, SearchInput } from "@/lib/schemas";
import type { FlightProvider } from "./types";

const CARRIERS = ["LH", "BA", "KL", "AF", "FR"] as const;

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

export const mockProvider: FlightProvider = {
  name: "mock",
  capabilities: { search: true, book: false, checkin: false },

  async search(input: SearchInput): Promise<Offer[]> {
    const seed = hash(`${input.origin}-${input.destination}-${input.departDate}`);
    const count = 3 + (seed % 4);
    const expiresAt = new Date(`${input.departDate}T00:00:00Z`).toISOString();

    return Array.from({ length: count }, (_, i) => {
      const carrier = CARRIERS[(seed + i) % CARRIERS.length]!;
      const departHour = 6 + ((seed + i * 7) % 14);
      const durationMinutes = 90 + ((seed + i * 13) % 240);

      const departAt = new Date(
        `${input.departDate}T${String(departHour).padStart(2, "0")}:00:00Z`,
      );
      const arriveAt = new Date(departAt.getTime() + durationMinutes * 60_000);

      const basePrice = 80 + ((seed + i * 31) % 420);

      return {
        id: `mock-${seed}-${i}`,
        providerId: "mock",
        price: { amount: basePrice, currency: "EUR" },
        segments: [
          {
            carrier,
            flightNumber: `${carrier}${100 + ((seed + i) % 900)}`,
            origin: input.origin,
            destination: input.destination,
            departAt: departAt.toISOString(),
            arriveAt: arriveAt.toISOString(),
            durationMinutes,
          },
        ],
        expiresAt,
      };
    });
  },
};

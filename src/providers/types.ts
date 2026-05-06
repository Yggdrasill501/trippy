import type { Offer, SearchInput } from "@/lib/schemas";

export interface FlightProvider {
  readonly name: string;
  readonly capabilities: { search: boolean; book: boolean; checkin: boolean };
  search(input: SearchInput): Promise<Offer[]>;
}

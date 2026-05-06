import { z } from "zod";

export const IATA = z
  .string()
  .length(3)
  .regex(/^[A-Z]{3}$/);
export const ISODate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
export const Currency = z
  .string()
  .length(3)
  .regex(/^[A-Z]{3}$/);

export const Money = z.object({
  amount: z.number().nonnegative(),
  currency: Currency,
});

export const Cabin = z.enum(["economy", "premium", "business", "first"]);

export const Passengers = z.object({
  adults: z.number().int().min(1).max(9),
  children: z.number().int().min(0).max(8).default(0),
  infants: z.number().int().min(0).max(4).default(0),
});

export const SearchInput = z.object({
  origin: IATA,
  destination: IATA,
  departDate: ISODate,
  returnDate: ISODate.optional(),
  passengers: Passengers,
  cabin: Cabin.default("economy"),
  preferences: z
    .object({
      maxStops: z.number().int().min(0).max(3).optional(),
      maxPrice: Money.optional(),
      preferredCarriers: z.array(z.string().length(2)).optional(),
    })
    .optional(),
});
export type SearchInput = z.infer<typeof SearchInput>;

export const Segment = z.object({
  carrier: z.string().length(2),
  flightNumber: z.string(),
  origin: IATA,
  destination: IATA,
  departAt: z.iso.datetime(),
  arriveAt: z.iso.datetime(),
  durationMinutes: z.number().int().positive(),
});

export const Offer = z.object({
  id: z.string(),
  providerId: z.string(),
  price: Money,
  segments: z.array(Segment).min(1),
  expiresAt: z.iso.datetime(),
});
export type Offer = z.infer<typeof Offer>;

import type { Address } from "./address";
import type { Amenities } from "./amenities";

export type InternalAd = {
  id: string;
  title: string;
  description: string;
  price: number;
  address: Address;
  amenities: Amenities;
  createdAt: string;
  updatedAt: string;
};

export type CreateInternalAdDto = Omit<
  InternalAd,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateInternalAdDto = Partial<CreateInternalAdDto>;

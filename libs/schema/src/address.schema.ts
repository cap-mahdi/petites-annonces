import { z } from "zod";

export const locationDetailsSchema = z.object({
  city: z.string().min(1, "La ville est requise"),
  district: z.string().min(1, "Le quartier est requis"),
  postalCode: z.string().min(1, "Le code postal est requis"),
  street: z.string().min(1, "La rue est requise"),
  country: z.string().min(1, "Le pays est requis"),
});

export const coordinatesSchema = z.object({
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
});

export const addressSchema = z.object({
  locationDetails: locationDetailsSchema,
  coordinates: coordinatesSchema,
});

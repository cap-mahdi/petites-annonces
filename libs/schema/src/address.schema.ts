import { z } from "zod";

export const locationDetailsSchema = z.object({
  city: z
    .string({ message: "La ville est requise" })
    .min(1, { message: "La ville est requise" }),
  district: z
    .string({ message: "Le quartier est requis" })
    .min(1, { message: "Le quartier est requis" }),
  postalCode: z
    .string({ message: "Le code postal est requis" })
    .min(1, { message: "Le code postal est requis" }),
  street: z
    .string({ message: "La rue est requise" })
    .min(1, { message: "La rue est requise" }),
  country: z
    .string({ message: "Le pays est requis" })
    .min(1, { message: "Le pays est requis" }),
});

export const coordinatesSchema = z.object({
  latitude: z
    .number({ message: "La latitude doit être un nombre" })
    .min(-90, { message: "La latitude doit être entre -90 et 90" })
    .max(90, { message: "La latitude doit être entre -90 et 90" }),
  longitude: z
    .number({ message: "La longitude doit être un nombre" })
    .min(-180, { message: "La longitude doit être entre -180 et 180" })
    .max(180, { message: "La longitude doit être entre -180 et 180" }),
});

export const addressSchema = z.object({
  locationDetails: locationDetailsSchema,
  coordinates: coordinatesSchema,
});

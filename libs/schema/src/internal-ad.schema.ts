import { z } from "zod";
import { addressSchema } from "./address.schema";
import { amenitiesSchema } from "./amenities.schema";

export const internalAdSchema = z.object({
  id: z.string().uuid(),
  title: z
    .string({ message: "Le titre est requis" })
    .min(3, { message: "Le titre doit contenir au moins 3 caractères" }),
  description: z
    .string({ message: "La description est requise" })
    .min(10, {
      message: "La description doit contenir au moins 10 caractères",
    }),
  price: z
    .number({ message: "Le prix doit être un nombre" })
    .positive({ message: "Le prix doit être positif" }),
  address: addressSchema,
  amenities: amenitiesSchema,
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const createInternalAdSchema = internalAdSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateInternalAdSchema = createInternalAdSchema.partial();

import { z } from "zod";

export const amenitiesSchema = z.object({
  bathrooms: z.number().min(0, "Le nombre de salles de bain doit être positif"),
  toilets: z.number().min(0, "Le nombre de toilettes doit être positif"),
  garage: z.boolean(),
  balcony: z.boolean(),
  rooms: z.number().min(1, "Le nombre de pièces doit être au moins 1"),
});

import { z } from "zod";

export const amenitiesSchema = z.object({
  bathrooms: z
    .number({ message: "Le nombre de salles de bain doit être un nombre" })
    .min(0, { message: "Le nombre de salles de bain doit être positif" }),
  toilets: z
    .number({ message: "Le nombre de toilettes doit être un nombre" })
    .min(0, { message: "Le nombre de toilettes doit être positif" }),
  garage: z
    .boolean({ message: "Garage doit être vrai ou faux" })
    .default(false),
  balcony: z
    .boolean({ message: "Balcon doit être vrai ou faux" })
    .default(false),
  rooms: z
    .number({ message: "Le nombre de pièces doit être un nombre" })
    .min(1, { message: "Le nombre de pièces doit être au moins 1" }),
});

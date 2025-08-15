import z from "zod";

export const createEntitySchema = z.object({
  name: z.string().min(1, "Name is required"),
  logo: z.string().optional().transform(val => val ?? null),
  couleur: z.string().optional().transform(val => val ?? null),
  avatar: z.string().optional().transform(val => val ?? null),
  domaine: z.string().optional().transform(val => val ?? null),
});

export const updateEntitySchema = createEntitySchema.partial();
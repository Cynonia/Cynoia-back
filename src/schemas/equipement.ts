import { z } from "zod"

export const createEquipementSchema = z.object({
  name: z.string().min(1),
  price: z.number().optional(),
  state: z.string().optional(),
  imgCover: z.string().optional().transform(v => v ?? null),
  entitiesId: z.number().optional(),
})

export const updateEquipementSchema = createEquipementSchema.partial()

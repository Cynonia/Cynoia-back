import { z } from "zod"

export const createEspaceSchema = z.object({
  name: z.string().min(1),
  surface: z.number().optional(),
  status: z.boolean().optional().default(true),
  validation: z.boolean().optional().default(false),
  entitiesId: z.number().optional(),
  typeEspacesId: z.number().optional(),
})

export const updateEspaceSchema = createEspaceSchema.partial()

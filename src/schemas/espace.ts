import { z } from "zod"

export const createEspaceSchema = z.object({
  name: z.string().min(1),
  surface: z.number().optional(),
  description: z.string().optional(),
  capacity: z.number().nonnegative().optional(),
  status: z.boolean().optional().default(true),
  validation: z.boolean().optional().default(false),
  pricePerHour: z.number().optional(),
  images: z.array(z.string().url()).optional(),
  location: z.string().optional(),
  entitiesId: z.number().optional(),
  // Accept entityId from frontend (more natural name) and map it in service
  entityId: z.number().optional(),
  typeEspacesId: z.number().optional(),
})


export const updateEspaceSchema = createEspaceSchema.partial()

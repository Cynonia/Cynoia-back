import { z } from "zod"

export const createRoleSchema = z.object({
  name: z.string().min(1),
  code: z.string().min(1),
  status: z.boolean().optional().default(true),
  entitiesId: z.number().optional(),
})

export const updateRoleSchema = createRoleSchema.partial()
    
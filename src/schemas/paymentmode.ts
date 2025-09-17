import { z } from "zod"

export const createPaymentModeSchema = z.object({
  name: z.string().min(1),
})

export const updatePaymentModeSchema = createPaymentModeSchema.partial()

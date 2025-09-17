import { z } from "zod"

export const createTransactionSchema = z.object({
  reservationsId: z.number(),
  paymentmodeId: z.number(),
})

export const updateTransactionSchema = createTransactionSchema.partial()

import { z } from "zod"

export const createReservationSchema = z.object({
  startAt: z.string().datetime(),
  endAt: z.string().datetime(),
  status: z.string().min(1),
  espacesId: z.number().optional(),
})

export const updateReservationSchema = createReservationSchema.partial()

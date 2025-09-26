import { z } from "zod"

const baseReservationSchema = z.object({
  reservationDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  startTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Time must be in HH:MM or HH:MM:SS format"),
  endTime: z.string().regex(/^\d{2}:\d{2}(:\d{2})?$/, "Time must be in HH:MM or HH:MM:SS format"),
  status: z.string().min(1),
  espacesId: z.number().optional(),
})

export const createReservationSchema = baseReservationSchema.refine((data) => {
  // Validate that endTime is after startTime
  const startTime = data.startTime;
  const endTime = data.endTime;
  return startTime < endTime;
}, {
  message: "End time must be after start time",
  path: ["endTime"]
})

export const updateReservationSchema = baseReservationSchema.partial()

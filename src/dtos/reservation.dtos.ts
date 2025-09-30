import { createReservationSchema, updateReservationSchema } from "../schemas/reservation.js";
import { z } from "zod";

export type CreateReservationDTO = z.infer<typeof createReservationSchema>;
export type UpdateReservationDTO = z.infer<typeof updateReservationSchema>;

export type ReservationEquipementDTO = {
	equipementId: number
	quantity?: number
	price?: number
	state?: string
}
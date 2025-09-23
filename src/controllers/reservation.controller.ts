import { Request, Response } from "express"
import { ReservationService } from "../services/reservation.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { createReservationSchema, updateReservationSchema } from "../schemas/reservation.js"

export const getAllReservations = async (_: unknown, res: Response) => {
  try {
    const data = await ReservationService.getAll()
    return sendSuccess(res, data, "Reservations fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const data = await ReservationService.getById(Number(req.params.id))
    return sendSuccess(res, data, "Reservation fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const getReservationByEntityId = async (req: Request, res: Response) => {
  try {
    const data = await ReservationService.getByEntityId(Number(req.params.id))
    return sendSuccess(res, data, "Reservation fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}



export const createReservation = async (req: Request, res: Response) => {
  try {
    const body = createReservationSchema.parse(req.body)
    const data = await ReservationService.create(body)
    return sendSuccess(res, data, "Reservation created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const body = updateReservationSchema.parse(req.body)
    const data = await ReservationService.update(Number(req.params.id), body)
    return sendSuccess(res, data, "Reservation updated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    await ReservationService.delete(Number(req.params.id))
    return sendSuccess(res, null, "Reservation deleted successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

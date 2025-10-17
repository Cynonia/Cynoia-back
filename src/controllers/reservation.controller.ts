import { Request, Response } from "express"
import { ReservationService } from "../services/reservation.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { authorizeRole } from "../utils/authorization.js"
import { createReservationSchema, updateReservationSchema } from "../schemas/reservation.js"

// Format a Date|string time to "HH:mm"
const toHHmm = (value: unknown): string | null => {
  if (!value) return null
  if (typeof value === 'string') {
    // Expect "HH:MM" or "HH:MM:SS"
    const m = value.match(/^(\d{2}):(\d{2})(?::\d{2})?/)
    return m ? `${m[1]}:${m[2]}` : value
  }
  if (value instanceof Date) {
    const hh = String(value.getHours()).padStart(2, '0')
    const mm = String(value.getMinutes()).padStart(2, '0')
    return `${hh}:${mm}`
  }
  return null
}

const formatReservation = (r: any) => {
  if (!r) return r
  return {
    ...r,
    startTime: toHHmm(r.startTime),
    endTime: toHHmm(r.endTime),
  }
}

const formatReservationData = (data: any) => {
  if (Array.isArray(data)) return data.map(formatReservation)
  return formatReservation(data)
}

export const getAllReservations = async (_: unknown, res: Response) => {
  try {
    const data = await ReservationService.getAll()
    return sendSuccess(res, formatReservationData(data), "Reservations fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getReservationById = async (req: Request, res: Response) => {
  try {
    const data = await ReservationService.getById(Number(req.params.id))
    return sendSuccess(res, formatReservationData(data), "Reservation fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const getReservationByEntityId = async (req: Request, res: Response) => {
  try {
    const data = await ReservationService.getByEntityId(Number(req.params.id))
    return sendSuccess(res, formatReservationData(data), "Reservation fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const getReservationsByUserId = async (req: Request, res: Response) => {
  try {
    const data = await ReservationService.getByUserId(Number(req.params.userId))
    return sendSuccess(res, formatReservationData(data), "Reservations fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const createReservation = async (req: Request, res: Response) => {
  try {
    const body = createReservationSchema.parse(req.body)
    if (!body.userId) return sendError(res, 'userId is required', null, 400)
    const data = await ReservationService.create(body)
    return sendSuccess(res, formatReservationData(data), "Reservation created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const updateReservation = async (req: Request, res: Response) => {
  try {
    const body = updateReservationSchema.parse(req.body)
    const data = await ReservationService.update(Number(req.params.id), body)
    return sendSuccess(res, formatReservationData(data), "Reservation updated successfully")
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

export const validateReservation = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!authorizeRole(user, ['ADMIN', 'MANAGER'], res)) return

    const data = await ReservationService.validateReservation(Number(req.params.id))
    return sendSuccess(res, formatReservationData(data), "Reservation validated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const refuseReservation = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!authorizeRole(user, ['ADMIN', 'MANAGER'], res)) return

    const data = await ReservationService.refuseReservation(Number(req.params.id))
    return sendSuccess(res, formatReservationData(data), "Reservation refused successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

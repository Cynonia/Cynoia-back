import { Request, Response } from "express"
import { PaymentModeService } from "../services/paymentmode.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { createPaymentModeSchema, updatePaymentModeSchema } from "../schemas/paymentmode.js"

export const getAllPaymentModes = async (_: unknown, res: Response) => {
  try {
    const data = await PaymentModeService.getAll()
    return sendSuccess(res, data, "Payment modes fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getPaymentModeById = async (req: Request, res: Response) => {
  try {
    const data = await PaymentModeService.getById(Number(req.params.id))
    return sendSuccess(res, data, "Payment mode fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const createPaymentMode = async (req: Request, res: Response) => {
  try {
    const body = createPaymentModeSchema.parse(req.body)
    const data = await PaymentModeService.create(body)
    return sendSuccess(res, data, "Payment mode created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const updatePaymentMode = async (req: Request, res: Response) => {
  try {
    const body = updatePaymentModeSchema.parse(req.body)
    const data = await PaymentModeService.update(Number(req.params.id), body)
    return sendSuccess(res, data, "Payment mode updated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const deletePaymentMode = async (req: Request, res: Response) => {
  try {
    await PaymentModeService.delete(Number(req.params.id))
    return sendSuccess(res, null, "Payment mode deleted successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

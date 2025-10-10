import { Request, Response } from "express"
import { TransactionService } from "../services/transaction.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { createTransactionSchema, updateTransactionSchema } from "../schemas/transaction.js"

export const getAllTransactions = async (_: unknown, res: Response) => {
  try {
    const data = await TransactionService.getAll()
    return sendSuccess(res, data, "Transactions fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const data = await TransactionService.getById(Number(req.params.id))
    return sendSuccess(res, data, "Transaction fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const body = createTransactionSchema.parse(req.body)
    const data = await TransactionService.create(body)
    return sendSuccess(res, data, "Transaction created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const updateTransaction = async (req: Request, res: Response) => {
  try {
    const body = updateTransactionSchema.parse(req.body)
    const data = await TransactionService.update(Number(req.params.id), body)
    return sendSuccess(res, data, "Transaction updated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    await TransactionService.delete(Number(req.params.id))
    return sendSuccess(res, null, "Transaction deleted successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const getTransactionsByEntityId = async (req: Request, res: Response) => {
  try {
    const data = await TransactionService.findByEntityId(Number(req.params.entityId))
    return sendSuccess(res, data, "Transactions fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

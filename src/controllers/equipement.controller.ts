import { Request, Response } from "express"
import { EquipementService } from "../services/equipement.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { createEquipementSchema, updateEquipementSchema } from "../schemas/equipement.js"

export const getAllEquipements = async (_: unknown, res: Response) => {
  try {
    const data = await EquipementService.getAll()
    return sendSuccess(res, data, "Equipements fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getEquipementById = async (req: Request, res: Response) => {
  try {
    const data = await EquipementService.getById(Number(req.params.id))
    return sendSuccess(res, data, "Equipement fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const createEquipement = async (req: Request, res: Response) => {
  try {
    const body = createEquipementSchema.parse(req.body)
    const data = await EquipementService.create(body)
    return sendSuccess(res, data, "Equipement created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const updateEquipement = async (req: Request, res: Response) => {
  try {
    const body = updateEquipementSchema.parse(req.body)
    const data = await EquipementService.update(Number(req.params.id), body)
    return sendSuccess(res, data, "Equipement updated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const deleteEquipement = async (req: Request, res: Response) => {
  try {
    await EquipementService.delete(Number(req.params.id))
    return sendSuccess(res, null, "Equipement deleted successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

import { Request, Response } from "express"
import { EspaceService } from "../services/espace.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { createEspaceSchema, updateEspaceSchema } from "../schemas/espace.js"

export const getAllEspaces = async (_: unknown, res: Response) => {
  try {
    const espaces = await EspaceService.getAll()
    return sendSuccess(res, espaces, "Espaces fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getEspaceById = async (req: Request, res: Response) => {
  try {
    const espace = await EspaceService.getById(Number(req.params.id))
    return sendSuccess(res, espace, "Espace fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const createEspace = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!user || !user.role || !["admin", "manager"].includes(user.role.toLocaleLowerCase())) {
      return sendError(res, "Unauthorized: Only admin or manager can create an espace", null, 403)
    }

    const data = createEspaceSchema.parse(req.body)
    const espace = await EspaceService.create(data)
    return sendSuccess(res, espace, "Espace created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}


export const updateEspace = async (req: Request, res: Response) => {
  try {
    const data = updateEspaceSchema.parse(req.body)
    const espace = await EspaceService.update(Number(req.params.id), data)
    return sendSuccess(res, espace, "Espace updated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const deleteEspace = async (req: Request, res: Response) => {
  try {
    await EspaceService.delete(Number(req.params.id))
    return sendSuccess(res, null, "Espace deleted successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

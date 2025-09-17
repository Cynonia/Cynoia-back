import { Request, Response } from "express"
import { RoleService } from "../services/role.service.js"
import { sendSuccess, sendError } from "../utils/responseFormatter.js"
import { createRoleSchema, updateRoleSchema } from "../schemas/role.js"

export const getAllRoles = async (_: unknown, res: Response) => {
  try {
    const roles = await RoleService.getAll()
    return sendSuccess(res, roles, "Roles fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message)
  }
}

export const getRoleById = async (req: Request, res: Response) => {
  try {
    const role = await RoleService.getById(Number(req.params.id))
    return sendSuccess(res, role, "Role fetched successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 404)
  }
}

export const createRole = async (req: Request, res: Response) => {
  try {
    const data = createRoleSchema.parse(req.body)
    const role = await RoleService.create(data)
    return sendSuccess(res, role, "Role created successfully", 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const updateRole = async (req: Request, res: Response) => {
  try {
    const data = updateRoleSchema.parse(req.body)
    const role = await RoleService.update(Number(req.params.id), data)
    return sendSuccess(res, role, "Role updated successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

export const deleteRole = async (req: Request, res: Response) => {
  try {
    await RoleService.delete(Number(req.params.id))
    return sendSuccess(res, null, "Role deleted successfully")
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

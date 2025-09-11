// src/controllers/entity.controller.ts
import { Request, Response } from 'express'
import { EntityService } from '@/services/entity.service'
import { sendSuccess, sendError } from '@/utils/responseFormatter'
import { createEntitySchema, updateEntitySchema } from '@/schemas/entity.schema'
import { authorizeRole } from '@/utils/authorization'

export const createEntity = async (req: Request, res: Response) => {
  try {
    const user = req.user

    if (!authorizeRole(user, ['ADMIN', 'MANAGER'], res)) return

    const data = createEntitySchema.parse(req.body)
    const entity = await EntityService.create(data)

    return sendSuccess(res, entity, 'Entity created successfully', 201)
  } catch (error: any) {
    return sendError(res, error.message, null, 400)
  }
}

export const getAllEntities = async (req: Request, res: Response) => {
  try {
    const entities = await EntityService.getAll()
    return sendSuccess(res, entities, 'Entities fetched successfully')
  } catch (error: any) {
    return sendError(res, error.message)
  }
}

export const getEntityById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const entity = await EntityService.getById(Number(id))
    return sendSuccess(res, entity, 'Entity fetched successfully')
  } catch (error: any) {
    return sendError(res, error.message, null, 404)
  }
}

export const updateEntity = async (req: Request, res: Response) => {
  try {
    const user = req.user

    if (!authorizeRole(user, ['Admin', 'Manager'], res)) return

    const { id } = req.params
    const data = updateEntitySchema.parse(req.body) // Zod parsing inline
    const entity = await EntityService.update(Number(id), data)
    return sendSuccess(res, entity, 'Entity updated successfully')
  } catch (error: any) {
    return sendError(res, error.message, null, 400)
  }
}

export const deleteEntity = async (req: Request, res: Response) => {
  try {
    const user = req.user

    if (!authorizeRole(user, ['Admin', 'Manager'], res)) return

    const { id } = req.params
    await EntityService.delete(Number(id))
    return sendSuccess(res, null, 'Entity deleted successfully')
  } catch (error: any) {
    return sendError(res, error.message, null, 400)
  }
}

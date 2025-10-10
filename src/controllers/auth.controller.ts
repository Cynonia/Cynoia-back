import { Request, Response } from 'express'
import { AuthService } from './../services/auth.service.js'
import { sendSuccess, sendError } from './../utils/responseFormatter.js'
import { loginSchema, registerSchema } from './../schemas/auth.js'
import { InvitationService } from '../services/invitation.service.js'
import { loginToEntitySchema, registerToEntitySchema } from '../schemas/auth.js'

export const register = async (req: Request, res: Response) => {
  try {
    const dto = registerSchema.parse(req.body)
    const result = await AuthService.register(dto)
    return sendSuccess(res, result, 'User registered successfully', 201)
  } catch (error: any) {
    return sendError(res, error.message, null, 400)
  }
}

export const login = async (req: Request, res: Response) => {
  try {
    const dto = loginSchema.parse(req.body)
    const result = await AuthService.login(dto)
    return sendSuccess(res, result, 'Login successful')
  } catch (error: any) {
    return sendError(res, "invalid email or password", null, 401)
  }
}

export const registerToEntity = async (req: Request, res: Response) => {
  try {
    const body = registerToEntitySchema.parse(req.body)
    const { entityId, email, token } = body
    if (!token) return sendError(res, 'Invitation token required', null, 400)

    await InvitationService.validateToken(Number(entityId), email, token)

    const result = await AuthService.register({
      ...body,
      roleId: 4,
      entityId: Number(entityId),
    } as any)

    await InvitationService.consume(Number(entityId), email)

    return sendSuccess(res, result, 'User registered to entity successfully', 201)
  } catch (error: any) {
    return sendError(res, error.message, null, 400)
  }
}

export const loginToEntity = async (req: Request, res: Response) => {
  try {
    const { email, password, entityId } = loginToEntitySchema.parse(req.body)
    const out = await AuthService.login({ email, password })
    // Optional: verify user belongs to the entity
    const belongs = (out.user as any)?.entity?.id === Number(entityId) || (out.user as any)?.entity?.id === undefined
    if (!belongs) return sendError(res, 'User does not belong to this entity', null, 403)
    return sendSuccess(res, out, 'Login successful')
  } catch (error: any) {
    return sendError(res, 'invalid email or password', null, 401)
  }
}

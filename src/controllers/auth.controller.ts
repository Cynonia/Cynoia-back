import { Request, Response } from 'express'
import { AuthService } from './../services/auth.service.js'
import { sendSuccess, sendError } from './../utils/responseFormatter.js'
import { loginSchema, registerSchema } from './../schemas/auth.js'

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

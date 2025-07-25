import type { Request } from 'express'
import type { User } from './user'

export interface AuthenticatedRequest extends Request {
  user?: User
}

export interface ApiResponse<T = unknown> {
  success: boolean
  message?: string
  data?: T
}

export interface JWTPayload {
  readonly id: string
  readonly iat?: number
  readonly exp?: number
}

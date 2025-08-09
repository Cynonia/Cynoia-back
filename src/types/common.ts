import type { Request } from 'express'
import type { User } from './user'

export interface AuthenticatedRequest extends Request {
  user?: User
}

export interface ApiResponse<T = unknown> {
  readonly success: boolean
  readonly message?: string
  readonly data?: T
}

export interface JWTPayload {
  readonly id: string
  readonly iat?: number
  readonly exp?: number
}

export interface RouteResponse {
  status: (code: number) => RouteResponse
  json: (data: { success: boolean; message: string }) => void
}
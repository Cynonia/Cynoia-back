import { NextFunction } from 'express'
import User from '@/models/User'
import { jwtConfig } from '@/config/jwt'
import { HTTP_STATUS } from '@/shared/constants'
import type {
  AuthenticatedRequest,
  User as UserType,
} from '@/types'

interface AuthRequest extends AuthenticatedRequest {
  headers: {
    authorization?: string
  }
}

interface AuthResponse {
  status: (code: number) => AuthResponse
  json: (data: { success: boolean; message: string }) => void
}

const extractToken = (authHeader?: string) => {
  if (!authHeader?.startsWith('Bearer ')) return null
  return authHeader.slice(7)
}

const sendUnauthorized = (res: AuthResponse, message = 'Access denied') => {
  res.status(HTTP_STATUS.UNAUTHORIZED).json({
    success: false,
    message,
  })
}

const sendForbidden = (res: AuthResponse, message = 'Access forbidden') => {
  res.status(HTTP_STATUS.FORBIDDEN).json({
    success: false,
    message,
  })
}

export const auth = async (
  req: AuthRequest,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const token = extractToken(req.headers?.authorization)

    if (!token) {
      sendUnauthorized(res, 'No token provided.')
      return
    }

    const decoded = jwtConfig.verifyToken(token)
    
    if (!decoded?.id) {
      sendUnauthorized(res, 'Invalid token payload.')
      return
    }

    const user = await User.findById(decoded.id)
      .select('-password')
      .lean<UserType>()

    if (!user?.isActive) {
      sendUnauthorized(res, 'User account is inactive.')
      return
    }

    if (!user) {
      sendUnauthorized(res, 'User not found.')
      return
    }

    req.user = user
    next()
  } catch (error) {
    sendUnauthorized(res, 'Invalid token.')
  }
}

export const authorize = (...roles: ReadonlyArray<UserType['role']>) => {
  return (
    req: AuthRequest,
    res: AuthResponse,
    next: NextFunction
  ) => {
    const user = req.user

    if (!user) {
      sendUnauthorized(res)
      return
    }

    if (!roles.includes(user.role)) {
      sendForbidden(res, 'Insufficient permissions.')
      return
    }

    next()
  }
}

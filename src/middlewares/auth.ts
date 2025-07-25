import { Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import User from '@/models/User'
import type {
  AuthenticatedRequest,
  JWTPayload,
  User as UserType,
} from '@/types'

export const auth = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization
    const token = authHeader?.replace('Bearer ', '')

    if (!token) {
      res.status(401).json({
        success: false,
        message: 'Access denied. No token provided.',
      })
      return
    }

    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined')
    }

    const decoded = jwt.verify(token, jwtSecret) as JWTPayload
    const user = await User.findById(decoded.id)
      .select('-password')
      .lean<UserType>()

    if (!user) {
      res.status(401).json({
        success: false,
        message: 'Token is not valid.',
      })
      return
    }

    req.user = user
    next()
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token is not valid.',
    })
  }
}

export const authorize = (...roles: UserType['role'][]) => {
  return (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Access denied.',
      })
      return
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: 'Access forbidden. Insufficient permissions.',
      })
      return
    }

    next()
  }
}

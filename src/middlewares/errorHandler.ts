import type { Request, Response, NextFunction } from 'express'
import { HTTP_STATUS } from './../shared/constants/index.js'

interface CustomError extends Error {
  readonly statusCode?: number
  readonly code?: number
}

const getErrorMessage = (err: CustomError) => {
  if (err.name === 'CastError') {
    return { message: 'Resource not found', statusCode: HTTP_STATUS.NOT_FOUND }
  }

  if (err.code === 11000) {
    return { message: 'Duplicate field value entered', statusCode: HTTP_STATUS.BAD_REQUEST }
  }

  if (err.name === 'ValidationError') {
    return { message: 'Validation error', statusCode: HTTP_STATUS.BAD_REQUEST }
  }

  if (err.name === 'JsonWebTokenError') {
    return { message: 'Invalid token', statusCode: HTTP_STATUS.UNAUTHORIZED }
  }

  if (err.name === 'TokenExpiredError') {
    return { message: 'Token expired', statusCode: HTTP_STATUS.UNAUTHORIZED }
  }

  return {
    message: err.message || 'Server Error',
    statusCode: err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR
  }
}

export const errorHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('❌ Error:', err)

  const { message, statusCode } = getErrorMessage(err)

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

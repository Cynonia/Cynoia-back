import type {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from 'express'

interface CustomError extends Error {
  statusCode?: number
  code?: number
}

export const errorHandler: ErrorRequestHandler = (
  err: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error: CustomError = { ...err }
  error.message = err.message

  console.error('❌ Error:', err)

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found'
    error = { message, statusCode: 404 } as CustomError
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Duplicate field value entered'
    error = { message, statusCode: 400 } as CustomError
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = 'Validation error'
    error = { message, statusCode: 400 } as CustomError
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token'
    error = { message, statusCode: 401 } as CustomError
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired'
    error = { message, statusCode: 401 } as CustomError
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
}

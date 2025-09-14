import { NextFunction } from 'express'
import { z, ZodSchema } from 'zod'
import { HTTP_STATUS } from './../shared/constants/index.js'

interface ValidatedRequest {
  body: unknown
}

interface ValidationResponse {
  status: (code: number) => ValidationResponse
  json: (data: { success: boolean; message: string }) => void
}

const validate = (schema: ZodSchema) => {
  return (req: ValidatedRequest, res: ValidationResponse, next: NextFunction) => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof z.ZodError) {
        const message = error.errors
          .map((err) => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
        
        res.status(HTTP_STATUS.BAD_REQUEST).json({
          success: false,
          message: `Validation error: ${message}`,
        })
        return
      }
      
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        success: false,
        message: 'Validation error',
      })
    }
  }
}

export default validate

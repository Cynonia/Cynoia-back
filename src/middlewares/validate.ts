import type { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body)
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.errors
          .map(err => `${err.path.join('.')}: ${err.message}`)
          .join(', ')
        res.status(400).json({
          success: false,
          message: `Validation error: ${message}`,
        })
        return
      }

      res.status(400).json({
        success: false,
        message: 'Validation error',
      })
    }
  }
}

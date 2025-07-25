import type { Request, Response, RequestHandler } from 'express'

export const notFound: RequestHandler = (req: Request, res: Response): void => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  })
}

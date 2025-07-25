import { HTTP_STATUS } from '@/shared/constants'

interface NotFoundRequest {
  originalUrl: string
}

interface NotFoundResponse {
  status: (code: number) => NotFoundResponse
  json: (data: { success: boolean; message: string }) => void
}

export const notFound = (req: NotFoundRequest, res: NotFoundResponse) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`,
  })
}

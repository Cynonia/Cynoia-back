import { Request, Response } from 'express'
import { InvitationService } from '../services/invitation.service.js'
import { sendSuccess, sendError } from '../utils/responseFormatter.js'

export const sendInvitation = async (req: Request, res: Response) => {
  try {
    const { entityId, email } = req.body as { entityId: number; email: string }
    if (!entityId || !email) return sendError(res, 'entityId and email are required', null, 400)
    const data = await InvitationService.createInvitation(Number(entityId), email)
    return sendSuccess(res, data, 'Invitation sent', 201)
  } catch (err: any) {
    return sendError(res, err.message, null, 400)
  }
}

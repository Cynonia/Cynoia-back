import { Request, Response } from 'express'
import { InvitationService } from '../services/invitation.service.js'
import { prisma } from '../config/prisma.js'
import { sendSuccess, sendError } from '../utils/responseFormatter.js'

export const sendInvitation = async (req: Request, res: Response) => {
  try {
    const { entityId, email, roleId } = req.body as { entityId: number; email: string; roleId?: number }
    if (!entityId || !email) return sendError(res, 'entityId and email are required', null, 400)

    // If the authenticated user belongs to an entity, enforce that entity for the invitation
    let resolvedEntityId = Number(entityId)
    const authUser = req.user
    if (authUser?.id) {
      const dbUser = await prisma.user.findUnique({ where: { id: authUser.id } })
      if (dbUser?.entitiesId) {
        resolvedEntityId = dbUser.entitiesId
      }
    }

    console.log(`[sendInvitation] Attempting to send invitation to ${email} for entity ${resolvedEntityId}`)
    const data = await InvitationService.createInvitation(resolvedEntityId, email, roleId)
    console.log(`[sendInvitation] Successfully sent invitation to ${email}`)
    return sendSuccess(res, data, 'Invitation sent', 201)
  } catch (err: any) {
    console.error(`[sendInvitation] Error:`, err)
    return sendError(res, err.message || 'Failed to send invitation', null, 400)
  }
}

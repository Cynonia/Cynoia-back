import { prisma } from '../config/prisma.js'
import { sendMail } from '../config/mailer.js'
import crypto from 'node:crypto'

export class InvitationService {
  static async createInvitation(entityId: number, email: string) {
    const token = crypto.randomBytes(24).toString('hex')
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

    const invitation = await prisma.invitation.upsert({
      where: { email_entitiesId: { email, entitiesId: entityId } },
      update: { token, expiresAt },
      create: { email, token, entitiesId: entityId, expiresAt },
    })

    const baseUrl = process.env.FRONTEND_URL || 'http://localhost:4200'
    const link = `${baseUrl}/register?entityId=${entityId}&token=${token}&email=${encodeURIComponent(email)}`
    await sendMail({
      to: email,
      subject: 'You are invited to join Cynoia entity',
      html: `<p>You have been invited to join an entity on Cynoia.</p>
             <p>Please click the link below to register your account:</p>
             <p><a href="${link}">Complete your registration</a></p>
             <p>This link will expire in 7 days.</p>`
    })

    return invitation
  }

  static async validateToken(entityId: number, email: string, token: string) {
    const invitation = await prisma.invitation.findUnique({
      where: { email_entitiesId: { email, entitiesId: entityId } },
    })
    if (!invitation || invitation.token !== token) throw new Error('Invalid invitation')
    if (invitation.expiresAt && invitation.expiresAt.getTime() < Date.now()) throw new Error('Invitation expired')
    return true
  }

  static async consume(entityId: number, email: string) {
    await prisma.invitation.delete({ where: { email_entitiesId: { email, entitiesId: entityId } } })
  }
}

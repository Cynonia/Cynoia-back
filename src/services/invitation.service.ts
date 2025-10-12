import { prisma } from '../config/prisma.js'
import { sendMail } from '../config/mailer.js'
import crypto from 'node:crypto'

export class InvitationService {
  static async createInvitation(entityId: number, email: string) {
    try {
      const token = crypto.randomBytes(24).toString('hex')
      const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) // 7 days

      console.log(`[InvitationService] Creating invitation for entity ${entityId}`)
      const invitation = await prisma.invitation.upsert({
        where: { email_entitiesId: { email, entitiesId: entityId } },
        update: { token, expiresAt },
        create: { email, token, entitiesId: entityId, expiresAt },
      })

      console.log(`[InvitationService] Fetching entity ${entityId}`)
      const entity = await prisma.entity.findUnique({ where: { id: entityId } })
      if (!entity) {
        throw new Error(`Entity with id ${entityId} not found`)
      }

      const baseUrl = process.env.FRONTEND_URL || 'http://localhost:4200'
      const link = `${baseUrl}/auth/entity-register?entityId=${entityId}&token=${token}&email=${encodeURIComponent(email)}`
      const subject = `Invitation to join ${entity?.name ?? 'Cynoia'}`
      const html = InvitationService.buildInvitationEmail({
        link,
        email,
        entityName: entity?.name ?? 'Cynoia',
        brandColor: entity?.couleur ?? '#4F46E5',
        logoUrl: entity?.logo || entity?.avatar || '',
        expiresInDays: 7,
        productName: 'Cynoia',
        baseUrl,
      })

      console.log(`[InvitationService] Sending email to ${email}`)
      await sendMail({ to: email, subject, html })
      console.log(`[InvitationService] Email sent successfully to ${email}`)

      return invitation
    } catch (error: any) {
      console.error(`[InvitationService] Error creating invitation:`, error)
      throw new Error(`Failed to send invitation: ${error.message}`)
    }
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

  private static buildInvitationEmail(params: {
    link: string
    email: string
    entityName: string
    brandColor: string
    logoUrl?: string
    expiresInDays: number
    productName: string
    baseUrl: string
  }) {
    const { link, email, entityName, brandColor, logoUrl, expiresInDays, productName } = params

    // Basic, robust, responsive pattern (table layout, inline CSS)
    const preheader = `You’ve been invited to join ${entityName} on ${productName}. Complete your registration.`

    return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
    <meta charset="utf-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1"> 
    <meta http-equiv="X-UA-Compatible" content="IE=edge"> 
    <meta name="x-apple-disable-message-reformatting"> 
    <meta name="format-detection" content="telephone=no,address=no,email=no,date=no,url=no">
    <title>${entityName} – Invitation</title> 
    <!--[if mso]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG/>
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <style>
      /* Sans-serif font fallbacks */
      @media screen {
        .font-sans { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif !important; }
      }
      /* Hover states */
      .btn:hover { filter: brightness(0.95); }
      /* Dark mode tweaks */
      @media (prefers-color-scheme: dark) {
        body, .bg { background-color: #0b0f1a !important; }
        .card { background: #111827 !important; color: #e5e7eb !important; }
        .muted { color: #9ca3af !important; }
        .divider { border-color: #1f2937 !important; }
      }
    </style>
  </head>
  <body width="100%" style="margin:0;padding:0;background-color:#f5f7fb;">
    <div style="display:none;visibility:hidden;opacity:0;height:0;width:0;overflow:hidden;mso-hide:all;">${preheader}</div>
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="bg" style="background-color:#f5f7fb;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 640px;">
            <tr>
              <td align="center" style="padding-bottom: 16px;">
                ${logoUrl ? `<img src="${logoUrl}" alt="${entityName}" width="72" height="72" style="border-radius:12px;display:block;outline:none;border:none;text-decoration:none;">` : `<div class="font-sans" style="font-size:20px;font-weight:700;color:#111827;">${entityName}</div>`}
              </td>
            </tr>
            <tr>
              <td class="card font-sans" style="background:#ffffff;border-radius:16px;padding:32px 28px;box-shadow:0 10px 25px rgba(2,6,23,0.06);">
                <h1 style="margin:0 0 8px 0;font-size:22px;line-height:28px;color:#111827;">Invitation to join ${entityName}</h1>
                <p class="muted" style="margin:0 0 24px 0;color:#6b7280;font-size:14px;line-height:22px;">We’re excited to have you on ${productName}. Click the button below to create your account.</p>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 24px 0;">
                  <tr>
                    <td>
                      <a class="btn font-sans" href="${link}" style="display:inline-block;background:${brandColor};color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:10px;font-weight:600;">Accept invitation</a>
                    </td>
                  </tr>
                </table>

                <p class="muted" style="margin:0 0 12px 0;color:#6b7280;font-size:13px;line-height:20px;">Or copy and paste this link into your browser:</p>
                <p style="margin:0 0 20px 0;word-break:break-all;font-size:13px;line-height:20px;">
                  <a href="${link}" style="color:${brandColor};text-decoration:underline;">${link}</a>
                </p>

                <hr class="divider" style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                  <tr>
                    <td valign="top" style="padding-right:8px;width:24px;">⏰</td>
                    <td class="muted" style="color:#6b7280;font-size:13px;line-height:20px;">This invitation will expire in <strong>${expiresInDays} days</strong>. If the button doesn’t work, please use the link above.</td>
                  </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:16px;">
                  <tr>
                    <td valign="top" style="padding-right:8px;width:24px;">❓</td>
                    <td class="muted" style="color:#6b7280;font-size:13px;line-height:20px;">Didn’t expect this email? You can safely ignore it, or contact support if you have concerns.</td>
                  </tr>
                </table>

                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top:16px;">
                  <tr>
                    <td valign="top" style="padding-right:8px;width:24px;">📩</td>
                    <td class="muted" style="color:#6b7280;font-size:13px;line-height:20px;">Sent to <strong>${email}</strong></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td align="center" class="font-sans" style="padding:16px 8px 0 8px;color:#9ca3af;font-size:12px;line-height:18px;">
                © ${new Date().getFullYear()} ${productName}. All rights reserved.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
  }
}

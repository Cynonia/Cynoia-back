import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendMail(options: { to: string; subject: string; html: string; from?: string }) {
  try {
    const from = options.from || process.env.MAIL_FROM || 'Cynoia <onboarding@resend.dev>'
    console.log(`[Mailer] Attempting to send email via Resend to ${options.to}`)
    console.log(`[Mailer] From: ${from}`)
    
    const result = await resend.emails.send({
      from,
      to: options.to,
      subject: options.subject,
      html: options.html,
    })
    
    if (result.error) {
      console.error(`[Mailer] Resend error:`, result.error)
      throw new Error(result.error.message)
    }
    
    console.log(`[Mailer] Email sent successfully via Resend. ID: ${result.data?.id}`)
    return result
  } catch (error: any) {
    console.error(`[Mailer] Failed to send email:`, error)
    throw new Error(`Email sending failed: ${error.message}`)
  }
}

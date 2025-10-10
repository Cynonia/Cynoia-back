import nodemailer from 'nodemailer'

export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Boolean(process.env.SMTP_SECURE === 'true'),
  auth: process.env.SMTP_USER && process.env.SMTP_PASS ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
})

export async function sendMail(options: { to: string; subject: string; html: string; from?: string }) {
  const from = options.from || process.env.MAIL_FROM || 'no-reply@cynoia.com'
  return mailer.sendMail({ ...options, from })
}

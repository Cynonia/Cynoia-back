import jwt from 'jsonwebtoken'
import type { JWTPayload } from '@/types'

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  return secret
}

const secret = getJwtSecret()

export const jwtConfig = {
  secret,
  expiresIn: '7d',

  generateToken: (payload: Pick<JWTPayload, 'id'>) => {
    return jwt.sign(payload, secret, { expiresIn: '7d' })
  },

  verifyToken: (token: string) => {
    return jwt.verify(token, secret) as JWTPayload
  },
} as const

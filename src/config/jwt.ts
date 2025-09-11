import jwt, { JwtPayload } from 'jsonwebtoken'

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  return secret
}

const secret = getJwtSecret()
const expiresIn = '7d' as const

export const jwtConfig = {
  secret,
  expiresIn,

  generateToken: (payload: Pick<JwtPayload, 'id'>): string => {
    return jwt.sign(payload, secret, { expiresIn })
  },

  verifyToken: (token: string): JwtPayload => {
    try {
      return jwt.verify(token, secret) as JwtPayload
    } catch (error) {
      throw new Error('Invalid token')
    }
  },
} as const

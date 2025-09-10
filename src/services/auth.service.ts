import { prisma } from '@/config/prisma'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { JWT_SECRET, JWT_EXPIRES_IN } from '@/shared/constants'
import { LoginDTO, RegisterDTO } from '@/dtos/auth.dtos'

interface JwtPayload {
  id: number
  login: string
  email: string
  role: string | null
  roleId: number | null
}

export class AuthService {
  static async register(dto: RegisterDTO) {
    // Check unique email
    const existingUser = await prisma.user.findUnique({ where: { email: dto.email } })
    if (existingUser) throw new Error('Email already exists')

    // Check unique login
    const existingLogin = await prisma.user.findUnique({ where: { login: dto.login } })
    if (existingLogin) throw new Error('Login already exists')

    const hashedPassword = await bcrypt.hash(dto.password, 10)

    const data: any = {
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      login: dto.login,
      password: hashedPassword,
      role: { connect: { id: 2 } },
      ...(dto.entityId ? { entity: { connect: { id: dto.entityId } } } : {}),
    };

    const user = await prisma.user.create({
      data,
      include: { role: true },
    })

    const payload: JwtPayload = {
      id: user.id,
      login: user.login,
      email: user.email,
      role: user.role?.name ?? null,
      roleId: user.roleId ?? null,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        email: user.email,
        role: user.role?.name ?? null,
      },
      token,
    }
  }

  static async login(dto: LoginDTO) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
      include: { role: true },
    })

    if (!user) throw new Error('Invalid credentials')

    const isMatch = await bcrypt.compare(dto.password, user.password)
    if (!isMatch) throw new Error('Invalid credentials')

    const payload: JwtPayload = {
      id: user.id,
      login: user.login,
      email: user.email,
      role: user.role?.name ?? null,
      roleId: user.roleId ?? null,
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        login: user.login,
        email: user.email,
        role: user.role?.name ?? null,
      },
      token,
    }
  }
}

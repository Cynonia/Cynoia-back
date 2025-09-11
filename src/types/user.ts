import type { USER_ROLES } from '@/shared/constants'

export interface User {
  readonly _id: string
  readonly name: string
  readonly email: string
  readonly password?: string
  readonly role: keyof typeof USER_ROLES
  readonly isActive: boolean
  readonly createdAt: Date
  readonly updatedAt: Date
}

export interface UserInput {
  readonly name: string
  readonly email: string
  readonly password: string
}

export interface LoginCredentials {
  readonly email: string
  readonly password: string
}

export type UserRole = keyof typeof USER_ROLES

export interface JwtPayload {
  id: number;
  login: string;
  email: string;
  role: string;
  roleId: number;
  iat?: number;
  exp?: number;
}
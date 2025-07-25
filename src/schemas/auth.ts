import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().trim().optional(),
  department: z.string().trim().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  phone: z.string().trim().optional(),
  department: z.string().trim().optional(),
  avatar: z.string().url().optional(),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
})

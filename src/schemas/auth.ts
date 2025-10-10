import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  login: z.string().min(3),
  password: z.string().min(6),
  roleId: z.number().optional().transform(val => val ?? 2),
  entityId: z.number().optional().transform(val => val ?? null),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const registerToEntitySchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  login: z.string().min(3),
  password: z.string().min(6),
  entityId: z.number().int().positive(),
  token: z.string().min(10),
});

export const loginToEntitySchema = z.object({
  email: z.string().email(),
  password: z.string(),
  entityId: z.number().int().positive(),
});

export const updateProfileSchema = z.object({
  name: z.string().trim().min(2).max(50).optional().transform(val => val ?? null),
  phone: z.string().trim().optional().transform(val => val ?? null),
  department: z.string().trim().optional().transform(val => val ?? null),
  avatar: z.string().url().optional().transform(val => val ?? null),
})

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(6),
})

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6
}

export const sanitizeUser = <T extends { password?: unknown }>(user: T) => {
  const { password: _, ...sanitizedUser } = user
  return sanitizedUser
}

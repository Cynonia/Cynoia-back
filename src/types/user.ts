export interface User {
  _id: string
  name: string
  email: string
  password?: string
  role: 'user' | 'admin'
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserInput {
  name: string
  email: string
  password: string
}

export interface LoginCredentials {
  email: string
  password: string
}

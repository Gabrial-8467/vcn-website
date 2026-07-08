export interface Credentials {
  identifier: string
  password?: string
}

export interface User {
  id: string
  userName: string
  email: string
}

export interface LoginResponse {
  success: boolean
  message: string
  data: {
    token: string
    expiresAt: number
    user: User
  } | null
}

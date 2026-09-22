export interface Credentials {
  identifier: string
  password?: string
}

export interface RegisterPayload {
  firstName: string
  lastName?: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  sponsorUsername?: string
  desiredMembershipType: string
  placementPreference?: string
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

export interface RegisterResponse {
  success: boolean
  message: string
  data: {
    user: User
    referenceId?: string
  } | null
}

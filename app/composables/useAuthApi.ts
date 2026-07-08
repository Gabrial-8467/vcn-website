// Auth API Composable - Handles all authentication backend API operations
import type { Credentials, LoginResponse } from '~/types'
import { API_ENDPOINTS } from '~/config/api/endpoints'

export const useAuthApi = () => {
  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseUrl

  /**
   * Perform backend login request
   */
  const login = async (credentials: Credentials): Promise<LoginResponse> => {
    try {
      const cleanBaseURL = baseURL?.replace(/\/$/, '')
      const fullURL = `${cleanBaseURL}/${API_ENDPOINTS.LOGIN}`

      const response = await $fetch<any>(fullURL, {
        method: 'POST',
        body: {
          identifier: credentials.identifier,
          password: credentials.password
        },
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (response && response.success && response.data) {
        return {
          success: true,
          message: response.message || 'Login successful',
          data: response.data
        }
      }

      return {
        success: false,
        message: response?.message || 'Login failed',
        data: null
      }
    } catch (err: any) {
      console.error('❌ Auth API login error:', err.message || err)
      const errorMsg = err?.data?.message || err?.message || 'Unknown error occurred'
      return {
        success: false,
        message: errorMsg,
        data: null
      }
    }
  }

  return {
    login,
    baseURL
  }
}

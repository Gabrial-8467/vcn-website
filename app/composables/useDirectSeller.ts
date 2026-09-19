import { useAuthApi } from '~/composables/useAuthApi'
import type { RegisterPayload } from '~/types'

// Submits a Direct Seller registration payload to the real backend
// (`users/auth/register` with `desiredMembershipType: DIRECT_SELLER`).
export const useDirectSellerApi = () => {
  const authApi = useAuthApi()

  const submitDirectSellerApplication = async (payload: Record<string, any>) => {
    try {
      const response = await authApi.register(payload as RegisterPayload)

      if (response && response.success) {
        return { data: response.data || { success: true }, error: null }
      }

      return { data: null, error: response?.message || 'Registration failed. Please try again.' }
    } catch (err: any) {
      console.error('❌ Direct seller registration error:', err?.message || err)
      return { data: null, error: err?.message || 'Something went wrong. Please try again.' }
    }
  }

  return {
    submitDirectSellerApplication
  }
}
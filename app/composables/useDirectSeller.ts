import { useApi } from '~/config/api/useApi'

// Backend is not connected yet. Set this to `false` (and adjust the endpoint if
// needed) once the `common/direct-seller/create` API is ready.
const USE_MOCK_SUBMIT = true
const MOCK_DELAY_MS = 1200

export const useDirectSellerApi = () => {
  const { postToEndpoint } = useApi()

  // Submits a Direct Seller registration payload to the backend.
  // While USE_MOCK_SUBMIT is on, it just simulates network latency and returns a
  // success payload so the UI flow keeps working.
  const submitDirectSellerApplication = async (payload: Record<string, any>) => {
    if (USE_MOCK_SUBMIT) {
      await new Promise((resolve) => setTimeout(resolve, MOCK_DELAY_MS))
      return { data: { referenceId: `DS-${Date.now()}`, status: 'submitted' }, error: null }
    }
    return postToEndpoint('DIRECT_SELLER_CREATE', payload)
  }

  return {
    submitDirectSellerApplication
  }
}
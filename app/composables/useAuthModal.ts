// Shared auth entry point so any component (Navbar, footer, etc.) can send
// the user to the dedicated /login page instead of opening an overlay.
export const useAuthModal = () => {
  const router = useRouter()
  const isOpen = useState<boolean>('auth-modal-open', () => false)

  const openAuthModal = () => {
    isOpen.value = false
    router.push('/login')
  }

  const closeAuthModal = () => {
    isOpen.value = false
  }

  return {
    isOpen: readonly(isOpen),
    openAuthModal,
    closeAuthModal,
  }
}

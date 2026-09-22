// Shared login/sign-in modal state so any component (Navbar, footer, etc.)
// can open the Navbar's slide-in login panel.
export const useAuthModal = () => {
  const isOpen = useState<boolean>('auth-modal-open', () => false)

  const openAuthModal = () => {
    isOpen.value = true
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
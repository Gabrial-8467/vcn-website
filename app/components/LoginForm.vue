<!-- components/LoginForm.vue -->
<template>
  <ClientOnly>
    <div
      v-if="mounted"
      class="reg-shell"
      :class="isModal ? 'reg-shell--modal' : 'auth-wrapper-main reg-shell--page'"
      @click.self="isModal && $emit('close')"
    >
      <div class="registration-modal-card">
        <!-- Left Column: Atmospheric Product & Brand Sidebar -->
        <div class="reg-modal-left">
          <div class="brand-logo-wrap">
            <img src="/img/logo/logo.png" alt="VCN Logo" class="reg-brand-logo" />
            <span class="brand-tagline">PURE AYURVEDIC WELLNESS</span>
          </div>

          <h2 class="sidebar-main-title">
            Transform Your Health.<br />
            Transform Your Life.
          </h2>

          <div class="sidebar-body-wrap">
            <div class="reg-features-list">
              <div class="reg-feature-item">
                <div class="reg-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                  </svg>
                </div>
                <div class="reg-feature-text">
                  <h4>Authentic Ayurvedic Products</h4>
                  <p>Rooted in tradition, made for a healthier you.</p>
                </div>
              </div>

              <div class="reg-feature-item">
                <div class="reg-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div class="reg-feature-text">
                  <h4>Exclusive Offers</h4>
                  <p>Be the first to know about new launches and deals.</p>
                </div>
              </div>

              <div class="reg-feature-item">
                <div class="reg-feature-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="m9 12 2 2 4-4"></path>
                  </svg>
                </div>
                <div class="reg-feature-text">
                  <h4>A Trusted Community</h4>
                  <p>Join thousands on a journey to better health.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="reg-cursive-footer">
            Better Health<br />Brighter You
          </div>
        </div>

        <!-- Right Column: Login Form -->
        <div class="reg-modal-right">
          <button v-if="isModal" class="close-btn" @click="$emit('close')" aria-label="Close modal">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div class="reg-header">
            <h2>Welcome Back</h2>
            <p>Sign in to continue your wellness journey.</p>
          </div>

          <form @submit.prevent="handleLogin" class="reg-form">
            <!-- Username / Email / Mobile -->
            <div class="auth-field-group">
              <label class="auth-field-label" for="login-identifier">Username, Email, or Mobile *</label>
              <div class="input-with-icon">
                <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <input
                  type="text"
                  id="login-identifier"
                  v-model="identifier"
                  placeholder="Enter username, email, or mobile"
                  class="form-input"
                  autocomplete="username"
                  required
                />
              </div>
            </div>

            <!-- Password -->
            <div class="auth-field-group">
              <div class="label-line">
                <label class="auth-field-label" for="login-password">Password *</label>
                <a href="#" class="forgot-link" @click.prevent="handleForgotPassword">Forgot Password?</a>
              </div>
              <div class="input-with-icon password-wrapper">
                <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  :type="showPwd ? 'text' : 'password'"
                  id="login-password"
                  v-model="password"
                  placeholder="Enter your password"
                  class="form-input"
                  autocomplete="current-password"
                  required
                />
                <button type="button" class="toggle-pwd" @click="showPwd = !showPwd" aria-label="Toggle password visibility">
                  <svg v-if="showPwd" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="errorMessage" class="form-api-error">{{ errorMessage }}</div>

            <!-- Sign In Button -->
            <button type="submit" class="create-account-btn" :disabled="isLoading">
              <span>{{ isLoading ? 'Signing In...' : 'Sign In' }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>

            <!-- Social Sign In -->
            <div class="social-signin-section">
              <p class="social-title"><span>or continue with</span></p>
              <div class="social-icons-wrap">
                <button type="button" class="social-circle-btn" aria-label="Sign in with Google">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                    <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                  </svg>
                  <span>Google</span>
                </button>
                <button type="button" class="social-circle-btn" aria-label="Sign in with Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 48 48">
                    <circle cx="24" cy="24" r="20" fill="#1877F2"/>
                    <path fill="#FFFFFF" d="M26.62 38V25.38h4.24l.63-4.92h-4.87v-3.14c0-1.42.39-2.39 2.43-2.39h2.6V10.53c-.45-.06-2-.19-3.8-.19-3.76 0-6.33 2.29-6.33 6.51v3.61h-4.24v4.92h4.24V38h5.1z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </div>

            <!-- Register Options -->
            <div class="auth-register-section">
              <div class="register-title-row">
                <span class="register-title">New to VCN? Create an account</span>
              </div>
              <div class="register-buttons-group">
                <button type="button" class="register-outline-btn" @click="navigateToRegister('preferred-customer')">
                  PREFERRED CUSTOMER
                </button>
                <button type="button" class="register-outline-btn" @click="navigateToRegister('direct-seller')">
                  DIRECT SELLER
                </button>
              </div>
            </div>

            <!-- Footer Sign In / Register Row -->
            <div class="signin-footer-row">
              <span>Don't have an account?</span>
              <button type="button" class="signin-link-btn" @click="navigateToRegister('preferred-customer')">Register Now</button>
            </div>

            <!-- Terms & Privacy Links -->
            <div class="auth-footer-links">
              <NuxtLink to="/terms-conditions" target="_blank">Terms &amp; Conditions</NuxtLink>
              <span class="dot-sep">•</span>
              <NuxtLink to="/privacy-policy" target="_blank">Privacy Policy</NuxtLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isModal: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'complete', 'openRegister'])

const toast = useToast()
const route = useRoute()
const router = useRouter()
const { loginWithPersistence } = useAuthCart()

const mounted = ref(false)
const identifier = ref('')
const password = ref('')
const showPwd = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

onMounted(() => {
  mounted.value = true
  if (props.isModal && process.client) {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    document.body.classList.add('modal-open')
    document.documentElement.classList.add('modal-open')
  }
})

onUnmounted(() => {
  if (props.isModal && process.client) {
    document.body.style.overflow = ''
    document.documentElement.style.overflow = ''
    document.body.classList.remove('modal-open')
    document.documentElement.classList.remove('modal-open')
  }
})

const handleForgotPassword = () => {
  toast.info({ message: 'Password reset feature coming soon' })
}

const handleLogin = async () => {
  errorMessage.value = ''

  if (!identifier.value || !password.value) {
    errorMessage.value = 'Please enter your username/email/mobile and password.'
    return
  }

  isLoading.value = true

  try {
    const result = await loginWithPersistence({
      identifier: identifier.value,
      password: password.value
    })

    if (result.success) {
      toast.success({
        message: `Welcome back, ${result.user?.userName || 'User'}!`
      })
      emit('complete', result.user)
      if (props.isModal) {
        emit('close')
      } else {
        const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
          ? route.query.redirect
          : '/'
        await navigateTo(redirect)
      }
    } else {
      errorMessage.value = result.error || 'Login failed. Please try again.'
      toast.error({ message: errorMessage.value })
    }
  } catch (error) {
    errorMessage.value = error?.message || 'Login failed. Please try again.'
    toast.error({ message: errorMessage.value })
  } finally {
    isLoading.value = false
  }
}

const navigateToRegister = (type) => {
  emit('openRegister', type)
  if (props.isModal) {
    emit('close')
  }
  if (type === 'direct-seller') {
    router.push('/direct-seller')
  }
}
</script>

<style scoped>
/* ===== Shell ===== */
.reg-shell--modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10000;
  background-color: rgba(0, 0, 0, 0.65);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  touch-action: none;
  overscroll-behavior: none;
}

.reg-shell--page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.reg-shell--page .registration-modal-card {
  max-width: 860px;
}

.registration-modal-card {
  display: flex;
  flex-direction: row;
  background: #ffffff;
  width: 100%;
  max-width: 860px;
  max-height: 85vh;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  position: relative;
}

/* ===== Left Column (Brand & Atmospheric Backdrop) ===== */
.reg-modal-left {
  width: 42%;
  flex-shrink: 0;
  background: linear-gradient(180deg, rgba(14, 24, 12, 0.88) 0%, rgba(26, 38, 20, 0.94) 100%), url('/img/bg/bg-1.png');
  background-size: cover;
  background-position: center;
  padding: 32px 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  color: #ffffff;
}

.brand-logo-wrap {
  margin-bottom: 8px;
}

.reg-brand-logo {
  height: 42px !important;
  width: auto;
  object-fit: contain;
  display: block;
  margin-bottom: 6px;
}

.brand-tagline {
  font-size: 9.5px;
  font-weight: 700;
  letter-spacing: 2px;
  color: #C89B3C;
  text-transform: uppercase;
  display: block;
}

.sidebar-main-title {
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  line-height: 1.2;
  margin: 16px 0 16px 0;
  letter-spacing: -0.3px;
}

.sidebar-body-wrap {
  position: relative;
  margin-bottom: 20px;
  flex-grow: 1;
}

.reg-features-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  position: relative;
  z-index: 2;
  width: 100%;
}

.reg-feature-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.reg-feature-icon {
  width: 34px;
  height: 34px;
  min-width: 34px;
  border-radius: 50%;
  background-color: #E8F3EA;
  color: #2E7D32;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}

.reg-feature-text h4 {
  font-size: 13px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 2px 0;
  line-height: 1.25;
}

.reg-feature-text p {
  font-size: 11px !important;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  line-height: 1.3;
}

.reg-cursive-footer {
  font-family: 'Playfair Display', 'Georgia', cursive, serif;
  font-size: 18px;
  font-style: italic;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.2;
  opacity: 0.9;
  position: relative;
  z-index: 2;
  padding-top: 10px;
  border-top: 1px dashed rgba(255, 255, 255, 0.15);
}

/* ===== Right Column (Form Area) ===== */
.reg-modal-right {
  flex: 1;
  background-color: #FAFAF7;
  padding: 30px 34px 28px;
  position: relative;
  overflow-y: auto;
  max-height: 85vh;
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  display: flex;
  flex-direction: column;
}

.reg-modal-right::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.reg-modal-right .close-btn {
  position: absolute;
  top: 18px;
  right: 18px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;
  z-index: 10;
}

.reg-modal-right .close-btn:hover {
  background-color: rgba(0, 0, 0, 0.06);
}

.reg-header {
  margin-bottom: 20px;
  padding-right: 30px;
}

.reg-header h2 {
  font-size: 24px;
  font-weight: 700;
  color: #0E2917;
  margin: 0 0 4px 0;
  letter-spacing: -0.4px;
}

.reg-header p {
  font-size: 12.5px !important;
  color: #667067;
  margin: 0;
  line-height: 1.4;
}

/* ===== Form inputs ===== */
.auth-field-group {
  margin-bottom: 14px;
}

.auth-field-label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: #172019;
  margin-bottom: 5px;
}

.label-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
}

.forgot-link {
  font-size: 12px;
  font-weight: 600;
  color: #1B5E20;
  text-decoration: underline;
}

.forgot-link:hover {
  color: #0E2917;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon .field-icon {
  position: absolute;
  left: 12px;
  color: #667067;
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-with-icon .form-input {
  width: 100%;
  height: 44px;
  padding: 0 12px 0 38px;
  border: 1px solid #DDE5DE;
  border-radius: 10px;
  font-size: 13.5px;
  color: #172019;
  background-color: #ffffff;
  transition: all 0.2s ease;
}

.input-with-icon .form-input:focus {
  outline: none;
  border-color: #1B5E20;
  box-shadow: 0 0 0 3px rgba(75, 104, 31, 0.12);
}

.password-wrapper .form-input {
  padding-right: 40px;
}

.password-wrapper .toggle-pwd {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  cursor: pointer;
  color: #667067;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ===== Primary CTA Button ===== */
.create-account-btn {
  width: 100%;
  height: 48px;
  background-color: #0E2917;
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 14.5px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: background-color 0.2s ease;
  margin: 18px 0 16px 0;
}

.create-account-btn:hover:not(:disabled) {
  background-color: #0B2113;
}

.create-account-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ===== Social Sign In ===== */
.social-signin-section {
  margin: 16px 0 18px;
}

.social-title {
  text-align: center;
  font-size: 12px;
  color: #888888;
  position: relative;
  margin-bottom: 12px;
}

.social-title::before,
.social-title::after {
  content: "";
  position: absolute;
  top: 50%;
  width: 35%;
  height: 1px;
  background-color: #E8F3EA;
}

.social-title::before {
  left: 0;
}

.social-title::after {
  right: 0;
}

.social-icons-wrap {
  display: flex;
  gap: 12px;
}

.social-circle-btn {
  flex: 1;
  height: 42px;
  border-radius: 10px;
  border: 1px solid #DDE5DE;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: #172019;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.social-circle-btn:hover {
  background-color: #F1F7F2;
}

/* ===== Register Options ===== */
.auth-register-section {
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #E8F3EA;
}

.register-title-row {
  margin-bottom: 10px;
}

.register-title {
  font-size: 13px;
  font-weight: 700;
  color: #0E2917;
}

.register-buttons-group {
  display: flex;
  gap: 10px;
}

.register-outline-btn {
  flex: 1;
  padding: 10px 12px;
  background-color: transparent;
  border: 1.5px solid #0E2917;
  color: #0E2917;
  border-radius: 25px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.register-outline-btn:hover {
  background-color: #0E2917;
  color: #ffffff;
}

.signin-footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: #667067;
  padding-top: 14px;
  border-top: 1px solid #E8F3EA;
  margin-top: 16px;
}

.signin-link-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px !important;
  font-weight: 700;
  color: #1B5E20;
  text-decoration: underline;
  cursor: pointer;
}

.signin-link-btn:hover {
  color: #0E2917;
}

.auth-footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 11.5px;
  color: #667067;
}

.auth-footer-links a {
  color: #667067;
  text-decoration: none;
}

.auth-footer-links a:hover {
  color: #0E2917;
  text-decoration: underline;
}

.dot-sep {
  color: #ccc;
}

.form-api-error {
  margin-bottom: 14px;
  font-size: 12.5px;
  color: #D9534F;
  text-align: center;
  background: #FDF2F2;
  border: 1px solid #F8D7DA;
  border-radius: 8px;
  padding: 8px 12px;
}

/* Responsive breakpoint for small screens */
@media (max-width: 820px) {
  .registration-modal-card {
    flex-direction: column;
    max-width: 500px;
    max-height: 90vh;
    overflow-y: auto;
    scrollbar-width: none !important;
    -ms-overflow-style: none !important;
  }

  .registration-modal-card::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  .reg-modal-left {
    display: none !important;
  }

  .reg-modal-right {
    padding: 24px 22px 24px;
  }
}

@media (max-width: 576px) {
  .reg-shell--page {
    padding: 20px 12px;
  }

  .registration-modal-card {
    max-width: 100%;
    border-radius: 20px;
  }

  .reg-modal-right {
    padding: 20px 16px;
  }

  .reg-header h2 {
    font-size: 20px;
  }

  .register-buttons-group {
    flex-direction: column;
    gap: 8px;
  }
}
</style>

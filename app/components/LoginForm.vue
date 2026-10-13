<!-- components/LoginForm.vue -->
<template>
  <div class="auth-card">
    <!-- Brand panel -->
    <aside class="auth-brand">
      <div class="auth-brand-top">
        <img src="/img/logo/logo.png" alt="VCN Logo" class="auth-brand-logo" />
        <span class="auth-brand-tagline">Pure Ayurvedic Wellness</span>
      </div>

      <h2 class="auth-brand-title">
        Transform Your Health.<br />
        Transform Your Life.
      </h2>

      <ul class="auth-features">
        <li class="auth-feature">
          <span class="auth-feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          </span>
          <div class="auth-feature-text">
            <h4>Authentic Ayurvedic Products</h4>
            <p>Rooted in tradition, made for a healthier you.</p>
          </div>
        </li>

        <li class="auth-feature">
          <span class="auth-feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
          </span>
          <div class="auth-feature-text">
            <h4>Exclusive Offers</h4>
            <p>Be the first to know about new launches and deals.</p>
          </div>
        </li>

        <li class="auth-feature">
          <span class="auth-feature-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              <path d="m9 12 2 2 4-4"></path>
            </svg>
          </span>
          <div class="auth-feature-text">
            <h4>A Trusted Community</h4>
            <p>Join thousands on a journey to better health.</p>
          </div>
        </li>
      </ul>

      <div class="auth-brand-footer">
        Better Health<br />Brighter You
      </div>
    </aside>

    <!-- Form panel -->
    <section class="auth-panel">
      <header class="reg-header">
        <h2>Welcome Back</h2>
        <p>Sign in to continue your wellness journey.</p>
      </header>

      <form @submit.prevent="handleLogin" class="reg-form">
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

        <div v-if="errorMessage" class="form-api-error">{{ errorMessage }}</div>

        <button type="submit" class="create-account-btn" :disabled="isLoading">
          <span>{{ isLoading ? 'Signing In...' : 'Sign In' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <div class="social-signin-section">
          <p class="social-title"><span>or continue with</span></p>
          <div class="social-icons-wrap">
            <button type="button" class="social-circle-btn" aria-label="Sign in with Google">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              <span>Google</span>
            </button>
            <button type="button" class="social-circle-btn" aria-label="Sign in with Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="#1877F2"/>
                <path fill="#FFFFFF" d="M26.62 38V25.38h4.24l.63-4.92h-4.87v-3.14c0-1.42.39-2.39 2.43-2.39h2.6V10.53c-.45-.06-2-.19-3.8-.19-3.76 0-6.33 2.29-6.33 6.51v3.61h-4.24v4.92h4.24V38h5.1z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>

        <div class="auth-register-section">
          <span class="register-title">New to VCN? Create an account</span>
          <div class="register-buttons-group">
            <button type="button" class="register-outline-btn" @click="navigateToRegister('preferred-customer')">
              Preferred Customer
            </button>
            <button type="button" class="register-outline-btn" @click="navigateToRegister('direct-seller')">
              Direct Seller
            </button>
          </div>
        </div>

        <div class="signin-footer-row">
          <span>Don't have an account?</span>
          <button type="button" class="signin-link-btn" @click="navigateToRegister('preferred-customer')">Register Now</button>
        </div>

        <div class="auth-footer-links">
          <NuxtLink to="/terms-conditions" target="_blank">Terms &amp; Conditions</NuxtLink>
          <span class="dot-sep">•</span>
          <NuxtLink to="/privacy-policy" target="_blank">Privacy Policy</NuxtLink>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['complete', 'openRegister'])

const toast = useToast()
const route = useRoute()
const router = useRouter()
const { loginWithPersistence } = useAuthCart()

const identifier = ref('')
const password = ref('')
const showPwd = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

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
      const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
        ? route.query.redirect
        : '/'
      await navigateTo(redirect)
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
  if (type === 'direct-seller') {
    router.push('/direct-seller')
  }
}
</script>

<style scoped>
/* ===== Card ===== */
.auth-card {
  display: flex;
  width: 100%;
  max-width: 940px;
  margin: 0 auto;
  background: var(--vcn-pure-white);
  border: 1px solid var(--vcn-border);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 30px 70px -34px rgba(14, 41, 23, 0.45), 0 8px 24px -18px rgba(14, 41, 23, 0.25);
  animation: auth-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
}

/* ===== Brand panel ===== */
.auth-brand {
  position: relative;
  width: 42%;
  flex-shrink: 0;
  padding: 44px 40px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: var(--vcn-pure-white);
  background:
    radial-gradient(620px 320px at 100% 0%, rgba(200, 155, 60, 0.18), transparent 60%),
    linear-gradient(160deg, var(--vcn-primary-green) 0%, var(--vcn-deep-forest) 100%);
  overflow: hidden;
}

.auth-brand::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 20px 20px;
  pointer-events: none;
}

.auth-brand > * {
  position: relative;
  z-index: 1;
}

.auth-brand-logo {
  height: 42px !important;
  width: auto;
  object-fit: contain;
  display: block;
  margin-bottom: 8px;
}

.auth-brand-tagline {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 2.4px;
  text-transform: uppercase;
  color: var(--vcn-warm-gold);
}

.auth-brand-title {
  font-size: 26px;
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.4px;
  color: var(--vcn-pure-white);
  margin: 22px 0;
}

.auth-features {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.auth-feature {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.auth-feature-icon {
  width: 36px;
  height: 36px;
  min-width: 36px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--vcn-pure-white);
}

.auth-feature-text h4 {
  margin: 0 0 2px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--vcn-pure-white);
  line-height: 1.25;
}

.auth-feature-text p {
  margin: 0;
  font-size: 11.5px !important;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.35;
}

.auth-brand-footer {
  margin-top: 26px;
  padding-top: 16px;
  border-top: 1px dashed rgba(255, 255, 255, 0.18);
  font-family: 'Playfair Display', Georgia, serif;
  font-style: italic;
  font-weight: 600;
  font-size: 18px;
  line-height: 1.2;
  color: rgba(255, 255, 255, 0.9);
}

/* ===== Form panel ===== */
.auth-panel {
  flex: 1;
  min-width: 0;
  padding: 44px 46px;
  background: var(--vcn-pure-white);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.reg-header {
  margin-bottom: 26px;
}

.reg-header h2 {
  margin: 0 0 6px;
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--vcn-deep-forest);
}

.reg-header p {
  margin: 0;
  font-size: 13.5px !important;
  color: var(--vcn-secondary-text);
}

/* ===== Fields ===== */
.auth-field-group {
  margin-bottom: 16px;
}

.auth-field-label {
  display: block;
  font-size: 12.5px;
  font-weight: 600;
  color: var(--vcn-primary-text);
  margin-bottom: 6px;
}

.label-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.forgot-link {
  font-size: 12px;
  font-weight: 600;
  color: var(--vcn-dark-green);
  text-decoration: none;
}

.forgot-link:hover {
  text-decoration: underline;
}

.input-with-icon {
  position: relative;
  display: flex;
  align-items: center;
}

.input-with-icon .field-icon {
  position: absolute;
  left: 14px;
  color: var(--vcn-secondary-text);
  pointer-events: none;
  transition: color 0.2s ease;
}

.input-with-icon:focus-within .field-icon {
  color: var(--vcn-dark-green);
}

.input-with-icon .form-input {
  width: 100%;
  height: 50px;
  padding: 0 14px 0 42px;
  border: 1px solid var(--vcn-border);
  border-radius: 12px;
  font-size: 14px;
  color: var(--vcn-primary-text);
  background: var(--vcn-off-white);
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
}

.input-with-icon .form-input::placeholder {
  color: #9aa79b;
}

.input-with-icon .form-input:focus {
  outline: none;
  background: var(--vcn-pure-white);
  border-color: var(--vcn-dark-green);
  box-shadow: 0 0 0 4px rgba(27, 94, 32, 0.12);
}

.password-wrapper .form-input {
  padding-right: 44px;
}

.password-wrapper .toggle-pwd {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--vcn-secondary-text);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-wrapper .toggle-pwd:hover {
  color: var(--vcn-dark-green);
}

.form-api-error {
  margin-bottom: 14px;
  font-size: 12.5px;
  color: var(--vcn-discount-sale);
  text-align: center;
  background: #fdf2f2;
  border: 1px solid #f8d7da;
  border-radius: 10px;
  padding: 9px 12px;
}

/* ===== Primary button ===== */
.create-account-btn {
  width: 100%;
  height: 52px;
  margin: 20px 0 16px;
  background: var(--vcn-deep-forest);
  color: var(--vcn-pure-white);
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.3px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.22s ease;
}

.create-account-btn:hover:not(:disabled) {
  background: var(--vcn-dark-green);
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -12px rgba(14, 41, 23, 0.6);
}

.create-account-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* ===== Social ===== */
.social-signin-section {
  margin: 6px 0 18px;
}

.social-title {
  position: relative;
  text-align: center;
  font-size: 12px;
  color: var(--vcn-secondary-text);
  margin-bottom: 14px;
}

.social-title::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--vcn-border);
}

.social-title span {
  position: relative;
  z-index: 1;
  background: var(--vcn-pure-white);
  padding: 0 10px;
}

.social-icons-wrap {
  display: flex;
  gap: 12px;
}

.social-circle-btn {
  flex: 1;
  height: 46px;
  border-radius: 12px;
  border: 1px solid var(--vcn-border);
  background: var(--vcn-pure-white);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vcn-primary-text);
  cursor: pointer;
  transition: all 0.22s ease;
}

.social-circle-btn:hover {
  border-color: var(--vcn-dark-green);
  background: var(--vcn-pale-green);
  transform: translateY(-1px);
}

/* ===== Register section ===== */
.auth-register-section {
  margin-top: 6px;
  padding-top: 18px;
  border-top: 1px solid var(--vcn-border);
}

.register-title {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: var(--vcn-deep-forest);
  margin-bottom: 10px;
}

.register-buttons-group {
  display: flex;
  gap: 10px;
}

.register-outline-btn {
  flex: 1;
  padding: 11px 12px;
  border: 1.5px solid var(--vcn-deep-forest);
  background: transparent;
  color: var(--vcn-deep-forest);
  border-radius: 12px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.register-outline-btn:hover {
  background: var(--vcn-deep-forest);
  color: var(--vcn-pure-white);
}

.signin-footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vcn-secondary-text);
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--vcn-border);
}

.signin-link-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px !important;
  font-weight: 700;
  color: var(--vcn-dark-green);
  text-decoration: none;
  cursor: pointer;
}

.signin-link-btn:hover {
  text-decoration: underline;
}

.auth-footer-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
  font-size: 11.5px;
  color: var(--vcn-secondary-text);
}

.auth-footer-links a {
  color: var(--vcn-secondary-text);
  text-decoration: none;
}

.auth-footer-links a:hover {
  color: var(--vcn-deep-forest);
  text-decoration: underline;
}

.dot-sep {
  color: var(--vcn-border);
}

@keyframes auth-card-in {
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.99);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* ===== Responsive ===== */
@media (max-width: 860px) {
  .auth-card {
    flex-direction: column;
    max-width: 520px;
  }

  .auth-brand {
    display: none;
  }

  .auth-panel {
    padding: 34px 26px;
  }
}

@media (max-width: 480px) {
  .auth-panel {
    padding: 26px 18px;
  }

  .reg-header h2 {
    font-size: 24px;
  }

  .register-buttons-group {
    flex-direction: column;
    gap: 8px;
  }
}
</style>

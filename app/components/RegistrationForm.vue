<!-- components/RegistrationForm.vue -->
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
        <h2>Let's get you started</h2>
        <p>Please complete all the mandatory steps below to finish your registration.</p>
      </header>

      <!-- STEP 1: FORM -->
      <form v-if="step === 'form'" @submit.prevent="submitForm" class="reg-form">
        <!-- First Name & Last Name 2-col row -->
        <div class="form-row-two-col">
          <div class="auth-field-group">
            <label class="auth-field-label" for="firstName">First and Middle Name *</label>
            <div class="input-with-icon">
              <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input type="text" id="firstName" v-model="form.firstName" placeholder="As per ID proof" class="form-input" autocomplete="given-name" />
            </div>
            <span v-if="errors.firstName" class="error-msg">{{ errors.firstName }}</span>
          </div>

          <div class="auth-field-group">
            <label class="auth-field-label" for="lastName">Last Name *</label>
            <div class="input-with-icon">
              <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <input type="text" id="lastName" v-model="form.lastName" placeholder="As per ID proof" class="form-input" autocomplete="family-name" />
            </div>
          </div>
        </div>

        <!-- Username -->
        <div class="auth-field-group">
          <label class="auth-field-label" for="username">Username *</label>
          <div class="input-with-icon">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <input type="text" id="username" v-model="form.username" placeholder="Choose a username" class="form-input" autocomplete="username" />
          </div>
          <span class="field-hint">This will be your login ID.</span>
          <span v-if="errors.username" class="error-msg">{{ errors.username }}</span>
        </div>

        <!-- Email Address -->
        <div class="auth-field-group">
          <label class="auth-field-label" for="email">Email Address *</label>
          <div class="input-with-icon">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </svg>
            <input type="email" id="email" v-model="form.email" placeholder="example@email.com" class="form-input" autocomplete="email" inputmode="email" />
          </div>
          <span v-if="errors.email" class="error-msg">{{ errors.email }}</span>
        </div>

        <!-- Mobile Number -->
        <div class="auth-field-group">
          <label class="auth-field-label" for="mobile">Mobile Number *</label>
          <div class="mobile-input-wrap">
            <div class="country-code-select">
              <span>+91</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m6 9 6 6 6-6"/>
              </svg>
            </div>
            <div class="input-with-icon flex-grow-1">
              <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <input type="tel" id="mobile" v-model="form.mobile" placeholder="Enter your mobile number" class="form-input" maxlength="10" autocomplete="tel" inputmode="numeric" pattern="[6-9][0-9]{9}" />
            </div>
          </div>
          <span class="field-hint">Mobile number will be used as your login ID.</span>
          <span v-if="errors.mobile" class="error-msg">{{ errors.mobile }}</span>
        </div>

        <!-- Create Password -->
        <div class="auth-field-group">
          <label class="auth-field-label" for="reg-password">Create password *</label>
          <div class="input-with-icon password-wrapper">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input :type="showPwd ? 'text' : 'password'" id="reg-password" v-model="form.password" placeholder="Example - My@password1" class="form-input" autocomplete="new-password" />
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
          <span v-if="errors.password" class="error-msg">{{ errors.password }}</span>
        </div>

        <!-- Confirm Password -->
        <div class="auth-field-group">
          <label class="auth-field-label" for="reg-confirm-password">Confirm password *</label>
          <div class="input-with-icon password-wrapper">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <input :type="showConfirmPwd ? 'text' : 'password'" id="reg-confirm-password" v-model="form.confirmPassword" placeholder="Re-enter your password" class="form-input" autocomplete="new-password" />
            <button type="button" class="toggle-pwd" @click="showConfirmPwd = !showConfirmPwd" aria-label="Toggle confirm password visibility">
              <svg v-if="showConfirmPwd" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
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
          <span v-if="errors.confirmPassword" class="error-msg">{{ errors.confirmPassword }}</span>
        </div>

        <!-- Sponsor -->
        <div class="auth-field-group">
          <div class="label-line">
            <label class="auth-field-label">Do you have any Sponsor? *</label>
            <span class="info-badge" title="If someone referred you, select Yes and enter their sponsor username ">ⓘ</span>
          </div>
          <div class="radio-options-row">
            <label class="radio-box" :class="{ selected: form.knowsVbo === 'yes' }">
              <input type="radio" v-model="form.knowsVbo" value="yes" />
              <span>Yes</span>
            </label>
            <label class="radio-box" :class="{ selected: form.knowsVbo === 'no' }">
              <input type="radio" v-model="form.knowsVbo" value="no" />
              <span>No</span>
            </label>
          </div>
        </div>

        <div v-if="form.knowsVbo === 'yes'" class="auth-field-group animated-vbo-input">
          <label class="auth-field-label" for="vboId">Sponsor Username *</label>
          <div class="input-with-icon">
            <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
            </svg>
            <input type="text" id="vboId" v-model="form.vboId" placeholder="Enter Sponsor Username" class="form-input" />
          </div>
          <span v-if="errors.vboId" class="error-msg">{{ errors.vboId }}</span>
        </div>

        <!-- Terms Checkbox -->
        <div class="terms-group">
          <label class="checkbox-label">
            <input type="checkbox" v-model="agreeTerms" />
            <span>I agree to the <NuxtLink to="/terms-conditions" target="_blank" class="green-link">Terms & Conditions</NuxtLink> and <NuxtLink to="/privacy-policy" target="_blank" class="green-link">Privacy Policy</NuxtLink>.</span>
          </label>
          <span v-if="errors.terms" class="error-msg">{{ errors.terms }}</span>
        </div>

        <div v-if="apiError" class="form-api-error">{{ apiError }}</div>

        <!-- Create Account Button -->
        <button type="submit" class="create-account-btn" :disabled="isSubmitting">
          <span>{{ isSubmitting ? 'Creating Account...' : 'Create Account' }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>

        <!-- Footer Sign In -->
        <div class="signin-footer-row">
          <span>Already have an account?</span>
          <button type="button" class="signin-link-btn" @click="handleOpenSignIn">Sign In</button>
        </div>
      </form>

      <!-- STEP 2: SUCCESS SCREEN -->
      <div v-else-if="step === 'success'" class="reg-success-content">
        <div class="success-icon">&#10003;</div>
        <h2>Registration Successful! 🎉</h2>
        <p>Welcome to VCN! Your account has been created successfully.</p>
        <button class="create-account-btn" @click="$emit('complete', form)">
          CONTINUE TO SHOPPING
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  userType: {
    type: String,
    default: 'preferred-customer'
  }
})

const emit = defineEmits(['close', 'complete'])
const toast = useToast()

const step = ref('form')
const showPwd = ref(false)
const showConfirmPwd = ref(false)
const isSubmitting = ref(false)
const agreeTerms = ref(true)
const apiError = ref('')

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  knowsVbo: 'no',
  vboId: ''
})

const errors = reactive({
  firstName: '',
  username: '',
  email: '',
  mobile: '',
  password: '',
  confirmPassword: '',
  vboId: '',
  terms: ''
})

const handleOpenSignIn = () => {
  emit('close')
}

const validateForm = () => {
  let isValid = true
  errors.firstName = ''
  errors.username = ''
  errors.email = ''
  errors.mobile = ''
  errors.password = ''
  errors.confirmPassword = ''
  errors.vboId = ''
  errors.terms = ''

  if (!form.firstName.trim()) {
    errors.firstName = 'First and Middle Name is required'
    isValid = false
  }

  if (!form.username.trim()) {
    errors.username = 'Username is required'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Email Address is required'
    isValid = false
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(form.email)) {
      errors.email = 'Please enter a valid email address'
      isValid = false
    }
  }

  const mobileRegex = /^[6-9]\d{9}$/
  if (!form.mobile.trim() || !mobileRegex.test(form.mobile)) {
    errors.mobile = 'Please enter valid 10-digit mobile number'
    isValid = false
  }

  if (!form.password || form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  if (form.confirmPassword && form.confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  if (form.knowsVbo === 'yes' && !form.vboId.trim()) {
    errors.vboId = 'Please enter VBO ID'
    isValid = false
  }

  if (!agreeTerms.value) {
    errors.terms = 'You must agree to the Terms & Conditions and Privacy Policy'
    isValid = false
  }

  return isValid
}

const submitForm = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  apiError.value = ''

  const membershipType = props.userType === 'abo' ? 'ABO' : 'PREFERRED_CUSTOMER'
  const payload = {
    firstName: form.firstName,
    lastName: form.lastName,
    username: form.username,
    email: form.email,
    phone: form.mobile,
    password: form.password,
    confirmPassword: form.confirmPassword || form.password,
    sponsorUsername: form.knowsVbo === 'yes' ? form.vboId : undefined,
    desiredMembershipType: membershipType,
    placementPreference: 'LEFT'
  }

  try {
    const authApi = useAuthApi()
    const response = await authApi.register(payload)

    if (response && response.success) {
      toast.success({
        message: response.message || 'Registration successful!'
      })
      step.value = 'success'
    } else {
      apiError.value = response?.message || 'Registration failed. Please try again.'
      toast.error({
        message: apiError.value
      })
    }
  } catch (error) {
    apiError.value = error?.message || 'Registration failed. Please try again.'
    toast.error({
      message: apiError.value
    })
  } finally {
    isSubmitting.value = false
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
  margin-bottom: 22px;
}

.reg-header h2 {
  margin: 0 0 6px;
  font-size: 26px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--vcn-deep-forest);
}

.reg-header p {
  margin: 0;
  font-size: 13px !important;
  color: var(--vcn-secondary-text);
  line-height: 1.4;
}

/* ===== Fields ===== */
.form-row-two-col {
  display: flex;
  gap: 12px;
}

.form-row-two-col .auth-field-group {
  flex: 1;
}

.auth-field-group {
  margin-bottom: 14px;
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

.info-badge {
  font-size: 14px;
  color: var(--vcn-dark-green);
  cursor: help;
  font-weight: 700;
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
  height: 46px;
  padding: 0 14px 0 42px;
  border: 1px solid var(--vcn-border);
  border-radius: 12px;
  font-size: 13.5px;
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

.flex-grow-1 {
  flex-grow: 1;
}

.mobile-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-code-select {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 46px;
  padding: 0 10px;
  background: var(--vcn-pure-white);
  border: 1px solid var(--vcn-border);
  border-radius: 12px;
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vcn-primary-text);
  cursor: pointer;
  user-select: none;
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

.field-hint {
  font-size: 11.5px;
  color: var(--vcn-secondary-text);
  margin-top: 4px;
  display: block;
}

/* ===== Sponsor radio & terms ===== */
.radio-options-row {
  display: flex;
  gap: 12px;
}

.radio-box {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  flex: 1;
  padding: 11px 16px;
  border: 1px solid var(--vcn-border);
  border-radius: 12px;
  background: var(--vcn-pure-white);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--vcn-primary-text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-box.selected {
  border-color: var(--vcn-dark-green);
  background: var(--vcn-pale-green);
  color: var(--vcn-deep-forest);
}

.radio-box input[type="radio"] {
  accent-color: var(--vcn-deep-forest);
  width: 16px;
  height: 16px;
}

.terms-group {
  margin: 14px 0 16px;
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12.5px;
  color: var(--vcn-secondary-text);
  line-height: 1.4;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 1px;
  accent-color: var(--vcn-deep-forest);
  cursor: pointer;
}

.green-link {
  color: var(--vcn-deep-forest);
  font-weight: 700;
  text-decoration: underline;
}

/* ===== Primary button ===== */
.create-account-btn {
  width: 100%;
  height: 52px;
  margin: 8px 0 16px;
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

.signin-footer-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 13px;
  color: var(--vcn-secondary-text);
  padding-top: 14px;
  border-top: 1px solid var(--vcn-border);
}

.signin-link-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px !important;
  font-weight: 700;
  color: var(--vcn-dark-green);
  cursor: pointer;
}

.signin-link-btn:hover {
  text-decoration: underline;
}

.error-msg {
  display: block;
  font-size: 11.5px;
  color: var(--vcn-discount-sale);
  margin-top: 4px;
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

/* Success step */
.reg-success-content {
  text-align: center;
  padding: 30px 10px 10px;
}

.success-icon {
  width: 62px;
  height: 62px;
  background: var(--vcn-dark-green);
  color: var(--vcn-pure-white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  font-weight: 700;
  margin: 0 auto 16px;
}

.reg-success-content h2 {
  font-size: 22px;
  color: var(--vcn-deep-forest);
  margin-bottom: 6px;
  font-weight: 700;
}

.reg-success-content p {
  font-size: 13.5px;
  color: var(--vcn-secondary-text);
  margin-bottom: 20px;
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

  .form-row-two-col {
    flex-direction: column;
    gap: 0;
  }
}

@media (max-width: 480px) {
  .auth-panel {
    padding: 26px 18px;
  }

  .reg-header h2 {
    font-size: 22px;
  }

  .radio-options-row {
    gap: 8px;
  }

  .radio-box {
    padding: 8px 10px;
    font-size: 12px;
  }
}
</style>

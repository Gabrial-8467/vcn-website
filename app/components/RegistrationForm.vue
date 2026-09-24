<!-- components/RegistrationForm.vue -->
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

              <!-- Product Image Floating Right -->
              <!-- <img src="/img/products/V-VEDARELIEFAURA.jpg" alt="ReliefAura" class="sidebar-product-img" /> -->
            </div>

            <div class="reg-cursive-footer">
              Better Health<br />Brighter You
            </div>
          </div>

          <!-- Right Column: Registration Form -->
          <div class="reg-modal-right">
            <button v-if="isModal" class="close-btn" @click="$emit('close')" aria-label="Close modal">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            
           

            <div class="reg-header">
              <h2>Let's get you started</h2>
              <p>Please complete all the mandatory steps below to finish your registration.</p>
            </div>

            <!-- STEP 1: FORM -->
            <form v-if="step === 'form'" @submit.prevent="submitForm" class="reg-form">
              
              <!-- First Name & Last Name 2-col row -->
              <div class="form-row-two-col">
                <!-- First and Middle Name -->
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

                <!-- Last Name -->
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

              <!-- Do you know a VBO? -->
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
          </div>
        </div>
      </div>
  </ClientOnly>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  userType: {
    type: String,
    default: 'preferred-customer'
  },
  isModal: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close', 'complete'])
const toast = useToast()
const { openAuthModal } = useAuthModal()

const mounted = ref(false)
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

const handleOpenSignIn = () => {
  emit('close')
  openAuthModal()
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

/* Page mode: full two-column card (brand sidebar + form), same as login page */
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

/* ===== Left Column (Brand & Atmospheric Product Backdrop) ===== */
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
  width: 62%;
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

.sidebar-product-img {
  position: absolute;
  right: -15px;
  bottom: -10px;
  height: 250px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.5));
  pointer-events: none;
  z-index: 1;
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

.step-progress-row {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
  margin-bottom: 8px;
  padding-right: 32px;
}

.step-text {
  font-size: 12px;
  font-weight: 600;
  color: #1B5E20;
}

.step-bars {
  display: flex;
  align-items: center;
  gap: 4px;
}

.step-bar {
  width: 24px;
  height: 6px;
  border-radius: 4px;
  background-color: #E8F3EA;
}

.step-bar.active {
  background-color: #1B5E20;
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
  color: #172019;
  margin-bottom: 5px;
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

.mobile-input-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.country-code-select {
  display: flex;
  align-items: center;
  gap: 4px;
  height: 44px;
  padding: 0 10px;
  background-color: #ffffff;
  border: 1px solid #DDE5DE;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
  color: #172019;
  cursor: pointer;
  user-select: none;
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

.field-hint {
  font-size: 11.5px;
  color: #667067;
  margin-top: 4px;
  display: block;
}

/* ===== VBO Radio & Terms ===== */
.label-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.info-badge {
  font-size: 14px;
  color: #1B5E20;
  cursor: help;
  font-weight: 700;
}

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
  padding: 10px 16px;
  border: 1px solid #DDE5DE;
  border-radius: 10px;
  background: #ffffff;
  font-size: 13.5px;
  font-weight: 600;
  color: #172019;
  cursor: pointer;
  transition: all 0.2s ease;
}

.radio-box.selected {
  border-color: #1B5E20;
  background-color: #F1F7F2;
  color: #0E2917;
}

.radio-box input[type="radio"] {
  accent-color: #0E2917;
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
  color: #667067;
  line-height: 1.4;
  cursor: pointer;
}

.checkbox-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  margin-top: 1px;
  accent-color: #0E2917;
  cursor: pointer;
}

.green-link {
  color: #0E2917;
  font-weight: 700;
  text-decoration: underline;
}

.green-link:hover {
  color: #0E2917;
}

/* ===== Create Account Button ===== */
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
  background-color: #0E2917;
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
  color: #667067;
  padding-top: 12px;
  border-top: 1px solid #E8F3EA;
}

.signin-link-btn {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
  font-weight: 700;
  color: #1B5E20;
  text-decoration: underline;
  cursor: pointer;
}

.signin-link-btn:hover {
  color: #0E2917;
}

.error-msg {
  display: block;
  font-size: 11.5px;
  color: #D9534F;
  margin-top: 4px;
}

.form-api-error {
  margin-bottom: 14px;
  font-size: 12.5px;
  color: #D9534F;
  text-align: center;
  background: #F1F7F2;
  border: 1px solid #E8F3EA;
  border-radius: 8px;
  padding: 8px 12px;
}

/* Success step */
.reg-success-content {
  text-align: center;
  padding: 30px 10px 10px;
}

.success-icon {
  width: 60px;
  height: 60px;
  background-color: #1B5E20;
  color: #ffffff;
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
  color: #0E2917;
  margin-bottom: 6px;
  font-weight: 700;
}

.reg-success-content p {
  font-size: 13.5px;
  color: #667067;
  margin-bottom: 20px;
}

/* Transitions disabled */
.fade-enter-active,
.fade-leave-active,
.animated-vbo-input {
  transition: none !important;
  animation: none !important;
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

  .form-row-two-col {
    flex-direction: column;
    gap: 0;
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
}
</style>
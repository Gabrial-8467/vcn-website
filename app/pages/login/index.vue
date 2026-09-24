<template>
  <div class="auth-wrapper-main">
    <h1 class="auth-heading-primary">
      Hi, kindly sign in.
    </h1>

    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-sm-10 col-md-8 col-lg-6">
          <div class="auth-card-container">

            <div class="auth-section-title">
              Your Account
            </div>

            <button class="auth-social-button">
              <img
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google"
                class="auth-social-icon"
              />
              Continue with Google
            </button>

            <button class="auth-social-button">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                alt="Facebook"
                class="auth-social-icon"
              />
              Continue with Facebook
            </button>

            <div class="auth-separator-line">
              or
            </div>

            <form @submit.prevent="handleLogin">

              <div class="auth-field-group">
                <label class="auth-field-label">
                  Username / Email
                </label>

                <input
                  v-model="identifier"
                  type="text"
                  class="auth-input-field"
                  autocomplete="username"
                  required
                />
              </div>

              <div class="auth-field-group">
                <label class="auth-field-label">
                  Password
                </label>

                <input
                  v-model="password"
                  type="password"
                  class="auth-input-field"
                  autocomplete="current-password"
                  required
                />
              </div>

              <p
                v-if="errorMessage"
                class="auth-error-message"
              >
                {{ errorMessage }}
              </p>

              <button
                type="submit"
                class="auth-submit-button"
                :disabled="isLoading"
              >
                {{ isLoading ? 'Signing in...' : 'Sign In' }}
              </button>

              <div class="auth-help-links">
                <a
                  href="#"
                  class="auth-link-item"
                  onclick="alert('Password reset feature coming soon')"
                >
                  Forgot password?
                </a>

                <a
                  href="#"
                  class="auth-link-item"
                  onclick="alert('Create a new account using the link below.')"
                >
                  Don't have a password?
                </a>
              </div>

            </form>

            <div class="auth-register-section">
              <h3 class="auth-register-title">Register</h3>
              <p class="auth-register-subtitle">Choose how you'd like to create your VCN account</p>

              <NuxtLink to="/register" class="auth-register-btn">
                PREFERRED CUSTOMER
              </NuxtLink>

              <NuxtLink to="/direct-seller" class="auth-register-btn">
                DIRECT SELLER
              </NuxtLink>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "product-details-page"
  }
})

import { ref } from 'vue'

const toast = useToast()
const route = useRoute()
const { loginWithPersistence } = useAuthCart()

const identifier = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  errorMessage.value = ''

  if (!identifier.value || !password.value) {
    errorMessage.value = 'Please enter your username/email and password.'
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
      const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
        ? route.query.redirect
        : '/'
      await navigateTo(redirect)
    } else {
      errorMessage.value = result.error || 'Login failed. Please try again.'
      toast.error({
        message: errorMessage.value
      })
    }
  } catch (error) {
    errorMessage.value = error?.message || 'Login failed. Please try again.'
    toast.error({
      message: errorMessage.value
    })
  } finally {
    isLoading.value = false
  }
}
</script>
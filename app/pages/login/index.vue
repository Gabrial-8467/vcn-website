<template>
  <div class="login-page-wrapper">
    <LoginForm
      v-if="currentForm === 'login'"
      :isModal="false"
      @close="handleClose"
      @complete="handleLoginComplete"
      @openRegister="handleOpenRegister"
    />
    <RegistrationForm
      v-else
      :userType="userType"
      :isModal="false"
      @close="currentForm = 'login'"
      @complete="handleRegistrationComplete"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import LoginForm from '@/components/LoginForm.vue'
import RegistrationForm from '@/components/RegistrationForm.vue'

useHead({
  bodyAttrs: {
    class: "product-details-page"
  }
})

const route = useRoute()
const router = useRouter()

const currentForm = ref('login')
const userType = ref('preferred-customer')

const handleClose = () => {
  router.push('/')
}

const handleLoginComplete = () => {
  const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/')
    ? route.query.redirect
    : '/'
  router.push(redirect)
}

const handleRegistrationComplete = (data) => {
  router.push('/')
}

const handleOpenRegister = (type) => {
  if (type === 'direct-seller') {
    router.push('/direct-seller')
  } else {
    userType.value = type || 'preferred-customer'
    currentForm.value = 'register'
  }
}
</script>

<style scoped>
.login-page-wrapper {
  min-height: 100vh;
  background: #ffffff;
}
</style>
<template>
  <div class="auth-page">
    <LoginForm
      v-if="currentForm === 'login'"
      @complete="handleLoginComplete"
      @openRegister="handleOpenRegister"
    />
    <RegistrationForm
      v-else
      :userType="userType"
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
.auth-page {
  position: relative;
  min-height: calc(100vh - 120px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 72px 20px;
  background: var(--vcn-off-white, #FAFAF7);
}

/* Match the site/footer section gutters so the card lines up with the footer */
@media (min-width: 1400px) {
  .auth-page {
    padding-left: 160px;
    padding-right: 160px;
  }
}

@media (min-width: 1200px) and (max-width: 1399.98px) {
  .auth-page {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .auth-page {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .auth-page {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .auth-page {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (min-width: 480px) and (max-width: 575.98px) {
  .auth-page {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (max-width: 479.98px) {
  .auth-page {
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* Keep the card at its own design width (handled in LoginForm) and center it
   on the footer's axis instead of stretching it to the footer container. */
.auth-page :deep(.auth-card) {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
}

@media (max-width: 991px) {
  .auth-page {
    min-height: calc(100vh - 140px);
    padding-top: 32px;
    padding-bottom: 40px;
  }
}
</style>

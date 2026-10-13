<template>
  <div class="auth-page">
    <RegistrationForm
      v-if="currentForm === 'register'"
      :userType="userType"
      @close="currentForm = 'login'"
      @complete="handleRegistrationComplete"
    />
    <LoginForm
      v-else
      @complete="handleLoginComplete"
      @openRegister="handleOpenRegister"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegistrationForm from '@/components/RegistrationForm.vue'
import LoginForm from '@/components/LoginForm.vue'

const toast = useToast()
const route = useRoute()
const router = useRouter()

const currentForm = ref('register')
const userType = ref(route.query.type || 'preferred-customer')

onMounted(() => {
  if (!['preferred-customer', 'abo'].includes(userType.value)) {
    userType.value = 'preferred-customer'
  }
})

const handleLoginComplete = () => {
  router.push('/')
}

const handleRegistrationComplete = (data) => {
  toast.success({
    message: `Welcome, ${data.firstName || 'VCN member'}! You are now registered.`
  })
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

/* Keep the card at its own design width (handled in the form components) and
   center it on the footer's axis instead of stretching it to the footer container. */
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

<template>
  <div class="registration-page-wrapper">
    <RegistrationForm
      v-if="currentForm === 'register'"
      :userType="userType"
      :isModal="false"
      @close="currentForm = 'login'"
      @complete="handleRegistrationComplete"
    />
    <LoginForm
      v-else
      :isModal="false"
      @close="handleClose"
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

const handleClose = () => {
  router.push('/')
}

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
.registration-page-wrapper {
  min-height: 100vh;
  background: #ffffff;
}
</style>
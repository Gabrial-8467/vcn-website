<template>
  <div class="registration-page-wrapper">
    <RegistrationForm
      :userType="userType"
      :isModal="false"
      @close="handleClose"
      @complete="handleRegistrationComplete"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RegistrationForm from '@/components/RegistrationForm.vue'

const toast = useToast()
const route = useRoute()
const router = useRouter()

const userType = ref(route.query.type || 'preferred-customer')

onMounted(() => {
  if (!['preferred-customer', 'abo'].includes(userType.value)) {
    router.replace('/register?type=preferred-customer')
  }
})

const handleClose = () => {
  router.push('/login')
}

const handleRegistrationComplete = (data) => {
  toast.success({
    message: `Welcome, ${data.firstName || 'VCN member'}! You are now registered.`
  })
  router.push('/')
}
</script>

<style scoped>
.registration-page-wrapper {
  min-height: 100vh;
  background: #f5f5f5;
}
</style>
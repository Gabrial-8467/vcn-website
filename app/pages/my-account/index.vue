<template>
  <div v-if="ready" class="account-wrapper">
    <div class="account-container">

      <!-- Page Title -->
      <header class="account-header">
        <span class="account-header-avatar">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
          </svg>
        </span>
        <div class="account-header-text">
          <h1>My Account</h1>
          <p>Welcome back, {{ profile.userName || 'User' }}</p>
          <p class="account-header-meta">{{ profile.email }}</p>
        </div>
        <span class="account-header-chip">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
          </svg>
          Member ID: {{ profile.id || 'Not assigned' }}
        </span>
      </header>

      <!-- Stats Strip -->
      <section class="account-stats">
        <div class="stat-card">
          <span class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </span>
          <div class="stat-body">
            <strong>{{ cartCount }}</strong>
            <span>Products in Cart</span>
          </div>
        </div>

        <div class="stat-card">
          <span class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
          </span>
          <div class="stat-body">
            <strong>{{ formatPrice(orderTotal) }}</strong>
            <span>Cart Subtotal</span>
          </div>
        </div>

        <div class="stat-card">
          <span class="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
            </svg>
          </span>
          <div class="stat-body">
            <strong class="stat-id">{{ profile.id }}</strong>
            <span>Member ID</span>
          </div>
        </div>
      </section>

      <!-- Main Cards Grid -->
      <section class="account-grid">

        <!-- Profile Card -->
        <div class="account-card">
          <div class="account-card-header">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
              Profile Details
            </h3>
            <button type="button" class="pill-btn" @click="toggleEdit">
              {{ editing ? 'Cancel' : 'Edit' }}
            </button>
          </div>

          <div v-if="!editing" class="account-detail-grid">
            <div class="account-detail-item">
              <span class="detail-label">User Name</span>
              <strong>{{ profile.userName }}</strong>
            </div>
            <div class="account-detail-item">
              <span class="detail-label">Email</span>
              <strong>{{ profile.email }}</strong>
            </div>
            <div class="account-detail-item">
              <span class="detail-label">Member ID</span>
              <strong>{{ profile.id }}</strong>
            </div>
          </div>

          <form v-else class="account-edit-form" @submit.prevent="saveProfile">
            <div class="field-group">
              <label class="field-label">User Name</label>
              <input v-model.trim="editName" type="text" class="field-input" autocomplete="name" required />
            </div>
            <div class="field-group">
              <label class="field-label">Email</label>
              <input v-model.trim="editEmail" type="email" class="field-input" autocomplete="email" required />
            </div>
            <button type="submit" class="btn-solid btn-block">Save Changes</button>
          </form>
        </div>

        <!-- Orders Card -->
        <div class="account-card">
          <div class="account-card-header">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              My Orders
            </h3>
            <span v-if="orderItems.length" class="count-badge">{{ orderItems.length }}</span>
          </div>

          <template v-if="orderItems.length">
            <ul class="order-list">
              <li v-for="(item, index) in orderItems" :key="`${item.id}-${index}`" class="order-item">
                <img v-if="item.image" :src="item.image" :alt="item.name" class="order-thumb"
                  @error="($event.target).style.display = 'none'" />
                <span v-else class="order-thumb order-thumb-fallback">{{ (item.name || '?').charAt(0) }}</span>
                <div class="order-info">
                  <span class="order-name">{{ item.name }}</span>
                  <span class="order-meta">Qty: {{ item.quantity }}</span>
                </div>
                <span class="order-price">{{ formatPrice(item.price * item.quantity) }}</span>
              </li>
            </ul>
            <div class="order-total">
              <span>Total</span>
              <strong>{{ formatPrice(orderTotal) }}</strong>
            </div>
          </template>

          <div v-else class="empty-state">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
            </svg>
            <p>You have no orders yet.</p>
            <NuxtLink to="/all-products" class="btn-solid">Continue Shopping</NuxtLink>
          </div>
        </div>

        <!-- Addresses Card -->
        <div class="account-card">
          <div class="account-card-header">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
              Saved Addresses
            </h3>
          </div>
          <div class="empty-state empty-state-compact">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
            </svg>
            <p>No saved addresses yet.</p>
            <p class="empty-hint">Addresses saved at checkout will appear here.</p>
          </div>
        </div>

        <!-- Actions Card -->
        <div class="account-card">
          <div class="account-card-header">
            <h3>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              Account Actions
            </h3>
          </div>
          <div class="action-links">
            <a href="https://user.mlm.vcarenetwork.in/auth/login" target="_blank" class="btn-solid btn-block">
              Your Direct Seller Panel
            </a>
            <button type="button" class="btn-solid btn-block btn-danger" @click="handleLogout">
              Sign Out
            </button>
          </div>
        </div>

      </section>
    </div>
  </div>

  <div v-else class="account-loading">
    <span class="loading-spinner"></span>
    <p>Loading your account...</p>
  </div>
</template>

<script setup>
useHead({
  bodyAttrs: {
    class: "my-account-page"
  }
})

import { ref, computed } from 'vue'

const route = useRoute()
const toast = useToast()
const { authState, checkAuthStatus, saveAuthData, logoutWithCleanup } = useAuthCart()
const cartStore = useCartStore()

const ready = ref(false)
const profile = ref({ id: '', userName: '', email: '' })
const editing = ref(false)
const editName = ref('')
const editEmail = ref('')

onMounted(async () => {
  checkAuthStatus()

  if (!authState.value.isLoggedIn || !authState.value.user) {
    await navigateTo(`/login?redirect=${encodeURIComponent(route.fullPath)}`)
    return
  }

  const user = authState.value.user
  profile.value = {
    id: user.id,
    userName: user.userName,
    email: user.email
  }
  editName.value = user.userName
  editEmail.value = user.email
  ready.value = true
})

const cartCount = computed(() => cartStore.cartCount || 0)
const orderItems = computed(() => cartStore.items || [])
const orderTotal = computed(() =>
  orderItems.value.reduce((sum, item) => sum + (Number(item.price) || 0) * item.quantity, 0)
)

const formatPrice = (value) => `₹ ${Number(value || 0).toLocaleString('en-IN')}`

const toggleEdit = () => {
  editing.value = !editing.value
}

const saveProfile = () => {
  if (!editName.value || !editEmail.value) return

  const updated = {
    id: profile.value.id,
    userName: editName.value.trim(),
    email: editEmail.value.trim()
  }

  saveAuthData(updated, authState.value.token)
  profile.value = { ...updated }
  editing.value = false

  toast.success({
    message: 'Profile updated successfully'
  })
}

const handleLogout = async () => {
  const result = await logoutWithCleanup()

  if (result.success) {
    toast.success({
      message: 'You have been logged out'
    })
    await navigateTo('/')
  } else {
    toast.error({
      message: result.error || 'Could not log out. Please try again.'
    })
  }
}
</script>

<style scoped>
.account-wrapper {
  padding: 40px 20px 60px;
}

.account-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* ---------- Page Title ---------- */
.account-header {
  display: flex;
  align-items: center;
  gap: 20px;
  background: #fff;
  border: 1px solid #e6eadf;
  border-radius: 16px;
  padding: 26px 30px;
  box-shadow: 0 6px 18px -12px rgba(29, 69, 3, 0.28);
  margin-bottom: 20px;
}

.account-header-avatar {
  width: 62px;
  height: 62px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--vcn-footer);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.account-header-avatar svg { width: 34px; height: 34px; }

.account-header-text {
  flex: 1;
  min-width: 0;
}

.account-header-text h1 {
  margin: 0 0 4px;
  font-size: 1.65rem;
  font-weight: 700;
  color: var(--vcn-footer);
  line-height: 1.15;
}

.account-header-text p {
  margin: 0;
  color: #88937e;
  font-size: 0.92rem;
}

.account-header-meta {
  word-break: break-all;
}

.account-header-chip {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(29, 69, 3, 0.07);
  color: var(--vcn-footer);
  border: 1px solid rgba(29, 69, 3, 0.25);
  border-radius: 999px;
  padding: 7px 14px;
  font-size: 0.82rem;
  font-weight: 600;
}

.account-header-chip svg { width: 14px; height: 14px; }

/* ---------- Stats Strip ---------- */
.account-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 20px 0;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 14px;
  background: #fff;
  border: 1px solid #e6eadf;
  border-radius: 16px;
  padding: 18px 20px;
  box-shadow: 0 6px 18px -12px rgba(29, 69, 3, 0.28);
  transition: transform .25s ease, box-shadow .25s ease;
}

.stat-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 26px -14px rgba(29, 69, 3, 0.35);
}

.stat-icon {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 12px;
  background: rgba(29, 69, 3, 0.08);
  color: var(--vcn-footer);
  display: flex;
  align-items: center;
  justify-content: center;
}

.stat-icon svg { width: 22px; height: 22px; }

.stat-body {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat-body strong {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--vcn-footer);
  word-break: break-all;
}

.stat-body .stat-id {
  font-size: 0.95rem;
}

.stat-body span {
  color: #888;
  font-size: 0.82rem;
}

/* ---------- Cards Grid ---------- */
.account-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.account-card {
  background: #fff;
  border: 1px solid #e6eadf;
  border-radius: 16px;
  padding: 22px 24px;
  box-shadow: 0 6px 18px -12px rgba(29, 69, 3, 0.28);
  transition: box-shadow .25s ease;
}

.account-card:hover {
  box-shadow: 0 14px 26px -14px rgba(29, 69, 3, 0.35);
}

.account-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
  padding-bottom: 14px;
  border-bottom: 1px solid #eef1e9;
}

.account-card-header h3 {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 1.05rem;
  font-weight: 700;
  color: var(--vcn-footer);
  margin: 0;
}

.account-card-header h3 svg {
  width: 18px;
  height: 18px;
  color: var(--vcn-primary);
}

.pill-btn {
  background: rgba(29, 69, 3, 0.07);
  border: 1px solid rgba(29, 69, 3, 0.25);
  color: var(--vcn-footer);
  border-radius: 999px;
  padding: 6px 16px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all .22s ease;
}

.pill-btn:hover {
  background: var(--vcn-footer);
  color: #fff;
}

.count-badge {
  min-width: 26px;
  height: 26px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--vcn-primary);
  color: #fff;
  font-size: 0.8rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* ---------- Profile ---------- */
.account-detail-grid {
  display: grid;
  gap: 12px;
}

.account-detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 8px 0 12px;
  border-bottom: 1px dashed #e8ece2;
}

.account-detail-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.detail-label {
  color: #9aa48f;
  font-size: 0.88rem;
}

.account-detail-item strong {
  color: #2b3326;
  font-weight: 600;
  text-align: right;
  word-break: break-all;
}

.account-edit-form {
  display: grid;
  gap: 14px;
}

.field-group {
  display: grid;
  gap: 6px;
}

.field-label {
  font-size: 0.82rem;
  font-weight: 600;
  color: #5a6650;
}

.field-input {
  width: 100%;
  border: 1px solid #dde3d3;
  background: #fafbf8;
  border-radius: 10px;
  padding: 11px 14px;
  font-size: 0.95rem;
  color: #2b3326;
  transition: border-color .22s ease, box-shadow .22s ease;
}

.field-input:focus {
  outline: none;
  border-color: var(--vcn-primary);
  box-shadow: 0 0 0 3px rgba(29, 69, 3, 0.12);
}

/* ---------- Orders ---------- */
.order-list {
  list-style: none;
  margin: 0 0 14px;
  padding: 0;
  max-height: 280px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid #eef1e9;
}

.order-item:last-child {
  border-bottom: none;
}

.order-thumb {
  width: 46px;
  height: 46px;
  flex-shrink: 0;
  border-radius: 10px;
  object-fit: cover;
  background: #f2f5ee;
}

.order-thumb-fallback {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--vcn-footer);
  text-transform: uppercase;
}

.order-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.order-name {
  color: #2b3326;
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.order-meta {
  color: #98a292;
  font-size: 0.8rem;
  margin-top: 2px;
}

.order-price {
  font-weight: 700;
  color: var(--vcn-footer);
  font-size: 0.95rem;
  white-space: nowrap;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding-top: 14px;
  border-top: 1px solid #eef1e9;
}

.order-total span { color: #88937e; font-size: 0.9rem; }

.order-total strong {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--vcn-footer);
}

/* ---------- Empty States ---------- */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  color: #8a9483;
  padding: 18px 6px;
}

.empty-state p { margin: 0; }

.empty-icon {
  width: 40px;
  height: 40px;
  color: #c3ccb8;
}

.empty-hint {
  font-size: 0.82rem;
  color: #aab1a2;
}

/* ---------- Buttons ---------- */
.btn-solid {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: var(--vcn-footer);
  color: #fff;
  border: 1px solid var(--vcn-footer);
  border-radius: 10px;
  padding: 12px 22px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: all .25s ease;
}

.btn-solid:hover {
  background: var(--vcn-primary);
  border-color: var(--vcn-primary);
  color: #fff;
}

.btn-block { width: 100%; }

.btn-danger {
  background: #fff;
  color: #c82333;
  border-color: #f1c0c5;
}

.btn-danger:hover {
  background: #c82333;
  border-color: #c82333;
  color: #fff;
}

.action-links {
  display: grid;
  gap: 12px;
}

/* ---------- Loading ---------- */
.account-loading {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 14px;
  color: var(--vcn-footer);
  font-weight: 600;
}

.account-loading p { margin: 0; }

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid rgba(29, 69, 3, 0.15);
  border-top-color: var(--vcn-footer);
  border-radius: 50%;
  animation: account-spin .8s linear infinite;
}

@keyframes account-spin {
  to { transform: rotate(360deg); }
}

/* ---------- Responsive ---------- */
@media (max-width: 991px) {
  .account-grid { grid-template-columns: 1fr; }
}

@media (max-width: 767px) {
  .account-wrapper { padding: 16px 14px 40px; }

  /* Page title: wrap chip below on smaller screens */
  .account-header {
    flex-wrap: wrap;
    gap: 14px;
    padding: 20px 18px;
  }

  .account-header-text h1 { font-size: 1.45rem; }

  .account-header-avatar { width: 52px; height: 52px; }
  .account-header-avatar svg { width: 28px; height: 28px; }

  .account-header-chip {
    margin-left: auto;
    padding: 6px 12px;
    font-size: 0.78rem;
  }

  .account-stats { grid-template-columns: 1fr; gap: 12px; }
  .stat-card { padding: 14px 16px; }
  .stat-icon { width: 42px; height: 42px; }
  .stat-body strong { font-size: 1rem; }

  .account-card { padding: 18px; }

  .order-thumb { width: 42px; height: 42px; }

  .pill-btn { padding: 6px 14px; }
}

@media (max-width: 400px) {
  .account-header { padding: 16px 14px; }
  .account-header-text h1 { font-size: 1.25rem; }
  .account-header-text p { font-size: 0.85rem; }
  .account-header-avatar { width: 46px; height: 46px; }
  .account-header-avatar svg { width: 24px; height: 24px; }
  .account-header-chip { width: 100%; margin-left: 0; }
  .account-stats { gap: 10px; }
  .stat-card { gap: 12px; }
  .stat-body .stat-id { font-size: 0.88rem; }
  .account-card-header h3 { font-size: 0.98rem; }
  .account-card-header h3 svg { width: 16px; height: 16px; }
}
</style>
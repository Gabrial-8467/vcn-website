<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useRoute } from 'vue-router'

const cmsStore = useCmsStore()
const route = useRoute()

const sidebar = computed(() => cmsStore.sidebar || [])
const isOpen = ref(false)

const activeItem = computed(() => {
  const path = route.path
  // Try exact match first
  const exact = sidebar.value.find(item => path === item.link)
  if (exact) return exact
  // Try startsWith match next
  const partial = sidebar.value.find(item => path.startsWith(item.link))
  if (partial) return partial
  // Fallback
  return { title: 'VCN India', link: '/about-us' }
})

// Close dropdown when clicking outside
const dropdownRef = ref(null)
const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  if (typeof document !== 'undefined') {
    document.addEventListener('click', handleClickOutside)
  }
})

onBeforeUnmount(() => {
  if (typeof document !== 'undefined') {
    document.removeEventListener('click', handleClickOutside)
  }
})
</script>

<template>
  <div class="about-sidebar-container">
    <!-- Desktop Sidebar (visible on screens >= 992px) -->
    <div class="about-sidebar-wrapper d-none d-lg-block">
      <div class="sidebar-inner">
        <NuxtLink
          v-for="item in sidebar"
          :key="item.link"
          class="menu-item"
          :to="item.link"
          active-class="active"
        >
          <span>{{ item.title }}</span>
          <i class="bi bi-chevron-right chevron-icon"></i>
        </NuxtLink>
      </div>
    </div>

    <!-- Mobile Dropdown Selector (visible on screens < 992px) -->
    <div class="about-sidebar-mobile d-lg-none" ref="dropdownRef">
      <div class="mobile-dropdown-wrapper">
        <button class="mobile-dropdown-trigger" @click="isOpen = !isOpen" aria-label="Select section">
          <span class="trigger-text">{{ activeItem.title }}</span>
          <i class="bi bi-chevron-down trigger-icon" :class="{ 'rotate-icon': isOpen }"></i>
        </button>
        
        <transition name="fade-slide">
          <div v-if="isOpen" class="mobile-dropdown-list">
            <NuxtLink
              v-for="item in sidebar"
              :key="item.link"
              class="mobile-dropdown-item"
              :class="{ 'active-item': item.link === activeItem.link }"
              :to="item.link"
              @click="isOpen = false"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-sidebar-container {
  width: 100%;
}

/* Desktop Sidebar Styling */
.about-sidebar-wrapper {
  width: 100%;
  background: #ffffff;
  border-right: 1px solid #eaeaea;
  height: 100%;
}

.sidebar-inner {
  display: flex;
  flex-direction: column;
}

.menu-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #4a5568;
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 15px;
}

.chevron-icon {
  font-size: 12px;
  color: #a0aec0;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-item:hover {
  background-color: #f8fafc;
  color: #1a202c;
  padding-left: 30px;
}

.menu-item:hover .chevron-icon {
  color: #1a202c;
  transform: translateX(4px);
}

.menu-item.active {
  background-color: #e9fccc;
  color: #45663c;
  font-weight: 600;
  border-left: 4px solid #45663c;
}

.menu-item.active .chevron-icon {
  color: #45663c;
  transform: translateX(2px);
}

/* Mobile Dropdown Styling matching image.png */
.about-sidebar-mobile {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 12px 20px;
  background: #ffffff;
  box-sizing: border-box;
  position: relative;
  z-index: 100;
}

.mobile-dropdown-wrapper {
  position: relative;
  display: inline-block;
}

.mobile-dropdown-trigger {
  font-family: "Golos Text", "Outfit", sans-serif;
  font-size: 17px;
  font-weight: 700;
  color: #1d4503; /* Dark theme green matching Amway/VCN styling */
  border-bottom: 2px solid #1d4503;
  padding: 4px 0;
  background: transparent;
  border-top: none;
  border-left: none;
  border-right: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.mobile-dropdown-trigger:focus {
  outline: none;
}

.trigger-icon {
  font-size: 13px;
  transition: transform 0.25s ease;
}

.rotate-icon {
  transform: rotate(180deg);
}

.mobile-dropdown-list {
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  min-width: 220px;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 999;
}

.mobile-dropdown-item {
  padding: 14px 20px;
  color: #4a5568;
  font-size: 15px;
  text-decoration: none;
  font-weight: 500;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s ease;
  text-align: left;
}

.mobile-dropdown-item:last-child {
  border-bottom: none;
}

.mobile-dropdown-item:hover,
.mobile-dropdown-item.active-item {
  background-color: #e9fccc;
  color: #45663c;
  font-weight: 600;
}

/* Dropdown Animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>

<style>
/* Unscoped override for the parent page-level containers and section on mobile viewports */
@media (max-width: 991.98px) {
  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section > .container-fluid {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .product-detail-section .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .sidebar-section {
    height: auto !important;
    min-height: auto !important;
    position: relative !important;
    top: 0 !important;
    overflow: visible !important;
    border-right: none !important;
    background: transparent !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>

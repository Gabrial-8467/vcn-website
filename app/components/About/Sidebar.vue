<script setup>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useRoute } from 'vue-router'

const cmsStore = useCmsStore()
const route = useRoute()

const sidebar = computed(() => cmsStore.sidebar || [])
</script>

<template>
  <!-- Beautiful vertical sidebar list layout with right chevrons for premium look -->
  <div class="about-sidebar-wrapper">
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
</template>

<style scoped>
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

/* Tablet & Mobile Layout: Keep vertical list but optimize size, padding, and margins */
@media (max-width: 991.98px) {
  .about-sidebar-wrapper {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
    margin-bottom: 20px;
  }

  .menu-item {
    padding: 15px 20px;
    font-size: 14px;
  }

  .menu-item:hover {
    padding-left: 24px;
  }
}
</style>

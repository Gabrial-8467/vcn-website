<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useRoute } from 'vue-router'

const cmsStore = useCmsStore()
const route = useRoute()
const isOpen = ref(false)

const sidebar = computed(() => cmsStore.sidebar || [])

const activeItem = computed(() => {
  const path = route.path
  const exact = sidebar.value.find(item => path === item.link)
  if (exact) return exact
  const partial = sidebar.value.find(item => path.startsWith(item.link))
  if (partial) return partial
  return { title: 'Wellness Journal', link: '/about-us' }
})

const getSidebarIcon = (title) => {
  const t = title.toLowerCase()
  if (t.includes('journey')) return 'bi-signpost-split'
  if (t.includes('india') || t.includes('about') || t.includes('journal')) return 'bi-journal-text'
  if (t.includes('leadership') || t.includes('leader')) return 'bi-people'
  if (t.includes('news') || t.includes('media')) return 'bi-newspaper'
  if (t.includes('career')) return 'bi-briefcase'
  if (t.includes('faq') || t.includes('help')) return 'bi-question-circle'
  return 'bi-circle'
}

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
    <!-- about-sidebar-bg fills the FULL column height with the beige
         background. about-sidebar-wrapper inside it is the part that
         actually sticks, so the nav links pin near the top while the
         beige panel itself continues all the way to the bottom of the
         content column — no empty gap underneath. -->
    <div class="about-sidebar-bg d-none d-lg-flex">
      <div class="about-sidebar-wrapper">
        <div class="sidebar-top-section">
          <div class="sidebar-menu-list">
            <NuxtLink
              v-for="item in sidebar"
              :key="item.link"
              class="sidebar-menu-item"
              :to="item.link"
              active-class="active"
            >
              <i :class="['bi', getSidebarIcon(item.title), 'menu-icon']"></i>
              <span>{{ item.title }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Dropdown Selector (visible on screens < 992px) -->
    <div class="about-sidebar-mobile d-lg-none" ref="dropdownRef">
      <div class="mobile-dropdown-wrapper">
        <button
          class="mobile-dropdown-trigger"
          @click="isOpen = !isOpen"
          aria-label="Select section"
          :aria-expanded="isOpen"
        >
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
/*
  STICKY SIDEBAR — HOW IT WORKS
  ------------------------------
  position: sticky needs:
  1. A defined "track" to scroll within — that's .sidebar-section (the
     parent grid/flex column from the page), which must be taller than
     the sidebar itself (i.e. as tall as the main content column).
  2. No ancestor between the sticky element and that scroll container
     with overflow: hidden / auto / scroll, or a transform/filter/
     contain/will-change (any of these break the sticky context).
  3. The sticky element's own wrapper must NOT stretch to fill the
     parent's height — it should size to its own content
     (height: fit-content + align-self: flex-start) so it has room
     to travel while the page scrolls.

  BACKGROUND FILL — HOW IT WORKS
  -------------------------------
  .about-sidebar-bg is a SEPARATE, non-sticky wrapper that stretches to
  the full column height (height: 100%). The beige background color
  lives here. .about-sidebar-wrapper (the actual sticky element) sits
  inside it with a transparent background, so only the nav content
  visually "sticks" while the beige panel underneath fills all the way
  down to the bottom of the content column — no empty gap.
*/

.about-sidebar-container {
  width: 100%;
  height: 100%;           /* pass the parent's full height down */
  flex: 1;                /* Force flex item to stretch vertically */
  display: flex;
  flex-direction: column;
}

/* =========================
   Desktop Sidebar
========================= */

.about-sidebar-bg {
  border-radius: 12px;
  width: 100%;
  height: 100%;            /* fills the full column height — no gap at bottom */
  flex: 1;
  display: flex;
  flex-direction: column;
}

.about-sidebar-wrapper {
  background: transparent; /* background now lives on .about-sidebar-bg */
  padding: 45px 30px;
  width: 100%;
  position: sticky;
  top: 120px;               /* adjust to match your fixed header height */
  height: fit-content;      /* critical: do NOT let this stretch full height */
  align-self: flex-start;   /* critical: stops flex from stretching it */
  z-index: 10;
}

.sidebar-top-section {
  width: 100%;
}

.sidebar-menu-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sidebar-menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px;
  border-radius: 8px;
  color: #183C22;
  opacity: 0.8;
  text-decoration: none;
  font-size: 1.05rem;
  font-weight: 500;
  transition: all 0.25s ease;
}

.sidebar-menu-item:hover {
  background: rgba(24, 60, 34, 0.05);
  opacity: 1;
  padding-left: 22px;
}

.sidebar-menu-item.active {
  opacity: 1;
  font-weight: 600;
}

.sidebar-menu-item.active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 10px;
  bottom: 10px;
  width: 4px;
  border-radius: 4px;
  background: #183C22;
}

.menu-icon {
  font-size: 20px;
  min-width: 20px;
}

/* =========================
   Mobile
========================= */

.about-sidebar-mobile {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 12px 20px;
  background: #EBDFD1;
  position: relative;
  z-index: 100;
}

.mobile-dropdown-wrapper {
  position: relative;
}

.mobile-dropdown-trigger {
  display: flex;
  align-items: center;
  gap: 8px;

  background: transparent;
  border: none;
  border-bottom: 2px solid #183C22;

  color: #183C22;
  font-size: 16px;
  font-weight: 600;

  padding-bottom: 4px;
  cursor: pointer;
}

.mobile-dropdown-trigger:focus {
  outline: none;
}

.trigger-icon {
  transition: transform .25s ease;
}

.rotate-icon {
  transform: rotate(180deg);
}

.mobile-dropdown-list {
  position: absolute;
  right: 0;
  top: calc(100% + 8px);

  min-width: 240px;

  background: #EBDFD1;
  border-radius: 12px;
  overflow: hidden;

  box-shadow: 0 12px 30px rgba(0,0,0,.12);
}

.mobile-dropdown-item {
  display: block;
  padding: 14px 20px;
  color: #183C22;
  text-decoration: none;
  transition: .2s;
}

.mobile-dropdown-item:hover,
.mobile-dropdown-item.active-item {
  background: rgba(24,60,34,.05);
  font-weight: 600;
}

/* =========================
   Animation
========================= */

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all .25s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* =========================
   Responsive
========================= */

@media (max-width: 991.98px) {
  .about-sidebar-bg {
    height: auto;
    border-radius: 0;
    background: transparent;
  }

  .about-sidebar-wrapper {
    position: static;
    top: auto;
  }

  .about-sidebar-container {
    height: auto;
  }
}
</style>

<style>
/*
  These rules target the PARENT page's column (.sidebar-section) and the
  surrounding grid (.product-detail-section), which live outside this
  component's template — hence the unscoped block. They exist purely to
  give the sticky element above a tall-enough, unclipped track to stick
  within, and to make sure .sidebar-section itself is exactly as tall as
  the main content column (so the beige fill has the right height to
  match). Keep these in sync with the parent page's markup.
*/

@media (min-width: 992px) {
  .product-detail-section .row {
    display: flex;
    align-items: stretch; /* forces both columns to equal height */
  }

  .sidebar-section {
    display: flex;
    flex-direction: column;
    align-self: stretch;     /* match the height of the content column */
    position: relative;
    overflow: visible;       /* must stay visible or sticky breaks */
    transform: none;
    background: transparent;
    padding-top: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Ensure no ancestor clips the sticky context */
  .product-detail-section,
  .product-detail-section > .container-fluid,
  .product-detail-section .row {
    overflow: visible;
    transform: none;
  }
}

@media (max-width: 991.98px) {
  .product-detail-section {
    padding: 0;
    margin-top: 0;
  }

  .product-detail-section > .container-fluid {
    padding-left: 0;
    padding-right: 0;
  }

  .product-detail-section .row {
    margin-left: 0;
    margin-right: 0;
  }

  .sidebar-section {
    height: auto;
    min-height: auto;
    position: relative;
    top: 0;
    overflow: visible;
    border-right: none;
    background: transparent;
    padding-left: 0;
    padding-right: 0;
    margin-left: 0;
    margin-right: 0;
  }
}
</style>
<template>
  <ClientOnly>
    <section class="rs2-section">
      <div class="rs2-container">

        <!-- Large display text -->
        <div class="rs2-display">
          <span class="rs2-overline">{{ qualityOverline }}</span>
          <h2 class="rs2-title">{{ purityTitle || 'Ayurvedic purity that sets<br>a higher standard.' }}</h2>
        </div>

        <!-- Feature list -->
        <div class="rs2-list">
          <div v-for="(point, index) in purityKeyPoints" :key="index" class="rs2-item">
            <div class="rs2-item-left">
              <span class="rs2-item-num">{{ String(index + 1).padStart(2, '0') }}</span>
              <img :src="point.icon || fallbackIcons[index]" :alt="`Quality ${index + 1}`" class="rs2-item-icon" />
            </div>
            <p class="rs2-item-text" v-html="point.description"></p>
            <div class="rs2-item-check">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>
            </div>
          </div>
        </div>

        <!-- Bottom tagline -->
        <div class="rs2-tagline">
          <p>{{ purityDescription || 'DBT Care Plus is screened as a full formula for purity, potency and safety — because what goes into your herbal juice matters as much as what stays out.' }}</p>
        </div>

      </div>
    </section>
  </ClientOnly>
</template>

<script setup>
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const productStore = useProductStore()
const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

const rigorousSection = computed(() =>
  cmsStore.getSectionByKey('rigorous') || cmsStore.getSectionByKey('purity') || cmsStore.getSectionByKey('testing')
)
const qualityOverline = computed(() =>
  rigorousSection.value?.name ||
  rigorousSection.value?.subtitle ||
  'Quality Standards'
)
const purityTitle = computed(() => rigorousSection.value?.title || productStore.selectedProductPage?.purityTitle)
const purityDescription = computed(() => rigorousSection.value?.description || productStore.selectedProductPage?.purityDescription)
const purityKeyPoints = computed(() => {
  if (rigorousSection.value?.items && rigorousSection.value.items.length > 0) {
    return rigorousSection.value.items.map(item => ({
      icon: getCmsImageUrl(item.image) || item.icon,
      description: item.description || item.title
    }))
  }
  const apiPoints = productStore.selectedProductPage?.purityKeyPoints || []
  if (apiPoints.length > 0) return apiPoints
  return [
    { icon: '/img/productsdetails/ayurvedic.png', description: 'Formulated with 100% natural Ayurvedic herbs — no synthetic chemicals or artificial additives' },
    { icon: '/img/productsdetails/no-preservatives.png', description: 'Free from preservatives, binders and harmful chemical substances' },
    { icon: '/img/productsdetails/GMP Certified.png', description: 'Manufactured in a GMP certified facility ensuring consistent quality and safety' }
  ]
})
const fallbackIcons = ['/img/productsdetails/ayurvedic.png', '/img/productsdetails/no-preservatives.png', '/img/productsdetails/GMP Certified.png']
</script>

<style scoped>
.rs2-section {
  background: #F6F7EE;
  padding: 80px 0;
}

.rs2-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  grid-template-rows: auto 1fr auto;
  gap: 0 80px;
  align-items: start;
}

@media (max-width: 991px) {
  .rs2-container { grid-template-columns: 1fr; gap: 40px 0; }
  .rs2-section { padding: 56px 0; }
}

/* Display heading area */
.rs2-display {
  grid-column: 1;
  grid-row: 1 / 3;
  position: sticky;
  top: 80px;
}

@media (max-width: 991px) {
  .rs2-display { position: static; grid-row: auto; }
}

.rs2-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #5E6C1F;
  margin-bottom: 20px;
}

.rs2-title {
  font-family: var(--vcn-font, "Outfit", sans-serif);
  font-size: clamp(30px, 3.5vw, 48px);
  font-weight: 800;
  color: #0d1f0a;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin: 0;
}

/* Feature list */
.rs2-list {
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(0,0,0,0.08);
}

@media (max-width: 991px) {
  .rs2-list { grid-column: 1; grid-row: auto; }
}

.rs2-item {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid rgba(0,0,0,0.08);
  transition: padding-left 0.3s ease;
}
.rs2-item:hover { padding-left: 8px; }

.rs2-item-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.rs2-item-num {
  font-size: 12px;
  font-weight: 800;
  color: rgba(0,0,0,0.18);
  width: 28px;
}

.rs2-item-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
  background: #ffffff;
  border-radius: 12px;
  padding: 8px;
}

.rs2-item-text {
  font-size: 14.5px;
  line-height: 1.6;
  color: #444;
  margin: 0;
  flex: 1;
}

.rs2-item-check {
  flex-shrink: 0;
  width: 30px;
  height: 30px;
  background: #1C3A13;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #d3fa99;
}

/* Tagline */
.rs2-tagline {
  grid-column: 2;
  grid-row: 3;
  margin-top: 32px;
}

@media (max-width: 991px) {
  .rs2-tagline { grid-column: 1; grid-row: auto; }
}

.rs2-tagline p {
  font-size: 14px;
  line-height: 1.7;
  color: #888;
  margin: 0;
  max-width: 480px;
}
</style>
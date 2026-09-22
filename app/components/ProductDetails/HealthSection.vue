<template>
  <section class="hs2-section">
    <div class="hs2-inner">

      <!-- Top header row -->
      <div class="hs2-top-row">
        <div class="hs2-label-col">
          <span class="hs2-overline">Why It Works</span>
          <h2 class="hs2-heading" v-html="sectionHeading" />
        </div>
        <p class="hs2-subtext">{{ sectionSubtext }}</p>
      </div>

      <!-- Cards -->
      <div class="hs2-cards-row">
        <div
          v-for="(point, index) in supportKeyPoints"
          :key="index"
          class="hs2-card"
        >
          <!-- Step number + icon row -->
          <div class="hs2-card-header">
            <span class="hs2-card-num">0{{ index + 1 }}</span>
            <div class="hs2-card-icon">
              <img
                :src="point.icon || `/img/icons/icon-${index + 1}.png`"
                :alt="point.title"
                @error="handleIconError($event)"
              />
            </div>
          </div>

          <!-- Divider line -->
          <div class="hs2-card-divider"></div>

          <h3 class="hs2-card-title">{{ point.title }}</h3>
          <p class="hs2-card-desc">{{ point.description }}</p>

          <!-- Bottom accent line -->
          <div class="hs2-card-accent"></div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const productStore = useProductStore()
const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

const currentProduct = computed(() => productStore.selectedProduct)
const productName = computed(() => currentProduct.value?.name || 'DBT Care Plus')

const healthSection = computed(() =>
  cmsStore.getSectionByKey('health') ||
  cmsStore.getSectionByKey('health-section') ||
  cmsStore.getSectionByKey('support')
)

const sectionHeading = computed(() => {
  if (healthSection.value?.description) return healthSection.value.description
  if (productStore.selectedProductPage?.supportTitle) return productStore.selectedProductPage.supportTitle
  if (currentProduct.value?.slug?.includes('dbt')) {
    return 'Engineered for <em>Total Diabetic Wellness</em>'
  }
  return `${productName.value} delivers targeted herbal action<br>to revitalize and support your daily wellness.`
})

const sectionSubtext = computed(() => {
  if (healthSection.value?.title) return healthSection.value.title
  if (productStore.selectedProductPage?.supportMainTitle) return productStore.selectedProductPage.supportMainTitle
  return 'Your body needs natural Ayurvedic support to restore balance and long-term vitality.'
})

const supportKeyPoints = computed(() => {
  if (healthSection.value?.items && healthSection.value.items.length > 0) {
    return healthSection.value.items.map(item => ({
      title: item.title,
      description: item.description,
      icon: getCmsImageUrl(item.image) || item.icon
    }))
  }
  const apiPoints = productStore.selectedProductPage?.supportKeyPoints || []
  if (apiPoints.length > 0) return apiPoints
  return [
    {
      title: 'Blood Sugar Control',
      description: 'Karela, Gurmar & Neem actively reduce high blood glucose and improve insulin sensitivity from Day 1.*',
      icon: '/img/icons/icon-1.png'
    },
    {
      title: 'Detox & Purification',
      description: 'Vijayasar & Punarnava remove toxins, purify the blood and support liver and kidney health.*',
      icon: '/img/icons/icon-2.png'
    },
    {
      title: 'Symptom Relief',
      description: 'Giloy & Jamun relieve thirst, urination, tiredness and weak eyesight caused by diabetes.*',
      icon: '/img/icons/icon-4.png'
    }
  ]
})

const handleIconError = (event) => {
  if (event?.target) event.target.style.display = 'none'
}
</script>

<style scoped>
/* ─── Section ─────────────────────────────────────────────── */
.hs2-section {
  background: #ffffff;
  padding: 72px 0 80px;
  position: relative;
  overflow: hidden;
}

/* Subtle top border accent */
.hs2-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1d4503 0%, #5a9e1a 50%, #1d4503 100%);
}

.hs2-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .hs2-section { padding: 52px 0 60px; }
  .hs2-inner { padding: 0 20px; }
}

/* ─── Header row ──────────────────────────────────────────── */
.hs2-top-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 44px;
  flex-wrap: wrap;
}

.hs2-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #1d4503;
  background: #f0fae6;
  padding: 5px 13px;
  border-radius: 20px;
  border: 1px solid #c5f375;
  margin-bottom: 12px;
}

.hs2-heading {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 900;
  color: #0e1a0b;
  line-height: 1.15;
  letter-spacing: -0.8px;
  margin: 0;
  max-width: 580px;
}

/* Make <em> inside heading green */
.hs2-heading :deep(em) {
  font-style: normal;
  color: #1d4503;
}

.hs2-subtext {
  font-size: 14px;
  line-height: 1.7;
  color: #5a6b50;
  margin: 0;
  max-width: 300px;
  text-align: right;
  align-self: flex-end;
}

@media (max-width: 768px) {
  .hs2-top-row { flex-direction: column; align-items: flex-start; margin-bottom: 32px; gap: 8px; }
  .hs2-subtext { text-align: left; max-width: 100%; }
}

/* ─── Cards grid ──────────────────────────────────────────── */
.hs2-cards-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media (max-width: 900px) { .hs2-cards-row { grid-template-columns: repeat(2, 1fr); gap: 16px; } }
@media (max-width: 600px) { .hs2-cards-row { grid-template-columns: 1fr; gap: 14px; } }

/* ─── Individual card ─────────────────────────────────────── */
.hs2-card {
  background: #ffffff;
  border: 1.5px solid #e8f0e3;
  border-radius: 20px;
  padding: 28px 26px 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 12px rgba(29, 69, 3, 0.06);
}

.hs2-card:hover {
  border-color: #a8de6a;
  transform: translateY(-4px);
  box-shadow: 0 16px 40px rgba(29, 69, 3, 0.12);
}

/* Subtle green corner glow on hover */
.hs2-card::after {
  content: '';
  position: absolute;
  top: -40px; right: -40px;
  width: 120px; height: 120px;
  background: radial-gradient(circle, rgba(197,243,117,0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}
.hs2-card:hover::after { opacity: 1; }

/* ─── Card header: number + icon ─────────────────────────── */
.hs2-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hs2-card-num {
  font-size: 12px;
  font-weight: 800;
  color: #1d4503;
  letter-spacing: 1.5px;
  background: #f0fae6;
  padding: 4px 10px;
  border-radius: 8px;
}

.hs2-card-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1d4503 0%, #2e6b08 100%);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(29, 69, 3, 0.25);
}

.hs2-card-icon img {
  width: 22px;
  height: 22px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.95;
}

/* ─── Divider ─────────────────────────────────────────────── */
.hs2-card-divider {
  height: 1px;
  background: linear-gradient(90deg, #e8f0e3 0%, transparent 100%);
  margin: 2px 0 4px;
}

/* ─── Card text ───────────────────────────────────────────── */
.hs2-card-title {
  font-size: 17px;
  font-weight: 800;
  color: #0e1a0b;
  margin: 0;
  line-height: 1.25;
  font-family: 'Outfit', system-ui, sans-serif;
}

.hs2-card-desc {
  font-size: 13.5px;
  line-height: 1.65;
  color: #5a6b50;
  margin: 0;
}

/* ─── Bottom accent line ──────────────────────────────────── */
.hs2-card-accent {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1d4503, #c5f375);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 0 0 20px 20px;
}
.hs2-card:hover .hs2-card-accent { transform: scaleX(1); }

@media (max-width: 576px) {
  .hs2-card { padding: 22px 18px 20px; }
}
</style>
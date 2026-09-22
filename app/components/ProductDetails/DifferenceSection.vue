<template>
  <ClientOnly>
    <section class="ds2-section">
      <div class="ds2-container">

        <!-- Top: full-width heading -->
        <div class="ds2-header">
          <div class="ds2-header-left">
            <span class="ds2-overline">{{ featureOverline }}</span>
            <h2 class="ds2-title" v-html="featureHeading || 'Natural blood sugar solution<br>backed by Ayurveda'" />
          </div>
          <p class="ds2-header-right" v-html="featureSubHeading || 'Our Ayurvedic formulation combines 11 powerful herbs, clinically trusted to manage blood sugar naturally.'" />
        </div>

        <!-- Content: image full-height + cards grid -->
        <div class="ds2-body">

          <!-- Left: full-height image -->
          <div class="ds2-img-col">
            <div class="ds2-img-wrap">
              <img :src="featureImage || '/img/dbt/389size.png'" alt="Product doctor" class="ds2-img" />
              <div class="ds2-img-overlay"></div>
              <div class="ds2-img-caption">
                <span>{{ trustedCaption.pre }}</span>
                <strong>{{ trustedCaption.num }}</strong>
                <span>{{ trustedCaption.post }}</span>
              </div>
            </div>
          </div>

          <!-- Right: 2x2 feature cards -->
          <div class="ds2-cards-col">
            <div class="ds2-cards-grid">
              <div
                v-for="(point, index) in featureKeyPoints"
                :key="index"
                class="ds2-card"
              >
                <div class="ds2-card-num">{{ String(index + 1).padStart(2, '0') }}</div>
                <img :src="point.icon || fallbackIcons[index]" :alt="point.title" class="ds2-card-icon" />
                <h3 class="ds2-card-title">{{ point.title }}</h3>
                <p class="ds2-card-desc">{{ point.description }}</p>
              </div>
            </div>
          </div>

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

const differenceSection = computed(() =>
  cmsStore.getSectionByKey('difference') || cmsStore.getSectionByKey('feature')
)
const featureOverline = computed(() =>
  differenceSection.value?.name ||
  differenceSection.value?.subtitle ||
  'Why DBT Care Plus'
)
const trustedCaption = computed(() =>
  differenceSection.value?.config?.trustedCaption ||
  { pre: 'Trusted by', num: '50,000+', post: 'Customers' }
)
const featureHeading = computed(() => differenceSection.value?.title || productStore.selectedProductPage?.featureHeading)
const featureSubHeading = computed(() => differenceSection.value?.description || productStore.selectedProductPage?.featureSubHeading)
const featureImage = computed(() => {
  if (differenceSection.value?.image) return getCmsImageUrl(differenceSection.value.image)
  return productStore.selectedProductPage?.featureImage
})
const featureKeyPoints = computed(() => {
  if (differenceSection.value?.items && differenceSection.value.items.length > 0) {
    return differenceSection.value.items.map(item => ({ icon: getCmsImageUrl(item.image) || item.icon, title: item.title, description: item.description }))
  }
  const apiPoints = productStore.selectedProductPage?.featureKeyPoints || []
  if (apiPoints.length > 0) return apiPoints
  return [
    { icon: '/img/productsdetails/Type1&Type2Diabetes.png', title: 'Type 1 & Type 2 Diabetes', description: 'Herbs like Gurmar and Methi manage both Type 1 and Type 2 Diabetes by enhancing insulin levels.*' },
    { icon: '/img/productsdetails/High Blood Sugar.png', title: 'High Blood Sugar', description: 'Karela, Neem and Vijayasar reduce blood glucose, stimulate insulin and purify blood naturally.*' },
    { icon: '/img/productsdetails/Liver&KidneyDisorders.png', title: 'Liver & Kidney Disorders', description: 'Punarnava and Aloe Vera support liver and kidney health, reducing toxins.*' },
    { icon: '/img/productsdetails/Diabetic Symptoms Relief.png', title: 'Diabetic Symptoms Relief', description: 'Relieves thirst, urination, fatigue, weak eyesight and slow wound healing.*' }
  ]
})
const fallbackIcons = ['/img/productsdetails/Type1&Type2Diabetes.png', '/img/productsdetails/High Blood Sugar.png', '/img/productsdetails/Liver&KidneyDisorders.png', '/img/productsdetails/Diabetic Symptoms Relief.png']
</script>

<style scoped>
.ds2-section {
  background: #0d1f0a;
  padding: 80px 0;
}

.ds2-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
}

@media (max-width: 768px) {
  .ds2-section { padding: 56px 0; }
  .ds2-container { padding: 0 20px; }
}

/* Header */
.ds2-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  margin-bottom: 52px;
  flex-wrap: wrap;
}

.ds2-overline {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #d3fa99;
  margin-bottom: 14px;
}

.ds2-title {
  font-family: "Outfit", sans-serif;
  font-size: clamp(28px, 4vw, 52px);
  font-weight: 800;
  color: #ffffff;
  line-height: 1.1;
  letter-spacing: -1.5px;
  margin: 0;
}

.ds2-header-right {
  font-size: 14.5px;
  line-height: 1.7;
  color: rgba(255,255,255,0.5);
  margin: 0;
  max-width: 320px;
  text-align: right;
  align-self: flex-end;
}

@media (max-width: 768px) {
  .ds2-header { flex-direction: column; gap: 16px; }
  .ds2-header-right { text-align: left; max-width: 100%; }
}

/* Body grid */
.ds2-body {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 24px;
  align-items: start;
}

@media (max-width: 991px) {
  .ds2-body { grid-template-columns: 1fr; }
}

/* Image column */
.ds2-img-col { height: 100%; }

.ds2-img-wrap {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  height: 520px;
}

@media (max-width: 991px) {
  .ds2-img-wrap { height: 360px; }
}

.ds2-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s ease;
}
.ds2-img-wrap:hover .ds2-img { transform: scale(1.03); }

.ds2-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(13, 31, 10, 0.7) 0%, transparent 50%);
}

.ds2-img-caption {
  position: absolute;
  bottom: 24px;
  left: 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: rgba(255,255,255,0.8);
}
.ds2-img-caption strong {
  font-size: 24px;
  font-weight: 900;
  color: #d3fa99;
}

/* Cards grid */
.ds2-cards-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

@media (max-width: 576px) {
  .ds2-cards-grid { grid-template-columns: 1fr; }
}

.ds2-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 20px;
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: background 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}
.ds2-card:hover {
  background: rgba(211,250,153,0.05);
  border-color: rgba(211,250,153,0.15);
  transform: translateY(-4px);
}

.ds2-card-num {
  font-size: 11px;
  font-weight: 800;
  color: rgba(211,250,153,0.5);
  letter-spacing: 1px;
}

.ds2-card-icon {
  width: 40px;
  height: 40px;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.7;
}

.ds2-card-title {
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.25;
}

.ds2-card-desc {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255,255,255,0.5);
  margin: 0;
}
</style>

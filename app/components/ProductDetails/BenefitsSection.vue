<template>
  <section class="tl-section">
    <div class="tl-inner">

      <!-- Header -->
      <div class="tl-header">
        <span class="tl-overline">{{ journeyOverline }}</span>
        <h2 class="tl-title">{{ timelineTitle }}</h2>
        <p class="tl-sub">{{ timelineSub }}</p>
      </div>

      <!-- Timeline steps -->
      <div class="tl-track">
        <div class="tl-line"></div>
        <div v-for="(phase, i) in timelinePhases" :key="i" class="tl-phase" :class="{ 'tl-phase--active': activePhase === i }" @click="activePhase = i">
          <div class="tl-dot" :class="{ active: activePhase >= i }">
            <span>{{ i + 1 }}</span>
          </div>
          <div class="tl-phase-card">
            <span class="tl-pill">{{ phase.time }}</span>
            <h3 class="tl-phase-title">{{ phase.title }}</h3>
            <ul class="tl-phase-list">
              <li v-for="(pt, j) in phase.points" :key="j">{{ pt }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- How to use panel -->
      <div class="tl-htu">
        <div class="tl-htu-left">
          <span class="tl-htu-overline">{{ htuOverline }}</span>
          <h3 class="tl-htu-title">{{ htuTitle }}</h3>
          <ol class="tl-htu-steps">
            <li v-for="(step, i) in howToUse" :key="i">
              <span class="tl-step-num">{{ i + 1 }}</span>
              <span>{{ step }}</span>
            </li>
          </ol>
          <div class="tl-htu-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ productNote }}
          </div>
        </div>
        <div class="tl-htu-right">
          <img :src="productImg" alt="Product" class="tl-htu-img" @error="onImgErr" />
          <div class="tl-htu-cert">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            <span>{{ certText }}</span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const productStore = useProductStore()
const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()
const activePhase = ref(0)

const journeySection = computed(() =>
  cmsStore.getSectionByKey('journey') ||
  cmsStore.getSectionByKey('timeline') ||
  cmsStore.getSectionByKey('benefits')
)

const journeyOverline = computed(() =>
  journeySection.value?.name ||
  journeySection.value?.subtitle ||
  'Expected Progress'
)

const timelineTitle = computed(() =>
  productStore.selectedProductPage?.journeyTitle ||
  journeySection.value?.title ||
  'Your Wellness Timeline'
)

const timelineSub = computed(() =>
  journeySection.value?.subtitle ||
  productStore.selectedProductPage?.journeyTitle ||
  'Real results. Tracked. Transparent.'
)

const htuOverline = computed(() =>
  journeySection.value?.config?.htuOverline ||
  'Daily Routine'
)

const htuTitle = computed(() =>
  journeySection.value?.config?.htuTitle ||
  'How to Use'
)

const certText = computed(() =>
  journeySection.value?.config?.certificateLabel ||
  'AYUSH Certified 100% Natural'
)

const DEFAULT_TIMELINE = [
  {
    time: 'Days 1–7',
    title: 'Immediate Activation',
    points: ['Reduced sugar cravings', 'Better digestion & gut health', 'Improved energy & mental clarity', 'Karela + Gurmar start blocking sugar absorption']
  },
  {
    time: 'Weeks 2–4',
    title: 'Metabolic Reset',
    points: ['Fasting blood sugar stabilizing', 'Post-meal glucose spikes reduced', 'Improved insulin sensitivity', 'Pancreatic cell repair beginning (Vijayasar)']
  },
  {
    time: 'Month 2+',
    title: 'Deep Cellular Repair',
    points: ['HbA1c levels improving measurably', 'Kidney & liver function strengthened', 'Diabetic fatigue significantly reduced', 'Long-term sugar metabolism normalized']
  },
]

const timelinePhases = computed(() => {
  const apiPoints = productStore.selectedProductPage?.journeyKeyPoints || []
  if (apiPoints.length > 0) {
    return apiPoints.map(p => ({
      time: p.timeLabel || 'Phase',
      title: p.title,
      points: Array.isArray(p.points) ? p.points : [p.description || p.points]
    }))
  }
  if (journeySection.value?.items?.length > 0) {
    return journeySection.value.items.map((item, i) => ({
      time: DEFAULT_TIMELINE[i]?.time || `Phase ${i + 1}`,
      title: item.title,
      points: [item.description]
    }))
  }
  return DEFAULT_TIMELINE
})

const howToUse = computed(() => {
  const dir = productStore.selectedProduct?.directionsForUse
  if (dir) {
    const parts = dir.split(/[,.]/).map(s => s.trim()).filter(Boolean)
    if (parts.length > 1) return parts
  }
  return [
    'Shake the bottle well before use',
    'Mix 20–30ml in an equal amount of lukewarm water',
    'Consume twice daily — morning & evening before meals',
    'For best results, maintain a low-sugar diet alongside',
  ]
})

const productNote = computed(() =>
  productStore.selectedProductPage?.journeySubTitle ||
  'Formulated for sustained daily use. Replenishes 11 powerful herbs every day.'
)

const productImg = computed(() =>
  productStore.selectedProduct?.image || '/img/productsdetails/BOOSTER.png'
)

const onImgErr = (e) => { if (e?.target) e.target.src = '/img/productsdetails/BOOSTER.png' }
</script>

<style scoped>
.tl-section {
  background: linear-gradient(160deg, #0d2209 0%, #0b1e08 100%);
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.tl-section::before {
  content: '';
  position: absolute;
  bottom: -100px; left: -100px;
  width: 500px; height: 500px;
  background: radial-gradient(ellipse, rgba(197,243,117,0.05) 0%, transparent 70%);
  pointer-events: none;
}

.tl-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  gap: 56px;
}

@media (max-width: 768px) {
  .tl-section { padding: 56px 0; }
  .tl-inner { padding: 0 20px; gap: 40px; }
}

/* Header */
.tl-header { text-align: center; }

.tl-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #c5f375;
  background: rgba(197,243,117,0.1);
  border: 1px solid rgba(197,243,117,0.2);
  padding: 5px 14px;
  border-radius: 20px;
  margin-bottom: 14px;
}

.tl-title {
  font-size: clamp(28px, 4vw, 44px);
  font-weight: 900;
  color: #f5f9f0;
  letter-spacing: -1px;
  margin: 0 0 10px;
}

.tl-sub {
  font-size: 15px;
  color: rgba(245,249,240,0.5);
  margin: 0;
}

/* Timeline track */
.tl-track {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  position: relative;
  gap: 0;
}

.tl-line {
  position: absolute;
  top: 22px;
  left: calc(16.67% + 20px);
  right: calc(16.67% + 20px);
  height: 2px;
  background: linear-gradient(90deg, rgba(197,243,117,0.5), rgba(197,243,117,0.2));
  z-index: 0;
}

@media (max-width: 768px) {
  .tl-track { grid-template-columns: 1fr; gap: 16px; }
  .tl-line { display: none; }
}

.tl-phase {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  position: relative;
  z-index: 1;
}

.tl-dot {
  width: 44px; height: 44px;
  border-radius: 50%;
  background: rgba(255,255,255,0.06);
  border: 2px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: 800;
  color: rgba(255,255,255,0.3);
  margin-bottom: 16px;
  transition: all 0.3s ease;
  flex-shrink: 0;
}
.tl-dot.active {
  background: rgba(197,243,117,0.15);
  border-color: #c5f375;
  color: #c5f375;
  box-shadow: 0 0 20px rgba(197,243,117,0.2);
}

.tl-phase-card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 18px;
  padding: 22px 20px;
  width: 100%;
  transition: all 0.25s ease;
}

.tl-phase--active .tl-phase-card {
  background: rgba(197,243,117,0.07);
  border-color: rgba(197,243,117,0.25);
}

.tl-pill {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  color: #c5f375;
  background: rgba(197,243,117,0.1);
  padding: 3px 10px;
  border-radius: 20px;
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.tl-phase-title {
  font-size: 17px;
  font-weight: 800;
  color: #f5f9f0;
  margin: 0 0 12px;
  line-height: 1.2;
}

.tl-phase-list {
  margin: 0;
  padding-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.tl-phase-list li {
  font-size: 13px;
  color: rgba(245,249,240,0.6);
  line-height: 1.45;
}

/* How to Use panel */
.tl-htu {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 40px;
  align-items: center;
  background: rgba(255,255,255,0.025);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 24px;
  padding: 40px 48px;
}

@media (max-width: 768px) {
  .tl-htu { grid-template-columns: 1fr; padding: 28px 24px; gap: 24px; }
}

.tl-htu-overline {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #c5f375;
  margin-bottom: 6px;
}

.tl-htu-title {
  font-size: 24px;
  font-weight: 800;
  color: #f5f9f0;
  margin: 0 0 24px;
}

.tl-htu-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.tl-htu-steps li {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  font-size: 14px;
  color: rgba(245,249,240,0.75);
  line-height: 1.5;
}

.tl-step-num {
  width: 26px; height: 26px;
  border-radius: 50%;
  background: rgba(197,243,117,0.15);
  border: 1.5px solid rgba(197,243,117,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 800;
  color: #c5f375;
  flex-shrink: 0;
  margin-top: 1px;
}

.tl-htu-note {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  font-size: 12.5px;
  color: rgba(245,249,240,0.45);
  line-height: 1.5;
}
.tl-htu-note svg { flex-shrink: 0; color: rgba(197,243,117,0.6); }

.tl-htu-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.tl-htu-img {
  width: 180px;
  height: 220px;
  object-fit: contain;
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.4));
}

.tl-htu-cert {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(197,243,117,0.08);
  border: 1px solid rgba(197,243,117,0.2);
  border-radius: 12px;
  padding: 10px 14px;
  font-size: 12px;
  font-weight: 700;
  color: #c5f375;
  text-align: left;
  line-height: 1.3;
}
</style>

<template>
  <ClientOnly>
    <section class="health-section-bg">
      <div class="container px-0">
        <div class="health-section" style="position: relative; min-height: 600px; overflow: hidden; border-radius: 32px;">
          <img v-if="supportBgImage" :src="supportBgImage"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0;" />
          <div class="health-content-wrapper" style="position: relative; z-index: 1;">
            <!-- Desktop Version -->
            <div class="health-desktop-version px-4 px-lg-5 pt-5">
              <div class="px-2">
                <h4>{{ supportMainTitle || 'Your body needs natural Ayurvedic support to fight diabetes.' }}</h4>
                <h1 class="mb-5"
                  v-html="supportTitle || 'DBT Care Plus is the herbal juice <br />to fuel your body and control blood sugar.'">
                </h1>
              </div>
              <div class="px-2">
                <div class="feature-top">
                  <div class="feature-bg">
                    <div class="row g-4">
                      <!-- Dynamic Features from API -->
                      <div v-for="(point, index) in supportKeyPoints" :key="index" class="col-lg-4 col-md-6">
                        <div class="feature-card">
                          <div class="icon-wrapper">
                            <img :src="point.icon || `/img/icons/icon-${index + 1}.png`" :alt="point.title" />
                          </div>
                          <h3 class="feature-title">{{ point.title }}</h3>
                          <p class="feature-description">{{ point.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Mobile Version: Horizontal Glassmorphic Slider -->
            <div class="health-mobile-version mobile-health-layout">
              <div class="text-start px-3">
                <h4 class="mobile-subtitle">{{ supportMainTitle || 'Your body needs natural Ayurvedic support to fight diabetes.' }}</h4>
                <h1 class="mobile-title" v-html="supportTitle || 'DBT Care Plus is the herbal juice <br />to fuel your body and control blood sugar.'"></h1>
              </div>
              
              <div class="mobile-scroll-container">
                <div class="features-scroll-wrapper">
                  <div v-for="(point, index) in supportKeyPoints" :key="index" class="feature-card-mobile">
                    <div class="mobile-icon-wrapper">
                      <img :src="point.icon || `/img/icons/icon-${index + 1}.png`" :alt="point.title" class="mobile-icon" />
                    </div>
                    <h3 class="mobile-feature-title">{{ point.title }}</h3>
                    <p class="mobile-feature-description">{{ point.description }}</p>
                  </div>
                </div>
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

// Find CMS section by possible keys
const healthSection = computed(() => 
  cmsStore.getSectionByKey('health') || 
  cmsStore.getSectionByKey('health-section') || 
  cmsStore.getSectionByKey('support')
)

const supportBgImage = computed(() => {
  if (healthSection.value?.image) {
    return getCmsImageUrl(healthSection.value.image)
  }
  const image = productStore.selectedProductPage?.supportBackgroundImage
  console.log('HealthSection background image:', image)
  return image
})

const supportMainTitle = computed(() => {
  return healthSection.value?.title || productStore.selectedProductPage?.supportMainTitle
})

const supportTitle = computed(() => {
  return healthSection.value?.description || productStore.selectedProductPage?.supportTitle
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
  
  // Fallback defaults
  return [
    {
      title: 'Blood Sugar Control',
      description: 'Karela, Gurmar & Neem actively reduce high blood glucose levels and improve insulin sensitivity from Day 1.*',
      icon: '/img/icons/icon-1.png'
    },
    {
      title: 'Detox & Blood Purification',
      description: 'Vijayasar & Punarnava remove toxins from the body, purify the blood and support liver and kidney health.*',
      icon: '/img/icons/icon-2.png'
    },
    {
      title: 'Diabetic Symptom Relief',
      description: 'Giloy & Jamun relieve excessive thirst, frequent urination, tiredness and weak eyesight caused by diabetes.*',
      icon: '/img/icons/icon-4.png'
    }
  ]
})
</script>

<style scoped>
.health-desktop-version {
  display: none !important;
}
.health-mobile-version {
  display: block !important;
}

@media (min-width: 772px) {
  .health-desktop-version {
    display: block !important;
  }
  .health-mobile-version {
    display: none !important;
  }
}

.health-section-bg{
  padding-top: 60px;
}
.mobile-health-layout {
  position: relative;
  z-index: 2;
  padding: 60px 10px 40px 10px;
  color: #ffffff !important;
}

.mobile-subtitle {
  font-size: 12px !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  color: rgba(255, 255, 255, 0.75) !important;
  margin-bottom: 10px !important;
  font-weight: 600 !important;
  text-align: left !important;
}

.mobile-title {
  font-size: 26px !important;
  font-weight: 700 !important;
  line-height: 1.3 !important;
  color: #ffffff !important;
  margin-bottom: 30px !important;
  text-align: left !important;
}

.mobile-scroll-container {
  overflow: hidden;
  margin: 0 5px; /* Allow cards to slide edge-to-edge */
}

.features-scroll-wrapper {
  display: flex !important;
  overflow-x: auto !important;
  scroll-snap-type: x mandatory !important;
  scroll-behavior: smooth !important;
  -webkit-overflow-scrolling: touch !important;
  gap: 16px !important;
  padding: 10px 15px 30px 15px !important;
  scrollbar-width: none !important; /* Firefox */
  -ms-overflow-style: none !important;  /* IE and Edge */
}

.features-scroll-wrapper::-webkit-scrollbar {
  display: none !important; /* Chrome, Safari and Opera */
}

.feature-card-mobile {
  flex: 0 0 82% !important; /* Allow the next card to peek */
  scroll-snap-align: start !important;
  background: rgba(255, 255, 255, 0.08) !important;
  backdrop-filter: blur(25px) !important;
  -webkit-backdrop-filter: blur(25px) !important;
  border: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 24px !important;
  padding: 28px 24px !important;
  color: #ffffff !important;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15) !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
}

.mobile-icon-wrapper {
  width: 50px !important;
  height: 50px !important;
  background: rgba(255, 255, 255, 0.1) !important;
  border-radius: 50% !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  margin-bottom: 20px !important;
}

.mobile-icon {
  width: 26px !important;
  height: 26px !important;
  object-fit: contain !important;
  filter: brightness(0) invert(1) !important; /* Turn the icon white to match image.png */
}

.mobile-feature-title {
  font-size: 18px !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  margin-bottom: 8px !important;
}

.mobile-feature-description {
  font-size: 13px !important;
  line-height: 1.45 !important;
  color: rgba(255, 255, 255, 0.85) !important;
  margin: 0 !important;
}
@media (max-width: 676px) {
  *:not(.features-scroll-wrapper) {
    scrollbar-color: auto;
    scrollbar-width: auto;
  }
}
@media (max-width: 991px){
  .health-section-bg{
    padding-top: 24px;
    padding-right: 24px !important;
    padding-left: 24px !important;
  }
}

@media (max-width: 771px) {
  .health-section {
    min-height: 600px !important;
  }
  .health-content-wrapper {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    width: 100% !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
  }
  .mobile-health-layout {
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
    flex-grow: 1 !important;
    height: 100% !important;
    padding-top: 40px !important;
    padding-bottom: 20px !important;
  }
  .features-scroll-wrapper {
    padding-bottom: 15px !important;
  }
}
</style>
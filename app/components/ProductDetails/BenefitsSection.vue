<template>
  <ClientOnly>
    <div class="container-fluid py-5 health-section-bg ">
      <div class="container">
        <!-- Section Header -->
        <div class="text-center mb-4">
          <h1 class="section-title-timeline">{{ journeyTitle || '11 Herbs. One Journey. Complete Diabetic Wellness.' }}
          </h1>
          <p class="section-subtitle">{{ journeySubTitle || 'Designed for daily use, DBT Care Plus replenishes your body with 11 powerful Ayurvedic herbs to build complete diabetic wellness over time.*' }}</p>
        </div>

        <div class="row g-4">
          <!-- Left Column: Timeline -->
          <div class="col-lg-5">
            <div class="timeline">
              <!-- Dynamic Timeline Items from API -->
              <div v-for="(point, index) in journeyKeyPoints" :key="index" class="timeline-item">
                <span class="timeline-header">{{ point.timeLabel }}</span>
                <span class="timeline-title">{{ point.title }}</span>
                <div class="timeline-body">
                  <ul class="list-unstyled">
                    <li v-for="(item, i) in point.points" :key="i">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- How to Use -->
            <div class="how-to-use-card">
              <div class="capsule-icon">
                <img src="/img/productsdetails/capsule (1).png" alt="" />
              </div>
              <div>
                <h6 class="how-to-use-title">How to Use:</h6>
                <ul class="mb-0">
                  <li v-for="(step, i) in journeyHowToUse" :key="i">{{ step }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Right Column: Images -->
          <div class="col-lg-7 benefits-images-column">
            <div class="image-grid">
              <!-- Large Image -->
              <div class="image-large">
                <img :src="journeyMainImage || '/img/dbt/1.png'" alt="Person drinking water" class="img-fluid" />
              </div>

              <!-- Small Images Container -->
              <div class="image-small-container">
                <!-- Dynamic Side Images from API -->
                <div v-for="(img, index) in journeySideImages.slice(0, 2)" :key="index"
                  :class="index === 0 ? 'image-circle' : 'image-small'">
                  <img :src="img" :alt="'Product image ' + (index + 1)" class="img-fluid"
                    :class="{ 'center-img': index === 0 }" />
                </div>
                <!-- Fallback if no API images -->
                <template v-if="!journeySideImages || journeySideImages.length === 0">
                  <div class="image-circle">
                    <img src="/img/dbt/2.png" alt="Capsules in bottle" class="img-fluid center-img" />
                  </div>
                  <div class="image-small">
                    <img src="/img/dbt/3.png" alt="Man holding product" class="img-fluid" />
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup>
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const productStore = useProductStore()
const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

// Find CMS section by possible keys
const journeySection = computed(() => 
  cmsStore.getSectionByKey('benefits') || 
  cmsStore.getSectionByKey('benefits-section') || 
  cmsStore.getSectionByKey('journey')
)

const journeyTitle = computed(() => {
  return journeySection.value?.title || productStore.selectedProductPage?.journeyTitle
})

const journeySubTitle = computed(() => {
  return journeySection.value?.description || productStore.selectedProductPage?.journeySubTitle
})

const journeyMainImage = computed(() => {
  if (journeySection.value?.image) {
    return getCmsImageUrl(journeySection.value.image)
  }
  return productStore.selectedProductPage?.journeyMainImage
})

const journeySideImages = computed(() => {
  if (journeySection.value?.extraData?.journeySideImages) {
    return journeySection.value.extraData.journeySideImages.map(img => getCmsImageUrl(img))
  }
  return productStore.selectedProductPage?.journeySideImages || []
})

const journeyKeyPoints = computed(() => {
  if (journeySection.value?.items && journeySection.value.items.length > 0) {
    return journeySection.value.items.map(item => ({
      timeLabel: item.subtitle || item.timeLabel || '',
      title: item.title || '',
      points: Array.isArray(item.points) 
        ? item.points 
        : (item.description ? item.description.split('\n') : [])
    }))
  }

  const apiPoints = productStore.selectedProductPage?.journeyKeyPoints || []
  if (apiPoints.length > 0) return apiPoints
  // Fallback defaults
  return [
    {
      timeLabel: 'Day 1',
      title: 'Begins Blood Sugar Regulation*',
      points: [
        'Karela & Neem start reducing high blood glucose levels',
        'Helps improve insulin sensitivity from day one',
        'Supports glucose metabolism throughout the body'
      ]
    },
    {
      timeLabel: 'Week 2',
      title: 'Reduces Diabetic Symptoms*',
      points: [
        'Reduces excessive thirst and frequent urination',
        'Giloy & Jamun help improve body strength and energy',
        'Begins relieving tiredness and fatigue'
      ]
    },
    {
      timeLabel: 'Week 4',
      title: 'Detox & Blood Purification*',
      points: [
        'Vijayasar & Punarnava remove toxins from the body',
        'Kidney and liver function visibly improves',
        'Blood purification supports overall diabetic health'
      ]
    }
  ]
})

const journeyHowToUse = computed(() => {
  if (journeySection.value?.extraData?.journeyHowToUse) {
    return journeySection.value.extraData.journeyHowToUse
  }

  const apiSteps = productStore.selectedProductPage?.journeyHowToUse || []
  if (apiSteps.length > 0) return apiSteps
  // Fallback defaults
  return [
    '1. Take 20ml to 30ml diluted in a glass of lukewarm water.',
    '2. Consume in the morning and evening, 30 minutes before meals.',
    '3. Or as directed by your Physician.'
  ]
})
</script>
<style scoped>

.health-section-bg {
 
  padding-top: 20px !important;
  padding-bottom: 20px !important;
}
/* Image Large styling */
.image-large {
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  height: 340px;
}

.image-large img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* Image Small & Circle styling */
.image-small-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;
  margin-top: 1.5rem;
}

.image-small {
  width: 100%;
  height: 220px;
  border-radius: 24px;
  overflow: hidden;
}

.image-small img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  padding-left: 20px;
}

.image-circle {
  width: 220px;
  height: 220px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-circle img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.center-img {
  border-radius: 50%;
}

.image-small-container {
  padding-right: 0 !important;
  display: flex;
  flex-direction: row;
  /* or column */
  justify-content: center;
  /* Center horizontally */
  align-items: center;
  /* Center vertically */
  width: 100%;
}

@media (max-width: 956px) {

  /* 1. Remove extra space between images */
  .image-grid {
    gap: 12px !important;
  }

  .image-small-container {
    display: flex !important;
    width: 100% !important;
    gap: 12px !important;
    justify-content: flex-start !important;
    padding-right: 70px;
  }

  /* 2. Use space efficiently (Right side space removal) */
  .image-small {
    flex: 1 1 0% !important;
    width: auto !important;
  }

  .image-small img {
    width: 100% !important;
    height: 290px !important;
    /* Matches the circle's height */
    object-fit: contain !important;
    border-radius: 8px;
    /* Optional: adds a slight curve to match your UI */
  }

  /* 3. Perfect Circle Fix (190px size) */
  .image-circle {
    flex: 0 0 auto !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
    width: auto !important;
  }

  img.center-img {
    width: 190px !important;
    height: 190px !important;
    border-radius: 50% !important;
    object-fit: cover !important;
    flex: none !important;
  }
}

/* Desktop layout overrides matching the mockup image.png */
@media (min-width: 768px) {
  .image-grid {
    display: flex;
    flex-direction: column !important;
    /* Stack top and bottom vertically */
    gap: 1.5rem;
    width: 100%;
  }

  .image-large {
    flex: none !important;
    width: 100% !important;
    height: 360px;
    /* Perfect height for the top visual card */
  }

  .image-small-container {
    flex-direction: row-reverse !important;
    /* Row layout: Circle on right, Rectangle on left */
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
    width: 100%;
    margin-top: 0;
  }

  .image-small {
    flex: 1 !important;
    height: 240px;
    /* Equal height with circle container */
  }

  .image-circle {
    flex: 0 0 240px !important;
    /* Keep circle perfectly round */
    height: 240px;
    margin: 0 !important;
  }
}

/* Laptop/desktop image composition: large image left, two images stacked right. */
@media (min-width: 992px) {
  .benefits-images-column {
    min-width: 0;
    overflow: hidden;
    padding-right: 0 !important;
  }

  .image-grid {
    display: grid !important;
    grid-template-columns: minmax(0, 1.75fr) minmax(180px, 0.95fr);
    align-items: stretch;
    gap: 20px !important;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
  }

  .image-large {
    width: 100% !important;
    height: 550px !important;
    min-width: 0;
  }

  .image-large img.img-fluid {
    width: 100% !important;
    height: 100% !important;
    max-width: 100% !important;
    object-fit: cover !important;
    object-position: center !important;
  }

  .image-small-container {
    display: flex !important;
    width: 100% !important;
    height: 550px;
    min-width: 0;
    margin-top: 0 !important;
    padding: 0 !important;
    flex-direction: column !important;
    align-items: center !important;
    justify-content: space-between !important;
    gap: 20px !important;
  }

  .image-circle {
    width: min(100%, 250px) !important;
    height: auto !important;
    aspect-ratio: 1 / 1;
    flex: 0 0 auto !important;
    margin: 0 auto !important;
  }

  .image-small {
    width: 100% !important;
    height: auto !important;
    min-height: 0;
    flex: 1 1 auto !important;
  }

  .image-small img {
    width: 100% !important;
    height: 100% !important;
    padding-left: 0 !important;
    object-fit: cover !important;
    object-position: center !important;
  }

  .how-to-use-card {
    position: relative;
    z-index: 1;
  }
}

/* Responsive How to Use Card to prevent overflowing screen */
.how-to-use-card {
  width: 100% !important;
  max-width: 470px !important;
}

@media (max-width: 480px) {
  .how-to-use-card {
    padding: 1rem !important;
    gap: 0.75rem !important;
  }

  .capsule-icon img {
    width: 60px !important;
    height: auto !important;
  }
}

@media (max-width: 576px) {
  .image-large {
    height: 200px !important;
  }

  .image-small-container {
    gap: 0.75rem !important;
    margin-top: 0.75rem !important;
  }

  .image-small {
    height: 250px !important;
  }

  .image-circle {
    width: 150px !important;
    height: 150px !important;
  }
}
</style>

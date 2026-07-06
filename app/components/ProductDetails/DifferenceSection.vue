<template>
  <ClientOnly>
    <section class="py-5 px-3 px-md-5 health-section-bg difference-section">
      <div class="container">
        <div class="row mb-4 mb-md-5">
          <div class="col-12">
            <h1 class="vcn-section-title">{{ featureHeading || 'DBT Care Plus — Natural Solution for Blood Sugar' }}
            </h1>
            <p class="vcn-section-subtitle"
               v-html="featureSubHeading || 'Our Ayurvedic formulation combines 11 powerful herbs, clinically trusted to manage blood sugar.'">
            </p>
          </div>
        </div>

        <div class="row difference-content-row">
          <div class="col-lg-6 mb-4 pe-0 difference-media-column">
            <!-- Video wrapper (only for video + optional overlays/controls) -->
            <div class="vcn-video-wrapper">
              <img :src="featureImage || cleanUrl('/img/dbt/389size.png')" alt="Doctor" class="vcn-showcase-img" />
            </div>
            <!-- <div class="vcn-video-wrapper">
            <div class="vcn-video-controls">
              <button class="vcn-control-btn">
                <i class="bi bi-pause-fill"></i>
              </button>
              <button class="vcn-control-btn">
                <i class="bi bi-volume-up-fill"></i>
              </button>
            </div>

            <video style="
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius: 20px;
              " muted autoplay playsinline>
              <source src="https://assets.embeddables.com/ZAIN_4Ds_06_0617_6754959037559694.mp4" type="video/mp4" />
            </video>
          </div> -->

            <!-- 👇 Doctor info now OUTSIDE the video container -->
            <!-- <div class="vcn-doctor-info">
            <div class="vcn-doctor-name">Dr. Zain Kassam, MD, MPH</div>
            <div class="vcn-doctor-title">
              Chief Ayurvedic Consultant, VCN Health
            </div>

          </div> -->
          </div>

          <div class="col-lg-6 difference-features-column">
            <div class="row difference-cards-row">
              <!-- Dynamic Feature Cards from API -->
              <div v-for="(point, index) in featureKeyPoints" :key="index" class="col-md-6 pe-0">
                <div class="vcn-feature-card">
                  <img :src="point.icon || fallbackIcons[index]" :alt="point.title" />
                  <div class="vcn-feature-divider"></div>
                  <h3 class="vcn-feature-title">{{ point.title }}</h3>
                  <p class="vcn-feature-description">{{ point.description }}</p>
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
const differenceSection = computed(() => 
  cmsStore.getSectionByKey('difference') || 
  cmsStore.getSectionByKey('difference-section') || 
  cmsStore.getSectionByKey('feature')
)

const featureHeading = computed(() => {
  return differenceSection.value?.title || productStore.selectedProductPage?.featureHeading
})

const featureSubHeading = computed(() => {
  return differenceSection.value?.description || productStore.selectedProductPage?.featureSubHeading
})

const featureImage = computed(() => {
  if (differenceSection.value?.image) {
    return getCmsImageUrl(differenceSection.value.image)
  }
  return productStore.selectedProductPage?.featureImage
})

const featureKeyPoints = computed(() => {
  if (differenceSection.value?.items && differenceSection.value.items.length > 0) {
    return differenceSection.value.items.map(item => ({
      icon: getCmsImageUrl(item.image) || item.icon,
      title: item.title,
      description: item.description
    }))
  }

  const apiPoints = productStore.selectedProductPage?.featureKeyPoints || []
  if (apiPoints.length > 0) return apiPoints
  // Fallback defaults
  return [
    {
      icon: '/img/productsdetails/Type1&Type2Diabetes.png',
      title: 'Type 1 & Type 2 Diabetes',
      description: 'Herbs like Gurmar and Methi are highly effective in managing both Type 1 and Type 2 Diabetes by enhancing insulin levels and improving glucose tolerance.*'
    },
    {
      icon: '/img/productsdetails/High Blood Sugar.png',
      title: 'High Blood Sugar',
      description: 'Karela, Neem and Vijayasar actively reduce high blood glucose levels, stimulate insulin production and purify the blood naturally.*'
    },
    {
      icon: '/img/productsdetails/Liver&KidneyDisorders.png',
      title: 'Liver & Kidney Disorders',
      description: 'Punarnava and Aloe Vera support liver and kidney health, reduce toxins, and help manage jaundice and kidney-related diseases.*'
    },
    {
      icon: '/img/productsdetails/Diabetic Symptoms Relief.png',
      title: 'Diabetic Symptoms Relief',
      description: 'Effectively relieves symptoms like excessive thirst, frequent urination, fatigue, weak eyesight, and slow wound healing.*'
    }
  ]
})

const fallbackIcons = [
  '/img/productsdetails/Type1&Type2Diabetes.png',
  '/img/productsdetails/High Blood Sugar.png',
  '/img/productsdetails/Liver&KidneyDisorders.png',
  '/img/productsdetails/Diabetic Symptoms Relief.png'
]

const cleanUrl = (url) => {
  return url.replace(/^&/, '')
}
</script>

<style scoped>

.row {
  margin-right: 10px;
  margin-left: 0;
}

.difference-content-row,
.difference-cards-row {
  justify-content: center;
  /* margin-left: auto;
  margin-right: auto; */
}

.difference-content-row {
  align-items: center;
}

.difference-media-column,
.difference-features-column,
.difference-cards-row > [class*="col-"] {
  display: flex;
  justify-content: center;
}

.difference-features-column {
  flex-direction: column;
}

.difference-cards-row {
  width: 100%;
}

.difference-section {
  text-align: center;
}

.difference-section .vcn-video-wrapper,
.difference-section .vcn-showcase-img {
  margin-left: 0;
  margin-right: auto;
}

.difference-section .vcn-feature-card {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}

.difference-section .vcn-feature-card img {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.difference-section .vcn-feature-divider {
  margin-left: auto;
  margin-right: auto;
}
/* Add any additional styles here if needed */
.vcn-feature-card img {
  width: 60px;
  height: 60px;
}

.vcn-video-wrapper {
  aspect-ratio: auto !important;
  height: auto !important;
  background: transparent !important;
  overflow: visible !important;
}

.vcn-showcase-img {
  height: 550px !important;
  width: auto !important;
  max-width: 100% !important;
  object-fit: contain !important;
  display: block;
  margin: 0 auto;
  border-radius: 30px;
}

@media (max-width: 991px) {
  .vcn-showcase-img {
    height: auto !important;
    max-height: 380px !important;
    width: 100% !important;
  }

  .vcn-section-title {
    font-size: 1.85rem !important;
    text-align: center !important;
    margin-bottom: 0.75rem !important;
  }

  .vcn-section-subtitle {
    font-size: 0.95rem !important;
    text-align: center !important;
    margin-bottom: 2rem !important;
  }

  .vcn-feature-card {
    text-align: center !important;
    margin-bottom: 1.5rem !important;
    padding-left:  10px;
  }

  .vcn-feature-card img {
    margin: 0 auto 0.75rem auto !important;
    display: block !important;
  }

  .vcn-feature-divider {
    margin: 0.75rem auto !important;
    max-width: 120px !important;
  }

  .vcn-feature-description {
    font-size: 0.88rem !important;
  }
}
</style>

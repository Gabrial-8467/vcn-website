<template>
  <section class="product-detail-section  mt-3">
    <div class="container-fluid">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-md-3 col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>
        <div class="col-md-9 col-lg-9">
          <div class="news-content">
            <!-- HERO -->
            <section class="news-hero">
              <img :src="newsData.hero.image" :alt="newsData.hero.title" class="news-banner" />

              <div class="hero-title">
                <h1>{{ newsData.hero.title }}</h1>
              </div>
            </section>

            <!-- MEDIA TITLE -->

            <div class="media-heading">
              <h2>{{ newsData.mediaCoverage.title }}</h2>
            </div>

            <!-- YEAR FILTER -->

            <div class="year-tabs">
              <button v-for="year in newsData.years" :key="year" @click="activeYear = year"
                :class="{ active: activeYear === year }">
                {{ year }}
              </button>
            </div>

            <!-- NEWS GRID -->

            <div class="news-grid">
              <div v-for="item in filteredNews" :key="item.title" class="news-card">
                <div class="news-logo">
                  {{ item.logo }}
                </div>

                <div class="news-info">
                  <span class="news-date">
                    {{ item.date }}
                  </span>

                  <h3 class="news-title">
                    {{ item.title }}
                  </h3>

                  <p class="news-source">
                    {{ item.source }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

// Fetch page sections from API during SSR/routing
await useAsyncData('news-cms', () => cmsStore.fetchSectionsBySlug('news'))

const newsData = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find sections
  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'news-hero')
  const mediaSec = sections.find(s => s.name === 'mediaCoverage' || s.sectionKey === 'news-media-coverage')
  
  // Fallbacks
  const fallback = cmsStore.getPageSection('about', 'news')
  
  // Resolve hero image
  const rawHeroImage = heroSec?.image || heroSec?.extraData?.image
  let heroImage = ''
  if (rawHeroImage) {
    if (typeof rawHeroImage === 'string') {
      heroImage = rawHeroImage
    } else {
      heroImage = getCmsImageUrl(rawHeroImage)
    }
  }

  // Parse years and articles
  const apiExtra = mediaSec?.extraData?._extraData || mediaSec?.extraData || {}
  const years = apiExtra.years || fallback?.years || [2026, 2025, 2024, 2023]
  const articles = apiExtra.articles || fallback?.articles || []

  return {
    hero: {
      title: heroSec?.title || fallback?.hero?.title || 'VCN In News',
      image: heroImage || fallback?.hero?.image || '/img/news/news.png'
    },
    mediaCoverage: {
      title: mediaSec?.title || fallback?.mediaCoverage?.title || 'Media Coverage'
    },
    years,
    articles
  }
})

const activeYear = ref(2026)

const yearsList = computed(() => newsData.value.years || [])

// Watch for years loading and select the first active year
watch(yearsList, (newYears) => {
  if (newYears.length > 0 && (!activeYear.value || !newYears.includes(activeYear.value))) {
    activeYear.value = newYears[0]
  }
}, { immediate: true })

const filteredNews = computed(() =>
  newsData.value.articles?.filter(
    item => Number(item.year) === Number(activeYear.value)
  ) 
)

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
})
</script>

<style scoped>
.news-content {
  padding: 30px;
  background: #f6f6f6;
}

/* HERO */

.news-hero {
  position: relative;
  margin-bottom: 30px;
}

.news-banner {
  width: 100%;
  border-radius: 10px;
}

.hero-title {
  position: absolute;
  bottom: 20px;
  left: 30px;
  background: #c9e1b4;
  padding: 10px 25px;
  border-radius: 6px;
}

.hero-title h1 {
  margin: 0;
  font-size: 28px;
}

/* HEADING */

.media-heading {
  text-align: center;
  margin-bottom: 20px;
}

.media-heading h2 {
  font-size: 32px;
  font-weight: 600;
}

/* YEAR TABS */

.year-tabs {
  display: flex;
  justify-content: center;
  gap: 30px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
}

.year-tabs button {
  background: none;
  border: none;
  padding-bottom: 8px;
  font-size: 16px;
  cursor: pointer;
}

.year-tabs .active {
  border-bottom: 3px solid #e30613;
  font-weight: 600;
}

/* NEWS GRID */

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

/* CARD */

.news-card {
  display: flex;
  gap: 15px;
  background: #fff;
  padding: 18px;
  border-radius: 8px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  align-items: center;
}

.news-logo {
  width: 60px;
  height: 60px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
}

.news-date {
  font-size: 13px;
  color: #777;
}

.news-title {
  font-size: 16px;
  margin: 6px 0;
}

.news-source {
  font-size: 14px;
  color: #666;
}

/* MOBILE */

@media (max-width: 768px) {
  .sidebar-section {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  
  .product-detail-section {
    margin-top: 0 !important;
  }
  
  .product-detail-section .container-fluid {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
  
  .product-detail-section .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
  
  .col-md-9 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .news-content {
    padding: 0;
    background: #fff;
  }

  .news-hero {
    margin-bottom: 0;
  }

  .news-banner {
    border-radius: 0;
    width: 100%;
    display: block;
  }

  .hero-title {
    position: relative;
    bottom: 0;
    left: 0;
    background: #e5f7d5; /* Light green background */
    padding: 15px 10px;
    border-radius: 0;
    text-align: center;
    width: 100%;
    margin-top: -1px;
  }

  .hero-title h1 {
    font-size: 24px;
    color: #1d593f; /* Dark green text */
    font-weight: 600;
    margin: 0;
  }

  .media-heading {
    margin: 25px 0 20px 0;
    text-align: center;
  }

  .media-heading h2 {
    font-size: 28px;
    font-weight: 600;
    color: #111;
  }

  .year-tabs {
    display: flex;
    justify-content: space-around;
    background: #f8f9fa;
    margin-bottom: 25px;
    border-bottom: 1px solid #dee2e6;
    padding: 0;
    gap: 0;
  }

  .year-tabs button {
    flex: 1;
    padding: 12px 0;
    font-size: 15px;
    color: #495057;
    border-bottom: 3px solid transparent;
    font-weight: normal;
    text-align: center;
  }

  .year-tabs .active {
    border-bottom: 3px solid #e30613;
    font-weight: 700;
    color: #212529;
  }

  .news-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    padding: 0 15px 30px 15px;
  }

  .news-card {
    display: flex;
    gap: 15px;
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    align-items: center;
    border: 1px solid #f1f5f9;
  }

  .news-logo {
    width: 90px;
    height: 90px;
    font-size: 40px;
    flex-shrink: 0;
    border-radius: 4px;
  }

  .news-info {
    flex-grow: 1;
    text-align: left;
  }

  .news-date {
    font-size: 12px;
    color: #888;
  }

  .news-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    color: #1a202c;
    margin: 4px 0 6px 0;
  }

  .news-source {
    font-size: 12px;
    color: #64748b;
    margin: 0;
  }
}
</style>

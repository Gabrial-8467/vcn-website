<template>
  <section class="product-detail-section mt-3">
    <div class="container">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <!-- Right Main News Content -->
        <div class="col-lg-9">
          <div class="news-content-wrapper">
            
            <!-- HERO BANNER -->
            <section class="news-hero" :style="{ backgroundImage: `url(${heroBgImage})` }">
              <div class="news-hero-overlay"></div>
              <div class="news-hero-content">
                <h1>{{ newsData.hero.title }}</h1>
              </div>
            </section>

            <!-- MEDIA TITLE & YEAR FILTER -->
            <div class="news-filter-bar">
              <div class="tabs-container">
                <div class="year-tabs-pills">
                  <button v-for="year in newsData.years" :key="year" @click="activeYear = year"
                    :class="['year-pill', { active: activeYear === year }]">
                    {{ year }}
                  </button>
                </div>
                <button class="all-publications-btn" aria-label="All Publications">
                  <i class="bi bi-sliders filter-icon"></i>
                  <span>ALL PUBLICATIONS</span>
                </button>
              </div>
            </div>

            <!-- NEWS LISTINGS -->
            <div class="news-listings">
              <!-- FEATURED ARTICLE (First article of the active year) -->
              <div v-if="featuredArticle" class="featured-news-card">
                <div class="featured-news-info">
                  <span class="featured-meta">
                    {{ featuredArticle.source }} &bull; {{ featuredArticle.date }}
                  </span>
                  <h3 class="featured-title">
                    {{ featuredArticle.title }}
                  </h3>
                  <p class="featured-excerpt">
                    {{ featuredArticle.excerpt || 'The brand\'s commitment to ethical sourcing and clinical transparency has set a new benchmark for the wellness industry, according to recent analysts.' }}
                  </p>
                </div>
                <div class="featured-news-media">
                  <img src="/img/news/featured-leaves.jpg" alt="Featured Article Image" class="featured-image" />
                </div>
              </div>

              <!-- SUBSEQUENT ARTICLES (Remaining articles of the active year) -->
              <div class="remaining-news-list" v-if="remainingArticles.length > 0">
                <div v-for="item in remainingArticles" :key="item.title" class="news-row-card">
                  <div class="news-row-info">
                    <span class="news-row-meta">
                      {{ item.source }} &bull; {{ item.date }}
                    </span>
                    <h4 class="news-row-title">
                      {{ item.title }}
                    </h4>
                  </div>
                </div>
              </div>

              <!-- NO ARTICLES FOUND -->
              <div v-if="!featuredArticle" class="no-news-placeholder">
                <i class="bi bi-newspaper placeholder-icon"></i>
                <p>No press coverage found for the year {{ activeYear }}.</p>
              </div>
            </div>

            <!-- WIDGETS SECTION (Quote & Media Inquiries) -->
            <div class="news-widgets-grid">
              <!-- Quote Widget -->
              <div class="widget-quote-card">
                <div class="quote-symbol">”</div>
                <blockquote class="quote-text">
                  "VCN Lifestyle isn't just selling products; they are curating a movement of conscious vitality that is long overdue."
                </blockquote>
                <div class="quote-author">
                  <div class="author-avatar">
                    <span class="avatar-fallback">AS</span>
                  </div>
                  <div class="author-meta">
                    <cite class="author-name">Aravind Sharma</cite>
                    <span class="author-title">Editor, Global Health Review</span>
                  </div>
                </div>
              </div>

              <!-- Media Inquiries Widget -->
              <div class="widget-inquiry-card">
                <h3>Media Inquiries</h3>
                <p>
                  For press kits, interviews, and brand assets, please contact our global communications team.
                </p>
                <NuxtLink to="/contact-us" class="press-office-btn">
                  Contact Press Office
                </NuxtLink>
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
      image: heroImage || fallback?.hero?.image || '/img/news/news-redesign.jpg'
    },
    mediaCoverage: {
      title: mediaSec?.title || fallback?.mediaCoverage?.title || 'Media Coverage'
    },
    years,
    articles
  }
})

// Dynamically use the high-quality redesign image if default points to the old design
const heroBgImage = computed(() => {
  const img = newsData.value.hero.image
  if (!img || img === '/img/news/news.png') {
    return '/img/news/news.png'
  }
  return img
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

const featuredArticle = computed(() => {
  const articles = filteredNews.value || []
  return articles.length > 0 ? articles[0] : null
})

const remainingArticles = computed(() => {
  const articles = filteredNews.value || []
  return articles.length > 1 ? articles.slice(1) : []
})

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@100..900&display=swap'
    }
  ]
})
</script>

<style scoped>
.product-detail-section {
  background: var(--vcn-white, #fff);
}

.news-content-wrapper {
  padding: 40px;
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.08);
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.04);
  border-radius: 24px;
  min-height: 100vh;
}

/* HERO BANNER */
.news-hero {
  position: relative;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 40px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.03);
}

.news-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(29, 69, 3, 0.72) 0%,
    rgba(29, 69, 3, 0.30) 60%,
    transparent 100%
  );
  z-index: 1;
}

.news-hero-content {
  position: relative;
  padding: 45px;
  z-index: 2;
  max-width: 650px;
  text-align: left;
}

.press-media-tag {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--vcn-badge, #d3fa99);
  margin-bottom: 12px;
  display: block;
}

.news-hero h1 {
  font-size: 48px;
  font-weight: 700;
  color: var(--vcn-white, #fff);
  margin: 0 0 16px 0;
  font-family: 'Outfit', sans-serif;
  line-height: 1.1;
}

.news-hero-desc {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  font-weight: 500;
  font-family: 'Outfit', sans-serif;
}

/* FILTER BAR */
.news-filter-bar {
  margin-bottom: 35px;
}

.tabs-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(29, 69, 3, 0.08);
}

.year-tabs-pills {
  display: flex;
  gap: 12px;
}

.year-pill {
  background: transparent;
  border: 1px solid rgba(29, 69, 3, 0.15);
  padding: 8px 24px;
  font-size: 14px;
  font-weight: 600;
  border-radius: 24px;
  cursor: pointer;
  color: var(--vcn-darker, #1C3A13);
  font-family: 'Outfit', sans-serif;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  flex-shrink: 0;
}

.year-pill:hover {
  background-color: rgba(29, 69, 3, 0.05);
  color: var(--vcn-dark, #1D4503);
  border-color: rgba(29, 69, 3, 0.3);
}

.year-pill.active {
  background-color: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff);
  border-color: var(--vcn-dark, #1D4503);
  font-size: 16px !important;
  font-weight: 400 !important;
}

.all-publications-btn {
  background: transparent;
  border: none;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 1.5px;
  color: var(--vcn-darker, #1C3A13);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: color 0.2s ease;
  padding: 8px 12px;
  font-family: 'Outfit', sans-serif;
}

.all-publications-btn:hover {
  color: var(--vcn-dark, #1D4503);
}

.filter-icon {
  font-size: 14px;
}

/* LISTINGS */
.news-listings {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 50px;
}

/* FEATURED CARD */
.featured-news-card {
  display: flex;
  background: var(--vcn-white, #fff);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(29, 69, 3, 0.03);
  border: 1px solid rgba(29, 69, 3, 0.08);
  align-items: stretch;
}

.featured-news-info {
  flex: 1.3;
  padding: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
}

.featured-meta {
  font-size: 12px;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #6b7280;
  margin-bottom: 12px;
  font-family: 'Outfit', sans-serif;
}

.featured-title {
  font-size: 32px;
  font-weight: 400;
  color: var(--vcn-darker, #1C3A13);
  line-height: 1.35;
  margin: 0 0 16px 0;
  font-family: 'Outfit', sans-serif;
}

.featured-excerpt {
  font-size: 16px !important;
  color: rgba(28, 58, 19, 0.8);
  line-height: 1.65;
  margin: 0 0 28px 0;
  font-family: 'Outfit', sans-serif;
}

.read-article-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--vcn-dark, #1D4503);
  text-decoration: none;
  width: fit-content;
  font-family: 'Outfit', sans-serif;
  transition: all 0.2s ease;
}

.read-article-link i {
  transition: transform 0.25s ease;
}

.read-article-link:hover i {
  transform: translateX(5px);
}

.read-article-link:hover {
  color: var(--vcn-darker, #1C3A13);
}

.featured-news-media {
  flex: 1;
  min-height: 280px;
  position: relative;
}

.featured-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* LIST CARDS */
.remaining-news-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.news-row-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--vcn-base-bg, #F6F7EE);
  padding: 22px 30px;
  border-radius: 12px;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(29, 69, 3, 0.05);
}

.news-row-card:hover {
  background: var(--vcn-white, #fff);
  transform: translateY(-2px);
  border-color: rgba(29, 69, 3, 0.12);
  box-shadow: 0 4px 16px rgba(29, 69, 3, 0.06);
}

.news-row-info {
  text-align: left;
}

.news-row-meta {
  font-size: 12px !important;
  font-weight: 400 !important;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #9ca3af;
  display: block;
  margin-bottom: 6px;
  font-family: 'Outfit', sans-serif;
}

.news-row-title {
  font-size: 16px !important;
  font-weight: 400 !important;
  color: var(--vcn-darker, #1C3A13);
  margin: 0;
  line-height: 1.45;
  font-family: 'Outfit', sans-serif;
}

.external-link-btn {
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.12);
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vcn-dark, #1D4503);
  text-decoration: none;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(29, 69, 3, 0.02);
}

.external-link-btn:hover {
  background: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff);
  border-color: var(--vcn-dark, #1D4503);
}

/* PLACEHOLDER */
.no-news-placeholder {
  text-align: center;
  padding: 60px 20px;
  background: var(--vcn-base-bg, #F6F7EE);
  border-radius: 12px;
  color: #6b7280;
}

.placeholder-icon {
  font-size: 44px;
  color: #d1d5db;
  margin-bottom: 12px;
  display: block;
}

/* WIDGETS */
.news-widgets-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
  margin-top: 50px;
  margin-bottom: 40px;
}

.widget-quote-card {
  background: var(--vcn-gradient, linear-gradient(135deg, #1D4503 0%, #1C3A13 100%)) !important;
  color: var(--vcn-white, #fff);
  padding: 50px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  position: relative;
  box-shadow: 0 10px 25px rgba(29, 69, 3, 0.08);
}

.quote-symbol {
  font-size: 90px;
  line-height: 0.1;
  font-family: 'Outfit', sans-serif;
  color: rgba(255, 255, 255, 0.12);
  position: absolute;
  top: 45px;
  left: 30px;
}

.quote-text {
  font-size: 16px;
  font-style: italic;
  font-family: 'Outfit', sans-serif;
  line-height: 1.7;
  margin: 30px 0 40px 0;
  position: relative;
  z-index: 2;
}

.quote-author {
  display: flex;
  align-items: center;
  gap: 15px;
}

.author-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 400 !important;
  font-size: 16px !important;
  font-family: 'Outfit', sans-serif;
}

.author-meta {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 400;
  font-size: 16px;
  color: var(--vcn-white, #fff);
  font-style: normal;
  font-family: 'Outfit', sans-serif;
}

.author-title {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-family: 'Outfit', sans-serif;
}

.widget-inquiry-card {
  background: var(--vcn-base-bg, #F6F7EE);
  border: 1px solid rgba(29, 69, 3, 0.08);
  padding: 50px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-shadow: 0 10px 25px rgba(29, 69, 3, 0.03);
}

.widget-inquiry-card h3 {
  font-size: 32px;
  font-weight: 400;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 12px;
  font-family: 'Outfit', sans-serif;
}

.widget-inquiry-card p {
  font-size: 16px !important;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.85;
  line-height: 1.6;
  margin-bottom: 25px;
  max-width: 320px;
  font-family: 'Outfit', sans-serif;
}

.press-office-btn {
  background-color: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff) !important;
  border: 2px solid var(--vcn-dark, #1D4503);
  padding: 12px 32px;
  border-radius: 24px;
  font-size: 16px !important;
  font-weight: 400 !important;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.25s ease;
  font-family: 'Outfit', sans-serif;
  box-shadow: 0 4px 6px rgba(29, 69, 3, 0.05);
}

.press-office-btn:hover {
  background-color: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13) !important;
  border-color: var(--vcn-badge, #d3fa99);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(29, 69, 3, 0.1);
}

/* OLDER COVERAGE */
.older-coverage-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  margin-bottom: 20px;
}

.older-coverage-link {
  background: transparent;
  border: none;
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: 'Outfit', sans-serif;
  transition: color 0.2s ease;
}

.older-coverage-link:hover {
  color: var(--vcn-dark, #1D4503);
}

/* Sidebar overrides to match website theme on this page */
:deep(.about-sidebar-bg) {
  background: var(--vcn-white, #fff) !important;
}

:deep(.sidebar-menu-item) {
  color: var(--vcn-darker, #1C3A13) !important;
}

:deep(.sidebar-menu-item:hover) {
  background: rgba(29, 69, 3, 0.05) !important;
  color: var(--vcn-dark, #1D4503) !important;
}

:deep(.sidebar-menu-item.active) {
  color: var(--vcn-dark, #1D4503) !important;
}

:deep(.sidebar-menu-item.active::before) {
  background: var(--vcn-dark, #1D4503) !important;
}

:deep(.about-sidebar-mobile) {
  background: var(--vcn-white, #fff) !important;
  border-bottom: 1px solid rgba(29, 69, 3, 0.08) !important;
}

:deep(.mobile-dropdown-trigger) {
  border-bottom: 2px solid var(--vcn-dark, #1D4503) !important;
  color: var(--vcn-darker, #1C3A13) !important;
}

:deep(.mobile-dropdown-list) {
  background: var(--vcn-white, #fff) !important;
  border: 1px solid rgba(29, 69, 3, 0.08) !important;
}

:deep(.mobile-dropdown-item) {
  color: var(--vcn-darker, #1C3A13) !important;
}

:deep(.mobile-dropdown-item:hover),
:deep(.mobile-dropdown-item.active-item) {
  background: rgba(29, 69, 3, 0.05) !important;
  color: var(--vcn-dark, #1D4503) !important;
}

/* RESPONSIVE */
@media (max-width: 991px) {
  .news-content-wrapper {
    padding: 20px 0;
  }
}

@media (max-width: 768px) {
  .news-hero {
    height: auto;
    min-height: 250px;
    align-items: center;
  }
  
  .news-hero-content {
    padding: 30px 20px;
  }
  
  .news-hero h1 {
    font-size: 32px;
  }
  
  .tabs-container {
    flex-direction: column;
    align-items: stretch;
    gap: 15px;
  }

  .year-tabs-pills {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 8px;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .year-tabs-pills::-webkit-scrollbar {
    display: none;
  }
  
  .all-publications-btn {
    justify-content: center;
  }
  
  .featured-news-card {
    flex-direction: column;
  }
  
  .featured-news-info {
    padding: 30px 24px;
  }
  
  .featured-news-media {
    height: 220px;
    order: -1; /* Image on top on mobile */
  }
  
  .news-row-card {
    padding: 18px 20px;
  }
  
  .news-row-title {
    font-size: 16px;
  }
  
  .news-widgets-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .widget-quote-card, .widget-inquiry-card {
    padding: 35px 25px;
  }
}
</style>
<style>
/*
  ===========================================================
  STICKY-SAFE LAYOUT OVERRIDES (unscoped)
  ===========================================================
*/
.product-detail-section,
.product-detail-section .container,
.product-detail-section .row {
  overflow: visible !important;
  transform: none !important;
  filter: none !important;
  contain: none !important;
  will-change: auto !important;
}

@media (min-width: 992px) {
  .product-detail-section .row {
    display: flex !important;
    align-items: stretch !important;
  }

  .sidebar-section {
    display: flex !important;
    flex-direction: column !important;
    align-self: stretch !important;
    position: relative !important;
    top: auto !important;
    height: auto !important;
    overflow: visible !important;
    transform: none !important;
    background: transparent !important;
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 991.98px) {
  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section>.container {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .product-detail-section .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .sidebar-section {
    height: auto !important;
    min-height: auto !important;
    position: relative !important;
    top: 0 !important;
    overflow: visible !important;
    border-right: none !important;
    background: transparent !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>

 
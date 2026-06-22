<template>
  <section class="product-detail-section mt-3">
    <div class="container-fluid">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-md-3 col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <div class="col-md-9 col-lg-9">
          <div class="careers-content">

            <!-- TOP TABS -->
            <div class="tabs">
              <button
                v-for="tab in careers.tabs"
                :key="tab.key"
                :class="{ active: activeTab === tab.key }"
                @click="activeTab = tab.key"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- OVERVIEW TAB -->
            <div v-if="activeTab === 'overview'">

              <!-- HERO IMAGE -->
              <section class="hero-sectioning">
                <img
                  :src="careers.overview.hero.image"
                  :alt="careers.overview.hero.title"
                  class="hero-img"
                >

                <div class="hero-card">
                  <h2>
                    {{ careers.overview.hero.title }}
                  </h2>

                  <p
                    v-for="(paragraph, index) in careers.overview.hero.description"
                    :key="index"
                  >
                    {{ paragraph }}
                  </p>

                  <button class="primary-btn">
                    {{ careers.overview.hero.buttonText }}
                  </button>
                </div>
              </section>

              <!-- CULTURE SECTION -->
              <section class="culture-section">

                <h2>
                  {{ careers.overview.culture.hashTag }}
                </h2>

                <div class="culture-card">

                  <img
                    :src="careers.overview.culture.image"
                    :alt="careers.overview.culture.title"
                  >

                  <div class="culture-card-body">
                    <h3>
                      {{ careers.overview.culture.title }}
                    </h3>

                    <p>
                      {{ careers.overview.culture.description }}
                    </p>

                    <NuxtLink to="/our-journey" class="read-more-link-inline">Read More</NuxtLink>
                  </div>

                </div>

              </section>

              <!-- VP MESSAGE -->
              <section class="vp-section">

                <h2>
                  {{ careers.overview.vicePresident.heading }}
                </h2>

                <div class="vp-card">

                  <div class="vp-profile">

                    <img
                      :src="careers.overview.vicePresident.image"
                      :alt="careers.overview.vicePresident.name"
                    >

                    <h4>
                      {{ careers.overview.vicePresident.name }}
                    </h4>

                    <span>
                      {{ careers.overview.vicePresident.designation }}
                    </span>

                  </div>

                  <div class="vp-message">

                    <p
                      v-for="(message, index) in careers.overview.vicePresident.messages"
                      :key="index"
                    >
                      {{ message }}
                    </p>

                  </div>

                </div>

              </section>

            </div>

            <!-- CULTURE TAB -->
            <div v-if="activeTab === 'culture'" class="culture-tab-content">
              <!-- Culture Intro Section -->
              <section class="culture-intro">
                <h2>Culture at VCN</h2>
                
                <p>For years, our core values and fundamentals have guided the way we work, grow, and care for one another.</p>
                
                <p>Our core fundamentals — <strong>Freedom, Family, Hope, and Reward</strong> — keep us focused on what matters most. Alongside them, our values — <strong>partnership, personal worth, responsibility, and integrity</strong> — shape the way we work, lead, and care for one another.</p>
                
                <p>At VCN, we inspire people to live their best and that starts with our people. We offer the <strong>Freedom</strong> to grow, the spirit of <strong>Family</strong> that brings meaning to your work, the <strong>Hope</strong> of a better future, and the <strong>Reward</strong> that comes from meaningful progress.</p>
                
                <!-- Expandable text area -->
                <div v-show="isCultureExpanded" class="culture-expanded-paragraphs">
                  <p>We take pride in serving our partners, customers, communities, and each other. Every individual contributes to our journey, and together we create progress that we can all be proud of. We take care of our people and create an environment where contributions are valued, and achievements are celebrated. We also support long-term learning and growth, and learning tools that empower you to chart your own unique path.</p>
                  
                  <p>Our culture comes alive in everyday moments — celebrating festivals, milestones, and achievements, or simply pausing to connect and smile. These moments create a sense of belonging and strengthen us as one VCN family.</p>
                </div>
                
                <!-- Paragraph 6 with fade preview when collapsed -->
                <p :class="{ 'fade-text': !isCultureExpanded }">
                  What unites us is simple: we hire good people, and we nurture their passion{{ isCultureExpanded ? '.' : '...' }}
                </p>
                
                <div class="read-more-wrapper">
                  <button @click="isCultureExpanded = !isCultureExpanded" class="read-more-btn-outline">
                    {{ isCultureExpanded ? 'READ LESS' : 'READ MORE' }}
                  </button>
                </div>

                <div class="tags-section">
                  <span class="tags-label">Tags:</span>
                  <div class="tags-container">
                    <span class="tag">#careers</span>
                    <span class="tag">#culture-at-vcn</span>
                  </div>
                </div>
              </section>

              <!-- RELATED ARTICLES -->
              <section class="articles">
                <h2>{{ careers.cultureTab.heading }}</h2>

                <div class="articles-grid">
                  <div
                    v-for="(article, index) in careers.cultureTab.articles"
                    :key="index"
                    class="article-card"
                  >
                    <div class="article-icon">
                      {{ article.icon }}
                    </div>

                    <div class="article-info">
                      <span class="article-date">
                        {{ article.date }}
                      </span>
                      <h4 class="article-title">
                        {{ article.title }}
                      </h4>
                      <p class="article-source">
                        VCN Wellness
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()
const isCultureExpanded = ref(false)

// Fetch page sections from API during SSR/routing
await useAsyncData('careers-cms', () => cmsStore.fetchSectionsBySlug('careers'))

const careers = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find sections
  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'careers-hero')
  const cultureSec = sections.find(s => s.name === 'culture' || s.sectionKey === 'careers-culture')
  const vpSec = sections.find(s => s.name === 'vicePresident' || s.sectionKey === 'careers-vp')
  const cultureTabSec = sections.find(s => s.name === 'cultureTab' || s.sectionKey === 'careers-culture-tab')
  
  // Fallbacks
  const fallback = cmsStore.getPageSection('about', 'careers')
  
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

  // Parse hero description
  let heroDescription = fallback?.overview?.hero?.description || []
  if (heroSec?.description) {
    heroDescription = heroSec.description.split('\n').filter(p => p.trim())
  }

  // Parse culture section extraData
  const cultureExtra = cultureSec?.extraData?._extraData || cultureSec?.extraData || {}
  const rawCultureImage = cultureSec?.image || cultureExtra.image
  let cultureImage = ''
  if (rawCultureImage) {
    if (typeof rawCultureImage === 'string') {
      cultureImage = rawCultureImage
    } else {
      cultureImage = getCmsImageUrl(rawCultureImage)
    }
  }

  // Parse VP section extraData
  const vpExtra = vpSec?.extraData?._extraData || vpSec?.extraData || {}
  const rawVpImage = vpSec?.image || vpExtra.image
  let vpImage = ''
  if (rawVpImage) {
    if (typeof rawVpImage === 'string') {
      vpImage = rawVpImage
    } else {
      vpImage = getCmsImageUrl(rawVpImage)
    }
  }

  // Parse cultureTab articles
  let parsedArticles = fallback?.cultureTab?.articles || []
  if (cultureTabSec?.items && cultureTabSec.items.length > 0) {
    parsedArticles = cultureTabSec.items.map(item => ({
      title: item.extraData?.title || item.title || '',
      date: item.extraData?.date || '',
      icon: item.extraData?.icon || 'A'
    }))
  }

  return {
    tabs: fallback?.tabs || [
      { key: "overview", label: "Overview" },
      { key: "culture", label: "Culture at VCN" }
    ],
    overview: {
      hero: {
        title: heroSec?.title || fallback?.overview?.hero?.title || 'Be a part of the VCN Family',
        description: heroDescription,
        image: heroImage || fallback?.overview?.hero?.image || '/img/careers/careers-banner.png',
        buttonText: heroSec?.buttonText || fallback?.overview?.hero?.buttonText || 'FIND OPEN POSITIONS'
      },
      culture: {
        hashTag: cultureExtra.hashTag || fallback?.overview?.culture?.hashTag || '#IVCN',
        title: cultureSec?.title || fallback?.overview?.culture?.title || 'Celebrating Milestones Together',
        description: cultureSec?.description || fallback?.overview?.culture?.description || '',
        image: cultureImage || fallback?.overview?.culture?.image || '/img/careers/culture.png'
      },
      vicePresident: {
        heading: vpSec?.title || fallback?.overview?.vicePresident?.heading || 'Words from our Vice President (HR)',
        name: vpExtra.name || fallback?.overview?.vicePresident?.name || 'Ritika Malik',
        designation: vpExtra.designation || fallback?.overview?.vicePresident?.designation || 'Vice President - Human Resources',
        messages: vpExtra.messages || fallback?.overview?.vicePresident?.messages || [],
        image: vpImage || fallback?.overview?.vicePresident?.image || '/img/careers/vp.png'
      }
    },
    cultureTab: {
      heading: cultureTabSec?.title || fallback?.cultureTab?.heading || 'Related Articles',
      articles: parsedArticles
    }
  }
})

const activeTab = ref("overview")

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
})
</script>
<style scoped>
.careers-content {
  padding: 30px;
  background: #f7f7f7;
}

/* TABS */

.tabs {
  display: flex;
  gap: 30px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 25px;
}

.tabs button {
  background: none;
  border: none;
  padding-bottom: 8px;
  cursor: pointer;
  font-size: 16px;
}

.tabs .active {
  border-bottom: 3px solid #e30613;
  font-weight: 600;
}


/* HERO */

.hero-sectioning {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
  margin-bottom: 40px;
}

.hero-img {
  width: 100%;
  display: block;
}

.hero-card {
  background: #f4eac6;
  padding: 30px;
  text-align: center;
}

.hero-card h2 {
  font-size: 26px;
  margin-bottom: 10px;
}

.hero-card p {
  color: #555;
  margin-bottom: 20px;
}

.primary-btn {
  background: #e5c87b;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
}


/* CULTURE */

.culture-section {
  margin-bottom: 40px;
}

.culture-card {
  display: flex;
  gap: 25px;
  background: #eaf3e5;
  padding: 25px;
  border-radius: 10px;
  align-items: center;
}

.culture-card img {
  width: 260px;
  border-radius: 8px;
}

.read-more-link-inline {
  display: inline-block;
  margin-top: 10px;
  color: #111;
  font-weight: 600;
  text-decoration: underline;
}


/* VP */

.vp-section {
  margin-bottom: 40px;
}

.vp-card {
  display: flex;
  gap: 30px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.vp-profile {
  text-align: center;
  width: 220px;
}

.vp-profile img {
  width: 90px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.vp-message {
  flex: 1;
  color: #555;
  line-height: 1.7;
}


/* ARTICLES / CULTURE TAB */

.culture-tab-content {
  padding: 10px;
}

.culture-intro {
  margin-bottom: 40px;
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0,0,0,0.03);
}

.culture-intro h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 20px;
}

.culture-intro p {
  font-size: 15px;
  line-height: 1.65;
  color: #333;
  margin-bottom: 16px;
}

.fade-text {
  color: #999 !important;
  opacity: 0.6;
}

.read-more-wrapper {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}

.read-more-btn-outline {
  background: transparent;
  border: 2px solid #000;
  color: #000;
  padding: 10px 28px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.read-more-btn-outline:hover {
  background: #000;
  color: #fff;
}

.tags-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 25px;
  border-top: 1px solid #eee;
  padding-top: 20px;
}

.tags-label {
  font-weight: 600;
  font-size: 14px;
}

.tags-container {
  display: flex;
  gap: 10px;
}

.tag {
  background: #eef2f6;
  color: #475569;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
}

.article-card {
  display: flex;
  gap: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.05);
  align-items: center;
}

.article-icon {
  width: 60px;
  height: 60px;
  background: #000;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.article-title {
  font-size: 16px;
  font-weight: 600;
  margin: 4px 0 0 0;
}

.article-date {
  font-size: 13px;
  color: #777;
}

.article-source {
  font-size: 13px;
  color: #555;
  margin-top: 4px;
}


/* MOBILE LAYOUT OVERRIDES */

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

  .careers-content {
    padding: 0;
    background: #fff;
  }

  /* TABS */
  .tabs {
    display: flex;
    justify-content: space-around;
    background: #f8f9fa;
    margin-bottom: 25px;
    border-bottom: 1px solid #dee2e6;
    padding: 0;
    gap: 0;
  }

  .tabs button {
    flex: 1;
    padding: 12px 0;
    font-size: 15px;
    color: #495057;
    border-bottom: 3px solid transparent;
    font-weight: normal;
    text-align: center;
  }

  .tabs .active {
    border-bottom: 3px solid #e30613;
    font-weight: 700;
    color: #212529;
  }

  /* OVERVIEW TAB HERO */
  .hero-sectioning {
    margin-bottom: 30px;
    border-radius: 0;
    box-shadow: none;
  }

  .hero-img {
    border-radius: 0;
  }

  .hero-card {
    background: #f4eac6; /* Original light yellow background */
    padding: 30px 20px;
  }

  .hero-card h2 {
    font-size: 24px;
    font-weight: 700;
    color: #111;
    margin-bottom: 15px;
  }

  .hero-card p {
    font-size: 14px;
    line-height: 1.5;
    color: #555; /* Original text color */
    margin-bottom: 15px;
  }

  .primary-btn {
    background: #e5c87b; /* Original gold/yellow background */
    border: none;
    color: #000;
    padding: 12px 24px;
    border-radius: 30px;
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    transition: all 0.2s;
  }

  /* CULTURE SECTION */
  .culture-section {
    padding: 0 15px;
    margin-bottom: 30px;
  }

  .culture-section h2 {
    font-size: 24px;
    font-weight: 700;
    color: #111;
    margin-bottom: 15px;
  }

  .culture-card {
    flex-direction: column;
    background: #eaf3e5; /* Original light green background */
    padding: 25px;
    border-radius: 10px;
    gap: 0;
    box-shadow: none;
  }

  .culture-card img {
    width: 100%;
    border-radius: 8px;
  }

  .culture-card-body {
    padding: 20px 0 0 0;
    text-align: left;
    width: 100%;
  }

  .culture-card-body h3 {
    font-size: 16px;
    font-weight: 700;
    color: #111;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
  }

  .culture-card-body h3::after {
    content: " 🎓";
    font-size: 1.25rem;
    margin-left: 6px;
  }

  .culture-card-body p {
    font-size: 14px;
    line-height: 1.5;
    color: #555;
    margin-bottom: 15px;
  }

  .read-more-link-inline {
    display: inline-block;
    color: #111 !important;
    font-weight: 600;
    text-decoration: underline !important;
    font-size: 14px;
  }

  /* VP SECTION */
  .vp-section {
    padding: 0 15px;
    margin-bottom: 40px;
  }

  .vp-section h2 {
    font-size: 28px;
    font-weight: 700;
    text-align: center;
    color: #111;
    margin-bottom: 25px;
    line-height: 1.25;
  }

  .vp-card {
    flex-direction: column;
    background: #fff; /* Original white card background */
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06); /* Original shadow */
    padding: 25px 20px;
    border-radius: 10px;
    gap: 0;
  }

  .vp-profile {
    width: 100%;
    background: transparent; /* Remove custom pinkish background */
    padding: 0 0 20px 0;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vp-profile img {
    width: 90px; /* Original profile image size */
    height: 90px;
    border-radius: 50%;
    margin-bottom: 10px;
    object-fit: cover;
  }

  .vp-profile h4 {
    font-size: 18px;
    font-weight: 700;
    color: #111;
    margin-bottom: 4px;
  }

  .vp-profile span {
    font-size: 14px;
    color: #777; /* Original designation color */
  }

  .vp-message {
    padding: 0;
  }

  .vp-message p {
    font-size: 14px;
    line-height: 1.65;
    color: #555;
    margin-bottom: 15px;
  }

  /* CULTURE TAB CONTENT */
  .culture-tab-content {
    padding: 0;
  }

  .culture-intro {
    padding: 0 15px 30px 15px;
    border-bottom: 1px solid #eee;
    background: transparent;
    box-shadow: none;
    border-radius: 0;
  }

  .culture-intro h2 {
    font-size: 32px;
    font-weight: 700;
    color: #111;
    margin-bottom: 20px;
    margin-top: 10px;
  }

  .culture-intro p {
    font-size: 14px;
    line-height: 1.6;
    color: #333;
    margin-bottom: 18px;
  }

  .culture-intro strong {
    font-weight: 700;
    color: #111;
  }

  .culture-intro .fade-text {
    color: #aaa;
  }

  .read-more-wrapper {
    display: flex;
    justify-content: center;
    margin: 25px 0 35px 0;
  }

  .read-more-btn-outline {
    background: transparent;
    border: 2px solid #111;
    color: #111;
    padding: 10px 30px;
    border-radius: 25px;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
  }

  .tags-section {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }

  .tags-label {
    font-size: 14px;
    font-weight: 600;
    color: #111;
  }

  .tags-container {
    display: flex;
    gap: 8px;
  }

  .tag {
    background: #f1f5f9;
    color: #475569;
    padding: 5px 12px;
    border-radius: 15px;
    font-size: 13px;
    font-weight: 500;
  }

  /* RELATED ARTICLES */
  .articles {
    padding: 30px 15px;
    background: #f8f9fa;
  }

  .articles h2 {
    font-size: 24px;
    font-weight: 700;
    color: #111;
    margin-bottom: 20px;
  }

  .articles-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .article-card {
    display: flex;
    gap: 15px;
    background: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
    align-items: center;
    border: 1px solid #f1f5f9;
  }

  .article-icon {
    width: 90px;
    height: 90px;
    font-size: 40px;
    flex-shrink: 0;
    border-radius: 4px;
  }

  .article-info {
    flex-grow: 1;
    text-align: left;
  }

  .article-date {
    font-size: 12px;
    color: #888;
    display: block;
    margin-bottom: 4px;
  }

  .article-title {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    color: #1a202c;
    margin: 0 0 6px 0;
  }

  .article-source {
    font-size: 12px;
    color: #64748b;
    margin: 0;
  }
}
</style>

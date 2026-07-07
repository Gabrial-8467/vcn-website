<template>
  <section class="product-detail-section mt-3">
    <div class="container-fluid">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <!-- Main Content -->
        <div class="col-lg-9">
          <div class="careers-container">

            <!-- HERO SECTION -->
            <section class="careers-hero" data-aos="fade-up" data-aos-duration="800">
              <div class="careers-hero-bg-wrap">
                <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200&h=600" :alt="careers.overview.hero.title" class="careers-hero-bg" />
                <div class="careers-hero-overlay"></div>
              </div>
              <div class="careers-hero-content">
                <h1 class="careers-hero-title">{{ careers.overview.hero.title }}</h1>
                <p v-for="(desc, idx) in careers.overview.hero.description" :key="idx" class="careers-hero-desc">
                  {{ desc }}
                </p>
                <div class="careers-hero-actions">
                  <a href="#openings" class="btn-filled">{{ careers.overview.hero.buttonText }}</a>
                </div>
              </div>
            </section>

            <!-- LIFESTYLE GALLERY SECTION (#IVCN LIFESTYLE) -->
            <section id="culture" class="careers-lifestyle-section" data-aos="fade-up" data-aos-duration="800">
              <div class="section-header">
                <h3 class="careers-eyebrow">{{ careers.overview.culture.hashTag }}</h3>
                <h2 class="section-title">{{ careers.overview.culture.title }}</h2>
                <p class="section-subtitle">
                  {{ careers.overview.culture.description }}
                </p>
              </div>

              <!-- Staggered Gallery Collage -->
              <div class="staggered-gallery">
                <!-- Column 1 -->
                <div class="gallery-col col-left">
                  <div class="gallery-item item-tall">
                    <img src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&q=80&w=600&h=800" alt="Modern Wellness Herb Workspace" class="gallery-img" />
                  </div>
                  <div class="gallery-item item-medium">
                    <img src="https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&q=80&w=600&h=450" alt="Organic Essential Oils" class="gallery-img" />
                  </div>
                </div>

                <!-- Column 2 -->
                <div class="gallery-col col-center">
                  <div class="gallery-item item-landscape">
                    <img src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600&h=400" alt="Team Wellness Meeting" class="gallery-img" />
                  </div>
                  <div class="gallery-item item-portrait">
                    <img :src="careers.overview.vicePresident.image || '/img/leadership/our team 2.png'" alt="VP of HR Ritika Malik" class="gallery-img" />
                  </div>
                </div>

                <!-- Column 3 -->
                <div class="gallery-col col-right">
                  <div class="gallery-item item-very-tall">
                    <img src="https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=600&h=1000" alt="Green Reforestation Nature" class="gallery-img" />
                  </div>
                </div>
              </div>
            </section>

            <!-- LEADERSHIP SPOTLIGHT SECTION -->
            <section class="careers-spotlight-section" data-aos="fade-up" data-aos-duration="800">
              <div class="spotlight-container">
                <!-- Left Column (Visuals) -->
                <div class="spotlight-visual-col">
                  <div class="spotlight-img-wrap">
                    <img :src="careers.overview.vicePresident.image || '/img/leadership/our team 2.png'" :alt="careers.overview.vicePresident.name" class="spotlight-profile-img" />
                    <!-- Floating dark green quote badge -->
                    <div class="quote-badge">
                      <span class="quote-mark">”</span>
                      <p class="quote-text">
                        "{{ careers.overview.vicePresident.quote }}"
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Right Column (Text info) -->
                <div class="spotlight-text-col">
                  <h3 class="careers-eyebrow spotlight-eyebrow">{{ careers.overview.vicePresident.heading }}</h3>
                  <h2 class="spotlight-name">{{ careers.overview.vicePresident.name }}</h2>
                  <h4 class="spotlight-title">{{ careers.overview.vicePresident.designation }}</h4>
                  <div class="spotlight-messages">
                    <p v-for="(msg, idx) in careers.overview.vicePresident.messages" :key="idx" class="spotlight-para">
                      {{ msg }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <!-- RELATED ARTICLES SECTION
            <section class="careers-articles-section" data-aos="fade-up" data-aos-duration="800">
              <div class="section-header">
                <h2 class="section-title">{{ careers.cultureTab.heading }}</h2>
              </div>
              <div class="articles-grid">
                <div v-for="(art, idx) in careers.cultureTab.articles" :key="idx" class="article-card">
                  <div class="article-icon-wrap">
                    <span class="article-icon">{{ art.icon }}</span>
                  </div>
                  <div class="article-details">
                    <span class="article-date">{{ art.date }}</span>
                    <h3 class="article-title">{{ art.title }}</h3>
                  </div>
                  <div class="article-arrow">
                    <i class="bi bi-arrow-up-right"></i>
                  </div>
                </div>
              </div>
            </section> -->
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

// Fetch page sections from API during SSR/routing
await useAsyncData('careers-cms', () => cmsStore.fetchSectionsBySlug('careers'))

// Fetch fallback about page content from Pinia/constants
const fallbackAbout = computed(() => {
  return cmsStore.getPageSection('about', 'about') || {}
})

const careers = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find sections
  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'careers-hero')
  const cultureSec = sections.find(s => s.name === 'culture' || s.sectionKey === 'careers-culture')
  const vpSec = sections.find(s => s.name === 'vicePresident' || s.sectionKey === 'careers-vp')
  
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

  return {
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
        description: cultureSec?.description || fallback?.overview?.culture?.description || 'At VCN India, we believe in nurturing talent and celebrating growth while building a strong culture of collaboration and achievement.',
        image: cultureImage || fallback?.overview?.culture?.image || '/img/careers/culture.png'
      },
      vicePresident: {
        heading: vpSec?.title || fallback?.overview?.vicePresident?.heading || 'Words from our Vice President (HR)',
        name: vpExtra.name || fallback?.overview?.vicePresident?.name || 'Ritika Malik',
        designation: vpExtra.designation || fallback?.overview?.vicePresident?.designation || 'Vice President - Human Resources',
        quote: vpExtra.quote || fallback?.overview?.vicePresident?.quote || "Culture is the silent heartbeat of VCN. We don't just build careers; we nurture the whole human.",
        messages: vpExtra.messages || fallback?.overview?.vicePresident?.messages || [
          "At VCN, we believe in the power of people. Our vision of helping people live better lives starts with our team. We nurture passion, encourage innovation and provide opportunities for employees to grow and succeed.",
          "Being a part of VCN means working with talented people from across the globe while making a meaningful impact in communities and markets."
        ],
        image: vpImage || fallback?.overview?.vicePresident?.image || '/img/careers/vp.png'
      }
    },
    cultureTab: {
      heading: fallback?.cultureTab?.heading || 'Related Articles',
      articles: fallback?.cultureTab?.articles || []
    }
  }
})

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
  link: [
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap'
    }
  ]
})
</script>

<style scoped>
/* Main container layout */
.careers-container {
  font-family: 'Outfit', sans-serif;
  background: #ffffff;
  padding: 0;
  display: flex;
  flex-direction: column;
  color: var(--vcn-darker, #1C3A13);
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

/* Eyebrow Label */
.careers-eyebrow {
  color: var(--vcn-dark, #1D4503);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 12px;
  display: block;
}

/* ─── HERO SECTION ───────────────────────────────────── */
.careers-hero {
  position: relative;
  height: 480px;
  border-radius: 24px;
  overflow: hidden;
  display: flex;
  align-items: center;
  margin: 0;
  background: #FAF6F0; /* Warm sand background under image */
}

.careers-hero-bg-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
}

.careers-hero-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.careers-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(29, 69, 3, 0.82) 0%,
    rgba(29, 69, 3, 0.45) 60%,
    rgba(29, 69, 3, 0.2) 100%
  );
  z-index: 2;
}

.careers-hero-content {
  position: relative;
  z-index: 3;
  max-width: 750px;
  padding: 60px;
  color: white;
}

.careers-hero-content .careers-eyebrow {
  color: var(--vcn-badge, #d3fa99);
}

.careers-hero-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 48px !important;
  font-weight: 400 !important;
  line-height: 1.15;
  color: white;
  margin-bottom: 16px;
  white-space: pre-line;
}

.careers-hero-desc {
  font-size: 16px !important;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 32px;
}

.careers-hero-actions {
  display: flex;
  gap: 16px;
}

.careers-hero-actions .btn-filled {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
  border: 1px solid var(--vcn-badge, #d3fa99);
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(29, 69, 3, 0.15);
}

.careers-hero-actions .btn-filled:hover {
  background: var(--vcn-white, #fff);
  color: var(--vcn-dark, #1D4503);
  border-color: var(--vcn-white, #fff);
}

.careers-hero-actions .btn-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.6);
  padding: 10px 28px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
}

.careers-hero-actions .btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

/* ─── LIFESTYLE GALLERY SECTION ──────────────────────── */
.careers-lifestyle-section {
  position: relative;
  padding: 60px 40px;
  background: linear-gradient(175deg, #ffffff 65%, #FAF5EE 65.1%);
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-header {
  max-width: 600px;
}

.section-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 48px !important;
  font-weight: 400 !important;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 12px;
  text-align: left;
}

.section-subtitle {
  font-size: 1.05rem;
  line-height: 1.6;
  color: rgba(29, 69, 3, 0.75);
  margin: 0;
}

/* Staggered Gallery */
.staggered-gallery {
  display: flex;
  gap: 24px;
  margin-top: 24px;
}

.gallery-col {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.col-left {
  width: calc(32% - 16px);
}

.col-center {
  width: calc(36% - 16px);
  margin-top: 40px; /* Offset to create staggered effect */
}

.col-right {
  width: calc(32% - 16px);
}

.gallery-item {
  position: relative;
  width: 100%;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.05);
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease;
}

.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.gallery-item:hover {
  transform: translateY(-4px) scale(1.015);
  box-shadow: 0 20px 40px rgba(29, 69, 3, 0.1);
}

/* Height mapping for columns */
.item-tall {
  height: 380px;
}

.item-medium {
  height: 260px;
}

.item-landscape {
  height: 200px;
}

.item-portrait {
  height: 380px;
}

.item-very-tall {
  height: 520px;
}

/* Notification bell badge */
.floating-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
  z-index: 5;
}

.badge-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-icon-wrap i {
  font-size: 20px;
  color: var(--vcn-darker, #1C3A13);
}

.active-dot {
  position: absolute;
  top: -1px;
  right: -1px;
  width: 9px;
  height: 9px;
  background: var(--vcn-badge, #d3fa99);
  border-radius: 50%;
  border: 1.5px solid white;
}

.active-dot::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--vcn-badge, #d3fa99);
  animation: pulse-dot 2s infinite;
}

@keyframes pulse-dot {
  0% { transform: scale(1); opacity: 1; }
  100% { transform: scale(2.5); opacity: 0; }
}

/* ─── LEADERSHIP SPOTLIGHT SECTION ────────────────────── */
.careers-spotlight-section {
  padding: 0 40px;
  margin-top: 20px;
  margin-bottom: 60px;
}

.spotlight-container {
  display: flex;
  gap: 50px;
  align-items: center;
  padding: 60px 50px;
  background: #FAF5EE;
  border-radius: 24px;
  border: 1px solid rgba(29, 69, 3, 0.06);
}

.spotlight-visual-col {
  width: calc(42% - 25px);
  display: flex;
  justify-content: center;
}

.spotlight-img-wrap {
  position: relative;
  width: 320px;
  height: 320px;
  flex-shrink: 0;
}

.spotlight-profile-img {
  width: 100%;
  height: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: 50%;
  border: 6px solid white;
  box-shadow: 0 12px 35px rgba(29, 69, 3, 0.06);
}

/* Floating Quote badge */
.quote-badge {
  position: absolute;
  bottom: -15px;
  right: -15px;
  background: var(--vcn-dark, #1D4503);
  color: white;
  padding: 20px 24px;
  border-radius: 16px;
  max-width: 250px;
  box-shadow: 0 10px 25px rgba(29, 69, 3, 0.15);
  z-index: 3;
}

.quote-mark {
  font-size: 2.8rem;
  line-height: 1;
  color: var(--vcn-badge, #d3fa99);
  font-family: Georgia, serif;
  font-weight: 700;
  display: block;
  margin-bottom: -12px;
  margin-top: -8px;
}

.quote-text {
  font-size: 0.85rem;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  font-style: italic;
}

.spotlight-text-col {
  width: calc(58% - 25px);
}

.spotlight-name {
  font-family: 'Outfit', sans-serif !important;
  font-size: 48px !important;
  font-weight: 400 !important;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 2px;
}

.spotlight-title {
  font-size: 0.82rem;
  font-weight: 700;
  color: #b89047;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 24px;
  display: block;
}

.spotlight-eyebrow {
  font-family: 'Outfit', sans-serif !important;
  font-size: 48px !important;
  font-weight: 400 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  text-transform: none !important;
  letter-spacing: normal !important;
  margin-bottom: 12px !important;
  display: block !important;
}

.spotlight-messages {
  margin-bottom: 24px;
}

.spotlight-para {
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(29, 69, 3, 0.8);
  margin-bottom: 16px;
}

.spotlight-para:last-child {
  margin-bottom: 0;
}

.spotlight-link {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--vcn-dark, #1D4503);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: gap 0.25s ease;
}

.spotlight-link:hover {
  gap: 12px;
  color: var(--vcn-darker, #1C3A13);
}

/* ─── ROOTED IN PURPOSE SECTION ──────────────────────── */
.careers-purpose-section {
  padding: 60px 40px;
}

.purpose-container {
  display: flex;
  gap: 60px;
  align-items: center;
}

.purpose-text-col {
  width: calc(50% - 30px);
}

.purpose-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 48px !important;
  font-weight: 400 !important;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 14px;
}

.purpose-desc {
  font-size: 1.05rem;
  line-height: 1.65;
  color: rgba(29, 69, 3, 0.8);
  margin-bottom: 32px;
}

.purpose-cards-list {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.purpose-item-card {
  display: flex;
  gap: 20px;
  background: #F6F7EE;
  padding: 24px;
  border-radius: 16px;
  border: 1px solid rgba(29, 69, 3, 0.04);
}

.purpose-icon-wrap {
  width: 46px;
  height: 46px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--vcn-dark, #1D4503);
  box-shadow: 0 4px 12px rgba(29, 69, 3, 0.04);
  flex-shrink: 0;
}

.purpose-card-title {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 6px;
}

.purpose-card-text {
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(29, 69, 3, 0.75);
  margin: 0;
}

.purpose-visual-col {
  width: calc(50% - 30px);
  position: relative;
}

.purpose-img-card {
  position: relative;
  width: 100%;
  height: 520px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.purpose-forest-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Floating stats badge overlapping left edge */
.stats-badge {
  position: absolute;
  top: 40px;
  left: -30px;
  background: white;
  padding: 24px 30px;
  border-radius: 16px;
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 4px;
  z-index: 2;
}

.stats-number {
  font-family: 'Outfit', sans-serif;
  font-size: 2.8rem;
  font-weight: 800;
  color: var(--vcn-darker, #1C3A13);
  line-height: 1;
}

.stats-label {
  font-size: 0.72rem;
  font-weight: 700;
  color: #718096;
  letter-spacing: 1px;
}

/* ─── READY TO FIND YOUR RHYTHM? SECTION ───────────────── */
.careers-cta-section {
  padding: 0 40px 20px 40px;
}

.cta-banner-card {
  background: var(--vcn-dark, #1D4503);
  color: white;
  padding: 70px 50px;
  border-radius: 24px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 12px 35px rgba(29, 69, 3, 0.1);
}

.cta-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 48px !important;
  font-weight: 400 !important;
  margin-bottom: 12px;
  color: white;
}

.cta-desc {
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  max-width: 600px;
  margin: 0 auto 32px;
  line-height: 1.6;
}

.cta-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.cta-btn-white {
  background: white;
  color: var(--vcn-darker, #1C3A13);
  padding: 14px 32px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;
  border: 1px solid white;
}

.cta-btn-white:hover {
  background: var(--vcn-darker, #1C3A13);
  color: white;
  border-color: var(--vcn-darker, #1C3A13);
}

.cta-btn-outline {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
  padding: 12px 32px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  transition: all 0.25s ease;
}

.cta-btn-outline:hover {
  border-color: white;
  background: rgba(255, 255, 255, 0.1);
}

/* ─── RELATED ARTICLES SECTION ──────────────────────── */
.careers-articles-section {
  padding: 0 40px;
  margin-top: 20px;
}

.articles-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
}

.article-card {
  display: flex;
  align-items: center;
  gap: 24px;
  background: #ffffff;
  border: 1px solid rgba(29, 69, 3, 0.08);
  padding: 24px 30px;
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(29, 69, 3, 0.02);
}

.article-icon-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #F6F7EE;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vcn-dark, #1D4503);
  font-weight: 700;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.article-details {
  flex: 1;
}

.article-date {
  font-size: 0.8rem;
  color: #718096;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: block;
  margin-bottom: 4px;
}

.article-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 1.25rem !important;
  font-weight: 500 !important;
  color: var(--vcn-darker, #1C3A13);
  margin: 0 !important;
}

.article-arrow {
  font-size: 1.4rem;
  color: var(--vcn-dark, #1D4503);
  opacity: 0.6;
  transition: all 0.3s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  border-color: var(--vcn-badge, #d3fa99);
  background: #FAFBEF;
  box-shadow: 0 10px 25px rgba(29, 69, 3, 0.06);
}

.article-card:hover .article-arrow {
  opacity: 1;
  transform: scale(1.1) translate(2px, -2px);
  color: var(--vcn-darker, #1C3A13);
}

/* ─── RESPONSIVE BREAKPOINTS ─────────────────────────── */
@media (max-width: 1200px) {
  .staggered-gallery {
    gap: 15px;
  }
  .gallery-col {
    gap: 15px;
  }
  .item-very-tall {
    height: 520px;
  }
  .spotlight-container {
    padding: 45px 30px;
    gap: 30px;
  }
  .spotlight-img-wrap {
    width: 280px;
    height: 280px;
  }
  .purpose-container {
    gap: 40px;
  }
  .purpose-img-card {
    height: 450px;
  }
}

@media (max-width: 991.98px) {
  .careers-hero-title,
  .section-title,
  .spotlight-name,
  .spotlight-eyebrow,
  .purpose-title,
  .cta-title {
    font-size: 32px !important;
    font-weight: 400 !important;
  }

  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section>.container-fluid {
    padding-left: 0 !important;
    padding-right: 0 !important;
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
    z-index: 100 !important;
  }

  .careers-container {
    gap: 40px;
  }

  .careers-lifestyle-section,
  .careers-spotlight-section,
  .careers-articles-section,
  .careers-purpose-section,
  .careers-cta-section {
    padding-left: 15px;
    padding-right: 15px;
  }

  .article-card {
    padding: 20px !important;
    gap: 16px !important;
  }

  .article-title {
    font-size: 1.1rem !important;
  }

  /* Responsive Hero Stacking */
  .careers-hero {
    flex-direction: column;
    height: auto;
    background: #FAF6F0;
    align-items: flex-start;
  }
  .careers-hero-bg-wrap {
    position: relative;
    width: 100%;
    height: 260px;
  }
  .careers-hero-overlay {
    background: linear-gradient(to top, #FAF6F0 0%, transparent 100%);
  }
  .careers-hero-content {
    padding: 30px 20px;
    max-width: 100%;
  }
  .careers-hero-actions {
    flex-direction: column;
    gap: 12px;
  }
  .careers-hero-actions .btn-filled,
  .careers-hero-actions .btn-outline {
    text-align: center;
    width: 100%;
  }

  /* Gallery Staggered to Grid */
  .staggered-gallery {
    flex-direction: column;
    gap: 15px;
  }
  .col-left, .col-center, .col-right {
    width: 100% !important;
  }
  .col-center {
    margin-top: 0 !important;
  }
  .gallery-item {
    height: 250px !important;
  }

  /* Spotlight Stacking */
  .spotlight-container {
    flex-direction: column;
    padding: 35px 20px;
    gap: 40px;
    text-align: center;
  }
  .spotlight-visual-col {
    width: 100% !important;
  }
  .spotlight-img-wrap {
    width: 240px;
    height: 240px;
    margin: 0 auto;
  }
  .quote-badge {
    position: static;
    margin: 20px auto 0;
    max-width: 100%;
    text-align: left;
  }
  .spotlight-text-col {
    width: 100% !important;
  }
  .spotlight-link {
    justify-content: center;
  }

  /* Purpose Stacking */
  .purpose-container {
    flex-direction: column;
    gap: 30px;
  }
  .purpose-text-col {
    width: 100% !important;
  }
  .purpose-visual-col {
    width: 100% !important;
  }
  .purpose-img-card {
    height: 350px;
  }
  .stats-badge {
    position: static;
    margin-top: 20px;
    max-width: fit-content;
  }

  /* CTA */
  .cta-banner-card {
    padding: 45px 24px;
  }
  .cta-actions {
    flex-direction: column;
    gap: 12px;
  }
  .cta-btn-white,
  .cta-btn-outline {
    width: 100%;
    margin-right: 0 !important;
  }
}
</style>

<style>
/* Unscoped overrides for careers layout grid */
.product-details-page .col-lg-9 {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>

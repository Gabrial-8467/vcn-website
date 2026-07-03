<script setup>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'
import { ABOUT_PAGE_DATA } from '~/constants/pages/about'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

await useAsyncData('about-us-cms', () => cmsStore.fetchSectionsBySlug('about'))

const about = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'about-hero')
  const welcomeSec = sections.find(s => s.name === 'welcome' || s.sectionKey === 'about-welcome')
  const contentSec = sections.find(s => s.name === 'content' || s.sectionKey === 'about-content')
  const moreAboutSec = sections.find(s => s.name === 'moreAboutUs' || s.sectionKey === 'about-more')
  const fallback = cmsStore.getPageSection('about', 'about')

  const rawHeroImage = heroSec?.image || heroSec?.extraData?.image
  let heroBannerImage = ''
  if (rawHeroImage) {
    heroBannerImage = typeof rawHeroImage === 'string' ? rawHeroImage : getCmsImageUrl(rawHeroImage)
  }

  let parsedDescription = fallback?.description || []
  if (contentSec?.description) {
    parsedDescription = contentSec.description.split('\n').filter(p => p.trim())
  }

  let parsedSections = fallback?.sections || []
  if (contentSec?.items?.length > 0) {
    parsedSections = contentSec.items.map(item => ({
      title: item.extraData?.title || item.title || '',
      content: item.extraData?.content || (item.description ? [item.description] : [])
    }))
  }

  let parsedMoreAboutItems = fallback?.moreAboutUs?.[0]?.items || []
  let parsedMoreAboutCta = fallback?.moreAboutUs?.[0]?.ctaCards || []
  if (moreAboutSec?.items?.length > 0) {
    const navItems = moreAboutSec.items.filter(i => i.name?.startsWith('nav-item'))
    if (navItems.length > 0) {
      parsedMoreAboutItems = navItems.map(item => ({
        title: item.extraData?.title || item.title || '',
        icon: item.extraData?.icon || item.icon || 'bi-bullseye',
        iconClass: item.extraData?.iconClass || 'icon-journey'
      }))
    }
    const ctaItems = moreAboutSec.items.filter(i => i.name?.startsWith('cta-card'))
    if (ctaItems.length > 0) {
      parsedMoreAboutCta = ctaItems.map(item => ({
        title: item.extraData?.title || item.title || '',
        icon: item.extraData?.icon || item.icon || 'bi-bullseye',
        iconClass: item.extraData?.iconClass || 'icon-shopping',
        buttonText: item.extraData?.buttonText || item.buttonText || 'Start Shopping'
      }))
    }
  }

  return {
    heroImage: heroBannerImage || fallback?.heroImage || '/img/about/about-us.png',
    welcome: { title: welcomeSec?.title || fallback?.welcome?.title || 'Welcome to the world of VCN!', subtitle: welcomeSec?.subtitle || fallback?.welcome?.subtitle || 'Helping people live better lives' },
    heading: contentSec?.title || fallback?.heading || 'This is VCN',
    description: parsedDescription,
    sections: parsedSections,
    moreAboutUs: [{ heading: moreAboutSec?.title || fallback?.moreAboutUs?.[0]?.heading || 'More About Us', items: parsedMoreAboutItems, ctaCards: parsedMoreAboutCta }]
  }
})

const moreAbout = computed(() => about.value?.moreAboutUs?.[0])

// Use first 3 timeline phases for the story cards
const storyCards = computed(() => {
  const timeline = ABOUT_PAGE_DATA.ourJourney.timeline
  return [
    { year: '2009', phase: timeline[0].title, desc: timeline[0].description.slice(0, 160) + '…' },
    { year: '2015', phase: timeline[1].title, desc: timeline[1].description.slice(0, 160) + '…' },
    { year: 'Present Day', phase: 'Leading the Future', desc: 'Today, VCN Lifestyle is a household name, synonymous with modern wellness and a commitment to sustainable growth.' }
  ]
})

// Icon map for the 4 right-panel feature cards
const featureIcons = ['bi-flower1', 'bi-recycle', 'bi-people-fill', 'bi-lightbulb']
const featureLabels = ['Philosophy', 'Sustainability', 'Community', 'Innovation']

useHead({ bodyAttrs: { class: 'product-details-page' } })
</script>

<template>
  <section class="product-detail-section mt-3">
    <div class="container-fluid">
      <div class="row g-0">

        <!-- Sidebar -->
        <div class="col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <!-- Main Content -->
        <div class="col-lg-9 ab-main">

          <div class="row g-0 ab-top-row">

            <!-- Hero / intro column -->
            <div class="col-lg-7 ab-hero-col">
              <div class="ab-hero">
                <img :src="about.heroImage" alt="VCN About Us" class="ab-hero-bg" />
                <div class="ab-hero-gradient"></div>
                <div class="ab-hero-content">
                  <em class="ab-eyebrow">Our Story</em>
                  <h1 class="ab-hero-title">{{ about.welcome.title }}</h1>
                  <p class="ab-hero-sub">{{ about.welcome.subtitle }}</p>
                  <NuxtLink to="/our-journey" class="ab-hero-btn">Discover Our Story →</NuxtLink>
                </div>
              </div>

              <!-- 4 mini feature cards strip below the hero image -->
              <!-- <div class="ab-mini-cards">
                <div
                  v-for="(label, i) in featureLabels"
                  :key="i"
                  class="ab-mini-card"
                >
                  <i class="bi" :class="featureIcons[i]"></i>
                  <span>{{ label }}</span>
                </div>
              </div> -->
            </div>

            <!-- Right panel: More About Us cards -->
            <div class="col-lg-5 ab-right-panel">
              <div class="ab-right-header">
                More About Us&nbsp;<i class="bi bi-arrow-down-right"></i>
              </div>

              <!-- Welcome card (large green) -->
              <div class="ab-welcome-card">
                <h3 class="ab-welcome-title">Welcome</h3>
                <p class="ab-welcome-text">{{ about.description[0] }}</p>
              </div>

              <!-- 4 small icon cards in 2x2 grid -->
              <div class="row g-2 ab-grid-cards">
                <div v-for="(item, i) in moreAbout.items" :key="i" class="col-6">
                  <div class="ab-grid-card">
                    <i class="bi" :class="item.icon"></i>
                    <span>{{ item.title }}</span>
                  </div>
                </div>
              </div>

              <!-- Decorative spice image -->
              <!-- <div class="ab-deco-img-wrap">
                <img src="/img/about/about-us.png" alt="VCN Wellness" class="ab-deco-img" />
              </div> -->
            </div>
          </div>
          <div class="ab-mission">
            <div class="row g-0 align-items-center">
              <div class="col-md-6 ab-mission-text">
                <span class="ab-tag">THE MISSION</span>
                <h2 class="ab-section-h">{{ about.heading }}</h2>
                <p v-for="(para, i) in about.description.slice(0, 2)" :key="i" class="ab-para">{{ para }}</p>
              </div>
              <div class="col-md-6 ab-mission-visual">
                <div class="ab-visual-card">
                  <img :src="about.heroImage" alt="VCN mission visual" class="ab-visual-img" />
                  <div class="ab-visual-overlay">
                    <span>{{ about.heading }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="ab-story">
            <h2 class="ab-story-title">Our Story</h2>
            <div class="ab-story-divider"></div>
            <div class="row g-4">
              <div v-for="(card, i) in storyCards" :key="i" class="col-md-4">
                <div class="ab-story-card">
                  <div class="ab-story-year">{{ card.year }}</div>
                  <div class="ab-story-phase">{{ card.phase }}</div>
                  <p class="ab-story-desc">{{ card.desc }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="ab-info-cols">
            <div class="row g-4">
              <div v-for="(sec, i) in about.sections.slice(1, 3)" :key="i" class="col-md-6">
                <div class="ab-info-block">
                  <div class="ab-info-icon-wrap">
                    <i class="bi" :class="i === 0 ? 'bi-heart-pulse-fill' : 'bi-people-fill'"></i>
                  </div>
                  <h3 class="ab-info-h">{{ sec.title }}</h3>
                  <p v-for="(p, j) in sec.content" :key="j" class="ab-info-p">{{ p }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="ab-more-dark">
            <h2 class="ab-more-dark-h">{{ moreAbout.heading }}</h2>
            <div class="row g-3 justify-content-center">
              <div v-for="(item, i) in moreAbout.items" :key="i" class="col-6 col-md-3">
                <div class="ab-more-nav-card">
                  <i class="bi" :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="ab-cta-section">
            <div class="row g-4 justify-content-center">
              <div v-for="(card, i) in moreAbout.ctaCards" :key="i" class="col-md-5">
                <div class="ab-cta-card" :class="i === 0 ? 'ab-cta-gold' : 'ab-cta-light'">
                  <div class="ab-cta-icon">
                    <i class="bi" :class="card.icon"></i>
                  </div>
                  <h3 class="ab-cta-title">{{ card.title }}</h3>
                  <p v-if="i === 0" class="ab-cta-desc">Take our wellness quiz to find the perfect supplements and
                    routines for your unique lifestyle.</p>
                  <p v-else class="ab-cta-desc">Join our network of partners and build a sustainable business while
                    promoting health and happiness.</p>
                  <a href="#" class="ab-cta-btn-link">{{ card.buttonText }} ↗</a>
                </div>
              </div>
            </div>
          </div>

        </div>
        <!-- / ab-main -->

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Layout */
.ab-main {
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.08);
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.04);
  border-radius: 24px;
  overflow: hidden;
}

/* TOP ROW */
.ab-top-row {
  min-height: 520px;
}

/* Hero column */
.ab-hero-col {
  display: flex;
  flex-direction: column;
}

.ab-hero {
  position: relative;
  flex: 1;
  overflow: hidden;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.ab-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  z-index: 1;
}

.ab-hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right,
      rgba(29, 69, 3, 0.72) 0%,
      rgba(29, 69, 3, 0.30) 60%,
      transparent 100%);
  z-index: 2;
}

.ab-hero-content {
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px 36px;
  max-width: 480px;
}

.ab-eyebrow {
  font-style: italic;
  font-size: 0.9rem;
  color: var(--vcn-badge, #d3fa99);
  letter-spacing: 1px;
  margin-bottom: 10px;
}

.ab-hero-title {
  font-size: clamp(1.5rem, 3vw, 2.4rem);
  font-weight: 700;
  color: var(--vcn-white, #fff);
  line-height: 1.2;
  margin-bottom: 12px;
}

.ab-hero-sub {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 22px;
}

.ab-hero-btn {
  display: inline-block;
  background: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff);
  border: 2px solid var(--vcn-badge, #d3fa99);
  padding: 10px 24px;
  border-radius: 50px;
  font-size: 0.9rem;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  transition: all 0.25s ease;
}

.ab-hero-btn:hover {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
  border-color: var(--vcn-badge, #d3fa99);
}

/* Mini feature cards strip */
.ab-mini-cards {
  display: flex;
  background: var(--vcn-base-bg, #F6F7EE);
}

.ab-mini-card {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 18px 10px;
  border-right: 1px solid rgba(29, 69, 3, 0.12);
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--vcn-dark, #1D4503);
  transition: background 0.2s;
  cursor: default;
}

.ab-mini-card:last-child {
  border-right: none;
}

.ab-mini-card i {
  font-size: 1.3rem;
  color: var(--vcn-dark, #1D4503);
}

.ab-mini-card:hover {
  background: rgba(29, 69, 3, 0.06);
}

/* Right panel */
.ab-right-panel {
  background: var(--vcn-white, #fff);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-left: 1px solid rgba(29, 69, 3, 0.08);
}

.ab-right-header {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vcn-dark, #1D4503);
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.ab-welcome-card {
  background: var(--vcn-dark, #1D4503);
  border-radius: 14px;
  padding: 22px 20px;
  color: var(--vcn-white, #fff);
}

.ab-welcome-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  color: var(--vcn-badge, #d3fa99);
}

.ab-welcome-text {
  font-size: 0.82rem;
  line-height: 1.65;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.ab-grid-cards {
  display: flex !important;
  flex-wrap: wrap;
  gap: 8px;
  /* This creates even space between all items */
  margin: 0 !important;
  /* Reset negative margins */
}

.row.ab-grid-cards > .col-6 {
    /* Adjust width to account for the gap: (100% - gap) / 2 */
    width: calc(50% - 4px) !important; 
    margin: 0 !important;
    padding: 0 !important;
}

.ab-grid-card {
  background: var(--vcn-base-bg, #F6F7EE);
  border-radius: 10px;
  padding: 14px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  font-weight: 500;
  color: var(--vcn-dark, #1D4503);
  text-align: center;
  border: 1px solid rgba(29, 69, 3, 0.10);
  transition: transform 0.2s, box-shadow 0.2s;
}

.ab-grid-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(29, 69, 3, 0.10);
}

.ab-grid-card i {
  font-size: 1.4rem;
  color: var(--vcn-dark, #1D4503);
}

.ab-deco-img-wrap {
  flex: 1;
  border-radius: 14px;
  overflow: hidden;
  min-height: 120px;
}

.ab-deco-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  border-radius: 14px;
}

/* THE MISSION */
.ab-mission {
  padding: 70px 50px;
  background: var(--vcn-white, #fff);
}

.ab-tag {
  display: inline-block;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--vcn-dark, #1D4503);
  opacity: 0.55;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.ab-section-h {
  font-size: clamp(1.6rem, 2.5vw, 2.4rem);
  font-weight: 700;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 20px;
  line-height: 1.2;
}

.ab-para {
  font-size: 0.96rem;
  line-height: 1.85;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.85;
  margin-bottom: 16px;
}

.ab-mission-visual {
  padding-left: 40px;
}

.ab-visual-card {
  border-radius: 18px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 20px 50px rgba(29, 69, 3, 0.12);
}

.ab-visual-img {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.ab-visual-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(29, 69, 3, 0.85), transparent);
  padding: 24px 20px 18px;
  color: var(--vcn-white, #fff);
  font-size: 1.1rem;
  font-weight: 600;
}

/* OUR STORY */
.ab-story {
  padding: 60px 50px;
  background: var(--vcn-base-bg, #F6F7EE);
}

.ab-story-title {
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 10px;
}

.ab-story-divider {
  width: 48px;
  height: 3px;
  background: var(--vcn-dark, #1D4503);
  border-radius: 2px;
  margin: 0 auto 40px;
}

.ab-story-card {
  background: var(--vcn-white, #fff);
  border-radius: 14px;
  padding: 28px 24px;
  height: 100%;
  box-shadow: 0 4px 20px rgba(29, 69, 3, 0.06);
  border: 1px solid rgba(29, 69, 3, 0.07);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.ab-story-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(29, 69, 3, 0.12);
}

.ab-story-year {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--vcn-dark, #1D4503);
  margin-bottom: 4px;
}

.ab-story-phase {
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--vcn-primary, #5E6C1F);
  letter-spacing: 0.5px;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.ab-story-desc {
  font-size: 0.9rem;
  line-height: 1.75;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.8;
  margin: 0;
}
/* Restore gutters for the story grid */
.ab-story .row.g-4 > [class^="col-"] {
    padding-right: 12px !important; /* Half of g-4 (1.5rem / 2) */
    padding-left: 12px !important;  /* Half of g-4 (1.5rem / 2) */
}

/* Ensure the cards inside don't have conflicting margins */
.ab-story-card {
    margin: 0 !important;
}

/* TWO-COL INFO BLOCKS */
.ab-info-cols {
  padding: 70px 50px;
  background: var(--vcn-white, #fff);
}

.ab-info-block {
  padding: 10px 0;
}

.ab-info-icon-wrap {
  width: 52px;
  height: 52px;
  background: rgba(29, 69, 3, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
}

.ab-info-icon-wrap i {
  font-size: 1.4rem;
  color: var(--vcn-dark, #1D4503);
}

.ab-info-h {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--vcn-darker, #1C3A13);
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.ab-info-p {
  font-size: 0.95rem;
  line-height: 1.80;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.8;
  margin: 0;
}

/* MORE ABOUT US - dark green banner */
.ab-more-dark {
  background: var(--vcn-dark, #1D4503);
  padding: 60px 50px;
}

.ab-more-dark-h {
  text-align: center;
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--vcn-white, #fff);
  margin-bottom: 36px;
}

.ab-more-nav-card {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 28px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--vcn-white, #fff);
  font-size: 0.88rem;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: all 0.25s ease;
}

.ab-more-nav-card:hover {
  background: rgba(211, 250, 153, 0.18);
  border-color: var(--vcn-badge, #d3fa99);
  color: var(--vcn-badge, #d3fa99);
}

.ab-more-nav-card i {
  font-size: 1.8rem;
}

/* BOTTOM CTA CARDS */
.ab-cta-section {
  padding: 60px 50px;
  background: var(--vcn-white, #fff);
}

.ab-cta-card {
  border-radius: 18px;
  padding: 40px 32px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;
}

.ab-cta-gold {
  background: var(--vcn-base-bg, #F6F7EE);
  border: 1px solid rgba(29, 69, 3, 0.12);
}

.ab-cta-light {
  background: #fff;
  border: 1px solid rgba(29, 69, 3, 0.10);
}

.ab-cta-icon {
  width: 56px;
  height: 56px;
  background: rgba(29, 69, 3, 0.08);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
}

.ab-cta-icon i {
  font-size: 1.5rem;
  color: var(--vcn-dark, #1D4503);
  opacity: 0.6;
}

.ab-cta-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--vcn-darker, #1C3A13);
  margin: 0;
}

.ab-cta-desc {
  font-size: 0.9rem;
  line-height: 1.7;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.8;
  margin: 0;
  flex: 1;
}

.ab-cta-btn-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff);
  border-radius: 50px;
  padding: 10px 22px;
  font-size: 0.88rem;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  transition: all 0.25s ease;
  margin-top: 4px;
}

.ab-cta-btn-link:hover {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
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

/* Fix for all grids on the page */
.row[class*='g-'] > [class^="col-"],
.row[class*='g-'] > [class*=" col-"] {
    padding-right: calc(var(--bs-gutter-x) * .5) !important;
    padding-left: calc(var(--bs-gutter-x) * .5) !important;
    margin-top: var(--bs-gutter-y) !important;
}

/* Ensure the row itself doesn't have extra top margin if you're using g- classes */
.row[class*='g-'] {
    margin-top: calc(-1 * var(--bs-gutter-y)) !important;
}

/* MOBILE OVERRIDES */
@media (max-width: 991.98px) {
  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section>.container-fluid {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .ab-top-row {
    min-height: auto;
  }

  .ab-hero-content {
    padding: 28px 20px;
  }

  .ab-hero-title {
    font-size: 1.6rem;
  }

  .ab-mission,
  .ab-story,
  .ab-info-cols,
  .ab-more-dark,
  .ab-cta-section {
    padding: 40px 20px;
  }

  .ab-mission-visual {
    padding-left: 20px;
  }

  .ab-right-panel {
    border-left: none;
    border-top: 1px solid rgba(29, 69, 3, 0.08);
  }
  .ab-top-row {
        padding-left: 15px !important;
        padding-right: 15px !important;
        /* Ensure the width takes this padding into account */
        box-sizing: border-box;
    }
}

@media (max-width: 767.98px) {
  .ab-mission-visual {
    padding-left: 0;
    margin-top: 30px;
  }

  .ab-cta-card {
    padding: 30px 24px;
  }
}

@media (max-width: 575.98px) {
  .ab-mini-card span {
    display: none;
  }

  .ab-mini-card {
    padding: 14px 6px;
  }

  .ab-hero-title {
    font-size: 1.35rem;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .ab-right-panel {
    padding: 20px 16px;
    gap: 12px;
  }

  .ab-welcome-card {
    padding: 16px 14px;
  }

  .ab-grid-card {
    padding: 10px 8px;
    font-size: 0.75rem;
  }

  .ab-hero-content {
    padding: 30px 24px;
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
.product-detail-section .container-fluid,
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
}
</style>

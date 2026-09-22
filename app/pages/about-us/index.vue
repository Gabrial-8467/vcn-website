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
  const metricsSec = sections.find(s => s.name === 'metrics' || s.sectionKey === 'about-metrics')
  const valuesSec = sections.find(s => s.name === 'values' || s.sectionKey === 'about-values')
  const missionSec = sections.find(s => s.name === 'mission' || s.sectionKey === 'about-mission')
  const timelineSec = sections.find(s => s.name === 'timeline' || s.sectionKey === 'about-timeline')
  const leadershipSec = sections.find(s => s.name === 'leadership' || s.sectionKey === 'about-leadership')
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

  let parsedBadges = fallback?.heroBadges || []
  if (heroSec?.items?.some(i => i.name?.startsWith('badge'))) {
    parsedBadges = heroSec.items.filter(i => i.name?.startsWith('badge')).map(item => ({
      text: item.title || '',
      accent: !!item.extraData?.accent
    }))
  } else if (heroSec?.extraData?.badges?.length > 0) {
    parsedBadges = heroSec.extraData.badges
  }

  let parsedHeroButton = fallback?.heroButton || { text: 'Discover Our Story', link: '/our-journey' }
  if (heroSec?.buttonText) {
    parsedHeroButton = {
      text: heroSec.buttonText,
      link: heroSec.buttonLink || parsedHeroButton.link
    }
  }

  let parsedMetrics = fallback?.metrics || []
  if (metricsSec?.items?.length > 0) {
    parsedMetrics = metricsSec.items.map(item => ({
      value: item.extraData?.value || item.title || '',
      label: item.extraData?.label || item.subtitle || ''
    }))
  }

  let parsedValues = fallback?.values || { tag: 'OUR CORE PILLARS', title: 'What Defines VCN', items: [] }
  if (valuesSec) {
    parsedValues = {
      tag: valuesSec?.subtitle || valuesSec?.extraData?.tag || parsedValues.tag,
      title: valuesSec?.title || parsedValues.title,
      items: valuesSec?.items?.length > 0
        ? valuesSec.items.map(item => ({
            icon: item.extraData?.icon || item.icon || 'bi-flower1',
            title: item.title || '',
            text: item.extraData?.text || (item.description || '')
          }))
        : parsedValues.items
    }
  }

  let parsedMission = fallback?.mission || { tag: 'THE MISSION', quote: 'Making Life Better Since 2009', fallbackText: '' }
  if (missionSec) {
    parsedMission = {
      tag: missionSec?.subtitle || missionSec?.extraData?.tag || parsedMission.tag,
      quote: missionSec?.extraData?.quote || parsedMission.quote,
      fallbackText: missionSec?.extraData?.fallbackText || missionSec?.description || parsedMission.fallbackText
    }
  }

  let parsedTimeline = fallback?.timeline || { tag: 'OUR JOURNEY', title: 'Milestones of Progress', buttonText: 'View Full Timeline', buttonLink: '/our-journey', items: [] }
  if (timelineSec) {
    parsedTimeline = {
      tag: timelineSec?.subtitle || timelineSec?.extraData?.tag || parsedTimeline.tag,
      title: timelineSec?.title || parsedTimeline.title,
      buttonText: timelineSec?.buttonText || parsedTimeline.buttonText,
      buttonLink: timelineSec?.buttonLink || parsedTimeline.buttonLink,
      items: timelineSec?.items?.length > 0
        ? timelineSec.items.map(item => ({
            year: item.extraData?.year || item.title || '',
            phase: item.extraData?.phase || item.subtitle || item.title || '',
            desc: item.extraData?.desc || (item.description || '')
          }))
        : parsedTimeline.items
    }
  }

  let parsedLeadership = fallback?.leadership || { tag: 'OUR LEADERSHIP', heading: '', text: '', buttonText: 'Meet Our Leadership', buttonLink: '/our-leadership' }
  if (leadershipSec) {
    parsedLeadership = {
      tag: leadershipSec?.subtitle || leadershipSec?.extraData?.tag || parsedLeadership.tag,
      heading: leadershipSec?.title || parsedLeadership.heading,
      text: leadershipSec?.description || parsedLeadership.text,
      buttonText: leadershipSec?.buttonText || parsedLeadership.buttonText,
      buttonLink: leadershipSec?.buttonLink || parsedLeadership.buttonLink
    }
  }

  let parsedMoreAboutItems = fallback?.moreAboutUs?.[0]?.items || []
  let parsedMoreAboutCta = fallback?.moreAboutUs?.[0]?.ctaCards || []
  if (moreAboutSec?.items?.length > 0) {
    const navItems = moreAboutSec.items.filter(i => i.name?.startsWith('nav-item'))
    if (navItems.length > 0) {
      parsedMoreAboutItems = navItems.map(item => ({
        title: item.extraData?.title || item.title || '',
        icon: item.extraData?.icon || item.icon || 'bi-bullseye',
        iconClass: item.extraData?.iconClass || 'icon-journey',
        link: item.extraData?.link || item.link || ''
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
    heroBadges: parsedBadges,
    heroButton: parsedHeroButton,
    welcome: { title: welcomeSec?.title || fallback?.welcome?.title || 'Welcome to the world of VCN!', subtitle: welcomeSec?.subtitle || fallback?.welcome?.subtitle || 'Helping people live better lives' },
    welcomeExtras: {
      tag: welcomeSec?.extraData?.tag || welcomeSec?.subtitle || fallback?.welcome?.tag || 'WELCOME TO VCN',
      heading: welcomeSec?.extraData?.heading || welcomeSec?.items?.[0]?.title || fallback?.welcome?.heading || 'Holistic Health Meets Modern Science',
      philosophyTitle: welcomeSec?.extraData?.philosophyTitle || welcomeSec?.items?.[1]?.title || fallback?.welcome?.philosophyTitle || 'Our Philosophy',
      philosophyText: welcomeSec?.extraData?.philosophyText || welcomeSec?.items?.[1]?.description || fallback?.welcome?.philosophyText || ''
    },
    metrics: parsedMetrics,
    values: parsedValues,
    mission: parsedMission,
    timeline: parsedTimeline,
    leadership: parsedLeadership,
    heading: contentSec?.title || fallback?.heading || 'This is VCN',
    description: parsedDescription,
    sections: parsedSections,
    moreAboutUs: [{ heading: moreAboutSec?.title || fallback?.moreAboutUs?.[0]?.heading || 'More About Us', items: parsedMoreAboutItems, ctaCards: parsedMoreAboutCta }]
  }
})

const moreAbout = computed(() => about.value?.moreAboutUs?.[0])

// Timeline story cards (fallback to ABOUT_PAGE_DATA.ourJourney when CMS timeline empty)
const storyCards = computed(() => {
  const timeline = about.value?.timeline?.items
  if (timeline && timeline.length > 0) {
    return timeline.map(card => ({
      year: card.year,
      phase: card.phase,
      desc: card.desc.length > 160 ? card.desc.slice(0, 160) + '…' : card.desc
    }))
  }
  const ourJourney = ABOUT_PAGE_DATA.ourJourney.timeline
  return [
    { year: '2009', phase: ourJourney[0].title, desc: ourJourney[0].description.slice(0, 160) + '…' },
    { year: '2015', phase: ourJourney[1].title, desc: ourJourney[1].description.slice(0, 160) + '…' },
    { year: 'Present Day', phase: 'Leading the Future', desc: 'Today, VCN Lifestyle is a household name, synonymous with modern wellness and a commitment to sustainable growth.' }
  ]
})

useHead({ bodyAttrs: { class: 'product-details-page' } })
</script>

<template>
  <section class="product-detail-section mt-3">
    <div class="container">
      <div class="row g-0">

        <!-- Sidebar -->
        <div class="col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <!-- Main Content -->
        <div class="col-lg-9 ab-main">

          <!-- 1. Hero Section -->
          <div class="ab-hero">
            <img :src="about.heroImage" alt="VCN About Us" class="ab-hero-bg" />
            <div class="ab-hero-gradient"></div>
            <div class="ab-hero-content">
              <div class="ab-badge-container">
                <span v-for="(badge, bi) in about.heroBadges" :key="bi" class="ab-badge" :class="{ 'badge-accent': badge.accent }">{{ badge.text }}</span>
              </div>
              <h1 class="ab-hero-title">{{ about.welcome.title }}</h1>
              <p class="ab-hero-sub">{{ about.welcome.subtitle }}</p>
              <NuxtLink :to="about.heroButton.link" class="ab-hero-btn">
                {{ about.heroButton.text }} <i class="bi bi-arrow-right"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- 2. Impact/Metrics Strip -->
          <div class="ab-metrics-strip">
            <div class="row g-0 text-center">
              <div v-for="(metric, mi) in about.metrics" :key="mi" class="col-6 col-md-3 metric-item">
                <div class="metric-num">{{ metric.value }}</div>
                <div class="metric-label">{{ metric.label }}</div>
              </div>
            </div>
          </div>

          <!-- 3. Welcome & Philosophy (Introduction) -->
          <div class="ab-welcome-section">
            <div class="row align-items-center g-4">
              <div class="col-md-7">
                <span class="ab-tag">{{ about.welcomeExtras.tag }}</span>
                <h2 class="ab-welcome-header">{{ about.welcomeExtras.heading }}</h2>
                <p class="ab-welcome-desc">{{ about.description[0] }}</p>
                <p v-if="about.description[1]" class="ab-welcome-desc">{{ about.description[1] }}</p>
              </div>
              <div class="col-md-5">
                <div class="ab-welcome-card-featured">
                  <div class="card-glow"></div>
                  <h4 class="card-featured-title">{{ about.welcomeExtras.philosophyTitle }}</h4>
                  <p class="card-featured-text">
                    {{ about.welcomeExtras.philosophyText }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 4. Core Values Grid -->
          <div class="ab-values-section">
            <div class="text-center mb-5">
              <span class="ab-tag">{{ about.values.tag }}</span>
              <h2 class="ab-values-title">{{ about.values.title }}</h2>
            </div>
            <div class="row g-4">
              <div v-for="(valueCard, vi) in about.values.items" :key="vi" class="col-md-6">
                <div class="value-card">
                  <div class="value-icon-wrapper">
                    <i class="bi" :class="valueCard.icon"></i>
                  </div>
                  <h3 class="value-card-title">{{ valueCard.title }}</h3>
                  <p class="value-card-text">
                    {{ valueCard.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- 5. Mission Block (Visual) -->
          <div class="ab-mission-block">
            <div class="row g-0 align-items-center">
              <div class="col-md-6 ab-mission-text">
                <span class="ab-tag tag-light">{{ about.mission.tag }}</span>
                <h2 class="ab-mission-h">{{ about.heading }}</h2>
                <p v-if="about.description[2]" class="ab-mission-p">{{ about.description[2] }}</p>
                <p v-else class="ab-mission-p">{{ about.mission.fallbackText }}</p>
              </div>
              <div class="col-md-6 ab-mission-visual">
                <div class="ab-visual-wrapper">
                  <img :src="about.heroImage" alt="VCN Mission" class="ab-visual-img" />
                  <div class="ab-visual-card-overlay">
                    <i class="bi bi-quote"></i>
                    <span>{{ about.mission.quote }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 6. Elegant Timeline Section -->
          <div class="ab-timeline-section">
            <div class="text-center mb-5">
              <span class="ab-tag">{{ about.timeline.tag }}</span>
              <h2 class="ab-timeline-title">{{ about.timeline.title }}</h2>
              <div class="ab-timeline-divider"></div>
            </div>
            <div class="timeline-container">
              <div class="timeline-line"></div>
              <div v-for="(card, i) in storyCards" :key="i" class="timeline-card-wrapper" :class="{ 'timeline-card-right': i % 2 !== 0 }">
                <div class="timeline-dot"></div>
                <div class="timeline-card">
                  <div class="timeline-year">{{ card.year }}</div>
                  <h4 class="timeline-phase">{{ card.phase }}</h4>
                  <p class="timeline-desc">{{ card.desc }}</p>
                </div>
              </div>
            </div>
            <div class="text-center mt-4">
              <NuxtLink :to="about.timeline.buttonLink" class="ab-timeline-more-btn">
                {{ about.timeline.buttonText }} <i class="bi bi-arrow-right-short"></i>
              </NuxtLink>
            </div>
          </div>

          <!-- 7. Strengths / Info Section -->
          <div class="ab-strengths-section">
            <div class="row g-4">
              <div v-for="(sec, i) in about.sections.slice(1, 3)" :key="i" class="col-md-6">
                <div class="strength-card">
                  <div class="strength-icon">
                    <i class="bi" :class="i === 0 ? 'bi-shield-check' : 'bi-gem'"></i>
                  </div>
                  <h3 class="strength-title">{{ sec.title }}</h3>
                  <p v-for="(p, j) in sec.content" :key="j" class="strength-desc">{{ p }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 8. Meet Leadership Teaser Banner -->
          <div class="ab-leadership-teaser">
            <div class="row align-items-center g-4">
              <div class="col-lg-8">
                <span class="ab-tag tag-light">{{ about.leadership.tag }}</span>
                <h3 class="teaser-heading">{{ about.leadership.heading }}</h3>
                <p class="teaser-text">
                  {{ about.leadership.text }}
                </p>
              </div>
              <div class="col-lg-4 text-lg-end">
                <NuxtLink :to="about.leadership.buttonLink" class="teaser-btn">
                  {{ about.leadership.buttonText }} <i class="bi bi-chevron-right"></i>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- 9. Navigation links & Call to Actions -->
          <div class="ab-quick-nav">
            <div class="container-fluid">
              <h3 class="quick-nav-title">{{ moreAbout.heading }}</h3>
              <div class="row g-3 justify-content-center">
                <div v-for="(item, i) in moreAbout.items" :key="i" class="col-6 col-md-3">
                  <NuxtLink :to="item.link" class="quick-nav-card">
                    <div class="quick-nav-icon">
                      <i class="bi" :class="item.icon"></i>
                    </div>
                    <span>{{ item.title }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <!-- 10. Split Action CTAs -->
          <div class="ab-split-cta">
            <div class="row g-4">
              <div v-for="(card, i) in moreAbout.ctaCards" :key="i" class="col-md-6">
                <div class="cta-banner" :class="i === 0 ? 'cta-primary' : 'cta-accent'">
                  <div class="cta-shape"></div>
                  <div class="cta-inner">
                    <div class="cta-icon">
                      <i class="bi" :class="card.icon"></i>
                    </div>
                    <h3 class="cta-title">{{ card.title }}</h3>
                    <NuxtLink to="/all-products" class="cta-button">
                      {{ card.buttonText }} <i class="bi bi-arrow-up-right"></i>
                    </NuxtLink>
                  </div>
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
/* Layout Base styling */
.ab-main {
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.08);
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.04);
  border-radius: 24px;
  overflow: hidden;
}

/* 1. Hero Section styling */
.ab-hero {
  position: relative;
  overflow: hidden;
  min-height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-radius: 20px;
  margin: 24px;
  box-shadow: 0 20px 40px rgba(29, 69, 3, 0.1);
}

.ab-hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
  transition: transform 1.5s ease;
}

.ab-hero:hover .ab-hero-bg {
  transform: scale(1.04);
}

.ab-hero-gradient {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(29, 69, 3, 0.85) 0%,
    rgba(29, 69, 3, 0.4) 60%,
    transparent 100%
  );
  z-index: 2;
}

.ab-hero-content {
  position: relative;
  z-index: 3;
  padding: 60px 40px;
  max-width: 600px;
}

.ab-badge-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.ab-badge {
  display: inline-block;
  background: rgba(29, 69, 3, 0.85);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 6px 14px;
  border-radius: 6px;
  color: var(--vcn-white, #fff);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 1px;
}

.badge-accent {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
  font-weight: 700;
  border: 1px solid transparent;
}

.ab-hero-title {
  font-size: clamp(2rem, 3.5vw, 3rem) !important;
  font-weight: 700 !important;
  color: var(--vcn-white, #fff) !important;
  line-height: 1.15 !important;
  margin-bottom: 12px !important;
}

.ab-hero-sub {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 28px;
  line-height: 1.5;
}

.ab-hero-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff);
  border: 2px solid var(--vcn-badge, #d3fa99);
  padding: 12px 28px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  width: fit-content;
  transition: all 0.25s ease;
  box-shadow: 0 4px 15px rgba(29, 69, 3, 0.2);
}

.ab-hero-btn i {
  transition: transform 0.2s ease;
}

.ab-hero-btn:hover {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
  border-color: var(--vcn-badge, #d3fa99);
  box-shadow: 0 6px 20px rgba(211, 250, 153, 0.3);
}

.ab-hero-btn:hover i {
  transform: translateX(4px);
}

/* 2. Impact/Metrics Strip */
.ab-metrics-strip {
  background: var(--vcn-dark, #1D4503);
  border-radius: 16px;
  margin: 0 24px 48px 24px;
  padding: 28px 20px;
  box-shadow: 0 8px 24px rgba(29, 69, 3, 0.08);
}

.metric-item {
  border-right: 1px solid rgba(255, 255, 255, 0.15);
  padding: 10px 15px;
}

.metric-item:last-child {
  border-right: none;
}

.metric-num {
  font-size: clamp(1.8rem, 3vw, 2.5rem);
  font-weight: 700;
  color: var(--vcn-badge, #d3fa99);
  margin-bottom: 4px;
  line-height: 1;
}

.metric-label {
  font-size: 11px;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
  font-weight: 600;
}

/* 3. Welcome Section styling */
.ab-welcome-section {
  padding: 0 40px 60px 40px;
}

.ab-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--vcn-primary, #5E6C1F);
  margin-bottom: 12px;
  text-transform: uppercase;
}

.tag-light {
  color: var(--vcn-badge, #d3fa99);
}

.ab-welcome-header {
  font-size: clamp(1.8rem, 3vw, 2.6rem) !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  line-height: 1.25 !important;
  margin-bottom: 24px !important;
}

.ab-welcome-desc {
  font-size: 16px !important;
  line-height: 1.8 !important;
  color: rgba(28, 58, 19, 0.85);
  margin-bottom: 18px;
}

.ab-welcome-card-featured {
  background: var(--vcn-base-bg, #F6F7EE);
  border: 1px solid rgba(29, 69, 3, 0.08);
  border-radius: 18px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 25px rgba(29, 69, 3, 0.03);
}

.card-glow {
  position: absolute;
  top: -40px;
  right: -40px;
  width: 120px;
  height: 120px;
  background: rgba(211, 250, 153, 0.4);
  filter: blur(35px);
  border-radius: 50%;
  pointer-events: none;
}

.card-featured-title {
  font-size: 22px !important;
  font-weight: 600 !important;
  color: var(--vcn-dark, #1D4503) !important;
  margin-bottom: 14px !important;
}

.card-featured-text {
  font-size: 15px !important;
  line-height: 1.75 !important;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.9;
  margin: 0;
}

/* 4. Core Values Grid styling */
.ab-values-section {
  padding: 70px 40px;
  background: rgba(246, 247, 238, 0.4);
  border-top: 1px solid rgba(29, 69, 3, 0.05);
  border-bottom: 1px solid rgba(29, 69, 3, 0.05);
}

.ab-values-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem) !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
}

.value-card {
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.06);
  border-radius: 16px;
  padding: 36px;
  height: 100%;
  transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 15px rgba(29, 69, 3, 0.02);
}

.value-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 36px rgba(29, 69, 3, 0.07);
  border-color: rgba(29, 69, 3, 0.12);
}

.value-icon-wrapper {
  width: 58px;
  height: 58px;
  background: rgba(29, 69, 3, 0.06);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vcn-dark, #1D4503);
  margin-bottom: 22px;
  transition: all 0.3s;
}

.value-card:hover .value-icon-wrapper {
  background: var(--vcn-dark, #1D4503);
  color: var(--vcn-badge, #d3fa99);
}

.value-icon-wrapper i {
  font-size: 26px;
}

.value-card-title {
  font-size: 20px !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  margin-bottom: 12px !important;
}

.value-card-text {
  font-size: 15px !important;
  line-height: 1.7 !important;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.8;
  margin: 0;
}

/* 5. Mission Block styling */
.ab-mission-block {
  padding: 80px 40px;
}

.ab-mission-text {
  padding-right: 40px;
}

.ab-mission-h {
  font-size: clamp(2rem, 3vw, 2.6rem) !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  line-height: 1.25 !important;
  margin-bottom: 24px !important;
}

.ab-mission-p {
  font-size: 16px !important;
  line-height: 1.8 !important;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.85;
  margin-bottom: 18px;
}

.ab-mission-visual {
  display: flex;
  justify-content: center;
}

.ab-visual-wrapper {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(29, 69, 3, 0.12);
  width: 100%;
}

.ab-visual-img {
  width: 100%;
  height: 340px;
  object-fit: cover;
  display: block;
}

.ab-visual-card-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: rgba(29, 69, 3, 0.85);
  backdrop-filter: blur(8px);
  padding: 16px 22px;
  border-radius: 12px;
  color: var(--vcn-white, #fff);
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
}

.ab-visual-card-overlay i {
  font-size: 24px;
  color: var(--vcn-badge, #d3fa99);
}

.ab-visual-card-overlay span {
  font-size: 0.95rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* 6. Timeline Section styling */
.ab-timeline-section {
  padding: 70px 40px;
  background: var(--vcn-base-bg, #F6F7EE);
  border-top: 1px solid rgba(29, 69, 3, 0.05);
  border-bottom: 1px solid rgba(29, 69, 3, 0.05);
}

.ab-timeline-title {
  font-size: clamp(1.8rem, 3vw, 2.5rem) !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  margin-bottom: 12px !important;
}

.ab-timeline-divider {
  width: 48px;
  height: 3px;
  background: var(--vcn-dark, #1D4503);
  border-radius: 2px;
  margin: 0 auto;
}

.timeline-container {
  position: relative;
  padding: 30px 0;
}

.timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: rgba(29, 69, 3, 0.12);
  transform: translateX(-50%);
}

.timeline-card-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 50%;
  padding-right: 32px;
  position: relative;
  margin-bottom: 36px;
  box-sizing: border-box;
}

.timeline-card-right {
  margin-left: 50%;
  padding-right: 0;
  padding-left: 32px;
  justify-content: flex-start;
}

.timeline-dot {
  width: 14px;
  height: 14px;
  background: var(--vcn-dark, #1D4503);
  border: 3px solid var(--vcn-white, #fff);
  border-radius: 50%;
  position: absolute;
  right: -7px;
  top: 24px;
  z-index: 2;
  box-shadow: 0 0 0 4px rgba(29, 69, 3, 0.08);
}

.timeline-card-right .timeline-dot {
  left: -7px;
  right: auto;
}

.timeline-card {
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.06);
  border-radius: 14px;
  padding: 24px;
  box-shadow: 0 4px 15px rgba(29, 69, 3, 0.02);
  width: 100%;
  transition: transform 0.25s;
}

.timeline-card-wrapper:hover .timeline-card {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(29, 69, 3, 0.05);
}

.timeline-year {
  font-size: 18px;
  font-weight: 700;
  color: var(--vcn-primary, #5E6C1F);
  margin-bottom: 4px;
}

.timeline-phase {
  font-size: 15px !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  margin-bottom: 8px !important;
}

.timeline-desc {
  font-size: 14px !important;
  line-height: 1.6 !important;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.8;
  margin: 0;
}

.ab-timeline-more-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: transparent;
  color: var(--vcn-dark, #1D4503);
  font-weight: 600;
  text-decoration: none;
  font-size: 0.95rem;
  border-bottom: 1.5px solid var(--vcn-dark, #1D4503);
  padding-bottom: 2px;
  transition: all 0.2s;
}

.ab-timeline-more-btn:hover {
  color: var(--vcn-primary, #5E6C1F);
  border-color: var(--vcn-primary, #5E6C1F);
  gap: 8px;
}

/* 7. Strengths styling */
.ab-strengths-section {
  padding: 70px 40px;
}

.strength-card {
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.08);
  border-radius: 16px;
  padding: 36px;
  height: 100%;
  transition: all 0.25s;
  box-shadow: 0 4px 15px rgba(29, 69, 3, 0.01);
}

.strength-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 14px 30px rgba(29, 69, 3, 0.06);
  border-color: rgba(29, 69, 3, 0.15);
}

.strength-icon {
  width: 50px;
  height: 50px;
  background: rgba(94, 108, 31, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vcn-primary, #5E6C1F);
  font-size: 22px;
  margin-bottom: 20px;
}

.strength-title {
  font-size: 22px !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  margin-bottom: 14px !important;
}

.strength-desc {
  font-size: 15px !important;
  line-height: 1.75 !important;
  color: var(--vcn-darker, #1C3A13);
  opacity: 0.8;
  margin: 0 0 12px 0;
}

.strength-desc:last-child {
  margin-bottom: 0;
}

/* 8. Leadership Teaser styling */
.ab-leadership-teaser {
  background: linear-gradient(135deg, var(--vcn-darker, #1C3A13) 0%, var(--vcn-dark, #1D4503) 100%);
  margin: 0 24px 48px 24px;
  padding: 44px;
  border-radius: 20px;
  color: var(--vcn-white, #fff);
  box-shadow: 0 15px 35px rgba(29, 69, 3, 0.1);
}

.teaser-heading {
  font-size: clamp(1.4rem, 2.5vw, 1.8rem) !important;
  font-weight: 600 !important;
  color: var(--vcn-badge, #d3fa99) !important;
  margin-bottom: 12px !important;
}

.teaser-text {
  font-size: 15px !important;
  line-height: 1.75 !important;
  color: rgba(255, 255, 255, 0.85);
  margin: 0;
}

.teaser-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: var(--vcn-white, #fff);
  color: var(--vcn-darker, #1C3A13);
  font-weight: 600;
  padding: 12px 28px;
  border-radius: 50px;
  text-decoration: none;
  transition: all 0.25s ease;
  font-size: 0.95rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.teaser-btn i {
  transition: transform 0.2s;
}

.teaser-btn:hover {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
}

.teaser-btn:hover i {
  transform: translateX(3px);
}

/* 9. Quick Nav cards styling */
.ab-quick-nav {
  padding: 50px 40px;
  background: rgba(246, 247, 238, 0.35);
  border-top: 1px solid rgba(29, 69, 3, 0.05);
}

.quick-nav-title {
  text-align: center;
  font-size: 24px !important;
  font-weight: 600 !important;
  color: var(--vcn-darker, #1C3A13) !important;
  margin-bottom: 32px !important;
}

.quick-nav-card {
  text-decoration: none !important;
  background: var(--vcn-white, #fff);
  border: 1px solid rgba(29, 69, 3, 0.08);
  border-radius: 14px;
  padding: 26px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  color: var(--vcn-darker, #1C3A13);
  font-size: 15px;
  font-weight: 500;
  text-align: center;
  transition: all 0.25s;
  box-shadow: 0 4px 12px rgba(29, 69, 3, 0.01);
}

.quick-nav-card:hover {
  transform: translateY(-4px);
  border-color: var(--vcn-primary, #5E6C1F);
  color: var(--vcn-primary, #5E6C1F);
  box-shadow: 0 10px 22px rgba(94, 108, 31, 0.08);
}

.quick-nav-icon {
  font-size: 28px;
  color: var(--vcn-primary, #5E6C1F);
  transition: transform 0.25s ease;
}

.quick-nav-card:hover .quick-nav-icon {
  transform: scale(1.12);
}

/* 10. Split CTAs styling */
.ab-split-cta {
  padding: 0 40px 60px 40px;
}

.cta-banner {
  position: relative;
  border-radius: 20px;
  padding: 44px 36px;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
}

.cta-primary {
  background: linear-gradient(135deg, var(--vcn-darker, #1C3A13) 0%, var(--vcn-dark, #1D4503) 100%);
  color: var(--vcn-white, #fff);
}

.cta-accent {
  background: var(--vcn-base-bg, #F6F7EE);
  color: var(--vcn-darker, #1C3A13);
  border: 1px solid rgba(29, 69, 3, 0.08);
}

.cta-shape {
  position: absolute;
  right: -30px;
  bottom: -30px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: rgba(211, 250, 153, 0.08);
  pointer-events: none;
  z-index: -1;
}

.cta-primary .cta-shape {
  background: rgba(255, 255, 255, 0.03);
}

.cta-inner {
  position: relative;
  z-index: 2;
}

.cta-icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(29, 69, 3, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  margin-bottom: 20px;
}

.cta-primary .cta-icon {
  background: rgba(255, 255, 255, 0.08);
  color: var(--vcn-badge, #d3fa99);
}

.cta-accent .cta-icon {
  background: rgba(29, 69, 3, 0.06);
  color: var(--vcn-dark, #1D4503);
}

.cta-title {
  font-size: 26px !important;
  font-weight: 600 !important;
  line-height: 1.3 !important;
  margin-bottom: 24px !important;
  max-width: 280px;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 11px 24px;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.25s ease;
  width: fit-content;
}

.cta-primary .cta-button {
  background: var(--vcn-white, #fff);
  color: var(--vcn-darker, #1C3A13);
}

.cta-primary .cta-button:hover {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
}

.cta-accent .cta-button {
  background: var(--vcn-dark, #1D4503);
  color: var(--vcn-white, #fff);
}

.cta-accent .cta-button:hover {
  background: var(--vcn-badge, #d3fa99);
  color: var(--vcn-darker, #1C3A13);
}

/* DEEP COMPONENT SIDEBAR mobile styles compatibility */
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

/* Gutters reset override for custom page elements */
.row[class*='g-'] > [class^="col-"],
.row[class*='g-'] > [class*=" col-"] {
  padding-right: calc(var(--bs-gutter-x) * .5) !important;
  padding-left: calc(var(--bs-gutter-x) * .5) !important;
}

/* RESPONSIVE LAYOUT OVERRIDES */
@media (max-width: 991.98px) {
  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section > .container {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .ab-hero {
    margin: 20px 16px;
    min-height: 380px;
  }

  .ab-hero-content {
    padding: 36px 24px;
  }

  .ab-metrics-strip {
    margin: 0 16px 36px 16px;
    padding: 20px 10px;
  }

  .metric-item {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .metric-item:nth-child(even) {
    border-right: none;
  }

  .metric-item:nth-child(3),
  .metric-item:nth-child(4) {
    border-bottom: none;
  }

  .ab-welcome-section,
  .ab-values-section,
  .ab-mission-block,
  .ab-timeline-section,
  .ab-strengths-section,
  .ab-quick-nav,
  .ab-split-cta {
    padding: 40px 20px !important;
  }

  .ab-mission-text {
    padding-right: 0;
    margin-bottom: 30px;
  }

  .ab-leadership-teaser {
    margin: 0 16px 36px 16px;
    padding: 30px;
  }

  .timeline-line {
    left: 20px;
  }

  .timeline-card-wrapper {
    width: 100%;
    padding-right: 0;
    padding-left: 45px;
    margin-bottom: 28px;
  }

  .timeline-card-right {
    margin-left: 0;
    padding-left: 45px;
  }

  .timeline-dot {
    left: 13px !important;
    right: auto !important;
  }
}

@media (max-width: 575.98px) {
  .ab-badge-container {
    margin-bottom: 12px;
  }

  .ab-badge {
    padding: 4px 10px;
    font-size: 10px;
  }

  .ab-hero-title {
    font-size: 1.8rem !important;
  }

  .ab-hero-sub {
    font-size: 0.95rem;
    margin-bottom: 20px;
  }

  .cta-banner {
    padding: 32px 24px;
  }

  .cta-title {
    font-size: 22px !important;
  }
}
</style>

<style>
/* Unscoped global overrides for sticky sidebar layout container context */
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
</style>
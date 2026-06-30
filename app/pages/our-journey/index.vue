<script setup>
import { ref, computed, watch } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

// Fetch page sections from API during SSR/routing safely
await useAsyncData('our-journey-cms', async () => {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl

  // Clear any existing global page state to prevent section bleeding across page transitions
  cmsStore.clearPage()

  if (apiBaseUrl && (apiBaseUrl.startsWith('http://') || apiBaseUrl.startsWith('https://'))) {
    try {
      await cmsStore.fetchSectionsBySlug('our-journey')
    } catch (err) {
      console.error('Failed to fetch CMS sections for our-journey:', err)
    }
  }
}, {
  getCachedData: () => null // Force execution on every route navigation to keep the Pinia store in sync
})

const journey = computed(() => {
  const sections = cmsStore.currentPage?.sections || []

  // Find hero and timeline sections
  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'our-journey-hero')
  const timelineSec = sections.find(s => s.name === 'timeline' || s.sectionKey === 'our-journey-timeline')

  // Extract timeline phases
  const timelineItem = timelineSec?.items?.find(item => item.name === 'timeline-phases')
  const apiPhases = timelineItem?.extraData?.phases || []

  // Fallbacks
  const fallback = cmsStore.getPageSection('about', 'ourJourney')

  // Resolve Hero Image
  const rawImage = heroSec?.image || heroSec?.extraData?.image
  let heroImage = ''
  if (rawImage) {
    if (typeof rawImage === 'string') {
      heroImage = rawImage
    } else {
      heroImage = getCmsImageUrl(rawImage)
    }
  }

  return {
    hero: {
      title: heroSec?.title || fallback?.hero?.title || 'Major Milestones',
      description: heroSec?.description || fallback?.hero?.description || 'A decade and a half of redefining wellness through ethical foundations, community expansion, and a relentless commitment to holistic health across the nation.',
      image: heroImage || fallback?.hero?.image || '/img/about/banner.png'
    },
    timeline: apiPhases.length > 0 ? apiPhases : (fallback?.timeline || [])
  }
})

// Phase specific metadata (icons and tags matching the UI design)
const phaseDetails = [
  {
    icon: 'bi-house-door',
    tags: ['Ethical Roots', 'Heritage']
  },
  {
    icon: 'bi-globe',
    tags: ['Pan-India Reach', 'Scaling Impact']
  },
  {
    icon: 'bi-people',
    tags: ['Conscious Culture', 'Leadership']
  },
  {
    icon: 'bi-cpu',
    tags: ['Global Systems', 'Innovation']
  },
  {
    icon: 'bi-stars',
    tags: ['Global Reach', 'Sustainability']
  }
]

const getPhaseIcon = (index) => {
  return phaseDetails[index % phaseDetails.length].icon
}

const getPhaseTags = (index) => {
  return phaseDetails[index % phaseDetails.length].tags
}

// Helper to get image for each phase, falling back to generated theme images
const getPhaseImage = (item, index) => {
  if (item.image) {
    if (typeof item.image === 'string') return item.image
    return getCmsImageUrl(item.image)
  }
  const images = [
    '/img/about/timeline-1.jpg',
    '/img/about/journey-story.jpg',
    '/img/about/journey-future.jpg',
    '/img/about/journey-strength.jpg',
    '/img/about/about-us.png'
  ]
  return images[index % images.length]
}

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
})
</script>

<template>
  <section class="product-detail-section mt-3 journey-page-section">
    <div class="container-fluid">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-md-3 col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <!-- Main Content Area -->
        <div class="col-md-9 col-lg-9">
          <div class="journey-container">
            <!-- Header Section -->
            <div class="journey-header">
              <span class="legacy-tag">OUR LEGACY</span>
              <h1 class="journey-main-title">{{ journey.hero.title }}</h1>
              <p class="journey-main-desc">{{ journey.hero.description }}</p>
            </div>

            <!-- Vertical Timeline Section -->
            <div class="journey-timeline-wrapper">
              <div class="journey-timeline-line"></div>

              <div
                v-for="(item, index) in journey.timeline"
                :key="index"
                class="journey-timeline-item"
                :class="{ reverse: index % 2 !== 0 }"
              >
                <!-- Left Side (Content/Image) -->
                <div class="journey-timeline-col content-side">
                  <div class="year-badge">{{ item.year }}</div>
                  <h3 class="phase-title">{{ item.title }}</h3>
                  <p class="phase-desc">{{ item.description }}</p>
                  <div class="phase-tags">
                    <span v-for="tag in getPhaseTags(index)" :key="tag" class="phase-tag-pill">
                      {{ tag }}
                    </span>
                  </div>
                </div>

                <!-- Central Timeline Icon Node -->
                <div class="journey-timeline-node">
                  <div class="node-circle">
                    <i :class="['bi', getPhaseIcon(index)]"></i>
                  </div>
                </div>

                <!-- Right Side (Image/Content) -->
                <div class="journey-timeline-col image-side">
                  <img
                    :src="getPhaseImage(item, index)"
                    :alt="item.title"
                    class="phase-img"
                  />
                </div>
              </div>
            </div>

            <!-- Bottom CTA Section -->
            <div class="next-chapter-section">
              <h2 class="next-chapter-title">VCN Lifestyle</h2>
              <p class="next-chapter-desc">
                Advancing Wellness for Everyday Life
              </p>
              <div class="next-chapter-actions">
                <NuxtLink to="/all-products" class="btn-action primary">Explore Our Products</NuxtLink>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.journey-container {
  padding: 40px 45px 60px !important; /* Increased top padding to clear floating navbar completely */
  background: var(--vcn-white, #fff) !important; /* Cream background replaced with website white */
  border: 1px solid rgba(29, 69, 3, 0.08); /* Soft dark color border */
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.04);
  font-family: var(--vcn-font, "Outfit", sans-serif);
  border-radius: 24px;
}

/* Header styling */
.journey-header {
  text-align: center;
  max-width: 800px;
  margin: 0 auto 60px;
}

.legacy-tag {
  display: block;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 2px;
  color: var(--vcn-dark, #1D4503); /* Brand dark color */
  margin-bottom: 12px;
}

.journey-main-title {
  font-size: 3.2rem;
  font-weight: 500;
  color: var(--vcn-darker, #1C3A13) !important; /* Brand darker forest green */
  margin-bottom: 20px;
  line-height: 1.2;
}

.journey-main-desc {
  font-size: 1.15rem;
  color: var(--vcn-darker, #1C3A13); /* Brand darker forest green */
  line-height: 1.6;
  opacity: 0.85;
}

/* Timeline layout styling */
.journey-timeline-wrapper {
  position: relative;
  padding: 40px 0;
}

.journey-timeline-line {
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: var(--vcn-dark, #1D4503); /* Brand dark central line */
  transform: translateX(-50%);
  z-index: 1;
}

.journey-timeline-item {
  display: flex;
  align-items: center;
  margin-bottom: 100px;
  position: relative;
  z-index: 2;
}

.journey-timeline-item.reverse {
  flex-direction: row-reverse;
}

.journey-timeline-col {
  width: calc(50% - 50px);
}

.content-side {
  padding: 0 10px;
}

.journey-timeline-item.reverse .content-side {
  text-align: left;
}

/* Year Badge */
.year-badge {
  display: inline-block;
  padding: 6px 18px;
  background-color: var(--vcn-badge, #d3fa99); /* Brand light accent background */
  color: var(--vcn-darker, #1C3A13); /* Brand darker text */
  border-radius: 6px;
  font-weight: 600;
  font-size: 0.95rem;
  margin-bottom: 20px;
}

.phase-title {
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--vcn-darker, #1C3A13) !important; /* Brand darker forest green */
  margin-bottom: 15px;
}

.phase-desc {
  font-size: 1.05rem;
  color: var(--vcn-darker, #1C3A13); /* Brand darker text */
  line-height: 1.65;
  margin-bottom: 20px;
  opacity: 0.85;
}

/* Accent Tags */
.phase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.phase-tag-pill {
  display: inline-block;
  padding: 5px 16px;
  background-color: var(--vcn-base-bg, #F6F7EE); /* Brand background color */
  color: var(--vcn-dark, #1D4503); /* Brand dark text */
  border: 1px solid rgba(29, 69, 3, 0.15); /* Soft border */
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Central Node */
.journey-timeline-node {
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.node-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--vcn-dark, #1D4503); /* Brand dark green background */
  color: var(--vcn-white, #fff); /* White icon */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  box-shadow: 0 4px 10px rgba(29, 69, 3, 0.25);
  border: 2px solid var(--vcn-white, #fff);
  transition: transform 0.3s ease;
}

.journey-timeline-item:hover .node-circle {
  transform: scale(1.15);
}

/* Phase Image */
.phase-img {
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 12px 30px rgba(29, 69, 3, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.journey-timeline-item:hover .phase-img {
  transform: translateY(-5px);
  box-shadow: 0 16px 40px rgba(29, 69, 3, 0.12);
}

/* Next Chapter Section */
.next-chapter-section {
  text-align: center;
  max-width: 700px;
  margin: 80px auto 20px;
  padding: 40px 20px;
  background: var(--vcn-gradient) !important; /* Premium brand gradient */
  border-radius: 24px;
}

.next-chapter-title {
  font-size: 2.2rem;
  font-weight: 500;
  color: var(--vcn-white, #fff) !important; /* White text on gradient */
  margin-bottom: 15px;
}

.next-chapter-desc {
  font-size: 1.1rem;
  color: var(--vcn-white, #fff); /* White text on gradient */
  line-height: 1.6;
  margin-bottom: 30px;
  opacity: 0.9;
}

.next-chapter-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.btn-action {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 30px;
  font-weight: 600;
  text-decoration: none;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-action.primary {
  background-color: var(--vcn-white, #fff) !important; /* White button */
  color: var(--vcn-darker, #1C3A13) !important; /* Brand darker text */
  border: 2px solid var(--vcn-white, #fff);
}

.btn-action.primary:hover {
  background-color: var(--vcn-badge, #d3fa99) !important; /* Light lime on hover */
  color: var(--vcn-darker, #1C3A13) !important; /* Brand darker text */
  border-color: var(--vcn-badge, #d3fa99);
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

/* Responsive configurations */
@media (max-width: 991px) {
  .journey-timeline-col {
    width: calc(50% - 30px);
  }
  .journey-timeline-node {
    width: 60px;
  }
}

@media (max-width: 768px) {
  .journey-container {
    padding: 110px 15px 30px !important; /* Mobile padding top adjusted for floating navbar */
    border-radius: 0;
  }

  .journey-main-title {
    font-size: 2.4rem;
  }

  .journey-timeline-line {
    left: 20px;
    transform: none;
  }

  .journey-timeline-item,
  .journey-timeline-item.reverse {
    flex-direction: column;
    align-items: flex-start;
    padding-left: 50px;
    margin-bottom: 60px;
    width: 100%;
  }

  .journey-timeline-col {
    width: 100%;
  }

  .content-side {
    margin-bottom: 20px;
  }

  .journey-timeline-node {
    position: absolute;
    left: -2px;
    top: 0;
    width: 44px;
    justify-content: flex-start;
  }

  .node-circle {
    width: 36px;
    height: 36px;
    font-size: 1rem;
  }

  .next-chapter-actions {
    flex-direction: column;
    gap: 15px;
    max-width: 320px;
    margin: 0 auto;
  }

  .btn-action {
    width: 100%;
    text-align: center;
  }
}
</style>

<style>
/*
  ===========================================================
  STICKY-SAFE LAYOUT OVERRIDES (unscoped — targets this page's
  Bootstrap grid wrapper from the outside, since .row/.col-* are
  not part of this component's own scoped template)
  ===========================================================

  Why these exist: position: sticky on the sidebar (inside
  AboutSidebar.vue) silently does nothing if ANY of the following
  are true anywhere in the ancestor chain up to the viewport:
    1. An ancestor has overflow: hidden / auto / scroll (other
       than the document itself).
    2. An ancestor has a CSS "transform", "filter", "perspective",
       "contain", or "will-change" property set — any of these
       create a new containing block and break sticky relative
       to the viewport.
    3. The sticky element's direct flex/grid parent does not
       stretch to be taller than the sticky element itself.

  This block forces points 1 and 3 explicitly rather than relying
  on Bootstrap defaults, since some other global stylesheet on
  this site may be setting overflow or a transform on
  .product-detail-section, .container-fluid, or body without us
  knowing it from this file alone.
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
    align-items: stretch !important; /* forces both columns to equal height */
  }

  /* The sticky element's parent column must be as tall as the
     content column for sticky to have room to travel. */
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

  .product-detail-section > .container-fluid {
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
  }
}
</style>
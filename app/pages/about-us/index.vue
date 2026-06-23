<script setup>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

// Fetch page sections from API during SSR/routing
await useAsyncData('about-us-cms', () => cmsStore.fetchSectionsBySlug('about'))

const about = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find sections by name/key
  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'about-hero')
  const welcomeSec = sections.find(s => s.name === 'welcome' || s.sectionKey === 'about-welcome')
  const contentSec = sections.find(s => s.name === 'content' || s.sectionKey === 'about-content')
  const moreAboutSec = sections.find(s => s.name === 'moreAboutUs' || s.sectionKey === 'about-more')
  
  // Fallbacks
  const fallback = cmsStore.getPageSection('about', 'about')
  
  // Resolve hero banner image
  const rawHeroImage = heroSec?.image || heroSec?.extraData?.image
  let heroBannerImage = ''
  if (rawHeroImage) {
    if (typeof rawHeroImage === 'string') {
      heroBannerImage = rawHeroImage
    } else {
      heroBannerImage = getCmsImageUrl(rawHeroImage)
    }
  }

  // Parse intro description (split string into paragraphs)
  let parsedDescription = fallback?.description || []
  if (contentSec?.description) {
    parsedDescription = contentSec.description.split('\n').filter(p => p.trim())
  }
  
  // Parse dynamic sections (Our Story, Helping Build a Healthier Future, etc.)
  let parsedSections = fallback?.sections || []
  if (contentSec?.items && contentSec.items.length > 0) {
    parsedSections = contentSec.items.map(item => ({
      title: item.extraData?.title || item.title || '',
      content: item.extraData?.content || (item.description ? [item.description] : [])
    }))
  }
  
  // Parse moreAboutUs items and ctaCards
  let parsedMoreAboutItems = fallback?.moreAboutUs?.[0]?.items || []
  let parsedMoreAboutCta = fallback?.moreAboutUs?.[0]?.ctaCards || []
  if (moreAboutSec?.items && moreAboutSec.items.length > 0) {
    const items = moreAboutSec.items.filter(item => item.name?.startsWith('nav-item'))
    if (items.length > 0) {
      parsedMoreAboutItems = items.map(item => ({
        title: item.extraData?.title || item.title || '',
        icon: item.extraData?.icon || item.icon || 'bi-bullseye',
        iconClass: item.extraData?.iconClass || 'icon-journey'
      }))
    }
    
    const ctas = moreAboutSec.items.filter(item => item.name?.startsWith('cta-card'))
    if (ctas.length > 0) {
      parsedMoreAboutCta = ctas.map(item => ({
        title: item.extraData?.title || item.title || '',
        icon: item.extraData?.icon || item.icon || 'bi-bullseye',
        iconClass: item.extraData?.iconClass || 'icon-shopping',
        buttonText: item.extraData?.buttonText || item.buttonText || 'Start Shopping'
      }))
    }
  }

  return {
    heroImage: heroBannerImage || fallback?.heroImage || '/img/about/about-us.png',
    welcome: {
      title: welcomeSec?.title || fallback?.welcome?.title || 'Welcome to the world of VCN!',
      subtitle: welcomeSec?.subtitle || fallback?.welcome?.subtitle || 'Helping people live better lives'
    },
    heading: contentSec?.title || fallback?.heading || 'This is VCN',
    description: parsedDescription,
    sections: parsedSections,
    moreAboutUs: [
      {
        heading: moreAboutSec?.title || fallback?.moreAboutUs?.[0]?.heading || 'More about us',
        items: parsedMoreAboutItems,
        ctaCards: parsedMoreAboutCta
      }
    ]
  }
})

const moreAbout = computed(() =>
  about.value?.moreAboutUs?.[0] 
)

useHead({
  bodyAttrs: {
    class: 'product-details-page'
  }
})
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
        <div class="col-lg-9">
          <!-- Hero Image -->
          <img
            :src="about.heroImage"
            :alt="about.heading"
            class="hero-banner"
          />

          <!-- Welcome Banner -->
          <div class="welcome-box">
            <h2>{{ about.welcome?.title }}</h2>
            <p>{{ about.welcome?.subtitle }}</p>
          </div>

          <!-- Main Heading -->
          <h1 class="main-heading">
            {{ about.heading }}
          </h1>

          <div class="content-section">

            <!-- Intro Content -->
            <p
              v-for="(paragraph, index) in about.description"
              :key="`intro-${index}`"
            >
              {{ paragraph }}
            </p>

            <!-- Dynamic Sections -->
            <template
              v-for="(section, sectionIndex) in about.sections"
              :key="`section-${sectionIndex}`"
            >
              <h2 class="section-title">
                {{ section.title }}
              </h2>

              <p
                v-for="(paragraph, paragraphIndex) in section.content"
                :key="`paragraph-${sectionIndex}-${paragraphIndex}`"
              >
                {{ paragraph }}
              </p>
            </template>
          </div>

          <!-- More About Us -->
          <div class="more-about-section">
              <div class="container">

                <h2 class="section-title">
                  {{ moreAbout.heading }}
                </h2>

                <div class="row g-3">

                  <div
                    v-for="(item, index) in moreAbout.items"
                    :key="index"
                    class="col-6 col-md-3"
                  >
                    <div class="info-card">
                      <!-- Top row: icon and arrow -->
                      <div class="d-flex justify-content-between align-items-center mb-3">
                        <div
                          class="icon-wrapper"
                          :class="item.iconClass"
                        >
                          <i
                            class="bi"
                            :class="item.icon"
                          ></i>
                        </div>
                        <i class="bi bi-arrow-right arrow-icon"></i>
                      </div>

                      <!-- Bottom row: title -->
                      <h3 class="card-title">
                        {{ item.title }}
                      </h3>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <!-- Bottom CTA Section -->
            <div class="bottom-section">
              <div class="container">

                <div class="row g-3 justify-content-center">

                  <div
                    v-for="(card, index) in moreAbout.ctaCards"
                    :key="index"
                    class="col-6 col-md-5"
                  >
                    <div class="bottom-card">

                      <div
                        class="bottom-icon"
                        :class="card.iconClass"
                      >
                        <i
                          class="bi"
                          :class="card.icon"
                        ></i>
                      </div>

                      <div class="bottom-content">
                        <h3>
                          {{ card.title }}
                        </h3>

                        <a href="#">
                          {{ card.buttonText }}
                        </a>
                      </div>

                    </div>
                  </div>

                </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (max-width: 991.98px) {
  /* Make the section and container-fluid zero-padding on mobile so images/welcome box are edge-to-edge */
  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section > .container-fluid {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .col-md-9 {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /* Sidebar section padding adjustments */
  .sidebar-section {
    margin-bottom: 0 !important;
    border-bottom: none !important;
  }

  /* Hero image banner - no curved corners, edge to edge */
  .hero-banner {
    border-radius: 0 !important;
    height: auto !important;
    max-height: none !important;
    margin-bottom: 0 !important;
  }

  /* Welcome box styled exactly like Amway welcome box */
  .welcome-box {
    background-color: #e6ffc9 !important;
    padding: 25px 20px !important;
    text-align: center !important;
    border: none !important;
    border-radius: 0 !important;
    margin-bottom: 0 !important;
  }

  .welcome-box h2 {
    color: #2e5c3e !important;
    font-size: 26px !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
  }

  .welcome-box p {
    color: #557a5d !important;
    font-size: 15px !important;
    margin: 0 !important;
  }

  /* Main heading centered */
  .main-heading {
    text-align: center !important;
    padding: 40px 20px 30px !important;
    font-size: 32px !important;
    font-weight: 400 !important;
    color: #222 !important;
  }

  /* Content paragraphs - default margin and padding */
  .content-section {
    padding: 0 20px 30px !important;
  }

  .content-section p {
    font-size: 15px !important;
    line-height: 1.8 !important;
    color: #555 !important;
    margin-bottom: 20px !important;
  }

  /* "More About Us" title styled golden and centered */
  .more-about-section .section-title {
    color: #b58900 !important;
    text-align: center !important;
    font-size: 24px !important;
    font-weight: 600 !important;
    margin-bottom: 20px !important;
  }

  /* More About Us cards styled exactly like the screenshot */
  .info-card {
    background: #ffffff !important;
    border: 1px solid #f3f4f6 !important;
    border-radius: 12px !important;
    padding: 20px !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02) !important;
    margin-bottom: 0 !important;
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    justify-content: space-between !important;
  }

  /* Icon containers - customized round circles with color themes */
  .icon-wrapper {
    width: 44px !important;
    height: 44px !important;
    display: inline-flex !important;
    align-items: center !important;
    justify-content: center !important;
    border-radius: 50% !important;
    margin-bottom: 12px !important;
  }

  .icon-journey {
    background-color: #fce7f3 !important; /* pink background */
    color: #db2777 !important;           /* dark red/pink icon */
  }

  .icon-news {
    background-color: #d1fae5 !important;  /* green background */
    color: #059669 !important;            /* green icon */
  }

  .icon-brands {
    background-color: #e0e7ff !important; /* blue background */
    color: #4f46e5 !important;           /* blue icon */
  }

  .icon-faqs {
    background-color: #e0f2fe !important;  /* light blue background */
    color: #0284c7 !important;            /* light blue icon */
  }

  .card-title {
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #1f2937 !important;
    margin-top: 5px !important;
  }

  .arrow-icon {
    font-size: 16px !important;
    color: #374151 !important;
  }

  /* Bottom section and CTA cards matching bottom screenshot */
  .bottom-section {
    background-color: #eff6ff !important; /* soft blue background */
    padding: 40px 20px !important;
  }

  .bottom-card {
    background: #ffffff !important;
    border: 1px solid #f3f4f6 !important;
    border-radius: 12px !important;
    padding: 30px 20px !important;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02) !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    justify-content: center !important;
    margin: 0 auto 15px !important;
  }

  .bottom-icon {
    background-color: #e0f2fe !important; /* soft blue background circle */
    color: #0284c7 !important;           /* blue icon */
    width: 80px !important;
    height: 80px !important;
    border-radius: 50% !important;
    font-size: 32px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin-bottom: 15px !important;
  }

  .bottom-content {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
  }

  .bottom-content h3 {
    color: #374151 !important;
    font-size: 18px !important;
    font-weight: 500 !important;
    margin-bottom: 8px !important;
  }

  .bottom-content a {
    color: #111827 !important;
    text-decoration: underline !important;
    font-weight: 600 !important;
    font-size: 15px !important;
  }
}
</style>

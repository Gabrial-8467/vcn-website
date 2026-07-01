<template>
  <section class="terms-conditions">
    <!-- Disease Bundles Container -->
    <div class="container">
      <div class="row d-flex align-items-center">
        <div class="col-lg-6">
          <h3>{{ bundles.heroSection.title }}</h3>
          <p class="mt-3">
            {{ bundles.heroSection.description }}
          </p>
          <br />
          <NuxtLink :to="bundles.heroSection.buttonLink" class="learn-more-btn mt-5">{{ bundles.heroSection.buttonText
          }}
          </NuxtLink>
        </div>
        <div class="col-lg-6">
          <img :src="bundles.heroSection.image" class="w-100" alt="" />
          <p class="mt-2">
            {{ bundles.heroSection.discountText }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="video-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ bundles.videoSection.title }}</h2>
      </div>

      <div class="video-grid">
        <div v-for="(video, index) in bundles.videoSection.videos" :key="index" class="video-card">
          <div class="video-thumbnail-container" :data-video-id="video.videoId">
            <img :src="`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`" :alt="video.title"
              class="video-thumbnail" />

            <div class="video-overlay"></div>

            <div class="play-button-overlay"></div>

            <div class="video-player">
              <iframe src=""
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation" />
            </div>
          </div>

          <div class="video-content">
            <h3 class="video-title">
              {{ video.title }}
            </h3>

            <p class="video-description">
              {{ video.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="vcn-acidity-bundle-section">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2 class="vcn-acidity-main-heading">
            {{ bundles.bundleBenefitsSection.heading }}
          </h2>
          <p class="vcn-acidity-intro-text">
            {{ bundles.bundleBenefitsSection.introText }}
            <button class="vcn-acidity-read-more-btn">{{ bundles.bundleBenefitsSection.readMoreText }}</button>
          </p>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="vcn-acidity-bundle-container">
            <h3 class="vcn-acidity-bundle-title">{{ bundles.bundleBenefitsSection.bundleTitle }}</h3>

            <div class="row">
              <div v-for="benefit in bundles.bundleBenefitsSection.benefits" :key="benefit.number"
                class="col-lg-6 col-md-6 col-12">
                <div class="vcn-acidity-benefit-card">
                  <span class="vcn-acidity-benefit-number">
                    {{ benefit.number }}
                  </span>

                  <div class="vcn-acidity-benefit-icon">
                    <img :src="benefit.icon" :alt="benefit.text" />
                  </div>

                  <p class="vcn-acidity-benefit-text">
                    {{ benefit.text }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="vcn-new-product">
    <div class="container">
      <div class="row g-3">
        <h2 class="vcn-acidity-main-heading">{{ bundles.productsSection.heading }}</h2>
        <!-- Dynamic Products -->
        <div v-for="(product, index) in bundleProducts" :key="product.id" class="col-md-6">
          <div class="product-card">
            <span v-if="index === 2" class="product-badge">NEW</span>
            <NuxtLink :to="`/product-details/${product.slug}`" class="product-image-wrapper">
              <img :src="getProductImage(product)" :alt="product.name" class="product-image" />
            </NuxtLink>
            <div class="product-content">
              <span class="product-label">{{ product.label || 'AGE 18+' }}</span>
              <h3 class="product-title">
                <NuxtLink :to="`/product-details/${product.slug}`">{{ product.name }}</NuxtLink>
              </h3>
              <p class="product-description" v-html="product.description || 'Premium product for your wellness needs.'">
              </p>
              <div class="product-price">
                ₹{{ getProductPrice(product).price }}
                <span v-if="getProductPrice(product).oldPrice" class="old-price">₹{{ getProductPrice(product).oldPrice
                  }}</span>
              </div>
              <div class="product-actions">
                <NuxtLink :to="`/product-details/${product.slug}`" class="btn-learn">Learn More</NuxtLink>
                <ClientOnly>
                  <a href="#" @click.prevent="addToCart(product)" class="btn-cart">Add to Cart</a>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="acidity-info-container">
    <div class="container">
      <h1 class="main-heading">{{ bundles.knowMoreSection.heading }}</h1>
      <div class="expand-section">
        <div v-for="section in bundles.knowMoreSection.accordions" :key="section.id" class="expandable-section"
          :class="{ active: activeSection === section.id }">
          <div class="accordion-trigger" @click="toggleSection(section.id)">
            <div class="trigger-left-area">
              <div class="circle-badge">
                <img :src="section.image" :alt="section.title" />
              </div>

              <h3 class="accordion-label">
                {{ section.title }}
              </h3>
            </div>

            <span class="arrow-indicator">›</span>
          </div>

          <div class="panel-body" v-show="activeSection === section.id">
            <div class="items-layout">
              <div v-for="(item, index) in section.items" :key="index" class="feature-block">
                <div class="feature-symbol">
                  {{ item.icon }}
                </div>

                <div class="feature-details">
                  <h3 class="detail-title">
                    {{ item.title }}
                  </h3>

                  <p class="detail-text">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="care-wrapper">
    <div class="container">
      <h1 class="primary-heading">{{ bundles.completeCareSection.heading }}</h1>
      <p class="intro-paragraph">
        {{bundles.completeCareSection.description}}
      </p>

      <div class="row g-4">
        <div
          v-for="(card, index) in bundles.completeCareSection.cards"
          :key="index"
          class="col-lg-6 col-md-12"
        >
          <div class="care-card">
            <div class="icon-circle">
              <img :src="card.image" :alt="card.title" />
            </div>

            <h2 class="card-heading">
              {{ card.title }}
            </h2>

            <p class="card-content">
              {{ card.description }}

              <div
                v-if="card.highlight"
                class="highlight-text"
              >
                {{ card.highlight }}
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, onMounted } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

// Fetch page sections from API during SSR/routing
await useAsyncData('bundle-details-cms', () => cmsStore.fetchSectionsBySlug('bundle-details'))

const bundles = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find sections by name/key
  const heroSec = sections.find(s => s.name === 'heroSection' || s.sectionKey === 'bundle-details-hero')
  const videoSec = sections.find(s => s.name === 'videoSection' || s.sectionKey === 'bundle-details-videos')
  const benefitsSec = sections.find(s => s.name === 'bundleBenefitsSection' || s.sectionKey === 'bundle-benefits')
  const productsSec = sections.find(s => s.name === 'productsSection' || s.sectionKey === 'bundle-products')
  const knowMoreSec = sections.find(s => s.name === 'knowMoreSection' || s.sectionKey === 'know-more-acidity')
  const careSec = sections.find(s => s.name === 'completeCareSection' || s.sectionKey === 'complete-care')
  
  const fallback = cmsStore.getPageSection('bundleDetails', 'bundleDetails') || {
    heroSection: { title: '', description: '', buttonText: '', buttonLink: '', image: '', discountText: '' },
    videoSection: { title: '', videos: [] },
    bundleBenefitsSection: { heading: '', introText: '', readMoreText: '', bundleTitle: '', benefits: [] },
    productsSection: { heading: '' },
    knowMoreSection: { heading: '', accordions: [] },
    completeCareSection: { heading: '', description: '', cards: [] }
  }

  // Resolve heroSection
  let heroImage = fallback.heroSection.image
  const rawHeroImage = heroSec?.extraData?.image || heroSec?.image
  if (rawHeroImage) {
    if (typeof rawHeroImage === 'string') {
      heroImage = rawHeroImage
    } else {
      heroImage = getCmsImageUrl(rawHeroImage)
    }
  }

  const resolvedHero = {
    title: heroSec?.title || fallback.heroSection.title,
    description: heroSec?.description || fallback.heroSection.description,
    buttonText: heroSec?.buttonText || fallback.heroSection.buttonText,
    buttonLink: heroSec?.buttonLink || fallback.heroSection.buttonLink,
    image: heroImage,
    discountText: heroSec?.extraData?._extraData?.discountText || heroSec?.extraData?.discountText || fallback.heroSection.discountText
  }

  // Resolve videoSection
  const resolvedVideoTitle = videoSec?.title || fallback.videoSection.title
  let resolvedVideos = fallback.videoSection.videos
  if (videoSec?.items && videoSec.items.length > 0) {
    resolvedVideos = videoSec.items.map(item => ({
      videoId: item.extraData?.videoId || '',
      title: item.title || '',
      description: item.description || ''
    }))
  }

  const resolvedVideoSection = {
    title: resolvedVideoTitle,
    videos: resolvedVideos
  }

  // Resolve bundleBenefitsSection
  let resolvedBenefits = fallback.bundleBenefitsSection.benefits
  if (benefitsSec?.items && benefitsSec.items.length > 0) {
    resolvedBenefits = benefitsSec.items.map(item => {
      let iconSrc = item.extraData?.icon || item.image || ''
      if (iconSrc && typeof iconSrc !== 'string') {
        iconSrc = getCmsImageUrl(iconSrc)
      }
      return {
        number: item.extraData?.number || 1,
        icon: iconSrc,
        text: item.title || item.extraData?.text || ''
      }
    })
  }

  const resolvedBenefitsSection = {
    heading: benefitsSec?.title || fallback.bundleBenefitsSection.heading,
    introText: benefitsSec?.description || fallback.bundleBenefitsSection.introText,
    readMoreText: benefitsSec?.extraData?._extraData?.readMoreText || benefitsSec?.extraData?.readMoreText || fallback.bundleBenefitsSection.readMoreText,
    bundleTitle: benefitsSec?.extraData?._extraData?.bundleTitle || benefitsSec?.extraData?.bundleTitle || fallback.bundleBenefitsSection.bundleTitle,
    benefits: resolvedBenefits
  }

  // Resolve productsSection
  const resolvedProductsSection = {
    heading: productsSec?.title || fallback.productsSection.heading
  }

  // Resolve knowMoreSection
  let resolvedAccordions = fallback.knowMoreSection.accordions
  if (knowMoreSec?.items && knowMoreSec.items.length > 0) {
    resolvedAccordions = knowMoreSec.items.map(item => {
      const fallbackAcc = fallback.knowMoreSection.accordions.find(a => a.id === item.name)
      let accImage = item.extraData?.image || item.image || fallbackAcc?.image || ''
      if (accImage && typeof accImage !== 'string') {
        accImage = getCmsImageUrl(accImage)
      }
      return {
        id: item.name || '',
        title: item.title || '',
        image: accImage,
        items: item.extraData?.items || []
      }
    })
  }

  const resolvedKnowMoreSection = {
    heading: knowMoreSec?.title || fallback.knowMoreSection.heading,
    accordions: resolvedAccordions
  }

  // Resolve completeCareSection
  let resolvedCards = fallback.completeCareSection.cards
  if (careSec?.items && careSec.items.length > 0) {
    resolvedCards = careSec.items.map((item, idx) => {
      const fallbackCard = fallback.completeCareSection.cards[idx] || fallback.completeCareSection.cards.find(c => c.title === item.title)
      let cardImage = item.extraData?.image || item.image || fallbackCard?.image || ''
      if (cardImage && typeof cardImage !== 'string') {
        cardImage = getCmsImageUrl(cardImage)
      }
      return {
        title: item.title || '',
        image: cardImage,
        description: item.description || '',
        highlight: item.extraData?.highlight || null
      }
    })
  }

  const resolvedCompleteCareSection = {
    heading: careSec?.title || fallback.completeCareSection.heading,
    description: careSec?.description || fallback.completeCareSection.description,
    cards: resolvedCards
  }

  return {
    heroSection: resolvedHero,
    videoSection: resolvedVideoSection,
    bundleBenefitsSection: resolvedBenefitsSection,
    productsSection: resolvedProductsSection,
    knowMoreSection: resolvedKnowMoreSection,
    completeCareSection: resolvedCompleteCareSection
  }
})

useHead({
  bodyAttrs: {
    class: 'product-details-page'
  }
})

const productStore = useProductStore()
const cartStore = useCartStore()
const activeSection = ref(null)

onMounted(() => {
  productStore.fetchProducts()
  if (process.client) {
    cartStore.loadCart()
  }
})

const toggleSection = (sectionId) => {
  activeSection.value = activeSection.value === sectionId ? null : sectionId
}

// Get products for bundle (first 3 products)
const bundleProducts = computed(() => {
  return productStore.allProducts.slice(0, 4)
})

const getProductImage = (product) => {
  return productStore.getPrimaryImage(product)
}

const getProductPrice = (product) => {
  return productStore.getProductPricing(product)
}

const getCartItem = (productId) => {
  return cartStore.getItemById(productId)
}

const addToCart = async (product) => {
  const pricing = getProductPrice(product)
  const defaultVariant = product.variants?.find(v => v.isDefault) || product.variants?.[0]
  const variantId = defaultVariant?.id || product.id

  await cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: parseFloat(pricing.price).toFixed(2),
    mrp: pricing.oldPrice ? parseFloat(pricing.oldPrice).toFixed(2) : null,
    image: getProductImage(product),
    subscription: 'One-time purchase',
    variantId: variantId
  })
}
</script>

<style scoped>
/* Align all sections with the navbar padding constraints */
.terms-conditions,
.video-section,
.vcn-acidity-bundle-section,
.vcn-new-product,
.acidity-info-container,
.care-wrapper {
  padding-left: 40px !important; /* Default for desktop >= 1200px */
  padding-right: 40px !important;
  box-sizing: border-box;
  width: 100%;
}

/* Small laptops and landscape tablets (992px to 1200px) */
@media (max-width: 1200px) {
  .terms-conditions,
  .video-section,
  .vcn-acidity-bundle-section,
  .vcn-new-product,
  .acidity-info-container,
  .care-wrapper {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

/* Mobile & Tablets (max-width: 991px) */
@media (max-width: 991px) {
  .terms-conditions,
  .video-section,
  .vcn-acidity-bundle-section,
  .vcn-new-product,
  .acidity-info-container,
  .care-wrapper {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}

/* Portrait Tablets / Large Phones (max-width: 768px) */
@media (max-width: 768px) {
  .terms-conditions,
  .video-section,
  .vcn-acidity-bundle-section,
  .vcn-new-product,
  .acidity-info-container,
  .care-wrapper {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

/* Phones (max-width: 576px) */
@media (max-width: 576px) {
  .terms-conditions,
  .video-section,
  .vcn-acidity-bundle-section,
  .vcn-new-product,
  .acidity-info-container,
  .care-wrapper {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

/* Small Phones (max-width: 380px) */
@media (max-width: 380px) {
  .terms-conditions,
  .video-section,
  .vcn-acidity-bundle-section,
  .vcn-new-product,
  .acidity-info-container,
  .care-wrapper {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}


/* Reset layout max widths */
.video-section,
.acidity-info-container,
.care-wrapper {
  max-width: 100% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.qty-box {
  display: flex;
  align-items: center;
  gap: 4px;
  background: white;
  border: 2px solid var(--vcn-primary);
  border-radius: 25px;
  padding: 6px 12px;
}

.qty-btn {
  background: none;
  border: none;
  color: var(--vcn-primary);
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.qty-btn:hover {
  background-color: var(--vcn-primary);
  color: white;
}

.qty-value {
  color: var(--vcn-primary);
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.product-title :deep(a) {
  color: inherit;
  text-decoration: none;
}

.product-title :deep(a:hover) {
  color: inherit;
}

/* Ensure consistent product image sizes and alignment */
.product-card {
  display: flex !important;
  flex-direction: row !important;
  background: var(--vcn-product) !important;
  border-radius: 16px !important;
  padding: 24px !important; /* Reduced from 40px to give more room for text */
  height: 100% !important;
  gap: 20px !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
  position: relative !important;
  align-items: stretch !important;
}

.product-card:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12) !important;
}

.product-image-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 220px !important; /* Elegant height */
  width: 200px !important;  /* Elegant width */
  flex-shrink: 0 !important;
  overflow: hidden !important;
  border-radius: 12px !important;
  padding: 10px !important;
}

.product-image {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  transition: transform 0.3s ease !important;
}

.product-card:hover .product-image {
  transform: scale(1.05) !important;
}

.product-badge {
  position: absolute !important;
  top: 12px !important;
  left: 12px !important;
  background: #4a5d4a !important;
  color: #ffffff !important;
  font-size: 11px !important;
  padding: 3px 9px !important;
  border-radius: 10px !important;
  font-weight: 600 !important;
  letter-spacing: 0.3px !important;
  z-index: 5 !important;
  text-transform: uppercase !important;
}

.product-content {
  flex: 1 !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
}

.product-label {
  display: inline-block !important;
  border: 1px solid #d0d0d0 !important;
  color: var(--vcn-footer) !important;
  padding: 3px 10px !important;
  border-radius: 12px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  letter-spacing: 0.3px !important;
  margin-bottom: 8px !important;
  width: fit-content !important;
  background: #ffffff !important;
}

.product-title {
  color: var(--vcn-footer) !important;
  font-size: 1.4rem !important; /* Elegant size */
  font-weight: 700 !important;
  margin-bottom: 8px !important;
  line-height: 1.3 !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 2 !important;
  line-clamp: 2 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  min-height: 3.6rem !important; /* Aligns description start */
}

.product-title a {
  color: inherit !important;
  text-decoration: none !important;
}

.product-description {
  color: var(--vcn-footer) !important;
  font-size: 1rem !important;
  line-height: 1.4 !important;
  margin-bottom: 12px !important;
  display: -webkit-box !important;
  -webkit-line-clamp: 3 !important;
  line-clamp: 3 !important;
  -webkit-box-orient: vertical !important;
  overflow: hidden !important;
  min-height: 4.2rem !important; /* Aligns price and actions */
  flex-grow: 1 !important;
}

.product-price {
  color: var(--vcn-footer) !important;
  font-size: 18px !important;
  font-weight: 700 !important;
  margin-bottom: 12px !important;
}

.product-price .old-price {
  color: #999 !important;
  font-size: 13px !important;
  text-decoration: line-through !important;
  margin-left: 8px !important;
  font-weight: 400 !important;
}

.product-actions {
  display: flex !important;
  gap: 12px !important;
  align-items: center !important;
  margin-top: auto !important;
}

.btn-learn {
  background: var(--vcn-darker) !important;
  color: #ffffff !important;
  padding: 8px 18px !important;
  border-radius: 24px !important;
  border: none !important;
  font-size: 13px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  text-decoration: none !important;
  display: inline-block !important;
  text-align: center !important;
}

.btn-learn:hover {
  background: var(--vcn-footer) !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
}

.btn-cart {
  color: var(--vcn-dark) !important;
  padding: 8px 12px !important;
  font-size: 14px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  text-decoration: underline !important;
  background: none !important;
  border: none !important;
  display: inline-block !important;
}

.btn-cart:hover {
  color: var(--vcn-dark) !important;
}

/* Tablet responsive adjustments */
@media (min-width: 768px) and (max-width: 1199.98px) {
  .product-card {
    flex-direction: column !important;
    text-align: center !important;
    padding: 24px !important;
    align-items: center !important;
  }

  .product-image-wrapper {
    width: 100% !important;
    height: 200px !important;
    margin-bottom: 16px !important;
    justify-content: center !important;
    display: flex !important;
  }

  .product-content {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    width: 100% !important;
  }

  .product-label {
    align-self: center !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .product-title {
    font-size: 1.3rem !important;
    min-height: 3.4rem !important;
    margin-bottom: 8px !important;
    width: 100% !important;
  }

  .product-description {
    font-size: 0.95rem !important;
    min-height: 4.0rem !important;
    margin-bottom: 12px !important;
    width: 100% !important;
  }

  .product-price {
    justify-content: center !important;
    font-size: 17px !important;
    margin-bottom: 12px !important;
  }

  .product-actions {
    justify-content: center !important;
    align-items: center !important;
  }
}

/* Mobile responsive adjustments */
@media (max-width: 767.98px) {
  .product-card {
    flex-direction: row !important;
    text-align: left !important;
    padding: 16px !important;
    gap: 16px !important;
    align-items: center !important;
  }

  .product-image-wrapper {
    width: 120px !important;
    height: 140px !important;
    margin-bottom: 0 !important;
    flex-shrink: 0 !important;
    border-radius: 12px !important;
    padding: 8px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    background: #f7f7f7 !important;
  }

  .product-image {
    max-width: 100% !important;
    max-height: 100% !important;
    object-fit: contain !important;
  }

  .product-content {
    flex: 1 !important;
    align-items: flex-start !important;
    display: flex !important;
    flex-direction: column !important;
    width: auto !important;
  }

  .product-badge {
    position: absolute !important;
    top: 8px !important;
    left: 8px !important;
    transform: none !important;
    background: #4a5d4a !important;
    color: #ffffff !important;
    font-size: 10px !important;
    padding: 2px 8px !important;
    border-radius: 10px !important;
    font-weight: 600 !important;
    letter-spacing: 0.3px !important;
    z-index: 5 !important;
  }

  .product-label {
    align-self: flex-start !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
    font-size: 10px !important;
    padding: 2px 8px !important;
    border-radius: 12px !important;
    margin-bottom: 6px !important;
    border: 1px solid #d0d0d0 !important;
    background: #ffffff !important;
  }

  .product-title {
    font-size: 15px !important;
    margin-bottom: 4px !important;
    font-weight: 700 !important;
    line-height: 1.3 !important;
    min-height: auto !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }

  .product-description {
    font-size: 12px !important;
    line-height: 1.4 !important;
    margin-bottom: 8px !important;
    min-height: auto !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }

  .product-price {
    font-size: 14px !important;
    font-weight: 700 !important;
    margin-bottom: 8px !important;
  }

  .product-actions {
    display: flex !important;
    flex-direction: row !important;
    align-items: center !important;
    gap: 12px !important;
    width: 100% !important;
  }

  .product-actions .btn-learn {
    background: #1e3322 !important;
    color: #ffffff !important;
    padding: 5px 12px !important;
    border-radius: 20px !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    text-decoration: none !important;
    display: inline-block !important;
    text-align: center !important;
  }

  .product-actions .btn-cart {
    background: none !important;
    border: none !important;
    color: #1e3322 !important;
    padding: 0 !important;
    font-size: 11px !important;
    font-weight: 600 !important;
    text-decoration: underline !important;
    cursor: pointer !important;
    display: inline-block !important;
  }

  .product-actions .qty-box {
    padding: 3px 6px !important;
    border-radius: 20px !important;
    gap: 2px !important;
  }

  .product-actions .qty-btn {
    width: 18px !important;
    height: 18px !important;
    font-size: 11px !important;
  }

  .product-actions .qty-value {
    font-size: 11px !important;
    min-width: 12px !important;
  }
}

/* Extra small mobile responsive adjustments */
@media (max-width: 480px) {
  .product-card {
    padding: 12px !important;
    gap: 12px !important;
  }

  .product-image-wrapper {
    width: 90px !important;
    height: 110px !important;
    padding: 4px !important;
  }

  .product-title {
    font-size: 14px !important;
  }

  .product-description {
    display: none !important;
  }

  .product-actions {
    gap: 8px !important;
  }

  .product-actions .btn-learn {
    padding: 4px 10px !important;
    font-size: 10px !important;
  }

  .product-actions .btn-cart {
    font-size: 10px !important;
  }
}
</style>
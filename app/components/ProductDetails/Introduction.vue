<template>
  <div class="pd2-root">

    <!-- ══════════════════════════════════════════════
         HERO — Split layout (Left: Light Media, Right: Dark Green Purchase Panel)
    ═══════════════════════════════════════════════ -->
    <section class="pd2-hero">

      <!-- LEFT panel: Light Product Media & Badges -->
      <div class="pd2-hero-left">
        <!-- Top-left badge -->
        <div class="pd2-float-badge pd2-float-badge--tl">
          <span class="pd2-fb-num">{{ badgeNumber }}</span>
          <span class="pd2-fb-label">{{ badgeLabelText }}</span>
        </div>

        <!-- Main image stage -->
        <div class="pd2-img-stage">
          <!-- Mobile swiper -->
          <div class="d-block d-md-none pd2-mobile-swiper-wrap">
            <div class="swiper product-images-swiper">
              <div class="swiper-wrapper">
                <div v-if="backendVideoUrl" class="swiper-slide">
                  <div class="pd2-mobile-slide">
                    <video :src="backendVideoUrl" autoplay loop muted playsinline class="pd2-mobile-media" />
                  </div>
                </div>
                <div v-for="(img, i) in allProductImages" :key="i" class="swiper-slide">
                  <div class="pd2-mobile-slide">
                    <img :src="img" :alt="productName" class="pd2-mobile-media" @error="handleImageError($event)" @click="openProductPreview(img)" />
                  </div>
                </div>
              </div>
              <div class="swiper-pagination product-images-swiper-pagination pd2-mob-dots"></div>
            </div>
          </div>

          <!-- Desktop: main media -->
          <div class="d-none d-md-block pd2-desktop-img">
            <div class="pd2-glow-bg"></div>
            <video v-if="backendVideoUrl && !selectedImage" :src="backendVideoUrl" autoplay loop muted playsinline class="pd2-main-media" />
            <img v-else :src="displayImage" :alt="productName" class="pd2-main-media" @error="handleImageError($event)" @click="openProductPreview(displayImage)" />
          </div>

          <!-- Desktop: bottom thumbnail row -->
          <div class="d-none d-md-flex pd2-thumb-row" v-if="allProductImages.length > 1">
            <button
              v-if="backendVideoUrl"
              type="button"
              class="pd2-thumb"
              :class="{ active: !selectedImage }"
              @click="selectedImage = null"
            >
              <span class="pd2-thumb-play">▶</span>
            </button>
            <button
              v-for="(img, i) in allProductImages"
              :key="i"
              type="button"
              class="pd2-thumb"
              :class="{ active: selectedImage === img || (!selectedImage && i === 0) }"
              @click="selectedImage = img"
            >
              <img :src="img" :alt="productName" @error="handleImageError($event)" />
            </button>
          </div>
        </div>

        <!-- Bottom-right badge -->
        <div class="pd2-float-badge pd2-float-badge--br">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          <span>GMP Certified</span>
        </div>
      </div>

      <!-- RIGHT panel: Dark Green Info & Checkout Box -->
      <div class="pd2-hero-right">
        <div class="pd2-hero-right-inner">

          <!-- Header top bar (Stars & Reviews) -->
          <div class="pd2-header-top-row">
            <div class="pd2-rating-row">
              <div class="pd2-stars">
                <span v-for="s in 5" :key="s" class="pd2-star" :class="{ on: s <= Math.round(averageRating) }">★</span>
              </div>
              <span class="pd2-rating-num">{{ averageRating.toFixed(1) }}</span>
              <a href="#reviews" class="pd2-rating-reviews">({{ totalReviews }} reviews)</a>
            </div>
          </div>

          <!-- Product Name -->
          <h1 class="pd2-product-name">{{ productName }}</h1>

          <!-- Description -->
          <p class="pd2-description" v-html="productDescription"></p>

          <!-- Checkmark Bullets -->
          <ul class="pd2-check-list">
            <li v-for="(bullet, index) in featureBullets" :key="index">
              <svg class="pd2-check-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>{{ bullet }}</span>
            </li>
          </ul>

          <!-- Choose Pack Section -->
          <div class="pd2-pack-section">
            <div class="pd2-pack-header">
              <span class="pd2-pack-title">CHOOSE PACK</span>
              <span class="pd2-save-tag">Save up to 25%</span>
            </div>

            <div class="pd2-pack-grid">
              <!-- Pack 1 (Single / 500ml) -->
              <div
                class="pd2-pack-card"
                :class="{ active: selectedPackIndex === 0 }"
                @click="selectPack(0)"
              >
                <div class="pd2-pack-top">
                  <span class="pd2-pack-name">500ml</span>
                  <span class="pd2-pack-badge">-15%</span>
                </div>
                <div class="pd2-pack-price-wrap">
                  <span class="pd2-pp-main">₹849</span>
                  <span class="pd2-pp-mrp">₹999</span>
                </div>
              </div>

              <!-- Pack 2 (Pack of 2 / 1000ml) -->
              <div
                class="pd2-pack-card"
                :class="{ active: selectedPackIndex === 1 }"
                @click="selectPack(1)"
              >
                <div class="pd2-pack-top">
                  <span class="pd2-pack-name">1000ml (Pack of 2)</span>
                  <span class="pd2-pack-badge">-25%</span>
                </div>
                <div class="pd2-pack-price-wrap">
                  <span class="pd2-pp-main">₹1499</span>
                  <span class="pd2-pp-mrp">₹1998</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Price Display -->
          <div class="pd2-price-block">
            <div class="pd2-price-row">
              <span class="pd2-price-main">₹{{ currentPrice }}</span>
              <span class="pd2-price-mrp" v-if="currentMrp">₹{{ currentMrp }}</span>
              <span class="pd2-price-off" v-if="currentDiscount">{{ currentDiscount }}% OFF</span>
            </div>
            <span class="pd2-tax-sub">Incl. of all taxes</span>
          </div>

          <!-- Quantity Stepper & CTAs -->
          <div class="pd2-action-row">
            <div class="pd2-qty-stepper">
              <button type="button" class="pd2-qty-btn" @click="decrementQty">−</button>
              <span class="pd2-qty-val">{{ quantity }}</span>
              <button type="button" class="pd2-qty-btn" @click="incrementQty">+</button>
            </div>

            <button type="button" class="pd2-btn-buy" @click="handleBuyNow">
              Buy Now
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>

            <button type="button" class="pd2-btn-cart" @click="handleAddToCart">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              Add to Cart
            </button>
          </div>

          <!-- Trust Badges Strip -->
          <div class="pd2-trust-strip">
            <div class="pd2-trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>30-Day<br>Guarantee</span>
            </div>
            <div class="pd2-trust-sep"></div>
            <div class="pd2-trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="1" y="3" width="15" height="13"/>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                <circle cx="5.5" cy="18.5" r="2.5"/>
                <circle cx="18.5" cy="18.5" r="2.5"/>
              </svg>
              <span>Free<br>Delivery</span>
            </div>
            <div class="pd2-trust-sep"></div>
            <div class="pd2-trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <span>AYUSH<br>Standard</span>
            </div>
            <div class="pd2-trust-sep"></div>
            <div class="pd2-trust-item">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span>100%<br>Ayurvedic</span>
            </div>
          </div>

          <!-- Accordion Sections (Uses, Directions, Benefits, Ingredients) -->
          <div class="pd2-accordion-group">
            <div
              v-for="(acc, i) in accordionList"
              :key="i"
              class="pd2-acc-item"
              :class="{ open: openAccordion === acc.id }"
            >
              <button type="button" class="pd2-acc-header" @click="toggleAccordion(acc.id)">
                <span>{{ acc.title }}</span>
                <svg class="pd2-acc-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
              <div class="pd2-acc-body" v-show="openAccordion === acc.id">
                <p v-if="typeof acc.content === 'string'">{{ acc.content }}</p>
                <ul v-else class="pd2-acc-list">
                  <li v-for="(item, idx) in acc.content" :key="idx">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>

    <!-- Sticky Buy Bar -->
    <div class="pd2-sticky-bar" :class="{ visible: showStickyBar }">
      <div class="pd2-sticky-inner">
        <div class="pd2-sticky-left">
          <img :src="displayImage" :alt="productName" class="pd2-sticky-img" />
          <div class="pd2-sticky-info">
            <span class="pd2-sticky-name">{{ productName }}</span>
            <span class="pd2-sticky-size">{{ selectedPackIndex === 0 ? '500ml' : '1000ml (Pack of 2)' }}</span>
          </div>
        </div>
        <div class="pd2-sticky-right">
          <span class="pd2-sticky-price">₹{{ currentPrice }}</span>
          <button type="button" class="pd2-sticky-btn" @click="handleBuyNow">Buy Now →</button>
        </div>
      </div>
    </div>

    <!-- Lightbox Preview -->
    <Teleport to="body">
      <div v-if="isPreviewOpen" class="pd2-lightbox" @click.self="closeProductPreview">
        <button type="button" class="pd2-lb-close" @click="closeProductPreview">✕</button>
        <div class="pd2-lb-content">
          <img class="pd2-lb-main" :src="previewImage" :alt="productName" @error="handleImageError($event)" />
          <div class="pd2-lb-thumbs" v-if="allProductImages.length > 1">
            <button
              v-for="img in allProductImages"
              :key="img"
              type="button"
              class="pd2-lb-thumb"
              :class="{ active: previewImage === img }"
              @click="previewImage = img"
            >
              <img :src="img" :alt="productName" @error="handleImageError($event)" />
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch, nextTick } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useProductStore } from '~/stores/product'
import { useAuthCart } from '~/composables/useAuthCart'
import { getProductReviewsUrl } from '~/config/api/endpoints'
import { useApi } from '~/config/api/useApi'

const props = defineProps({
  productPage: { type: Object, default: null }
})

const cartStore = useCartStore()
const productStore = useProductStore()
const { initializeCart } = useAuthCart()
const route = useRoute()

const product = ref(null)
const loading = ref(true)
const averageRating = ref(4.8)
const totalReviews = ref(142)
const isPreviewOpen = ref(false)
const previewImage = ref('')
const showStickyBar = ref(false)
const selectedImage = ref(null)

const selectedPackIndex = ref(0)
const quantity = ref(1)
const openAccordion = ref('uses')

const productSlug = computed(() => route.params.slug)

const buildFallbackProduct = (slug) => ({
  id: 11,
  slug: slug || 'dbt-care-plus',
  name: 'DBT Care Plus',
  description: 'Ayurvedic herbal juice formulated with 11 potent herbs to fuel your body, balance metabolism, and naturally control blood sugar levels.',
  price: '849.00',
  mrp: '999.00',
  image: '/img/productsdetails/BOOSTER.png',
  images: ['/img/productsdetails/BOOSTER.png'],
  rating: 4.8,
  reviewCount: 142,
  badgeLabel: '11 Ayurvedic Herbs',
  uses: 'Helps regulate blood sugar levels, Improves insulin sensitivity, Boosts energy and vitality, Supports liver and kidney health',
  directionsForUse: 'Take 20-30ml twice daily before meals mixed with lukewarm water, or as directed by an Ayurvedic physician.',
  primaryBenefits: '100% Ayurvedic formulation, Controls blood sugar naturally, Free from artificial chemicals and preservatives, Made with pure plant extracts',
  ingredients: 'Jamun, Karela, Gudmar, Methi, Neem, Amla, Vijaysar, Giloy, Harad, Baheda, Bael Patra'
})

const loadProduct = async (slugVal) => {
  if (!slugVal) return
  loading.value = true
  const fallback = props.productPage?.product || buildFallbackProduct(slugVal)
  if (fallback) {
    product.value = fallback
    if (fallback.rating) averageRating.value = fallback.rating
    if (fallback.reviewCount) totalReviews.value = fallback.reviewCount
  }
  try {
    const result = await productStore.fetchProductBySlug(slugVal, true)
    if (result?.success && productStore.selectedProduct) {
      const productData = Array.isArray(productStore.selectedProduct)
        ? productStore.selectedProduct[0]
        : productStore.selectedProduct
      if (productData) product.value = productData
    }
  } catch (err) {
    console.warn('API fetch warning:', err)
  }
  loading.value = false
  await fetchReviews()
}

watch(() => route.params.slug, (newSlug) => {
  if (newSlug) loadProduct(newSlug)
}, { immediate: true })

const handleScroll = () => {
  showStickyBar.value = window.scrollY > 480
}

onMounted(async () => {
  await initializeCart()
  await cartStore.loadCart()
  if (process.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
  }
})

const fetchReviews = async () => {
  const productId = product.value?.id
  if (!productId) return
  try {
    const endpoint = getProductReviewsUrl(productId)
    const { data, error: reviewsError } = await useApi().get(endpoint)
    if (!reviewsError && data && data.success && data.data?.reviews?.length > 0) {
      averageRating.value = data.data.averageRating || 4.8
      totalReviews.value = data.data.totalReviews || 142
    }
  } catch (err) {}
}

const productName = computed(() => product.value?.name || 'DBT Care Plus')

const productDescription = computed(() => {
  return product.value?.description || 'Ayurvedic herbal juice formulated with 11 potent herbs to fuel your body, balance metabolism, and naturally control blood sugar levels.'
})

const featureBullets = computed(() => [
  'Helps regulate blood sugar levels',
  'Improves insulin sensitivity',
  'Boosts energy and vitality'
])

const selectPack = (index) => {
  selectedPackIndex.value = index
}

const incrementQty = () => { quantity.value++ }
const decrementQty = () => { if (quantity.value > 1) quantity.value-- }

const currentPrice = computed(() => selectedPackIndex.value === 0 ? '849' : '1499')
const currentMrp = computed(() => selectedPackIndex.value === 0 ? '999' : '1998')
const currentDiscount = computed(() => selectedPackIndex.value === 0 ? 15 : 25)

const badgeNumber = computed(() => '11')
const badgeLabelText = computed(() => 'AYURVEDIC HERBS')

const allProductImages = computed(() => {
  if (product.value?.images?.length > 0) return product.value.images
  if (product.value?.image) return [product.value.image]
  return ['/img/productsdetails/BOOSTER.png', '/img/productsdetails/comonimages1.png', '/img/productsdetails/comonimages2.png']
})

const displayImage = computed(() => selectedImage.value || allProductImages.value[0] || '/img/productsdetails/BOOSTER.png')
const backendVideoUrl = computed(() => '')

const handleImageError = (e) => {
  if (e?.target) e.target.src = '/img/productsdetails/BOOSTER.png'
}

const toggleAccordion = (id) => {
  openAccordion.value = openAccordion.value === id ? null : id
}

const accordionList = computed(() => [
  {
    id: 'uses',
    title: 'Uses',
    content: [
      'Helps manage healthy blood sugar levels',
      'Supports pancreatic function & insulin release',
      'Boosts daily vitality and combats diabetic weakness',
      'Promotes digestive health and blood purification'
    ]
  },
  {
    id: 'directions',
    title: 'Directions',
    content: 'Take 20–30ml twice daily before meals mixed with lukewarm water, or as directed by an Ayurvedic physician.'
  },
  {
    id: 'benefits',
    title: 'Benefits',
    content: [
      '100% Ayurvedic herbal formulation',
      'Controls blood sugar naturally',
      'Free from artificial chemicals and synthetic preservatives',
      'Dual action: sugar control & cellular detox'
    ]
  },
  {
    id: 'ingredients',
    title: 'Ingredients',
    content: 'Karela, Gurmar, Neem, Vijayasar, Shudh Shilajit, Punarnava, Giloy, Jamun, Aloe Vera, Chirata, Methi.'
  }
])

const handleAddToCart = () => {
  cartStore.addToCart({
    id: product.value?.id || 11,
    productId: product.value?.id || 11,
    variantId: selectedPackIndex.value + 1,
    name: productName.value,
    variantName: selectedPackIndex.value === 0 ? '500ml' : '1000ml (Pack of 2)',
    price: currentPrice.value,
    mrp: currentMrp.value,
    image: displayImage.value,
    quantity: quantity.value
  })
}

const handleBuyNow = async () => {
  handleAddToCart()
  await navigateTo('/cart')
}

const openProductPreview = (img) => {
  previewImage.value = img
  isPreviewOpen.value = true
}

const closeProductPreview = () => {
  isPreviewOpen.value = false
}
</script>

<style scoped>
.pd2-root {
  font-family: "Outfit", sans-serif;
  width: 100%;
}

/* ── HERO SPLIT LAYOUT ── */
.pd2-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  min-height: 720px;
  padding-top:40px;
}

@media (max-width: 991px) {
  .pd2-hero {
    grid-template-columns: 1fr;
  }
}

/* ── LEFT PANEL (Light Background) ── */
.pd2-hero-left {
  background: #FAFAF7;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.pd2-float-badge {
  position: absolute;
  background: rgba(220, 245, 200, 0.6);
  border: 1px solid #789938;
  border-radius: 12px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  backdrop-filter: blur(4px);
  z-index: 5;
}

.pd2-float-badge--tl {
  top: 32px;
  left: 32px;
}

.pd2-float-badge--br {
  bottom: 32px;
  right: 32px;
}

.pd2-fb-num {
  font-size: 20px;
  font-weight: 900;
  color: #123319;
  line-height: 1;
}

.pd2-fb-label {
  font-size: 10px;
  font-weight: 800;
  color: #123319;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.pd2-float-badge--br svg {
  color: #123319;
}
.pd2-float-badge--br span {
  font-size: 11px;
  font-weight: 700;
  color: #123319;
}

/* Image stage */
.pd2-img-stage {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 460px;
}

.pd2-desktop-img {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.pd2-glow-bg {
  position: absolute;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(240,248,235,0.8) 50%, rgba(255,255,255,0) 100%);
  border-radius: 50%;
  z-index: 1;
}

.pd2-main-media {
  position: relative;
  z-index: 2;
  max-height: 420px;
  width: auto;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.pd2-main-media:hover {
  transform: scale(1.03);
}

.pd2-thumb-row {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  z-index: 2;
}

.pd2-thumb {
  width: 56px;
  height: 56px;
  border-radius: 8px;
  border: 1px solid #D5E0D0;
  background: #ffffff;
  padding: 4px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;
}

.pd2-thumb.active {
  border-color: #123319;
  border-width: 2px;
  box-shadow: 0 4px 12px rgba(18,51,25,0.15);
}

.pd2-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* ── RIGHT PANEL (Dark Green Background) ── */
.pd2-hero-right {
  background: #0E2917;
  color: #ffffff;
  padding: 48px 56px;
  display: flex;
  align-items: center;
}

.pd2-hero-right-inner {
  width: 100%;
  max-width: 580px;
  margin: 0 auto;
}

@media (max-width: 1199px) {
  .pd2-hero-right {
    padding: 40px 32px;
  }
}

/* Rating Row */
.pd2-header-top-row {
  margin-bottom: 16px;
}

.pd2-rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pd2-stars {
  color: #F5C518;
  font-size: 15px;
  letter-spacing: 2px;
}

.pd2-rating-num {
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
}

.pd2-rating-reviews {
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  text-decoration: underline;
}

/* Title & Description */
.pd2-product-name {
  font-size: clamp(36px, 4vw, 48px);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 16px 0;
  line-height: 1.1;
  letter-spacing: -0.5px;
}

.pd2-description {
  font-size: 15px;
  line-height: 1.6;
  color: rgba(255,255,255,0.8);
  margin-bottom: 24px;
}

/* Checkmark Bullets */
.pd2-check-list {
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pd2-check-list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  color: rgba(255,255,255,0.95);
}

.pd2-check-icon {
  width: 16px;
  height: 16px;
  color: #8EF375;
  flex-shrink: 0;
}

/* Choose Pack Section */
.pd2-pack-section {
  margin-bottom: 28px;
}

.pd2-pack-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.pd2-pack-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1.2px;
  color: rgba(255,255,255,0.7);
  text-transform: uppercase;
}

.pd2-save-tag {
  font-size: 11px;
  font-weight: 700;
  background: rgba(142, 243, 117, 0.15);
  border: 1px solid rgba(142, 243, 117, 0.4);
  color: #8EF375;
  padding: 3px 10px;
  border-radius: 12px;
}

.pd2-pack-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.pd2-pack-card {
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 14px 16px;
  background: rgba(255,255,255,0.03);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pd2-pack-card.active {
  border-color: #8EF375;
  background: rgba(142, 243, 117, 0.08);
  box-shadow: 0 0 0 1px #8EF375;
}

.pd2-pack-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.pd2-pack-name {
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
}

.pd2-pack-badge {
  font-size: 10px;
  font-weight: 800;
  background: rgba(255,255,255,0.15);
  color: #ffffff;
  padding: 2px 6px;
  border-radius: 4px;
}

.pd2-pack-card.active .pd2-pack-badge {
  background: #8EF375;
  color: #0E2917;
}

.pd2-pack-price-wrap {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.pd2-pp-main {
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
}

.pd2-pp-mrp {
  font-size: 12px;
  color: rgba(255,255,255,0.4);
  text-decoration: line-through;
}

/* Price Block */
.pd2-price-block {
  margin-bottom: 24px;
}

.pd2-price-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pd2-price-main {
  font-size: 38px;
  font-weight: 900;
  color: #ffffff;
  letter-spacing: -1px;
}

.pd2-price-mrp {
  font-size: 16px;
  color: rgba(255,255,255,0.45);
  text-decoration: line-through;
}

.pd2-price-off {
  font-size: 12px;
  font-weight: 800;
  background: rgba(142, 243, 117, 0.2);
  color: #8EF375;
  padding: 4px 10px;
  border-radius: 16px;
  border: 1px solid rgba(142, 243, 117, 0.4);
}

.pd2-tax-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.5);
  display: block;
  margin-top: 2px;
}

/* Action Buttons & Stepper */
.pd2-action-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.pd2-qty-stepper {
  display: flex;
  align-items: center;
  border: 1px solid rgba(255,255,255,0.25);
  border-radius: 26px;
  padding: 4px 12px;
  height: 48px;
}

.pd2-qty-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  padding: 0 8px;
}

.pd2-qty-val {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  min-width: 20px;
  text-align: center;
}

.pd2-btn-buy {
  flex: 1;
  height: 48px;
  background: #ffffff;
  color: #0E2917;
  border: none;
  border-radius: 24px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.pd2-btn-buy:hover {
  background: #E2F5DB;
  transform: translateY(-1px);
}

.pd2-btn-cart {
  height: 48px;
  padding: 0 20px;
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 24px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.pd2-btn-cart:hover {
  border-color: #ffffff;
  background: rgba(255,255,255,0.08);
}

/* Trust Badges Strip */
.pd2-trust-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: 18px 0;
  border-top: 1px solid rgba(255,255,255,0.12);
  border-bottom: 1px solid rgba(255,255,255,0.12);
  margin-bottom: 28px;
}

.pd2-trust-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 6px;
  font-size: 11px;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  line-height: 1.2;
}

.pd2-trust-item svg {
  color: #8EF375;
}

.pd2-trust-sep {
  display: none;
}

/* Accordion Section */
.pd2-accordion-group {
  display: flex;
  flex-direction: column;
  border-top: 1px solid rgba(255,255,255,0.12);
}

.pd2-acc-item {
  border-bottom: 1px solid rgba(255,255,255,0.12);
}

.pd2-acc-header {
  width: 100%;
  background: none;
  border: none;
  padding: 16px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
}

.pd2-acc-chevron {
  transition: transform 0.3s ease;
  color: rgba(255,255,255,0.6);
}

.pd2-acc-item.open .pd2-acc-chevron {
  transform: rotate(180deg);
  color: #8EF375;
}

.pd2-acc-body {
  padding: 0 0 16px 0;
  font-size: 13.5px;
  line-height: 1.6;
  color: rgba(255,255,255,0.75);
}

.pd2-acc-list {
  padding-left: 18px;
  margin: 0;
}

.pd2-acc-list li {
  margin-bottom: 4px;
}

/* Sticky Bottom Bar */
.pd2-sticky-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #0E2917;
  border-top: 1px solid rgba(255,255,255,0.15);
  padding: 12px 24px;
  z-index: 99;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  box-shadow: 0 -4px 20px rgba(0,0,0,0.3);
}

.pd2-sticky-bar.visible {
  transform: translateY(0);
}

.pd2-sticky-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pd2-sticky-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.pd2-sticky-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
  background: #ffffff;
  border-radius: 6px;
  padding: 2px;
}

.pd2-sticky-info {
  display: flex;
  flex-direction: column;
}

.pd2-sticky-name {
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
}

.pd2-sticky-size {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
}

.pd2-sticky-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.pd2-sticky-price {
  font-weight: 900;
  font-size: 20px;
  color: #ffffff;
}

.pd2-sticky-btn {
  background: #ffffff;
  color: #0E2917;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: 800;
  font-size: 14px;
  cursor: pointer;
}

/* Lightbox Modal */
.pd2-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pd2-lb-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  color: #ffffff;
  font-size: 24px;
  cursor: pointer;
}

.pd2-lb-main {
  max-width: 80vw;
  max-height: 80vh;
  object-fit: contain;
}

@media (max-width: 576px) {
  .pd2-hero-right {
    padding: 32px 20px;
  }
  .pd2-pack-grid {
    grid-template-columns: 1fr;
  }
  .pd2-action-row {
    flex-wrap: wrap;
  }
  .pd2-btn-buy, .pd2-btn-cart {
    width: 100%;
  }
  .pd2-qty-stepper {
    width: 100%;
    justify-content: space-between;
  }
}
</style>

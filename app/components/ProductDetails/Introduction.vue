<template>
  <div class="pd2-root">

    <!-- ══════════════════════════════════════════════
         HERO — Split layout (Left: Light Media, Right: Dark Green Purchase Panel)
    ═══════════════════════════════════════════════ -->
    <section class="pd2-hero" ref="heroSection">

      <!-- LEFT panel: Product Media Gallery -->
      <div class="pd2-hero-left">
        <!-- Accent badge (top-left) -->
        <div class="pd2-float-badge pd2-float-badge--tl">
          <span class="pd2-fb-num">{{ badgeNumber }}</span>
          <span class="pd2-fb-label">{{ badgeLabelText }}</span>
        </div>

        <div class="pd2-gallery">
          <!-- Main media stage -->
          <div class="pd2-stage">
            <video v-if="backendVideoUrl && !selectedImage" :src="backendVideoUrl" autoplay loop muted playsinline class="pd2-main-media" />
            <img v-else :src="displayImage" :alt="productName" class="pd2-main-media" @error="handleImageError($event)" @click="openProductPreview(displayImage)" />
          </div>

          <!-- Horizontal thumbnail row -->
          <div class="pd2-thumb-row" v-if="allProductImages.length > 1 || backendVideoUrl">
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

        <!-- Quality badge (bottom-right) -->
        <div class="pd2-float-badge pd2-float-badge--br">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <polyline points="9 12 11 14 15 10"/>
          </svg>
          <span>{{ qualityBadgeText }}</span>
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
              <span class="pd2-pack-title">{{ packSectionLabel }}</span>
              <span class="pd2-save-tag">{{ packSaveTag }}</span>
            </div>

            <div class="pd2-pack-grid">
              <div
                v-for="(pack, pIndex) in packs"
                :key="pIndex"
                class="pd2-pack-card"
                :class="{ active: selectedPackIndex === pIndex }"
                @click="selectPack(pIndex)"
              >
                <div class="pd2-pack-top">
                  <span class="pd2-pack-name">{{ pack.sku }}</span>
                  <span class="pd2-pack-badge" v-if="pack.badge">-{{ pack.badge }}%</span>
                </div>
                <div class="pd2-pack-price-wrap">
                  <span class="pd2-pp-main">₹{{ pack.price }}</span>
                  <span class="pd2-pp-mrp" v-if="pack.mrp">₹{{ pack.mrp }}</span>
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
            <span class="pd2-tax-sub">{{ taxNotice }}</span>
          </div>
      
          <!-- Quantity Stepper & CTAs -->
          <div class="pd2-action-row">
            <div class="pd2-qty-stepper">
              <button
                type="button"
                class="pd2-qty-btn"
                :disabled="quantity <= 1"
                @click="decrementQty"
                aria-label="Decrease quantity"
              >−</button>
              <span class="pd2-qty-val">{{ quantity }}</span>
              <button
                type="button"
                class="pd2-qty-btn"
                @click="incrementQty"
                aria-label="Increase quantity"
              >+</button>
            </div>

            <button
              type="button"
              class="pd2-btn-cart"
              :class="{ 'is-added': isAdded }"
              @click="handleAddToCart"
            >
              <template v-if="isAdded">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Added!</span>
              </template>
              <template v-else>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                  <line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
                <span>{{ heroCtaSecondary }}</span>
              </template>
            </button>

            <button type="button" class="pd2-btn-buy" @click="handleBuyNow">
              {{ heroCtaPrimary }}<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </button>
          </div>

          <!-- Trust Badges Strip -->
          <div class="pd2-trust-strip">
            <template v-for="(g, gi) in guaranteeItems" :key="g.text">
              <div class="pd2-trust-item">
                <svg v-if="g.icon === 'truck'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="1" y="3" width="15" height="13"/>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/>
                  <circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
                <svg v-else-if="g.icon === 'check'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <svg v-else-if="g.icon === 'star'" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>{{ g.text }}</span>
              </div>
              <div v-if="gi < guaranteeItems.length - 1" class="pd2-trust-sep"></div>
            </template>
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
            <span class="pd2-sticky-size">{{ currentPack.sku }}</span>
          </div>
        </div>
        <div class="pd2-sticky-right">
          <span class="pd2-sticky-price">₹{{ currentPrice }}</span>
          <button type="button" class="pd2-sticky-btn" @click="handleBuyNow">{{ heroCtaPrimary }} →</button>
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
import { useCmsStore } from '~/stores/cms'
import { useAuthCart } from '~/composables/useAuthCart'
import { getProductReviewsUrl } from '~/config/api/endpoints'
import { useApi } from '~/config/api/useApi'

const props = defineProps({
  productPage: { type: Object, default: null }
})

const cartStore = useCartStore()
const productStore = useProductStore()
const cmsStore = useCmsStore()
const { initializeCart } = useAuthCart()
const route = useRoute()

const product = ref(null)
const loading = ref(true)
const averageRating = ref(4.8)
const totalReviews = ref(142)
const isPreviewOpen = ref(false)
const previewImage = ref('')
const showStickyBar = ref(false)
const heroSection = ref(null)
const selectedImage = ref(null)

const selectedPackIndex = ref(0)
const quantity = ref(1)
const isAdded = ref(false)
let addedTimer = null
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
  variants: [
    { id: 1, sku: '500ml', sellingPrice: '849.00', mrp: '999.00', isDefault: true },
    { id: 2, sku: '1000ml (Pack of 2)', sellingPrice: '1499.00', mrp: '1998.00' }
  ],
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

// Buy bar visibility is driven by the intro/hero section scrolling out of the
// window instead of a fixed scroll offset — the hero height varies per product
// and per viewport, so a hardcoded pixel threshold fires too early or far too
// late. The bar appears once half of the hero has left the top of the window,
// which resolves to the same scroll distance on desktop, tablet and phone.
//
// An IntersectionObserver cannot express this reliably. `threshold: 0.5` fails
// because on a phone the hero is ~2.7 screens tall, so its visible ratio never
// drops below ~0.45 and the bar would be stuck on. A `rootMargin` of
// "-halfHero" fails for the same reason: on a phone that margin (894px)
// exceeds the viewport height (667px), which collapses the observed root to an
// empty rect and pins the bar on in Firefox. Comparing the hero's rect against
// the scroll position avoids both failure modes.
let stickyBarFrame = null

const updateStickyBar = () => {
  stickyBarFrame = null
  if (!heroSection.value) return
  const rect = heroSection.value.getBoundingClientRect()
  showStickyBar.value = -rect.top >= rect.height / 2
}

// Coalesced to one measurement per frame, and passive so scrolling never blocks.
const handleScroll = () => {
  if (stickyBarFrame !== null) return
  stickyBarFrame = requestAnimationFrame(updateStickyBar)
}

onMounted(async () => {
  if (process.client) {
    // Run once up front so the bar is correct on first paint and on a reload
    // that restores a scrolled position.
    updateStickyBar()
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Mobile browsers resize the viewport constantly as the URL bar collapses.
    window.addEventListener('resize', handleScroll, { passive: true })
  }

  await initializeCart()
  await cartStore.loadCart()
})

onBeforeUnmount(() => {
  if (process.client) {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleScroll)
  }
  if (stickyBarFrame !== null) {
    cancelAnimationFrame(stickyBarFrame)
    stickyBarFrame = null
  }
  if (addedTimer) {
    clearTimeout(addedTimer)
    addedTimer = null
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

const featureBullets = computed(() => {
  const src = product.value?.uses || product.value?.primaryBenefits
  if (src) {
    return src.split(/[,.]\s*/).map(s => s.trim()).filter(Boolean).slice(0, 3)
  }
  return [
    'Helps regulate blood sugar levels',
    'Improves insulin sensitivity',
    'Boosts energy and vitality'
  ]
})

const selectPack = (index) => {
  selectedPackIndex.value = index
}

const incrementQty = () => { if (quantity.value < 99) quantity.value++ }
const decrementQty = () => { if (quantity.value > 1) quantity.value-- }

// ── Packs & pricing (variant-driven, fallback only) ──
const packs = computed(() => {
  const variants = product.value?.variants || []
  if (variants.length > 0) {
    return variants.map((v) => {
      const price = parseFloat(v.sellingPrice)
      const mrp = parseFloat(v.mrp)
      return {
        id: v.id,
        sku: v.sku || 'Standard Pack',
        price: isFinite(price) ? price.toFixed(0) : '849',
        mrp: isFinite(mrp) && mrp > 0 ? mrp.toFixed(0) : null,
        badge: isFinite(price) && isFinite(mrp) && mrp > price ? Math.round((1 - price / mrp) * 100) : null
      }
    })
  }
  return [
    { id: 1, sku: '500ml', price: '849', mrp: '999', badge: 15 },
    { id: 2, sku: '1000ml (Pack of 2)', price: '1499', mrp: '1998', badge: 25 }
  ]
})

const currentPack = computed(() => packs.value[selectedPackIndex.value] || packs.value[0])
const currentPrice = computed(() => currentPack.value.price)
const currentMrp = computed(() => currentPack.value.mrp || '')
const currentDiscount = computed(() => currentPack.value.badge || 0)

const packSaveTag = computed(() => {
  const max = Math.max(...packs.value.map(p => p.badge || 0))
  return max ? `Save up to ${max}%` : ''
})

// ── Badges (product-driven, fallback only) ──
const badgeNumber = computed(() => {
  const bl = product.value?.badgeLabel || ''
  const match = bl.match(/^\d+/)
  return match ? match[0] : '11'
})
const badgeLabelText = computed(() => {
  const bl = product.value?.badgeLabel || ''
  if (bl) return bl.replace(/^\d+\s*/, '').toUpperCase()
  return 'AYURVEDIC HERBS'
})

// ── Media extraction (backend media objects → URLs) ──
const toWebpUrl = (url) => {
  if (!url || typeof url !== 'string') return url
  if (!/\.jpe?g($|\?)/i.test(url)) return url
  return url
    .replace(/\/images\/(original|large|medium|thumb)\//i, '/images/webp/')
    .replace(/\.jpe?g($|\?)/i, '.webp$1')
}

const getMediaImageUrl = (image) => {
  if (!image) return null
  if (typeof image === 'string') return toWebpUrl(image)
  const media = image?.media || image
  if (!media || media.type === 'VIDEO' || media.mimeType?.startsWith('video/')) return null
  const url = media.variants?.webp || media.webpUrl || media.variants?.large || media.variants?.medium || media.fileUrl || null
  return toWebpUrl(url)
}

const getMediaVideoUrl = (item) => {
  if (!item) return null
  const media = item?.media || item
  if (!media) return null
  const isVideo = media.type === 'VIDEO' || media.mimeType?.startsWith('video/')
  if (!isVideo) return null
  return media.variants?.original || media.originalUrl || media.fileUrl || null
}

const allProductImages = computed(() => {
  const variants = product.value?.variants || []
  const source = [
    ...(product.value?.images || []),
    ...(product.value?.media || []),
    ...variants.flatMap(v => v.productImages || [])
  ]
  const urls = Array.from(new Set(source.map(getMediaImageUrl).filter(Boolean)))
  if (urls.length > 0) return urls
  if (product.value?.image) return [product.value.image]
  return ['/img/productsdetails/BOOSTER.png', '/img/productsdetails/comonimages1.png', '/img/productsdetails/comonimages2.png']
})

const displayImage = computed(() => selectedImage.value || allProductImages.value[0] || '/img/productsdetails/BOOSTER.png')
const backendVideoUrl = computed(() => {
  const variants = product.value?.variants || []
  return [
    ...(product.value?.videos || []),
    ...(product.value?.media || []),
    ...variants.flatMap(v => v.productImages || [])
  ].map(getMediaVideoUrl).find(Boolean) || ''
})

const handleImageError = (e) => {
  if (e?.target) e.target.src = '/img/productsdetails/BOOSTER.png'
}

const toggleAccordion = (id) => {
  openAccordion.value = openAccordion.value === id ? null : id
}

const accordionList = computed(() => {
  const items = []
  const uses = product.value?.uses || 'Helps manage healthy blood sugar levels, Supports pancreatic function & insulin release, Boosts daily vitality and combats diabetic weakness, Promotes digestive health and blood purification'
  items.push({ id: 'uses', title: 'Uses', content: uses.split(/[,.]\s*/).filter(Boolean) })

  items.push({
    id: 'directions',
    title: 'Directions',
    content: product.value?.directionsForUse || 'Take 20–30ml twice daily before meals mixed with lukewarm water, or as directed by an Ayurvedic physician.'
  })

  const benefits = product.value?.primaryBenefits || '100% Ayurvedic herbal formulation, Controls blood sugar naturally, Free from artificial chemicals and synthetic preservatives, Dual action: sugar control & cellular detox'
  items.push({ id: 'benefits', title: 'Benefits', content: benefits.split(/[,.]\s*/).filter(Boolean) })

  items.push({
    id: 'ingredients',
    title: 'Ingredients',
    content: product.value?.ingredients || 'Karela, Gurmar, Neem, Vijayasar, Shudh Shilajit, Punarnava, Giloy, Jamun, Aloe Vera, Chirata, Methi.'
  })

  return items
})

const handleAddToCart = () => {
  cartStore.addToCart({
    id: product.value?.id || 11,
    productId: product.value?.id || 11,
    variantId: currentPack.value?.id || (selectedPackIndex.value + 1),
    name: productName.value,
    variantName: currentPack.value.sku,
    price: currentPrice.value,
    mrp: currentMrp.value,
    image: displayImage.value,
    quantity: quantity.value
  })

  isAdded.value = true
  if (addedTimer) clearTimeout(addedTimer)
  addedTimer = setTimeout(() => {
    isAdded.value = false
  }, 1800)
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

// ── UI copy (CMS / product-page driven with fallbacks) ──
const packSectionLabel = computed(() =>
  cmsStore.getSectionByKey('pricing')?.title ||
  productStore.selectedProductPage?.heroTitle ||
  'CHOOSE PACK'
)

const taxNotice = computed(() =>
  cmsStore.getSectionByKey('pricing')?.subtitle ||
  'Incl. of all taxes'
)

const heroCtaPrimary = computed(() =>
  cmsStore.heroSection?.buttonText ||
  cmsStore.heroSection?.config?.primaryButtonText ||
  'Buy Now'
)

const heroCtaSecondary = computed(() =>
  cmsStore.heroSection?.config?.secondaryButtonText ||
  cmsStore.getSectionByKey('cart')?.buttonText ||
  'Add to Cart'
)

const qualityBadgeText = computed(() =>
  cmsStore.getSectionByKey('quality')?.name ||
  cmsStore.getSectionByKey('quality')?.title ||
  'GMP Certified'
)

const guaranteeItems = computed(() => {
  const section = cmsStore.getSectionByKey('guarantee') ||
    cmsStore.getSectionByKey('trust') ||
    cmsStore.getSectionByKey('rewards')
  if (section?.items?.length) {
    return section.items.map(item => ({
      text: item.title || item.description || item.name,
      icon: item.subtitle || 'shield'
    }))
  }
  return [
    { text: '30-Day Guarantee', icon: 'shield' },
    { text: 'Free Delivery', icon: 'truck' },
    { text: 'AYUSH Standard', icon: 'star' },
    { text: '100% Ayurvedic', icon: 'check' }
  ]
})
</script>

<style scoped>
.pd2-root {
  font-family: var(--vcn-font, "Outfit", sans-serif);
  width: 100%;
}

/* ── HERO SPLIT LAYOUT ── */
.pd2-hero {
  /* Offset = thin top bar + fixed navbar (matches About/Sidebar sticky offset) */
  --pd2-sticky-top: calc(var(--top-header-height, 45px) + 76px);
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;
  width: 100%;
  min-height: 720px;
  padding-top: 0;
}

@media (max-width: 991px) {
  .pd2-hero {
    grid-template-columns: 1fr;
  }
}

/* ── LEFT PANEL (Floating product on spotlight + vertical thumbs) ── */
.pd2-hero-left {
  position: sticky;
  top: var(--pd2-sticky-top);
  align-self: start;
  height: calc(100vh - var(--pd2-sticky-top));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  background: linear-gradient(180deg, #FBFDF7 0%, #F1F7E9 100%);
  overflow: hidden;
}

.pd2-hero-left::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: min(80%, 660px);
  aspect-ratio: 1 / 1;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, #ffffff 0%, rgba(255, 255, 255, 0.6) 44%, rgba(255, 255, 255, 0) 72%);
  pointer-events: none;
}

/* Floating badges */
.pd2-float-badge {
  position: absolute;
  z-index: 6;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 15px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(120, 153, 56, 0.35);
  border-radius: 14px;
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 28px -16px rgba(29, 69, 3, 0.55);
}

.pd2-float-badge--tl { top: 26px; left: 26px; }
.pd2-float-badge--br { bottom: 26px; right: 26px; }

.pd2-fb-num {
  font-size: 20px;
  font-weight: 900;
  color: #123319;
  line-height: 1;
}

.pd2-fb-label {
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #123319;
}

.pd2-float-badge--br svg { color: #1D4503; }
.pd2-float-badge--br span {
  font-size: 11px;
  font-weight: 700;
  color: #123319;
}

/* Gallery: big stage on top + horizontal thumbnails below */
.pd2-gallery {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
  width: 100%;
  max-width: 780px;
  
}

/* Horizontal thumbnail row */
.pd2-thumb-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 2px;
}

.pd2-thumb-row::-webkit-scrollbar { display: none; }

.pd2-thumb {
  flex: 0 0 auto;
  width: 101px;
  height: 101px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* No padding: the thumbnail image fills the whole tile edge to edge so no
     white gap is left around it. */
  padding: 0;
  border-radius: 18px;
  background: #ffffff;
  border: 1.5px solid #E4EAD9;
  cursor: pointer;
  overflow: hidden;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.pd2-thumb:hover {
  border-color: #A8DE6A;
  transform: translateY(-2px);
  box-shadow: 0 10px 20px -12px rgba(29, 69, 3, 0.5);
}

.pd2-thumb.active {
  border-color: #1D4503;
  box-shadow: 0 8px 20px -8px rgba(29, 69, 3, 0.55);
}

.pd2-thumb img {
  width: 100%;
  /* public/css/style.css sets `img, video { height: auto !important }`, which
     collapses the image to its intrinsic ratio inside the tile and leaves white
     bands above and below. The scoped selector outranks the global tag
     selector, so !important here wins without touching that shared file. */
  height: 100% !important;
  /* cover, not contain: fills the tile completely instead of letterboxing the
     product and leaving white bands on the sides. */
  object-fit: cover;
}

.pd2-thumb-play {
  font-size: 16px;
  line-height: 1;
  color: #1D4503;
}

/* Stage — borderless, product floats with a soft shadow.
   Sized by the smaller of column width and available viewport height
   (minus thumb row + panel padding) so it never clips. The 215px tracks the
   101px thumb row; it was 190px back when the thumbs were 76px. */
.pd2-stage {
  position: relative;
  width: min(100%, calc(100vh - var(--pd2-sticky-top) - 215px));
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.pd2-main-media {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  cursor: zoom-in;
  /* filter: drop-shadow(0 34px 46px rgba(29, 69, 3, 0.24)); */
  transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1);
}

.pd2-main-media:hover {
  transform: scale(1.06) translateY(-4px);
}

/* Stack on mobile/tablet — normal page flow, image starts right under the navbar */
@media (max-width: 991.98px) {
  .pd2-hero {
    padding-top: 0;
    min-height: 0;
  }
  .pd2-hero-left {
    position: relative;
    /* `top` was declared for the desktop `position: sticky` offset. Once the
       panel becomes `relative` that same offset shifts it DOWN by
       --pd2-sticky-top (~107px) instead of pinning it to the viewport. It then
       paints over the first ~107px of the stacked .pd2-hero-right below it —
       exactly the rating row and the product name — and, being positioned,
       covers them. Reset it so the panel really sits in normal flow. */
    top: auto;
    height: auto;
    padding: 16px 16px 24px;
    background: #FFFFFF;
    margin-top: 30px;
  }
  .pd2-hero-left::before { display: none; }
  .pd2-hero-right { min-height: 0; }
  .pd2-gallery {
    max-width: 520px;
    gap: 16px;
  }
  .pd2-stage {
    width: 100%;
    max-width: 420px;
    margin: 0 auto;
    padding: 10px 0;
  }
  .pd2-thumb { width: 89px; height: 89px; border-radius: 16px; flex-shrink: 0; }
  .pd2-thumb-row {
    justify-content: flex-start;
    padding: 0px 30px;
    -webkit-overflow-scrolling: touch;
  }
  .pd2-float-badge {
    background: rgba(242, 247, 233, 0.95);
    border-color: #D7E8BF;
    box-shadow: 0 4px 12px rgba(29, 69, 3, 0.08);
    backdrop-filter: blur(8px);
  }
  /* Badges frame the top corners cleanly without overlapping the thumbnails at bottom */
  .pd2-float-badge--tl { top: 14px; left: 14px; }
  .pd2-float-badge--br { top: 14px; right: 14px; bottom: auto; }
}

@media (max-width: 575.98px) {
  .pd2-hero-left { padding: 12px 12px 20px; margin-top:30px; }
  .pd2-stage { max-width: 340px; }
  .pd2-float-badge { padding: 5px 10px; border-radius: 10px; gap: 6px; }
  .pd2-fb-num { font-size: 16px; }
  .pd2-fb-label { font-size: 8.5px; }
  .pd2-float-badge--tl { top: 10px; left: 10px; }
  .pd2-float-badge--br { top: 10px; right: 10px; bottom: auto; }
  .pd2-thumb { width: 56px; height: 56px; border-radius: 14px; }
  .pd2-thumb-row { gap: 10px; }
}

/* ── RIGHT PANEL (Dark Green Background) ── */
.pd2-hero-right {
  background: #0E2917;
  color: #ffffff;
  padding: 48px 56px;
  display: flex;
  align-items: center;
  min-height: calc(100vh - var(--pd2-sticky-top));
  margin-top: 31px;
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
  font-size: clamp(26px, 3.6vw, 42px);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 14px 0;
  line-height: 1.15;
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
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 26px;
  padding: 0 4px;
  height: 48px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.pd2-qty-btn {
  background: none;
  border: none;
  color: #ffffff;
  font-size: 19px !important;
  font-weight: 700 !important;
  line-height: 1;
  cursor: pointer;
  padding: 0 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 100%;
  transition: opacity 0.15s ease, transform 0.1s ease;
  user-select: none;
}

.pd2-qty-btn:active {
  transform: scale(0.92);
}

.pd2-qty-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.pd2-qty-val {
  font-size: 15px;
  font-weight: 700;
  color: #ffffff;
  min-width: 22px;
  text-align: center;
  line-height: 1;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.pd2-btn-buy {
  flex: 1;
  height: 48px;
  background: #ffffff;
  color: #0E2917;
  border: none;
  border-radius: 24px;
  font-size: 15px !important;
  font-weight: 800 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
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
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 24px;
  font-size: 14px !important;
  font-weight: 700 !important;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  white-space: nowrap;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.pd2-btn-cart:hover {
  border-color: #ffffff;
  background: rgba(255, 255, 255, 0.08);
}

.pd2-btn-cart.is-added {
  border-color: #8EF375;
  color: #8EF375;
  background: rgba(142, 243, 117, 0.12);
}

/* Trust Badges Strip */
.pd2-trust-strip {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
  padding: 18px 0;
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
  background: rgba(14, 41, 23, 0.96);
  border-top: 1px solid rgba(255,255,255,0.15);
  padding: 10px 20px;
  padding-bottom: max(10px, env(safe-area-inset-bottom));
  z-index: 99;
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 -8px 24px rgba(0,0,0,0.35);
  backdrop-filter: blur(12px);
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
  gap: 12px;
}

.pd2-sticky-left {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
}

.pd2-sticky-img {
  width: 60px;
  /* public/css/style.css sets `img, video { height: auto !important }`, which
     silently overrides this component's height and leaves the thumbnail at its
     intrinsic ratio (~47x36). The scoped selector has higher specificity than
     the global tag selector, so !important here wins without touching that
     shared stylesheet. */
  height: 60px !important;
  object-fit: contain;
  border-radius: 8px;
  padding: 2px;
  flex-shrink: 0;
}

.pd2-sticky-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.pd2-sticky-name {
  font-weight: 700;
  /* Fluid: 15px on a 320px phone, ~17px on a tablet, 19px from ~1000px up. */
  font-size: clamp(15px, 0.5vw + 13px, 19px);
  color: #ffffff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.pd2-sticky-size {
  /* Fluid: 13px on a 320px phone, 17px on desktop. */
  font-size: clamp(13px, 0.4vw + 11.4px, 17px);
  color: rgba(255,255,255,0.6);
  white-space: nowrap;
}

.pd2-sticky-right {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

.pd2-sticky-price {
  font-weight: 900;
  /* Fluid: 18px on a 320px phone, 22px on desktop. */
  font-size: clamp(18px, 0.4vw + 16.4px, 22px);
  color: #ffffff;
  white-space: nowrap;
}

.pd2-sticky-btn {
  background: #ffffff;
  color: #0E2917;
  border: none;
  padding: 11px 20px;
  border-radius: 22px;
  font-weight: 800;
  /* public/css/style.css sets `font-size: var(--vcn-btn-size) !important` on
     every button/[class*="btn"] site-wide, which pins this at 16px. The scoped
     selector has higher specificity, so !important here wins without touching
     that shared stylesheet. */
  font-size: clamp(15px, 0.55vw + 12.9px, 21px) !important;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.2s ease;
}

.pd2-sticky-btn:hover {
  background: #E2F5DB;
  transform: translateY(-1px);
}

/* Lightbox Modal */
.pd2-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.88);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.pd2-lb-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255,255,255,0.15);
  border: none;
  color: #ffffff;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.pd2-lb-close:hover {
  background: rgba(255,255,255,0.3);
}

.pd2-lb-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  max-width: 90vw;
  max-height: 90vh;
}

.pd2-lb-main {
  max-width: 85vw;
  max-height: 75vh;
  object-fit: contain;
}

.pd2-lb-thumbs {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  max-width: 100%;
  padding: 4px;
}

.pd2-lb-thumb {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  border: 2px solid transparent;
  background: #ffffff;
  padding: 4px;
  cursor: pointer;
  flex-shrink: 0;
}

.pd2-lb-thumb.active {
  border-color: #8EF375;
}

.pd2-lb-thumb img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 576px) {
  .pd2-hero-right {
    padding: 28px 18px;
  }
  .pd2-pack-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }
  .pd2-action-row {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-areas:
      "qty cart"
      "buy buy";
    gap: 10px;
    margin-bottom: 24px;
  }
  .pd2-qty-stepper {
    grid-area: qty;
    width: auto;
    height: 48px;
    padding: 0 4px;
  }
  .pd2-btn-cart {
    grid-area: cart;
    width: 100%;
    height: 48px;
    padding: 0 14px;
    font-size: 14px !important;
    font-weight: 700 !important;
    justify-content: center;
  }
  .pd2-btn-buy {
    grid-area: buy;
    grid-column: 1 / -1;
    width: 100%;
    height: 50px;
    font-size: 15px !important;
    font-weight: 800 !important;
  }
  .pd2-trust-strip {
    grid-template-columns: repeat(2, 1fr);
    gap: 14px 10px;
    padding: 14px 0;
  }
  .pd2-sticky-bar {
    padding: 8px 12px;
    padding-bottom: max(8px, env(safe-area-inset-bottom));
  }
  .pd2-sticky-name {
    max-width: 110px;
  }
  .pd2-sticky-btn {
    padding: 9px 14px;
  }
  .pd2-sticky-left {
    gap: 8px;
  }
  .pd2-sticky-right {
    gap: 8px;
  }
}
</style>

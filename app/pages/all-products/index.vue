<template>
  <div class="vcn-breadcrumb-container">
    <div class="vcn-breadcrumb-bg"></div>
    <div class="vcn-breadcrumb-overlay"></div>

    <div class="vcn-breadcrumb-content">
      <h1 class="vcn-breadcrumb-title">
        {{ allProducts.hero.title }}
      </h1>
    </div>
  </div>
  <section class="vcn-product-section py-5">
    <div class="vcn-container">
      <!-- Error state -->
      <div v-if="error" class="alert alert-danger text-center py-5">
        {{ error.message || error }}
      </div>

      <!-- Products grid -->
      <div v-else class="row g-4">
        <div v-for="product in [products[0]]" :key="product.id || product.name" class="col-lg-9 px-3 mx-auto md:px-3"
          v-if="products.length > 0">
          <div class="vcn-product-card row align-items-center h-100">

            <!-- Image -->
            <div class="col-lg-4 position-relative d-flex flex-column align-items-center justify-content-center">

              <div class="vcn-product-image text-center w-100">
                <img :src="displayFeaturedImage" :alt="product.name" class="vcn-product-bottle" loading="lazy"
                  @error="handleImageError($event, product)" />
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="featuredProductImages.length > 1" class="featured-thumbnails d-flex justify-content-center gap-2 mt-3 w-100">
                <div v-for="(img, idx) in featuredProductImages" :key="idx" 
                  class="featured-thumbnail-item" 
                  :class="{ active: (selectedFeaturedImage === img) || (!selectedFeaturedImage && img === getPrimaryImage(product)) }"
                  @click="selectedFeaturedImage = img">
                  <img :src="img" :alt="product.name + ' thumbnail ' + idx" />
                </div>
              </div>
            </div>

            <!-- Content -->
            <div class="col-lg-8">
              <!-- Mobile only badge & price row -->
              <div class="d-flex justify-content-between align-items-center w-100 mb-3 d-lg-none">
                <div class="vcn-whole-body-product-badges m-0 p-0" style="width: auto !important; box-shadow: none !important;">
                  <span v-if="product.isNew" class="vcn-whole-body-badge vcn-whole-body-badge-new">NEW</span>
                  <span v-if="allProducts.labels.bestseller" class="vcn-whole-body-badge vcn-whole-body-badge-bestseller">{{ allProducts.labels.bestseller }}</span>
                  <span v-if="product.label" class="vcn-whole-body-badge vcn-whole-body-badge-new">{{ product.label }}</span>
                </div>
                <div class="vcn-product-price m-0 p-0" style="width: auto !important;">
                  <span class="price-current">₹{{ getProductPricing(product).price }}</span>
                  <span v-if="getProductPricing(product).oldPrice" class="price-old text-decoration-line-through text-white-50 ms-2" style="font-size: 0.85em; opacity: 0.6;">₹{{ getProductPricing(product).oldPrice }}</span>
                </div>
              </div>

              <!-- Desktop only badges -->
              <div class="vcn-whole-body-product-badges d-none d-lg-flex">
                <span v-if="product.isNew" class="vcn-whole-body-badge vcn-whole-body-badge-new">NEW</span>
                <span v-if="allProducts.labels.bestseller" class="vcn-whole-body-badge vcn-whole-body-badge-bestseller">{{ allProducts.labels.bestseller }}</span>
                <span v-if="product.label" class="vcn-whole-body-badge vcn-whole-body-badge-new">{{ product.label }}</span>
              </div>

              <h2 class="vcn-product-title">{{ product.name }}</h2>
              <p class="vcn-product-description"
                v-html="product.description || 'Premium product for your wellness needs'">
              </p>

              <!-- Desktop only price -->
              <div class="vcn-product-price d-none d-lg-block">₹{{ getProductPricing(product).price }}</div>

              <div class="vcn-product-buttons">
                <NuxtLink :to="`/product-details/${product.slug}`" class="vcn-btn-secondary">
                  {{ allProducts.btn.learnMore }}
                </NuxtLink>
                <div class="cart-box">
                  <a href="#" v-if="!getCartItem(product.id)" @click.prevent="addToCart(product)"
                    class="btn-cart add-btn">
                    Add to Cart
                  </a>
                  <div v-else class="qty-box">
                    <button class="qty-btn minus" @click="cartStore.decrementQuantity(product.id)">
                      −
                    </button>
                    <span class="qty-value">{{ getCartItem(product.id)?.quantity || 1 }}</span>
                    <button class="qty-btn plus" @click="cartStore.incrementQuantity(product.id)">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Sidebar Card on Small Screen (inside product card) -->
            <div class="col-12 px-0 d-lg-none mt-4">
              <div class="vcn-image-section">
                <img :src="allProducts.sidebarCard.image" :alt="allProducts.sidebarCard.text" class="vcn-bg-image" />
                <div class="vcn-image-overlay">
                  <p class="vcn-image-text">
                    {{ allProducts.sidebarCard.text }}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        <!-- Right Image Section (Desktop Only) -->
        <div class="col-lg-3 d-none d-lg-block">
          <div class="vcn-image-section h-100">
            <img :src="allProducts.sidebarCard.image" :alt="allProducts.sidebarCard.text" class="vcn-bg-image" />

            <div class="vcn-image-overlay">
              <p class="vcn-image-text">
                {{ allProducts.sidebarCard.text }}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  <allproductsProducts :products="products" :loading="productStore.loading" />
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'

// ✅ All stores at the top
const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()
const cartStore = useCartStore()
const productStore = useProductStore()

const route = useRoute()

// Fetch page sections and products from API during SSR/routing safely
// We return the payload data from the callback so client-side navigation can restore it to Pinia stores
// We wrap this inside an `import.meta.server` guard so client-side transitions are instant and do not block the router.
const { data: pageData } = await useAsyncData(`products-cms-${route.path}`, async () => {
  if (import.meta.server) {
    const config = useRuntimeConfig()
    const apiBaseUrl = config.public.apiBaseUrl

    let sections = null
    let products = null

    if (apiBaseUrl && (apiBaseUrl.startsWith('http://') || apiBaseUrl.startsWith('https://'))) {
      try {
        // Clear any existing page state before fetching on the server
        cmsStore.clearPage()
        
        await Promise.all([
          cmsStore.fetchSectionsBySlug('products'),
          productStore.fetchProducts(true)
        ])
        
        sections = cmsStore.currentPage?.sections || null
        products = productStore.products || []
      } catch (err) {
        console.error('Failed to fetch CMS sections and products for products page on server:', err)
      }
    }

    return { sections, products }
  }
  return null
})

// Sync the returned pageData to Pinia stores reactively
watch(pageData, (newData) => {
  if (newData) {
    cmsStore.clearPage() // Clear to prevent section bleeding across page transitions
    
    if (newData.sections) {
      cmsStore.currentPage = {
        id: 0,
        title: 'products',
        slug: 'products',
        description: '',
        pageType: '',
        isHomePage: false,
        seo: null,
        sections: newData.sections,
        updatedAt: ''
      }
    }
    if (newData.products && newData.products.length > 0) {
      productStore.products = newData.products
    }
  }
}, { immediate: true })

// Fetch fresh data client-side on mount (ensures API calls are made when page opens or navigated to)
onMounted(async () => {
  const config = useRuntimeConfig()
  const apiBaseUrl = config.public.apiBaseUrl
  if (apiBaseUrl && (apiBaseUrl.startsWith('http://') || apiBaseUrl.startsWith('https://'))) {
    try {
      await Promise.all([
        cmsStore.fetchSectionsBySlug('products'),
        productStore.fetchProducts(true)
      ])
    } catch (err) {
      console.error('Failed to fetch fresh data on mount:', err)
    }
  }
})

const allProducts = computed(() => {
  const sections = cmsStore.currentPage?.sections || []

  const heroSec = sections.find(s => s.name === 'hero' || s.sectionKey === 'products-hero')
  const sidebarSec = sections.find(s => s.name === 'sidebarCard' || s.sectionKey === 'products-sidebar-card')
  const uiLabelsSec = sections.find(s => s.name === 'uiLabels' || s.sectionKey === 'products-ui-labels')

  const fallback = cmsStore.getPageSection('products', 'products') || {
    hero: { title: '' },
    sidebarCard: { image: '', text: '' },
    labels: { bestseller: '' },
    btn: { learnMore: '' }
  }

  const rawSidebarImage = sidebarSec?.image || sidebarSec?.extraData?.image
  let sidebarImage = ''
  if (rawSidebarImage) {
    sidebarImage = typeof rawSidebarImage === 'string' ? rawSidebarImage : getCmsImageUrl(rawSidebarImage)
  }

  const apiExtra = uiLabelsSec?.extraData?.extraData || uiLabelsSec?.extraData || {}

  return {
    hero: {
      title: heroSec?.title || fallback.hero.title
    },
    sidebarCard: {
      image: sidebarImage || fallback.sidebarCard.image,
      text: sidebarSec?.description || fallback.sidebarCard.text
    },
    labels: {
      bestseller: apiExtra.bestseller || fallback.labels.bestseller
    },
    btn: {
      learnMore: apiExtra.learnMore || fallback.btn.learnMore
    }
  }
})

const products = computed(() => productStore.allProducts)
const error = computed(() => productStore.error)

const getProductPricing = (product) => productStore.getProductPricing(product)
const getPrimaryImage = (product) => productStore.getPrimaryImage(product)

// Featured product image gallery refs & computed properties
const selectedFeaturedImage = ref(null)

const getAllProductImages = (product) => {
  const urls = []
  if (!product) return urls

  // 1. Collect from product.images
  if (product.images && product.images.length > 0) {
    product.images.forEach(img => {
      if (img && img.media) {
        const url = img.media.variants?.webp || img.media.webpUrl || img.media.fileUrl
        if (url && !urls.includes(url)) {
          urls.push(url)
        }
      } else if (img && img.image) {
        if (!urls.includes(img.image)) {
          urls.push(img.image)
        }
      }
    })
  }

  // 2. Collect from variant images
  if (product.variants && product.variants.length > 0) {
    product.variants.forEach(variant => {
      if (variant && variant.productImages && variant.productImages.length > 0) {
        variant.productImages.forEach(img => {
          if (img && img.media) {
            const url = img.media.variants?.webp || img.media.webpUrl || img.media.fileUrl
            if (url && !urls.includes(url)) {
              urls.push(url)
            }
          } else if (img && img.image) {
            if (!urls.includes(img.image)) {
              urls.push(img.image)
            }
          }
        })
      }
    })
  }

  // 3. Fallback to primary image if no urls found
  if (urls.length === 0) {
    const primary = getPrimaryImage(product)
    if (primary) {
      urls.push(primary)
    }
  }

  return urls
}

const displayFeaturedImage = computed(() => {
  return selectedFeaturedImage.value || (products.value && products.value[0] ? getPrimaryImage(products.value[0]) : '')
})

const featuredProductImages = computed(() => {
  const product = products.value && products.value[0]
  if (!product) return []
  return getAllProductImages(product)
})

watch(() => products.value, () => {
  selectedFeaturedImage.value = null
})

const handleImageError = (event, product) => {
  console.error(`Failed to load image for product ${product.id}:`, event)
  event.target.src = '/img/products/img1.png'
}

const getCartItem = (productId) => cartStore.getItemById(productId)

const addToCart = async (product) => {
  const pricing = getProductPricing(product)
  const defaultVariant = product.variants?.find(v => v.isDefault) || product.variants?.[0]
  const variantId = defaultVariant?.id || product.id

  await cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: parseFloat(pricing.price).toFixed(2),
    mrp: pricing.oldPrice ? parseFloat(pricing.oldPrice).toFixed(2) : null,
    image: getPrimaryImage(product),
    subscription: 'One-time purchase',
    variantId: variantId
  })
}
</script>

<style scoped>
.vcn-container{
  padding-left: 125px !important;
  padding-right: 155px !important;
}
.featured-thumbnails {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.featured-thumbnail-item {
  width: 55px;
  height: 55px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.featured-thumbnail-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 6px;
  transition: transform 0.3s ease;
}

.featured-thumbnail-item:hover img {
  transform: scale(1.1);
}

.featured-thumbnail-item.active {
  border-color: #ffffff;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.15);
}

.featured-thumbnail-item:hover {
  border-color: rgba(255, 255, 255, 0.6);
}

.vcn-breadcrumb-container {
  margin-top: -120px !important;
  padding-top: 85px !important;
}

@media (max-width: 991px) {
  .vcn-breadcrumb-container {
    margin-top: -140px !important;
  }

  .vcn-product-section {
    padding: 40px 10px !important;
    
  }

  .vcn-product-card {
    background: var(--vcn-primary) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(10px) !important;
    border-radius: 20px !important;
    padding: 16px !important;
    max-width: 100% !important;
    margin: 0 auto !important;
  }

  .vcn-product-bottle {
    max-height: 280px !important;
    margin: 0 auto !important;
    display: block !important;
  }

  /* Badge styling overrides on mobile */
  .vcn-whole-body-badge {
    border-radius: 9999px !important;
    background: transparent !important;
    border: 1px solid #ffffff !important;
    color: #ffffff !important;
    padding: 4px 12px !important;
    font-size: 13px !important;
    font-weight: 600 !important;
    text-transform: uppercase !important;
    box-shadow: none !important;
    letter-spacing: normal !important;
  }

  /* Price overrides on mobile */
  .d-lg-none .vcn-product-price {
    display: flex !important;
    align-items: center !important;
    font-size: 20px !important;
    color: #ffffff !important;
    font-weight: 600 !important;
    margin: 0 !important;
  }

  /* Title overrides on mobile */
  .vcn-product-title {
    font-size: 48px !important;
    font-weight: 400 !important;
    color: #ffffff !important;
    margin-top: 10px !important;
    margin-bottom: 12px !important;
    text-align: left !important;
  }

  /* Description overrides on mobile */
  .vcn-product-description {
    font-size: 14px !important;
    line-height: 1.5 !important;
    color: rgba(255, 255, 255, 0.9) !important;
    margin-bottom: 20px !important;
    text-align: left !important;
  }

  /* Buttons overrides on mobile */
  .vcn-product-buttons {
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    width: 100% !important;
    gap: 15px !important;
    margin-bottom: 25px !important;
  }

  .vcn-btn-secondary {
    background: #ffffff !important;
    color: #1d4503 !important;
    border: none !important;
    border-radius: 9999px !important;
    padding: 12px 28px !important;
    font-size: 15px !important;
    font-weight: 600 !important;
    display: inline-block !important;
    flex: 0 0 auto !important;
  }

  .vcn-btn-primary {
    background: transparent !important;
    border: none !important;
    color: #ffffff !important;
    text-decoration: underline !important;
    font-weight: 600 !important;
    font-size: 15px !important;
    padding: 10px 0 !important;
    box-shadow: none !important;
  }

  .qty-box {
    background: transparent !important;
    border: 1px solid #ffffff !important;
    border-radius: 30px !important;
    padding: 5px 12px !important;
  }

  .qty-btn, .qty-value {
    color: #ffffff !important;
  }

  /* Sidebar section horizontal banner card overrides on mobile */
  .vcn-image-section {
    display: flex !important;
    flex-direction: row-reverse !important;
    align-items: center !important;
    justify-content: space-between !important;
    background: rgba(255, 255, 255, 0.05) !important;
    padding: 15px !important;
    border-radius: 20px !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    height: auto !important;
    width: 100% !important;
    position: relative !important;
    margin-top: 20px !important;
  }

  .vcn-image-section .vcn-bg-image {
    width: 90px !important;
    height: 90px !important;
    aspect-ratio: 1 / 1 !important;
    object-fit: contain !important;
    border-radius: 12px !important;
    position: static !important;
    flex-shrink: 0 !important;
    background-color: transparent !important;
  }

  .vcn-image-section .vcn-image-overlay {
    position: static !important;
    background: none !important;
    padding: 0 !important;
    flex: 1 !important;
    text-align: left !important;
    display: block !important;
  }

  .vcn-image-section .vcn-image-text {
    font-size: 14px !important;
    color: #ffffff !important;
    margin: 0 !important;
    padding-right: 15px !important;
    text-align: left !important;
  }
}

.vcn-whole-body-product-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  margin-bottom: 16px;
}

.vcn-whole-body-badge {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.vcn-whole-body-badge-bestseller {
  background-color: #c9f5a6;
  color: #1e331e;
}

.vcn-whole-body-badge-new {
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--vcn-white, #ffffff);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .vcn-whole-body-badge {
    padding: 4px 8px;
    font-size: 0.6rem;
    letter-spacing: 0.3px;
  }

  .vcn-whole-body-product-badges {
    margin-bottom: 10px;
    gap: 4px;
  }
}

.vcn-product-buttons {
  display: flex !important;
  align-items: center !important;
  gap: 15px !important;
  flex-wrap: wrap !important;
}

.btn-cart {
  color: #ffffff !important;
  padding: 10px 20px !important;
  font-size: 16px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s ease !important;
  text-decoration: underline !important;
}

.btn-cart:hover {
  color: rgba(255, 255, 255, 0.8) !important;
}

.cart-box {
  width: auto !important;
  display: inline-flex !important;
}

.qty-box {
  width: auto !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 10px !important;
  background: #ffffff !important;
  border: 1px solid #1e331e !important;
  border-radius: 30px !important;
  padding: 6px 15px !important;
}

.qty-btn {
  font-size: 16px !important;
  font-weight: bold !important;
  background: none !important;
  border: none !important;
  color: #1e331e !important;
  width: 20px !important;
  height: 20px !important;
  padding: 0 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.qty-value {
  font-size: 13px !important;
  font-weight: 600 !important;
  color: #1e331e !important;
  min-width: 15px !important;
  text-align: center !important;
}
/* Ensure the breadcrumb container never exceeds the screen width */
.vcn-breadcrumb-container {
  width: 100% !important;
  max-width: 100vw !important;
  overflow: hidden !important;
  box-sizing: border-box !important;
}
h1.vcn-breadcrumb-title {
  position: relative;
  left: 0 !important;
  text-align: center !important;
  width: 100% !important;
  max-width: 100% !important;
  word-wrap: break-word !important;
  overflow-wrap: break-word !important;
  white-space: normal !important;
}
/* Make the content area responsive and centered */
.vcn-breadcrumb-content {
  width: 92% !important; /* Provides a small gutter on mobile */
  max-width: 1200px !important; /* Matches your desktop container */
  margin-left: auto !important;
  margin-right: auto !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  box-sizing: border-box !important;
  display: flex !important;
  flex-direction: column !important;
  align-items: center !important;
  justify-content: center !important;
}


/* Ensure the hovered card is on top of its neighbors */
.vcn-new-product .product-card:hover {
    z-index: 10 !important;
    position: relative; /* Required for z-index to work */
}

/* Optional: Add a small gap between cards so they don't overlap as easily */
.vcn-new-product .row > [class^="col-"] {
    padding: 10px !important;
}
@media (min-width: 1200px) {
  /* Unify container widths and centering */
  section.vcn-product-section .container,
  section.vcn-new-product .container,
  header .container,
  footer .container {
    max-width: 1140px; /* Standard Bootstrap 1200px container width, or adjust to your preference */
    padding-left: 40px !important;
    padding-right: 74px !important;
  }

  /* Specific override for the breadcrumb content which had fixed margins */
  .vcn-breadcrumb-content {
    margin: 0 auto !important;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .row{
    padding-left: 15px !important;
  }
} 
@media (max-width: 768px) {
  /* 1. Reduce the extreme container padding to 20px on mobile */
  .vcn-container[data-v-2bf99518] {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  /* 2. Center and pad the product card for mobile readability */
  .vcn-product-card {
    text-align: center;
    padding: 30px 15px !important;
  }

  /* 3. Improve title scale and spacing */
  .vcn-product-title {
    font-size: 2rem !important;
    line-height: 1.2 !important;
    margin-bottom: 15px !important;
  }

  /* 4. Center the bottle image and limit its width */
  .vcn-product-bottle {
    max-width: 150px !important;
    margin-bottom: 20px;
    height: auto;
  }

  /* 5. Stack and center buttons for better mobile UX */
  .vcn-product-buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }

  .vcn-btn-secondary, .cart-box, .btn-cart {
    width: 100% !important;
    max-width: 250px;
    margin: 0 auto !important;
  }
}
</style>

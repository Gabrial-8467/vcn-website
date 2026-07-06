<template>
  <section class="vcn-new-product">
    <div class="container">
      <div class="swiper vcn-product-detail-swiper">
        <div class="swiper-wrapper">
          <div v-for="product in products" :key="product.id" class="swiper-slide">
            <div class="product-card">
              <NuxtLink :to="`/product-details/${product.slug}`" class="product-image-wrapper">
                <img :src="getProductImage(product)" :alt="product.name" class="product-image" />
              </NuxtLink>
              <div class="product-content">
                <span class="product-label">{{ product.label || 'AGE 18+' }}</span>
                <h3 class="product-title">
                  <NuxtLink :to="`/product-details/${product.slug}`">{{ product.name }}</NuxtLink>
                </h3>
                <p class="product-description" v-html="product.description"></p>
                <div class="product-price">
                  ₹{{ getProductPrice(product).price }}
                  <span v-if="getProductPrice(product).oldPrice" class="old-price">₹{{
                    getProductPrice(product).oldPrice
                  }}</span>
                </div>
                <div class="product-actions">
                  <NuxtLink :to="`/product-details/${product.slug}`" class="btn-learn">Learn More</NuxtLink>
                  <ClientOnly>
                    <template #placeholder>
                      <a href="#" class="btn-cart">Add to Cart</a>
                    </template>
                    <a v-if="!getCartItem(product.id)" href="#" @click.prevent="addToCart(product)"
                      class="btn-cart">Add to Cart</a>
                    <div v-else class="qty-box">
                      <button class="qty-btn minus" @click="cartStore.decrementQuantity(product.id)">−</button>
                      <span class="qty-value">{{ getCartItem(product.id)?.quantity || 1 }}</span>
                      <button class="qty-btn plus" @click="cartStore.incrementQuantity(product.id)">+</button>
                    </div>
                  </ClientOnly>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Swiper pagination dots -->
        <div class="swiper-pagination vcn-product-detail-swiper-pagination"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const products = ref([])
const swiperInstance = ref(null)

const initSwiper = () => {
  if (typeof window === 'undefined' || !window.Swiper) {
    setTimeout(initSwiper, 100)
    return
  }

  const container = document.querySelector('.vcn-product-detail-swiper')
  if (!container) return

  if (swiperInstance.value) {
    swiperInstance.value.destroy(true, true)
    swiperInstance.value = null
  }

  const slideCount = container.querySelectorAll('.swiper-slide').length

  swiperInstance.value = new window.Swiper('.vcn-product-detail-swiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: slideCount >= 2,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: {
      el: '.vcn-product-detail-swiper-pagination',
      clickable: true
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 24
      }
    }
  })
}

onMounted(async () => {
  await productStore.fetchProducts()
  products.value = productStore.allProducts.slice(0, 4)
  if (process.client) {
    cartStore.loadCart()
    nextTick(() => {
      initSwiper()
    })
  }
})

onBeforeUnmount(() => {
  if (swiperInstance.value) {
    swiperInstance.value.destroy(true, true)
    swiperInstance.value = null
  }
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
.vcn-new-product {
  padding: 0 !important;
}
.swiper-slide {
  height: auto;
}

.product-card {
  height: 100%;
}

.product-content {
  display: flex !important;
  flex-direction: column !important;
  flex: 1 !important;
}

.product-description {
  flex-grow: 1 !important;
}

.product-title :deep(a) {
  color: inherit;
  text-decoration: none;
}

.product-title :deep(a:hover) {
  color: inherit;
}

/* Product Actions and Buttons Styling */
.product-actions {
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important; /* Left-aligned on desktop */
  gap: 10px !important;
  margin-top: auto !important;
  width: 100% !important;
}

.btn-learn,
.btn-cart,
.qty-box {
  flex: 1 !important;
  max-width: 160px !important; /* Prevents stretching too wide, while shrinking on small sizes */
  height: 40px !important;
  box-sizing: border-box !important;
}

.btn-learn {
  background: var(--vcn-darker) !important;
  color: #ffffff !important;
  padding: 0 12px !important;
  border-radius: 25px !important;
  border: 2px solid var(--vcn-darker) !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  white-space: nowrap !important;
  box-shadow: 0 2px 4px rgba(28, 58, 19, 0.1) !important;
}

.btn-learn:hover {
  background: var(--vcn-primary) !important;
  border-color: var(--vcn-primary) !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 8px rgba(94, 108, 31, 0.2) !important;
}

.btn-cart {
  background: transparent !important;
  color: var(--vcn-darker) !important;
  padding: 0 12px !important;
  border-radius: 25px !important;
  border: 2px solid var(--vcn-darker) !important;
  font-size: 12px !important;
  font-weight: 600 !important;
  cursor: pointer !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  text-decoration: none !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  white-space: nowrap !important;
}

.btn-cart:hover {
  background: var(--vcn-darker) !important;
  color: #ffffff !important;
  transform: translateY(-1px) !important;
  box-shadow: 0 4px 8px rgba(28, 58, 19, 0.15) !important;
}

.qty-box {
  display: inline-flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  background: #ffffff !important;
  border: 2px solid var(--vcn-darker) !important;
  border-radius: 25px !important;
  padding: 0 8px !important;
}

.qty-btn {
  background: none !important;
  border: none !important;
  color: var(--vcn-darker) !important;
  font-size: 16px !important;
  font-weight: bold !important;
  cursor: pointer !important;
  width: 24px !important;
  height: 24px !important;
  display: inline-flex !important;
  align-items: center !important;
  justify-content: center !important;
  border-radius: 50% !important;
  transition: all 0.2s ease !important;
  padding: 0 !important;
  flex-shrink: 0 !important;
}

.qty-btn:hover {
  background-color: rgba(28, 58, 19, 0.1) !important;
}

.qty-value {
  color: var(--vcn-darker) !important;
  font-weight: 600 !important;
  min-width: 16px !important;
  text-align: center !important;
  flex-shrink: 0 !important;
  white-space: nowrap !important;
  font-size: 13px !important;
}

/* Pagination styles */
.vcn-product-detail-swiper-pagination {
  position: relative !important;
  margin-top: 30px !important;
  display: flex !important;
  justify-content: center !important;
  gap: 6px !important;
  bottom: auto !important;
}

.vcn-product-detail-swiper-pagination :deep(.swiper-pagination-bullet) {
  width: 8px !important;
  height: 8px !important;
  background-color: #cccccc !important;
  opacity: 1 !important;
  border-radius: 50% !important;
  transition: all 0.3s ease !important;
}

.vcn-product-detail-swiper-pagination :deep(.swiper-pagination-bullet-active) {
  background-color: var(--vcn-primary) !important;
  width: 20px !important;
  border-radius: 4px !important;
}

/* Ensure consistent product image sizes and alignment */
.product-image-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  height: 280px !important; /* Increased height */
  width: 245px !important;  /* Increased width */
  flex-shrink: 0 !important;
  overflow: hidden !important;
  border-radius: 12px !important;
}

.product-image {
  max-width: 100% !important; /* Increased to fill container */
  max-height: 100% !important; /* Increased to fill container */
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  transition: transform 0.3s ease !important;
}

.product-card:hover .product-image {
  transform: scale(1.05) !important;
}

/* Mobile and Tablet responsive adjustments */
@media (max-width: 1199.98px) {
  .product-card {
    flex-direction: column !important;
    text-align: center !important;
    padding: 24px !important;
  }

  .product-image-wrapper {
    width: 100% !important;   /* Full width container on mobile */
    height: 220px !important;  /* Consistent height on mobile viewports */
    margin-bottom: 15px !important;
    justify-content: center !important;
  }

  .product-label {
    margin-left: auto !important;
    margin-right: auto !important;
  }

  .product-title {
    font-size: 1.5rem !important;
  }

  .product-description {
    font-size: 1rem !important;
  }

  .product-price {
    font-size: 18px !important;
  }
}

/* Center buttons on tablet/medium screen card designs */
@media (max-width: 1199.98px) and (min-width: 576.01px) {
  .product-actions {
    justify-content: center !important;
  }
}

/* Keep buttons side-by-side on mobile screens for compact and premium layout */
@media (max-width: 576px) {
  .product-actions {
    flex-direction: row !important;
    align-items: center !important;
    justify-content: center !important;
    gap: 8px !important;
    width: 100% !important;
  }

  .btn-learn,
  .btn-cart,
  .qty-box {
    flex: 1 !important;
    max-width: 50% !important;
    height: 40px !important;
    font-size: 12px !important;
    padding: 0 4px !important;
  }
}
</style>
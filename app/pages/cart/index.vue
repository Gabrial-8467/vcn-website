<template>
  <div class="cart-main-wrapper">
    <div class="container p-0">
      <h1 class="cart-page-title">{{ cart.title }}</h1>

      <div class="flex flex-col gap-8">
        <div class="w-full" v-if="cartStore.items.length === 0">
          <div class="empty-cart-message">
            <h3>{{ cart.emptyCart.heading }}</h3>
            <p class="text-center">{{ cart.emptyCart.description }}</p>
            <NuxtLink to="/all-products" class="btn-learn">{{ cart.emptyCart.buttonText }}</NuxtLink>
          </div>
        </div>

        <template v-else>
          <!-- Row 1: Cart items (Full Width, matches original UI layout) -->
          <div class="w-full">
            <!-- Cart Header -->
            <div class="cart-table-header hidden md:grid grid-cols-12 gap-4 pb-3 mb-5 border-b-2 border-gray-200">
              <div class="col-span-6 cart-header-product">{{ cart.tableHeader.product }}</div>
              <div class="col-span-3 cart-header-product text-center">{{ cart.tableHeader.quantity }}</div>
              <div class="col-span-3 cart-header-product text-end">{{ cart.tableHeader.price }}</div>
            </div>

            <!-- Cart Items -->
            <div v-for="item in cartStore.items" :key="item.id" class="cart-item-wrapper">
              <!-- Desktop Layout (hidden on mobile) -->
              <div class="hidden md:grid grid-cols-12 items-center gap-4">
                <div class="col-span-6 flex items-center gap-3">
                  <img :src="item.image" :alt="item.name" class="cart-product-image"
                    @error="$event.target.src = '/img/products/img1.png'" />
                  <div class="cart-product-details">
                    <div class="cart-product-name">{{ item.name }}</div>
                    <div class="cart-product-subscription">{{ item.subscription }}</div>
                  </div>
                </div>
                <div class="col-span-3 flex justify-center">
                  <div class="cart-quantity-control">
                    <button class="cart-qty-button" @click="handleDecrement(item.id)">−</button>
                    <div class="cart-qty-display">{{ item.quantity }}</div>
                    <button class="cart-qty-button" @click="handleIncrement(item.id)">+</button>
                  </div>
                </div>
                <div class="col-span-3 text-end">
                  <div class="cart-item-price">
                    <span v-if="item.mrp" class="cart-item-mrp">₹{{ (item.mrp * item.quantity).toFixed(2) }}</span>
                    ₹{{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                  <button class="cart-remove-btn" @click="cartStore.removeFromCart(item.id)">
                    {{ cart.cartItem.removeButton }}
                  </button>
                </div>
              </div>

              <!-- Mobile Layout (hidden on desktop) -->
              <div class="d-md-none cart-item-mobile-container w-100">
                <img :src="item.image" :alt="item.name" class="cart-product-image-mobile"
                  @error="$event.target.src = '/img/products/img1.png'" />
                <div class="cart-product-info-mobile">
                  <div class="cart-product-header-mobile">
                    <div class="cart-product-name-mobile">{{ item.name }}</div>
                  </div>
                  <div class="cart-product-subscription-mobile">{{ item.subscription }}</div>
                  
                  <div class="cart-product-actions-mobile">
                    <div class="cart-item-price-mobile">
                      <span class="cart-current-price-mobile">₹{{ (item.price * item.quantity).toFixed(2) }}</span>
                    </div>
                    
                    <div class="cart-quantity-control-mobile">
                      <button class="cart-qty-button-mobile" @click="handleDecrement(item.id)">−</button>
                      <div class="cart-qty-display-mobile">{{ item.quantity }}</div>
                      <button class="cart-qty-button-mobile" @click="handleIncrement(item.id)">+</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Row 2: Recommendations (Left, 2/3 Width) and Sidebar (Right, 1/3 Width) -->
          <div class="flex flex-col lg:flex-row gap-8 items-start w-full">
            <!-- Recommendations Section -->
            <div class="w-full lg:w-2/3 flex flex-col">
              <h2 class="cart-recommendations-title">{{ cart.recommendations.heading }}</h2>

              <!-- Recommendations Grid for Desktop -->
              <div class="hidden md:grid grid-cols-3 gap-6">
                <div v-for="product in recommendedProducts" :key="product.id" class="cart-product-card">
                  <div class="cart-suggested-image-wrapper">
                    <img :src="product.image" :alt="product.name" class="cart-suggested-image" />
                  </div>
                  <div class="cart-suggested-content">
                    <div class="cart-suggested-name">{{ product.name }}</div>
                    <div class="cart-suggested-description">{{ product.description }}</div>
                    <div class="cart-price-wrapper">
                      <div class="cart-price-column">
                        <span class="cart-current-price">₹{{ product.currentPrice }}</span>
                        <span class="cart-original-price">₹{{ product.originalPrice }}</span>
                      </div>
                      <button @click="addRecommendedProduct(product)" class="cart-add-btn">
                        {{cart.recommendations.addButton}}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Recommendations Swiper for Mobile -->
              <div class="d-md-none swiper cart-suggested-swiper">
                <div class="swiper-wrapper">
                  <div v-for="product in recommendedProducts" :key="product.id" class="swiper-slide">
                    <div class="cart-product-card">
                      <div class="cart-suggested-image-wrapper">
                        <img :src="product.image" :alt="product.name" class="cart-suggested-image" />
                      </div>
                      <div class="cart-suggested-content">
                        <div class="cart-suggested-name">{{ product.name }}</div>
                        <div class="cart-suggested-description">{{ product.description }}</div>
                        <div class="cart-price-wrapper">
                          <div class="cart-price-column">
                            <span class="cart-current-price">₹{{ product.currentPrice }}</span>
                            <span class="cart-original-price">₹{{ product.originalPrice }}</span>
                          </div>
                          <button @click="addRecommendedProduct(product)" class="cart-add-btn">
                            {{cart.recommendations.addButton}}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right Column: Sidebar (Promo, Subtotal, Checkout) -->
            <div class="w-full lg:w-1/3">
              <div class="cart-sidebar-wrapper">
                <!-- Promo Code -->
                <div class="cart-promo-section">
                  <div class="cart-promo-label">{{ cart.promo.label }}</div>
                  <div class="cart-promo-input-group">
                    <input type="text" v-model="promoInput" class="cart-promo-input" :placeholder="cart.promo.placeholder"
                      @keyup.enter="applyPromo" />
                    <button class="cart-promo-apply-btn" @click="applyPromo" :disabled="!promoInput.trim()">
                      {{ cart.promo.applyButton }}
                    </button>
                  </div>
                  <div v-if="cartStore.promoCode" class="promo-applied">
                    <span class="promo-success">{{cart.promoMessages.applied}} {{ cartStore.promoCode }}</span>
                    <button @click="removePromo" class="promo-remove">{{ cart.cartActions.remove }}</button>
                  </div>
                </div>
                <hr />

                <!-- Total -->
                <div class="cart-total-section">
                  <div class="cart-total-row" v-if="cartStore.discount > 0">
                    <span class="cart-total-label">{{ cart.total.subtotal }}</span>
                    <span class="cart-total-amount">₹{{ cartStore.cartSubtotal.toFixed(2) }}</span>
                  </div>
                  <div class="cart-total-row" v-if="cartStore.discount > 0">
                    <span class="cart-total-label">{{ cart.total.discount }}</span>
                    <span class="cart-total-amount discount">-₹{{ cartStore.discount.toFixed(2) }}</span>
                  </div>
                  <div class="cart-total-row">
                    <span class="cart-total-label">{{ cart.total.total }}</span>
                    <span class="cart-total-amount">₹{{ cartStore.cartTotal.toFixed(2) }}</span>
                  </div>
                </div>

                <!-- Checkout Button -->
                <div class="cart-checkout-btn">
                  <NuxtLink :to="cart.checkoutButton.link" class="btn">{{ cart.checkoutButton.text }}</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useProductStore } from '~/stores/product'
import { useAuthCart } from '~/composables/useAuthCart'
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue'
import { useCmsStore } from '~/stores/cms'

const cmsStore = useCmsStore()

// Fetch page sections from API during SSR/routing
await useAsyncData('cart-cms', () => cmsStore.fetchSectionsBySlug('cart'))

const cart = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find cart section by name or sectionKey
  const section = sections.find(s => s.name === 'cart' || s.sectionKey === 'cart')
  
  const fallback = cmsStore.getPageSection('cart', 'cart') || {
    title: "Your Cart",
    emptyCart: { heading: "Your cart is empty", description: "Looks like you haven't added any products to your cart yet.", buttonText: "Continue Shopping", buttonLink: "/all-products" },
    tableHeader: { product: "Product", quantity: "Quantity", price: "Price" },
    cartItem: { removeButton: "Remove" },
    recommendations: { heading: "You Might Also Like:", addButton: "Add" },
    promo: { label: "Promo Code", placeholder: "Enter Promo Code", applyButton: "Apply" },
    total: { subtotal: "Subtotal", discount: "Discount", total: "Total" },
    checkoutButton: { text: "Checkout", link: "/checkout" },
    cartActions: { remove: "Remove" },
    subscriptionText: "One-time purchase",
    promoMessages: { invalid: "Invalid promo code. Try SAVE10 for 10% off!", applied: "Promo code applied:" }
  }

  if (!section) {
    return fallback
  }

  const items = section.items || []
  const emptyCartItem = items.find(item => item.name === 'empty-cart')
  const headersItem = items.find(item => item.name === 'table-headers')
  const cartItemItem = items.find(item => item.name === 'cart-item')
  const recommendationsItem = items.find(item => item.name === 'recommendations')
  const promoCodeItem = items.find(item => item.name === 'promo-code')
  const totalsItem = items.find(item => item.name === 'totals')
  const checkoutButtonItem = items.find(item => item.name === 'checkout-button')
  const subscriptionItem = items.find(item => item.name === 'subscription')
  const actionsItem = items.find(item => item.name === 'actions')

  return {
    title: section.title || fallback.title,
    emptyCart: {
      heading: emptyCartItem?.title || fallback.emptyCart.heading,
      description: emptyCartItem?.description || fallback.emptyCart.description,
      buttonText: emptyCartItem?.buttonText || fallback.emptyCart.buttonText,
      buttonLink: emptyCartItem?.buttonLink || fallback.emptyCart.buttonLink
    },
    tableHeader: {
      product: headersItem?.extraData?.product || fallback.tableHeader.product,
      quantity: headersItem?.extraData?.quantity || fallback.tableHeader.quantity,
      price: headersItem?.extraData?.price || fallback.tableHeader.price
    },
    cartItem: {
      removeButton: cartItemItem?.buttonText || fallback.cartItem.removeButton
    },
    recommendations: {
      heading: recommendationsItem?.title || fallback.recommendations.heading,
      addButton: recommendationsItem?.extraData?.addButtonText || fallback.recommendations.addButton
    },
    promo: {
      label: promoCodeItem?.title || fallback.promo.label,
      placeholder: promoCodeItem?.extraData?.placeholder || fallback.promo.placeholder,
      applyButton: promoCodeItem?.extraData?.applyButtonText || fallback.promo.applyButton
    },
    total: {
      subtotal: totalsItem?.extraData?.subtotalLabel || fallback.total.subtotal,
      discount: totalsItem?.extraData?.discountLabel || fallback.total.discount,
      total: totalsItem?.extraData?.totalLabel || fallback.total.total
    },
    checkoutButton: {
      text: checkoutButtonItem?.buttonText || checkoutButtonItem?.title || fallback.checkoutButton.text,
      link: checkoutButtonItem?.buttonLink || fallback.checkoutButton.link
    },
    cartActions: {
      remove: actionsItem?.extraData?.remove || fallback.cartActions.remove
    },
    subscriptionText: subscriptionItem?.description || fallback.subscriptionText,
    promoMessages: {
      invalid: promoCodeItem?.extraData?.messages?.invalid || fallback.promoMessages.invalid,
      applied: promoCodeItem?.extraData?.messages?.applied || fallback.promoMessages.applied
    }
  }
})

const cartStore = useCartStore()
const productStore = useProductStore()
const { authState, initializeCart } = useAuthCart()
const promoInput = ref('')

// Fetch products from store
productStore.fetchProducts()

// Recommended products - dynamically from store (first 3 products)
const recommendedProducts = computed(() => {
  return productStore.allProducts.slice(0, 3).map(product => {
    const pricing = productStore.getProductPricing(product)
    return {
      id: product.id,
      name: product.name,
      description: product.description?.substring(0, 50) + '...' || 'Daily Wellness Product',
      currentPrice: pricing.price,
      originalPrice: pricing.oldPrice,
      image: productStore.getPrimaryImage(product)
    }
  })
})

const swiperInstance = ref(null)

const initSwiper = () => {
  if (typeof window === 'undefined' || !window.Swiper) {
    setTimeout(initSwiper, 100)
    return
  }

  const container = document.querySelector('.cart-suggested-swiper')
  if (!container) return

  if (swiperInstance.value) {
    swiperInstance.value.destroy(true, true)
    swiperInstance.value = null
  }

  swiperInstance.value = new window.Swiper('.cart-suggested-swiper', {
    slidesPerView: 1.05,
    spaceBetween: 12,
    breakpoints: {
      480: {
        slidesPerView: 1.2,
        spaceBetween: 16
      },
      576: {
        slidesPerView: 1.5,
        spaceBetween: 16
      }
    }
  })
}

// Initialize cart data on mount
onMounted(async () => {
  // Initialize cart based on auth state
  await initializeCart()

  // Load cart data from localStorage first
  if (process.client && window.localStorage) {
    await cartStore.loadCart()
  }

  // Sync with backend API (load server cart and merge with local)
  await cartStore.loadFromBackend()

  if (process.client) {
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

const addRecommendedProduct = async (product) => {
  await cartStore.addToCart({
    id: product.id,
    name: product.name,
    price: product.currentPrice,
    mrp: product.originalPrice,
    image: product.image,
    subscription: 'One-time purchase',
    variantId: product.variantId || product.id
  })
}

const handleIncrement = async (itemId) => {
  await cartStore.incrementQuantity(itemId)
}

const handleDecrement = async (itemId) => {
  await cartStore.decrementQuantity(itemId)
}

const applyPromo = () => {
  if (promoInput.value.trim()) {
    const success = cartStore.applyPromoCode(promoInput.value.trim())
    if (!success) {
      alert(cart.value.promoMessages.invalid) // Show error message from CMS
    }
    promoInput.value = ''
  }
}

const removePromo = () => {
  cartStore.removePromoCode()
}

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
});
</script>

<style scoped>
.cart-main-wrapper {
  max-width: 100% !important;
  width: 100% !important;
  padding: 160px 20px 80px !important;
  margin: 0 !important;
}

@media (min-width: 992px) {
  .cart-main-wrapper {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
}

@media (min-width: 1400px) {
  .cart-main-wrapper {
    padding-left: 160px !important;
    padding-right: 160px !important;
  }
}

@media (max-width: 991.98px) {
  .cart-main-wrapper {
    padding-top: 100px !important;
    padding-bottom: 40px !important;
    padding-left: 20px !important;
    padding-right: 20px !important;
    text-align: center !important;
  }
}

.empty-cart-message {
  text-align: center;
  padding: 60px 20px;
  border-radius: 8px;
  margin: 20px 0;
}

.empty-cart-message h3 {
  color: var(--vcn-primary);
  margin-bottom: 15px;
}

.empty-cart-message p {
  color: #666;
  margin-bottom: 25px;
}

.cart-remove-btn {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 5px;
  text-decoration: underline;
}

.cart-remove-btn:hover {
  color: #c82333;
}

.promo-applied {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.promo-success {
  color: #28a745;
  font-size: 0.9rem;
}

.promo-remove {
  background: none;
  border: none;
  color: #dc3545;
  font-size: 0.8rem;
  cursor: pointer;
  text-decoration: underline;
}

.discount {
  color: #28a745 !important;
}

.cart-promo-apply-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cart-item-mrp {
  text-decoration: line-through;
  color: #999;
  font-size: 0.9em;
  margin-right: 8px;
}

/* Suggested products custom wrapper styles for desktop */
.cart-product-card {
  display: flex !important;
  flex-direction: column !important;
  height: 100% !important;
  justify-content: space-between !important;
  padding: 24px !important;
  background-color: #f0efef !important;
  border: 1px solid #b6b6b6 !important;
  border-radius: 16px !important;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
  text-align: center !important;
}

.cart-product-card:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05) !important;
  border-color: rgba(29, 69, 3, 0.1) !important;
}

.cart-suggested-image-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  width: 100% !important;
  height: 180px !important;
  margin-bottom: 20px !important;
  border-radius: 10px !important;
  padding: 10px !important;
  background-color: transparent !important;
  overflow: hidden !important;
}

.cart-suggested-image {
  max-width: 100% !important;
  max-height: 100% !important;
  width: auto !important;
  height: auto !important;
  object-fit: contain !important;
  margin: 0 auto !important;
  transition: transform 0.3s ease !important;
}

.cart-product-card:hover .cart-suggested-image {
  transform: scale(1.04) !important;
}

.cart-suggested-content {
  padding: 0;
  text-align: center !important;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.cart-suggested-name {
  font-size: 15px !important;
  font-weight: 600 !important;
  color: var(--vcn-footer) !important;
  margin-bottom: 6px !important;
  line-height: 1.4 !important;
}

.cart-suggested-description {
  font-size: 13px !important;
  color: #666 !important;
  margin-bottom: 16px !important;
  line-height: 1.5 !important;
  flex-grow: 1;
}

.cart-price-wrapper {
  display: flex !important;
  align-items: center !important;
  justify-content: space-between !important;
  margin-top: auto !important;
  width: 100% !important;
  padding-top: 12px !important;
}

.cart-price-column {
  display: flex !important;
  flex-direction: column !important;
  align-items: flex-start !important;
  text-align: left !important;
}

.cart-current-price {
  font-size: 16px !important;
  font-weight: 700 !important;
  color: var(--vcn-footer) !important;
  line-height: 1.2 !important;
}

.cart-original-price {
  font-size: 13px !important;
  color: #999 !important;
  text-decoration: line-through !important;
  line-height: 1.2 !important;
  margin-top: 2px !important;
}

.cart-add-btn {
  background-color: white !important;
  border: 1px solid var(--vcn-primary) !important;
  color: var(--vcn-primary) !important;
  padding: 8px 24px !important;
  border-radius: 30px !important;
  font-weight: 600 !important;
  font-size: 13px !important;
  transition: all 0.25s ease !important;
  cursor: pointer !important;
}

.cart-add-btn:hover {
  background-color: var(--vcn-footer) !important;
  color: white !important;
  border-color: var(--vcn-footer) !important;
  box-shadow: 0 4px 12px rgba(29, 69, 3, 0.15) !important;
}

/* Swiper styling */
.cart-suggested-swiper {
  width: 100% !important;
  padding-bottom: 10px !important;
}

.cart-suggested-swiper .swiper-slide {
  height: auto !important;
}

/* Mobile responsive horizontal layout */
@media (max-width: 991.98px) {
  .cart-item-wrapper {
    padding: 16px 0 !important;
    margin: 0 !important;
  }
}

@media (max-width: 767.98px) {
  .cart-item-mobile-container {
    display: flex;
    width: 100%;
    gap: 20px;
    align-items: flex-start;
  }

  .cart-product-image-mobile {
    width: 130px !important;
    height: 140px !important;
    object-fit: contain !important;
    /* border-radius: 8px !important; */
    /* background-color: #f8f9fa !important; */
    /* border: 1px solid #f0f0f0 !important; */
    /* padding: 8px !important; */
    flex-shrink: 0 !important;
  }

  .cart-product-info-mobile {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .cart-product-header-mobile {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 12px;
    width: 100%;
  }

  .cart-product-name-mobile {
    font-size: 17px !important;
    font-weight: 600 !important;
    color: var(--vcn-footer) !important;
    line-height: 1.3 !important;
  }

  .cart-product-subscription-mobile {
    font-size: 13px !important;
    color: #666 !important;
    margin-top: 4px !important;
    margin-bottom: 2px !important;
  }

  .cart-remove-btn-mobile {
    background: none !important;
    border: none !important;
    color: #dc3545 !important;
    font-size: 13px !important;
    text-decoration: underline !important;
    cursor: pointer !important;
    padding: 0 !important;
    text-align: left !important;
    margin-top: 2px !important;
    margin-bottom: 12px !important;
    width: fit-content !important;
  }

  .cart-remove-btn-mobile:hover {
    color: #c82333 !important;
  }

  .cart-product-actions-mobile {
    display: flex !important;
    justify-content: space-between !important;
    align-items: center !important;
    width: 100% !important;
    margin-top: 4px !important;
  }

  .cart-item-price-mobile {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
  }

  .cart-current-price-mobile {
    font-size: 17px !important;
    font-weight: 700 !important;
    color: var(--vcn-footer) !important;
    line-height: 1.2 !important;
  }

  .cart-item-mrp-mobile {
    text-decoration: line-through !important;
    color: #999 !important;
    font-size: 13px !important;
    line-height: 1.2 !important;
  }

  .cart-quantity-control-mobile {
    display: flex !important;
    align-items: center !important;
    border: 1px solid #ddd !important;
    border-radius: 24px !important;
    background: white !important;
    padding: 3px 6px !important;
  }

  .cart-qty-button-mobile {
    background: none !important;
    border: none !important;
    width: 28px !important;
    height: 28px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    font-size: 16px !important;
    font-weight: bold !important;
    color: var(--vcn-footer) !important;
    cursor: pointer !important;
  }

  .cart-qty-display-mobile {
    width: 28px !important;
    text-align: center !important;
    font-size: 14px !important;
    font-weight: 600 !important;
    color: var(--vcn-footer) !important;
  }

  .cart-product-card {
    display: flex !important;
    flex-direction: row !important;
    text-align: left !important;
    padding: 16px !important;
    gap: 16px !important;
    align-items: center !important;
    background-color: #fcfcfc !important;
    border: 1px solid #eeeeee !important;
    border-radius: 16px !important;
    height: auto !important;
  }

  .cart-suggested-image-wrapper {
    width: 110px !important;
    height: 120px !important;
    margin-bottom: 0 !important;
    flex-shrink: 0 !important;
    border-radius: 10px !important;
    padding: 6px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background-color: transparent !important;
  }

  .cart-suggested-image {
    max-width: 100% !important;
    max-height: 100% !important;
    width: auto !important;
    height: auto !important;
    object-fit: contain !important;
  }

  .cart-suggested-content {
    flex: 1 !important;
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    padding: 0 !important;
    text-align: left !important;
  }

  .cart-suggested-name {
    font-size: 14px !important;
    font-weight: 600 !important;
    margin-bottom: 4px !important;
    color: var(--vcn-footer) !important;
  }

  .cart-suggested-description {
    font-size: 12px !important;
    line-height: 1.4 !important;
    margin-bottom: 8px !important;
    color: #666 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 5 !important;
    line-clamp: 5;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }

  .cart-price-wrapper {
    display: flex !important;
    width: 100% !important;
    align-items: center !important;
    justify-content: space-between !important;
    margin-top: 4px !important;
    margin-bottom: 0 !important;
    gap: 10px !important;
  }

  .cart-price-column {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    gap: 2px !important;
  }

  .cart-current-price {
    font-size: 14px !important;
    font-weight: 700 !important;
    margin-right: 0 !important;
    line-height: 1.2 !important;
    color: var(--vcn-footer) !important;
  }

  .cart-original-price {
    font-size: 12px !important;
    margin-right: 0 !important;
    line-height: 1.2 !important;
  }

  .cart-add-btn {
    background-color: white !important;
    border: 1px solid var(--vcn-primary) !important;
    color: var(--vcn-primary) !important;
    padding: 6px 20px !important;
    font-size: 13px !important;
    border-radius: 20px !important;
    margin-top: 0 !important;
    flex-shrink: 0 !important;
    font-weight: 600 !important;
  }

  .cart-add-btn:hover {
    background-color: var(--vcn-footer) !important;
    color: white !important;
    border-color: var(--vcn-footer) !important;
  }
}
</style>

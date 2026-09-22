<template>
  <section class="rp-section">
    <div class="rp-container">

      <!-- Header -->
      <div class="rp-header">
        <div class="rp-header-left">
          <span class="rp-overline">Complete Your Wellness</span>
          <h2 class="rp-title">You May Also <em>Like</em></h2>
        </div>
        <NuxtLink to="/all-products" class="rp-view-all">
          Explore All Products
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </NuxtLink>
      </div>

      <!-- Product grid -->
      <div class="rp-grid" v-if="products.length > 0">
        <div v-for="product in products" :key="product.id" class="rp-card">

          <!-- Badge -->
          <div class="rp-card-badge" v-if="product.label">{{ product.label }}</div>

          <!-- Image -->
          <NuxtLink :to="`/product-details/${product.slug}`" class="rp-img-wrap">
            <img :src="getProductImage(product)" :alt="product.name" class="rp-img" @error="onImgErr" />
            <div class="rp-img-overlay">
              <span class="rp-overlay-cta">View Product →</span>
            </div>
          </NuxtLink>

          <!-- Body -->
          <div class="rp-card-body">
            <NuxtLink :to="`/product-details/${product.slug}`" class="rp-name">{{ product.name }}</NuxtLink>
            <p class="rp-desc">{{ truncateDesc(product.description) }}</p>

            <div class="rp-bottom">
              <div class="rp-prices">
                <span class="rp-price">₹{{ getProductPrice(product).price }}</span>
                <span v-if="getProductPrice(product).oldPrice" class="rp-mrp">₹{{ getProductPrice(product).oldPrice }}</span>
                <span v-if="getDiscount(product)" class="rp-discount-tag">{{ getDiscount(product) }}% OFF</span>
              </div>
              <div class="rp-actions">
                <NuxtLink :to="`/product-details/${product.slug}`" class="rp-btn-details">Details</NuxtLink>
                <ClientOnly>
                  <template #placeholder>
                    <button class="rp-btn-cart">+ Add</button>
                  </template>
                  <button v-if="!getCartItem(product.id)" class="rp-btn-cart" @click="addToCart(product)">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    Add
                  </button>
                  <div v-else class="rp-qty">
                    <button @click="cartStore.decrementQuantity(product.id)">−</button>
                    <span>{{ getCartItem(product.id)?.quantity || 1 }}</span>
                    <button @click="cartStore.incrementQuantity(product.id)">+</button>
                  </div>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div class="rp-empty" v-else>
        <p>Loading products…</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '~/stores/product'
import { useCartStore } from '~/stores/cart'

const productStore = useProductStore()
const cartStore = useCartStore()
const products = ref([])

onMounted(async () => {
  await productStore.fetchProducts()
  products.value = productStore.allProducts.slice(0, 4)
  if (process.client) cartStore.loadCart()
})

const getProductImage = (p) => productStore.getPrimaryImage(p)
const getProductPrice = (p) => productStore.getProductPricing(p)
const getCartItem = (id) => cartStore.getItemById(id)

const getDiscount = (p) => {
  const pricing = getProductPrice(p)
  if (!pricing.oldPrice) return null
  const sp = parseFloat(pricing.price)
  const mrp = parseFloat(pricing.oldPrice)
  if (mrp > sp && mrp > 0) return Math.round((1 - sp / mrp) * 100)
  return null
}

const truncateDesc = (desc) => {
  if (!desc) return 'Premium Ayurvedic formulation for everyday wellness.'
  return desc.length > 72 ? desc.slice(0, 72).trim() + '…' : desc
}

const onImgErr = (e) => { if (e?.target) e.target.src = '/img/productsdetails/BOOSTER.png' }

const addToCart = async (product) => {
  const pricing = getProductPrice(product)
  const defaultVariant = product.variants?.find(v => v.isDefault) || product.variants?.[0]
  await cartStore.addToCart({
    id: product.id, name: product.name,
    price: parseFloat(pricing.price).toFixed(2),
    mrp: pricing.oldPrice ? parseFloat(pricing.oldPrice).toFixed(2) : null,
    image: getProductImage(product),
    variantId: defaultVariant?.id || product.id
  })
}
</script>

<style scoped>
/* ─── Section ─────────────────────────────────────────────── */
.rp-section {
  background: #f7f9f4;
  padding: 80px 0 96px;
  position: relative;
  overflow: hidden;
}

/* Top accent line */
.rp-section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, #1d4503, #a8de6a, #1d4503);
}

.rp-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

@media (max-width: 768px) {
  .rp-section { padding: 56px 0 72px; }
  .rp-container { padding: 0 20px; }
}

/* ─── Header ─────────────────────────────────────────────── */
.rp-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 44px;
  flex-wrap: wrap;
  gap: 16px;
}

.rp-overline {
  display: block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #1d4503;
  margin-bottom: 8px;
}

.rp-title {
  font-family: 'Outfit', system-ui, sans-serif;
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 900;
  color: #0e1a0b;
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0;
}
.rp-title em { font-style: normal; color: #1d4503; }

.rp-view-all {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 700;
  color: #1d4503;
  text-decoration: none;
  border: 1.5px solid #b8e084;
  background: #fff;
  padding: 10px 20px;
  border-radius: 40px;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.rp-view-all:hover { background: #1d4503; color: #fff; border-color: #1d4503; }

/* ─── Grid ───────────────────────────────────────────────── */
.rp-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

@media (max-width: 1100px) { .rp-grid { grid-template-columns: repeat(3, 1fr); } }
@media (max-width: 768px) { .rp-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; } }
@media (max-width: 480px) { .rp-grid { grid-template-columns: 1fr; } }

/* ─── Card ───────────────────────────────────────────────── */
.rp-card {
  background: #ffffff;
  border: 1.5px solid #e8f0e3;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 10px rgba(29, 69, 3, 0.05);
}

.rp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 48px rgba(29, 69, 3, 0.13);
  border-color: #a8de6a;
}

/* Badge */
.rp-card-badge {
  position: absolute;
  top: 12px; left: 12px;
  z-index: 2;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  background: #1d4503;
  color: #ffffff;
  padding: 4px 10px;
  border-radius: 20px;
}

/* Image */
.rp-img-wrap {
  display: block;
  background: #f0fae6;
  height: 210px;
  position: relative;
  overflow: hidden;
}

.rp-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 20px;
  transition: transform 0.4s ease;
}
.rp-card:hover .rp-img { transform: scale(1.06); }

.rp-img-overlay {
  position: absolute;
  inset: 0;
  background: rgba(14, 26, 11, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.rp-card:hover .rp-img-overlay { opacity: 1; }

.rp-overlay-cta {
  background: #ffffff;
  color: #0e1a0b;
  font-size: 13px;
  font-weight: 800;
  padding: 10px 22px;
  border-radius: 30px;
  letter-spacing: 0.2px;
}

/* Body */
.rp-card-body {
  padding: 18px 18px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}

.rp-name {
  font-size: 15px;
  font-weight: 800;
  color: #0e1a0b;
  text-decoration: none;
  line-height: 1.3;
  display: block;
  font-family: 'Outfit', system-ui, sans-serif;
  transition: color 0.2s;
}
.rp-name:hover { color: #1d4503; }

.rp-desc {
  font-size: 12.5px;
  line-height: 1.55;
  color: #6b7e60;
  margin: 0;
  flex: 1;
}

/* Bottom row */
.rp-bottom {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: auto;
  padding-top: 8px;
  border-top: 1px solid #e8f0e3;
}

.rp-prices {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
}

.rp-price {
  font-size: 20px;
  font-weight: 900;
  color: #0e1a0b;
  letter-spacing: -0.5px;
  font-family: 'Outfit', system-ui, sans-serif;
}

.rp-mrp {
  font-size: 13px;
  color: #b0b8a8;
  text-decoration: line-through;
}

.rp-discount-tag {
  font-size: 10px;
  font-weight: 800;
  color: #1d4503;
  background: #e2f7c2;
  border: 1px solid #b8e084;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Actions */
.rp-actions {
  display: flex;
  gap: 8px;
}

.rp-btn-details, .rp-btn-cart {
  flex: 1;
  height: 38px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: all 0.2s ease;
  font-family: 'Outfit', system-ui, sans-serif;
}

.rp-btn-details {
  background: #0e1a0b;
  color: #ffffff;
  border: none;
}
.rp-btn-details:hover { background: #1d4503; }

.rp-btn-cart {
  background: transparent;
  color: #1d4503;
  border: 1.5px solid #b8e084;
}
.rp-btn-cart:hover { background: #f0fae6; border-color: #7dcc30; }

/* Qty stepper */
.rp-qty {
  flex: 1;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid #0e1a0b;
  border-radius: 12px;
  padding: 0 10px;
}
.rp-qty button {
  background: none; border: none; font-size: 17px; font-weight: 700;
  cursor: pointer; color: #0e1a0b; width: 22px; height: 22px;
  display: flex; align-items: center; justify-content: center;
}
.rp-qty span { font-size: 14px; font-weight: 700; color: #0e1a0b; }

/* ─── Empty ──────────────────────────────────────────────── */
.rp-empty {
  text-align: center;
  padding: 48px;
  color: #8aab72;
  font-size: 14px;
}
</style>
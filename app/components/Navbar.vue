<template>
  <!-- Navbar -->
  <header>
    <nav class="navbar" :class="{ 'scrolled': isHydrated && isScrolled }" id="navbar">
      <div class="container-fluid">
        <!-- Mobile Layout -->
        <NuxtLink class="navbar-brand d-lg-none" to="/">
          <img src="/img/logo/logo.png" alt="Logo" class="nav-img" />
        </NuxtLink>

        <!-- HTML -->
        <div class="d-lg-none d-flex align-items-center">
          <NuxtLink to="/cart" class="mobile-cart">
            Cart
            <ClientOnly>
              <span v-if="cartStore.cartCount > 0" class="cart-count-badge">{{ cartStore.cartCount }}</span>
            </ClientOnly>
          </NuxtLink>
          <button class="custom-navbar-toggler" type="button" onclick="toggleMenu()" aria-label="Toggle menu">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
          </button>
        </div>

        <!-- Desktop Layout -->
        <div class="nav-left-wrapper d-none d-lg-flex">
          <NuxtLink class="navbar-brand" to="/">
            <img src="/img/logo/logo.png" alt="Logo" class="nav-img" />
          </NuxtLink>

          <ul class="desktop-nav">
            <li class="nav-item dropdown">
              <NuxtLink class="nav-link" to="/all-products">Shop</NuxtLink>
              <ul class="dropdown-menu">
                <!-- Scrollable product list -->
                <li class="dropdown-products-scroll">
                  <ul class="dropdown-products-list">
                    <li v-for="product in shopProducts" :key="product.id">
                      <NuxtLink class="dropdown-item" :to="`/product-details/${product.slug}`">
                        <img :src="productStore.getPrimaryImage(product)" :alt="product.name" />
                        {{ product.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <!-- Fixed footer pinned at bottom -->
                <li class="dropdown-footer">
                  <NuxtLink to="/all-products">Shop All Products →</NuxtLink>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <NuxtLink class="nav-link" to="#">Science</NuxtLink>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink class="dropdown-item" to="/all-products">
                    <img src="/img/drop-down/abput us.png" alt="Approach" />
                    <strong>V-GANO</strong>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" to="/all-products">
                    <img src="/img/image/vcnlabs.png" alt="VCN Labs" />
                    <strong>V-VEDA</strong>
                  </NuxtLink>
                </li>
                <!-- <li>
                  <a class="dropdown-item" href="/approach#scientists">
                    <img
                      src=""
                      alt="VCN Labs" />
                    <strong>Scientists</strong>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/sustainability">
                    <img
                      src=""
                      alt="VCN Labs" />
                    <strong>Sustainability</strong>
                  </a>
                </li> -->
                <!-- <li>
                  <a href="" class="dropdown-item"><strong>References</strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li> -->
              </ul>
            </li>
            <li class="nav-item dropdown">
              <NuxtLink class="nav-link" to="/about-us">About Us</NuxtLink>
              <ul class="dropdown-menu">
                <li>
                  <NuxtLink class="dropdown-item" to="/vcn-R-D">
                    <img src="/img/drop-down/blog.png" alt="Research" />
                    R & D
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" to="/contact-us">
                    <img src="/img/drop-down/sustainability.png" alt="Research" />
                    Contact Us
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="nav-right-wrapper d-none d-lg-flex align-items-center">
          <NuxtLink to="#" class="login-link" @click.prevent="openForm">Login</NuxtLink>
          <NuxtLink to="/cart" class="navbar-btn">
            Cart
            <ClientOnly>
              <span v-if="cartStore.cartCount > 0" class="cart-count-badge">{{ cartStore.cartCount }}</span>
            </ClientOnly>
          </NuxtLink>

        </div>

        <!-- Sign In Modal (Teleport to body for proper stacking) -->
        <teleport to="body">
          <!-- Overlay -->
          <transition name="fade">
            <div v-if="isOpen" class="overlay" @click="closeForm"></div>
          </transition>

          <!-- Slide In Form -->
          <transition name="slide-right">
            <div v-if="isOpen" class="slide-form-container">
              <button class="close-btn" @click="closeForm">&times;</button>

              <div class="form-content">
                <h2>Sign In</h2>

                <form @submit.prevent="handleLogin">
                  <div class="form-group">
                    <label for="mobile">Mobile Number</label>
                    <input type="tel" id="mobile" v-model="formData.mobile" placeholder="+91" class="form-input">
                  </div>

                  <div class="form-group">
                    <label for="password">Password</label>
                    <div class="password-wrapper">
                      <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password"
                        placeholder="Password" class="form-input">
                      <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                        {{ showPassword ? '🙈' : '👁️' }}
                      </button>
                    </div>
                  </div>

                  <NuxtLink to="#" class="forgot-password">Forgot Password</NuxtLink>

                  <button type="submit" class="signin-btn">SIGN IN</button>

                  <div class="social-login">
                    <p>Sign in with</p>
                    <div class="social-icons">
                      <button type="button" class="social-btn google">
                        <img src="/img/icons/login_google.svg" alt="Google">
                      </button>
                      <button type="button" class="social-btn facebook">
                        <img src="/img/icons/login_facebook.svg" alt="Facebook">
                      </button>
                    </div>
                  </div>

                  <div class="register-section">
                    <h3>Register <span class="info-icon">ⓘ</span></h3>
                    <button type="button" class="register-btn" @click="openRegistration('preferred-customer')">
                      PREFERRED CUSTOMER
                    </button>
                    <button type="button" class="register-btn" @click="openRegistration('abo')">
                      VCN BUSINESS OWNER
                    </button>
                  </div>

                  <div class="footer-links">
                    <NuxtLink to="/terms-conditions" @click="showRegistration = true">Terms & Conditions</NuxtLink>
                    <NuxtLink to="/privacy-policy">Privacy</NuxtLink>
                  </div>
                </form>
              </div>
            </div>
          </transition>
        </teleport>



        <!-- Mobile Full Screen Menu -->
        <div class="navbar-collapse" id="navbarContent">
          <!-- <div class="mobile-menu-header">
              <img src="/img/logo/logo.png" alt="Logo" class="mobile-logo" />
              <button class="close-menu" onclick="toggleMenu()">×</button>
            </div> -->

          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'shopAccordion')">Shop</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'scienceAccordion')">Science</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'learnAccordion')">About</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="login">Login</NuxtLink>
            </li>
          </ul>

          <!-- Shop Accordion -->
          <div class="dropdown-content" id="shopAccordion" show>
            <div class="dropdown-menu-mobile">
              <!-- Scrollable product list -->
              <div class="mobile-products-scroll">
                <NuxtLink v-for="product in shopProducts" :key="product.id" class="dropdown-item"
                  :to="`/product-details/${product.slug}`">
                  <img :src="productStore.getPrimaryImage(product)" :alt="product.name" />
                  {{ product.name }}
                </NuxtLink>
              </div>
              <!-- Fixed footer pinned at bottom -->
              <div class="dropdown-footer">
                <NuxtLink to="/all-products">Shop All Products →</NuxtLink>
              </div>
            </div>
          </div>

          <!-- Science Accordion -->
          <div class="dropdown-content" id="scienceAccordion">
            <div class="dropdown-menu-mobile">

              <NuxtLink class="dropdown-item" to="/our-leadership">
                <img src="/img/drop-down/abput us.png" alt="VCN Labs" />
                <strong>V-Gano</strong>
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/book-consultancy">
                <img src="/img/image/vcnlabs.png" alt="VCN Labs" />
                <strong>V-Veda</strong>
              </NuxtLink>

            </div>
          </div>

          <!-- Learn Accordion -->
          <div class="dropdown-content" id="learnAccordion">
            <div class="dropdown-menu-mobile">
              <NuxtLink class="dropdown-item" to="/blog">
                <img src="/img/drop-down/blog.png" alt="Research" />
                Blogs
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/contact-us">
                <img src="/img/drop-down/sustainability.png" alt="Research" />
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <!-- Registration Modal (Teleport to body for proper stacking) -->
  <!-- Navbar template ke end mein -->
  <teleport to="body">
    <!-- Overlay -->
    <div v-if="showRegistration" class="registration-overlay" @click="showRegistration = false"></div>

    <RegistrationForm v-if="showRegistration" :userType="selectedUserType" @close="showRegistration = false"
      @complete="handleRegistrationComplete" />
  </teleport>
</template>


<script setup>
import { ref, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import { useCartStore } from '~/stores/cart'
import { useAuthCart } from '~/composables/useAuthCart'
import { useApi } from '~/config/api/useApi'
import { useProductStore } from '~/stores/product'


//product store
const productStore = useProductStore()

// Cart store - proper Nuxt/Pinia pattern
const cartStore = useCartStore()
const { getFromEndpoint } = useApi()

// Auth cart composable
const { authState, initializeCart } = useAuthCart()

// Initialize cart data on mount
onMounted(() => {
  // Initialize cart based on auth state (non-blocking)
  initializeCart()

  // Load cart data from appropriate source
  if (process.client && window.localStorage) {
    cartStore.loadCart()
  }

  // Fetch products for shop dropdown (non-blocking)
  fetchShopProducts()
})

// Registration form state
const isOpen = ref(false)
const showPassword = ref(false)
const formData = reactive({
  mobile: '',
  password: ''
})

const openForm = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeForm = () => {
  isOpen.value = false
  document.body.style.overflow = ''
  // Reset form
  formData.mobile = ''
  formData.password = ''
}

const handleLogin = () => {
  console.log('Login:', formData)
  // Add your login logic here
}

const showRegistration = ref(false)
const selectedUserType = ref('preferred-customer')

const openRegistration = (type) => {
  selectedUserType.value = type
  showRegistration.value = true
}

const handleRegistrationComplete = (data) => {
  console.log('✅ Registered:', data)
  showRegistration.value = false
  // Optional: Redirect ya toast show karo
}

// Shop dropdown products
const shopProducts = ref([])


// Fetch products for shop dropdown
const fetchShopProducts = async () => {
  try {
    const { data, error } = await getFromEndpoint('PRODUCTS')
    if (!error && data?.data) {
      // Get first 5 products
      shopProducts.value = data.data.slice(0, 5)
    }
  } catch (err) {
    console.error('Failed to fetch shop products:', err)
  }
}

// Initialize scrolled state to false for consistent SSR
const isScrolled = ref(false)
const isHydrated = ref(false)
let scrollHandler = null

// Handle scroll events only on client side
onMounted(() => {
  isHydrated.value = true

  // Single scroll handler for navbar only (TopHeader handles itself)
  scrollHandler = () => {
    isScrolled.value = window.scrollY > 50
  }

  scrollHandler() // Initial check
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

// Cleanup on unmount
onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<style scoped>
/* Cart page specific navbar link colors */
body.cart-page .desktop-nav .nav-link,
body.cart-page .desktop-nav a,
body.cart-page .navbar .nav-link,
body.cart-page .navbar a {
  color: var(--vcn-primary) !important;
}

body.cart-page .desktop-nav .nav-link:hover,
body.cart-page .desktop-nav a:hover,
body.cart-page .navbar .nav-link:hover,
body.cart-page .navbar a:hover {
  color: #1c3a13 !important;
}

/* Checkout page specific navbar link colors */
body.checkout-page .desktop-nav .nav-link,
body.checkout-page .desktop-nav a,
body.checkout-page .navbar .nav-link,
body.checkout-page .navbar a {
  color: var(--vcn-primary) !important;
}

body.checkout-page .desktop-nav .nav-link:hover,
body.checkout-page .desktop-nav a:hover,
body.checkout-page .navbar .nav-link:hover,
body.checkout-page .navbar a:hover {
  color: #1c3a13 !important;
}

/* Scrolled navbar styles for checkout page */
body.checkout-page .navbar.scrolled .desktop-nav .nav-link,
body.checkout-page .navbar.scrolled .desktop-nav a,
body.checkout-page .navbar.scrolled .navbar .nav-link,
body.checkout-page .navbar.scrolled .navbar a {
  color: #ffffff !important;
}

body.checkout-page .navbar.scrolled .desktop-nav .nav-link:hover,
body.checkout-page .navbar.scrolled .desktop-nav a:hover,
body.checkout-page .navbar.scrolled .navbar .nav-link:hover,
body.checkout-page .navbar.scrolled .navbar a:hover {
  color: #ffffff !important;
}

/* Login link white when scrolled on checkout page */
body.checkout-page .navbar.scrolled .login-link {
  color: #ffffff !important;
}

/* ========== DESKTOP NAVBAR ========== */
.navbar {
  position: fixed !important;
  top: 28px;
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 20px 40px !important;
  background: transparent !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  top: 0px;
}

.nav-img {
  width: 65px;
  height: auto;
}

.navbar .container-fluid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.navbar-brand {
  color: white !important;
  font-size: 20px;
  font-weight: 600;
  padding: 0;
  margin: 0;
}

/* Mobile only elements */
.mobile-cart {
  color: var(--vcn-mobile);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  margin-right: 15px;
  transition: color 0.3s ease;
}

.mobile-cart:hover {
  color: #2d5a3f;
}

/* Custom Navbar Toggler */
/* Custom Navbar Toggler - Improved */
.custom-navbar-toggler {
  border: none;
  background: transparent;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10002;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-navbar-toggler:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Hamburger Lines */
.hamburger-line {
  width: 24px;
  height: 2.5px;
  background: var(--vcn-footer);
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  position: relative;
}

/* Active/Open State - Transform to X */
body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
  background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
  background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
}

/* Hover effect */
.custom-navbar-toggler:hover .hamburger-line {
  height: 3px;
}

/* Mobile Menu - Slides from BEHIND the Logo */
.navbar-collapse {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  background: rgba(40, 40, 40, 0.95);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 0;
  overflow: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  z-index: 1;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  margin-top: 30px;
  opacity: 0;
}

/* Show state - Expand */
.navbar-collapse.show {
  width: calc(100% - 0px);
  padding: 4px;
  opacity: 1;
}

/* Header */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.mobile-logo {
  width: 45px;
}

.close-menu {
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-menu:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

/* Hide logo when menu is open */
.navbar-brand.d-lg-none {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 10001;
}

body.menu-open .navbar-brand.d-lg-none {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

/* Dropdown Items with Images */
/* .dropdown-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 5px 10px;
} */

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.dropdown-item img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
}

.dropdown-footer {
  padding: 20px;
  text-align: center;
  margin-top: 10px;
}

.dropdown-footer a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.dropdown-footer a:hover {
  color: #4CAF50;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-navbar-toggler {
    width: 36px;
    height: 22px;
  }

  .hamburger-line {
    width: 22px;
    height: 2px;
  }
}

body.menu-open .navbar-brand.d-lg-none {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

/* Hamburger to Close animation */
.custom-navbar-toggler {
  position: relative;

  color: var(--vcn-mobile);
  border: none;
  cursor: pointer;
  z-index: 10002;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--vcn-mobile);
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
}

.hamburger-line:nth-child(1) {
  top: 0;
}

.hamburger-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-line:nth-child(3) {
  bottom: 0;
}

/* Transform to X when open */
body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(2) {
  opacity: 0;
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* Mobile Menu - Slides from BEHIND the Logo */
.navbar-collapse {


  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  /* Initially hidden */
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  /* Initially hidden */
  background: rgba(40, 40, 40, 0.3);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 0;
  overflow: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  z-index: 1;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  margin-top: 30px;
  opacity: 0;
}

/* Hide state - Slide up */
.navbar-collapse.hidden {
  transform: translateY(-100%);
  /* Upar slide ho jayega */
}

/* Show state - Expand */
.navbar-collapse.show {
  width: calc(100% - 0px);
  /* Full width minus margins */
  padding: 4px;
  opacity: 1;
}

/* Header */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.mobile-logo {
  width: 45px;
}

.close-menu {
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* Nav Pills */
.navbar-nav {
  display: flex;
  flex-direction: row !important;
  gap: 8px;
  padding: 0 0 15px 0;
  margin: 0 0 15px 0;
  flex-wrap: nowrap;
  overflow-x: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  scrollbar-width: none;
  list-style: none;
}

.navbar-nav::-webkit-scrollbar {
  display: none;
}

.navbar-nav .nav-item {
  flex-shrink: 0;
}

.navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  padding: 8px 16px !important;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  text-decoration: none;
  display: block;
  transition: all 0.2s ease;
}

.navbar-nav .nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Dropdown */
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.dropdown-content.show {
  max-height: 50vh;
  overflow-y: auto;
}

.dropdown-menu-mobile {
  padding: 0;
}

.dropdown-item {
  display: flex !important;
  align-items: center !important;
  gap: 12px;
  padding: 12px !important;
  margin-bottom: 10px;
  color: white !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  transition: all 0.2s ease;
}

/* Ensure all text within dropdown items is white */
.dropdown-item strong,
.dropdown-item span,
.dropdown-item p,
.dropdown-item div {
  color: white !important;
}

/* Override checkout page link colors for dropdown items - higher specificity */
body.checkout-page .navbar .desktop-nav .dropdown-item,
body.checkout-page .navbar .desktop-nav .dropdown-item strong,
body.checkout-page .navbar .desktop-nav .dropdown-item span,
body.checkout-page .navbar .desktop-nav .dropdown-item p,
body.checkout-page .navbar .desktop-nav .dropdown-item div,
body.checkout-page .navbar .desktop-nav .dropdown-item a {
  color: white !important;
}

/* Override checkout page link colors for dropdown footer - higher specificity */
body.checkout-page .navbar .desktop-nav .dropdown-footer a,
body.checkout-page .navbar .desktop-nav .dropdown-footer {
  color: white !important;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateX(5px);
}

.dropdown-item img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
}

/* Mobile dropdown menu item overrides */
.dropdown-menu-mobile .dropdown-item {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 0 !important;
  padding: 12px 6px !important;
}

.dropdown-menu-mobile .dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}

.dropdown-menu-mobile .dropdown-item img {
  width: 75px !important;
  height: 85px !important;
  object-fit: contain !important;
  background: transparent !important;
  border-radius: 6px !important;
  flex-shrink: 0 !important;
}

.mobile-products-scroll {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
  padding-bottom: 12px !important;
  margin-bottom: 12px !important;
}

.dropdown-footer,
#shopAccordion .dropdown-footer {
  text-align: center;
  padding: 12px;
  border-top: none !important;
  margin-top: 10px;
}

.dropdown-footer a {
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none;
  font-size: 14px;
}

/* Desktop */
@media (min-width: 992px) {
  .desktop-nav {
    display: flex !important;
  }
}

/* ========== DESKTOP VIEW ========== */
@media (min-width: 992px) {

  .mobile-cart,
  .navbar-toggler {
    display: none !important;
  }

  .navbar {
    padding: 6px 40px !important;
  }

  /* .navbar.scrolled {
    padding: 12px 40px !important;
  } */

  .navbar .container-fluid {
    gap: 20px;
  }

  /* Left Section Container */
  .nav-left-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 24px;
    background: transparent;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .navbar.scrolled .nav-left-wrapper {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .navbar-brand {
    padding-right: 20px;
    font-size: 24px;
  }

  .nav-img {
    width: 65px;
  }

  /* Desktop Navigation */
  .desktop-nav {
    display: flex !important;
    flex-direction: row;
    gap: 2px;
    margin: 0;
    padding: 0;
  }

  .desktop-nav .nav-link {
    color: rgba(255, 255, 255, 0.85) !important;
    padding: 4px 17px !important;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 500;
    background: transparent;
  }

  .desktop-nav .nav-link:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    color: white !important;
  }

  /* Desktop Dropdown - Static within nav */
  .desktop-nav .dropdown {
    position: static !important;
  }

  .desktop-nav .dropdown-menu {
    background: rgba(85, 85, 85, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 20px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
    display: block !important;
    opacity: 0;
    visibility: hidden;
    max-height: 0;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute !important;
    left: 0;
    right: 0;
    top: calc(100% + 12px);
    width: 100%;
    overflow: hidden !important;
  }

  .desktop-nav .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    max-height: 450px;
    padding-bottom: 50px !important;
    /* Make room for the absolute footer */
  }

  /* Scrollable product list inside desktop dropdown */
  .desktop-nav .dropdown-products-scroll {
    max-height: 390px !important;
    /* Limit products list height */
    overflow-y: auto !important;
    scrollbar-width: none;
    /* Hide scrollbar for Firefox */
    -ms-overflow-style: none;
    /* Hide scrollbar for IE/Edge */
    list-style: none;
    padding: 8px !important;
    margin: 0;
  }

  .desktop-nav .dropdown-products-scroll::-webkit-scrollbar {
    display: none;
    /* Hide scrollbar for Webkit */
    width: 0;
    height: 0;
  }

  .desktop-nav .dropdown-products-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Pinned footer inside desktop dropdown */
  .desktop-nav .dropdown-footer {
    position: absolute !important;
    bottom: 0 !important;
    left: 0 !important;
    right: 0 !important;
    height: 50px !important;
    background: rgba(85, 85, 85, 0.98) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    margin: 0 !important;
    padding: 0 !important;
    border-bottom-left-radius: 20px !important;
    border-bottom-right-radius: 20px !important;
    list-style: none;
    z-index: 10 !important;
  }

  .desktop-nav .dropdown-item {
    margin-bottom: 4px;
  }

  .desktop-nav .dropdown-item img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    object-position: center;
  }

  /* Right Section Container */
  .nav-right-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 6px 11px;
    background: transparent;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar.scrolled .nav-right-wrapper {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .login-link {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 8px 12px;
    margin-right: 5px;
    white-space: nowrap;
  }

  .login-link:hover {
    color: white;
  }
}

  /* Large screens only */
  @media (min-width: 992px) {
    .navbar {
      padding-left: 80px !important;
      padding-right: 80px !important;
    }
  }

  /* Extra Large screens */
  @media (min-width: 1400px) {
    .navbar {
      padding-left: 160px !important;
      padding-right: 160px !important;
    }
  }

  /* ========== DESKTOP VIEW ========== */
  @media (min-width: 992px) {

    .mobile-cart,
    .navbar-toggler {
      display: none !important;
    }

    .navbar {
      padding: 6px 40px !important;
    }

    /* .navbar.scrolled {
    padding: 12px 40px !important;
  } */

    .navbar .container-fluid {
      gap: 20px;
    }

    /* Left Section Container */
    .nav-left-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 24px;
      background: transparent;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .navbar.scrolled .nav-left-wrapper {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .navbar-brand {
      padding-right: 20px;
      font-size: 24px;
    }

    .nav-img {
      width: 65px;
    }

    /* Desktop Navigation */
    .desktop-nav {
      display: flex !important;
      flex-direction: row;
      gap: 2px;
      margin: 0;
      padding: 0;
    }

    .desktop-nav .nav-link {
      color: rgba(255, 255, 255, 0.85) !important;
      padding: 4px 17px !important;
      border-radius: 40px;
      font-size: 16px;
      font-weight: 500;
      background: transparent;
    }

    .desktop-nav .nav-link:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: white !important;
    }

    /* Desktop Dropdown - Static within nav */
    .desktop-nav .dropdown {
      position: static !important;
    }

    .desktop-nav .dropdown-menu {
      background: rgba(85, 85, 85, 0.95) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 20px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
      display: block !important;
      opacity: 0;
      visibility: hidden;
      max-height: 0;
      padding: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: absolute !important;
      left: 0;
      right: 0;
      top: calc(100% + 12px);
      width: 100%;
      overflow: hidden !important;
    }

    .desktop-nav .dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      max-height: 450px;
      padding-bottom: 50px !important;
      /* Make room for the absolute footer */
    }

    /* Scrollable product list inside desktop dropdown */
    .desktop-nav .dropdown-products-scroll {
      max-height: 390px !important;
      /* Limit products list height */
      overflow-y: auto !important;
      scrollbar-width: none;
      /* Hide scrollbar for Firefox */
      -ms-overflow-style: none;
      /* Hide scrollbar for IE/Edge */
      list-style: none;
      padding: 8px !important;
      margin: 0;
    }

    .desktop-nav .dropdown-products-scroll::-webkit-scrollbar {
      display: none;
      /* Hide scrollbar for Webkit */
      width: 0;
      height: 0;
    }

    .desktop-nav .dropdown-products-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    /* Pinned footer inside desktop dropdown */
    .desktop-nav .dropdown-footer {
      position: absolute !important;
      bottom: 0 !important;
      left: 0 !important;
      right: 0 !important;
      height: 50px !important;
      background: rgba(85, 85, 85, 0.98) !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      margin: 0 !important;
      padding: 0 !important;
      border-bottom-left-radius: 20px !important;
      border-bottom-right-radius: 20px !important;
      list-style: none;
      z-index: 10 !important;
    }

    .desktop-nav .dropdown-item {
      margin-bottom: 4px;
    }

    .desktop-nav .dropdown-item img {
      width: 70px;
      height: 70px;
      object-fit: contain;
      object-position: center;
    }

    /* Right Section Container */
    .nav-right-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 6px 11px;
      background: transparent;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navbar.scrolled .nav-right-wrapper {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .login-link {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      padding: 8px 12px;
      margin-right: 5px;
      white-space: nowrap;
    }

    .login-link:hover {
      color: white;
    }

    /* Large screens only */
    @media (min-width: 992px) {
      .navbar {
        padding-left: 80px !important;
        padding-right: 80px !important;
      }
    }

    /* Extra Large screens */
    @media (min-width: 1400px) {
      .navbar {
        padding-left: 160px !important;
        padding-right: 160px !important;
      }
    }

    /* ========== PRODUCT DETAILS PAGE OVERRIDES ========== */

    /* Desktop Nav Links - Green on product details page */
    .product-details-page .desktop-nav .nav-link {
      color: var(--vcn-footer) !important;
      /* Green color */
    }

    .product-details-page .desktop-nav .nav-link:hover {
      background: rgba(90, 90, 90, 0.15) !important;
      /* Green tinted background */
      backdrop-filter: blur(10px);
      color: var(--vcn-footer) !important;
    }

    /* Mobile Nav Links - Green on product details page */
    .product-details-page .navbar-nav .nav-link {
      color: var(--vcn-footer) !important;
      border-color: var(--vcn-footer) !important;
    }

    .product-details-page .navbar-nav .nav-link.active {
      background: rgba(40, 167, 69, 0.25) !important;
      border-color: var(--vcn-footer) !important;
    }

    /* When scrolled - Links become WHITE */
    .product-details-page .navbar.scrolled .desktop-nav .nav-link {
      color: #fff !important;
    }

    .product-details-page .navbar.scrolled .desktop-nav .nav-link:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: #fff !important;
    }

    /* Nav Actions - Login Link GREEN */
    .product-details-page .login-link {
      color: var(--vcn-footer) !important;
    }

    .product-details-page .login-link:hover {
      color: var(--vcn-footer) !important;
    }

    /* Button GREEN background */
    .product-details-page .navbar-btn {
      background: var(--vcn-footer) !important;
      color: white !important;
    }

    /* When scrolled - Button becomes WHITE with green text */
    .product-details-page .navbar.scrolled .login-link {
      color: #fff !important;
    }

    .product-details-page .navbar.scrolled .navbar-btn {
      background: #fff !important;
      color: var(--vcn-footer) !important;
    }

    .product-details-page .navbar.scrolled .navbar-btn:hover {
      background: var(--vcn-white) !important;
    }

    .navbar-btn {
      background: white !important;
      color: var(--vcn-primary) !important;
      padding: 10px 24px;
      border-radius: 40px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      white-space: nowrap;
      margin-left: 8px;
    }

    .navbar-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
    }

    /* Hide mobile menu on desktop */
    .navbar-collapse {
      position: static;
      transform: none;
      background: transparent;
      padding: 0;
      height: auto;
      width: auto;
      overflow: visible;
    }

    .mobile-menu-header,
    .navbar-nav {
      display: none !important;
    }
  }

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .navbar {
    padding: 12px 20px !important;
  }

  .nav-left-wrapper {
    flex-wrap: wrap;
  }

  .navbar-collapse {
    padding: 20px;
    border-radius: 20px;
    margin-top: 25px;
  }

  .nav-actions .login-link {
    display: none;
  }

}


.nav-tog {
  border: 4px solid var(--vcn-mobile);
  padding: 8px;
}

/* ==========================================================================
   NAVBAR RESPONSIVE
   ========================================================================== */
@media (max-width: 992px) {
  .navbar {
    padding: 10px 20px !important;
  }

  .navbar-collapse {
    margin-top: 15px !important;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 8px 15px !important;
  }

  .nav-img {
    width: 60px !important;
  }
}



  /* Registration form overlay fix */
  :deep(.registration-container) {
    z-index: 10000 !important;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 9998;
  }

  /* Slide Form Container */
  .slide-form-container {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    max-width: 450px;
    height: 100vh;
    max-height: 100vh;
    background-color: white;
    box-shadow: -2px 0 10px rgba(0, 0, 0, 0.2);
    z-index: 9999;
    overflow-y: auto;
    overflow-x: hidden;
  }

  /* Close Button */
  .close-btn {
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 30px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--vcn-primary);
    z-index: 10000;
  }

  .close-btn:hover {
    color: var(--vcn-primary);
  }

  /* Form Content */
  .form-content {
    padding: 80px 30px 30px;
  }

  .form-content h2 {
    margin-bottom: 30px;
    color: var(--vcn-primary);
    font-size: 28px;
  }

  .form-group {
    margin-bottom: 20px;
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    color: var(--vcn-primary);
    font-size: 14px;
  }

  .form-input {
    width: 100%;
    padding: 12px 15px;
    border: 1px solid var(--vcn-primary);
    border-radius: 8px;
    font-size: 14px;
    transition: border-color 0.3s;
  }

  .form-input:focus {
    outline: none;
    border-color: var(--vcn-primary);
  }

  .password-wrapper {
    position: relative;
  }

  .toggle-password {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }

  .forgot-password {
    display: block;
    text-align: right;
    margin-bottom: 20px;
    color: var(--vcn-primary);
    text-decoration: none;
    font-size: 14px;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .signin-btn {
    width: 100%;
    padding: 14px;
    background-color: var(--vcn-primary);
    color: white;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;
    margin-bottom: 25px;
  }

  .signin-btn:hover {
    background-color: var(--vcn-primary);
  }

  .social-login {
    text-align: center;
    margin-bottom: 25px;
  }

  .social-login p {
    margin-bottom: 10px;
    color: var(--vcn-primary);
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  .social-btn {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid var(--vcn-primary);
    background: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s;
  }

  .social-btn:hover {
    transform: scale(1.1);
  }

  .register-section {
    margin-bottom: 25px;
  }

  .register-section h3 {
    margin-bottom: 15px;
    color: var(--vcn-primary);
    font-size: 20px;
  }

  .info-icon {
    font-size: 14px;
    color: var(--vcn-primary);
  }

  .register-btn {
    width: 100%;
    padding: 12px;
    margin-bottom: 10px;
    border: 2px solid var(--vcn-primary);
    background: white;
    border-radius: 25px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: all 0.3s;
    color: var(--vcn-primary);
  }

  .register-btn:hover {
    background-color: #f5f5f5;
  }

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }

  .footer-links a {
    color: #666;
    text-decoration: none;
    font-size: 12px;
  }

  .footer-links a:hover {
    text-decoration: underline;
  }

  /* Cart Count Badge */
  .cart-count-badge {
    background: var(--vcn-badge);
    color: var(--vcn-primary);
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: bold;
    margin-left: 5px;
    min-width: 18px;
    text-align: center;
    display: inline-block;
  }

  .mobile-cart {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .navbar-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Transitions */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: transform 0.4s ease-in-out;
  }

  .slide-right-enter-from,
  .slide-right-leave-to {
    transform: translateX(100%);
  }

  /* Responsive Styles for all devices */

  /* Small laptops and landscape tablets (992px to 1200px) */
  @media (max-width: 1200px) {
    .navbar {
      padding: 6px 20px !important;
    }

    .desktop-nav .nav-link {
      padding: 4px 12px !important;
      font-size: 15px;
    }

    .nav-left-wrapper {
      gap: 8px;
      padding: 4px 16px;
    }

    .nav-right-wrapper {
      gap: 10px;
      padding: 4px 8px;
    }
  }

  /* Mobile & Tablets (max-width: 991px) */
  @media (max-width: 991px) {
    .navbar {
      padding: 15px 30px !important;
    }

    .navbar-collapse {
      max-height: calc(100vh - var(--top-header-height, 28px) - 80px) !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch;
    }
  }

  /* Portrait Tablets / Large Phones (max-width: 768px) */
  @media (max-width: 768px) {
    .navbar {
      padding: 12px 20px !important;
    }
  }

  /* Phones (max-width: 576px) */
  @media (max-width: 576px) {
    .navbar {
      padding: 10px 15px !important;
    }

    .slide-form-container {
      max-width: 100%;
    }

    .form-content {
      padding: 60px 20px 20px;
    }
  }

  /* Small Phones (max-width: 380px) */
  @media (max-width: 380px) {
    .navbar {
      padding: 8px 10px !important;
    }

    .mobile-cart {
      font-size: 13px;
      gap: 3px;
    }
  }

</style>
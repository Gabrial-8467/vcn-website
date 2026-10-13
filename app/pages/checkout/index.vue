<template>
  <div class="checkout-container">
    <div class="checkout-inner">
      <div class="row g-4">
      <!-- Left Side - Checkout Wizard -->
      <div class="col-lg-7">
        <!-- Signed in as -->
        <div v-if="isLoggedIn" class="checkout-signed-in">
          <span class="checkout-signed-in-icon">✓</span>
          <span>Signed in as <strong>{{ userName || userEmail || 'you' }}</strong></span>
        </div>

        <!-- Wizard Progress -->
        <div class="checkout-stepper">
          <div
            v-for="(s, idx) in steps"
            :key="s.key"
            class="checkout-step-item"
            :class="{ active: currentStepIndex === idx, done: currentStepIndex > idx }"
          >
            <div class="checkout-step-dot">
              <svg v-if="currentStepIndex > idx" xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span v-else>{{ idx + 1 }}</span>
            </div>
            <span class="checkout-step-label">{{ s.label }}</span>
            <span v-if="idx < steps.length - 1" class="checkout-step-line"></span>
          </div>
        </div>

        <!-- STEP 1: Shipping -->
        <div class="checkout-panel" v-show="currentStep === 'shipping'">
          <div class="checkout-panel-header">
            <h2 class="step-title-text">{{ checkout.shippingStep.title }}</h2>
            <p class="checkout-panel-sub">Where should we deliver your order?</p>
          </div>

          <div class="row g-3">
            <div class="col-md-6">
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.firstName }"
                v-model="form.firstName" :placeholder="checkout.shippingStep.firstNamePlaceholder" />
              <span v-if="errors.firstName" class="checkout-error">{{ errors.firstName }}</span>
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.lastName }"
                v-model="form.lastName" :placeholder="checkout.shippingStep.lastNamePlaceholder" />
              <span v-if="errors.lastName" class="checkout-error">{{ errors.lastName }}</span>
            </div>
            <div class="col-12">
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.address }"
                v-model="form.address" :placeholder="checkout.shippingStep.addressPlaceholder" />
              <span v-if="errors.address" class="checkout-error">{{ errors.address }}</span>
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.city }"
                v-model="form.city" :placeholder="checkout.shippingStep.cityPlaceholder" />
              <span v-if="errors.city" class="checkout-error">{{ errors.city }}</span>
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.state }"
                v-model="form.state" :placeholder="checkout.shippingStep.statePlaceholder" />
              <span v-if="errors.state" class="checkout-error">{{ errors.state }}</span>
            </div>
            <div class="col-md-3">
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.zip }" maxlength="6"
                v-model="form.zip" @input="form.zip = form.zip.replace(/\D/g, '').slice(0, 6)"
                :placeholder="checkout.shippingStep.zipPlaceholder" />
              <span v-if="errors.zip" class="checkout-error">{{ errors.zip }}</span>
            </div>
          </div>

          <div class="info-box">
            <div class="info-box-left">
              <div class="info-box-title">
                <svg width="30px" height="30px" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M17 33C25.8366 33 33 25.8366 33 17C33 8.16344 25.8366 1 17 1C8.16345 1 1 8.16344 1 17C1 25.8366 8.16345 33 17 33Z"
                    stroke="#1C3A13"></path>
                  <path
                    d="M10.5275 2.39896V5.85604C10.5275 8.9446 11.3742 11.4541 15.8535 10.6337C19.3018 10.0019 25.9001 7.36523 25.9001 12.1209C25.9001 20.1055 3.63965 9.88346 3.63965 17.7891C3.63965 27.3224 30.4672 12.3622 30.4672 21.3866C30.4672 29.924 13.6994 16.8152 13.6994 29.2528V32.7274"
                    stroke="#1C3A13"></path>
                </svg>
                {{ checkout.learnSection.title }}
              </div>
              <p class="info-box-description">
                {{ checkout.learnSection.description }}
              </p>
            </div>
            <div class="info-box-right">
              <input type="checkbox" id="newsletterCheckbox" v-model="newsletterOptIn" />
              <div class="info-box-right-text">
                {{ checkout.learnSection.checkboxText }}
              </div>
            </div>
          </div>

          <button type="button" class="primary-action-btn w-100 mt-3" @click="continueToPayment">
            {{ checkout.shippingStep.continueButton }}
          </button>
        </div>

        <!-- STEP 2: Payment -->
        <div class="checkout-panel" v-show="currentStep === 'payment'">
          <div class="checkout-panel-header">
            <h2 class="step-title-text">{{ checkout.paymentStep.title }}</h2>
            <p class="checkout-panel-sub">Your payment details are encrypted and secure.</p>
          </div>

          <div class="row g-3">
            <div class="col-12">
              <label class="checkout-field-label">Card Number</label>
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.cardNumber }"
                :value="form.cardNumber" @input="formatCardNumber"
                :placeholder="checkout.paymentStep.cardNumberPlaceholder" inputmode="numeric" />
              <span v-if="errors.cardNumber" class="checkout-error">{{ errors.cardNumber }}</span>
            </div>
            <div class="col-6">
              <label class="checkout-field-label">Expiry</label>
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.expiry }"
                :value="form.expiry" @input="formatExpiry" :placeholder="checkout.paymentStep.expiryPlaceholder" inputmode="numeric" />
              <span v-if="errors.expiry" class="checkout-error">{{ errors.expiry }}</span>
            </div>
            <div class="col-6">
              <label class="checkout-field-label">CVV</label>
              <input type="password" class="form-control form-input-field" :class="{ 'is-invalid': errors.cvv }"
                v-model="form.cvv" @input="form.cvv = form.cvv.replace(/\D/g, '').slice(0, 4)"
                :placeholder="checkout.paymentStep.cvvPlaceholder" inputmode="numeric" />
              <span v-if="errors.cvv" class="checkout-error">{{ errors.cvv }}</span>
            </div>
            <div class="col-12">
              <label class="checkout-field-label">Name on Card</label>
              <input type="text" class="form-control form-input-field" :class="{ 'is-invalid': errors.cardName }"
                v-model="form.cardName" :placeholder="checkout.paymentStep.cardNamePlaceholder" />
              <span v-if="errors.cardName" class="checkout-error">{{ errors.cardName }}</span>
            </div>
          </div>

          <div class="checkout-panel-actions">
            <button type="button" class="back-action-btn" @click="goToStep('shipping')">Back</button>
            <button type="button" class="primary-action-btn" @click="continueToReview">
              Continue to Review
            </button>
          </div>
        </div>

        <!-- STEP 3: Review & Place Order -->
        <div class="checkout-panel" v-show="currentStep === 'review'">
          <div class="checkout-panel-header">
            <h2 class="step-title-text">Review &amp; Place Order</h2>
            <p class="checkout-panel-sub">Confirm your details before placing the order.</p>
          </div>

          <div class="review-block">
            <div class="review-block-head">
              <h4>Shipping Address</h4>
              <button type="button" class="review-edit" @click="goToStep('shipping')">Edit</button>
            </div>
            <p class="review-line">{{ form.firstName }} {{ form.lastName }}</p>
            <p class="review-line">{{ form.address }}</p>
            <p class="review-line">{{ form.city }}, {{ form.state }} - {{ form.zip }}</p>
          </div>

          <div class="review-block">
            <div class="review-block-head">
              <h4>Payment Method</h4>
              <button type="button" class="review-edit" @click="goToStep('payment')">Edit</button>
            </div>
            <p class="review-line">Card ending in {{ cardLast4 || '••••' }}</p>
            <p class="review-line">Expires {{ form.expiry || '••/••' }}</p>
          </div>

          <div class="checkout-panel-actions">
            <button type="button" class="back-action-btn" @click="goToStep('payment')">Back</button>
            <button type="button" class="primary-action-btn final-order-btn" :disabled="isPlacingOrder" @click="placeOrder">
              {{ isPlacingOrder ? 'Placing Order...' : checkout.paymentStep.placeOrderButton }}
              <span>₹{{ cartStore?.cartTotal?.toFixed(2) || '0.00' }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Right Side - Cart Summary -->
      <div class="col-lg-5">
        <!-- Mobile summary toggle -->
        <button type="button" class="summary-toggle" @click="summaryOpen = !summaryOpen">
          <span class="summary-toggle-label">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="8" cy="21" r="1"></circle>
              <circle cx="19" cy="21" r="1"></circle>
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
            </svg>
            {{ summaryOpen ? 'Hide' : 'Show' }} order summary
          </span>
          <span class="summary-toggle-total">₹{{ cartStore?.cartTotal?.toFixed(2) || '0.00' }}</span>
        </button>

        <div class="card cart-summary-card" :class="{ 'is-open': summaryOpen }">
          <div class="card-body p-4">
            <h3 class="cart-summary-title">{{ checkout.cartSummary.title }}</h3>

            <!-- Dynamic Cart Items from Store -->
            <div v-for="item in (cartStore?.items || [])" :key="item.id" class="d-flex mb-4 product-wrapper">
              <div class="product-image-container me-3">
                <img :src="item.image || '/img/products/img1.png'" class="w-100" :alt="item.name"
                  @error="$event.target.src = '/img/products/img1.png'">
              </div>
              <div class="grow">
                <h6 class="product-name-text">{{ item.name }}</h6>
                <small class="product-delivery-info">{{ item.subscription || 'One-time purchase' }}</small>
                <div class="d-flex align-items-center mt-2">
                  <div class="cart-quantity-control">
                    <button class="cart-qty-button" @click="cartStore.decrementQuantity(item.id)">−</button>
                    <div class="cart-qty-display">{{ item.quantity }}</div>
                    <button class="cart-qty-button" @click="cartStore.incrementQuantity(item.id)">+</button>
                  </div>
                </div>
              </div>
              <div class="text-end">
                <div class="price-display-text">
                  ₹{{ (item.price * item.quantity).toFixed(2) }}
                </div>
              </div>
            </div>

            <!-- Empty Cart Message -->
            <div v-if="!cartStore?.items || cartStore.items.length === 0" class="text-center py-4">
              <p>{{ checkout.cartSummary.emptyCartMessage }}</p>
              <NuxtLink to="/all-products" class="btn-learn">{{ checkout.cartSummary.continueShopping }}</NuxtLink>
            </div>

            <!-- Promo Code Section -->
            <div class="mb-4">

              <div class="cart-promo-section">
                <div class="cart-promo-label">{{checkout.cartSummary.promo.title}}
                  <br>{{checkout.cartSummary.promo.description}}
                </div>
                <div class="cart-promo-input-group">
                  <input type="text" class="cart-promo-input" :placeholder="checkout.cartSummary.promo.placeholder">
                  <button class="cart-promo-apply-btn">{{checkout.cartSummary.promo.applyButton}}</button>
                </div>
              </div>
            </div>

            <hr class="summary-divider" />

            <!-- Order Summary -->
            <div class="summary-row">
              <span class="summary-label">{{checkout.cartSummary.subtotal}}</span>
              <span class="summary-value" id="orderSubtotal">₹{{ cartStore?.cartSubtotal?.toFixed(2) || '0.00' }}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">{{checkout.cartSummary.shipping}}</span>
              <span class="summary-free-text">{{checkout.cartSummary.free}}</span>
            </div>
            <div class="summary-row">
              <span class="summary-label">{{checkout.cartSummary.taxes}}</span>
              <span class="summary-value" id="orderTaxes">₹0.00</span>
            </div>

            <hr class="summary-divider" />

            <div class="total-row">
              <span>{{checkout.cartSummary.total}}</span>
              <span id="orderTotal">₹{{ cartStore?.cartTotal?.toFixed(2) || '0.00' }}</span>
            </div>

            <p class="summary-footer-note">
              {{checkout.cartSummary.recurringNote}} ₹{{ cartStore?.cartSubtotal?.toFixed(2) || '0.00' }} per month.
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '~/stores/cart'
import { useAuthCart } from '~/composables/useAuthCart'
import { onMounted } from 'vue'
import { navigateTo } from '#app'
import { useHead } from '#app'
import { computed, ref, reactive } from 'vue'
import { useCmsStore } from '~/stores/cms'

const cmsStore = useCmsStore()

// Fetch page sections from API during SSR/routing
await useAsyncData('checkout-cms', () => cmsStore.fetchSectionsBySlug('checkout'))

const checkout = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find checkout section by name or sectionKey
  const section = sections.find(s => s.name === 'checkout' || s.sectionKey === 'checkout')
  
  const fallback = cmsStore.getPageSection('checkout', 'checkout') || {
    accountStep: { step: "1 of 3", title: "Create Your Account", i: "G", googleButton: "Continue with Google", divider: "or", emailButton: "Sign Up with Email", emailPlaceholder: "Email", passwordPlaceholder: "Password", continueButton: "Continue", haveAccountText: "Have an account?", signInButton: "Sign In", completedMessage: "Account created successfully" },
    learnSection: { title: "LEARN AS YOU VCN", description: "Your body is home to 38 trillion bacteria. 95% of these (36 Trillion) live in your gut.", checkboxText: "Guide me along the way with tips, information, and nerdy reads. Unsubscribe anytime." },
    shippingStep: { step: "2 of 3", title: "Shipping Information", firstNamePlaceholder: "First Name", lastNamePlaceholder: "Last Name", addressPlaceholder: "Address", cityPlaceholder: "City", statePlaceholder: "State", zipPlaceholder: "ZIP", continueButton: "Continue to Payment", completedMessage: "Shipping information saved" },
    paymentStep: { step: "3 of 3", title: "Payment", cardNumberPlaceholder: "Card Number", expiryPlaceholder: "MM/YY", cvvPlaceholder: "CVV", cardNamePlaceholder: "Name on Card", placeOrderButton: "Place Order -", completedMessage: "Payment information saved" },
    cartSummary: { title: "Cart Summary", emptyCartMessage: "Your cart is empty", continueShopping: "Continue Shopping", promo: { title: "Promo Code", description: "We found you a better deal! Applied holiday30 (30% off) for higher savings.", placeholder: "Enter Promo Code", applyButton: "Apply" }, subtotal: "Subtotal", shipping: "Shipping", taxes: "Taxes", free: "Free", total: "Total", recurringNote: "Final tax and shipping is calculated after shipping step is complete. Recurring subtotal is" },
    validation: { emailRequired: "Email is required", invalidEmail: "Please enter a valid email address", passwordRequired: "Password is required", passwordMinLength: "Password must be at least 8 characters", passwordFormat: "Password must contain at least one uppercase letter, one lowercase letter, and one number", firstNameRequired: "First name is required", firstNameMinLength: "First name must be at least 2 characters", lastNameRequired: "Last name is required", lastNameMinLength: "Last name must be at least 2 characters", addressRequired: "Address is required", addressInvalid: "Please enter a complete address", cityRequired: "City is required", stateRequired: "State is required", stateInvalid: "Please enter a valid state", zipRequired: "ZIP code is required", zipInvalid: "Please enter a valid 6-digit ZIP code", cardNumberRequired: "Card number is required", cardNumberInvalid: "Please enter a valid card number", expiryRequired: "Expiry date is required", expiryInvalid: "Please enter a valid expiry date (MM/YY)", cvvRequired: "CVV is required", cvvInvalid: "Please enter a valid CVV (3 or 4 digits)", cardNameRequired: "Name on card is required", cardNameInvalid: "Please enter the complete name as shown on card" },
    alerts: { googleSignin: "Google sign-in would open here", orderSuccess: "Order placed successfully!" }
  }

  if (!section) {
    return fallback
  }

  const items = section.items || []
  const accountItem = items.find(item => item.name === 'account-step')
  const learnItem = items.find(item => item.name === 'learn-section')
  const shippingItem = items.find(item => item.name === 'shipping-step')
  const paymentItem = items.find(item => item.name === 'payment-step')
  const cartSummaryItem = items.find(item => item.name === 'cart-summary')
  const validationItem = items.find(item => item.name === 'validation')
  const alertsItem = items.find(item => item.name === 'alerts')

  return {
    accountStep: {
      step: accountItem?.extraData?.step || fallback.accountStep.step,
      title: accountItem?.title || fallback.accountStep.title,
      i: accountItem?.extraData?.icon || fallback.accountStep.i,
      googleButton: accountItem?.extraData?.googleButtonText || fallback.accountStep.googleButton,
      divider: accountItem?.extraData?.dividerText || fallback.accountStep.divider,
      emailButton: accountItem?.extraData?.emailButtonText || fallback.accountStep.emailButton,
      emailPlaceholder: accountItem?.extraData?.emailPlaceholder || fallback.accountStep.emailPlaceholder,
      passwordPlaceholder: accountItem?.extraData?.passwordPlaceholder || fallback.accountStep.passwordPlaceholder,
      continueButton: accountItem?.extraData?.continueButtonText || fallback.accountStep.continueButton,
      haveAccountText: accountItem?.extraData?.haveAccountText || fallback.accountStep.haveAccountText,
      signInButton: accountItem?.extraData?.signInButtonText || fallback.accountStep.signInButton,
      completedMessage: accountItem?.extraData?.completedMessage || fallback.accountStep.completedMessage
    },
    learnSection: {
      title: learnItem?.title || fallback.learnSection.title,
      description: learnItem?.description || fallback.learnSection.description,
      checkboxText: learnItem?.extraData?.checkboxText || fallback.learnSection.checkboxText
    },
    shippingStep: {
      step: shippingItem?.extraData?.step || fallback.shippingStep.step,
      title: shippingItem?.title || fallback.shippingStep.title,
      firstNamePlaceholder: shippingItem?.extraData?.firstNamePlaceholder || fallback.shippingStep.firstNamePlaceholder,
      lastNamePlaceholder: shippingItem?.extraData?.lastNamePlaceholder || fallback.shippingStep.lastNamePlaceholder,
      addressPlaceholder: shippingItem?.extraData?.addressPlaceholder || fallback.shippingStep.addressPlaceholder,
      cityPlaceholder: shippingItem?.extraData?.cityPlaceholder || fallback.shippingStep.cityPlaceholder,
      statePlaceholder: shippingItem?.extraData?.statePlaceholder || fallback.shippingStep.statePlaceholder,
      zipPlaceholder: shippingItem?.extraData?.zipPlaceholder || fallback.shippingStep.zipPlaceholder,
      continueButton: shippingItem?.extraData?.continueButtonText || fallback.shippingStep.continueButton,
      completedMessage: shippingItem?.extraData?.completedMessage || fallback.shippingStep.completedMessage
    },
    paymentStep: {
      step: paymentItem?.extraData?.step || fallback.paymentStep.step,
      title: paymentItem?.title || fallback.paymentStep.title,
      cardNumberPlaceholder: paymentItem?.extraData?.cardNumberPlaceholder || fallback.paymentStep.cardNumberPlaceholder,
      expiryPlaceholder: paymentItem?.extraData?.expiryPlaceholder || fallback.paymentStep.expiryPlaceholder,
      cvvPlaceholder: paymentItem?.extraData?.cvvPlaceholder || fallback.paymentStep.cvvPlaceholder,
      cardNamePlaceholder: paymentItem?.extraData?.cardNamePlaceholder || fallback.paymentStep.cardNamePlaceholder,
      placeOrderButton: paymentItem?.extraData?.placeOrderButtonText || fallback.paymentStep.placeOrderButton,
      completedMessage: paymentItem?.extraData?.completedMessage || fallback.paymentStep.completedMessage
    },
    cartSummary: {
      title: cartSummaryItem?.title || fallback.cartSummary.title,
      emptyCartMessage: cartSummaryItem?.extraData?.emptyCartMessage || fallback.cartSummary.emptyCartMessage,
      continueShopping: cartSummaryItem?.extraData?.continueShoppingText || fallback.cartSummary.continueShopping,
      promo: {
        title: cartSummaryItem?.extraData?.promo?.title || fallback.cartSummary.promo.title,
        description: cartSummaryItem?.extraData?.promo?.description || fallback.cartSummary.promo.description,
        placeholder: cartSummaryItem?.extraData?.promo?.placeholder || fallback.cartSummary.promo.placeholder,
        applyButton: cartSummaryItem?.extraData?.promo?.applyButtonText || fallback.cartSummary.promo.applyButton
      },
      subtotal: cartSummaryItem?.extraData?.subtotalLabel || fallback.cartSummary.subtotal,
      shipping: cartSummaryItem?.extraData?.shippingLabel || fallback.cartSummary.shipping,
      taxes: cartSummaryItem?.extraData?.taxesLabel || fallback.cartSummary.taxes,
      free: cartSummaryItem?.extraData?.freeLabel || fallback.cartSummary.free,
      total: cartSummaryItem?.extraData?.totalLabel || fallback.cartSummary.total,
      recurringNote: cartSummaryItem?.extraData?.recurringNote || fallback.cartSummary.recurringNote
    },
    validation: {
      emailRequired: validationItem?.extraData?.emailRequired || fallback.validation.emailRequired,
      invalidEmail: validationItem?.extraData?.invalidEmail || fallback.validation.invalidEmail,
      passwordRequired: validationItem?.extraData?.passwordRequired || fallback.validation.passwordRequired,
      passwordMinLength: validationItem?.extraData?.passwordMinLength || fallback.validation.passwordMinLength,
      passwordFormat: validationItem?.extraData?.passwordFormat || fallback.validation.passwordFormat,
      firstNameRequired: validationItem?.extraData?.firstNameRequired || fallback.validation.firstNameRequired,
      firstNameMinLength: validationItem?.extraData?.firstNameMinLength || fallback.validation.firstNameMinLength,
      lastNameRequired: validationItem?.extraData?.lastNameRequired || fallback.validation.lastNameRequired,
      lastNameMinLength: validationItem?.extraData?.lastNameMinLength || fallback.validation.lastNameMinLength,
      addressRequired: validationItem?.extraData?.addressRequired || fallback.validation.addressRequired,
      addressInvalid: validationItem?.extraData?.addressInvalid || fallback.validation.addressInvalid,
      cityRequired: validationItem?.extraData?.cityRequired || fallback.validation.cityRequired,
      stateRequired: validationItem?.extraData?.stateRequired || fallback.validation.stateRequired,
      stateInvalid: validationItem?.extraData?.stateInvalid || fallback.validation.stateInvalid,
      zipRequired: validationItem?.extraData?.zipRequired || fallback.validation.zipRequired,
      zipInvalid: validationItem?.extraData?.zipInvalid || fallback.validation.zipInvalid,
      cardNumberRequired: validationItem?.extraData?.cardNumberRequired || fallback.validation.cardNumberRequired,
      cardNumberInvalid: validationItem?.extraData?.cardNumberInvalid || fallback.validation.cardNumberInvalid,
      expiryRequired: validationItem?.extraData?.expiryRequired || fallback.validation.expiryRequired,
      expiryInvalid: validationItem?.extraData?.expiryInvalid || fallback.validation.expiryInvalid,
      cvvRequired: validationItem?.extraData?.cvvRequired || fallback.validation.cvvRequired,
      cvvInvalid: validationItem?.extraData?.cvvInvalid || fallback.validation.cvvInvalid,
      cardNameRequired: validationItem?.extraData?.cardNameRequired || fallback.validation.cardNameRequired,
      cardNameInvalid: validationItem?.extraData?.cardNameInvalid || fallback.validation.cardNameInvalid
    },
    alerts: {
      googleSignin: alertsItem?.extraData?.googleSignin || fallback.alerts.googleSignin,
      orderSuccess: alertsItem?.extraData?.orderSuccess || fallback.alerts.orderSuccess
    }
  }
})

const cartStore = useCartStore()
const { authState, checkAuthStatus, initializeCart } = useAuthCart()

const isLoggedIn = computed(() => authState.value.isLoggedIn)
const userName = computed(() => authState.value.user?.userName || '')
const userEmail = computed(() => authState.value.user?.email || '')

// ===== Wizard steps =====
const steps = [
  { key: 'shipping', label: 'Shipping' },
  { key: 'payment', label: 'Payment' },
  { key: 'review', label: 'Review' }
]
const currentStep = ref('shipping')
const currentStepIndex = computed(() => steps.findIndex(s => s.key === currentStep.value))
const summaryOpen = ref(false)
const newsletterOptIn = ref(true)
const isPlacingOrder = ref(false)

// ===== Form state =====
const form = reactive({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: ''
})

const errors = reactive({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
  cardName: ''
})

const cardLast4 = computed(() => form.cardNumber.replace(/\s/g, '').slice(-4))

// ===== Validation helpers =====
const validateCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/\s/g, '')
  return /^\d{13,19}$/.test(cleaned) && luhnCheck(cleaned)
}

const luhnCheck = (cardNumber) => {
  let sum = 0
  let isEven = false

  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber[i])

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

const validateExpiry = (expiry) => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
  if (!expiryRegex.test(expiry)) return false

  const [month, year] = expiry.split('/')
  const currentYear = new Date().getFullYear() % 100
  const currentMonth = new Date().getMonth() + 1

  const expYear = parseInt(year)
  const expMonth = parseInt(month)

  if (expYear < currentYear) return false
  if (expYear === currentYear && expMonth < currentMonth) return false

  return true
}

const validateCVV = (cvv) => /^\d{3,4}$/.test(cvv)
const validateZip = (zip) => /^\d{6}$/.test(zip)

// ===== Input formatting =====
const formatCardNumber = (e) => {
  const value = e.target.value.replace(/\D/g, '').slice(0, 19)
  form.cardNumber = value.match(/.{1,4}/g)?.join(' ') || value
}

const formatExpiry = (e) => {
  let value = e.target.value.replace(/\D/g, '').slice(0, 4)
  if (value.length >= 3) {
    value = value.slice(0, 2) + '/' + value.slice(2)
  }
  form.expiry = value
}

// ===== Step navigation =====
const goToStep = (key) => {
  currentStep.value = key
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const clearErrors = () => {
  Object.keys(errors).forEach(key => { errors[key] = '' })
}

const validateShipping = () => {
  clearErrors()
  const v = checkout.value.validation
  let isValid = true

  if (!form.firstName.trim()) {
    errors.firstName = v.firstNameRequired
    isValid = false
  } else if (form.firstName.trim().length < 2) {
    errors.firstName = v.firstNameMinLength
    isValid = false
  }

  if (!form.lastName.trim()) {
    errors.lastName = v.lastNameRequired
    isValid = false
  } else if (form.lastName.trim().length < 2) {
    errors.lastName = v.lastNameMinLength
    isValid = false
  }

  if (!form.address.trim()) {
    errors.address = v.addressRequired
    isValid = false
  } else if (form.address.trim().length < 10) {
    errors.address = v.addressInvalid
    isValid = false
  }

  if (!form.city.trim()) {
    errors.city = v.cityRequired
    isValid = false
  }

  if (!form.state.trim()) {
    errors.state = v.stateRequired
    isValid = false
  } else if (form.state.trim().length < 2) {
    errors.state = v.stateInvalid
    isValid = false
  }

  if (!form.zip.trim()) {
    errors.zip = v.zipRequired
    isValid = false
  } else if (!validateZip(form.zip)) {
    errors.zip = v.zipInvalid
    isValid = false
  }

  return isValid
}

const validatePayment = () => {
  clearErrors()
  const v = checkout.value.validation
  let isValid = true

  if (!form.cardNumber.trim()) {
    errors.cardNumber = v.cardNumberRequired
    isValid = false
  } else if (!validateCardNumber(form.cardNumber)) {
    errors.cardNumber = v.cardNumberInvalid
    isValid = false
  }

  if (!form.expiry.trim()) {
    errors.expiry = v.expiryRequired
    isValid = false
  } else if (!validateExpiry(form.expiry)) {
    errors.expiry = v.expiryInvalid
    isValid = false
  }

  if (!form.cvv.trim()) {
    errors.cvv = v.cvvRequired
    isValid = false
  } else if (!validateCVV(form.cvv)) {
    errors.cvv = v.cvvInvalid
    isValid = false
  }

  if (!form.cardName.trim()) {
    errors.cardName = v.cardNameRequired
    isValid = false
  } else if (form.cardName.trim().length < 3) {
    errors.cardName = v.cardNameInvalid
    isValid = false
  }

  return isValid
}

const continueToPayment = () => {
  if (validateShipping()) goToStep('payment')
}

const continueToReview = () => {
  if (validatePayment()) goToStep('review')
}

const placeOrder = () => {
  if (isPlacingOrder.value) return
  if (!validateShipping()) {
    goToStep('shipping')
    return
  }
  if (!validatePayment()) {
    goToStep('payment')
    return
  }

  isPlacingOrder.value = true

  // Simulate order placement
  alert(checkout.value.alerts.orderSuccess)
  navigateTo('/order-confirmation')
}

onMounted(async () => {
  checkAuthStatus()

  // Require authentication before checkout
  if (!isLoggedIn.value) {
    navigateTo('/login?redirect=/checkout')
    return
  }

  await initializeCart()
  if (import.meta.client && window.localStorage) {
    await cartStore.loadCart()
  }

  // Prefill name from logged-in user
  if (userName.value) {
    const parts = userName.value.trim().split(' ')
    if (!form.firstName) form.firstName = parts[0] || ''
    if (!form.lastName && parts.length > 1) form.lastName = parts.slice(1).join(' ')
  }
})

useHead({
  bodyAttrs: {
    class: 'checkout-page'
  }
})
</script>

<style scoped>
/* ===== Page shell (mirrors the footer's gutters + 1200px container) ===== */
:global(body.checkout-page) {
  background-color: #F7F8F4;
}

.checkout-container {
  width: 100%;
  max-width: none;
  margin: 0;
  padding: 32px 15px 80px;
}

.checkout-inner {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Align the two main columns exactly like the footer: kill bootstrap's
   negative row margins (this build keeps them but has column padding off)
   so the outer edges sit flush with the footer container. */
.checkout-inner > .row {
  margin-left: 0;
  margin-right: 0;
}

/* Restore inter-column gaps for the inner form rows (bootstrap column
   padding is disabled site-wide, so gaps must be re-added here). */
.checkout-panel .row {
  --bs-gutter-x: 1.5rem;
}

.checkout-panel .row > [class*="col-"] {
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  padding-right: calc(var(--bs-gutter-x) * 0.5);
}

/* Footer-matching horizontal gutters (single source of truth) */
@media (min-width: 1400px) {
  .checkout-container {
    padding-left: 160px;
    padding-right: 160px;
  }
}

@media (min-width: 1200px) and (max-width: 1399.98px) {
  .checkout-container {
    padding-left: 40px;
    padding-right: 40px;
  }
}

@media (min-width: 992px) and (max-width: 1199.98px) {
  .checkout-container {
    padding-left: 30px;
    padding-right: 30px;
  }
}

@media (min-width: 768px) and (max-width: 991.98px) {
  .checkout-container {
    padding-left: 20px;
    padding-right: 20px;
  }
}

@media (min-width: 576px) and (max-width: 767.98px) {
  .checkout-container {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (min-width: 480px) and (max-width: 575.98px) {
  .checkout-container {
    padding-left: 15px;
    padding-right: 15px;
  }
}

@media (max-width: 479.98px) {
  .checkout-container {
    padding-left: 10px;
    padding-right: 10px;
  }
}

/* Gap between the wizard and the summary on desktop */
@media (min-width: 992px) {
  .checkout-inner > .row > .col-lg-7 {
    padding-right: 28px;
  }
}

/* ===== Signed in chip ===== */
.checkout-signed-in {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12.5px;
  color: #3f4a40;
  background: #fff;
  border: 1px solid #E6EAE3;
  border-radius: 999px;
  padding: 7px 14px 7px 8px;
  margin-bottom: 22px;
}

.checkout-signed-in strong {
  font-weight: 700;
  color: #0E2917;
}

.checkout-signed-in-icon {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1B5E20;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}

/* ===== Stepper ===== */
.checkout-stepper {
  display: flex;
  align-items: center;
  margin-bottom: 26px;
  padding: 0 2px;
}

.checkout-step-item {
  display: flex;
  align-items: center;
  flex: 1;
  gap: 10px;
}

.checkout-step-item:last-child {
  flex: 0 0 auto;
}

.checkout-step-dot {
  width: 28px;
  height: 28px;
  min-width: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  background: #fff;
  color: #8a938b;
  border: 1px solid #E1E7DE;
  transition: all 0.25s ease;
}

.checkout-step-item.active .checkout-step-dot {
  background: #0E2917;
  color: #fff;
  border-color: #0E2917;
}

.checkout-step-item.done .checkout-step-dot {
  background: #1B5E20;
  color: #fff;
  border-color: #1B5E20;
}

.checkout-step-label {
  font-size: 12.5px;
  font-weight: 600;
  color: #8a938b;
  white-space: nowrap;
  letter-spacing: 0.2px;
}

.checkout-step-item.active .checkout-step-label {
  color: #0E2917;
}

.checkout-step-item.done .checkout-step-label {
  color: #1B5E20;
}

.checkout-step-line {
  flex: 1;
  height: 2px;
  background: #E4E9E1;
  margin: 0 14px;
  border-radius: 2px;
}

.checkout-step-item.done .checkout-step-line {
  background: #1B5E20;
}

/* ===== Panels ===== */
.checkout-panel {
  background: #fff;
  border: 1px solid #E9EDE6;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 1px 2px rgba(14, 41, 23, 0.04), 0 26px 50px -42px rgba(14, 41, 23, 0.4);
  animation: panel-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.checkout-panel-header {
  margin-bottom: 22px;
}

.checkout-panel .step-title-text {
  font-size: 22px;
  font-weight: 700;
  color: #0E2917;
  margin: 0;
  letter-spacing: -0.3px;
}

.checkout-panel-sub {
  font-size: 13px;
  color: #8a938b;
  margin: 6px 0 0;
}

.checkout-field-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  color: #3f4a40;
  margin-bottom: 6px;
}

.checkout-error {
  display: block;
  font-size: 11.5px;
  color: #D9534F;
  margin-top: 5px;
}

/* Cleaner form inputs (override global heavy style) */
.checkout-panel .form-input-field {
  padding: 12px 14px;
  border: 1px solid #DDE6D8;
  border-radius: 10px;
  font-size: 14px;
  color: #172019;
  background: #fff;
  box-shadow: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.checkout-panel .form-input-field::placeholder {
  color: #a4ada1;
}

.checkout-panel .form-input-field:hover {
  border-color: #c6d2bf;
  box-shadow: none;
}

.checkout-panel .form-input-field:focus {
  border-color: #1B5E20;
  box-shadow: 0 0 0 4px rgba(27, 94, 32, 0.12);
  outline: none;
}

.checkout-panel .form-input-field.is-invalid {
  border-color: #D9534F;
  box-shadow: 0 0 0 4px rgba(217, 83, 79, 0.1);
}

/* ===== Buttons ===== */
.checkout-container .primary-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  height: 52px;
  padding: 0 24px;
  background: #0E2917;
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0.2px;
  text-align: center;
  transition: all 0.2s ease;
}

.checkout-container .primary-action-btn:hover {
  background: #1B5E20;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -12px rgba(14, 41, 23, 0.6);
}

.checkout-container .primary-action-btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.checkout-panel-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 26px;
}

.checkout-panel-actions .primary-action-btn {
  flex: 1;
  width: auto;
}

.checkout-panel > .primary-action-btn {
  margin-top: 22px;
}

.back-action-btn {
  background: transparent;
  border: 1px solid #DDE6D8;
  color: #0E2917;
  border-radius: 12px;
  height: 52px;
  padding: 0 24px;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.2s ease;
}

.back-action-btn:hover {
  background: #F1F7F2;
  border-color: #1B5E20;
}

/* ===== Review ===== */
.review-block {
  border: 1px solid #E9EDE6;
  border-radius: 12px;
  padding: 16px 18px;
  margin-bottom: 12px;
  background: #FAFBF8;
}

.review-block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.review-block-head h4 {
  font-size: 11.5px;
  font-weight: 700;
  color: #8a938b;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.review-edit {
  background: none;
  border: none;
  color: #1B5E20;
  font-size: 12.5px;
  font-weight: 700;
  cursor: pointer;
  padding: 0;
}

.review-edit:hover {
  text-decoration: underline;
}

.review-line {
  font-size: 13.5px;
  color: #172019;
  margin: 0 0 3px;
  line-height: 1.45;
}

.review-line:last-child {
  margin-bottom: 0;
}

/* ===== Cart summary ===== */
.summary-toggle {
  display: none;
}

.cart-summary-card {
  border: 1px solid #E9EDE6;
  border-radius: 16px;
  box-shadow: 0 1px 2px rgba(14, 41, 23, 0.04), 0 26px 50px -42px rgba(14, 41, 23, 0.4);
}

.cart-summary-card .cart-summary-title {
  font-size: 18px;
  font-weight: 700;
  color: #0E2917;
  margin-bottom: 18px;
  letter-spacing: -0.2px;
}

.cart-summary-card .product-wrapper {
  padding-bottom: 14px;
  border-bottom: 1px solid #EEF2EB;
}

.cart-summary-card .product-image-container {
  width: 62px;
  height: 62px;
  border-radius: 10px;
  overflow: hidden;
  background: #F1F7F2;
}

.cart-summary-card .product-image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cart-summary-card .product-name-text {
  font-size: 14px;
  font-weight: 600;
  color: #172019;
  margin-bottom: 2px;
}

.cart-summary-card .product-delivery-info {
  font-size: 12px;
  color: #8a938b;
}

.cart-summary-card .price-display-text {
  font-size: 14.5px;
  font-weight: 700;
  color: #0E2917;
}

.cart-summary-card .summary-divider {
  border: none;
  border-top: 1px solid #EEF2EB;
  margin: 14px 0;
}

.cart-summary-card .summary-row {
  font-size: 14px;
  color: #667067;
  margin-bottom: 10px;
}

.cart-summary-card .summary-value {
  color: #172019;
  font-weight: 600;
}

.cart-summary-card .summary-free-text {
  color: #1B5E20;
  font-weight: 600;
}

.cart-summary-card .total-row {
  font-size: 16px;
  font-weight: 700;
  color: #0E2917;
  margin-bottom: 14px;
}

.cart-summary-card .summary-footer-note {
  font-size: 11.5px;
  color: #8a938b;
  line-height: 1.5;
  margin-bottom: 0;
}

/* ===== Promo ===== */
.cart-summary-card .cart-promo-section {
  background: #FAFBF8;
  border: 1px solid #EEF2EB;
  border-radius: 12px;
  padding: 14px;
}

.cart-summary-card .cart-promo-label {
  font-size: 12px;
  color: #8a938b;
  line-height: 1.4;
  margin-bottom: 10px;
}

.cart-summary-card .cart-promo-input-group {
  display: flex;
  gap: 8px;
}

.cart-summary-card .cart-promo-input {
  flex: 1;
  border: 1px solid #DDE6D8;
  border-radius: 9px;
  padding: 10px 12px;
  font-size: 13px;
  background: #fff;
}

.cart-summary-card .cart-promo-input:focus {
  outline: none;
  border-color: #1B5E20;
  box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.1);
}

.cart-summary-card .cart-promo-apply-btn {
  border: none;
  border-radius: 9px;
  padding: 0 18px;
  background: #0E2917;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
}

.cart-summary-card .cart-promo-apply-btn:hover {
  background: #1B5E20;
}

/* ===== Info box ===== */
.checkout-panel .info-box {
  border: 1px solid #EEF2EB;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 4px;
}

.checkout-panel .info-box-left {
  background: #F7FAF5;
  border-right: 1px solid #EEF2EB;
  padding: 18px;
}

.checkout-panel .info-box-right {
  padding: 18px;
}

.checkout-panel .info-box-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.6px;
  color: #0E2917;
  margin: 0 0 8px;
}

.checkout-panel .info-box-description {
  font-size: 12px;
  color: #667067;
  line-height: 1.5;
  margin: 0;
}

.checkout-panel .info-box-right-text {
  font-size: 12px;
  color: #667067;
  line-height: 1.5;
}

@keyframes panel-in {
  from {
    opacity: 0;
    transform: translateY(12px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ===== Responsive ===== */
@media (min-width: 992px) {
  .cart-summary-card {
    position: sticky;
    top: 120px;
  }
}

@media (max-width: 991px) {
  .checkout-container {
    padding-top: 20px;
  }

  .summary-toggle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    background: #fff;
    border: 1px solid #E9EDE6;
    border-radius: 14px;
    padding: 15px 18px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 600;
    color: #0E2917;
    cursor: pointer;
  }

  .summary-toggle-label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  .summary-toggle-total {
    font-weight: 700;
    color: #1B5E20;
  }

  .cart-summary-card {
    display: none;
  }

  .cart-summary-card.is-open {
    display: block;
  }
}

@media (max-width: 576px) {
  .checkout-container {
    padding-top: 16px;
    padding-bottom: 64px;
  }

  .checkout-panel {
    padding: 22px 18px;
  }

  .checkout-panel .step-title-text {
    font-size: 20px;
  }

  .checkout-step-label {
    display: none;
  }

  .checkout-step-line {
    margin: 0 6px;
  }

  .checkout-panel-actions {
    flex-direction: column-reverse;
  }

  .checkout-panel-actions .primary-action-btn {
    flex: none;
    width: 100%;
  }

  .back-action-btn {
    width: 100%;
  }
}
</style>

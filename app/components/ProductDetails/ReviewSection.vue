<template>
  <div id="reviews" class="reviews-section">
    <div class="rev-container">

      <!-- Section Header -->
      <div class="rev-header">
        <div class="rev-header-left">
          <span class="rev-overline">Customer Experiences</span>
          <h2 class="rev-title">{{ sectionTitle }}</h2>
        </div>
        <button type="button" class="btn-write-review" @click="showForm = !showForm">
          <svg v-if="!showForm" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M12 20h9"/>
            <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/>
          </svg>
          <span v-if="!showForm">Write a Review</span>
          <span v-else>✕ Close Form</span>
        </button>
      </div>

      <!-- Write Review Form Modal / Box -->
      <transition name="rev-fade">
        <div v-if="showForm" class="review-form">
          <h3 class="form-title">Share Your Experience</h3>
          <p class="form-subtitle">Help others understand how this Ayurvedic formulation worked for you.</p>

          <div class="form-group">
            <label class="form-label">Your Rating</label>
            <div class="rating-selector">
              <button
                v-for="star in 5"
                :key="star"
                type="button"
                class="star-btn"
                :class="{ active: star <= rating }"
                @click="rating = star"
                :aria-label="`${star} star`"
              >
                ★
              </button>
            </div>
            <span class="rating-feedback">
              {{ rating > 0 ? `${rating} of 5 stars` : 'Tap to rate' }}
            </span>
          </div>

          <div class="form-group">
            <label for="review-comment" class="form-label">Your Review</label>
            <textarea
              id="review-comment"
              v-model="comment"
              placeholder="How did you use it? What changes or benefits did you notice?"
              rows="4"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-primary" :disabled="isSubmitting" @click="submitReview">
              {{ isSubmitting ? 'Submitting...' : 'Submit Review' }}
            </button>
            <button type="button" class="btn-secondary" @click="resetForm">
              Reset
            </button>
          </div>

          <div
            v-if="submitMessage"
            class="submit-message"
            :class="{ success: !submitError, error: submitError }"
          >
            {{ submitMessage }}
          </div>
        </div>
      </transition>

      <!-- Loading State -->
      <div v-if="isLoading" class="loading-state">
        <div class="spinner-border text-success" role="status"></div>
        <span>Loading reviews...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="fetchError" class="error-state">
        <p>{{ fetchError }}</p>
      </div>

      <!-- Rating Overview Card -->
      <div v-else class="rating-overview">
        <div class="rating-score">
          <div class="rating-number">{{ averageRating.toFixed(1) }}</div>
          <div class="stars-gold">
            <span v-for="s in 5" :key="s" class="star-gold" :class="{ on: s <= Math.round(averageRating) }">★</span>
          </div>
          <div class="rating-count">Based on {{ totalReviews }} verified review{{ totalReviews !== 1 ? 's' : '' }}</div>
        </div>

        <div class="rev-divider"></div>

        <div class="rating-bars">
          <div v-for="(count, index) in ratingDistribution" :key="5 - index" class="rating-bar-item">
            <span class="star-label">{{ 5 - index }} ★</span>
            <div class="bar-container">
              <div class="bar-fill" :style="{ width: getRatingPercentage(count) }"></div>
            </div>
            <span class="bar-count">{{ count }}</span>
          </div>
        </div>
      </div>

      <!-- Search and Sort Bar -->
      <div class="search-sort-bar">
        <div class="search-box">
          <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="11" cy="11" r="8"/>
            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search reviews by keyword..."
          />
          <button v-if="searchQuery" type="button" class="search-clear" @click="searchQuery = ''">✕</button>
        </div>

        <div class="sort-dropdown" ref="sortDropdownRef">
          <button type="button" class="custom-select-trigger" @click="toggleSortDropdown">
            <span>Sort: <strong>{{ selectedSort }}</strong></span>
            <span class="custom-select-arrow" :class="{ open: isSortDropdownOpen }">▾</span>
          </button>
          <div v-show="isSortDropdownOpen" class="custom-select-options">
            <div
              v-for="option in sortOptions"
              :key="option"
              class="custom-select-option"
              :class="{ active: selectedSort === option }"
              @click="selectSortOption(option)"
            >
              {{ option }}
            </div>
          </div>
        </div>
      </div>

      <!-- Results info -->
      <div v-if="!isLoading && !fetchError" class="results-info">
        <span>Showing {{ filteredReviews.length }} of {{ totalReviews }} review{{ totalReviews !== 1 ? 's' : '' }}</span>
        <button v-if="searchQuery" type="button" class="clear-filters-btn" @click="searchQuery = ''">
          Clear search
        </button>
      </div>

      <!-- Reviews List -->
      <div v-if="!isLoading && !fetchError" class="reviews-list">
        <!-- Empty State -->
        <div v-if="filteredReviews.length === 0" class="empty-state">
          <div class="empty-icon">🌿</div>
          <h4>{{ searchQuery ? 'No matching reviews' : 'No reviews yet' }}</h4>
          <p>{{ searchQuery ? 'Try searching for other words or clear the search filter.' : 'Be the first to share your experience with this product!' }}</p>
        </div>

        <!-- Review Cards -->
        <div v-for="review in filteredReviews" :key="review.id" class="review-card">
          <div class="rc-header">
            <div class="rc-user">
              <div class="rc-avatar">
                {{ getInitials(review.user?.firstName, review.user?.lastName) }}
              </div>
              <div class="rc-user-info">
                <div class="rc-user-name">
                  <span>{{ review.user?.firstName || 'Verified Customer' }} {{ review.user?.lastName || '' }}</span>
                  <span class="rc-verified-badge">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Verified Buyer
                  </span>
                </div>
                <div class="rc-meta">
                  <div class="rc-stars">
                    <span v-for="s in 5" :key="s" class="rc-star" :class="{ on: s <= review.rating }">★</span>
                  </div>
                  <span class="rc-date">{{ formatDate(review.createdAt) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="rc-body">
            <p class="rc-text">{{ review.comment }}</p>
          </div>

          <div class="rc-footer">
            <span class="rc-helpful-label">Was this helpful?</span>
            <div class="rc-helpful-actions">
              <button type="button" class="rc-btn-helpful">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
                </svg>
                Helpful
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { API_ENDPOINTS, getProductReviewsUrl } from '~/config/api/endpoints'
import { useApi } from '~/config/api/useApi'
import { useCmsStore } from '~/stores/cms'
import { useProductStore } from '~/stores/product'

// Types
interface Review {
  id: number
  productId: number
  userId: number
  rating: number
  comment: string
  isActive?: boolean
  isDeleted?: boolean
  createdAt: string
  updatedAt?: string
  user?: {
    firstName?: string
    lastName?: string
    userName?: string
  }
}

interface ReviewsResponse {
  success: boolean
  data: {
    reviews: Review[]
    averageRating: number
    totalReviews: number
  }
}

// Props
const props = defineProps<{
  productId?: number
}>()

const cmsStore = useCmsStore()
const productStore = useProductStore()

const sectionTitle = computed(() =>
  cmsStore.getSectionByKey('reviews')?.title ||
  cmsStore.getSectionByKey('reviews')?.name ||
  'Member Reviews'
)

// Form state
const rating = ref(5)
const comment = ref('')
const isSubmitting = ref(false)
const submitMessage = ref('')
const submitError = ref(false)
const showForm = ref(false)
const searchQuery = ref('')

// Reviews state
const reviews = ref<Review[]>([])
const averageRating = ref(4.8)
const totalReviews = ref(0)
const isLoading = ref(false)
const fetchError = ref<string | null>(null)

// Product ID resolution
const actualProductId = computed(() => {
  return props.productId || productStore.selectedProduct?.id || productStore.selectedProductPage?.productId || null
})

// Format date
const formatDate = (dateString: string): string => {
  if (!dateString) return 'Recently'
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })
  } catch {
    return 'Recently'
  }
}

const getInitials = (first?: string, last?: string): string => {
  const f = (first || 'V').charAt(0).toUpperCase()
  const l = (last || '').charAt(0).toUpperCase()
  return l ? `${f}${l}` : f
}

// Calculate rating distribution
const ratingDistribution = computed(() => {
  const distribution: [number, number, number, number, number] = [0, 0, 0, 0, 0] // 5, 4, 3, 2, 1 stars
  reviews.value.forEach((review: Review) => {
    const r = review?.rating ?? 0
    if (r >= 1 && r <= 5) {
      const idx = 5 - r as 0 | 1 | 2 | 3 | 4
      distribution[idx]++
    }
  })
  return distribution
})

// Get percentage for rating bar
const getRatingPercentage = (count: number): string => {
  if (totalReviews.value === 0) return '0%'
  return `${Math.round((count / totalReviews.value) * 100)}%`
}

// Filtered reviews
const filteredReviews = computed(() => {
  if (!searchQuery.value.trim()) return reviews.value
  const q = searchQuery.value.toLowerCase().trim()
  return reviews.value.filter(r =>
    (r.comment && r.comment.toLowerCase().includes(q)) ||
    (r.user?.firstName && r.user.firstName.toLowerCase().includes(q)) ||
    (r.user?.lastName && r.user.lastName.toLowerCase().includes(q))
  )
})

// Fetch reviews from API
const fetchReviews = async () => {
  if (!actualProductId.value) return

  isLoading.value = true
  fetchError.value = null

  try {
    const endpoint = getProductReviewsUrl(actualProductId.value)
    const { data, error } = await useApi().get<ReviewsResponse>(endpoint)

    if (error) {
      fetchError.value = error
    } else if (data && (data as ReviewsResponse).success) {
      const responseData = (data as ReviewsResponse).data
      reviews.value = responseData.reviews || []
      sortReviews(selectedSort.value)
      averageRating.value = responseData.averageRating || 4.8
      totalReviews.value = responseData.totalReviews || reviews.value.length
    }
  } catch (err: any) {
    fetchError.value = err.message || 'Failed to load reviews'
  } finally {
    isLoading.value = false
  }
}

// Sort dropdown
const isSortDropdownOpen = ref(false)
const selectedSort = ref('Highest rating')
const sortOptions = ['Highest rating', 'Lowest rating', 'Most recent']
const sortDropdownRef = ref<HTMLElement | null>(null)

const toggleSortDropdown = () => {
  isSortDropdownOpen.value = !isSortDropdownOpen.value
}

const selectSortOption = (option: string) => {
  selectedSort.value = option
  isSortDropdownOpen.value = false
  sortReviews(option)
}

const sortReviews = (option: string) => {
  if (option === 'Highest rating') {
    reviews.value.sort((a, b) => b.rating - a.rating)
  } else if (option === 'Lowest rating') {
    reviews.value.sort((a, b) => a.rating - b.rating)
  } else if (option === 'Most recent') {
    reviews.value.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  }
}

const handleClickOutside = (event: MouseEvent) => {
  if (sortDropdownRef.value && !sortDropdownRef.value.contains(event.target as Node)) {
    isSortDropdownOpen.value = false
  }
}

onMounted(() => {
  if (actualProductId.value) {
    fetchReviews()
  }
  if (process.client) {
    document.addEventListener('click', handleClickOutside)
  }
})

onUnmounted(() => {
  if (process.client) {
    document.removeEventListener('click', handleClickOutside)
  }
})

watch(() => actualProductId.value, (newId, oldId) => {
  if (newId && newId !== oldId && process.client) {
    fetchReviews()
  }
})

const submitReview = async () => {
  if (!actualProductId.value) {
    submitError.value = true
    submitMessage.value = 'Product ID not available'
    return
  }

  if (rating.value === 0) {
    submitError.value = true
    submitMessage.value = 'Please select a rating'
    return
  }

  if (!comment.value.trim()) {
    submitError.value = true
    submitMessage.value = 'Please enter your review comment'
    return
  }

  isSubmitting.value = true
  submitMessage.value = ''
  submitError.value = false

  try {
    const payload = {
      productId: actualProductId.value,
      rating: rating.value,
      comment: comment.value.trim()
    }

    const { data, error } = await useApi().post(API_ENDPOINTS.REVIEW_CREATE, payload)

    if (error) {
      submitError.value = true
      submitMessage.value = error
    } else if (data && (data as any).success) {
      submitError.value = false
      submitMessage.value = (data as any).message || 'Review submitted successfully!'
      comment.value = ''
      rating.value = 5
      await fetchReviews()
      setTimeout(() => {
        showForm.value = false
        submitMessage.value = ''
      }, 2500)
    } else {
      submitError.value = true
      submitMessage.value = 'Failed to submit review'
    }
  } catch (err: any) {
    submitError.value = true
    submitMessage.value = err.message || 'An error occurred'
  } finally {
    isSubmitting.value = false
  }
}

const resetForm = () => {
  rating.value = 5
  comment.value = ''
  submitMessage.value = ''
  submitError.value = false
}
</script>

<style scoped>
.reviews-section {
  background: #ffffff;
  padding: 80px 0 96px;
  font-family: var(--vcn-font, "Outfit", sans-serif);
  position: relative;
  overflow: hidden;
  border-top: 1px solid #e8f0e3;
}

.rev-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (max-width: 768px) {
  .reviews-section {
    padding: 50px 0 64px;
  }
  .rev-container {
    padding: 0 16px;
  }
}

/* ─── Header ─────────────────────────────────────────────── */
.rev-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 16px;
}

.rev-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #1d4503;
  background: #f0fae6;
  padding: 5px 13px;
  border-radius: 20px;
  border: 1px solid #c5f375;
  margin-bottom: 12px;
}

.rev-title {
  font-family: var(--vcn-font, "Outfit", sans-serif);
  font-size: clamp(26px, 3.5vw, 40px);
  font-weight: 900;
  color: #0e1a0b;
  line-height: 1.15;
  letter-spacing: -0.6px;
  margin: 0;
}

.btn-write-review {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #1d4503;
  color: #ffffff;
  border: none;
  padding: 12px 24px;
  border-radius: 40px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn-write-review:hover {
  background: #2a6106;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(29, 69, 3, 0.2);
}

@media (max-width: 576px) {
  .rev-header {
    flex-direction: column;
    align-items: stretch;
    margin-bottom: 28px;
  }
  .btn-write-review {
    width: 100%;
    justify-content: center;
  }
}

/* ─── Review Form ─────────────────────────────────────────── */
.review-form {
  background: #f9fbf7;
  border: 1.5px solid #ddead1;
  border-radius: 20px;
  padding: 28px;
  margin-bottom: 36px;
  box-shadow: 0 12px 32px rgba(29, 69, 3, 0.06);
}

.form-title {
  font-size: 20px;
  font-weight: 800;
  color: #0e1a0b;
  margin: 0 0 6px 0;
}

.form-subtitle {
  font-size: 13.5px;
  color: #5a6b50;
  margin: 0 0 20px 0;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 700;
  color: #1d4503;
  margin-bottom: 8px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.rating-selector {
  display: flex;
  gap: 6px;
}

.star-btn {
  background: none;
  border: none;
  font-size: 28px;
  color: #d1d5db;
  cursor: pointer;
  padding: 0 4px;
  transition: transform 0.15s, color 0.15s;
  line-height: 1;
}

.star-btn:hover,
.star-btn.active {
  color: #f59e0b;
  transform: scale(1.1);
}

.rating-feedback {
  display: inline-block;
  font-size: 12px;
  color: #5a6b50;
  margin-top: 6px;
  font-weight: 600;
}

textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid #ddead1;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.6;
  font-family: inherit;
  color: #0e1a0b;
  background: #ffffff;
  resize: vertical;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

textarea:focus {
  outline: none;
  border-color: #1d4503;
  box-shadow: 0 0 0 3px rgba(29, 69, 3, 0.12);
}

.form-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-primary {
  background: #1d4503;
  color: #ffffff;
  border: none;
  padding: 12px 28px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary:hover:not(:disabled) {
  background: #2a6106;
  transform: translateY(-1px);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: transparent;
  color: #5a6b50;
  border: 1.5px solid #ddead1;
  padding: 11px 22px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: #f0fae6;
  color: #1d4503;
}

.submit-message {
  margin-top: 14px;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 13.5px;
  font-weight: 600;
}

.submit-message.success {
  background: #eaf8dd;
  color: #1d4503;
  border: 1px solid #b8e084;
}

.submit-message.error {
  background: #fee2e2;
  color: #991b1b;
  border: 1px solid #fca5a5;
}

@media (max-width: 576px) {
  .review-form { padding: 20px 16px; }
  .form-actions { flex-direction: column; width: 100%; }
  .form-actions button { width: 100%; }
}

/* ─── Rating Overview Card ────────────────────────────────── */
.rating-overview {
  background: #f7f9f4;
  border: 1.5px solid #e8f0e3;
  border-radius: 20px;
  padding: 32px 40px;
  margin-bottom: 36px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.rating-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex-shrink: 0;
  min-width: 200px;
}

.rating-number {
  font-size: 52px;
  font-weight: 900;
  color: #0e1a0b;
  line-height: 1;
  margin-bottom: 8px;
  letter-spacing: -1px;
}

.stars-gold {
  display: flex;
  gap: 3px;
  margin-bottom: 8px;
}

.star-gold {
  color: #e5e7eb;
  font-size: 20px;
}

.star-gold.on {
  color: #f59e0b;
}

.rating-count {
  font-size: 13px;
  color: #5a6b50;
  font-weight: 600;
}

.rev-divider {
  width: 1px;
  align-self: stretch;
  background: #ddead1;
}

.rating-bars {
  flex: 1;
  max-width: 460px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.rating-bar-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.star-label {
  font-size: 12px;
  font-weight: 700;
  color: #0e1a0b;
  min-width: 36px;
}

.bar-container {
  flex: 1;
  height: 8px;
  background: #e5ecd9;
  border-radius: 10px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #1d4503, #8ef375);
  border-radius: 10px;
  transition: width 0.4s ease;
}

.bar-count {
  font-size: 12px;
  font-weight: 700;
  color: #5a6b50;
  min-width: 28px;
  text-align: right;
}

@media (max-width: 768px) {
  .rating-overview {
    flex-direction: column;
    padding: 24px 20px;
    gap: 24px;
    align-items: stretch;
  }
  .rating-score {
    min-width: auto;
  }
  .rev-divider {
    width: 100%;
    height: 1px;
  }
  .rating-bars {
    max-width: 100%;
  }
}

/* ─── Search & Sort Bar ───────────────────────────────────── */
.search-sort-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 240px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 14px;
  color: #7b8e72;
  pointer-events: none;
}

.search-box input {
  width: 100%;
  padding: 12px 38px 12px 40px;
  border: 1.5px solid #e8f0e3;
  border-radius: 30px;
  font-size: 13.5px;
  font-family: inherit;
  color: #0e1a0b;
  background: #ffffff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.search-box input:focus {
  outline: none;
  border-color: #1d4503;
  box-shadow: 0 0 0 3px rgba(29, 69, 3, 0.08);
}

.search-clear {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #8aab72;
  font-size: 13px;
  cursor: pointer;
  padding: 4px;
}

.sort-dropdown {
  position: relative;
  min-width: 200px;
}

.custom-select-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #ffffff;
  border: 1.5px solid #e8f0e3;
  border-radius: 30px;
  font-size: 13.5px;
  font-family: inherit;
  color: #0e1a0b;
  cursor: pointer;
  transition: border-color 0.2s;
  white-space: nowrap;
}

.custom-select-trigger:hover {
  border-color: #a8de6a;
}

.custom-select-arrow {
  margin-left: 8px;
  font-size: 12px;
  transition: transform 0.2s;
}

.custom-select-arrow.open {
  transform: rotate(180deg);
}

.custom-select-options {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: 100%;
  min-width: 180px;
  background: #ffffff;
  border: 1.5px solid #e8f0e3;
  border-radius: 14px;
  box-shadow: 0 10px 28px rgba(0,0,0,0.1);
  overflow: hidden;
  z-index: 50;
}

.custom-select-option {
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #0e1a0b;
  cursor: pointer;
  transition: background 0.15s;
}

.custom-select-option:hover {
  background: #f0fae6;
  color: #1d4503;
}

.custom-select-option.active {
  background: #1d4503;
  color: #ffffff;
}

@media (max-width: 576px) {
  .search-sort-bar {
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
  }
  .search-box, .sort-dropdown {
    width: 100%;
    min-width: 100%;
  }
}

/* ─── Results Info ────────────────────────────────────────── */
.results-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 13px;
  color: #5a6b50;
  font-weight: 600;
}

.clear-filters-btn {
  background: none;
  border: none;
  color: #1d4503;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  font-size: 13px;
}

/* ─── Review Cards ────────────────────────────────────────── */
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.review-card {
  background: #ffffff;
  border: 1.5px solid #edf2e8;
  border-radius: 18px;
  padding: 22px 24px;
  transition: all 0.25s ease;
  box-shadow: 0 2px 8px rgba(29, 69, 3, 0.03);
}

.review-card:hover {
  border-color: #c5f375;
  box-shadow: 0 8px 24px rgba(29, 69, 3, 0.07);
}

.rc-header {
  margin-bottom: 14px;
}

.rc-user {
  display: flex;
  align-items: center;
  gap: 14px;
}

.rc-avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #1d4503, #2e6b08);
  color: #c5f375;
  font-size: 15px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.rc-user-info {
  flex: 1;
  min-width: 0;
}

.rc-user-name {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 800;
  color: #0e1a0b;
  flex-wrap: wrap;
  line-height: 1.3;
}

.rc-verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 11px;
  font-weight: 700;
  color: #1d4503;
  background: #f0fae6;
  border: 1px solid #c5f375;
  padding: 2px 8px;
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}

.rc-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
}

.rc-stars {
  display: flex;
  gap: 2px;
}

.rc-star {
  font-size: 14px;
  color: #e5e7eb;
}

.rc-star.on {
  color: #f59e0b;
}

.rc-date {
  font-size: 12px;
  color: #7b8e72;
}

.rc-body {
  margin-bottom: 14px;
}

.rc-text {
  font-size: 14px;
  line-height: 1.65;
  color: #374151;
  margin: 0;
}

.rc-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 10px;
  border-top: 1px solid #f3f7ef;
}

.rc-helpful-label {
  font-size: 12px;
  color: #7b8e72;
}

.rc-btn-helpful {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  background: none;
  border: 1px solid #e8f0e3;
  padding: 4px 10px;
  border-radius: 14px;
  font-size: 11.5px;
  font-weight: 700;
  color: #5a6b50;
  cursor: pointer;
  transition: all 0.15s;
}

.rc-btn-helpful:hover {
  border-color: #1d4503;
  color: #1d4503;
  background: #f0fae6;
}

@media (max-width: 576px) {
  .review-card { padding: 18px 16px; }
  .rc-avatar { width: 36px; height: 36px; font-size: 13px; }
  .rc-user-name { font-size: 14px; gap: 6px; }
}

/* ─── Empty & Loading States ──────────────────────────────── */
.empty-state {
  text-align: center;
  padding: 56px 20px;
  background: #f7f9f4;
  border: 1.5px dashed #ddead1;
  border-radius: 20px;
  margin: 10px 0;
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 12px;
}

.empty-state h4 {
  font-size: 18px;
  font-weight: 800;
  color: #0e1a0b;
  margin: 0 0 6px;
}

.empty-state p {
  font-size: 13.5px;
  color: #5a6b50;
  margin: 0;
  max-width: 360px;
  margin: 0 auto;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 48px 20px;
  font-size: 14px;
  color: #5a6b50;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.error-state {
  color: #991b1b;
  background: #fef2f2;
  border-radius: 16px;
  margin: 20px 0;
}

/* Transitions */
.rev-fade-enter-active,
.rev-fade-leave-active {
  transition: all 0.3s ease;
}

.rev-fade-enter-from,
.rev-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
<template>
  <section class="product-detail-section mt-3">
    <div class="container">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <div class="col-md-9 col-lg-9 content-section">
          <!-- FAQ TITLE (outside sidebar/content row) -->
          <div class="row mb-4">
            <div class="col-12 text-center">
              <h1 class="vcn-faq-title">
                {{ faq.title }}
              </h1>
            </div>
          </div>
          <div class="vcn-faq-list">

            <div v-for="(category, index) in faq.categories" :key="index" class="vcn-faq-item">
              <button class="vcn-faq-question-btn" type="button" @click="toggleAccordion(index)">
                <span>
                  {{ category.title }}
                </span>

                <i class="bi" :class="activeIndex === index
                    ? 'bi-chevron-up'
                    : 'bi-chevron-down'
                  "></i>
              </button>

              <div v-if="activeIndex === index" class="vcn-faq-answer-wrapper">
                <div v-for="(qa, qIndex) in category.questions" :key="qIndex" class="vcn-qa-nested-accordion">
                  <button class="vcn-qa-question-btn-nested" type="button"
                    @click="toggleQuestionAccordion(index, qIndex)">
                    <span>{{ qa.question }}</span>
                    <i class="bi" :class="isQuestionActive(index, qIndex)
                        ? 'bi-chevron-up'
                        : 'bi-chevron-down'
                      "></i>
                  </button>

                  <div v-if="isQuestionActive(index, qIndex)" class="vcn-qa-answer-text-nested">
                    <p>{{ qa.answer }}</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCmsStore } from '~/stores/cms'

const cmsStore = useCmsStore()

// Fetch page sections from API during SSR/routing
await useAsyncData('faqs-cms', () => cmsStore.fetchSectionsBySlug('faq'))

const faq = computed(() => {
  const sections = cmsStore.currentPage?.sections || []

  // Fallback
  const fallback = cmsStore.getPageSection('about', 'faq')

  let parsedCategories = fallback?.categories || []

  if (sections.length > 0) {
    const mainSection = sections.find(s => s.name === 'faq' || s.sectionKey === 'faq-main')
    if (mainSection && mainSection.items) {
      parsedCategories = mainSection.items.map(item => {
        const extra = item.extraData?._extraData || item.extraData || {}
        const questions = (extra.questions || []).map(q => ({
          question: q.question || '',
          answer: q.answer || ''
        }))
        return {
          title: item.title || '',
          questions
        }
      })
    }
  }

  return {
    title: fallback?.title || 'Frequently Asked Questions',
    categories: parsedCategories
  }
})

const activeIndex = ref(null)
const activeQuestionKey = ref(null)

const toggleAccordion = (index) => {
  activeIndex.value = activeIndex.value === index ? null : index
  activeQuestionKey.value = null // reset nested question toggle when parent toggles
}

const toggleQuestionAccordion = (catIndex, qIndex) => {
  const key = `${catIndex}-${qIndex}`
  activeQuestionKey.value = activeQuestionKey.value === key ? null : key
}

const isQuestionActive = (catIndex, qIndex) => {
  return activeQuestionKey.value === `${catIndex}-${qIndex}`
}

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
})
</script>

<style scoped>
.vcn-faq-section {
  padding: 0;
  background-color: #ffffff;
}

.vcn-faq-container {
  width: 100%;
  margin: 0;
  padding: 0;
}

.vcn-faq-title {
  font-size: 52px;
  font-weight: 500;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 40px;
  color: #212529;
  letter-spacing: -0.5px;
}

.vcn-faq-list {
  max-width: 100%;
  margin: 0;
  border-top: 1px solid #e5e7eb !important;
}

.vcn-faq-item {
  border-bottom: 1px solid #e5e7eb !important;
  padding: 0 !important;
  /* Force override global padding in style.css */
}

.vcn-faq-question-btn {
  width: 100%;
  padding: 28px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 20px;
  font-weight: 600;
  color: #212529;
  transition: color 0.2s ease;
}

.vcn-faq-question-btn:hover {
  color: var(--vcn-primary);
}

.vcn-faq-question-btn i {
  font-size: 16px;
  color: #4b5563;
  transition: transform 0.2s ease;
}

/* Answer section - visible when active */
.vcn-faq-answer-wrapper {
  padding: 0 0 25px 0;
  background-color: #fff;
}

/* Nested Question Accordions */
.vcn-qa-nested-accordion {
  border-bottom: 1px solid #f1f5f9;
}

.vcn-qa-nested-accordion:last-child {
  border-bottom: none;
}

.vcn-qa-question-btn-nested {
  width: 100%;
  padding: 18px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;
  text-align: left;
  font-size: 16px;
  font-weight: 500;
  color: #374151;
  /* gray-700 */
  transition: color 0.2s ease;
}

.vcn-qa-question-btn-nested:hover {
  color: var(--vcn-primary);
}

.vcn-qa-question-btn-nested i {
  font-size: 14px;
  color: #9ca3af;
  transition: transform 0.2s ease;
}

.vcn-qa-answer-text-nested {
  padding: 0 0 20px 0;
  animation: fadeIn 0.2s ease;
}

.vcn-qa-answer-text-nested p {
  font-size: 15px;
  line-height: 1.7;
  color: #4b5563;
  /* gray-600 */
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .product-detail-section {
    margin-top: 0 !important;
    padding-bottom: 80px !important;
  }

  .vcn-faq-title {
    font-size: 32px;
    margin-top: 15px;
    margin-bottom: 25px;
  }

  .vcn-faq-question-btn {
    font-size: 18px;
    padding: 20px 0;
  }

  .vcn-qa-question-btn-nested {
    font-size: 15px;
    padding: 14px 0;
  }

  .vcn-qa-answer-text-nested p {
    font-size: 14px;
    line-height: 1.6;
  }
}
</style>
<style>
/*
  ===========================================================
  STICKY-SAFE LAYOUT OVERRIDES (unscoped)
  ===========================================================
*/
.product-detail-section,
.product-detail-section .container,
.product-detail-section .row {
  overflow: visible !important;
  transform: none !important;
  filter: none !important;
  contain: none !important;
  will-change: auto !important;
}

@media (min-width: 992px) {
  .product-detail-section .row {
    display: flex !important;
    align-items: stretch !important;
  }

  .sidebar-section {
    display: flex !important;
    flex-direction: column !important;
    align-self: stretch !important;
    position: relative !important;
    top: auto !important;
    height: auto !important;
    overflow: visible !important;
    transform: none !important;
    background: transparent !important;
    padding-top: 0 !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 991.98px) {
  .product-detail-section {
    padding: 0 !important;
    margin-top: 0 !important;
  }

  .product-detail-section > .container {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }

  .product-detail-section .row {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .sidebar-section {
    height: auto !important;
    min-height: auto !important;
    position: relative !important;
    top: 0 !important;
    overflow: visible !important;
    border-right: none !important;
    background: transparent !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .content-section {
    padding: 20px 0 !important;
    min-height: auto !important;
  }
}
</style>

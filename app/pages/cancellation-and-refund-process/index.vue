<template>
  <section class="terms-conditions mt-3">
    <div class="container">
      <div class="row">
        <div class="col-12">

          <h3>{{ cancellationRefund.heading }}</h3>

          <p
            v-for="(paragraph, index) in cancellationRefund.paragraphs"
            :key="index"
          >
            {{ paragraph }}
          </p>

        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'

const cmsStore = useCmsStore()

// Fetch page sections from API during SSR/routing
await useAsyncData('cancellation-refund-cms', () => cmsStore.fetchSectionsBySlug('cancellation-refund'))

const cancellationRefund = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  
  // Find cancellationRefund section by name or sectionKey
  const section = sections.find(s => s.name === 'cancellationRefund' || s.sectionKey === 'cancellation-refund')
  
  const fallback = cmsStore.getPageSection('cancellationRefund', 'cancellationRefund') || {
    heading: "Cancellation & Refund Policy",
    paragraphs: []
  }

  if (!section) {
    return fallback
  }

  // Find item by name 'content'
  const contentItem = section.items?.find(item => item.name === 'content')

  return {
    heading: contentItem?.title || fallback.heading,
    paragraphs: contentItem?.extraData?.paragraphs || fallback.paragraphs
  }
})

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
})
</script>

<style scoped>
.terms-conditions {
  padding-top: 50px;
  padding-bottom: 80px;
  box-sizing: border-box;
  width: 100%;
  padding-left: 20px !important;
  padding-right: 20px !important;
}

@media (max-width: 991.98px) {
  .terms-conditions {
    padding-left: 30px !important;
    padding-right: 30px !important;
  }
}

@media (max-width: 767.98px) {
  .terms-conditions {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

@media (max-width: 575.98px) {
  .terms-conditions {
    padding-left: 15px !important;
    padding-right: 15px !important;
  }
}

@media (max-width: 379.98px) {
  .terms-conditions {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
}

@media (min-width: 1200px) {
  .terms-conditions {
    padding-left: 80px !important;
    padding-right: 80px !important;
  }
}

@media (min-width: 1400px) {
  .terms-conditions {
    padding-left: 160px !important;
    padding-right: 160px !important;
  }
}
</style>

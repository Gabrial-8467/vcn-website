<template>
  <section class="terms-conditions mt-3">
    <div class="container">
      <div class="row">
        <div class="col-12">

          <h3>{{ shipping.title }}</h3>

          <p
            v-for="(paragraph, index) in shipping.paragraphs"
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
await useAsyncData('shipping-delivery-cms', () =>
  cmsStore.fetchSectionsBySlug('shipping-delivery-policy')
)

const shipping = computed(() => {
  const sections = cmsStore.currentPage?.sections || []

  // Find shipping section by name or sectionKey
  const section = sections.find(
    s =>
      s.name === 'shippingDelivery' ||
      s.sectionKey === 'shippingDelivery'
  )

  // Use your existing fallback constant
  const fallback =
    cmsStore.getPageSection(
      'shippingDelivery',
      'shippingDelivery'
    ) || {}

  if (!section) {
    return fallback
  }

  return {
    title:
      section.title ||
      fallback.title,

    paragraphs:
      section.items?.map(item => item.description) ||
      fallback.paragraphs ||
      []
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

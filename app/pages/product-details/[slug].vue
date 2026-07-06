<template>
  <div class="product-details-responsive-page">
    <ProductDetailsIntroduction :product-page="productStore.selectedProductPage" />
    <!-- <ProductDetailsStrainSection /> -->
    <ProductDetailsHealthSection />
    <ProductDetailsFormulationSection />
    <!-- <ProductDetailsBundleSection /> -->
    <ProductDetailsBenefitsSection />
    <!-- <ProductDetailsCellularEnergySection /> -->
    <!-- <ProductDetailsCompareSection /> -->
    <ProductDetailsRigorousSection />
    <!-- <ProductDetailsProbioticSection /> -->
    <ProductDetailsDifferenceSection />
    <!-- <ProductDetailsStrengthenSection /> -->
    <ProductDetailsProducts />
    <ProductDetailsReviewSection
      :product-id="productStore.selectedProduct?.id || productStore.selectedProductPage?.productId" />
  </div>
</template>

<script setup>
const route = useRoute()
const productStore = useProductStore()

const slug = computed(() => route.params.slug)

// Fetch product page data when slug changes
watchEffect(() => {
  if (slug.value) {
    productStore.fetchProductPageBySlug(slug.value)
  }
})

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
});
</script>

<style scoped>
/* Layout-only responsive guardrails for every section on this page. */
.product-details-responsive-page {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

.product-details-responsive-page :deep(*),
.product-details-responsive-page :deep(*::before),
.product-details-responsive-page :deep(*::after) {
  box-sizing: border-box;
}

.product-details-responsive-page :deep(section),
.product-details-responsive-page :deep(.reviews-section),
.product-details-responsive-page :deep(.vcn-new-product) {
  width: 100%;
  max-width: 100%;
}

.product-details-responsive-page :deep(.row > *),
.product-details-responsive-page :deep(.product-info),
.product-details-responsive-page :deep(.product-content),
.product-details-responsive-page :deep(.vcn-probiotic-left-content),
.product-details-responsive-page :deep(.vcn-probiotic-right-content),
.product-details-responsive-page :deep(.routine-content-column) {
  min-width: 0;
}

.product-details-responsive-page :deep(img),
.product-details-responsive-page :deep(video) {
  max-width: 100%;
}

.product-details-responsive-page :deep(p),
.product-details-responsive-page :deep(h1),
.product-details-responsive-page :deep(h2),
.product-details-responsive-page :deep(h3),
.product-details-responsive-page :deep(h4),
.product-details-responsive-page :deep(a),
.product-details-responsive-page :deep(button),
.product-details-responsive-page :deep(span) {
  overflow-wrap: break-word;
}

@media (min-width: 1600px) {
  .product-details-responsive-page :deep(.container) {
    width: min(100% - 64px, 1440px);
    max-width: 1440px;
  }
}

@media (max-width: 1199.98px) {
  .product-details-responsive-page :deep(.container) {
    max-width: 100%;
  }

  .product-details-responsive-page :deep(.bundle-card),
  .product-details-responsive-page :deep(.routine-bundle-container),
  .product-details-responsive-page :deep(.testing-standards-wrapper),
  .product-details-responsive-page :deep(.timeline-image-wrapper) {
    max-width: 100% !important;
  }

  .product-details-responsive-page :deep(.alternate-image),
  .product-details-responsive-page :deep(.vcn-probiotic-callout) {
    max-width: 100%;
  }
}

@media (max-width: 991.98px) {
  .product-details-responsive-page :deep(.row) {
    --bs-gutter-x: 1.5rem;
  }

  .product-details-responsive-page :deep(.pe-0),
  .product-details-responsive-page :deep(.sm-pr-0) {
    padding-right: calc(var(--bs-gutter-x) * 0.5) !important;
  }

  .product-details-responsive-page :deep(.product-info),
  .product-details-responsive-page :deep(.vcn-video-wrapper),
  .product-details-responsive-page :deep(.routine-products-column),
  .product-details-responsive-page :deep(.routine-content-column),
  .product-details-responsive-page :deep(.testing-content) {
    width: 100%;
    max-width: 100%;
  }

  .product-details-responsive-page :deep(.rating-overview),
  .product-details-responsive-page :deep(.search-sort-bar),
  .product-details-responsive-page :deep(.form-actions),
  .product-details-responsive-page :deep(.row-1),
  .product-details-responsive-page :deep(.row-3) {
    flex-wrap: wrap;
  }

  .product-details-responsive-page :deep(.search-box),
  .product-details-responsive-page :deep(.sort-dropdown) {
    min-width: 0 !important;
    max-width: 100%;
  }
}

@media (max-width: 767.98px) {
  /* Unify horizontal container spacing on mobile to resolve uneven spacing issues */
  .product-details-responsive-page :deep(section),
  .product-details-responsive-page :deep(.container-fluid) {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .product-details-responsive-page :deep(.container) {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  .product-details-responsive-page :deep(.health-section) {
    min-height: 0 !important;
  }

  .product-details-responsive-page :deep(.variant-options),
  .product-details-responsive-page :deep(.variant-info),
  .product-details-responsive-page :deep(.bundle-bottom-row),
  .product-details-responsive-page :deep(.product-actions),
  .product-details-responsive-page :deep(.rating-flex) {
    flex-wrap: wrap !important;
  }

  .product-details-responsive-page :deep(.review-form),
  .product-details-responsive-page :deep(.review-card),
  .product-details-responsive-page :deep(textarea),
  .product-details-responsive-page :deep(input) {
    width: 100%;
    max-width: 100%;
  }

  .product-details-responsive-page :deep(.vcn-showcase-img),
  .product-details-responsive-page :deep(.journey-main-image),
  .product-details-responsive-page :deep(.routine-main-image) {
    height: auto !important;
    max-width: 100% !important;
  }
}

@media (max-width: 575.98px) {
  .product-details-responsive-page :deep(.bundle-card) {
    width: 100%;
    max-width: 100% !important;
  }

  .product-details-responsive-page :deep(.bundle-content),
  .product-details-responsive-page :deep(.bundle-bottom-row),
  .product-details-responsive-page :deep(.bundle-action),
  .product-details-responsive-page :deep(.btn-write-review),
  .product-details-responsive-page :deep(.form-actions > button) {
    min-width: 0;
    max-width: 100%;
  }

  .product-details-responsive-page :deep(.rating-overview),
  .product-details-responsive-page :deep(.search-sort-bar) {
    width: 100%;
  }

  .product-details-responsive-page :deep(.divider) {
    max-width: 100%;
  }
}
</style>

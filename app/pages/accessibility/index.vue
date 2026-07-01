<template>
  <section class="terms-conditions">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h3>{{ accessibility.title }}</h3>

          <p v-for="(paragraph, index) in accessibility.content" :key="index">
             {{ paragraph }}
          </p>
          <!-- <p>
            VCN is committed to ensuring that our website is accessible to all users, including individuals with
            disabilities. We strive to provide a seamless and user-friendly experience by following best practices for
            accessibility and usability. Our goal is to make our content easy to navigate, understand, and interact with
            across different devices and assistive technologies.
          </p>
          <p>
            We continuously work to improve accessibility features and welcome feedback to enhance user experience. If
            you encounter any difficulty while accessing our website or need assistance, please feel free to contact
            us—we are here to help.
          </p> -->
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
await useAsyncData('accessibility-cms', () => cmsStore.fetchSectionsBySlug('accessibility'))

const accessibility = computed(() => {
  const section = cmsStore.getSectionByKey('accessibility')
  const fallback = cmsStore.getPageSection('accessibility', 'accessibility') || { title: '', content: [] }
  
  if (section) {
    const contentItem = section.items?.find(item => item.name === 'content')
    const paragraphs = contentItem?.extraData?.paragraphs || []
    
    let content = paragraphs
    if (content.length === 0) {
      if (section.items && section.items.length > 0) {
        content = section.items.map(item => item.description || item.title || '').filter(Boolean)
      } else if (section.description) {
        content = [section.description]
      }
    }
    
    return {
      title: section.title || fallback.title || 'Website Accessibility Statement',
      content: content.length > 0 ? content : fallback.content
    }
  }
  
  return fallback
})

useHead({
  bodyAttrs: {
    class: 'product-details-page'
  }
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

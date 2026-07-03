<template>
  <section class="product-detail-section mt-3">
    <section class="vcn-blogs-page py-5">
      <div class="container">

        <!-- Category Filters -->
        <div class="vcn-category-filters d-flex gap-2 mb-5 flex-wrap justify-content-center">
          <button v-for="(category, index) in blogs.categories" :key="index"
            :class="['vcn-filter-btn', 'btn', 'btn-outline-secondary', 'rounded-1', { 'active': activeCategory === category }]"
            @click="activeCategory = category">
            {{ category }}
          </button>
        </div>

        <!-- Section Title -->
        <h2 class="vcn-section-title text-center fw-semibold mb-5">{{ blogs.sectionTitle }}</h2>

        <!-- Blog Posts Grid -->
        <div class="vcn-blog-grid row g-4 mb-5 ">
          <div v-for="(blog, index) in filteredBlogs" :key="index" class="col-lg-4 col-md-6">
            <div class="vcn-blog-card card h-100 border-0 shadow-sm">
              <div class="vcn-blog-image-wrapper position-relative overflow-hidden">
                <img :src="blog.image" :alt="blog.title" class="vcn-blog-image card-img-top">
                <span
                  class="vcn-blog-category position-absolute top-0 end-0 m-3 px-3 py-1 bg-white rounded small fw-bold text-success">
                  {{ blog.category }}
                </span>
              </div>
              <div class="vcn-blog-content card-body d-flex justify-content-between align-items-start gap-3">
                <h3 class="vcn-blog-title card-title fs-6 fw-semibold mb-0 text-dark">{{ blog.title }}</h3>
                <NuxtLink :to="blog.link" class="vcn-read-more-btn btn btn-success rounded-circle p-2 flex-shrink-0">
                  <i class="bi bi-arrow-right"></i>
                </NuxtLink>
              </div>
              <div class="blog-metas">
                <span class="authors">
                  <i class="bi bi-person"></i>
                  {{ blog.author }}
                </span>

                <span class="dates">
                  <i class="bi bi-calendar"></i>
                  {{ blog.date }}
                </span>

              </div>
            </div>
          </div>
        </div>

        <!-- Load More Button -->
        <div class="text-center mt-5">
          <button class="vcn-load-more-btn btn btn-outline-success rounded-pill px-5 py-2 fw-semibold">
            {{ blogs.buttons.loadMore }}
          </button>
        </div>

      </div>
    </section>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCmsStore } from '~/stores/cms'

const cmsStore = useCmsStore()

const blogs = computed(
  () => cmsStore.getPageSection('blogs', 'blogs')
)

useHead({
  bodyAttrs: {
    class: "product-details-page",
  },
});

const activeCategory = ref('View All')

const filteredBlogs = computed(() => {
  const blogList = blogs.value?.blogs || []

  if (activeCategory.value === 'View All') {
    return blogList
  }

  return blogList.filter(
    blog => blog.category === activeCategory.value
  )
})
</script>

<style scoped>
/* ==========================
   BLOG PAGE RESPONSIVE
========================== */

.vcn-blogs-page {
    overflow-x: hidden;
}
/* Row spacing */
.vcn-blog-grid {
    margin-left: -18px !important;
    margin-right: -18px !important;
}

/* Column spacing */
.vcn-blog-grid > div {
    padding-left: 18px !important;
    padding-right: 18px !important;
    margin-bottom: 36px !important;
}

/* Card */
.vcn-blog-card {
    height: 100%;
    width: 100%;
}

/* Tablet */
@media (max-width: 991px) {
    .vcn-blog-grid {
        margin-left: -14px !important;
        margin-right: -14px !important;
    }

    .vcn-blog-grid > div {
        padding-left: 14px !important;
        padding-right: 14px !important;
        margin-bottom: 28px !important;
    }
}

/* Mobile */
@media (max-width: 767px) {
    .vcn-blog-grid {
        margin-left: -10px !important;
        margin-right: -10px !important;
    }

    .vcn-blog-grid > div {
        padding-left: 10px !important;
        padding-right: 10px !important;
        margin-bottom: 24px !important;
    }
}

/* ---------- Filters ---------- */

.vcn-category-filters {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
}

.vcn-filter-btn {
    padding: 10px 22px;
    font-size: 15px;
    white-space: nowrap;
}

/* ---------- Card ---------- */

.vcn-blog-card {
    border-radius: 14px;
    overflow: hidden;
    transition: .3s;
    height: 100%;
}

.vcn-blog-card:hover {
    transform: translateY(-4px);
}

.vcn-blog-image {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
}

.vcn-blog-content {
    padding: 20px;
}

.vcn-blog-title {
    line-height: 1.5;
    flex: 1;
}

.vcn-read-more-btn {
    width: 42px;
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.blog-metas {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 20px;
    font-size: 14px;
    color: #777;
    flex-wrap: wrap;
    gap: 10px;
}

/* ==========================
        LARGE DESKTOP
========================== */

@media (min-width:1400px){

    .container{
        max-width:1320px;
    }

    .vcn-blog-image{
        height:280px;
    }

    .vcn-blog-title{
        font-size:20px;
    }

}

/* ==========================
        LAPTOP
========================== */

@media (max-width:1200px){

    .vcn-blog-image{
        height:230px;
    }

}

/* ==========================
        TABLET
========================== */

@media (max-width:991px){

    .vcn-section-title{
        font-size:30px;
    }

    .vcn-blog-image{
        height:220px;
    }

    .vcn-blog-content{
        padding:18px;
    }

    .blog-metas{
        padding:0 18px 18px;
        font-size:13px;
    }

}

/* ==========================
        MOBILE
========================== */

@media (max-width:767px){

    .vcn-blogs-page{
        padding:50px 0;
    }

    .vcn-section-title{
        font-size:26px;
        margin-bottom:35px !important;
    }

    .vcn-category-filters{
        justify-content:flex-start;
        overflow-x:auto;
        flex-wrap:nowrap;
        padding-bottom:10px;

        scrollbar-width:none;
    }

    .vcn-category-filters::-webkit-scrollbar{
        display:none;
    }

    .vcn-filter-btn{
        flex-shrink:0;
        font-size:14px;
        padding:8px 18px;
    }

    .vcn-blog-image{
        height:210px;
    }

    .vcn-blog-content{
        padding:16px;
    }

    .vcn-blog-title{
        font-size:16px !important;
    }

    .vcn-read-more-btn{
        width:38px;
        height:38px;
    }

    .blog-metas{
        padding:0 16px 16px;
        flex-direction:column;
        align-items:flex-start;
        gap:8px;
    }

    .vcn-load-more-btn{
        width:100%;
    }

}

/* ==========================
      SMALL MOBILE
========================== */

@media (max-width:576px){

    .container{
        padding-left:16px;
        padding-right:16px;
    }

    .vcn-blog-image{
        height:190px;
    }

    .vcn-blog-title{
        font-size:15px !important;
    }

    .vcn-section-title{
        font-size:22px;
    }

    .vcn-filter-btn{
        padding:8px 16px;
        font-size:13px;
    }

    .blog-metas{
        font-size:12px;
    }

}

/* ==========================
      EXTRA SMALL
========================== */

@media (max-width:375px){

    .vcn-blog-image{
        height:170px;
    }

    .vcn-blog-title{
        font-size:14px !important;
    }

    .vcn-read-more-btn{
        width:34px;
        height:34px;
    }

}
</style>
<template>
  <section class="vcn-human-section">
    <div class="vcn-human-container" id="mainContainer">
      <!-- Left Content -->
      <div class="vcn-human-left-content">
        <div class="vcn-human-logo">
          <div class="vcn-human-logo-icon">
            <img
              src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232d4a25'%3E%3Cpath d='M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z'/%3E%3C/svg%3E"
              alt="" />
          </div>
          <span>VCN</span>
        </div>


        <h2 class="vcn-human-heading" data-aos="fade-right" data-aos-duration="1000" data-aos-delay="200">{{ heading
        }}</h2>

        <p data-aos="fade-right" data-aos-duration="1000" data-aos-delay="300">
          {{ description }}
        </p>

        <button class="vcn-human-cta-button" id="openBundles" @click="openBundles" data-aos="zoom-in"
          data-aos-duration="800" data-aos-delay="400">
          {{ ctaText }}
          <span class="vcn-human-border">
            <span class="vcn-human-play-icon">></span>
          </span>
        </button>
      </div>

      <!-- Right Content - Video/Bundles Area -->
      <div class="vcn-human-right-content">
        <div class="video-container" id="videoContainer">
          <div class="vcn-human-image-wrapper" data-aos="fade-left" data-aos-duration="1000" data-aos-delay="300">
            <video id="myVideo" ref="myVideo" muted loop autoplay playsinline preload="none" class="vcn-human-main-image"></video>
            <!-- <img src="/img/image/skelton.png" class="vcn-human-main-image" /> -->
          </div>
        </div>
      </div>
    </div>

    <!-- Disease Bundles Container -->
    <div class="disease-bundles-container" id="bundlesContainer" :class="{ active: isBundlesActive }">
      <div class="bundles-header">
        <button type="button" class="close-button" id="closeBtn" @click="closeBundles">✕</button>
        <h2 class="bundles-title">
          {{ bundlesTitle }}
        </h2>
        <p class="bundles-subtitle">
          {{ bundlesSubtitle }}
        </p>
      </div>

      <div class="disease-grid">
        <div v-for="(card, i) in diseaseCards" :key="i" class="disease-card">
          <div class="disease-card-image">
            <div class="disease-icon">
              <img :src="cleanUrl(card.image)" :alt="card.title" />
            </div>
          </div>
          <div class="disease-card-body">
            <h3 class="disease-title">{{ card.title }}</h3>
            <NuxtLink :to="card.link" class="learn-more-btn">LEARN MORE</NuxtLink>
          </div>
        </div>
      </div>

      <div class="view-more-section">
        <NuxtLink to="/all-disease-bundles" class="view-more-btn">VIEW MORE</NuxtLink>
      </div>
    </div>
  </section>

</template>

<script>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'
import Hls from 'hls.js';

export default {
  setup() {
    const cmsStore = useCmsStore()
    const { getCmsImageUrl } = useCmsApi()

    const section = computed(() => cmsStore.getSectionByKey('disease-bundles'))

    const heading = computed(() => section.value?.title || 'Trusted Wellness. Growing Opportunities.')
    const description = computed(() => section.value?.description || 'We focus on trusted, research-backed products that support everyday wellness and customer satisfaction. With a growing presence across India, VCN also empowers individuals through meaningful direct selling opportunities.')
    const ctaText = computed(() => section.value?.buttonText || 'Disease Bundles')
    const bundlesTitle = computed(() => section.value?.subtitle || 'Proven Bundles For Your Health Needs!')
    const bundlesSubtitle = computed(() => section.value?.config?.bundlesSubtitle || section.value?.extraData?.bundlesSubtitle || 'Check out our custom bundles based on your current health conditions')

    // Disease cards from CMS items, fallback to hardcoded
    const diseaseCards = computed(() => {
      const fallback = [
        { title: 'Acidity', image: '/img/image/acidty.png', link: '/bundle-details' },
        { title: 'Thyroid', image: '/img/image/thyroid.png', link: '/bundle-details' },
        { title: 'Diabetes', image: '/img/image/diabetes.png', link: '/bundle-details' },
        { title: 'Fatty Liver', image: '/img/image/liver.png', link: '/bundle-details' }
      ]

      const rawItems = section.value?.items || []
      const items = rawItems.filter(item => item && item.title && item.title.trim() !== '')

      if (items.length > 0) {
        return items.map(item => {
          const fallbackItem = fallback.find(
            fb => fb.title.trim().toLowerCase() === item.title?.trim().toLowerCase()
          )
          return {
            title: item.title,
            image: getCmsImageUrl(item.image || item.extraData?.image, '') || fallbackItem?.image || '/img/image/acidty.png',
            link: item.buttonLink || item.extraData?.link || item.config?.link || fallbackItem?.link || '/bundle-details'
          }
        })
      }
      return fallback
    })

    return {
      section,
      heading,
      description,
      ctaText,
      bundlesTitle,
      bundlesSubtitle,
      diseaseCards,
      getCmsImageUrl
    }
  },

  data() {
    return {
      isBundlesActive: false
    };
  },
  created() {
    this.hls = null;
    this.observer = null;
    this.hlsInitialized = false;
  },
  beforeUnmount() {
    // Ensure overflow is restored if component is destroyed while overlay open
    if (process?.client) {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
    }

    // Disconnect observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }

    // Destroy HLS instance to prevent memory leaks and redundant network requests
    if (this.hls) {
      try {
        this.hls.destroy();
      } catch (err) {
        console.error('Error destroying HLS instance:', err);
      }
      this.hls = null;
    }

    // Clean up video element source to stop native stream fetching (especially in Safari)
    const video = this.$refs.myVideo;
    if (video) {
      try {
        video.pause();
        video.removeAttribute("src");
        video.load();
      } catch (err) {
        console.error('Error resetting native video element source:', err);
      }
    }
  },
  mounted() {
    const video = this.$refs.myVideo;

    if (!video) return;

    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;

    const videoSrc =
      "https://stream.mux.com/87tnV011w6GkwNzl7dxntQSNhpcVSJNgSQaqlj3iLTK00.m3u8?redundant_streams=true";

    // Setup intersection observer to lazy-load video when visible in viewport
    if (process.client && 'IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Enter viewport: start loading and play
            if (!this.hlsInitialized) {
              this.initHls(video, videoSrc);
            } else {
              if (this.hls) {
                this.hls.startLoad();
              }
              video.play().catch(() => {});
            }
          } else {
            // Exit viewport: pause and stop loading segments to save bandwidth and API calls
            if (this.hlsInitialized) {
              video.pause();
              if (this.hls) {
                this.hls.stopLoad();
              }
            }
          }
        });
      }, { threshold: 0.1 });

      this.observer.observe(video);
    } else {
      // Fallback if IntersectionObserver not supported
      this.initHls(video, videoSrc);
    }
  },
  methods: {
    cleanUrl(url) {
      if (!url) return '';
      return typeof url === 'string' ? url.replace(/&/g, '') : url;
    },
    openBundles() {
      this.isBundlesActive = true;
      // Prevent background scrolling when the bundles overlay is open
      if (process?.client) {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
      }
    },
    closeBundles() {
      this.isBundlesActive = false;
      // Restore page scrolling
      if (process?.client) {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        document.documentElement.style.height = '';
      }
    },
    initHls(video, videoSrc) {
      if (this.hlsInitialized) return;

      if (Hls.isSupported()) {
        this.hls = new Hls({
          autoStartLoad: true,
        });

        this.hls.loadSource(videoSrc);
        this.hls.attachMedia(video);

        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => { });
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        // Safari (iOS / macOS)
        video.src = videoSrc;
        video.addEventListener("loadedmetadata", () => {
          video.play().catch(() => { });
        });
      }
      this.hlsInitialized = true;
    }
  },
};

</script>

<style scoped>
/* Ensure the disease bundles overlay does not sit under the fixed navbar on this page.
   This style only affects this component and won't change global layout. */
.disease-bundles-container {
  /* offset from top so navbar doesn't overlap */
  top: 80px !important;
  bottom: 0 !important;
  height: calc(100vh - 80px) !important;
  box-sizing: border-box !important;
  /* keep existing stacking but ensure it remains above page content while below global overlays */
  z-index: 10010 !important;
  pointer-events: auto !important;
  overflow-y: auto !important;
  padding-top: 20px;
  /* small internal gap so header content isn't flush to top */
}

.vcn-human-main-image {
  width: 100% !important;
  height: 600px !important;
  object-fit: cover !important;
  border-radius: 24px !important;
}

@media (max-width: 991px) {
  .vcn-human-main-image {
    height: 400px !important;
    border-radius: 20px !important;
  }
}

.vcn-human-heading {
  font-size: 3.2rem !important;
}

@media (max-width: 992px) {
  .vcn-human-section {
    min-height: auto !important;
    padding-top: 30px !important;
    padding-bottom: 30px !important;
  }

  .vcn-human-container {
    gap: 20px !important;
  }

  .vcn-human-left-content {
    text-align: left !important;
    align-items: flex-start !important;
    gap: 20px !important;
    padding: 0 !important;
  }

  .vcn-human-left-content p {
    margin: 0 !important;
  }

  .vcn-human-logo {
    margin: 0 !important;
  }

  .vcn-human-heading {
    font-size: 2.6rem !important;
    margin: 0 !important;
  }

  .disease-bundles-container {
    top: 90px !important;
    height: calc(100vh - 90px) !important;
  }

  .vcn-human-right-content,
  .video-container,
  .vcn-human-image-wrapper {
    margin: 0 !important;
    padding: 0 !important;
    line-height: 0 !important;
  }

  /* .vcn-human-main-image {
    display: block !important;
    height: 100% !important;
    max-height: 650px !important;
    margin: 0 auto !important;
    aspect-ratio: 3/4 !important;
    object-fit: cover !important;
    border-radius: 20px !important;
  } */
}

/* Responsive 2-column layout for disease grid on mobile */
@media (max-width: 576px) {
  .vcn-human-section {
    padding-top: 20px !important;
    padding-bottom: 20px !important;
  }

  .vcn-human-left-content {
    gap: 10px !important;
  }

  .vcn-human-heading {
    font-size: 1.9rem !important;
  }

  .disease-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 12px !important;
  }

  .disease-card {
    border-radius: 12px 12px 12px 0 !important;
  }

  .disease-card-body {
    padding: 12px 8px !important;
  }

  .disease-title {
    font-size: 1rem !important;
    margin-bottom: 10px !important;
  }

  .learn-more-btn {
    padding: 6px 14px !important;
    font-size: 0.75rem !important;
    border-radius: 20px !important;
    display: inline-block !important;
    width: 100% !important;
    box-sizing: border-box !important;
  }
}
</style>

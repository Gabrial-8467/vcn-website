<script setup>
import { computed, ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

const section = computed(() => cmsStore.getSectionByKey('testimonials'))

const title = computed(() => section.value?.title || 'Thousands Are Redefining Their Health with VCN.')
const subtitle = computed(() => section.value?.subtitle || 'Discover how VCN is helping people take control of their wellness journey.')

const isMuted = ref(true)
const isPlayingArray = ref({})

// Testimonial slides from CMS items, fallback to section.image, then hardcoded
const slides = computed(() => {
  const items = section.value?.items || []
  
  const mapped = items.map((item, index) => {
    return {
      image: getCmsImageUrl(item.image, ''),
      video: '/video/video1.mp4',
      alt: item.title || 'Customer testimonial'
    }
  }).filter(s => s.image)

  if (mapped.length > 0) {
    return mapped
  }

  const sectionImage = getCmsImageUrl(section.value?.image, '')
  if (sectionImage) {
    return [{ 
      image: sectionImage, 
      video: '/video/video1.mp4', 
      alt: section.value?.title || 'Customer testimonial' 
    }]
  }

  const hardcoded = [
    { image: '/img/testimonial/testimonial.png', video: '/video/video1.mp4', alt: 'Customer testimonial' },
    { image: '/img/image/testimonial.png', video: '/video/video2.mp4', alt: 'Customer testimonial' },
    { image: '/img/testimonial/testimonial.png', video: '/video/video1.mp4', alt: 'Customer testimonial' },
    { image: '/img/image/testimonial.png', video: '/video/video2.mp4', alt: 'Customer testimonial' }
  ]
  return hardcoded
})

const activeIndex = ref(0)
let swiperInstance = null

const syncVideoStates = () => {
  if (typeof document === 'undefined') return
  const slidesList = document.querySelectorAll('.vcn-swiper-container .swiper-slide')
  slidesList.forEach((slide) => {
    if (!slide.classList.contains('swiper-slide-active')) {
      const video = slide.querySelector('.vcn-testimonial-video')
      if (video) {
        video.pause()
        video.currentTime = 0
      }
    }
  })

  // Reset play states on slide change
  Object.keys(isPlayingArray.value).forEach(k => {
    isPlayingArray.value[k] = false
  })
  if (swiperInstance && swiperInstance.autoplay) {
    swiperInstance.autoplay.start()
  }
}

const handleCardClick = (index, event) => {
  const card = event.currentTarget
  const slide = card.closest('.swiper-slide')
  if (!slide) return

  // Check if the slide is the active one in the frame
  const isActive = slide.classList.contains('swiper-slide-active')
  if (!isActive) {
    // If not active, Swiper's slideToClickedSlide option will transition it into frame
    return
  }

  const video = card.querySelector('.vcn-testimonial-video')
  if (!video) return

  if (video.paused) {
    // Pause all other videos
    const allVideos = document.querySelectorAll('.vcn-testimonial-video')
    allVideos.forEach((v) => {
      v.pause()
      v.currentTime = 0
    })

    // Reset playing state array
    Object.keys(isPlayingArray.value).forEach(k => {
      isPlayingArray.value[k] = false
    })

    // Play this video
    video.muted = isMuted.value
    video.play()
      .then(() => {
        isPlayingArray.value[index] = true
        if (swiperInstance && swiperInstance.autoplay) {
          swiperInstance.autoplay.stop()
        }
      })
      .catch(err => console.warn('Video play failed:', err))
  } else {
    video.pause()
    isPlayingArray.value[index] = false
    if (swiperInstance && swiperInstance.autoplay) {
      swiperInstance.autoplay.start()
    }
  }
}

const handleVideoPlay = (index) => {
  isPlayingArray.value[index] = true
  if (swiperInstance && swiperInstance.autoplay) {
    swiperInstance.autoplay.stop()
  }
}

const handleVideoPause = (index) => {
  isPlayingArray.value[index] = false
  const anyPlaying = Object.values(isPlayingArray.value).some(v => v)
  if (!anyPlaying && swiperInstance && swiperInstance.autoplay) {
    swiperInstance.autoplay.start()
  }
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  const activeSlide = document.querySelector('.vcn-swiper-container .swiper-slide-active')
  const activeVideo = activeSlide?.querySelector('.vcn-testimonial-video')
  if (activeVideo) {
    activeVideo.muted = isMuted.value
  }
}

const initSwiper = () => {
  if (typeof window === 'undefined' || !window.Swiper) return

  // Destroy existing instance if any
  if (swiperInstance) {
    swiperInstance.destroy(true, true)
    swiperInstance = null
  }

  const container = document.querySelector('.vcn-swiper-container')
  if (!container) return

  const slideCount = slides.value.length
  if (slideCount === 0) return

  swiperInstance = new window.Swiper('.vcn-swiper-container', {
    slidesPerView: 1,
    centeredSlides: false,
    spaceBetween: 20,
    slideToClickedSlide: true,
    breakpoints: {
      768: {
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 30
      }
    },
    loop: slideCount >= 2,
    autoplay: slideCount >= 2 ? {
      delay: 4000,
      disableOnInteraction: false,
    } : false,
    pagination: {
      el: '.vcn-custom-pagination',
      clickable: true,
    },
    on: {
      slideChange() {
        activeIndex.value = this.realIndex
        setTimeout(() => {
          syncVideoStates()
        }, 50)
      }
    }
  })

  setTimeout(() => {
    syncVideoStates()
  }, 150)
}

onMounted(() => {
  // Wait a small timeout to make sure DOM is fully settled
  setTimeout(() => {
    if (window.Swiper) {
      initSwiper()
    } else {
      // Fallback polling if script not loaded yet
      const poll = setInterval(() => {
        if (window.Swiper) {
          clearInterval(poll)
          initSwiper()
        }
      }, 100)
    }
  }, 100)
})

// Reinitialize Swiper if slides change dynamically (e.g. after CMS API loads)
watch(slides, () => {
  nextTick(() => {
    initSwiper()
  })
}, { deep: true })

onBeforeUnmount(() => {
  if (swiperInstance) {
    swiperInstance.destroy()
  }
  const videos = document.querySelectorAll('.vcn-testimonial-video')
  videos.forEach(video => {
    video.pause()
  })
})
</script>

<template>
  <section class="vcn-testimonial-section">
    <div class="vcn-testimonial-container">
      <!-- Header -->
      <div class="vcn-testimonial-header">
        <h2 class="vcn-testimonial-title" v-html="title.replace('\\n', '<br>').replace('Their', '<br>Their')"></h2>
        <p class="vcn-testimonial-subtitle">
          {{ subtitle }}
        </p>
      </div>

      <!-- Swiper -->
      <div class="swiper vcn-swiper-container">
        <div class="swiper-wrapper">
          <div v-for="(slide, i) in slides" :key="i" class="swiper-slide">
            <div class="vcn-testimonial-card" @click="handleCardClick(i, $event)">
              <!-- Video Element -->
              <video 
                :id="'video-' + i"
                :src="slide.video" 
                class="vcn-testimonial-video" 
                loop 
                playsinline 
                preload="metadata"
                :muted="isMuted"
                :controls="isPlayingArray[i]"
                controlslist="nodownload"
                @play="handleVideoPlay(i)"
                @pause="handleVideoPause(i)"
              ></video>

              <!-- Thumbnail Image (shows if not playing) -->
              <div v-if="!isPlayingArray[i]" class="vcn-thumbnail-overlay">
                <img :src="slide.image" :alt="slide.alt" class="vcn-testimonial-image" />
              </div>
            </div>
          </div>
        </div>
        <!-- Audio Control (only once) -->
        <div class="vcn-audio-controls-global">
          <button class="vcn-audio-button" @click="toggleMute" aria-label="Toggle mute state">
            <!-- Muted Icon -->
            <svg v-if="isMuted" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
            <!-- Unmuted Icon -->
            <svg v-else viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          </button>
          <img :src="slides[activeIndex]?.image || '/img/testimonial/testimonial.png'" alt="User avatar" class="vcn-user-avatar"
            id="vcn-avatar" />
        </div>

        <!-- Pagination -->
        <div class="vcn-custom-pagination"></div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vcn-testimonial-section {
  background: linear-gradient(180deg, #e8f5e0 0%, #f0f8ec 100%);
  padding: 25px 15px; /* Mobile first padding */
  position: relative;
  overflow: hidden;
}

.vcn-testimonial-container {
  margin: 0 auto;
  width: 100%;
}

.vcn-testimonial-header {
  text-align: center;
  margin-bottom: 35px;
  padding: 0 15px;
}

.vcn-testimonial-title {
  font-size: 48px;
  font-weight: 400;
  color: var(--vcn-darker);
  line-height: 1.3;
  margin-bottom: 16px;
}

.vcn-testimonial-subtitle {
  font-size: 16px;
  color: var(--vcn-dark);
  font-weight: 400;
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

/* Swiper Styles */
.vcn-swiper-container {
  width: 100%;
  /* padding-bottom: 60px; */
}

:deep(.swiper-slide) {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100% !important; /* Full width on mobile/tablet */
}

.vcn-testimonial-card {
  background: #4a5d4a;
  border-radius: 16px;
  overflow: hidden;
  width: 100% !important;
  max-width: 500px !important; /* Original constraints on mobile */
  position: relative;
  aspect-ratio: 16/9.3;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  cursor: grab;
}

.vcn-testimonial-image,
.vcn-testimonial-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  cursor: grab;
}

.vcn-thumbnail-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
}

.vcn-play-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.vcn-testimonial-card:hover .vcn-play-button-overlay {
  background: rgba(0, 0, 0, 0.3);
}

.vcn-play-button {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background-color 0.3s ease;
  padding-left: 5px;
}

.vcn-testimonial-card:hover .vcn-play-button {
  transform: scale(1.1);
  background: #ffffff;
}

.vcn-play-button svg {
  width: 32px;
  height: 32px;
  fill: #4a5d4a;
}

/* Audio Control */
.vcn-audio-controls-global {
  position: relative;
  margin: 20px auto 20px auto;
  background: #c9f5a6;
  border-radius: 40px;
  padding: 6px 10px 6px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: fit-content;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.vcn-audio-controls-global .vcn-audio-button {
  width: 42px;
  height: 42px;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  padding: 0;
}

.vcn-audio-controls-global .vcn-audio-button svg {
  width: 24px;
  height: 24px;
  fill: var(--vcn-footer);
}

.vcn-audio-controls-global .vcn-user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid #fff;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.vcn-user-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 3px solid white;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Custom Pagination */
.vcn-custom-pagination {
  position: relative;
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

/* Default bullets */
.vcn-custom-pagination :deep(.swiper-pagination-bullet) {
  width: 12px;
  height: 12px;
  border: 2px solid var(--vcn-footer);
  background: var(--vcn-footer);
  border-radius: 50%;
  opacity: 1;
  transition: all 0.3s ease;
  cursor: pointer;
}

/* Active bullet */
.vcn-custom-pagination :deep(.swiper-pagination-bullet-active) {
  background: transparent;
  border: 2px solid var(--vcn-footer);
  transform: scale(1.1);
}

/* Big Screen Override (min-width: 768px) */
@media (min-width: 768px) {
  /* .vcn-testimonial-section {
    padding: 80px 0;
  } */

  .vcn-testimonial-header {
    /* margin-bottom: 50px; */
    padding: 0 20px;
  }

  .vcn-testimonial-title {
    font-size: 2.5rem;
  }

  .vcn-testimonial-subtitle {
    font-size: 1rem;
  }

  .vcn-swiper-container {
    overflow: visible !important;
  }

  :deep(.swiper-slide) {
    width: 78vw !important;
    max-width: 1050px !important;
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s ease;
  }

  :deep(.swiper-slide:not(.swiper-slide-active)) {
    opacity: 0.55;
    transform: scale(0.93);
  }

  .vcn-testimonial-card {
    max-width: none !important;
    aspect-ratio: 16/9;
    border-radius: 24px;
  }

  .vcn-custom-pagination {
    margin-top: 30px;
  }

  .vcn-audio-controls-global {
    margin-top: 30px;
  }
}

/* Extra small devices styling */
@media (max-width: 480px) {
  .vcn-testimonial-title {
    font-size: 1.35rem;
  }
}
</style>
<script setup>
import { computed } from 'vue'
import { useCmsStore } from '~/stores/cms'

const cmsStore = useCmsStore()
const footer = computed(() => cmsStore.bottomFooterData || {})
</script>

<template>
  <!-- Awaken Within Section -->
  <div class="bottom-footer-wrapper">
    <section class="vcn-awaken-section" id="awakenSection">
      <!-- Background subtle overlay for mobile / narrow screen legibility -->
      <div class="vcn-awaken-gradient-tint"></div>

      <div class="vcn-awaken-container">
        <!-- Content Area -->
        <div class="vcn-awaken-content">
          <!-- Kicker / Tagline -->
          <div class="vcn-awaken-kicker">
            <span class="vcn-kicker-text">{{ footer?.kicker || 'A HEALTHIER WAY FORWARD' }}</span>
            <span class="vcn-kicker-line" aria-hidden="true"></span>
          </div>

          <!-- Headline -->
          <h2 class="vcn-awaken-title">
            <span class="vcn-title-prefix">{{ footer?.titlePrefix || 'Make Life ' }}</span>
            <span class="vcn-accent-italic">{{ footer?.titleAccent || 'Better.' }}</span>
          </h2>

          <!-- Description -->
          <p class="vcn-awaken-desc">
            {{ footer?.description || 'Everyday wellness, inspired by nature.\nThoughtfully crafted solutions for a healthier, happier you.' }}
          </p>

          <!-- CTAs -->
          <div class="vcn-awaken-actions">
            <NuxtLink :to="footer?.primaryButtonLink || '/all-products'" class="vcn-btn-wellness">
              <span>{{ footer?.primaryButtonText || 'Explore Our Wellness Range' }}</span>
              <span class="vcn-arrow" aria-hidden="true">&rarr;</span>
            </NuxtLink>

            <span class="vcn-actions-divider" aria-hidden="true"></span>

            <NuxtLink :to="footer?.secondaryLinkUrl || '/about-us'" class="vcn-link-philosophy">
              <span class="vcn-link-text">{{ footer?.secondaryLinkText || 'Our philosophy' }}</span>
              <span class="vcn-arrow" aria-hidden="true">&rarr;</span>
            </NuxtLink>
          </div>
        </div>

        <!-- Bottom Divider & Copyright -->
        <div class="vcn-awaken-bottom">
          <div class="vcn-bottom-divider" aria-hidden="true"></div>
          <ClientOnly>
            <div class="vcn-awaken-copyright vcn-loaded" id="awakenCopyright">
              {{ footer?.copyrightText || '© 2025 Falcon Marketing Pvt. Ltd. All rights reserved.' }}
            </div>
          </ClientOnly>
        </div>
      </div>

      <!-- Hidden compatibility anchor for site.client.js observer -->
      <div id="awakenGif" class="vcn-loaded" style="display: none;" aria-hidden="true"></div>
    </section>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap');

/* Bottom Footer Wrapper */
.bottom-footer-wrapper {
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  background-color: #061a10 !important;
  background-image: url("/img/bg/vcn-awaken-bg.png") !important;
  background-repeat: no-repeat !important;
  background-position: right center !important;
  background-size: cover !important;
  overflow: hidden !important;
  isolation: isolate !important;
  box-sizing: border-box !important;
}

/* Awaken Section */
.bottom-footer-wrapper .vcn-awaken-section {
  position: relative !important;
  width: 100% !important;
  max-width: 100% !important;
  min-height: 380px !important;
  display: flex !important;
  flex-direction: column !important;
  justify-content: space-between !important;
  padding-top: 48px !important;
  padding-bottom: 20px !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
  margin: 0 !important;
  box-sizing: border-box !important;
  background: transparent !important;
}

/* Gradient Tint for responsive readability */
.vcn-awaken-gradient-tint {
  position: absolute !important;
  inset: 0 !important;
  top: 0 !important;
  bottom: 0 !important;
  left: 0 !important;
  right: 0 !important;
  width: 100% !important;
  height: 100% !important;
  padding: 0 !important;
  margin: 0 !important;
  pointer-events: none !important;
  z-index: 1 !important;
  background: linear-gradient(
    90deg,
    rgba(6, 26, 16, 0.88) 0%,
    rgba(6, 26, 16, 0.65) 42%,
    rgba(6, 26, 16, 0.15) 75%,
    rgba(6, 26, 16, 0) 100%
  );
}

/* Container */
.vcn-awaken-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 24px;
  padding-right: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 310px;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .vcn-awaken-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Content Column */
.vcn-awaken-content {
  max-width: 540px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

/* Kicker / Tagline */
.vcn-awaken-kicker {
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;
}

.vcn-kicker-text {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(220, 232, 216, 0.78);
  white-space: nowrap;
}

.vcn-kicker-line {
  display: inline-block;
  width: 64px;
  height: 1px;
  background: rgba(255, 255, 255, 0.32);
  margin-left: 14px;
}

/* Title */
.vcn-awaken-title {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-size: 56px;
  font-weight: 500;
  line-height: 1.12;
  color: #ffffff;
  margin: 0 0 16px 0;
  letter-spacing: -0.015em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.vcn-title-prefix {
  color: #ffffff;
}

.vcn-accent-italic {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
  font-style: italic;
  font-weight: 600;
  color: #c8df63;
  margin-left: 4px;
}

/* Description */
.vcn-awaken-desc {
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 15.5px;
  font-weight: 400;
  line-height: 1.55;
  color: rgba(228, 238, 226, 0.84);
  margin: 0 0 24px 0;
  max-width: 440px;
  white-space: pre-line;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}

/* Actions Row */
.vcn-awaken-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
}

/* Primary Wellness Button */
.vcn-btn-wellness {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background-color: #e2eccd;
  color: #122417;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.01em;
  padding: 11px 24px;
  border-radius: 9999px;
  text-decoration: none;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
}

.vcn-btn-wellness .vcn-arrow {
  font-size: 15px;
  transition: transform 0.25s ease;
  line-height: 1;
}

.vcn-btn-wellness:hover {
  background-color: #ecf6d7;
  color: #0b1a10;
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
}

.vcn-btn-wellness:hover .vcn-arrow {
  transform: translateX(4px);
}

/* Divider between actions */
.vcn-actions-divider {
  display: inline-block;
  width: 1px;
  height: 22px;
  background-color: rgba(255, 255, 255, 0.28);
  margin: 0 8px;
}

/* Secondary Philosophy Link */
.vcn-link-philosophy {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.92);
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.25s ease;
  white-space: nowrap;
}

.vcn-link-philosophy .vcn-link-text {
  text-decoration: underline;
  text-underline-offset: 4px;
  text-decoration-thickness: 1px;
}

.vcn-link-philosophy .vcn-arrow {
  font-size: 14px;
  transition: transform 0.25s ease;
  line-height: 1;
}

.vcn-link-philosophy:hover {
  color: #c8df63;
}

.vcn-link-philosophy:hover .vcn-arrow {
  transform: translateX(4px);
}

/* Bottom Divider & Copyright */
.vcn-awaken-bottom {
  width: 100%;
  margin-top: 36px;
}

.vcn-bottom-divider {
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.16);
  margin-bottom: 14px;
  display: none !important;
}

.bottom-footer-wrapper .vcn-awaken-copyright {
  position: relative !important;
  color: rgba(255, 255, 255, 0.62) !important;
  font-family: 'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
  font-size: 12.5px !important;
  font-weight: 400 !important;
  letter-spacing: 0.015em !important;
  text-align: center !important;
  margin: 0 !important;
  padding-top: 12px !important;
  padding-bottom: 5px !important;
  opacity: 1 !important;
  visibility: visible !important;
  transition: color 0.3s ease !important;
}

/* Responsive Breakpoints */
@media (max-width: 1200px) {
  .vcn-awaken-title {
    font-size: 48px;
  }

  .vcn-awaken-desc {
    font-size: 15px;
  }
}

@media (max-width: 991px) {
  .bottom-footer-wrapper {
    background-position: 70% center !important;
  }

  .vcn-awaken-gradient-tint {
    background: linear-gradient(
      90deg,
      rgba(6, 26, 16, 0.92) 0%,
      rgba(6, 26, 16, 0.78) 55%,
      rgba(6, 26, 16, 0.4) 100%
    );
  }

  .vcn-awaken-title {
    font-size: 42px;
  }
}

@media (max-width: 767px) {
  .bottom-footer-wrapper .vcn-awaken-section {
    padding: 36px 0 16px 0 !important;
    min-height: auto !important;
  }

  .bottom-footer-wrapper {
    background-position: 65% center !important;
  }

  .vcn-awaken-gradient-tint {
    background: linear-gradient(
      180deg,
      rgba(6, 26, 16, 0.88) 0%,
      rgba(6, 26, 16, 0.82) 60%,
      rgba(6, 26, 16, 0.92) 100%
    );
  }

  .vcn-awaken-container {
    min-height: auto;
  }

  .vcn-awaken-content {
    max-width: 100%;
  }

  .vcn-awaken-kicker {
    margin-bottom: 8px;
  }

  .vcn-kicker-text {
    font-size: 11px;
    letter-spacing: 0.14em;
  }

  .vcn-kicker-line {
    width: 40px;
    margin-left: 10px;
  }

  .vcn-awaken-title {
    font-size: 34px;
    margin-bottom: 12px;
  }

  .vcn-awaken-desc {
    font-size: 14px;
    line-height: 1.5;
    margin-bottom: 20px;
  }

  .vcn-awaken-actions {
    gap: 12px;
  }

  .vcn-btn-wellness {
    padding: 10px 20px;
    font-size: 13.5px;
  }

  .vcn-actions-divider {
    display: none;
  }

  .vcn-awaken-bottom {
    margin-top: 28px;
  }

  .bottom-footer-wrapper .vcn-awaken-copyright {
    font-size: 11.5px !important;
  }
}

@media (max-width: 480px) {
  .vcn-awaken-title {
    font-size: 29px;
  }

  .vcn-btn-wellness {
    width: 100%;
    justify-content: center;
  }

  .vcn-link-philosophy {
    width: 100%;
    justify-content: center;
    margin-top: 4px;
  }
}
</style>
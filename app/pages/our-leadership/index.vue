<template>
  <section class="product-detail-section mt-3">
    <div class="container">
      <div class="row">
        <!-- Left Sidebar Navigation -->
        <div class="col-lg-3 sidebar-section">
          <AboutSidebar />
        </div>

        <div class="col-md-9 col-lg-9 lp-content-col">
          <div class="lp-root">

            <!-- ═══════════════════════════════════════════
                 HERO – banner with image and transparent overlay
            ═══════════════════════════════════════════ -->
            <div class="lp-hero" :style="{ backgroundImage: `url(${leadership.hero.image})` }" data-aos="fade-up" data-aos-duration="700">
              <div class="lp-hero-overlay"></div>
              <div class="lp-hero-content">
                <p class="lp-eyebrow">LEGACY OF TRUST</p>
                <h1 class="lp-headline">{{ leadership.hero.title }}</h1>
                <p class="lp-hero-body" v-if="leadership.hero.description">{{ leadership.hero.description }}</p>
                <p class="lp-hero-body" v-else>
                  At VCN Lifestyle, our board is guided by a collective vision of radical transparency
                  and holistic integrity. We believe that true wellness stems from ethical foundations
                  and a steadfast commitment to scientific excellence.
                </p>
              </div>
            </div>

            <!-- ═══════════════════════════════════════════
                 BOARD OF DIRECTORS
            ═══════════════════════════════════════════ -->
            <div class="lp-board" data-aos="fade-up" data-aos-duration="700" data-aos-delay="100">
              <div class="lp-board-head">
                <h2 class="lp-board-title">{{ leadership.boardSection.title }}</h2>
                <span class="lp-board-bar"></span>
              </div>

              <ul class="lp-member-list">
                <li
                  v-for="(member, i) in leadership.boardSection.members"
                  :key="i"
                  class="lp-member"
                  data-aos="fade-up"
                  :data-aos-delay="i * 80"
                  data-aos-duration="500"
                >
                  <!-- circular photo -->
                  <div class="lp-photo-wrap">
                    <img
                      :src="member.image"
                      :alt="member.name"
                      class="lp-photo"
                    />
                  </div>

                  <!-- text block -->
                  <div class="lp-member-body">
                    <h3 class="lp-mname">{{ member.name }}</h3>
                    <p class="lp-mrole">{{ member.title }}</p>
                    <p class="lp-mbio">{{ member.bio }}</p>
                    <button class="lp-bio-btn" @click="openBio(member)">
                      View Bio
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>
                </li>
              </ul>
            </div>

            <!-- ═══════════════════════════════════════════
                 CONNECT SECTION  –  dark olive card
            ═══════════════════════════════════════════ -->
            <div class="lp-connect" data-aos="fade-up" data-aos-duration="700">
              <!-- Background highlights -->
              <div class="lp-connect-bg-glow"></div>
              <div class="lp-connect-orb"></div>

              <div class="lp-connect-inner">
                <!-- Left Content Block -->
                <div class="lp-connect-text">
                  <span class="lp-connect-eyebrow">Direct Channel</span>
                  <h2 class="lp-ct-title">{{ leadership.connectSection.title }}</h2>
                  <p class="lp-ct-body">{{ leadership.connectSection.description }}</p>
                </div>

                <!-- Right Action Block -->
                <div class="lp-connect-action-block">
                  <div class="lp-connect-icon">
                    <div class="lp-icon-ring">
                      <i class="bi bi-envelope-open-fill"></i>
                    </div>
                  </div>
                  <button class="lp-btn-primary lp-connect-btn">
                    <span>{{ leadership.connectSection.buttonText }}</span>
                    <i class="bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>

          </div><!-- /lp-root -->
        </div>
      </div>
    </div>
  </section>

  <!-- ═══════════════════════════════════════════
       BIO MODAL (teleported to body)
  ═══════════════════════════════════════════ -->
  <Transition name="lp-fade">
    <div v-if="showModal" class="lp-modal-backdrop" @click.self="closeBio">
      <div class="lp-modal">
        <button class="lp-modal-close" @click="closeBio" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div class="lp-modal-grid">
          <div class="lp-modal-photo">
            <img :src="selectedMember.image" :alt="selectedMember.name" />
          </div>
          <div class="lp-modal-info">
            <h2 class="lp-modal-name">{{ selectedMember.name }}</h2>
            <p class="lp-modal-role">{{ selectedMember.title }}</p>
            <hr class="lp-modal-hr" />
            <p class="lp-modal-bio">{{ selectedMember.bio }}</p>

            <div class="lp-modal-creds" v-if="selectedMember.education || selectedMember.experience">
              <div v-if="selectedMember.education" class="lp-cred">
                <div class="lp-cred-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/>
                  </svg>
                  <span>Education</span>
                </div>
                <p>{{ selectedMember.education }}</p>
              </div>
              <div v-if="selectedMember.experience" class="lp-cred">
                <div class="lp-cred-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                  </svg>
                  <span>Experience</span>
                </div>
                <p>{{ selectedMember.experience }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useCmsStore } from '~/stores/cms'
import { useCmsApi } from '~/composables/useCmsApi'

const cmsStore = useCmsStore()
const { getCmsImageUrl } = useCmsApi()

await useAsyncData('leadership-cms', () => cmsStore.fetchSectionsBySlug('leadership'))

const leadership = computed(() => {
  const sections = cmsStore.currentPage?.sections || []
  const heroSec    = sections.find(s => s.name === 'hero'          || s.sectionKey === 'leadership-hero')
  const boardSec   = sections.find(s => s.name === 'boardSection'  || s.sectionKey === 'leadership-board')
  const connectSec = sections.find(s => s.name === 'connectSection'|| s.sectionKey === 'leadership-connect')
  const fallback   = cmsStore.getPageSection('about', 'leadership')

  // hero image
  const rawHeroImg = heroSec?.image || heroSec?.extraData?.image
  const heroImage  = rawHeroImg
    ? (typeof rawHeroImg === 'string' ? rawHeroImg : getCmsImageUrl(rawHeroImg))
    : (fallback?.hero?.image || '/img/leadership/ourleadership.jpeg')

  // board members
  const fallbackMembers = fallback?.boardSection?.members || []
  let parsedMembers = fallbackMembers
  if (boardSec?.items?.length > 0) {
    parsedMembers = boardSec.items.map(m => {
      const rawImg = m.image || m.extraData?.image
      const memberImage = rawImg
        ? (typeof rawImg === 'string' ? rawImg : getCmsImageUrl(rawImg))
        : ''
      const mName   = m.extraData?.name || m.title || ''
      const fbMatch = fallbackMembers.find(fm => fm.name.trim().toLowerCase() === mName.trim().toLowerCase())
      return {
        name:  mName,
        title: m.extraData?.title || m.subtitle || '',
        image: memberImage || fbMatch?.image || '/img/leadership/our team.png',
        bio:   m.extraData?.bio || m.description || ''
      }
    })
  }

  return {
    hero: {
      title:       heroSec?.title       || fallback?.hero?.title       || 'Our leadership',
      description: heroSec?.description || fallback?.hero?.description || '',
      image:       heroImage
    },
    boardSection: {
      title:   boardSec?.title || fallback?.boardSection?.title || 'Board of Directors',
      btntext: boardSec?.items?.[0]?.extraData?.btntext || fallback?.boardSection?.btntext || 'View Bio',
      members: parsedMembers
    },
    connectSection: {
      title:       connectSec?.title       || fallback?.connectSection?.title       || 'Connect with our leadership',
      description: connectSec?.description || fallback?.connectSection?.description || '',
      buttonText:  connectSec?.buttonText  || fallback?.connectSection?.buttonText  || 'Contact the Board',
      icon:        connectSec?.extraData?._extraData?.icon || fallback?.connectSection?.icon || 'bi-people'
    }
  }
})

useHead({ bodyAttrs: { class: 'product-details-page' } })

const showModal      = ref(false)
const selectedMember = ref({})

const openBio = (member) => {
  selectedMember.value = member
  showModal.value      = true
  document.body.style.overflow = 'hidden'
}
const closeBio = () => {
  showModal.value = false
  document.body.style.overflow = 'auto'
}
</script>

<style scoped>
/* ─── layout wrapper ────────────────────────────────── */
.lp-content-col { padding-left: 0; padding-right: 0; }

.lp-root {
  font-family: 'Outfit', 'Inter', -apple-system, sans-serif;
  color: #2c3e50;
  background: #ffffff;
  padding-bottom: 60px;
}

/* ─── HERO ──────────────────────────────────────────── */
.lp-hero {
  position: relative;
  height: 400px;
  border-radius: 16px;
  overflow: hidden;
  margin: 24px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-end;
  box-shadow: 0 10px 30px rgba(29, 69, 3, 0.03);
  text-align: left;
}

.lp-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(29, 69, 3, 0.72) 0%,
    rgba(29, 69, 3, 0.30) 60%,
    transparent 100%
  );
  z-index: 1;
}

.lp-hero-content {
  position: relative;
  padding: 45px;
  z-index: 2;
  max-width: 650px;
  text-align: left;
}

.lp-eyebrow {
  font-size: 12px !important;
  font-weight: 400 !important;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: var(--vcn-badge, #d3fa99) !important;
  margin: 0 0 12px !important;
  display: block;
}

.lp-headline {
  font-size: 48px !important;
  font-weight: 400 !important;
  color: var(--vcn-white, #fff) !important;
  margin: 0 0 16px 0 !important;
  line-height: 1.1 !important;
}

.lp-hero-body {
  font-size: 16px !important;
  line-height: 1.6 !important;
  color: rgba(255, 255, 255, 0.85) !important;
  max-width: 650px !important;
  margin: 0 !important;
}

/* ─── BOARD ─────────────────────────────────────────── */
.lp-board {
  padding: 0 60px 50px;
}

.lp-board-head {
  margin-bottom: 32px;
}

.lp-board-title {
  font-size: 48px;
  font-weight: 400;
  color: #1c3625;
  margin: 60px 0 10px;
}

.lp-board-bar {
  display: block;
  width: 36px;
  height: 3px;
  background: #b89047;
  border-radius: 2px;
}

/* member list */
.lp-member-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.lp-member {
  display: flex;
  align-items: flex-start;
  gap: 32px;
  padding: 32px 0;
  border-bottom: 1px solid #e8eceb;
  transition: background 0.2s;
}

.lp-member:first-child {
  border-top: 1px solid #e8eceb;
}

/* circular photo */
.lp-photo-wrap {
  flex-shrink: 0;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  overflow: hidden;
  background: #edf2ee;
  box-shadow: 0 4px 16px rgba(0,0,0,0.10);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
}

.lp-member:hover .lp-photo-wrap {
  transform: scale(1.05);
  box-shadow: 0 10px 28px rgba(0,0,0,0.14);
}

.lp-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

/* text */
.lp-member-body {
  flex: 1;
  padding-top: 10px;
}

.lp-mname {
  font-size: 32px;
  font-weight: 400;
  color: #1c3625;
  margin: 0 0 4px;
}

.lp-mrole {
  font-size: 16px !important;
  font-weight: 400;
  color: #8c9e93;
  text-transform: capitalize;
  letter-spacing: 0.3px;
  margin: 0 0 12px;
}

.lp-mbio {
  font-size: 16px !important;
  line-height: 1.75;
  color: #5e7265;
  margin: 0 0 18px;
  max-width: 500px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* View Bio button — matches reference (dark green, small, rounded) */
.lp-bio-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: linear-gradient(135deg, #1D4503 0%, #112902 100%) !important;
  color: #ffffff;
  border: none;
  border-radius: 7px;
  padding: 9px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  letter-spacing: 0.2px;
  transition: background 0.25s, transform 0.2s, box-shadow 0.25s;
}

.lp-bio-btn svg {
  transition: transform 0.25s;
  flex-shrink: 0;
}

.lp-bio-btn:hover {
  background: #1c3625;
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(28,54,37,0.22);
}

.lp-bio-btn:hover svg {
  transform: translateX(3px);
}

/* ─── CONNECT CARD ──────────────────────────────────── */
.lp-connect {
  margin: 40px 24px 0;
  background: linear-gradient(135deg, #1D4503 0%, #112902 100%) !important;
  border-radius: 24px !important;
  padding: 60px 70px !important;
  position: relative;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(29, 69, 3, 0.25) !important;
  border: 1px solid rgba(255, 255, 255, 0.08) !important;
  width: auto !important;
}

.lp-connect-bg-glow {
  position: absolute;
  top: -50%;
  left: -20%;
  width: 70%;
  height: 200%;
  background: radial-gradient(circle, rgba(211, 250, 153, 0.06) 0%, transparent 60%);
  pointer-events: none;
  z-index: 1;
}

.lp-connect-orb {
  position: absolute;
  bottom: -90px;
  right: -90px;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.06) 0%, transparent 70%);
  border-radius: 50%;
  pointer-events: none;
  z-index: 1;
}

.lp-connect-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 50px;
  position: relative;
  z-index: 2;
}

.lp-connect-text {
  flex: 1;
  max-width: 580px;
}

.lp-connect-eyebrow {
  color: var(--vcn-badge, #d3fa99);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 16px;
  display: block;
}

.lp-ct-title {
  font-family: 'Outfit', sans-serif !important;
  font-size: 40px !important;
  font-weight: 400 !important;
  color: #ffffff !important;
  line-height: 1.2 !important;
  margin: 0 0 16px !important;
  max-width: 100% !important;
}

.lp-ct-body {
  font-size: 1.05rem !important;
  line-height: 1.65 !important;
  color: rgba(255, 255, 255, 0.8) !important;
  margin: 0 !important;
  max-width: 100% !important;
}

.lp-connect-action-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}

.lp-connect-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lp-icon-ring {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vcn-badge, #d3fa99);
  font-size: 34px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
}

.lp-connect:hover .lp-icon-ring {
  transform: scale(1.05) rotate(5deg);
  border-color: var(--vcn-badge, #d3fa99);
  color: white;
  background: rgba(211, 250, 153, 0.1);
  box-shadow: 0 15px 40px rgba(211, 250, 153, 0.15);
}

.lp-connect-btn {
  background: white !important;
  color: var(--vcn-darker, #1C3A13) !important;
  border: 1px solid white !important;
  padding: 14px 36px !important;
  border-radius: 30px !important;
  font-weight: 600 !important;
  font-size: 0.95rem !important;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1) !important;
}

.lp-connect-btn i {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.lp-connect-btn:hover {
  background: var(--vcn-badge, #d3fa99) !important;
  color: var(--vcn-darker, #1C3A13) !important;
  border-color: var(--vcn-badge, #d3fa99) !important;
  transform: translateY(-3px) !important;
  box-shadow: 0 15px 35px rgba(211, 250, 153, 0.25) !important;
}

.lp-connect-btn:hover i {
  transform: translateX(4px);
}

/* ─── MODAL ─────────────────────────────────────────── */
.lp-modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(10,28,16,0.72);
  backdrop-filter: blur(14px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 24px;
}

.lp-modal {
  background: #ffffff;
  border-radius: 22px;
  max-width: 920px;
  width: 100%;
  max-height: 88vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 32px 64px rgba(0,0,0,0.28);
}

.lp-modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: #ffffff;
  border: 1px solid rgba(0,0,0,0.09);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1c3625;
  cursor: pointer;
  z-index: 10;
  transition: background 0.25s, transform 0.25s;
  box-shadow: 0 3px 10px rgba(0,0,0,0.07);
}

.lp-modal-close:hover {
  background: #1c3625;
  color: #ffffff;
  transform: rotate(90deg);
}

.lp-modal-grid {
  display: grid;
  grid-template-columns: 1fr;
}

@media (min-width: 992px) {
  .lp-modal-grid { grid-template-columns: 40% 60%; }
}

.lp-modal-photo {
  background: #eef2ee;
  min-height: 380px;
  overflow: hidden;
}

@media (min-width: 992px) {
  .lp-modal-photo { min-height: 520px; }
}

.lp-modal-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
  display: block;
}

.lp-modal-info {
  padding: 36px 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.lp-modal-name {
  font-size: 32px !important;
  font-weight: 400;
  color: #1c3625;
  margin: 0 0 6px;
}

.lp-modal-role {
  font-size: 16px !important;
  font-weight: 400 !important;
  color: #8c9e93;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
}

.lp-modal-hr {
  border: none;
  border-top: 1px solid rgba(0,0,0,0.07);
  margin: 20px 0 22px;
}

.lp-modal-bio {
  font-size: 16px !important;
  line-height: 1.85;
  color: #4a5568;
  margin: 0 0 24px;
}

.lp-modal-creds {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  border-top: 1px solid rgba(0,0,0,0.06);
  padding-top: 22px;
}

.lp-cred { display: flex; flex-direction: column; gap: 6px; }

.lp-cred-label {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #b89047;
}

.lp-cred-label span {
  font-size: 13px;
  font-weight: 700;
  color: #1c3625;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.lp-cred p {
  font-size: 13.5px;
  line-height: 1.6;
  color: #718096;
  margin: 0;
}

/* ─── TRANSITION ─────────────────────────────────────── */
.lp-fade-enter-active,
.lp-fade-leave-active { transition: opacity 0.28s ease; }
.lp-fade-enter-from,
.lp-fade-leave-to     { opacity: 0; }

/* ─── RESPONSIVE ─────────────────────────────────────── */
@media (max-width: 991px) {
  .lp-hero {
    height: auto;
    min-height: 250px;
    align-items: center;
    margin: 20px 0 10px 0 !important;
  }
  .lp-hero-content {
    padding: 30px 20px;
  }
  .lp-headline {
    font-size: 32px !important;
  }

  .lp-board {
    padding: 0 0 32px 0 !important;
  }

  .lp-member {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 16px;
    padding: 24px 0;
  }

  .lp-mbio { margin-left: auto; margin-right: auto; }

  .lp-bio-btn { align-self: center; }

  .lp-connect {
    margin: 30px 0 0 0 !important;
    border-radius: 20px !important;
    padding: 40px 30px !important;
    width: auto !important;
  }
  .lp-connect-inner {
    flex-direction: column !important;
    text-align: center !important;
    gap: 30px !important;
  }
  .lp-connect-action-block {
    width: 100% !important;
  }
  .lp-connect-btn {
    width: 100% !important;
    justify-content: center !important;
  }
  .lp-connect-icon {
    display: flex !important;
  }

  .lp-modal-creds { grid-template-columns: 1fr; }
  .lp-modal-info  { padding: 28px 24px; }
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
}
</style>

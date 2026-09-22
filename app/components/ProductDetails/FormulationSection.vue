<template>
  <section class="fs2-section">
    <div class="fs2-container">

      <!-- Left: Heading + callouts stacked -->
      <div class="fs2-left">
        <span class="fs2-overline">2-in-1 Formula</span>
        <h2 class="fs2-title">Engineered for Total Diabetic Wellness</h2>
        <p class="fs2-body">DBT Care Plus unique herbal blend delivers targeted action — controlling blood sugar fast while repairing your body from within.</p>

        <div class="fs2-callout-stack">
          <div class="fs2-callout">
            <div class="fs2-callout-num">01</div>
            <div class="fs2-callout-content">
              <div class="fs2-callout-title">Blood Sugar Control Blend</div>
              <div class="fs2-callout-sub">For Immediate Relief</div>
              <p class="fs2-callout-body">Karela, Gurmar, Neem & Vijayasar actively reduce high blood glucose, stimulate insulin production and purify the blood from Day 1.*</p>
            </div>
          </div>
          <div class="fs2-divider"></div>
          <div class="fs2-callout">
            <div class="fs2-callout-num">02</div>
            <div class="fs2-callout-content">
              <div class="fs2-callout-title">Organ Repair & Detox Blend</div>
              <div class="fs2-callout-sub">For Long Term Wellness</div>
              <p class="fs2-callout-body">Shudh Shilajit, Punarnava, Aloe Vera & Chirata repair damaged pancreatic cells, detoxify the body and support liver, kidney and eye health.*</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right: GIF + video -->
      <div class="fs2-right">
        <div class="fs2-media-card">
          <div class="fs2-gif-wrap">
            <img src="/gif/Capsule-GIF-2.gif" alt="DBT Care Plus capsule animation" class="fs2-gif" />
          </div>
          <video src="" class="fs2-video" autoplay muted loop playsinline></video>
          <div class="fs2-media-badge">
            <span class="fs2-mb-text">2-in-1<br>Formula</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.fs2-section {
  background: #ffffff;
  padding: 80px 0;
  overflow: hidden;
}

.fs2-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 32px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}

@media (max-width: 991px) {
  .fs2-container {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .fs2-section { padding: 56px 0; }
}

/* Left */
.fs2-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #5E6C1F;
  margin-bottom: 18px;
  padding: 5px 14px;
  border: 1px solid rgba(94,108,31,0.3);
  border-radius: 20px;
}

.fs2-title {
  font-family: "Outfit", sans-serif;
  font-size: clamp(28px, 3.5vw, 44px);
  font-weight: 800;
  color: #0d1f0a;
  line-height: 1.1;
  letter-spacing: -1px;
  margin: 0 0 20px 0;
}

.fs2-body {
  font-size: 15px;
  line-height: 1.7;
  color: #666;
  margin: 0 0 40px 0;
  max-width: 440px;
}

/* Callout stack */
.fs2-callout-stack { display: flex; flex-direction: column; gap: 0; }

.fs2-callout {
  display: flex;
  gap: 22px;
  padding: 24px 0;
  align-items: flex-start;
}

.fs2-callout-num {
  font-size: 13px;
  font-weight: 900;
  color: #d3fa99;
  background: #1C3A13;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  letter-spacing: 0.5px;
}

.fs2-callout-title {
  font-size: 16px;
  font-weight: 700;
  color: #0d1f0a;
  margin-bottom: 4px;
}

.fs2-callout-sub {
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #5E6C1F;
  margin-bottom: 10px;
}

.fs2-callout-body {
  font-size: 13.5px;
  line-height: 1.6;
  color: #777;
  margin: 0;
}

.fs2-divider {
  height: 1px;
  background: #eee;
  width: 100%;
}

/* Right: media card */
.fs2-right { display: flex; justify-content: center; }

.fs2-media-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: #F6F7EE;
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 460px;
}

.fs2-gif-wrap {
  position: relative;
  z-index: 2;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fs2-gif {
  width: 100%;
  max-width: 280px;
  height: auto;
  filter: drop-shadow(0 20px 48px rgba(0,0,0,0.18));
  display: block;
}

.fs2-video {
  display: none;
}

.fs2-media-badge {
  position: absolute;
  bottom: 24px;
  right: 24px;
  background: #1C3A13;
  border-radius: 14px;
  padding: 14px 18px;
}
.fs2-mb-text {
  font-size: 13px;
  font-weight: 800;
  color: #d3fa99;
  line-height: 1.3;
}

@media (max-width: 576px) {
  .fs2-media-card { min-height: 320px; }
  .fs2-gif { max-width: 200px; }
}
</style>
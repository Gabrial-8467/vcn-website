<template>
  <section class="cmp-section">
    <div class="cmp-container">

      <!-- Section Header -->
      <div class="cmp-header">
        <span class="cmp-overline">WHY CHOOSE VCN</span>
        <h2 class="cmp-title">How We Compare</h2>
        <p class="cmp-sub">See why thousands choose VCN over ordinary alternatives.</p>
      </div>

      <!-- Comparison Table Card -->
      <div class="cmp-card">
        <div class="cmp-table">

          <!-- Table Header (desktop only — stacked cards carry their own labels) -->
          <div class="cmp-row cmp-row-header">
            <div class="cmp-col cmp-col-feature">FEATURE</div>
            <div class="cmp-col cmp-col-vcn">
              <svg class="cmp-hdr-check" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <div class="cmp-vcn-title">
                <strong>VCN</strong>
                <span>{{ productName }}</span>
              </div>
            </div>
            <div class="cmp-col cmp-col-ordinary">ORDINARY REMEDIES</div>
          </div>

          <!-- Table Rows -->
          <div v-for="(row, i) in comparisonRows" :key="i" class="cmp-row">
            <div class="cmp-col cmp-col-feature">
              <span class="cmp-col-text">{{ row.feature }}</span>
            </div>
            <div class="cmp-col cmp-col-vcn">
              <span class="cmp-col-tag">VCN</span>
              <svg class="cmp-icon cmp-icon-check" fill="none" stroke="currentColor" stroke-width="2.8" viewBox="0 0 24 24" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span class="cmp-col-text">{{ row.vcn }}</span>
            </div>
            <div class="cmp-col cmp-col-ordinary">
              <span class="cmp-col-tag">Ordinary</span>
              <svg class="cmp-icon cmp-icon-cross" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
              </svg>
              <span class="cmp-col-text">{{ row.ordinary }}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useProductStore } from '~/stores/product'

const productStore = useProductStore()
const productName = computed(() => productStore.selectedProduct?.name || 'DBT Care Plus')

const comparisonRows = [
  {
    feature: 'Formulation Basis',
    vcn: '100% Ayurvedic herbs with standardized extracts',
    ordinary: 'Synthetic compounds, fillers & binders'
  },
  {
    feature: 'Active Ingredient Quality',
    vcn: 'Clinically potent, standardized concentration',
    ordinary: 'Variable, often sub-therapeutic doses'
  },
  {
    feature: 'Extraction Method',
    vcn: 'Dual extraction (hot water + cold press)',
    ordinary: 'Single crude extraction'
  },
  {
    feature: 'AYUSH/GMP Certified',
    vcn: 'Yes — GMP, AYUSH & Lab Tested',
    ordinary: 'Often unverified or uncertified'
  },
  {
    feature: 'Side Effects',
    vcn: 'None — naturally safe for long-term use',
    ordinary: 'Liver strain, GI side effects common'
  },
  {
    feature: 'Artificial Additives',
    vcn: 'Zero preservatives or synthetic additives',
    ordinary: 'Often includes artificial flavors & colors'
  },
  {
    feature: 'Efficacy Timeline',
    vcn: 'Measurable results from Week 1',
    ordinary: 'Inconsistent or delayed results'
  },
  {
    feature: 'Complete Body Support',
    vcn: 'Multi-organ: pancreas, liver, kidney, gut',
    ordinary: 'Single-organ or symptom relief only'
  }
]
</script>

<style scoped>
.cmp-section {
  background: #0E2917;
  color: #ffffff;
  padding: 80px 0 96px;
  font-family: var(--vcn-font, "Outfit", sans-serif);
}

.cmp-container {
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 24px;
}

.cmp-header {
  text-align: center;
  margin-bottom: 48px;
}

.cmp-overline {
  display: inline-block;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1.5px;
  color: #8EF375;
  background: rgba(142, 243, 117, 0.1);
  border: 1px solid rgba(142, 243, 117, 0.3);
  padding: 4px 14px;
  border-radius: 20px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.cmp-title {
  font-size: clamp(32px, 3.5vw, 44px);
  font-weight: 800;
  color: #ffffff;
  margin: 0 0 12px 0;
  letter-spacing: -0.5px;
}

.cmp-sub {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

/* Card & Table Layout */
.cmp-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  overflow: hidden;
}

.cmp-table {
  display: flex;
  flex-direction: column;
}

.cmp-row {
  display: grid;
  grid-template-columns: 1.1fr 1.35fr 1.25fr;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  align-items: center;
}

.cmp-row:last-child {
  border-bottom: none;
}

.cmp-row-header {
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.cmp-col {
  padding: 18px 24px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  line-height: 1.4;
  /* Allow long words to wrap instead of forcing the grid column wider */
  min-width: 0;
}

.cmp-col-feature {
  color: rgba(255, 255, 255, 0.85);
  font-weight: 600;
}

/* VCN Column Highlight */
.cmp-col-vcn {
  background: rgba(142, 243, 117, 0.08);
  border-left: 1px solid rgba(142, 243, 117, 0.15);
  border-right: 1px solid rgba(142, 243, 117, 0.15);
  color: #ffffff;
  font-weight: 600;
}

.cmp-row-header .cmp-col-vcn {
  background: rgba(142, 243, 117, 0.18);
  color: #8EF375;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cmp-hdr-check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  color: #8EF375;
}

.cmp-vcn-title {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
  min-width: 0;
}

.cmp-vcn-title strong {
  font-size: 13px;
  letter-spacing: 0.5px;
}

.cmp-vcn-title span {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
  overflow-wrap: break-word;
}

.cmp-col-ordinary {
  color: rgba(255, 255, 255, 0.55);
}

.cmp-icon {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.cmp-icon-check {
  color: #8EF375;
}

.cmp-icon-cross {
  color: rgba(255, 255, 255, 0.35);
}

.cmp-col-text {
  min-width: 0;
  overflow-wrap: break-word;
}

/* Per-cell label — only used by the stacked mobile cards */
.cmp-col-tag {
  display: none;
}

/* ── Tablet: tighten density, keep the 3-column table ── */
@media (max-width: 991.98px) {
  .cmp-col {
    padding: 14px 16px;
    font-size: 12.5px;
  }
}

/* ── Mobile: stack each feature into its own card ── */
@media (max-width: 767.98px) {
  .cmp-section {
    padding: 56px 0;
  }

  .cmp-container {
    padding: 0 16px;
  }

  .cmp-header {
    margin-bottom: 32px;
  }

  .cmp-card {
    background: transparent;
    border: none;
    border-radius: 0;
    overflow: visible;
  }

  /* The table header is redundant once each row carries its own labels */
  .cmp-row-header {
    display: none;
  }

  .cmp-table {
    gap: 12px;
  }

  .cmp-row {
    display: block;
    grid-template-columns: none;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 14px;
    background: rgba(255, 255, 255, 0.03);
    overflow: hidden;
  }

  .cmp-col {
    padding: 12px 14px;
    align-items: flex-start;
    font-size: 13.5px;
    gap: 10px;
    line-height: 1.45;
  }

  /* Feature name becomes the card heading */
  .cmp-col-feature {
    color: #ffffff;
    font-weight: 700;
    font-size: 14px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    padding-bottom: 11px;
    background: rgba(255, 255, 255, 0.02);
  }

  /* Highlight becomes a left accent bar rather than a full column fill */
  .cmp-col-vcn {
    border-left: 3px solid #8EF375;
    border-right: none;
    background: rgba(142, 243, 117, 0.06);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .cmp-col-ordinary {
    border-left: 3px solid rgba(255, 255, 255, 0.2);
    background: rgba(0, 0, 0, 0.15);
  }

  .cmp-col-tag {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 2px 7px;
    border-radius: 6px;
    line-height: 1.3;
    margin-top: 1px;
  }

  .cmp-col-vcn .cmp-col-tag {
    background: rgba(142, 243, 117, 0.18);
    color: #8EF375;
    border: 1px solid rgba(142, 243, 117, 0.3);
  }

  .cmp-col-ordinary .cmp-col-tag {
    background: rgba(255, 255, 255, 0.08);
    color: rgba(255, 255, 255, 0.65);
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .cmp-icon {
    width: 14px;
    height: 14px;
    margin-top: 3px;
  }
}
</style>
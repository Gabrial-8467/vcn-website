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
          
          <!-- Table Header -->
          <div class="cmp-row cmp-row-header">
            <div class="cmp-col cmp-col-feature">FEATURE</div>
            <div class="cmp-col cmp-col-vcn">
              <span class="cmp-vcn-check">✓</span>
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
              <span>{{ row.feature }}</span>
            </div>
            <div class="cmp-col cmp-col-vcn">
              <span class="cmp-icon-check">✓</span>
              <span>{{ row.vcn }}</span>
            </div>
            <div class="cmp-col cmp-col-ordinary">
              <span class="cmp-icon-cross">×</span>
              <span>{{ row.ordinary }}</span>
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
  font-family: "Outfit", sans-serif;
}

.cmp-container {
  max-width: 1080px;
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
  grid-template-columns: 1.2fr 1.5fr 1.3fr;
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
  background: rgba(142, 243, 117, 0.15);
  color: #8EF375;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cmp-vcn-check {
  font-size: 16px;
  color: #8EF375;
}

.cmp-vcn-title {
  display: flex;
  flex-direction: column;
  line-height: 1.2;
}

.cmp-vcn-title strong {
  font-size: 13px;
  letter-spacing: 0.5px;
}

.cmp-vcn-title span {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.7);
}

.cmp-col-ordinary {
  color: rgba(255, 255, 255, 0.55);
}

.cmp-icon-check {
  color: #8EF375;
  font-weight: 900;
  font-size: 16px;
  flex-shrink: 0;
}

.cmp-icon-cross {
  color: rgba(255, 255, 255, 0.35);
  font-weight: 900;
  font-size: 16px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .cmp-section {
    padding: 56px 0;
  }
  .cmp-col {
    padding: 14px 16px;
    font-size: 12.5px;
  }
  .cmp-row {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
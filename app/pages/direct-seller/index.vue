<template>
  <section class="product-detail-section mt-3">
    <div class="container ds-container">
      <h1 class="page-titles ds-page-title">Become A Direct Seller</h1>

      <div class="ds-layout">
        <!-- Sidebar -->
        <aside class="ds-sidebar">
          <div class="ds-sidebar-card">
            <div class="ds-sidebar-heading">Application Steps</div>
            <div class="ds-sidebar-list">
              <div
                v-for="(s, i) in steps"
                :key="s.key"
                class="ds-sidebar-item"
                :class="{ active: i === currentStep, done: i < currentStep }"
              >
                <span class="ds-sidebar-num">
                  <svg v-if="i < currentStep" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <template v-else>{{ i + 1 }}</template>
                </span>
                <span class="ds-sidebar-label">{{ s.label }}</span>
              </div>
            </div>
            <div class="ds-sidebar-progress">
              <div class="ds-sidebar-bar">
                <div class="ds-sidebar-bar-fill" :style="{ width: progressPercent + '%' }"></div>
              </div>
              <span class="ds-sidebar-pct">{{ Math.round(progressPercent) }}% complete</span>
            </div>
          </div>
        </aside>

        <!-- Main Form -->
        <div class="ds-main">
          <!-- Mobile Stepper -->
          <div class="ds-mobile-stepper">
            <div
              v-for="(s, i) in steps"
              :key="s.key"
              class="ds-mobile-step"
              :class="{ active: i === currentStep, done: i < currentStep }"
            >
              <span class="ds-mobile-num">
                <svg v-if="i < currentStep" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <template v-else>{{ i + 1 }}</template>
              </span>
              <span class="ds-mobile-label">{{ s.label }}</span>
            </div>
          </div>

          <div class="ds-card" :class="{ 'ds-shake': shaking }">
            <template v-if="!submitted">

              <!-- STEP 0: Consent & Declaration -->
              <section v-show="currentStep === 0" class="ds-step-content">
                <h2 class="ds-section-title">Consent &amp; Declaration</h2>
                <p class="ds-section-desc">Please read and confirm the following declarations to proceed.</p>

                <div class="ds-declaration-boxes">
                  <label class="ds-decl-check">
                    <input type="checkbox" v-model="form.decl1" />
                    <span>I hereby declared that I am above 18 years and citizen of India.</span>
                  </label>
                  <label class="ds-decl-check">
                    <input type="checkbox" v-model="form.decl2" />
                    <span>I have not paid any entry/subscription fee for the registration/enrollement as a direct seller.</span>
                  </label>
                  <label class="ds-decl-check">
                    <input type="checkbox" v-model="form.decl3" />
                    <span>I have read and understood the policies of the Company which has been mentioned on the Company website.</span>
                  </label>
                  <label class="ds-decl-check">
                    <input type="checkbox" v-model="form.decl4" />
                    <span>I have been made aware of the Business Plan and the rules of conduct and Code of ethics.</span>
                  </label>
                  <label class="ds-decl-check">
                    <input type="checkbox" v-model="form.decl5" />
                    <span>I am eligible to execute contract as per Indian Contract Act 1872, and I am not convicted, bankrupted and person of unsound mind.</span>
                  </label>
                  <label class="ds-decl-check">
                    <input type="checkbox" v-model="form.decl6" />
                    <span>I hereby declare that the information stated above is true, complete and correct to the best of my knowledge and I am completely liable for any consequence if arises.</span>
                  </label>
                </div>
                <div v-if="errors.consent" class="ds-error">{{ errors.consent }}</div>
              </section>

              <!-- STEP 1: Your Details -->
              <section v-show="currentStep === 1" class="ds-step-content">
                <h2 class="ds-section-title">Your Details</h2>
                <p class="ds-section-desc">Tell us who you are. Fields marked * are mandatory.</p>
                <div class="ds-grid">
                  <div class="ds-field">
                    <label>First Name *</label>
                    <input v-model="form.firstName" type="text" placeholder="As per ID proof" />
                    <span v-if="errors.firstName" class="ds-error">{{ errors.firstName }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Middle Name</label>
                    <input v-model="form.middleName" type="text" placeholder="Optional" />
                  </div>
                  <div class="ds-field">
                    <label>Last Name *</label>
                    <input v-model="form.lastName" type="text" placeholder="Surname" />
                    <span v-if="errors.lastName" class="ds-error">{{ errors.lastName }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Date of Birth *</label>
                    <input v-model="form.dob" type="date" />
                    <span v-if="errors.dob" class="ds-error">{{ errors.dob }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Gender *</label>
                    <select v-model="form.gender">
                      <option value="">Select Gender</option>
                      <option>Male</option><option>Female</option><option>Other</option>
                    </select>
                    <span v-if="errors.gender" class="ds-error">{{ errors.gender }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Marital Status</label>
                    <select v-model="form.marital">
                      <option value="">Select Status</option>
                      <option>Single</option><option>Married</option><option>Other</option>
                    </select>
                  </div>
                  <div class="ds-field">
                    <label>Email Address *</label>
                    <input v-model="form.email" type="email" placeholder="example@mail.com" />
                    <span v-if="errors.email" class="ds-error">{{ errors.email }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Mobile Number *</label>
                    <div class="ds-mobile-wrap">
                      <span class="ds-code">+91</span>
                      <input v-model="form.mobile" type="tel" maxlength="10" placeholder="10-digit mobile" />
                    </div>
                    <span class="ds-hint">Mobile number will be used as your login ID</span>
                    <span v-if="errors.mobile" class="ds-error">{{ errors.mobile }}</span>
                  </div>
                  <div class="ds-field ds-full">
                    <label>Sponsor / Upline VCN ID</label>
                    <input v-model="form.sponsor" type="text" placeholder="Optional" />
                  </div>
                </div>
              </section>

              <!-- STEP 2: KYC -->
              <section v-show="currentStep === 2" class="ds-step-content">
                <h2 class="ds-section-title">KYC Verification</h2>
                <p class="ds-section-desc">As per regulatory norms, identity documents are verified.</p>
                <div class="ds-grid">
                  <div class="ds-field">
                    <label>PAN Number *</label>
                    <input v-model="form.pan" type="text" maxlength="10" placeholder="ABCDE1234F" style="text-transform: uppercase;" />
                    <span v-if="errors.pan" class="ds-error">{{ errors.pan }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Aadhaar Number *</label>
                    <input v-model="form.aadhaar" type="text" maxlength="12" placeholder="12-digit Aadhaar" />
                    <span v-if="errors.aadhaar" class="ds-error">{{ errors.aadhaar }}</span>
                  </div>
                  <div class="ds-field">
                    <label>KYC Type *</label>
                    <select v-model="form.kycType">
                      <option value="">Select Document</option>
                      <option>Aadhaar Based (eKYC)</option>
                      <option>PAN Card</option>
                      <option>Passport</option>
                      <option>Voter ID</option>
                    </select>
                    <span v-if="errors.kycType" class="ds-error">{{ errors.kycType }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Upload ID Proof (optional)</label>
                    <input type="file" class="ds-file" />
                    <span class="ds-hint">PDF / JPG / PNG up to 2MB</span>
                  </div>
                </div>
              </section>

              <!-- STEP 3: Address & Nominee -->
              <section v-show="currentStep === 3" class="ds-step-content">
                <h2 class="ds-section-title">Address &amp; Nominee</h2>
                <p class="ds-section-desc">Your communication address and nominee details.</p>
                <div class="ds-grid">
                  <div class="ds-field ds-full">
                    <label>Address Line 1 *</label>
                    <input v-model="form.address1" type="text" placeholder="House no, street, area" />
                    <span v-if="errors.address1" class="ds-error">{{ errors.address1 }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Address Line 2</label>
                    <input v-model="form.address2" type="text" placeholder="Landmark, locality" />
                  </div>
                  <div class="ds-field">
                    <label>City *</label>
                    <input v-model="form.city" type="text" placeholder="City" />
                    <span v-if="errors.city" class="ds-error">{{ errors.city }}</span>
                  </div>
                  <div class="ds-field">
                    <label>State *</label>
                    <select v-model="form.state">
                      <option value="">Select State</option>
                      <option v-for="st in states" :key="st">{{ st }}</option>
                    </select>
                    <span v-if="errors.state" class="ds-error">{{ errors.state }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Pincode *</label>
                    <input v-model="form.pincode" type="text" maxlength="6" placeholder="6-digit pincode" />
                    <span v-if="errors.pincode" class="ds-error">{{ errors.pincode }}</span>
                  </div>
                </div>
                <div class="ds-divider-title"><h3>Nominee Details</h3></div>
                <div class="ds-grid">
                  <div class="ds-field">
                    <label>Nominee Name *</label>
                    <input v-model="form.nomineeName" type="text" placeholder="Nominee full name" />
                    <span v-if="errors.nomineeName" class="ds-error">{{ errors.nomineeName }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Relation *</label>
                    <select v-model="form.nomineeRelation">
                      <option value="">Select Relation</option>
                      <option>Spouse</option><option>Father</option><option>Mother</option>
                      <option>Son</option><option>Daughter</option><option>Brother</option>
                      <option>Sister</option><option>Other</option>
                    </select>
                    <span v-if="errors.nomineeRelation" class="ds-error">{{ errors.nomineeRelation }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Nominee DOB *</label>
                    <input v-model="form.nomineeDob" type="date" />
                    <span v-if="errors.nomineeDob" class="ds-error">{{ errors.nomineeDob }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Share % *</label>
                    <input v-model="form.nomineeShare" type="number" min="1" max="100" placeholder="100" />
                    <span v-if="errors.nomineeShare" class="ds-error">{{ errors.nomineeShare }}</span>
                  </div>
                </div>
              </section>

              <!-- STEP 4: Bank Details -->
              <section v-show="currentStep === 4" class="ds-step-content">
                <h2 class="ds-section-title">Bank Details</h2>
                <p class="ds-section-desc">Your earnings are credited directly to this account.</p>
                <div class="ds-grid">
                  <div class="ds-field ds-full">
                    <label>Account Holder Name *</label>
                    <input v-model="form.bankHolder" type="text" placeholder="As per bank record" />
                    <span v-if="errors.bankHolder" class="ds-error">{{ errors.bankHolder }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Account Number *</label>
                    <input v-model="form.bankAccount" type="text" placeholder="Account number" />
                    <span v-if="errors.bankAccount" class="ds-error">{{ errors.bankAccount }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Confirm Account Number *</label>
                    <input v-model="form.bankAccountConfirm" type="text" placeholder="Re-enter account number" />
                    <span v-if="errors.bankAccountConfirm" class="ds-error">{{ errors.bankAccountConfirm }}</span>
                  </div>
                  <div class="ds-field">
                    <label>IFSC Code *</label>
                    <input v-model="form.ifsc" type="text" maxlength="11" placeholder="ABCD0123456" @input="form.ifsc = form.ifsc.toUpperCase()" />
                    <span v-if="errors.ifsc" class="ds-error">{{ errors.ifsc }}</span>
                  </div>
                  <div class="ds-field">
                    <label>Bank Name *</label>
                    <input v-model="form.bankName" type="text" placeholder="e.g. State Bank of India" />
                    <span v-if="errors.bankName" class="ds-error">{{ errors.bankName }}</span>
                  </div>
                </div>
              </section>

              <!-- Actions -->
              <div class="ds-actions">
                <button v-if="currentStep > 0" type="button" class="ds-btn ds-btn-outline" @click="prevStep">← Previous</button>
                <div v-else></div>
                <button v-if="currentStep < steps.length - 1" type="button" class="ds-btn ds-btn-primary" @click="nextStep">Save &amp; Continue →</button>
                <button v-else type="button" class="ds-btn ds-btn-primary" :disabled="isSubmitting" @click="submitForm">
                  {{ isSubmitting ? 'SUBMITTING...' : 'Submit Application' }}
                </button>
              </div>
            </template>

            <!-- Success -->
            <div v-else class="ds-success">
              <div class="ds-success-icon">✓</div>
              <h2>Application Submitted!</h2>
              <p>
                Thank you, <strong>{{ form.firstName }} {{ form.lastName }}</strong>. Our team will verify
                your details and contact you on <strong>+91 {{ form.mobile }}</strong> within 2 working days.
              </p>
              <button type="button" class="ds-btn ds-btn-primary" @click="$router.push('/')">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const steps = [
  { key: 'consent', label: 'Consent & Declaration' },
  { key: 'details', label: 'Your Details' },
  { key: 'kyc', label: 'KYC' },
  { key: 'address', label: 'Address & Nominee' },
  { key: 'bank', label: 'Bank Details' }
]

const states = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

const currentStep = ref(0)
const isSubmitting = ref(false)
const submitted = ref(false)
const shaking = ref(false)
const errors = reactive({})

const progressPercent = computed(() => (currentStep.value / (steps.length - 1)) * 100)

const form = reactive({
  decl1: true, decl2: true, decl3: true, decl4: true, decl5: true, decl6: true,
  firstName: '', middleName: '', lastName: '', dob: '', gender: '', marital: '',
  email: '', mobile: '', sponsor: '',
  pan: '', aadhaar: '', kycType: '',
  address1: '', address2: '', city: '', state: '', pincode: '',
  nomineeName: '', nomineeRelation: '', nomineeDob: '', nomineeShare: '100',
  bankHolder: '', bankAccount: '', bankAccountConfirm: '', ifsc: '', bankName: ''
})

const clearErrors = () => Object.keys(errors).forEach(k => (errors[k] = ''))

const validateStep = (i) => {
  clearErrors()
  let ok = true
  if (i === 0) {
    if (!form.decl1 || !form.decl2 || !form.decl3 || !form.decl4 || !form.decl5 || !form.decl6) {
      errors.consent = 'Please accept all the declarations to continue.'
      ok = false
    }
  } else if (i === 1) {
    if (!form.firstName.trim()) { errors.firstName = 'First name is required'; ok = false }
    if (!form.lastName.trim()) { errors.lastName = 'Last name is required'; ok = false }
    if (!form.dob) { errors.dob = 'Date of birth is required'; ok = false }
    if (!form.gender) { errors.gender = 'Please select gender'; ok = false }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = 'Enter a valid email'; ok = false }
    if (!/^[6-9]\d{9}$/.test(form.mobile)) { errors.mobile = 'Enter a valid 10-digit mobile number'; ok = false }
  } else if (i === 2) {
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(form.pan.toUpperCase())) { errors.pan = 'Enter a valid PAN (e.g. ABCDE1234F)'; ok = false }
    if (!/^\d{12}$/.test(form.aadhaar)) { errors.aadhaar = 'Enter a valid 12-digit Aadhaar'; ok = false }
    if (!form.kycType) { errors.kycType = 'Select a KYC document'; ok = false }
  } else if (i === 3) {
    if (!form.address1.trim()) { errors.address1 = 'Address is required'; ok = false }
    if (!form.city.trim()) { errors.city = 'City is required'; ok = false }
    if (!form.state) { errors.state = 'Select a state'; ok = false }
    if (!/^\d{6}$/.test(form.pincode)) { errors.pincode = 'Enter a valid 6-digit pincode'; ok = false }
    if (!form.nomineeName.trim()) { errors.nomineeName = 'Nominee name is required'; ok = false }
    if (!form.nomineeRelation) { errors.nomineeRelation = 'Select relation'; ok = false }
    if (!form.nomineeDob) { errors.nomineeDob = 'Nominee DOB is required'; ok = false }
    const share = Number(form.nomineeShare)
    if (!share || share < 1 || share > 100) { errors.nomineeShare = 'Enter share between 1-100'; ok = false }
  } else if (i === 4) {
    if (!form.bankHolder.trim()) { errors.bankHolder = 'Account holder name is required'; ok = false }
    if (!/^\d{9,18}$/.test(form.bankAccount)) { errors.bankAccount = 'Enter a valid account number'; ok = false }
    if (form.bankAccount !== form.bankAccountConfirm) { errors.bankAccountConfirm = 'Account numbers do not match'; ok = false }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(form.ifsc)) { errors.ifsc = 'Enter a valid IFSC code'; ok = false }
    if (!form.bankName.trim()) { errors.bankName = 'Bank name is required'; ok = false }
  }
  return ok
}

const failValidation = () => {
  shaking.value = true
  setTimeout(() => (shaking.value = false), 460)
  document.querySelector('.ds-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const nextStep = () => {
  if (validateStep(currentStep.value)) currentStep.value++
  else failValidation()
}

const prevStep = () => { if (currentStep.value > 0) currentStep.value-- }

const submitForm = () => {
  if (validateStep(currentStep.value)) {
    isSubmitting.value = true
    setTimeout(() => {
      console.log('✅ Direct Seller Application:', { ...form })
      isSubmitting.value = false
      submitted.value = true
    }, 1500)
  } else {
    failValidation()
  }
}

useHead({ bodyAttrs: { class: 'product-details-page' } })
</script>

<style scoped>
.ds-container { max-width: 1020px; padding: 10px 20px 60px; }

.ds-page-title { text-align: center; margin-bottom: 28px; }

/* Layout */
.ds-layout {
  display: flex;
  gap: 26px;
  align-items: flex-start;
}

.ds-main { flex: 1; min-width: 0; }

.ds-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 120px;
}

.ds-sidebar-card {
  background: #fff;
  border: 1.5px solid #c8d0ba;
  border-radius: 14px;
  padding: 22px 20px;
  box-shadow: 0 10px 28px rgba(45, 66, 20, 0.12);
}

.ds-sidebar-heading {
  font-size: 14px;
  font-weight: 700;
  color: var(--vcn-footer);
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eef1e6;
}

.ds-sidebar-list { display: flex; flex-direction: column; gap: 6px; margin-bottom: 18px; }

.ds-sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 10px;
  transition: all 0.2s;
}

.ds-sidebar-item.active { background: #eef3e2; }
.ds-sidebar-item.done { background: #f4f7f0; }

.ds-sidebar-num {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid #d2d8c8;
  color: #8a937a;
  font-size: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.ds-sidebar-item.done .ds-sidebar-num {
  background: var(--vcn-footer);
  border-color: var(--vcn-footer);
  color: #fff;
}

.ds-sidebar-item.active .ds-sidebar-num {
  background: var(--vcn-primary);
  border-color: var(--vcn-primary);
  color: #fff;
}

.ds-sidebar-label {
  font-size: 13px;
  color: #6b7280;
  font-weight: 500;
}

.ds-sidebar-item.active .ds-sidebar-label { color: var(--vcn-footer); font-weight: 600; }
.ds-sidebar-item.done .ds-sidebar-label { color: #44503a; }

.ds-sidebar-progress { border-top: 1px solid #eef1e6; padding-top: 14px; }

.ds-sidebar-bar {
  height: 6px;
  background: #e8ede0;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.ds-sidebar-bar-fill {
  height: 100%;
  background: var(--vcn-primary);
  border-radius: 10px;
  transition: width 0.4s ease;
}

.ds-sidebar-pct { font-size: 12px; color: #8a937a; }

/* Mobile stepper */
.ds-mobile-stepper { display: none; }

/* Card */
.ds-card {
  background: #fff;
  border: 1.5px solid #c8d0ba;
  border-radius: 16px;
  padding: 30px 34px 36px;
  box-shadow: 0 14px 34px rgba(45, 66, 20, 0.12);
}

.ds-section-title { font-size: 20px; font-weight: 700; color: var(--vcn-footer); margin-bottom: 4px; }
.ds-section-desc { font-size: 13px; color: #68724f; margin-bottom: 20px; }

.ds-divider-title { margin-top: 26px; padding-top: 20px; border-top: 1px dashed #dde4d3; margin-bottom: 16px; }
.ds-divider-title h3 { font-size: 17px; font-weight: 700; color: var(--vcn-footer); }

/* Declarations */
.ds-declaration-boxes {
  display: grid;
  gap: 12px;
  margin: 0 0 22px;
}

.ds-decl-check {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 14px 16px;
  border: 1.5px solid #c8d0ba;
  border-radius: 12px;
  cursor: pointer;
  font-size: 14px;
  line-height: 1.6;
  color: #44503a;
  background: #fff;
  box-shadow: 0 3px 10px rgba(45, 66, 20, 0.08);
  transition: all 0.2s;
}

.ds-decl-check:hover {
  border-color: var(--vcn-primary);
  background: #f8faf2;
  box-shadow: 0 5px 14px rgba(45, 66, 20, 0.14);
}

.ds-decl-check input {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  margin-top: 4px;
  border: 2px solid #b9c2a8;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  transition: all 0.2s;
}

.ds-decl-check input:checked {
  border-color: var(--vcn-primary);
  background: #fff;
}

.ds-decl-check input:checked::after {
  content: "✓";
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vcn-primary);
  font-size: 13px;
  font-weight: 700;
}

.ds-decl-check input:checked + span {
  font-weight: 600;
  color: var(--vcn-footer);
}

/* Grid */
.ds-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
.ds-field { display: flex; flex-direction: column; }
.ds-full { grid-column: 1 / -1; }

.ds-field label { font-size: 13px; font-weight: 600; color: #44503a; margin-bottom: 7px; }

.ds-field input,
.ds-field select {
  height: 48px;
  border: 1.5px solid #c8d0ba;
  border-radius: 10px;
  padding: 0 14px;
  font-size: 14px;
  color: #2c331f;
  background: #fbfcf9;
  box-shadow: 0 2px 8px rgba(45, 66, 20, 0.06);
  transition: all 0.25s;
}

.ds-field input:focus,
.ds-field select:focus {
  outline: none;
  border-color: var(--vcn-primary);
  background: #fff;
  box-shadow: 0 0 0 3px rgba(93, 107, 31, 0.12);
}

.ds-field input::placeholder { color: #a4ad96; }

.ds-field select {
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='8'%3E%3Cpath d='M1 1l6 6 6-6' stroke='%2368724f' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
}

.ds-mobile-wrap { display: flex; }
.ds-mobile-wrap .ds-code {
  padding: 0 14px; display: flex; align-items: center;
  background: #eef1e6; border: 1.5px solid #c8d0ba; border-right: none;
  border-radius: 10px 0 0 10px; font-size: 14px; font-weight: 600; color: var(--vcn-primary);
}
.ds-mobile-wrap input { flex: 1; border-radius: 0 10px 10px 0; }
.ds-file { padding: 10px 14px; height: 48px; }
.ds-hint { font-size: 12px; color: #8a937a; margin-top: 6px; }
.ds-error { font-size: 12px; color: #e74c3c; margin-top: 6px; font-weight: 600; animation: ds-shake 0.4s ease; }

/* Shake animation */
@keyframes ds-shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-9px); }
  40% { transform: translateX(9px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

.ds-shake { animation: ds-shake 0.45s ease; }

/* Red validation on invalid fields */
.ds-field:has(.ds-error) input,
.ds-field:has(.ds-error) select {
  border-color: #e03e2f !important;
  background: #fdf3f2 !important;
  box-shadow: 0 0 0 3px rgba(224, 62, 47, 0.12);
}

/* Actions */
.ds-actions { display: flex; justify-content: space-between; gap: 14px; margin-top: 28px; }

.ds-btn { padding: 13px 26px; border-radius: 10px; font-size: 15px; font-weight: 700; cursor: pointer; transition: all 0.25s; border: none; }
.ds-btn-primary { background: var(--vcn-primary); color: #fff; }
.ds-btn-primary:hover:not(:disabled) { background: var(--vcn-footer); }
.ds-btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
.ds-btn-outline { background: #fff; border: 2px solid #cdd4c2; color: #44503a; }
.ds-btn-outline:hover { border-color: var(--vcn-primary); color: var(--vcn-primary); }

/* Success */
.ds-success { text-align: center; padding: 38px 10px; }
.ds-success-icon {
  width: 80px; height: 80px; margin: 0 auto 24px;
  background: var(--vcn-primary); color: #fff;
  border-radius: 50%; display: flex; align-items: center; justify-content: center;
  font-size: 42px; font-weight: 700;
  box-shadow: 0 14px 30px rgba(93, 107, 31, 0.28);
}
.ds-success h2 { font-size: 22px; color: var(--vcn-footer); margin-bottom: 12px; }
.ds-success p { color: #5a6450; font-size: 15px; line-height: 1.7; max-width: 440px; margin: 0 auto 30px; }

/* Responsive */
@media (max-width: 991px) {
  .ds-layout { flex-direction: column; }

  .ds-sidebar { width: 100%; position: static; }
  .ds-sidebar-card { display: none; }

  .ds-mobile-stepper {
    display: flex;
    gap: 4px;
    background: #fff;
    border: 1.5px solid #c8d0ba;
    border-radius: 12px;
    padding: 12px 10px;
    margin-bottom: 16px;
    overflow-x: auto;
    box-shadow: 0 8px 22px rgba(45, 66, 20, 0.1);
  }

  .ds-mobile-step {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 6px 10px;
    border-radius: 8px;
    white-space: nowrap;
    flex-shrink: 0;
    background: #f4f7f0;
  }

  .ds-mobile-step.active { background: #eef3e2; }

  .ds-mobile-num {
    width: 22px; height: 22px; border-radius: 50%;
    border: 2px solid #d2d8c8; color: #8a937a;
    font-size: 11px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .ds-mobile-step.done .ds-mobile-num { background: var(--vcn-footer); border-color: var(--vcn-footer); color: #fff; }
  .ds-mobile-step.active .ds-mobile-num { background: var(--vcn-primary); border-color: var(--vcn-primary); color: #fff; }

  .ds-mobile-label { font-size: 11px; color: #6b7280; font-weight: 600; }
  .ds-mobile-step.active .ds-mobile-label { color: var(--vcn-footer); }
}

@media (max-width: 768px) {
  .ds-container { padding: 10px 12px 50px; }
  .ds-page-title { font-size: 24px !important; margin-bottom: 20px; }
  .ds-card { padding: 24px 18px 28px; border-radius: 14px; }
  .ds-grid { grid-template-columns: 1fr; gap: 14px; }
  .ds-full { grid-column: auto; }
}

@media (max-width: 480px) {
  .ds-actions { flex-direction: column-reverse; }
  .ds-btn { width: 100%; }
}
</style>
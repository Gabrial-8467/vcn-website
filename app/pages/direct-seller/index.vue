<template>
  <ClientOnly>
    <div class="ds-wrapper">
    <!-- Decorative Leaf Backgrounds -->
    <div class="ds-bg-leaf ds-leaf-left" aria-hidden="true">
      <svg width="240" height="420" viewBox="0 0 240 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.38" fill="#7ba662">
          <path d="M-50,420 C30,340 70,200 110,0 C111,0 113,2 112,5 C73,202 33,341 -48,420 Z" fill="#699450"/>
          <path d="M40,310 C65,275 125,250 160,275 C135,310 75,335 40,310 Z"/>
          <path d="M10,240 C-25,205 -60,205 -85,225 C-60,250 -25,260 10,240 Z"/>
          <path d="M75,190 C110,155 165,145 195,170 C165,200 110,210 75,190 Z"/>
          <path d="M45,130 C20,95 -25,85 -60,105 C-35,130 10,140 45,130 Z"/>
          <path d="M100,85 C140,50 185,40 215,68 C185,98 140,108 100,85 Z"/>
        </g>
      </svg>
    </div>

    <div class="ds-bg-leaf ds-leaf-right" aria-hidden="true">
      <svg width="240" height="420" viewBox="0 0 240 420" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.38" fill="#7ba662">
          <path d="M290,420 C210,340 170,200 130,0 C129,0 127,2 128,5 C167,202 207,341 288,420 Z" fill="#699450"/>
          <path d="M200,310 C175,275 115,250 80,275 C105,310 165,335 200,310 Z"/>
          <path d="M230,240 C265,205 300,205 325,225 C300,250 265,260 230,240 Z"/>
          <path d="M165,190 C130,155 75,145 45,170 C75,200 130,210 165,190 Z"/>
          <path d="M195,130 C220,95 265,85 300,105 C275,130 230,140 195,130 Z"/>
          <path d="M140,85 C100,50 55,40 25,68 C55,98 100,108 140,85 Z"/>
        </g>
      </svg>
    </div>

    <section class="ds-container">
      <!-- Main Title Block -->
      <div class="ds-header-block">
        <h1 class="ds-main-title">Become A Direct Seller</h1>
        <p class="ds-main-subtitle">Start your journey with VCH. It's simple, quick and secure.</p>
      </div>

      <!-- Horizontal Stepper -->
      <div class="ds-stepper-wrapper">
        <div class="ds-mobile-step-label">
          <span class="ds-mobile-step-num">Step {{ currentStep + 1 }} / {{ steps.length }}</span>
          <span class="ds-mobile-step-name">{{ steps[currentStep].label }}</span>
        </div>
        <div class="ds-stepper">
          <template v-for="(s, index) in steps" :key="s.key">
            <div
              class="ds-step-item"
              :class="{
                active: index === currentStep,
                completed: index < currentStep,
                upcoming: index > currentStep
              }"
              @click="goToStep(index)"
            >
              <div class="ds-step-circle">
                <svg v-if="index < currentStep" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span v-else>{{ index + 1 }}</span>
              </div>
              <div class="ds-step-info">
                <span class="ds-step-title">{{ index + 1 }}. {{ s.label }}</span>
                <span class="ds-step-desc">{{ s.subtitle }}</span>
              </div>
            </div>

            <!-- Connector Line -->
            <div v-if="index < steps.length - 1" class="ds-step-line" :class="{ filled: index < currentStep }"></div>
          </template>
        </div>
      </div>

      <!-- Main Form Card -->
      <div class="ds-card" :class="{ 'ds-shake': shaking }">
        <template v-if="!submitted">

          <!-- STEP 0: Consent & Declaration -->
          <div v-show="currentStep === 0" class="ds-step-body">
            <h2 class="ds-card-title">Consent &amp; Declaration</h2>
            <p class="ds-card-desc">Please read and confirm the following declarations to proceed.</p>

            <div class="ds-decl-grid">
              <label class="ds-decl-item">
                <input type="checkbox" v-model="form.decl1" />
                <span class="ds-decl-box">
                  <span class="ds-check-custom">✓</span>
                </span>
                <span class="ds-decl-text">I hereby declared that I am above 18 years and citizen of India.</span>
              </label>
              <label class="ds-decl-item">
                <input type="checkbox" v-model="form.decl2" />
                <span class="ds-decl-box">
                  <span class="ds-check-custom">✓</span>
                </span>
                <span class="ds-decl-text">I have not paid any entry/subscription fee for the registration/enrollement as a direct seller.</span>
              </label>
              <label class="ds-decl-item">
                <input type="checkbox" v-model="form.decl3" />
                <span class="ds-decl-box">
                  <span class="ds-check-custom">✓</span>
                </span>
                <span class="ds-decl-text">I have read and understood the policies of the Company which has been mentioned on the Company website.</span>
              </label>
              <label class="ds-decl-item">
                <input type="checkbox" v-model="form.decl4" />
                <span class="ds-decl-box">
                  <span class="ds-check-custom">✓</span>
                </span>
                <span class="ds-decl-text">I have been made aware of the Business Plan and the rules of conduct and Code of ethics.</span>
              </label>
              <label class="ds-decl-item">
                <input type="checkbox" v-model="form.decl5" />
                <span class="ds-decl-box">
                  <span class="ds-check-custom">✓</span>
                </span>
                <span class="ds-decl-text">I am eligible to execute contract as per Indian Contract Act 1872, and I am not convicted, bankrupted and person of unsound mind.</span>
              </label>
              <label class="ds-decl-item">
                <input type="checkbox" v-model="form.decl6" />
                <span class="ds-decl-box">
                  <span class="ds-check-custom">✓</span>
                </span>
                <span class="ds-decl-text">I hereby declare that the information stated above is true, complete and correct to the best of my knowledge and I am completely liable for any consequence if arises.</span>
              </label>
            </div>
            <span v-if="errors.consent" class="ds-error-msg">{{ errors.consent }}</span>
          </div>

          <!-- STEP 1: Your Details -->
          <div v-show="currentStep === 1" class="ds-step-body">
            <h2 class="ds-card-title">Your Details</h2>
            <p class="ds-card-desc">Tell us who you are. Fields marked * are mandatory.</p>

            <div class="ds-form-grid">
              <!-- First Name -->
              <div class="ds-field-group">
                <label>First Name *</label>
                <input v-model="form.firstName" type="text" placeholder="As per ID proof" class="ds-input" @blur="onBlur('firstName')" @input="onInput('firstName')" />
                <span v-if="errors.firstName" class="ds-error-msg">{{ errors.firstName }}</span>
              </div>

              <!-- Middle Name -->
              <div class="ds-field-group">
                <label>Middle Name</label>
                <input v-model="form.middleName" type="text" placeholder="Optional" class="ds-input" />
              </div>

              <!-- Last Name -->
              <div class="ds-field-group">
                <label>Last Name *</label>
                <input v-model="form.lastName" type="text" placeholder="Surname" class="ds-input" @blur="onBlur('lastName')" @input="onInput('lastName')" />
                <span v-if="errors.lastName" class="ds-error-msg">{{ errors.lastName }}</span>
              </div>

              <!-- Date of Birth -->
              <div class="ds-field-group">
                <label>Date of Birth *</label>
                <div class="ds-input-wrapper ds-date-wrapper">
                  <input v-model="form.dob" type="date" class="ds-date-native" @blur="onBlur('dob')" @input="onInput('dob')" />
                  <span class="ds-date-display" :class="{ empty: !form.dob }">
                    {{ formattedDob || 'mm / dd / yyyy' }}
                  </span>
                  <button type="button" class="ds-input-icon-right" aria-label="Open Calendar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </button>
                </div>
                <span v-if="errors.dob" class="ds-error-msg">{{ errors.dob }}</span>
              </div>

              <!-- Gender -->
              <div class="ds-field-group">
                <label>Gender *</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.gender" class="ds-select" @blur="onBlur('gender')" @change="onInput('gender')">
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                <span v-if="errors.gender" class="ds-error-msg">{{ errors.gender }}</span>
              </div>

              <!-- Marital Status -->
              <div class="ds-field-group">
                <label>Marital Status</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.marital" class="ds-select">
                    <option value="" disabled>Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Other">Other</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Email Address -->
              <div class="ds-field-group">
                <label>Email Address *</label>
                <div class="ds-input-wrapper">
                  <span class="ds-input-icon-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                  </span>
                  <input v-model="form.email" type="email" placeholder="example@mail.com" class="ds-input ds-has-left-icon" @blur="onBlur('email')" @input="onInput('email')" />
                </div>
                <span v-if="errors.email" class="ds-error-msg">{{ errors.email }}</span>
              </div>

              <!-- Mobile Number -->
              <div class="ds-field-group">
                <label>Mobile Number *</label>
                <div class="ds-mobile-group">
                  <div class="ds-mobile-badge">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="ds-badge-icon">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                    <span>+91</span>
                  </div>
                  <input v-model="form.mobile" type="tel" maxlength="10" placeholder="10-digit mobile" class="ds-input ds-mobile-input" @blur="onBlur('mobile')" @input="onInput('mobile')" />
                </div>
                <span class="ds-hint">Mobile number will be used as your login ID</span>
                <span v-if="errors.mobile" class="ds-error-msg">{{ errors.mobile }}</span>
              </div>

              <!-- Sponsor / Upline VCN ID -->
              <div class="ds-field-group ds-full-width">
                <label>Sponsor / Upline VCN ID</label>
                <div class="ds-input-wrapper">
                  <span class="ds-input-icon-left">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                  </span>
                  <input v-model="form.sponsor" type="text" placeholder="Optional" class="ds-input ds-has-left-icon" />
                </div>
              </div>

              <!-- Username -->
              <div class="ds-field-group ds-full-width">
                <label>Username *</label>
                <input v-model="form.userName" type="text" placeholder="Choose a username" class="ds-input" @blur="onBlur('userName')" @input="onInput('userName')" />
                <span class="ds-hint">Username will be used as your login ID</span>
                <span v-if="errors.userName" class="ds-error-msg">{{ errors.userName }}</span>
              </div>

              <!-- Placement Preference -->
              <div class="ds-field-group">
                <label>Placement Preference *</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.placement" class="ds-select" @blur="onBlur('placement')" @change="onInput('placement')">
                    <option value="" disabled>Select Placement</option>
                    <option value="LEFT">Left</option>
                    <option value="RIGHT">Right</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                <span v-if="errors.placement" class="ds-error-msg">{{ errors.placement }}</span>
              </div>

              <!-- Title -->
              <div class="ds-field-group">
                <label>Title</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.title" class="ds-select">
                    <option value="" disabled>Select Title</option>
                    <option value="MR">Mr</option>
                    <option value="MRS">Mrs</option>
                    <option value="MS">Ms</option>
                    <option value="SMT">Smt</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Profession -->
              <div class="ds-field-group">
                <label>Profession</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.profession" class="ds-select">
                    <option value="" disabled>Select Profession</option>
                    <option value="BUSINESS">Business</option>
                    <option value="SERVICE">Service</option>
                    <option value="SELF_EMPLOYED">Self Employed</option>
                    <option value="STUDENT">Student</option>
                    <option value="HOMEMAKER">Homemaker</option>
                    <option value="RETIRED">Retired</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Parent / Spouse Title -->
              <div class="ds-field-group">
                <label>Parent / Spouse Title</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.parentSpouseTitle" class="ds-select">
                    <option value="" disabled>Select</option>
                    <option value="S_O">Spouse of</option>
                    <option value="D_O">Daughter of</option>
                    <option value="S">Son of</option>
                    <option value="W_O">Wife of</option>
                    <option value="H_O">Husband of</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
              </div>

              <!-- Parent / Spouse Name -->
              <div class="ds-field-group">
                <label>Parent / Spouse Name</label>
                <input v-model="form.parentSpouseName" type="text" placeholder="Full name" class="ds-input" />
              </div>

              <!-- Password -->
              <div class="ds-field-group">
                <label>Password *</label>
                <div class="ds-input-wrapper">
                  <input v-model="form.password" :type="showPassword ? 'text' : 'password'" placeholder="Example - My@password1" class="ds-input" @blur="onBlur('password')" @input="onInput('password')" />
                  <button type="button" class="ds-input-icon-right" aria-label="Toggle password visibility" @click="showPassword = !showPassword">
                    <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                      <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                      <line x1="2" y1="2" x2="22" y2="22"></line>
                    </svg>
                  </button>
                </div>
                <span class="ds-hint">At least 8 characters with letters and numbers</span>
                <span v-if="errors.password" class="ds-error-msg">{{ errors.password }}</span>
              </div>

              <!-- Confirm Password -->
              <div class="ds-field-group">
                <label>Confirm Password *</label>
                <input v-model="form.confirmPassword" type="password" placeholder="Re-enter password" class="ds-input" @blur="onBlur('confirmPassword')" @input="onInput('confirmPassword')" />
                <span v-if="errors.confirmPassword" class="ds-error-msg">{{ errors.confirmPassword }}</span>
              </div>
            </div>
          </div>

          <!-- STEP 2: KYC -->
          <div v-show="currentStep === 2" class="ds-step-body">
            <div class="ds-kyc-layout">
              <!-- Left Form Column -->
              <div class="ds-kyc-main">
                <h2 class="ds-card-title">KYC Verification</h2>
                <p class="ds-card-desc">As per regulatory norms, please complete your KYC to become a direct seller.</p>

                <div class="ds-form-grid ds-kyc-grid">
                  <!-- PAN Number -->
                  <div class="ds-field-group">
                    <label>PAN Number *</label>
                    <input v-model="form.pan" type="text" maxlength="10" placeholder="BIPDE1234M" class="ds-input uppercase-text" @blur="onBlur('pan')" @input="form.pan = form.pan.toUpperCase(); onInput('pan')" />
                    <span v-if="errors.pan" class="ds-error-msg">{{ errors.pan }}</span>
                  </div>

                  <!-- Aadhaar Number -->
                  <div class="ds-field-group">
                    <label>Aadhaar Number *</label>
                    <div class="ds-input-wrapper">
                      <input v-model="form.aadhaar" type="text" maxlength="14" placeholder="6203 9012 3456" class="ds-input ds-has-right-icon" @blur="onBlur('aadhaar')" @input="onInput('aadhaar')" />
                      <span class="ds-input-icon-right" aria-label="Privacy mask">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      </span>
                    </div>
                    <span v-if="errors.aadhaar" class="ds-error-msg">{{ errors.aadhaar }}</span>
                  </div>

                  <!-- KYC Type -->
                  <div class="ds-field-group">
                    <label>KYC Type *</label>
                    <div class="ds-select-wrapper">
                      <select v-model="form.kycType" class="ds-select" @blur="onBlur('kycType')" @change="onInput('kycType')">
                        <option value="Aadhaar Based eKYC">Aadhaar Based eKYC</option>
                        <option value="PAN Card">PAN Card</option>
                        <option value="Passport">Passport</option>
                        <option value="Voter ID">Voter ID</option>
                      </select>
                      <span class="ds-select-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                      </span>
                    </div>
                    <span v-if="errors.kycType" class="ds-error-msg">{{ errors.kycType }}</span>
                  </div>

                  <!-- Upload ID Proof -->
                  <div class="ds-field-group">
                    <label>Upload ID Proof (Optional)</label>
                    <div class="ds-file-dropzone" @click="triggerFileInput">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ds-cloud-icon">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span class="ds-file-label">{{ selectedFileName || 'Choose file or drag & drop' }}</span>
                      <input type="file" ref="fileInputRef" class="ds-hidden-file" @change="onFileSelected" />
                    </div>
                    <span class="ds-hint">PDF, JPG, PNG (Max 5 MB)</span>
                  </div>

                  <!-- KYC Issuer -->
                  <div class="ds-field-group">
                    <label>KYC Issuer</label>
                    <input v-model="form.kycIssuer" type="text" placeholder="e.g. UIDAI" class="ds-input" />
                    <span class="ds-hint">Optional</span>
                  </div>

                  <!-- KYC DigiLocker Reference -->
                  <div class="ds-field-group">
                    <label>DigiLocker Reference URL</label>
                    <input v-model="form.kycDigilockerUri" type="url" placeholder="https://example.com/digilocker/..." class="ds-input" />
                    <span class="ds-hint">Optional</span>
                  </div>
                </div>
              </div>

              <!-- Right Aadhaar Verification Card Box -->
              <div class="ds-aadhaar-box">
                <div class="ds-aadhaar-top">
                  <div class="ds-aadhaar-logo">
                    <img src="/img/about-redesign/image.png" alt="Aadhaar Logo" class="ds-aadhaar-img" />
                  </div>
                  <div class="ds-aadhaar-heading">
                    <h3>Aadhaar Card Verification</h3>
                    <p>We will send a One Time Password (OTP) to your Aadhaar linked mobile number for verification.</p>
                  </div>
                </div>

                <button type="button" class="ds-btn-send-otp" @click="sendAadhaarOtp">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <line x1="12" y1="18" x2="12.01" y2="18"></line>
                  </svg>
                  <span>Send OTP to Aadhaar</span>
                </button>

                <div class="ds-otp-block">
                  <div class="ds-otp-header">
                    <label>Enter OTP *</label>
                  </div>
                  <div class="ds-otp-row">
                    <div class="ds-otp-boxes">
                      <input
                        v-for="(digit, idx) in 5"
                        :key="idx"
                        type="text"
                        maxlength="1"
                        v-model="aadhaarOtp[idx]"
                        class="ds-otp-cell"
                        @input="e => handleAadhaarOtpInput(e, idx)"
                        @keydown.backspace="e => handleAadhaarOtpBackspace(e, idx)"
                      />
                    </div>
                    <button
                      type="button"
                      class="ds-resend-btn"
                      :disabled="!canResendAadhaarOtp"
                      @click="sendAadhaarOtp"
                    >
                      {{ canResendAadhaarOtp ? 'Resend OTP' : `Resend OTP (${aadhaarCountdown}s)` }}
                    </button>
                  </div>
                  <p class="ds-aadhaar-hint">
                    Didn't get the OTP? Make sure your mobile number is linked with Aadhaar.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: Address & Nominee -->
          <div v-show="currentStep === 3" class="ds-step-body">
            <h2 class="ds-card-title">Address &amp; Nominee</h2>
            <p class="ds-card-desc">Your communication address and nominee details.</p>
            <div class="ds-form-grid">
              <div class="ds-field-group ds-full-width">
                <label>Address Line 1 *</label>
                <input v-model="form.address1" type="text" placeholder="House no, street, area" class="ds-input" @blur="onBlur('address1')" @input="onInput('address1')" />
                <span v-if="errors.address1" class="ds-error-msg">{{ errors.address1 }}</span>
              </div>
              <div class="ds-field-group">
                <label>Address Line 2</label>
                <input v-model="form.address2" type="text" placeholder="Landmark, locality" class="ds-input" @blur="onBlur('address2')" @input="onInput('address2')" />
              </div>
              <div class="ds-field-group">
                <label>City *</label>
                <input v-model="form.city" type="text" placeholder="City" class="ds-input" @blur="onBlur('city')" @input="onInput('city')" />
                <span v-if="errors.city" class="ds-error-msg">{{ errors.city }}</span>
              </div>
              <div class="ds-field-group">
                <label>State *</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.state" class="ds-select" @blur="onBlur('state')" @change="onInput('state')">
                    <option value="" disabled>Select State</option>
                    <option v-for="st in states" :key="st" :value="st">{{ st }}</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                <span v-if="errors.state" class="ds-error-msg">{{ errors.state }}</span>
              </div>
              <div class="ds-field-group">
                <label>Pincode *</label>
                <input v-model="form.pincode" type="text" maxlength="6" placeholder="6-digit pincode" class="ds-input" @blur="onBlur('pincode')" @input="onInput('pincode')" />
                <span v-if="errors.pincode" class="ds-error-msg">{{ errors.pincode }}</span>
              </div>
              <div class="ds-field-group">
                <label>Landmark</label>
                <input v-model="form.landmark" type="text" placeholder="e.g. City Mall" class="ds-input" />
              </div>
              <div class="ds-field-group">
                <label>District</label>
                <input v-model="form.district" type="text" placeholder="District" class="ds-input" />
              </div>
              <div class="ds-field-group">
                <label>Post Office</label>
                <input v-model="form.postOffice" type="text" placeholder="Post office" class="ds-input" />
              </div>
            </div>

            <div class="ds-section-divider">
              <h3>Business Details</h3>
            </div>

            <div class="ds-form-grid">
              <div class="ds-field-group ds-full-width">
                <label>Company Name *</label>
                <input v-model="form.companyName" type="text" placeholder="Company / business name" class="ds-input" @blur="onBlur('companyName')" @input="onInput('companyName')" />
                <span v-if="errors.companyName" class="ds-error-msg">{{ errors.companyName }}</span>
              </div>
              <div class="ds-field-group">
                <label>Company Type *</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.companyType" class="ds-select" @blur="onBlur('companyType')" @change="onInput('companyType')">
                    <option value="" disabled>Select Company Type</option>
                    <option value="PROPRIETORSHIP">Proprietorship</option>
                    <option value="PARTNERSHIP">Partnership</option>
                    <option value="LLP">LLP</option>
                    <option value="PRIVATE_LIMITED">Private Limited</option>
                    <option value="PUBLIC_LIMITED">Public Limited</option>
                    <option value="OTHER">Other</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                <span v-if="errors.companyType" class="ds-error-msg">{{ errors.companyType }}</span>
              </div>
              <div class="ds-field-group">
                <label>GST Number</label>
                <input v-model="form.gstNumber" type="text" maxlength="15" placeholder="GSTIN (optional)" class="ds-input uppercase-text" @input="form.gstNumber = form.gstNumber.toUpperCase()" />
                <span class="ds-hint">Optional</span>
              </div>
            </div>

            <div class="ds-section-divider">
              <h3>Nominee Details</h3>
            </div>

            <div class="ds-form-grid">
              <div class="ds-field-group">
                <label>Nominee Name *</label>
                <input v-model="form.nomineeName" type="text" placeholder="Nominee full name" class="ds-input" @blur="onBlur('nomineeName')" @input="onInput('nomineeName')" />
                <span v-if="errors.nomineeName" class="ds-error-msg">{{ errors.nomineeName }}</span>
              </div>
              <div class="ds-field-group">
                <label>Relation *</label>
                <div class="ds-select-wrapper">
                  <select v-model="form.nomineeRelation" class="ds-select" @blur="onBlur('nomineeRelation')" @change="onInput('nomineeRelation')">
                    <option value="" disabled>Select Relation</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Other">Other</option>
                  </select>
                  <span class="ds-select-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </div>
                <span v-if="errors.nomineeRelation" class="ds-error-msg">{{ errors.nomineeRelation }}</span>
              </div>
              <div class="ds-field-group">
                <label>Nominee DOB *</label>
                <div class="ds-input-wrapper ds-date-wrapper">
                  <input v-model="form.nomineeDob" type="date" class="ds-date-native" @blur="onBlur('nomineeDob')" @input="onInput('nomineeDob')" />
                  <span class="ds-date-display" :class="{ empty: !form.nomineeDob }">
                    {{ formattedNomineeDob || 'Select date' }}
                  </span>
                  <button type="button" class="ds-input-icon-right" aria-label="Open Calendar">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </button>
                </div>
                <span v-if="errors.nomineeDob" class="ds-error-msg">{{ errors.nomineeDob }}</span>
              </div>
              <div class="ds-field-group">
                <label>Share % *</label>
                <input v-model="form.nomineeShare" type="number" min="1" max="100" placeholder="100" class="ds-input" @blur="onBlur('nomineeShare')" @input="onInput('nomineeShare')" />
                <span v-if="errors.nomineeShare" class="ds-error-msg">{{ errors.nomineeShare }}</span>
              </div>
            </div>
          </div>

          <!-- STEP 4: Bank Details -->
          <div v-show="currentStep === 4" class="ds-step-body">
            <h2 class="ds-card-title">Bank Details</h2>
            <p class="ds-card-desc">Your earnings are credited directly to this account.</p>
            <div class="ds-form-grid">
              <div class="ds-field-group ds-full-width">
                <label>Account Holder Name *</label>
                <input v-model="form.bankHolder" type="text" placeholder="As per bank record" class="ds-input" @blur="onBlur('bankHolder')" @input="onInput('bankHolder')" />
                <span v-if="errors.bankHolder" class="ds-error-msg">{{ errors.bankHolder }}</span>
              </div>
              <div class="ds-field-group">
                <label>Account Number *</label>
                <input v-model="form.bankAccount" type="text" placeholder="Account number" class="ds-input" @blur="onBlur('bankAccount')" @input="onInput('bankAccount')" />
                <span v-if="errors.bankAccount" class="ds-error-msg">{{ errors.bankAccount }}</span>
              </div>
              <div class="ds-field-group">
                <label>Confirm Account Number *</label>
                <input v-model="form.bankAccountConfirm" type="text" placeholder="Re-enter account number" class="ds-input" @blur="onBlur('bankAccountConfirm')" @input="onInput('bankAccountConfirm')" />
                <span v-if="errors.bankAccountConfirm" class="ds-error-msg">{{ errors.bankAccountConfirm }}</span>
              </div>
              <div class="ds-field-group">
                <label>IFSC Code *</label>
                <input v-model="form.ifsc" type="text" maxlength="11" placeholder="ABCD0123456" class="ds-input uppercase-text" @blur="onBlur('ifsc')" @input="form.ifsc = form.ifsc.toUpperCase(); onInput('ifsc')" />
                <span v-if="errors.ifsc" class="ds-error-msg">{{ errors.ifsc }}</span>
              </div>
              <div class="ds-field-group">
                <label>Bank Name *</label>
                <input v-model="form.bankName" type="text" placeholder="e.g. State Bank of India" class="ds-input" @blur="onBlur('bankName')" @input="onInput('bankName')" />
                <span v-if="errors.bankName" class="ds-error-msg">{{ errors.bankName }}</span>
              </div>
              <div class="ds-field-group">
                <label>UPI ID</label>
                <input v-model="form.upi" type="text" placeholder="name@upi (optional)" class="ds-input" />
                <span class="ds-hint">Optional</span>
              </div>
            </div>
          </div>

          <!-- Footer Actions -->
          <div class="ds-actions">
            <button
              v-if="currentStep > 0"
              type="button"
              class="ds-btn ds-btn-prev"
              @click="prevStep"
            >
              ← Previous
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < steps.length - 1"
              type="button"
              class="ds-btn ds-btn-next"
              @click="nextStep"
            >
              Save &amp; Continue →
            </button>
            <button
              v-else
              type="button"
              class="ds-btn ds-btn-next"
              :disabled="isSubmitting"
              @click="submitForm"
            >
              {{ isSubmitting ? 'Submitting...' : 'Save &amp; Continue →' }}
            </button>
          </div>

          <div v-if="submitError" class="ds-submit-error">
            <span class="ds-submit-error-icon">⚠</span>
            {{ submitError }}
          </div>

        </template>

        <!-- Success Screen -->
        <div v-else class="ds-success-box">
          <div class="ds-success-icon">✓</div>
          <h2>Application Submitted!</h2>
          <p>
            Thank you, <strong>{{ form.firstName }} {{ form.lastName }}</strong>. Our team will verify your details and contact you on <strong>+91 {{ form.mobile }}</strong> within 2 working days.
          </p>
          <button type="button" class="ds-btn ds-btn-next" @click="$router.push('/')">Back to Home</button>
        </div>

      </div>
    </section>
  </div>
  </ClientOnly>
</template>

<script setup>
import { ref, reactive, computed, onUnmounted } from 'vue'
import { useDirectSellerApi } from '~/composables/useDirectSeller'

const { submitDirectSellerApplication } = useDirectSellerApi()

const steps = [
  { key: 'consent', label: 'Consent & Declaration', subtitle: 'Agree to terms' },
  { key: 'details', label: 'Your Details', subtitle: 'Personal information' },
  { key: 'kyc', label: 'KYC', subtitle: 'Verify your identity' },
  { key: 'address', label: 'Address & Business', subtitle: 'Your location & business' },
  { key: 'bank', label: 'Bank Details', subtitle: 'Payout information' }
]

const states = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Odisha', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
]

// Default to Step 0 (Consent & Declaration)
const currentStep = ref(0)
const isSubmitting = ref(false)
const submitted = ref(false)
const shaking = ref(false)
const submitError = ref('')
const errors = reactive({})

const form = reactive({
  decl1: true, decl2: true, decl3: true, decl4: true, decl5: true, decl6: true,
  userName: '', title: '', placement: '', profession: '', parentSpouseTitle: '', parentSpouseName: '',
  firstName: '', middleName: '', lastName: '', dob: '', gender: '', marital: '',
  email: '', mobile: '', sponsor: '', password: '', confirmPassword: '',
  pan: '', aadhaar: '', kycType: 'Aadhaar Based eKYC', kycIssuer: 'UIDAI', kycDigilockerUri: '',
  address1: '', address2: '', landmark: '', city: '', district: '', state: '', pincode: '', postOffice: '',
  companyName: '', companyType: '', gstNumber: '',
  nomineeName: '', nomineeRelation: '', nomineeDob: '', nomineeShare: '100',
  bankHolder: '', bankAccount: '', bankAccountConfirm: '', ifsc: '', bankName: '', upi: ''
})

// File Upload State
const fileInputRef = ref(null)
const selectedFileName = ref('')

const triggerFileInput = () => {
  if (fileInputRef.value) fileInputRef.value.click()
}

const onFileSelected = (e) => {
  const file = e.target.files && e.target.files[0]
  if (file) {
    selectedFileName.value = file.name
  }
}

// Aadhaar OTP Verification State
const aadhaarOtp = ref(['', '', '', '', ''])
const aadhaarCountdown = ref(30)
const canResendAadhaarOtp = ref(false)
const showPassword = ref(false)
let aadhaarTimer = null

const sendAadhaarOtp = () => {
  canResendAadhaarOtp.value = false
  aadhaarCountdown.value = 30
  if (aadhaarTimer) clearInterval(aadhaarTimer)
  aadhaarTimer = setInterval(() => {
    aadhaarCountdown.value--
    if (aadhaarCountdown.value <= 0) {
      canResendAadhaarOtp.value = true
      clearInterval(aadhaarTimer)
    }
  }, 1000)
}

const handleAadhaarOtpInput = (e, idx) => {
  const val = e.target.value
  aadhaarOtp.value[idx] = val
  if (val && idx < 4) {
    const nextInput = e.target.nextElementSibling
    if (nextInput) nextInput.focus()
  }
}

const handleAadhaarOtpBackspace = (e, idx) => {
  if (!aadhaarOtp.value[idx] && idx > 0) {
    const prevInput = e.target.previousElementSibling
    if (prevInput) prevInput.focus()
  }
}

onUnmounted(() => {
  if (aadhaarTimer) clearInterval(aadhaarTimer)
})

const formattedDob = computed(() => {
  if (!form.dob) return ''
  const parts = form.dob.split('-')
  if (parts.length === 3) {
    return `${parts[1]} / ${parts[2]} / ${parts[0]}`
  }
  return form.dob
})

const formattedNomineeDob = computed(() => {
  if (!form.nomineeDob) return ''
  const parts = form.nomineeDob.split('-')
  if (parts.length === 3) {
    return `${parts[1]} / ${parts[2]} / ${parts[0]}`
  }
  return form.nomineeDob
})

const normalizeValue = (field, value) => {
  const v = (value ?? '').toString().trim()
  if (field === 'pan') return v.toUpperCase()
  if (field === 'aadhaar') return v.replace(/\s+/g, '')
  return v
}

const isAtLeast18 = (dob) => {
  const d = new Date(dob)
  if (isNaN(d.getTime()) || d > new Date()) return false
  const age = new Date(Date.now() - d.getTime()).getUTCFullYear() - 1970
  return age >= 18
}

const FIELD_RULES = {
  userName: { required: true, requiredMsg: 'Username is required', pattern: /^[A-Za-z][A-Za-z0-9_.]{2,19}$/, message: 'Username must be 3-20 characters (letters, numbers, _ or .)' },
  firstName: { required: true, requiredMsg: 'First name is required', pattern: /^[A-Za-z][A-Za-z\s.'-]{0,49}$/, message: 'Enter a valid first name' },
  lastName: { required: true, requiredMsg: 'Last name is required', pattern: /^[A-Za-z][A-Za-z\s.'-]{0,49}$/, message: 'Enter a valid last name' },
  dob: { required: true, requiredMsg: 'Date of birth is required', validator: isAtLeast18, message: 'You must be at least 18 years old to register' },
  gender: { required: true, requiredMsg: 'Please select a gender' },
  email: { required: true, requiredMsg: 'Email is required', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, message: 'Enter a valid email address' },
  mobile: { required: true, requiredMsg: 'Mobile number is required', pattern: /^[6-9]\d{9}$/, message: 'Enter a valid 10-digit mobile number starting with 6-9' },
  placement: { required: true, requiredMsg: 'Please select a placement preference' },
  password: { required: true, requiredMsg: 'Password is required', pattern: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/, message: 'Password must be at least 8 characters with letters and numbers' },
  confirmPassword: { required: true, requiredMsg: 'Please confirm the password', equals: 'password', equalsMsg: 'Passwords do not match' },
  pan: { required: true, requiredMsg: 'PAN number is required', pattern: /^[A-Z]{5}\d{4}[A-Z]$/, message: 'Enter a valid PAN (e.g. ABCDE1234F)' },
  aadhaar: { required: true, requiredMsg: 'Aadhaar number is required', pattern: /^\d{12}$/, message: 'Enter a valid 12-digit Aadhaar number' },
  kycType: { required: true, requiredMsg: 'Please select a KYC type' },
  address1: { required: true, requiredMsg: 'Address is required' },
  address2: { pattern: /^[A-Za-z0-9#,.()\-/\s.']*$/, message: 'Address contains invalid characters' },
  city: { required: true, requiredMsg: 'City is required', pattern: /^[A-Za-z][A-Za-z\s.'-]{0,49}$/, message: 'Enter a valid city name' },
  state: { required: true, requiredMsg: 'Please select a state' },
  pincode: { required: true, requiredMsg: 'Pincode is required', pattern: /^\d{6}$/, message: 'Enter a valid 6-digit pincode' },
  companyName: { required: true, requiredMsg: 'Company name is required' },
  companyType: { required: true, requiredMsg: 'Please select a company type' },
  nomineeName: { required: true, requiredMsg: 'Nominee name is required', pattern: /^[A-Za-z][A-Za-z\s.'-]{0,49}$/, message: 'Enter a valid nominee name' },
  nomineeRelation: { required: true, requiredMsg: 'Please select a relation' },
  nomineeDob: { required: true, requiredMsg: 'Nominee date of birth is required', validator: (v) => { const d = new Date(v); return !isNaN(d.getTime()) && d <= new Date(); }, message: 'Enter a valid nominee date of birth' },
  nomineeShare: { required: true, requiredMsg: 'Share % is required', pattern: /^(100|[1-9][0-9]?)$/, message: 'Enter a share percentage between 1 and 100' },
  bankHolder: { required: true, requiredMsg: 'Account holder name is required', pattern: /^[A-Za-z][A-Za-z\s.'-]{0,49}$/, message: 'Enter a valid account holder name' },
  bankAccount: { required: true, requiredMsg: 'Account number is required', pattern: /^\d{9,18}$/, message: 'Enter a valid account number (9-18 digits)' },
  bankAccountConfirm: { required: true, requiredMsg: 'Please confirm the account number', equals: 'bankAccount', equalsMsg: 'Account numbers do not match' },
  ifsc: { required: true, requiredMsg: 'IFSC code is required', pattern: /^[A-Z]{4}0[A-Z0-9]{6}$/, message: 'Enter a valid IFSC code' },
  bankName: { required: true, requiredMsg: 'Bank name is required' }
}

const STEP_FIELDS = {
  0: ['consent'],
  1: ['userName', 'firstName', 'lastName', 'dob', 'gender', 'email', 'mobile', 'placement', 'password', 'confirmPassword'],
  2: ['pan', 'aadhaar', 'kycType'],
  3: ['address1', 'city', 'state', 'pincode', 'companyName', 'companyType', 'nomineeName', 'nomineeRelation', 'nomineeDob', 'nomineeShare'],
  4: ['bankHolder', 'bankAccount', 'bankAccountConfirm', 'ifsc', 'bankName']
}

const validateField = (field) => {
  const rule = FIELD_RULES[field]
  if (!rule) return true
  const value = normalizeValue(field, form[field])

  if (rule.required && !value) {
    errors[field] = rule.requiredMsg || `${field} is required`
    return false
  }
  if (rule.pattern && !rule.pattern.test(value)) {
    errors[field] = rule.message || 'Invalid value entered'
    return false
  }
  if (rule.validator && !rule.validator(value, form)) {
    errors[field] = rule.message || 'Invalid value entered'
    return false
  }
  if (rule.equals && value !== normalizeValue(rule.equals, form[rule.equals])) {
    errors[field] = rule.equalsMsg || 'Values do not match'
    return false
  }
  errors[field] = ''
  return true
}

const onBlur = (field) => {
  validateField(field)
}

const onInput = (field) => {
  if (errors[field]) validateField(field)
}

const validateStep = (i) => {
  if (i === 0) {
    const allChecked = [form.decl1, form.decl2, form.decl3, form.decl4, form.decl5, form.decl6].every(Boolean)
    errors.consent = allChecked ? '' : 'Please accept all the declarations to continue.'
    return allChecked
  }
  let ok = true
  for (const field of STEP_FIELDS[i] || []) {
    if (!validateField(field)) ok = false
  }
  return ok
}

const failValidation = () => {
  shaking.value = true
  setTimeout(() => (shaking.value = false), 460)
}

const nextStep = () => {
  if (validateStep(currentStep.value)) {
    currentStep.value++
  } else {
    failValidation()
  }
}

const prevStep = () => {
  if (currentStep.value > 0) currentStep.value--
}

const goToStep = (index) => {
  if (index < currentStep.value) {
    currentStep.value = index
    return
  }
  if (index === currentStep.value) return

  // Validate every step between the current one and the target
  for (let i = currentStep.value; i < index; i++) {
    if (!validateStep(i)) {
      failValidation()
      return
    }
  }
  currentStep.value = index
}

const submitForm = async () => {
  if (!validateStep(currentStep.value)) {
    failValidation()
    return
  }

  const payload = buildDirectSellerPayload()
  isSubmitting.value = true
  submitError.value = ''

  try {
    const { data, error } = await submitDirectSellerApplication(payload)
    if (error || !data) {
      submitError.value = error || 'Something went wrong. Please try again.'
      failValidation()
      return
    }
    submitted.value = true
  } catch (err) {
    console.error('Direct seller submit error:', err)
    submitError.value = 'An unexpected error occurred. Please try again.'
    failValidation()
  } finally {
    isSubmitting.value = false
  }
}

// Builds a flat payload matching the backend `auth/register` Direct Seller shape.
const KYC_TYPE_MAP = {
  'Aadhaar Based eKYC': 'AADHAAR',
  'PAN Card': 'PAN',
  'Passport': 'PASSPORT',
  'Voter ID': 'VOTER_ID'
}

const buildDirectSellerPayload = () => {
  const otp = aadhaarOtp.value.join('').trim()
  const idProofFileName = selectedFileName.value

  return {
    userName: form.userName.trim(),
    firstName: form.firstName.trim(),
    middleName: form.middleName.trim() || '',
    lastName: form.lastName.trim(),
    email: form.email.trim(),
    phone: normalizeValue('mobile', form.mobile),
    password: form.password,
    confirmPassword: form.confirmPassword,
    sponsorUsername: form.sponsor.trim() || '',

    desiredMembershipType: 'DIRECT_SELLER',
    placementPreference: form.placement,

    termsAccepted: [form.decl1, form.decl2, form.decl3, form.decl4, form.decl5, form.decl6].every(Boolean),
    title: form.title || '',
    parentSpouseTitle: form.parentSpouseTitle || '',
    parentSpouseName: form.parentSpouseName.trim() || '',
    gender: (form.gender || '').toUpperCase(),
    dateOfBirth: form.dob,
    maritalStatus: (form.marital || '').toUpperCase(),
    profession: form.profession || '',

    addressLine1: form.address1.trim(),
    addressLine2: form.address2.trim() || '',
    landmark: form.landmark.trim() || '',
    city: form.city.trim(),
    district: form.district.trim() || '',
    state: form.state,
    pincode: form.pincode.trim(),
    postOffice: form.postOffice.trim() || '',

    companyName: form.companyName.trim() || '',
    companyType: form.companyType || '',
    gstNumber: form.gstNumber.trim() || '',

    nomineeName: form.nomineeName.trim(),
    nomineeRelation: (form.nomineeRelation || '').toUpperCase(),
    nomineeDateOfBirth: form.nomineeDob,

    kycDocumentType: KYC_TYPE_MAP[form.kycType] || 'AADHAAR',
    kycDocumentNumber: normalizeValue('aadhaar', form.aadhaar) || normalizeValue('pan', form.pan),
    kycDigilockerUri: form.kycDigilockerUri.trim() || '',
    kycIssuer: form.kycIssuer.trim() || '',

    bankAccountHolderName: form.bankHolder.trim(),
    bankName: form.bankName.trim(),
    bankAccountNumber: form.bankAccount.trim(),
    bankIfscCode: normalizeValue('ifsc', form.ifsc),
    bankUpiId: form.upi.trim() || '',

    // Only sent when the user actually entered a complete Aadhaar OTP.
    idProofFileName: idProofFileName || null,
    aadhaarOtp: otp.length === 5 ? otp : null
  }
}

useHead({
  title: 'Become A Direct Seller | VCH',
  bodyAttrs: { class: 'direct-seller-page' }
})
</script>

<style scoped>
:global(body.direct-seller-page) {
  background-color: #f7f9f4 !important;
}

.ds-wrapper {
  position: relative;
  min-height: 100vh;
  background-color: #f7f9f4;
  padding: 20px 16px 60px;
  overflow-x: hidden;
}

.ds-bg-leaf {
  position: absolute;
  pointer-events: none;
  z-index: 0;
}

.ds-leaf-left {
  top: 140px;
  left: -20px;
}

.ds-leaf-right {
  top: 180px;
  right: -20px;
}

.ds-container {
  position: relative;
  z-index: 1;
  max-width: 1080px;
  margin: 0 auto;
}

/* Header Section */
.ds-header-block {
  text-align: center;
  margin-bottom: 22px;
}

.ds-top-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  border-radius: 20px;
  background: #edf5e7;
  border: 1px solid #cde3c1;
  font-size: 12.5px;
  font-weight: 600;
  color: #0d4018;
  margin-bottom: 10px;
}

.ds-badge-leaf {
  font-size: 13px;
}

.ds-main-title {
  font-size: 30px;
  font-weight: 800;
  color: #0d4018;
  margin-bottom: 6px;
  letter-spacing: -0.02em;
}

.ds-main-subtitle {
  font-size: 14px;
  color: #5d6c54;
  font-weight: 500;
}

/* Horizontal Stepper */
.ds-stepper-wrapper {
  margin-bottom: 28px;
  width: 100%;
  padding: 4px 0;
}

/* Mobile current-step label (hidden on desktop) */
.ds-mobile-step-label {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 14px;
}

.ds-mobile-step-num {
  font-size: 11px;
  font-weight: 700;
  color: #0d4018;
  background: #eaf3e2;
  border: 1px solid #cde3c1;
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.ds-mobile-step-name {
  font-size: 14px;
  font-weight: 800;
  color: #0d4018;
}

.ds-stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
}

.ds-step-item {
  flex: 1 1 0%;
  min-width: 0;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  border-radius: 12px;
  background: #ffffff;
  border: 1.5px solid #e1ebd9;
  cursor: pointer;
  transition: all 0.25s ease;
  user-select: none;
}

.ds-step-item.active {
  background: #f1f7ea;
  border-color: #bfe0aa;
  box-shadow: 0 4px 14px rgba(13, 64, 24, 0.06);
}

.ds-step-item.completed {
  background: #ffffff;
  border-color: #d6e2cb;
}

.ds-step-item.upcoming {
  opacity: 0.85;
}

.ds-step-item:hover {
  border-color: #a9cf90;
}

.ds-step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 700;
  flex-shrink: 0;
  transition: all 0.25s ease;
  background: #ffffff;
  border: 1.5px solid #d4decc;
  color: #2c3826;
}

.ds-step-item.active .ds-step-circle,
.ds-step-item.completed .ds-step-circle {
  background: #0d4018;
  border-color: #0d4018;
  color: #ffffff;
}

.ds-step-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.ds-step-title {
  font-size: 12.5px;
  font-weight: 700;
  color: #0d4018;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-step-desc {
  font-size: 11px;
  color: #6a7962;
  font-weight: 400;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-step-line {
  flex: 0 1 16px;
  min-width: 6px;
  height: 2px;
  background: #dde5d5;
  flex-shrink: 1;
  border-radius: 2px;
  transition: background 0.3s ease;
}

.ds-step-line.filled {
  background: #0d4018;
}

/* Card Section */
.ds-card {
  background: #ffffff;
  border: 1.5px solid #e1e9da;
  border-radius: 20px;
  padding: 32px 38px;
  box-shadow: 0 12px 36px rgba(13, 64, 24, 0.05);
}

.ds-card-title {
  font-size: 24px;
  font-weight: 800;
  color: #0d4018;
  margin-bottom: 4px;
}

.ds-card-desc {
  font-size: 13.5px;
  color: #5d6c54;
  margin-bottom: 24px;
}

/* Form Layout */
.ds-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px 22px;
}

.ds-field-group {
  display: flex;
  flex-direction: column;
}

.ds-full-width {
  grid-column: 1 / -1;
}

.ds-field-group label {
  font-size: 13.5px;
  font-weight: 700;
  color: #232d1d;
  margin-bottom: 7px;
}

.ds-input,
.ds-select {
  width: 100%;
  height: 48px;
  border: 1.5px solid #d8e2d2;
  border-radius: 12px;
  padding: 0 16px;
  font-size: 14px;
  color: #1a2316;
  background: #f8faf6;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.25s ease;
}

.ds-input::placeholder {
  color: #9aa893;
}

.ds-input:focus,
.ds-select:focus {
  outline: none;
  border-color: #0d4018;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(13, 64, 24, 0.1);
}

.uppercase-text {
  text-transform: uppercase;
}

/* Input Wrappers & Icons */
.ds-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

.ds-input-icon-left {
  position: absolute;
  left: 14px;
  color: #798b71;
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 2;
}

.ds-has-left-icon {
  padding-left: 44px;
}

.ds-input-icon-right {
  position: absolute;
  right: 14px;
  background: transparent;
  border: none;
  color: #798b71;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
}

.ds-has-right-icon {
  padding-right: 44px;
}

/* Date Field */
.ds-date-wrapper {
  position: relative;
}

.ds-date-native {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 3;
}

.ds-date-display {
  width: 100%;
  height: 48px;
  border: 1.5px solid #d8e2d2;
  border-radius: 12px;
  padding: 0 44px 0 16px;
  font-size: 14px;
  color: #1a2316;
  background: #f8faf6;
  display: flex;
  align-items: center;
  pointer-events: none;
}

.ds-date-display.empty {
  color: #9aa893;
}

/* Select Dropdown */
.ds-select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.ds-select {
  appearance: none;
  -webkit-appearance: none;
  padding-right: 40px;
  cursor: pointer;
}

.ds-select-arrow {
  position: absolute;
  right: 14px;
  color: #5d6c54;
  pointer-events: none;
  display: flex;
  align-items: center;
}

/* File Dropzone */
.ds-file-dropzone {
  height: 48px;
  border: 1.5px dashed #c4d4bd;
  border-radius: 12px;
  background: #f8faf6;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0 16px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.ds-file-dropzone:hover {
  border-color: #0d4018;
  background: #f2f7ef;
}

.ds-cloud-icon {
  color: #6a7962;
}

.ds-file-label {
  font-size: 13.5px;
  color: #5d6c54;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-hidden-file {
  display: none;
}

/* KYC Split Layout */
.ds-kyc-layout {
  display: grid;
  grid-template-columns: 1fr 0.95fr;
  gap: 28px;
  align-items: flex-start;
}

.ds-kyc-grid {
  grid-template-columns: 1fr 1fr;
}

/* Right Aadhaar Card Box */
.ds-aadhaar-box {
  background: #f8fbf6;
  border: 1.5px solid #e1e9da;
  border-radius: 16px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.ds-aadhaar-top {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.ds-aadhaar-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ds-aadhaar-img {
  width: 76px;
  height: auto;
  object-fit: contain;
}

.ds-aadhaar-heading h3 {
  font-size: 16px;
  font-weight: 800;
  color: #0d4018;
  margin-bottom: 4px;
}

.ds-aadhaar-heading p {
  font-size: 12.5px;
  color: #5d6c54;
  line-height: 1.45;
}

.ds-btn-send-otp {
  width: 100%;
  height: 46px;
  border-radius: 10px;
  background: #0d4018;
  color: #ffffff;
  border: none;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 12px rgba(13, 64, 24, 0.15);
}

.ds-btn-send-otp:hover {
  background: #082d11;
}

/* OTP Section */
.ds-otp-block {
  margin-top: 4px;
}

.ds-otp-header label {
  font-size: 13px;
  font-weight: 700;
  color: #232d1d;
  display: block;
  margin-bottom: 8px;
}

.ds-otp-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.ds-otp-boxes {
  display: flex;
  gap: 8px;
}

.ds-otp-cell {
  width: 38px;
  height: 42px;
  border: 1.5px solid #d8e2d2;
  border-radius: 8px;
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  color: #1a2316;
  background: #ffffff;
  transition: all 0.2s ease;
}

.ds-otp-cell:focus {
  outline: none;
  border-color: #0d4018;
  box-shadow: 0 0 0 3px rgba(13, 64, 24, 0.1);
}

.ds-resend-btn {
  background: #ffffff;
  border: 1px solid #d8e2d2;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 12px;
  font-weight: 600;
  color: #5d6c54;
  cursor: pointer;
  white-space: nowrap;
}

.ds-resend-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.ds-aadhaar-hint {
  font-size: 11.5px;
  color: #798b71;
  margin-top: 10px;
  line-height: 1.4;
}

.ds-hint {
  font-size: 12px;
  color: #798b71;
  margin-top: 6px;
}

.ds-error-msg {
  font-size: 12px;
  color: #d9381e;
  font-weight: 600;
  margin-top: 6px;
}

/* Submit-level error banner */
.ds-submit-error {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 18px;
  padding: 12px 16px;
  border-radius: 12px;
  background: #fdf0ed;
  border: 1.5px solid #f3c3b6;
  color: #b3261e;
  font-size: 13.5px;
  font-weight: 600;
}

.ds-submit-error-icon {
  font-size: 15px;
  line-height: 1;
}

/* Declarations (Step 0) */
.ds-decl-grid {
  display: grid;
  gap: 14px;
  margin-bottom: 24px;
}

.ds-decl-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 16px 18px;
  border: 1.5px solid #d8e2d2;
  border-radius: 14px;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.25s ease;
}

.ds-decl-item:hover {
  border-color: #0d4018;
  background: #f8faf6;
}

.ds-decl-item input[type="checkbox"] {
  display: none;
}

.ds-decl-box {
  width: 22px;
  height: 22px;
  border: 2px solid #b8c6b2;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  transition: all 0.2s ease;
  background: #ffffff;
}

.ds-check-custom {
  opacity: 0;
  color: #0d4018;
  font-size: 14px;
  font-weight: 800;
  transform: scale(0.6);
  transition: all 0.2s ease;
}

.ds-decl-item input[type="checkbox"]:checked + .ds-decl-box {
  border-color: #0d4018;
  background: #ffffff;
}

.ds-decl-item input[type="checkbox"]:checked + .ds-decl-box .ds-check-custom {
  opacity: 1;
  transform: scale(1);
}

.ds-decl-text {
  font-size: 14px;
  line-height: 1.55;
  color: #2d3826;
}

/* Action Buttons */
.ds-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  padding-top: 12px;
}

.ds-btn {
  height: 48px;
  padding: 0 28px;
  border-radius: 12px;
  font-size: 14.5px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.25s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.ds-btn-prev {
  background: #ffffff;
  border: 1.5px solid #d4decc;
  color: #2c3826;
}

.ds-btn-prev:hover {
  border-color: #0d4018;
  color: #0d4018;
  background: #f4f8f1;
}

.ds-btn-next {
  background: #0d4018;
  border: none;
  color: #ffffff;
  box-shadow: 0 6px 18px rgba(13, 64, 24, 0.18);
}

.ds-btn-next:hover:not(:disabled) {
  background: #093012;
}

.ds-btn-next:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

/* Shake Error Animation */
@keyframes ds-shake-anim {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-5px); }
  80% { transform: translateX(5px); }
}

.ds-shake {
  animation: ds-shake-anim 0.4s ease;
}

/* Success Card */
.ds-success-box {
  text-align: center;
  padding: 40px 20px;
}

.ds-success-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: #0d4018;
  color: #ffffff;
  font-size: 32px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
}

.ds-success-box h2 {
  font-size: 26px;
  font-weight: 800;
  color: #0d4018;
  margin-bottom: 12px;
}

.ds-success-box p {
  font-size: 15px;
  color: #5d6c54;
  max-width: 520px;
  margin: 0 auto 28px;
  line-height: 1.6;
}

/* Responsive Media Queries */
@media (max-width: 1024px) {
  .ds-kyc-layout {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 991px) {
  .ds-main-title {
    font-size: 30px;
  }
  .ds-step-item {
    padding: 6px 8px;
    gap: 6px;
  }
  .ds-step-title {
    font-size: 11.5px;
  }
  .ds-step-desc {
    font-size: 10px;
  }
  .ds-card {
    padding: 28px 24px;
  }
  .ds-leaf-left,
  .ds-leaf-right {
    display: none;
  }
}

@media (max-width: 767px) {
  .ds-form-grid,
  .ds-kyc-grid {
    grid-template-columns: 1fr;
  }
  .ds-full-width {
    grid-column: 1;
  }
  .ds-main-title {
    font-size: 26px;
  }

  /* Mobile stepper: circles + connectors with a labeled current step */
  .ds-mobile-step-label {
    display: flex;
  }

  .ds-stepper {
    gap: 8px;
  }

  .ds-step-desc {
    display: none;
  }

  .ds-step-info {
    display: none;
  }

  .ds-step-item {
    flex: 1 1 0%;
    min-width: 0;
    padding: 6px 2px;
    gap: 6px;
    justify-content: center;
  }

  .ds-step-title {
    font-size: 11px;
  }
  .ds-step-circle {
    width: 24px;
    height: 24px;
    font-size: 11px;
  }
  .ds-step-line {
    flex: 0 1 1fr;
    min-width: 6px;
  }
  .ds-card {
    padding: 22px 18px;
    border-radius: 16px;
  }
  .ds-actions {
    gap: 12px;
  }
  .ds-btn {
    padding: 0 20px;
    font-size: 13.5px;
  }
}
</style>
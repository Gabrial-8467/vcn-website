<template>
  <!-- Navbar -->
  <header>
    <nav class="navbar" :class="{ 'scrolled': isHydrated && isScrolled }" id="navbar">
      <div class="container">
        <!-- Mobile Layout -->
        <NuxtLink class="navbar-brand d-lg-none" to="/">
          <img src="/img/logo/logo.png" alt="Logo" class="nav-img" />
        </NuxtLink>

        <!-- Mobile Action Icons Bar (User, Cart, Menu) -->
        <div class="d-lg-none mobile-actions-bar">

          <!-- Account / Login Button -->
          <button type="button" class="mobile-action-btn user-icon-btn" @click="handleMobileUserClick" :aria-label="authState.isLoggedIn ? 'My Account' : 'Login'">
            <span class="mobile-login-text">{{ authState.isLoggedIn ? (authState.user?.userName || 'Hi, User') : 'Login' }}</span>
          </button>

          <!-- Cart Link -->
          <NuxtLink to="/cart" class="mobile-action-btn cart-icon-btn" aria-label="Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <ClientOnly>
              <span v-if="cartStore.cartCount > 0" class="mobile-cart-badge">{{ cartStore.cartCount }}</span>
            </ClientOnly>
          </NuxtLink>

          <!-- Hamburger Menu Button -->
          <button class="mobile-action-btn menu-icon-btn" type="button" onclick="toggleMenu()" aria-label="Toggle menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-burger-icon">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="menu-close-icon">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Desktop Layout -->
        <div class="nav-left-wrapper d-none d-lg-flex">
          <NuxtLink class="navbar-brand" to="/">
            <img src="/img/logo/logo.png" alt="Logo" class="nav-img" />
          </NuxtLink>

          <ul class="desktop-nav">
            <li class="nav-item dropdown" @mouseleave="handleMouseLeave">
              <NuxtLink class="nav-link" to="">Shop</NuxtLink>
              <ul class="dropdown-menu" @click="handleDropdownClick">
                <!-- Scrollable product list -->
                <li class="dropdown-products-scroll">
                  <ul class="dropdown-products-list">
                    <li v-for="product in shopProducts" :key="product.id">
                      <NuxtLink class="dropdown-item" :to="`/product-details/${product.slug}`">
                        <img :src="productStore.getPrimaryImage(product)" :alt="product.name" />
                        {{ product.name }}
                      </NuxtLink>
                    </li>
                  </ul>
                </li>
                <!-- Fixed footer pinned at bottom -->
                <li class="dropdown-footer">
                  <NuxtLink to="/all-products" class="shop-all-link">
                    <span>Shop All Products</span>
                    <span class="arrow">→</span>
                  </NuxtLink>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown" @mouseleave="handleMouseLeave">
              <NuxtLink class="nav-link" to="">Science</NuxtLink>
              <ul class="dropdown-menu" @click="handleDropdownClick">
                <li>
                  <NuxtLink class="dropdown-item" to="/all-products">
                    <img src="/img/drop-down/abput us.png" alt="Approach" />
                    <strong>V-GANO</strong>
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" to="/all-products">
                    <img src="/img/image/vcnlabs.png" alt="VCN Labs" />
                    <strong>V-VEDA</strong>
                  </NuxtLink>
                </li>
                <!-- <li>
                  <a class="dropdown-item" href="/approach#scientists">
                    <img
                      src=""
                      alt="VCN Labs" />
                    <strong>Scientists</strong>
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/sustainability">
                    <img
                      src=""
                      alt="VCN Labs" />
                    <strong>Sustainability</strong>
                  </a>
                </li> -->
                <!-- <li>
                  <a href="" class="dropdown-item"><strong>References</strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li>
                <li>
                  <a href="javascript:void(0)" class="dropdown-item"><strong></strong></a>
                </li> -->
              </ul>
            </li>
            <li class="nav-item dropdown" @mouseleave="handleMouseLeave">
              <NuxtLink class="nav-link" to="">About Us</NuxtLink>
              <ul class="dropdown-menu" @click="handleDropdownClick">
                <li>
                  <NuxtLink class="dropdown-item" to="/vcn-R-D">
                    <img src="/img/drop-down/blog.png" alt="Research" />
                    R & D
                  </NuxtLink>
                </li>
                <li>
                  <NuxtLink class="dropdown-item" to="/contact-us">
                    <img src="/img/drop-down/sustainability.png" alt="Research" />
                    Contact Us
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="nav-right-wrapper d-none d-lg-flex align-items-center gap-3">
          <template v-if="authState.isLoggedIn">
            <div class="user-dropdown-wrapper">
              <span class="user-greeting">
                <span class="user-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                  </svg>
                </span>
                Hi, {{ authState.user?.userName || 'User' }}
              </span>
              <div class="user-dropdown-menu">
                <div class="user-info-header">
                  <span class="user-email">{{ authState.user?.email }}</span>
                </div>
                <hr class="dropdown-divider" />
                <NuxtLink to="/my-account" class="dropdown-link account-action">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="panel-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                  </svg>
                  My Account
                </NuxtLink>
                <hr class="dropdown-divider" />
                <a href="https://user.mlm.vcarenetwork.in/auth/login" target="_blank" class="dropdown-link panel-action">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="panel-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                  </svg>
                  Your Direct Seller Panel
                </a>
                <hr class="dropdown-divider" />
                <NuxtLink to="#" class="dropdown-link logout-action" @click.prevent="handleLogout">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="logout-icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                  </svg>
                  Logout
                </NuxtLink>
              </div>
            </div>
          </template>
          <template v-else>
            <NuxtLink to="#" class="login-link" @click.prevent="openForm">Login</NuxtLink>
          </template>
          <NuxtLink to="/cart" class="navbar-btn">
            Cart
            <ClientOnly>
              <span v-if="cartStore.cartCount > 0" class="cart-count-badge">{{ cartStore.cartCount }}</span>
            </ClientOnly>
          </NuxtLink>
        </div>

        <!-- Sign In Modal (Teleport to body for proper stacking) -->
        <teleport to="body">
          <!-- Overlay -->
          <div v-if="isOpen" class="overlay" @click="closeForm"></div>

          <!-- Form Container -->
          <div v-if="isOpen" class="slide-form-container">
              <div class="auth-modal-card">
                <button class="close-btn" @click="closeForm" aria-label="Close modal">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>

                <!-- Left Column: Brand & Atmospheric Product Sidebar (matches Register form) -->
                <div class="auth-modal-left">
                  <div class="brand-logo-wrap">
                    <img src="/img/logo/logo.png" alt="VCN Logo" class="reg-brand-logo" />
                    <span class="brand-tagline">PURE AYURVEDIC WELLNESS</span>
                  </div>

                  <h2 class="sidebar-main-title">
                    Transform Your Health.<br />
                    Transform Your Life.
                  </h2>

                  <div class="sidebar-body-wrap">
                    <div class="reg-features-list">
                      <div class="reg-feature-item">
                        <div class="reg-feature-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
                            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
                          </svg>
                        </div>
                        <div class="reg-feature-text">
                          <h4>Authentic Ayurvedic Products</h4>
                          <p>Rooted in tradition, made for a healthier you.</p>
                        </div>
                      </div>

                      <div class="reg-feature-item">
                        <div class="reg-feature-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                            <circle cx="9" cy="7" r="4"></circle>
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                          </svg>
                        </div>
                        <div class="reg-feature-text">
                          <h4>Exclusive Offers</h4>
                          <p>Be the first to know about new launches and deals.</p>
                        </div>
                      </div>

                      <div class="reg-feature-item">
                        <div class="reg-feature-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                            <path d="m9 12 2 2 4-4"></path>
                          </svg>
                        </div>
                        <div class="reg-feature-text">
                          <h4>A Trusted Community</h4>
                          <p>Join thousands on a journey to better health.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="reg-cursive-footer">
                    Better Health<br />Brighter You
                  </div>
                </div>

                <!-- Right Column: Sign In -->
                <div class="auth-modal-right">
                  <div class="auth-header">
                    <h2>Welcome Back</h2>
                    <p>Sign in to continue your wellness journey.</p>
                  </div>

                  <form @submit.prevent="handleLogin" class="auth-form">
                    <div class="form-group">
                      <label for="login-identifier">Username, Email, or Mobile Number</label>
                      <div class="input-with-icon">
                        <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                          <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                        <input type="text" id="login-identifier" v-model="formData.identifier" placeholder="Username, email, or mobile" class="form-input">
                      </div>
                    </div>

                    <div class="form-group">
                      <label for="password">Password</label>
                      <div class="input-with-icon password-wrapper">
                        <svg class="field-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="formData.password" placeholder="Password" class="form-input">
                        <button type="button" class="toggle-password" @click="showPassword = !showPassword" aria-label="Toggle password visibility">
                          <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                          <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                            <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                            <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                            <line x1="2" y1="2" x2="22" y2="22" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div class="forgot-wrapper">
                      <NuxtLink to="#" class="forgot-password">Forgot Password</NuxtLink>
                    </div>

                    <div v-if="loginError" class="login-error-message text-danger mb-3">{{ loginError }}</div>

                    <button type="submit" class="signin-btn" :disabled="isLoggingIn">
                      <span>{{ isLoggingIn ? 'SIGNING IN...' : 'SIGN IN' }}</span>
                    </button>

                    <!-- Social Sign In -->
                    <div class="social-signin-section">
                      <p class="social-title">Sign in with</p>
                      <div class="social-icons-wrap">
                        <button type="button" class="social-circle-btn" aria-label="Sign in with Google">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
                            <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                            <path fill="#FF3D00" d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                            <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                            <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
                          </svg>
                        </button>
                        <button type="button" class="social-circle-btn" aria-label="Sign in with Facebook">
                          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="#1877F2"/>
                            <path fill="#FFFFFF" d="M26.62 38V25.38h4.24l.63-4.92h-4.87v-3.14c0-1.42.39-2.39 2.43-2.39h2.6V10.53c-.45-.06-2-.19-3.8-.19-3.76 0-6.33 2.29-6.33 6.51v3.61h-4.24v4.92h4.24V38h5.1z"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </form>

                  <!-- Register CTA -->
                  <div class="auth-register-section">
                    <div class="register-title-row">
                      <span class="register-title">New to VCN?</span>
                      <svg class="info-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                      </svg>
                    </div>

                    <div class="register-buttons-group">
                      <button type="button" class="register-outline-btn" @click="openRegistration('preferred-customer')">
                        PREFERRED CUSTOMER
                      </button>
                      <button type="button" class="register-outline-btn" @click="openDirectSeller">
                        DIRECT SELLER
                      </button>
                    </div>
                  </div>

                  <!-- Terms & Privacy Links -->
                  <div class="auth-footer-links">
                    <NuxtLink to="/terms-conditions" target="_blank">Terms & Conditions</NuxtLink>
                    <NuxtLink to="/privacy-policy" target="_blank">Privacy</NuxtLink>
                  </div>
                </div>
              </div>
            </div>
        </teleport>



        <!-- Mobile Full Screen Menu -->
        <div class="navbar-collapse" id="navbarContent">
          <!-- <div class="mobile-menu-header">
              <img src="/img/logo/logo.png" alt="Logo" class="mobile-logo" />
              <button class="close-menu" onclick="toggleMenu()">×</button>
            </div> -->

          <ul class="navbar-nav">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'shopAccordion')">Shop</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'scienceAccordion')">Science</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'learnAccordion')">About</NuxtLink>
            </li>
            <li class="nav-item" v-if="authState.isLoggedIn">
              <NuxtLink class="nav-link" to="#" onclick="toggleAccordion(event, 'accountAccordion')">My Account</NuxtLink>
            </li>
            <li class="nav-item nav-menu-actions">
              <NuxtLink to="/cart" class="mobile-action-btn nav-menu-cart-btn" aria-label="Cart">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <ClientOnly>
                  <span v-if="cartStore.cartCount > 0" class="mobile-cart-badge">{{ cartStore.cartCount }}</span>
                </ClientOnly>
              </NuxtLink>
            </li>
            <li class="nav-item nav-menu-actions">
              <button class="mobile-action-btn nav-menu-close-btn" type="button" onclick="toggleMenu()" aria-label="Close menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </li>
          </ul>

          <!-- Account Accordion (logged in) -->
          <div class="dropdown-content" id="accountAccordion">
            <div class="mobile-account-menu">
              <div class="mobile-account-header">
                <span class="user-avatar">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                  </svg>
                </span>
                <div class="mobile-account-id">
                  <strong>{{ authState.user?.userName || 'User' }}</strong>
                  <span class="user-email">{{ authState.user?.email }}</span>
                </div>
              </div>
              <hr class="dropdown-divider" />
              <NuxtLink to="/my-account" class="dropdown-link account-action" @click="closeMobileMenu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="panel-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
                </svg>
                My Account
              </NuxtLink>
              <a href="https://user.mlm.vcarenetwork.in/auth/login" target="_blank" class="dropdown-link panel-action" @click="closeMobileMenu">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="panel-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
                Your Direct Seller Panel
              </a>
              <hr class="dropdown-divider" />
              <button type="button" class="dropdown-link logout-action" @click="handleLogout">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="logout-icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
                </svg>
                Logout
              </button>
            </div>
          </div>

          <!-- Shop Accordion -->
          <div class="dropdown-content" id="shopAccordion">
            <div class="dropdown-menu-mobile">
              <!-- Scrollable product list -->
              <div class="mobile-products-scroll">
                <NuxtLink v-for="product in shopProducts" :key="product.id" class="dropdown-item"
                  :to="`/product-details/${product.slug}`">
                  <img :src="productStore.getPrimaryImage(product)" :alt="product.name" />
                  {{ product.name }}
                </NuxtLink>
              </div>
              <!-- Fixed footer pinned at bottom -->
              <div class="dropdown-footer">
                <NuxtLink to="/all-products" class="shop-all-link">
                  <span>Shop All Products</span>
                  <span class="arrow">→</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <!-- Science Accordion -->
          <div class="dropdown-content" id="scienceAccordion">
            <div class="dropdown-menu-mobile">

              <NuxtLink class="dropdown-item" to="/all-products">
                <img src="/img/drop-down/abput us.png" alt="VCN Labs" />
                <strong>V-Gano</strong>
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/all-products">
                <img src="/img/image/vcnlabs.png" alt="VCN Labs" />
                <strong>V-Veda</strong>
              </NuxtLink>

            </div>
          </div>

          <!-- Learn Accordion -->
          <div class="dropdown-content" id="learnAccordion">
            <div class="dropdown-menu-mobile">
              <NuxtLink class="dropdown-item" to="/blog">
                <img src="/img/drop-down/blog.png" alt="Research" />
                Blogs
              </NuxtLink>
              <NuxtLink class="dropdown-item" to="/contact-us">
                <img src="/img/drop-down/sustainability.png" alt="Research" />
                Contact Us
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <!-- Registration Modal (Teleport to body for proper stacking) -->
  <!-- Navbar template ke end mein -->
  <teleport to="body">
    <!-- Overlay -->
    <div v-if="showRegistration" class="registration-overlay" @click="showRegistration = false"></div>

    <RegistrationForm v-if="showRegistration" :userType="selectedUserType" @close="showRegistration = false"
      @complete="handleRegistrationComplete" />
  </teleport>
</template>


<script setup>
import { ref, reactive, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import RegistrationForm from '@/components/RegistrationForm.vue'
import { useCartStore } from '~/stores/cart'
import { useAuthCart } from '~/composables/useAuthCart'
import { useApi } from '~/config/api/useApi'
import { useProductStore } from '~/stores/product'


//product store
const productStore = useProductStore()

// Cart store - proper Nuxt/Pinia pattern
const cartStore = useCartStore()
const { getFromEndpoint } = useApi()

// Auth cart composable
const { authState, loginWithPersistence, logoutWithCleanup, initializeCart } = useAuthCart()

const route = useRoute()
const router = useRouter()

// Mobile Actions & Search State
const isSearchOpen = ref(false)
const searchQuery = ref('')
const searchInputRef = ref(null)

const handleMobileUserClick = () => {
  closeMobileMenu()
  if (authState.value?.isLoggedIn || authState.isLoggedIn) {
    router.push('/my-account')
  } else {
    openForm()
  }
}

const toggleSearch = () => {
  closeMobileMenu()
  isSearchOpen.value = !isSearchOpen.value
  if (isSearchOpen.value) {
    nextTick(() => {
      searchInputRef.value?.focus()
    })
  }
}

const closeSearch = () => {
  isSearchOpen.value = false
  searchQuery.value = ''
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim()
    closeSearch()
    router.push({ path: '/all-products', query: { search: q } })
  }
}

const filteredProducts = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase().trim()
  const allProds = (productStore.products && productStore.products.length > 0) ? productStore.products : shopProducts.value
  return allProds.filter(p => p.name?.toLowerCase().includes(q) || p.slug?.toLowerCase().includes(q)).slice(0, 5)
})

// Close mobile menu helper
const closeMobileMenu = () => {
  if (process.client) {
    const navbarContent = document.getElementById('navbarContent')
    const body = document.body
    if (navbarContent) {
      navbarContent.classList.remove('show')
    }
    body.classList.remove('menu-open')
    body.style.overflow = ''
    
    // Close all accordions too
    document.querySelectorAll('.dropdown-content').forEach(d => d.classList.remove('show'))
    document.querySelectorAll('.navbar-nav .nav-link').forEach(l => l.classList.remove('active'))
  }
}

const handleDropdownClick = (event) => {
  if (event.target.closest('a')) {
    const menu = event.currentTarget
    if (menu) {
      console.log('Force closing dropdown menu:', menu)
      menu.classList.add('force-closed')
    }
  }
}

const handleMouseLeave = (event) => {
  const menu = event.currentTarget.querySelector('.dropdown-menu')
  if (menu) {
    console.log('Resetting force-closed dropdown menu:', menu)
    menu.classList.remove('force-closed')
  }
}

// Watch route changes to close mobile menu automatically
watch(() => route.fullPath, () => {
  closeMobileMenu()
})

// Initialize cart data on mount
onMounted(() => {
  // Initialize cart based on auth state (non-blocking)
  initializeCart()

  // Load cart data from appropriate source
  if (process.client && window.localStorage) {
    cartStore.loadCart()
  }

  // Fetch products for shop dropdown (non-blocking)
  fetchShopProducts()

  // Close mobile menu when clicking any navigation link inside it
  if (process.client) {
    const mobileMenu = document.getElementById('navbarContent')
    if (mobileMenu) {
      mobileMenu.addEventListener('click', (e) => {
        const link = e.target.closest('a')
        if (link && link.getAttribute('href') !== '#') {
          closeMobileMenu()
        }
      })
    }
  }
})

// Registration form state
const { isOpen, openAuthModal, closeAuthModal } = useAuthModal()
const showPassword = ref(false)
const formData = reactive({
  identifier: '',
  password: ''
})

const openForm = () => {
  openAuthModal()
  document.body.style.overflow = 'hidden'
}

const closeForm = () => {
  closeAuthModal()
  document.body.style.overflow = ''
  // Reset form
  formData.identifier = ''
  formData.password = ''
}

const isLoggingIn = ref(false)
const loginError = ref('')

const handleLogin = async () => {
  if (!formData.identifier || !formData.password) {
    loginError.value = 'Please enter both identifier and password.'
    return
  }

  isLoggingIn.value = true
  loginError.value = ''

  try {
    const result = await loginWithPersistence({
      identifier: formData.identifier,
      password: formData.password
    })

    if (result.success) {
      closeForm()
    } else {
      loginError.value = result.error || 'Login failed. Please check your credentials.'
    }
  } catch (err) {
    console.error('Login submit error:', err)
    loginError.value = 'An unexpected error occurred during login.'
  } finally {
    isLoggingIn.value = false
  }
}

const handleLogout = async () => {
  try {
    await logoutWithCleanup()
    closeMobileMenu()
  } catch (err) {
    console.error('Logout error:', err)
  }
}

const showRegistration = ref(false)
const selectedUserType = ref('preferred-customer')

watch([isOpen, showRegistration], ([newIsOpen, newShowReg]) => {
  if (process.client) {
    if (newIsOpen || newShowReg) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.classList.add('modal-open')
      document.documentElement.classList.add('modal-open')
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.classList.remove('modal-open')
      document.documentElement.classList.remove('modal-open')
    }
  }
}, { immediate: true })

const openRegistration = (type) => {
  selectedUserType.value = type
  showRegistration.value = true
}

const openDirectSeller = () => {
  closeForm()
  router.push('/direct-seller')
}

const handleRegistrationComplete = (data) => {
  console.log('✅ Registered:', data)
  showRegistration.value = false
}

// Shop dropdown products
const shopProducts = ref([])


// Fetch products for shop dropdown
const fetchShopProducts = async () => {
  try {
    const { data, error } = await getFromEndpoint('PRODUCTS')
    if (!error && data?.data) {
      // Get first 5 products
      shopProducts.value = data.data.slice(0, 5)
    }
  } catch (err) {
    console.error('Failed to fetch shop products:', err)
  }
}

// Initialize scrolled state to false for consistent SSR
const isScrolled = ref(false)
const isHydrated = ref(false)
let scrollHandler = null

// Handle scroll events only on client side
onMounted(() => {
  isHydrated.value = true

  // Single scroll handler for navbar only (TopHeader handles itself)
  scrollHandler = () => {
    isScrolled.value = window.scrollY > 50
  }

  scrollHandler() // Initial check
  window.addEventListener('scroll', scrollHandler, { passive: true })
})

// Cleanup on unmount
onUnmounted(() => {
  if (scrollHandler) {
    window.removeEventListener('scroll', scrollHandler)
  }
})
</script>

<style scoped>
a, .nav-link, .dropdown-item, .login-link, .navbar-brand {
  cursor: pointer !important;
  font-size: var(--vcn-desc-size);
}

.shop-all-link {
  color: white !important;
  text-decoration: none !important;
  font-weight: 500;
  font-size: 15px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s ease;
}

.shop-all-link span:first-child {
  text-decoration: underline !important;
  text-underline-offset: 4px;
}

.shop-all-link .arrow {
  text-decoration: none !important;
  display: inline-block;
}

.shop-all-link:hover {
  opacity: 0.8;
}

/* Cart page specific navbar link colors */
body.cart-page .desktop-nav .nav-link,
body.cart-page .desktop-nav a,
body.cart-page .navbar .nav-link,
body.cart-page .navbar a {
  color: var(--vcn-primary) !important;
}

body.cart-page .desktop-nav .nav-link:hover,
body.cart-page .desktop-nav a:hover,
body.cart-page .navbar .nav-link:hover,
body.cart-page .navbar a:hover {
  color: #1c3a13 !important;
}

/* Checkout page specific navbar link colors */
body.checkout-page .desktop-nav .nav-link,
body.checkout-page .desktop-nav a,
body.checkout-page .navbar .nav-link,
body.checkout-page .navbar a {
  color: var(--vcn-primary) !important;
}

body.checkout-page .desktop-nav .nav-link:hover,
body.checkout-page .desktop-nav a:hover,
body.checkout-page .navbar .nav-link:hover,
body.checkout-page .navbar a:hover {
  color: #1c3a13 !important;
}

/* Scrolled navbar styles for checkout page */
body.checkout-page .navbar.scrolled .desktop-nav .nav-link,
body.checkout-page .navbar.scrolled .desktop-nav a,
body.checkout-page .navbar.scrolled .navbar .nav-link,
body.checkout-page .navbar.scrolled .navbar a {
  color: #ffffff !important;
}

body.checkout-page .navbar.scrolled .desktop-nav .nav-link:hover,
body.checkout-page .navbar.scrolled .desktop-nav a:hover,
body.checkout-page .navbar.scrolled .navbar .nav-link:hover,
body.checkout-page .navbar.scrolled .navbar a:hover {
  color: #ffffff !important;
}

/* Login link white when scrolled on checkout page */
body.checkout-page .navbar.scrolled .login-link {
  color: #ffffff !important;
}

/* ========== DESKTOP NAVBAR ========== */
.navbar {
  position: fixed !important;
  top: var(--top-header-height, 45px);
  left: 0;
  right: 0;
  z-index: 9999;
  padding: 20px 20px !important;
  background: transparent !important;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.navbar.scrolled {
  top: var(--top-header-height, 45px);
}

.nav-img {
  width: 65px;
  height: auto;
}

.navbar .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0;
}

.navbar-brand {
  color: white !important;
  font-size: 20px;
  font-weight: 600;
  padding: 0;
  margin: 0;
}

/* Mobile Actions Bar - Reference Blur Glass Pill styling applied ONLY to the right-side icons */
@media (max-width: 991px) {
  .mobile-actions-bar {
    display: flex !important;
    align-items: center !important;
    gap: 14px !important;
    z-index: 10002 !important;
    background: rgba(0, 0, 0, 0.3) !important;
    backdrop-filter: blur(10px) !important;
    -webkit-backdrop-filter: blur(10px) !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.18) !important;
    border-radius: 50px !important;
    padding: 6px 14px !important;
  }

  .mobile-action-btn {
    background: transparent !important;
    border: none !important;
    outline: none !important;
    padding: 4px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    position: relative !important;
    color: #ffffff !important;
    text-decoration: none !important;
    cursor: pointer !important;
    transition: transform 0.2s ease, opacity 0.2s ease;
  }

  .mobile-action-btn:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }

  .mobile-action-btn svg {
    width: 22px !important;
    height: 22px !important;
    stroke: #ffffff !important;
    color: #ffffff !important;
    display: block !important;
  }

  .mobile-login-text {
    font-size: 14px !important;
    font-weight: 600 !important;
    color: #ffffff !important;
    white-space: nowrap !important;
    line-height: 1 !important;
    position: relative !important;
    padding-bottom: 2px !important;
  }

  .mobile-login-text::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .mobile-action-btn:hover .mobile-login-text::after {
    transform: scaleX(1);
  }

  .menu-icon-btn .menu-close-icon {
    display: none !important;
  }

  body.menu-open .menu-icon-btn .menu-burger-icon {
    display: none !important;
  }

  body.menu-open .menu-icon-btn .menu-close-icon {
    display: block !important;
  }

  /* Hide the top actions bar when menu opens (cart/X now live inside the menu) */
  body.menu-open .mobile-actions-bar {
    display: none !important;
  }

  /* Cart & close buttons inline with the other menu links */
  .nav-menu-actions {
    display: flex !important;
    align-items: center !important;
    margin-left: auto !important;
  }

  .nav-menu-cart-btn,
  .nav-menu-close-btn {
    background: rgba(255, 255, 255, 0.1) !important;
    border: 1px solid rgba(255, 255, 255, 0.15) !important;
    border-radius: 20px !important;
    padding: 4px 9px !important;
    margin: 0 !important;
  }

  .nav-menu-cart-btn:hover,
  .nav-menu-close-btn:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .mobile-cart-badge {
    position: absolute !important;
    top: -4px !important;
    right: -6px !important;
    background: #85a82e !important;
    color: #ffffff !important;
    font-size: 10px !important;
    font-weight: 700 !important;
    min-width: 16px !important;
    height: 16px !important;
    border-radius: 50% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    line-height: 1 !important;
    padding: 0 4px !important;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2) !important;
  }

  .navbar {
    padding: 12px 20px !important;
  }

  .navbar .container {
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    border-radius: 0 !important;
  }
}

@media (min-width: 992px) {
  .mobile-actions-bar {
    display: none !important;
  }
}

/* Custom Navbar Toggler */
/* Custom Navbar Toggler - Improved */
.custom-navbar-toggler {
  border: none;
  background: transparent;
  padding: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 10002;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-navbar-toggler:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Hamburger Lines */
.hamburger-line {
  width: 24px;
  height: 2.5px;
  background: var(--vcn-footer);
  border-radius: 3px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: block;
  position: relative;
}

/* Active/Open State - Transform to X */
body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(1) {
  transform: translateY(7.5px) rotate(45deg);
  background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(3) {
  transform: translateY(-7.5px) rotate(-45deg);
  background: linear-gradient(135deg, #fff 0%, #e0e0e0 100%);
}

/* Hover effect */
.custom-navbar-toggler:hover .hamburger-line {
  height: 3px;
}

/* Mobile Menu - Slides from BEHIND the Logo */
.navbar-collapse {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  background: rgba(40, 40, 40, 0.95);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 0;
  overflow: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  z-index: 1;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  margin-top: 30px;
  opacity: 0;
}

/* Show state - Expand */
.navbar-collapse.show {
  width: calc(100% - 0px);
  padding: 4px;
  opacity: 1;
}

/* Header */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.mobile-logo {
  width: 45px;
}

.close-menu {
  background: transparent;
  border: none;
  color: white;
  font-size: 32px;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 50%;
  transition: all 0.3s ease;
}

.close-menu:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: rotate(90deg);
}

/* Hide logo when menu is open */
.navbar-brand.d-lg-none {
  transition: opacity 0.3s ease, transform 0.3s ease;
  position: relative;
  z-index: 10001;
}

body.menu-open .navbar-brand.d-lg-none {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

/* Dropdown Items with Images */
/* .dropdown-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  color: white;
  text-decoration: none;
  transition: all 0.3s ease;
  border-radius: 8px;
  margin: 5px 10px;
} */

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.dropdown-item img {
  width: 50px;
  height: 50px;
  object-fit: contain;
  object-position: center;
  border-radius: 8px;
}

.dropdown-footer {
  padding: 20px;
  text-align: center;
  margin-top: 10px;
}

.dropdown-footer a {
  color: white;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.dropdown-footer a:hover {
  color: #4CAF50;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .custom-navbar-toggler {
    width: 30px;
    height: 20px;
  }

  .hamburger-line {
    width: 100%;
    height: 2px;
  }
}

body.menu-open .navbar-brand.d-lg-none {
  opacity: 0;
  transform: scale(0.8);
  pointer-events: none;
}

/* Hamburger to Close animation */
.custom-navbar-toggler {
  position: relative;

  color: var(--vcn-mobile);
  border: none;
  cursor: pointer;
  z-index: 10002;
}

.hamburger-line {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--vcn-mobile);
  position: absolute;
  left: 0;
  transition: all 0.3s ease;
}

.hamburger-line:nth-child(1) {
  top: 0;
}

.hamburger-line:nth-child(2) {
  top: 50%;
  transform: translateY(-50%);
}

.hamburger-line:nth-child(3) {
  bottom: 0;
}

/* Transform to X when open */
body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(1) {
  top: 50%;
  transform: translateY(-50%) rotate(45deg);
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(2) {
  opacity: 0;
}

body.menu-open .custom-navbar-toggler .hamburger-line:nth-child(3) {
  bottom: 50%;
  transform: translateY(50%) rotate(-45deg);
}

/* Mobile Menu - Slides from BEHIND the Logo */
.navbar-collapse {


  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  /* Initially hidden */
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  /* Initially hidden */
  background: rgba(40, 40, 40, 0.3);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  padding: 0;
  overflow: hidden;
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  z-index: 1;
  border-radius: 0 0 20px 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-top: none;
  margin-top: 30px;
  opacity: 0;
}

/* Hide state - Slide up */
.navbar-collapse.hidden {
  transform: translateY(-100%);
  /* Upar slide ho jayega */
}

/* Show state - Expand */
.navbar-collapse.show {
  width: calc(100% - 0px);
  /* Full width minus margins */
  padding: 4px;
  opacity: 1;
}

/* Header */
.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
}

.mobile-logo {
  width: 45px;
}

.close-menu {
  background: transparent;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  width: 35px;
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

/* Nav Pills */
.navbar-nav {
  display: flex;
  flex-direction: row !important;
  gap: 8px;
  padding: 0 0 15px 0;
  margin: 0 0 15px 0;
  flex-wrap: nowrap;
  overflow-x: auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  scrollbar-width: none;
  list-style: none;
}

.navbar-nav::-webkit-scrollbar {
  display: none;
}

.navbar-nav .nav-item {
  flex-shrink: 0;
}

.navbar-nav .nav-link {
  color: rgba(255, 255, 255, 0.9) !important;
  padding: 8px 16px !important;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  text-decoration: none;
  display: block;
  transition: all 0.2s ease;
}

.navbar-nav .nav-link.active {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Dropdown */
.dropdown-content {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.dropdown-content.show {
  max-height: 50vh;
  overflow-y: auto;
  overscroll-behavior: contain;
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.05);
}

.dropdown-content::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  display: block;
}

.dropdown-content::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 3px;
}

.dropdown-content::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.25);
  border-radius: 3px;
}

.dropdown-content::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.4);
}

.dropdown-menu-mobile {
  padding: 0;
}

.dropdown-item {
  display: flex !important;
  align-items: center !important;
  gap: 12px;
  padding: 12px !important;
  margin-bottom: 10px;
  color: white !important;
  border-radius: 12px !important;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-decoration: none;
  transition: all 0.2s ease;
}

/* Ensure all text within dropdown items is white */
.dropdown-item strong,
.dropdown-item span,
.dropdown-item p,
.dropdown-item div {
  color: white !important;
}

/* Override checkout page link colors for dropdown items - higher specificity */
body.checkout-page .navbar .desktop-nav .dropdown-item,
body.checkout-page .navbar .desktop-nav .dropdown-item strong,
body.checkout-page .navbar .desktop-nav .dropdown-item span,
body.checkout-page .navbar .desktop-nav .dropdown-item p,
body.checkout-page .navbar .desktop-nav .dropdown-item div,
body.checkout-page .navbar .desktop-nav .dropdown-item a {
  color: white !important;
}

/* Override checkout page link colors for dropdown footer - higher specificity */
body.checkout-page .navbar .desktop-nav .dropdown-footer a,
body.checkout-page .navbar .desktop-nav .dropdown-footer {
  color: white !important;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.15) !important;
  transform: translateX(5px);
}

.dropdown-item img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: contain;
  object-position: center;
  flex-shrink: 0;
}

/* Mobile dropdown menu item overrides */
.dropdown-menu-mobile .dropdown-item {
  background: transparent !important;
  border: none !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.12) !important;
  border-radius: 0 !important;
  padding: 12px 6px !important;
}

.dropdown-menu-mobile .dropdown-item:hover {
  background: rgba(255, 255, 255, 0.05) !important;
}

.dropdown-menu-mobile .dropdown-item img {
  width: 75px !important;
  height: 85px !important;
  object-fit: contain !important;
  background: transparent !important;
  border-radius: 6px !important;
  flex-shrink: 0 !important;
}

.mobile-products-scroll {
  border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
  padding-bottom: 12px !important;
  margin-bottom: 12px !important;
}

.dropdown-footer,
#shopAccordion .dropdown-footer {
  text-align: center;
  padding: 12px;
  border-top: none !important;
  margin-top: 10px;
}

.dropdown-footer a {
  color: rgba(255, 255, 255, 0.8) !important;
  text-decoration: none;
  font-size: 14px;
}

/* Desktop */
@media (min-width: 992px) {
  .desktop-nav {
    display: flex !important;
  }
}

/* ========== DESKTOP VIEW ========== */
@media (min-width: 992px) {

  .mobile-cart,
  .navbar-toggler {
    display: none !important;
  }

  .navbar {
    padding: 6px 20px !important;
  }

  /* .navbar.scrolled {
    padding: 12px 20px !important;
  } */

  .navbar .container {
    gap: 20px;
  }

  /* Left Section Container */
  .nav-left-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 6px 24px;
    background: transparent;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
  }

  .navbar.scrolled .nav-left-wrapper {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .navbar-brand {
    padding-right: 20px;
    font-size: 24px;
  }

  .nav-img {
    width: 65px;
  }

  /* Desktop Navigation */
  .desktop-nav {
    display: flex !important;
    flex-direction: row;
    gap: 2px;
    margin: 0;
    padding: 0;
  }

  .desktop-nav .nav-link {
    color: rgba(255, 255, 255, 0.85) !important;
    padding: 4px 17px !important;
    border-radius: 40px;
    font-size: 16px;
    font-weight: 500;
    background: transparent;
  }

  .desktop-nav .nav-link:hover {
    background: rgba(255, 255, 255, 0.15) !important;
    color: white !important;
  }

  /* Desktop Dropdown - Static within nav */
  .desktop-nav .dropdown {
    position: static !important;
  }

  .desktop-nav .dropdown-menu {
    background: rgba(85, 85, 85, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 20px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
    display: block !important;
    opacity: 0;
    visibility: hidden;
    max-height: 0;
    padding: 0;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute !important;
    left: 0;
    right: 0;
    top: calc(100% + 12px);
    width: 100%;
    overflow: hidden !important;
  }

  .desktop-nav .dropdown-menu.force-closed {
    opacity: 0 !important;
    visibility: hidden !important;
    max-height: 0 !important;
    padding: 0 !important;
    transition: none !important;
  }

  .desktop-nav .dropdown:hover .dropdown-menu {
    opacity: 1;
    visibility: visible;
    max-height: 450px;
    padding-bottom: 50px !important;
    /* Make room for the absolute footer */
  }

  /* Scrollable product list inside desktop dropdown */
  .desktop-nav .dropdown-products-scroll {
    max-height: 390px !important;
    /* Limit products list height */
    overflow-y: auto !important;
    overscroll-behavior: contain;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.05);
    list-style: none;
    padding: 8px !important;
    margin: 0;
  }

  .desktop-nav .dropdown-products-scroll::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    display: block;
  }

  .desktop-nav .dropdown-products-scroll::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 3px;
  }

  .desktop-nav .dropdown-products-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.25);
    border-radius: 3px;
  }

  .desktop-nav .dropdown-products-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
  }

  .desktop-nav .dropdown-products-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  /* Pinned footer inside desktop dropdown */
  .desktop-nav .dropdown-footer {
    position: absolute !important;
    bottom: 12px !important;
    right: 24px !important;
    left: auto !important;
    height: auto !important;
    background: transparent !important;
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    margin: 0 !important;
    padding: 0 !important;
    list-style: none;
    z-index: 10 !important;
  }

  .desktop-nav .dropdown-item {
    margin-bottom: 4px;
  }

  .desktop-nav .dropdown-item img {
    width: 70px;
    height: 70px;
    object-fit: contain;
    object-position: center;
  }

  /* Right Section Container */
  .nav-right-wrapper {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 6px 11px;
    background: transparent;
    border-radius: 50px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .navbar.scrolled .nav-right-wrapper {
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  .login-link {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    padding: 8px 12px;
    margin-right: 5px;
    white-space: nowrap;
    position: relative;
  }

  .login-link::after {
    content: '';
    position: absolute;
    left: 12px;
    bottom: 2px;
    width: calc(100% - 24px);
    height: 2px;
    background: currentColor;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }

  .login-link:hover {
    color: white;
  }

  .login-link:hover::after {
    transform: scaleX(1);
  }
}

  /* Extra Large screens */
  @media (min-width: 1400px) {
    .navbar {
      padding-left: 160px !important;
      padding-right: 160px !important;
    }
  }

  /* Laptop/Desktop 1200-1399 */
  @media (max-width: 1399.98px) and (min-width: 1200px) {
    .navbar {
      padding-left: 40px !important;
      padding-right: 40px !important;
    }
  }

  /* Tablet Landscape 992-1199 */
  @media (max-width: 1199.98px) and (min-width: 992px) {
    .navbar {
      padding-left: 30px !important;
      padding-right: 30px !important;
    }
  }

  /* ========== DESKTOP VIEW ========== */
  @media (min-width: 992px) {

    .mobile-cart,
    .navbar-toggler {
      display: none !important;
    }

    .navbar {
      padding-top: 6px !important;
      padding-bottom: 6px !important;
    }

    /* .navbar.scrolled {
    padding: 12px 40px !important;
  } */

    .navbar .container-fluid {
      gap: 20px;
    }

    /* Left Section Container */
    .nav-left-wrapper {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 24px;
      background: transparent;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
    }

    .navbar.scrolled .nav-left-wrapper {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .navbar-brand {
      padding-right: 20px;
      font-size: 24px;
    }

    .nav-img {
      width: 65px;
    }

    /* Desktop Navigation */
    .desktop-nav {
      display: flex !important;
      flex-direction: row;
      gap: 2px;
      margin: 0;
      padding: 0;
    }

    .desktop-nav .nav-link {
      color: rgba(255, 255, 255, 0.85) !important;
      padding: 4px 17px !important;
      border-radius: 40px;
      font-size: 16px;
      font-weight: 500;
      background: transparent;
    }

    .desktop-nav .nav-link:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: white !important;
    }

    /* Desktop Dropdown - Static within nav */
    .desktop-nav .dropdown {
      position: static !important;
    }

    .desktop-nav .dropdown-menu {
      background: rgba(85, 85, 85, 0.95) !important;
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      border-radius: 20px !important;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
      display: block !important;
      opacity: 0;
      visibility: hidden;
      max-height: 0;
      padding: 0;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: absolute !important;
      left: 0;
      right: 0;
      top: calc(100% + 12px);
      width: 100%;
      overflow: hidden !important;
    }

    .desktop-nav .dropdown:hover .dropdown-menu {
      opacity: 1;
      visibility: visible;
      max-height: 450px;
      padding-bottom: 50px !important;
      /* Make room for the absolute footer */
    }

    /* Scrollable product list inside desktop dropdown */
    .desktop-nav .dropdown-products-scroll {
      max-height: 390px !important;
      /* Limit products list height */
      overflow-y: auto !important;
      overscroll-behavior: contain;
      scrollbar-width: thin;
      scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.05);
      list-style: none;
      padding: 8px !important;
      margin: 0;
    }

    .desktop-nav .dropdown-products-scroll::-webkit-scrollbar {
      width: 6px;
      height: 6px;
      display: block;
    }

    .desktop-nav .dropdown-products-scroll::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 3px;
    }

    .desktop-nav .dropdown-products-scroll::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.25);
      border-radius: 3px;
    }

    .desktop-nav .dropdown-products-scroll::-webkit-scrollbar-thumb:hover {
      background: rgba(255, 255, 255, 0.4);
    }

    .desktop-nav .dropdown-products-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    /* Pinned footer inside desktop dropdown */
    .desktop-nav .dropdown-footer {
      position: absolute !important;
      bottom: 12px !important;
      right: 24px !important;
      left: auto !important;
      height: auto !important;
      background: transparent !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-end !important;
      margin: 0 !important;
      padding: 0 !important;
      list-style: none;
      z-index: 10 !important;
    }

    .desktop-nav .dropdown-item {
      margin-bottom: 4px;
    }

    .desktop-nav .dropdown-item img {
      width: 70px;
      height: 70px;
      object-fit: contain;
      object-position: center;
    }

    /* Right Section Container */
    .nav-right-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 6px 11px;
      background: transparent;
      border-radius: 50px;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navbar.scrolled .nav-right-wrapper {
      background: rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .login-link {
      color: rgba(255, 255, 255, 0.85);
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s ease;
      padding: 8px 12px;
      margin-right: 5px;
      white-space: nowrap;
    }

    .login-link:hover {
      color: white;
    }

    /* Extra Large screens */
    @media (min-width: 1400px) {
      .navbar {
        padding-left: 160px !important;
        padding-right: 160px !important;
      }
    }

    /* Laptop/Desktop 1200-1399 */
    @media (max-width: 1399.98px) and (min-width: 1200px) {
      .navbar {
        padding-left: 40px !important;
        padding-right: 40px !important;
      }
    }

    /* Tablet Landscape 992-1199 */
    @media (max-width: 1199.98px) and (min-width: 992px) {
      .navbar {
        padding-left: 30px !important;
        padding-right: 30px !important;
      }
    }

    /* ========== PRODUCT DETAILS & DIRECT SELLER PAGE OVERRIDES ========== */

    /* Navbar background and compact height on direct-seller page */
    .direct-seller-page .navbar {
      padding: 10px 20px !important;
    }

    /* .direct-seller-page .navbar:not(.scrolled) {
      background: #ffffff !important;
    } */

    .my-account-page .navbar:not(.scrolled) {
      background: #ffffff !important;
    }

    /* Desktop Nav Links - Green on light background pages */
    .product-details-page .desktop-nav .nav-link,
    .direct-seller-page .desktop-nav .nav-link,
    .my-account-page .desktop-nav .nav-link {
      color: var(--vcn-footer) !important;
    }

    .product-details-page .desktop-nav .nav-link:hover,
    .direct-seller-page .desktop-nav .nav-link:hover,
    .my-account-page .desktop-nav .nav-link:hover {
      background: rgba(90, 90, 90, 0.15) !important;
      backdrop-filter: blur(10px);
      color: var(--vcn-footer) !important;
    }

    /* Mobile Nav Links - Green on light background pages */
    .product-details-page .navbar-nav .nav-link,
    .direct-seller-page .navbar-nav .nav-link,
    .my-account-page .navbar-nav .nav-link {
      color: var(--vcn-footer) !important;
      border-color: var(--vcn-footer) !important;
    }

    .product-details-page .navbar-nav .nav-link.active,
    .direct-seller-page .navbar-nav .nav-link.active,
    .my-account-page .navbar-nav .nav-link.active {
      background: rgba(40, 167, 69, 0.25) !important;
      border-color: var(--vcn-footer) !important;
    }

    /* When scrolled - Links become WHITE */
    .product-details-page .navbar.scrolled .desktop-nav .nav-link,
    .direct-seller-page .navbar.scrolled .desktop-nav .nav-link,
    .my-account-page .navbar.scrolled .desktop-nav .nav-link {
      color: #fff !important;
    }

    .product-details-page .navbar.scrolled .desktop-nav .nav-link:hover,
    .direct-seller-page .navbar.scrolled .desktop-nav .nav-link:hover,
    .my-account-page .navbar.scrolled .desktop-nav .nav-link:hover {
      background: rgba(255, 255, 255, 0.15) !important;
      color: #fff !important;
    }

    /* Nav Actions - Login Link GREEN */
    .product-details-page .login-link,
    .direct-seller-page .login-link,
    .my-account-page .login-link {
      color: var(--vcn-footer) !important;
    }

    .product-details-page .login-link:hover,
    .direct-seller-page .login-link:hover,
    .my-account-page .login-link:hover {
      color: var(--vcn-footer) !important;
    }

    /* Button GREEN background */
    .product-details-page .navbar-btn,
    .direct-seller-page .navbar-btn,
    .my-account-page .navbar-btn {
      background: var(--vcn-footer) !important;
      color: white !important;
    }

    /* When scrolled - Button becomes WHITE with green text */
    .product-details-page .navbar.scrolled .login-link,
    .direct-seller-page .navbar.scrolled .login-link,
    .my-account-page .navbar.scrolled .login-link {
      color: #fff !important;
    }

    .product-details-page .navbar.scrolled .navbar-btn,
    .direct-seller-page .navbar.scrolled .navbar-btn,
    .my-account-page .navbar.scrolled .navbar-btn {
      background: #fff !important;
      color: var(--vcn-footer) !important;
    }

    .product-details-page .navbar.scrolled .navbar-btn:hover,
    .direct-seller-page .navbar.scrolled .navbar-btn:hover,
    .my-account-page .navbar.scrolled .navbar-btn:hover {
      background: var(--vcn-white) !important;
    }

    .navbar-btn {
      background: white !important;
      color: #0E2917 !important;
      padding: 10px 24px;
      border-radius: 40px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      border: none;
      white-space: nowrap;
      margin-left: 8px;
    }

    .navbar-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
    }

    /* Hide mobile menu on desktop */
    .navbar-collapse {
      position: static;
      transform: none;
      background: transparent;
      padding: 0;
      height: auto;
      width: auto;
      overflow: visible;
    }

    .mobile-menu-header,
    .navbar-nav {
      display: none !important;
    }
  }

/* ========== RESPONSIVE ========== */
@media (max-width: 992px) {
  .navbar {
    padding: 12px 20px !important;
  }

  .nav-left-wrapper {
    flex-wrap: wrap;
  }

  .navbar-collapse {
    padding: 20px;
    border-radius: 20px;
    margin-top: 25px;
  }

  .nav-actions .login-link {
    display: none;
  }

}


.nav-tog {
  border: 4px solid var(--vcn-mobile);
  padding: 8px;
}

/* ==========================================================================
   NAVBAR RESPONSIVE
   ========================================================================== */
@media (max-width: 992px) {
  .navbar {
    padding: 10px 20px !important;
  }

  .navbar-collapse {
    margin-top: 15px !important;
  }
}

@media (max-width: 576px) {
  .navbar {
    padding: 8px 15px !important;
  }

  .nav-img {
    width: 60px !important;
  }
}



  /* Registration form overlay fix */
  :deep(.registration-container) {
    z-index: 10000 !important;
  }

  /* Overlay */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(4px);
    z-index: 9998;
  }

  /* Slide Form Container */
  .slide-form-container {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 860px;
    max-height: 85vh;
    z-index: 9999;
    overflow: hidden;
    border-radius: 24px;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.35);
  }

  /* Auth Modal Card (Two Column Layout) */
  .auth-modal-card {
    display: flex;
    flex-direction: row;
    background: var(--vcn-pure-white);
    border-radius: 24px;
    overflow: hidden;
    max-height: 85vh;
    width: 100%;
    position: relative;
  }

  /* Left Column - Brand & Atmospheric Product Sidebar (matches Register form) */
  .auth-modal-left {
    width: 42%;
    flex-shrink: 0;
    background: linear-gradient(180deg, rgba(14, 24, 12, 0.88) 0%, rgba(26, 38, 20, 0.94) 100%), url('/img/bg/bg-1.png');
    background-size: cover;
    background-position: center;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    overflow: hidden;
    color: #ffffff;
  }

  .brand-logo-wrap {
    margin-bottom: 8px;
  }

  .auth-modal-left .reg-brand-logo {
    height: 42px !important;
    width: auto;
    object-fit: contain;
    display: block;
    margin-bottom: 6px;
  }

  .brand-tagline {
    font-size: 9.5px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #C89B3C;
    text-transform: uppercase;
    display: block;
  }

  .sidebar-main-title {
    font-size: 24px;
    font-weight: 800;
    color: #ffffff;
    line-height: 1.2;
    margin: 16px 0 16px 0;
    letter-spacing: -0.3px;
  }

  .sidebar-body-wrap {
    position: relative;
    margin-bottom: 20px;
    flex-grow: 1;
  }

  .auth-modal-left .reg-features-list {
    display: flex;
    flex-direction: column;
    gap: 14px;
    position: relative;
    z-index: 2;
    width: 62%;
  }

  .auth-modal-left .reg-feature-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
  }

  .auth-modal-left .reg-feature-icon {
    width: 34px;
    height: 34px;
    min-width: 34px;
    border-radius: 50%;
    background-color: #E8F3EA;
    color: #2E7D32;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 2px;
  }

  .auth-modal-left .reg-feature-text h4 {
    font-size: 13px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 2px 0;
    line-height: 1.25;
  }

  .auth-modal-left .reg-feature-text p {
    font-size: 11px !important;
    color: rgba(255, 255, 255, 0.75);
    margin: 0;
    line-height: 1.3;
  }

  .auth-modal-left .reg-cursive-footer {
    font-family: 'Playfair Display', 'Georgia', cursive, serif;
    font-size: 18px;
    font-style: italic;
    font-weight: 600;
    color: #ffffff;
    line-height: 1.2;
    opacity: 0.9;
    position: relative;
    z-index: 2;
    padding-top: 10px;
    border-top: 1px dashed rgba(255, 255, 255, 0.15);
  }

  .auth-header {
    margin-bottom: 16px;
  }

  .auth-header h2 {
    font-size: 26px;
    font-weight: 700;
    color: var(--vcn-dark-green);
    margin: 0 0 4px 0;
    letter-spacing: -0.5px;
  }

  .auth-form .form-group {
    margin-bottom: 12px;
  }

  .auth-form label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--vcn-primary-text);
    margin-bottom: 4px;
  }

  .input-with-icon {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-with-icon .field-icon {
    position: absolute;
    left: 12px;
    color: var(--vcn-secondary-text);
    pointer-events: none;
  }

  .input-with-icon .form-input {
    width: 100%;
    padding: 9px 12px 9px 38px;
    border: 1px solid var(--vcn-border);
    border-radius: 10px;
    font-size: 13.5px;
    color: var(--vcn-primary-text);
    background-color: var(--vcn-pure-white);
    transition: all 0.2s ease;
  }

  .input-with-icon .form-input:focus {
    outline: none;
    border-color: var(--vcn-primary-green);
    box-shadow: 0 0 0 3px rgba(27, 94, 32, 0.12);
  }

  .password-wrapper .form-input {
    padding-right: 40px;
  }

  .toggle-password {
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--vcn-secondary-text);
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .toggle-password:hover {
    color: var(--vcn-primary-green);
  }

  .forgot-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: -2px;
    margin-bottom: 14px;
  }

  .forgot-password {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--vcn-dark-green);
    text-decoration: none;
    transition: opacity 0.2s;
  }

  .forgot-password:hover {
    text-decoration: underline;
  }

  .signin-btn {
    width: 100%;
    padding: 11px 20px;
    background-color: var(--vcn-primary-green);
    color: var(--vcn-pure-white);
    border: none;
    border-radius: 30px;
    font-size: 13.5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background-color 0.2s ease, transform 0.1s ease;
    margin-bottom: 16px;
  }

  .signin-btn:hover {
    background-color: var(--vcn-dark-green);
  }

  .signin-btn:active {
    transform: scale(0.99);
  }

  .social-signin-section {
    margin-top: 10px;
    margin-bottom: 18px;
    text-align: center;
  }

  .social-title {
    font-size: 13px;
    color: var(--vcn-dark-green);
    font-weight: 600;
    margin-bottom: 10px;
  }

  .social-icons-wrap {
    display: flex;
    justify-content: center;
    gap: 14px;
  }

  .social-circle-btn {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: 1.5px solid var(--vcn-border);
    background-color: var(--vcn-pure-white);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  }

  .social-circle-btn:hover {
    transform: translateY(-2px);
    border-color: var(--vcn-primary-green);
    box-shadow: 0 4px 14px rgba(14, 41, 23, 0.12);
  }

  .auth-register-section {
    margin-top: 6px;
    margin-bottom: 18px;
  }

  .register-title-row {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 18px;
    font-weight: 700;
    color: var(--vcn-dark-green);
    margin-bottom: 12px;
  }

  .register-title-row .info-icon {
    color: var(--vcn-dark-green);
    cursor: pointer;
  }

  .register-buttons-group {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .register-outline-btn {
    width: 100%;
    padding: 11px 16px;
    border: 1.5px solid var(--vcn-primary-green);
    border-radius: 30px;
    background-color: transparent;
    color: var(--vcn-primary-green);
    font-size: 12.5px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;
  }

  .register-outline-btn:hover {
    background-color: var(--vcn-light-green);
    color: var(--vcn-dark-green);
    border-color: var(--vcn-dark-green);
  }

  .auth-footer-links {
    display: flex;
    justify-content: center;
    gap: 24px;
    margin-top: auto;
    padding-top: 14px;
    border-top: 1px solid var(--vcn-border);
  }

  .auth-footer-links a {
    font-size: 12px;
    color: var(--vcn-secondary-text);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .auth-footer-links a:hover {
    color: var(--vcn-primary-green);
    text-decoration: underline;
  }

  /* Right Column - Sign In (form area, matches Register form) */
  .auth-modal-right {
    flex: 1;
    background-color: #FAFAF7;
    padding: 30px 34px 28px;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 85vh;
    scrollbar-width: thin;
  }

  .auth-modal-card .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: transparent;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--vcn-primary-text);
    transition: background-color 0.2s ease;
    z-index: 10;
  }

  .auth-modal-card .close-btn:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }

  .auth-header p {
    font-size: 13px;
    color: var(--vcn-secondary-text);
    margin: 4px 0 0 0;
    line-height: 1.4;
  }

  .register-now-btn {
    width: 100%;
    padding: 10px 20px;
    background-color: transparent;
    border: 1.5px solid var(--vcn-primary-green);
    color: var(--vcn-primary-green);
    border-radius: 30px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    margin-bottom: 16px;
  }

  .register-now-btn:hover {
    background-color: var(--vcn-primary-green);
    color: var(--vcn-pure-white);
  }

  .partner-footer {
    text-align: left;
  }

  .partner-footer p {
    font-size: 12px;
    color: var(--vcn-secondary-text);
    margin: 0 0 2px 0;
  }

  .partner-link {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--vcn-primary-green);
    text-decoration: underline;
    transition: color 0.2s ease;
  }

  .partner-link:hover {
    color: var(--vcn-dark-green);
  }

  /* Cart Count Badge */
  .cart-count-badge {
    background: #85a82e;
    color: #ffffff;
    border-radius: 50%;
    padding: 2px 6px;
    font-size: 11px;
    font-weight: bold;
    margin-left: 5px;
    min-width: 18px;
    text-align: center;
    display: inline-block;
  }

  .mobile-cart {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .navbar-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* Modal transitions disabled */
  .fade-enter-active,
  .fade-leave-active,
  .slide-right-enter-active,
  .slide-right-leave-active {
    transition: none !important;
    animation: none !important;
  }

  /* Responsive Styles for all devices */

  /* Small laptops and landscape tablets (992px to 1200px) */
  @media (max-width: 1200px) {
    .navbar {
      padding: 6px 20px !important;
    }

    .desktop-nav .nav-link {
      padding: 4px 12px !important;
      font-size: 15px;
    }

    .nav-left-wrapper {
      gap: 8px;
      padding: 4px 16px;
    }

    .nav-right-wrapper {
      gap: 10px;
      padding: 4px 8px;
    }
  }

  /* Mobile & Tablets (max-width: 991px) */
  @media (max-width: 991px) {
    .navbar {
      padding: 15px 30px !important;
    }

    .navbar-collapse {
      max-height: calc(100vh - var(--top-header-height, 28px) - 80px) !important;
      overflow-y: auto !important;
      -webkit-overflow-scrolling: touch;
    }

    .navbar-collapse.show {
      margin-top: 0 !important;
    }
  }

  /* Phones & Tablets responsive modal styles */
  @media (max-width: 820px) {
    .slide-form-container {
      width: 92%;
      max-width: 480px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      scrollbar-width: thin;
    }

    .auth-modal-card {
      flex-direction: column;
      max-height: none;
      border-radius: 20px;
    }

    .auth-modal-left {
      display: none;
    }

    .auth-modal-right {
      width: 100%;
      padding: 24px 22px 28px;
      max-height: none;
      overflow: visible;
      background-color: #FAFAF7;
    }
  }

  @media (max-width: 576px) {
    .navbar {
      padding: 10px 15px !important;
    }

    .slide-form-container {
      width: 92%;
      max-width: 420px;
      max-height: 90vh;
      border-radius: 20px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;
      overscroll-behavior: contain;
      scrollbar-width: thin;
    }

    .auth-modal-card {
      border-radius: 20px;
      min-height: auto;
      position: relative;
      display: flex;
      flex-direction: column;
      scroll-behavior: smooth;
      overscroll-behavior: contain;
    }

    .auth-modal-card .close-btn {
      top: 14px;
      right: 14px;
      width: 32px;
      height: 32px;
    }

    .auth-modal-left {
      display: none;
    }

    .auth-modal-right {
      display: block !important;
      width: 100%;
      padding: 20px 18px;
      background-color: #FAFAF7;
    }

    /* Terms & Privacy links pinned at the bottom of the form column */
    .auth-footer-links {
      width: 100%;
      margin-top: 18px;
      padding-top: 14px;
      border-top: 1px solid var(--vcn-border);
      display: flex;
      justify-content: center;
      gap: 20px;
      text-align: center;
    }

    .auth-header h2 {
      font-size: 22px;
    }

    .social-icons-wrap {
      gap: 10px;
    }

    .social-circle-btn {
      width: 40px;
      height: 40px;
    }

    .register-outline-btn {
      font-size: 11.5px;
      padding: 10px 12px;
      background-color: var(--vcn-pure-white);
    }
  }

  /* Small Phones (max-width: 380px) */
  @media (max-width: 380px) {
    .navbar {
      padding: 8px 10px !important;
    }

    .mobile-cart {
      font-size: 13px;
      gap: 3px;
    }
  }

  /* Global dropdown force close class - overrides all hover rules and media queries */
  .desktop-nav .dropdown-menu.force-closed {
    opacity: 0 !important;
    visibility: hidden !important;
    max-height: 0 !important;
    padding: 0 !important;
    transition: none !important;
  }

  .user-dropdown-wrapper {
    position: relative;
    display: inline-block;
    cursor: pointer;
    padding: 10px 0;
  }

  .user-greeting {
    font-size: 16px;
    font-weight: 400;
    color: var(--vcn-white);
    display: flex;
    align-items: center;
    gap: 6px;
    transition: opacity 0.3s, color 0.3s;
  }

  .user-greeting:hover {
    opacity: 0.8;
  }

  /* Cart and checkout pages (white background) */
  body.cart-page .user-greeting,
  body.checkout-page .user-greeting {
    color: var(--vcn-primary) !important;
  }

  body.cart-page .user-greeting:hover,
  body.checkout-page .user-greeting:hover {
    color: #1c3a13 !important;
    opacity: 1;
  }

  /* Cart and checkout pages scrolled (dark background) */
  body.checkout-page .navbar.scrolled .user-greeting,
  body.cart-page .navbar.scrolled .user-greeting {
    color: #ffffff !important;
  }

  /* Product details page (white background at top) */
  .product-details-page .user-greeting,
  .my-account-page .user-greeting,
  .direct-seller-page .user-greeting {
    color: var(--vcn-footer) !important;
  }

  /* Product details page scrolled (dark background) */
  .product-details-page .navbar.scrolled .user-greeting,
  .my-account-page .navbar.scrolled .user-greeting,
  .direct-seller-page .navbar.scrolled .user-greeting {
    color: #ffffff !important;
  }

  .arrow-down {
    font-size: 9px;
    transition: transform 0.3s;
    display: inline-block;
  }

  .user-dropdown-wrapper:hover .arrow-down {
    transform: rotate(180deg);
  }

  .user-dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: rgba(85, 85, 85, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 20px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
    min-width: 240px;
    opacity: 0;
    visibility: hidden;
    transform: translateY(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    z-index: 10000;
    padding: 8px 0;
    backdrop-filter: blur(10px);
  }

  .user-dropdown-wrapper:hover .user-dropdown-menu {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  /* Mobile account dropdown - mirrors desktop user dropdown */
  .mobile-account-menu {
    margin: 18px 10px 12px;
    background: rgba(85, 85, 85, 0.95) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    border-radius: 20px !important;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
    padding: 8px 0;
    backdrop-filter: blur(10px);
  }

  .mobile-account-header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 18px 8px;
    text-align: left;
  }

  .mobile-account-header .user-avatar {
    width: 38px;
    height: 38px;
    flex-shrink: 0;
  }

  .mobile-account-header .user-avatar svg {
    width: 18px;
    height: 18px;
  }

  .mobile-account-id {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }

  .mobile-account-id strong {
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    word-break: break-all;
  }

  .mobile-account-menu .logout-action {
    width: calc(100% - 12px);
    background: none;
    border: none;
    margin: 0 6px;
  }

  /* Account dropdown padding inside accordion container */
  .dropdown-content#accountAccordion {
    padding: 2px 0 14px;
  }

  @media (max-width: 575px) {
    .mobile-account-menu {
      margin: 16px 8px 10px;
    }

    .mobile-account-header {
      padding: 12px 14px 8px;
    }

    .mobile-account-header .user-avatar {
      width: 34px;
      height: 34px;
    }

    .mobile-account-menu .dropdown-link {
      padding: 11px 14px;
      font-size: 13px;
    }
  }

  .dropdown-link {
    display: block;
    padding: 10px 20px;
    color: rgba(255, 255, 255, 0.8) !important;
    font-size: 14px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
    text-align: left;
    border-radius: 12px;
    margin: 0 6px;
  }

  .dropdown-link:hover {
    color: white !important;
    background-color: rgba(255, 255, 255, 0.08) !important;
  }

  .user-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--vcn-white);
    transition: all 0.3s ease;
  }

  .navbar.scrolled .user-avatar {
    background: rgba(255, 255, 255, 0.15);
    color: var(--vcn-white);
  }

  /* Cart/Checkout/Product details page avatar colors when transparent */
  body.cart-page .user-avatar,
  body.checkout-page .user-avatar,
  .product-details-page .user-avatar,
  .my-account-page .user-avatar,
  .direct-seller-page .user-avatar {
    background: rgba(29, 69, 3, 0.1);
    color: var(--vcn-primary);
  }

  /* Cart/Checkout/Product details page avatar colors when scrolled */
  body.cart-page .navbar.scrolled .user-avatar,
  body.checkout-page .navbar.scrolled .user-avatar,
  .product-details-page .navbar.scrolled .user-avatar,
  .my-account-page .navbar.scrolled .user-avatar,
  .direct-seller-page .navbar.scrolled .user-avatar {
    background: rgba(255, 255, 255, 0.15);
    color: var(--vcn-white);
  }

  .user-avatar svg {
    width: 14px;
    height: 14px;
  }

  .user-info-header {
    padding: 10px 20px 6px;
    text-align: left;
  }

  .user-email {
    font-size: 11px;
    color: rgba(255, 255, 255, 0.45);
    display: block;
    word-break: break-all;
    font-weight: 400;
  }

  .dropdown-divider {
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    margin: 6px 0;
  }

  .logout-action {
    display: flex !important;
    align-items: center;
    gap: 8px;
  }

  .logout-icon {
    width: 15px;
    height: 15px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s ease;
  }

  .dropdown-link:hover .logout-icon {
    color: #ff4d4d !important;
  }

  .panel-action {
    display: flex !important;
    align-items: center;
    gap: 8px;
  }

  .account-action {
    display: flex !important;
    align-items: center;
    gap: 8px;
  }

  .panel-icon {
    width: 15px;
    height: 15px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.2s ease;
  }

  .dropdown-link:hover .panel-icon {
    color: white !important;
  }

  .login-error-message {
    color: #dc3545;
    font-size: 0.85rem;
    margin-top: -10px;
    margin-bottom: 15px;
    text-align: left;
  }
  .register-title{
   
    color: var(--vcn-primary-green);

  }
</style>
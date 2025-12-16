<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <!-- Loading Screen -->
    <transition name="fade-loader">
      <div v-if="isLoading" class="loading-screen" :class="{ 'dark': isDarkMode }">
        <div class="loading-content">
          <!-- Logo -->
          <div class="logo-container-loader">
            <img :src="currentLogo" alt="Tanin Logo" class="loading-logo">
          </div>
          
          <!-- Wine glass filling animation -->
          <div class="wine-glass">
            <div class="glass-stem"></div>
            <div class="glass-bowl">
              <div class="wine-fill"></div>
            </div>
          </div>
          
          <!-- Elegant text -->
          <div class="loading-text-container">
            <p class="loading-text">
              <span class="letter" style="animation-delay: 0s">P</span>
              <span class="letter" style="animation-delay: 0.05s">o</span>
              <span class="letter" style="animation-delay: 0.1s">u</span>
              <span class="letter" style="animation-delay: 0.15s">r</span>
              <span class="letter" style="animation-delay: 0.2s">i</span>
              <span class="letter" style="animation-delay: 0.25s">n</span>
              <span class="letter" style="animation-delay: 0.3s">g</span>
              <span class="letter" style="animation-delay: 0.4s">&nbsp;</span>
              <span class="letter" style="animation-delay: 0.45s">p</span>
              <span class="letter" style="animation-delay: 0.5s">e</span>
              <span class="letter" style="animation-delay: 0.55s">r</span>
              <span class="letter" style="animation-delay: 0.6s">f</span>
              <span class="letter" style="animation-delay: 0.65s">e</span>
              <span class="letter" style="animation-delay: 0.7s">c</span>
              <span class="letter" style="animation-delay: 0.75s">t</span>
              <span class="letter" style="animation-delay: 0.8s">i</span>
              <span class="letter" style="animation-delay: 0.85s">o</span>
              <span class="letter" style="animation-delay: 0.9s">n</span>
              <span class="letter dots" style="animation-delay: 1s">.</span>
              <span class="letter dots" style="animation-delay: 1.2s">.</span>
              <span class="letter dots" style="animation-delay: 1.4s">.</span>
            </p>
          </div>
          
          <!-- Progress bar -->
          <div class="loading-progress">
            <div class="progress-track">
              <div class="progress-fill"></div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <nav v-if="!isAdminRoute" class="navbar">
      <div class="nav-container">
        <!-- Left Side: Logo -->
        <div class="nav-left">
          <router-link to="/" @click="closeNavDrawer">
            <img :src="currentLogo" alt="Tanin Logo" class="nav-logo-small" :class="{ 'logo-expanded': isNavDrawerOpen }">
          </router-link>
        </div>
        
        <!-- Right Side: Theme Toggle, Languages, Nav Drawer -->
        <div class="nav-right">
          <!-- Theme Switch -->
          <div class="theme-switch" @click="toggleTheme">
            <div class="theme-toggle">
              <div class="toggle-track" :class="{ 'dark': isDarkMode }">
                <div class="toggle-thumb" :class="{ 'dark': isDarkMode }"></div>
              </div>
            </div>
          </div>
          
          <!-- Language Dropdown -->
          <div class="language-dropdown" @click.stop>
            <button class="lang-dropdown-button" :class="{ 'open': isLanguageDropdownOpen }" @click="toggleLanguageDropdown">
              <img :src="currentLanguageFlag" :alt="currentLanguage" class="flag-icon">
              <span class="dropdown-arrow" :class="{ 'open': isLanguageDropdownOpen }">▼</span>
            </button>
            <div class="lang-dropdown-menu" :class="{ 'open': isLanguageDropdownOpen }">
              <button class="lang-dropdown-item" :class="{ 'active': currentLanguage === 'English' }" @click="selectLanguage('English')">
                <img src="/english.png" alt="English" class="flag-icon-menu">
                <span>English</span>
              </button>
              <button class="lang-dropdown-item" :class="{ 'active': currentLanguage === 'Serbian' }" @click="selectLanguage('Serbian')">
                <img src="/serbian.png" alt="Serbian" class="flag-icon-menu">
                <span>Serbian</span>
              </button>
            </div>
          </div>
          <button class="nav-drawer-button" @click="toggleNavDrawer" :aria-label="isNavDrawerOpen ? 'Close navigation menu' : 'Open navigation menu'">
            <div class="hamburger-icon" :class="{ 'open': isNavDrawerOpen }">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
      </div>
    </nav>

    <!-- Navigation Drawer -->
    <div v-if="!isAdminRoute" class="nav-drawer-overlay" :class="{ 'open': isNavDrawerOpen }" @click="closeNavDrawer">
      <div class="nav-drawer" :class="{ 'open': isNavDrawerOpen }" @click.stop>
        <div class="nav-drawer-content">
          <nav class="main-nav">
            <router-link to="/" class="nav-main-item" @click="closeNavDrawer">
              <span class="nav-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'nav.home'">{{ $t('nav.home') }}</span>
                </transition>
              </span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/menu" class="nav-main-item" @click="closeNavDrawer">
              <span class="nav-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'nav.menu'">{{ $t('nav.menu') }}</span>
                </transition>
              </span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/gallery" class="nav-main-item" @click="closeNavDrawer">
              <span class="nav-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'nav.gallery'">{{ $t('nav.gallery') }}</span>
                </transition>
              </span>
              <span class="nav-arrow">→</span>
            </router-link>
            <router-link to="/reservations" class="nav-main-item" @click="closeNavDrawer">
              <span class="nav-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'nav.reservations'">{{ $t('nav.reservations') }}</span>
                </transition>
              </span>
              <span class="nav-arrow">→</span>
            </router-link>
            <a href="#" class="nav-main-item" @click="scrollToLocation">
              <span class="nav-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'nav.location'">{{ $t('nav.location') }}</span>
                </transition>
              </span>
            </a>
          </nav>
        </div>
      </div>
    </div>

    <main class="main-content" :class="{ 'no-margin': isAdminRoute }">
      <router-view/>
    </main>

    <!-- Footer -->
    <footer v-if="!isAdminRoute" class="footer">
      <div class="footer-content">
        <!-- Footer Logo & Name -->
        <div class="footer-section footer-brand">
          <img :src="currentLogo" alt="Tanin Logo" class="footer-logo">
          <h3 class="footer-brand-name">TANNIN Wine Bistro</h3>
        </div>

        <!-- Quick Links -->
        <div class="footer-section footer-links">
          <h4 class="footer-title">
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'footer.quickLinks'">{{ $t('footer.quickLinks') }}</span>
            </transition>
          </h4>
          <nav class="footer-nav">
            <router-link to="/" class="footer-link" @click="closeNavDrawer">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'nav.home'">{{ $t('nav.home') }}</span>
              </transition>
            </router-link>
            <router-link to="/menu" class="footer-link" @click="closeNavDrawer">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'nav.menu'">{{ $t('nav.menu') }}</span>
              </transition>
            </router-link>
            <router-link to="/gallery" class="footer-link" @click="closeNavDrawer">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'nav.gallery'">{{ $t('nav.gallery') }}</span>
              </transition>
            </router-link>
            <router-link to="/reservations" class="footer-link" @click="closeNavDrawer">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'nav.reservations'">{{ $t('nav.reservations') }}</span>
              </transition>
            </router-link>
            <a href="#" class="footer-link" @click="scrollToLocation">
              <transition name="slide-text" mode="out-in">
                <span :key="currentLanguage + 'nav.location'">{{ $t('nav.location') }}</span>
              </transition>
            </a>
          </nav>
        </div>

        <!-- Social Media -->
        <div class="footer-section footer-social">
          <h4 class="footer-title">
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'footer.followUs'">{{ $t('footer.followUs') }}</span>
            </transition>
          </h4>
          <div class="social-icons">
            <a href="https://www.instagram.com/tannin_winebistro_gastrosor/" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="Instagram">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <p class="footer-copyright">
          © {{ currentYear }} TANNIN Wine Bistro. 
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'footer.rights'">{{ $t('footer.rights') }}</span>
          </transition>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import translationMixin from '@/mixins/translationMixin'

export default {
  name: 'App',
  mixins: [translationMixin],
  data() {
    return {
      isNavDrawerOpen: false,
      isLanguageDropdownOpen: false,
      isLoading: true
    }
  },
  computed: {
    ...mapGetters(['isDarkMode', 'currentLanguage']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.png' : '/logo_light.png'
    },
    currentLanguageFlag() {
      return this.currentLanguage === 'English' ? '/english.png' : '/serbian.png'
    },
    currentYear() {
      return new Date().getFullYear()
    },
    isAdminRoute() {
      return this.$route.path.startsWith('/admin')
    }
  },
  methods: {
    ...mapActions(['toggleTheme']),
    async preloadImages() {
      // All images to preload
      const imagesToPreload = [
        // Logos
        '/logo_dark.png',
        '/logo_light.png',
        '/banner_text_dark.png',
        '/banner_text_light.png',
        // Wine grid
        '/grid1/wine_1.JPG',
        '/grid1/wine_2.jpg',
        '/grid1/wine_3.JPG',
        '/grid1/IMG_9671.JPG',
        // Food grid
        '/grid2/food_1.jpg',
        '/grid2/food_2.jpg',
        '/grid2/food_3.jpg',
        '/grid2/food_4.jpg',
        '/grid2/food_5.jpg',
        '/grid2/food_6.jpg',
        // Flags
        '/english.png',
        '/serbian.png'
      ]
      
      const loadImage = (src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.onload = () => resolve(src)
          img.onerror = () => resolve(src) // Resolve even on error to not block
          img.src = src
        })
      }
      
      try {
        await Promise.all(imagesToPreload.map(loadImage))
      } catch (e) {
        console.log('Some images failed to preload')
      }
      
      // Add minimum loading time for the cool animation (2.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      this.isLoading = false
    },
    toggleNavDrawer() {
      this.isNavDrawerOpen = !this.isNavDrawerOpen
    },
    closeNavDrawer() {
      this.isNavDrawerOpen = false
    },
    toggleLanguageDropdown() {
      this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen
    },
    selectLanguage(lang) {
      this.$store.dispatch('setLanguage', lang)
      this.isLanguageDropdownOpen = false
    },
    scrollToLocation(event) {
      event.preventDefault();
      this.closeNavDrawer();
      
      // Check if we're already on the home page
      if (this.$route.path === '/') {
        // We're on home, just scroll
        setTimeout(() => {
          const locationSection = document.getElementById('location-section');
          if (locationSection) {
            locationSection.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      } else {
        // Navigate to home first, then scroll
        this.$router.push('/').then(() => {
          setTimeout(() => {
            const locationSection = document.getElementById('location-section');
            if (locationSection) {
              locationSection.scrollIntoView({ behavior: 'smooth' });
            }
          }, 300);
        });
      }
    }
  },
  mounted() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      this.$store.dispatch('setTheme', true)
    }
    
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && ['English', 'Serbian'].includes(savedLanguage)) {
      this.$store.dispatch('setLanguage', savedLanguage)
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.language-dropdown')) {
        this.isLanguageDropdownOpen = false
      }
    })
    
    // Preload all images before showing page
    this.preloadImages()
  },
  watch: {
    isDarkMode(newVal) {
      // Save theme preference to localStorage
      localStorage.setItem('theme', newVal ? 'dark' : 'light')
    }
  }
}
</script>

<style>
/* CSS Variables for theming */
:root {
  --bg-color: #ffffff;
  --text-color: #000000;
  --nav-bg: #ffffff;
  --nav-shadow: rgba(0, 0, 0, 0.1);
  --transition: all 0.3s ease;
}

/* ========================================
   LOADING SCREEN STYLES
   ======================================== */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: hidden;
}

.loading-screen.dark {
  background-color: #000000;
}

/* Loading content container */
.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
}

/* Logo */
.logo-container-loader {
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-logo {
  width: 100px;
  height: auto;
  animation: logoBreath 3s ease-in-out infinite;
}

@keyframes logoBreath {
  0%, 100% { transform: scale(1); opacity: 0.9; }
  50% { transform: scale(1.03); opacity: 1; }
}

/* Wine glass animation */
.wine-glass {
  position: relative;
  width: 50px;
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.glass-stem {
  width: 3px;
  height: 30px;
  background: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  position: absolute;
  bottom: 0;
}

.loading-screen.dark .glass-stem {
  background: rgba(255, 255, 255, 0.15);
}

.glass-stem::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 5px;
  background: rgba(0, 0, 0, 0.12);
  border-radius: 3px;
}

.loading-screen.dark .glass-stem::after {
  background: rgba(255, 255, 255, 0.12);
}

.glass-bowl {
  width: 42px;
  height: 48px;
  border: 2px solid rgba(0, 0, 0, 0.12);
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
  position: absolute;
  top: 0;
  overflow: hidden;
}

.loading-screen.dark .glass-bowl {
  border-color: rgba(255, 255, 255, 0.15);
}

.wine-fill {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 0%;
  background: linear-gradient(180deg, 
    #ca371c 0%, 
    #a02d18 50%,
    #8b2332 100%);
  animation: pourWine 2.5s ease-out forwards;
  border-radius: 0 0 50% 50% / 0 0 100% 100%;
}

@keyframes pourWine {
  0% { height: 0%; }
  100% { height: 70%; }
}

/* Text animation */
.loading-text-container {
  overflow: hidden;
}

.loading-text {
  font-family: 'Corinthia', cursive;
  font-size: 2rem;
  color: #000;
  margin: 0;
  display: flex;
  letter-spacing: 0.02em;
}

.loading-screen.dark .loading-text {
  color: #fff;
}

.letter {
  display: inline-block;
  opacity: 0;
  animation: letterReveal 0.5s ease forwards;
}

.letter.dots {
  animation: letterReveal 0.5s ease forwards, dotPulse 1.2s ease-in-out infinite;
}

@keyframes letterReveal {
  0% { 
    opacity: 0; 
    transform: translateY(10px); 
  }
  100% { 
    opacity: 1; 
    transform: translateY(0); 
  }
}

@keyframes dotPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}

/* Progress bar */
.loading-progress {
  width: 180px;
}

.progress-track {
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 1px;
  overflow: hidden;
}

.loading-screen.dark .progress-track {
  background: rgba(255, 255, 255, 0.1);
}

.progress-fill {
  height: 100%;
  width: 0%;
  background: #ca371c;
  border-radius: 1px;
  animation: progressFill 2.5s ease-out forwards;
}

@keyframes progressFill {
  0% { width: 0%; }
  100% { width: 100%; }
}

/* Fade out transition */
.fade-loader-enter-active,
.fade-loader-leave-active {
  transition: opacity 0.6s ease;
}

.fade-loader-enter-from {
  opacity: 0;
}

.fade-loader-leave-to {
  opacity: 0;
}

/* Mobile responsive loading screen */
@media (max-width: 768px) {
  .loading-logo {
    width: 70px;
  }
  
  .loading-text {
    font-size: 1.6rem;
  }
  
  .wine-glass {
    width: 40px;
    height: 75px;
  }
  
  .glass-bowl {
    width: 34px;
    height: 40px;
  }
  
  .glass-stem {
    height: 25px;
  }
  
  .loading-progress {
    width: 140px;
  }
  
  .loading-content {
    gap: 2rem;
  }
}

[data-theme="dark"], .dark-mode {
  --bg-color: #000000;
  --text-color: #ffffff;
  --nav-bg: #000000;
  --nav-shadow: rgba(255, 255, 255, 0.1);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

/* Custom Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-color);
}

::-webkit-scrollbar-thumb {
  background: #ca371c;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb:hover {
  background: #b12f17;
}

/* Firefox scrollbar */
html {
  scrollbar-width: thin;
  scrollbar-color: #ca371c var(--bg-color);
}

/* Smooth scroll behavior for slower, more controlled scrolling */
* {
  scroll-behavior: smooth;
}

/* Optional: Add some scroll padding for smoother snapping */
html {
  scroll-padding-top: 0px;
  }

/* Text slide animations */
.slide-text-enter-active,
.slide-text-leave-active {
  transition: all 0.3s ease;
}

.slide-text-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.slide-text-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.slide-text-enter-to,
.slide-text-leave-from {
  opacity: 1;
  transform: translateX(0);
}
  
  #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
  min-height: 100vh;
}

/* Apply Montserrat to paragraph text and navigation */
p {
  font-family: 'Montserrat', sans-serif;
}

.nav-main-item {
  font-family: 'Montserrat', sans-serif;
}

.navbar {
  background: var(--nav-bg);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  transition: all 0.3s ease;
}

.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.25rem;
  width: 100%;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-left a {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.nav-logo-small {
  height: 35px;
  width: auto;
  transition: all 0.3s ease;
  transform-origin: top left;
  padding-left: 16px;
}

.nav-logo-small.logo-expanded {
  transform: scale(3) translate(15%, 15%);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

/* Theme Switch - Clean Minimal Design */
.theme-switch {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.theme-toggle {
  position: relative;
  width: 48px;
  height: 24px;
}

.toggle-track {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode .toggle-track {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
}

.toggle-track:hover {
  background-color: rgba(202, 55, 28, 0.1);
  border-color: rgba(202, 55, 28, 0.4);
}

.toggle-track.dark {
  background-color: rgba(202, 55, 28, 0.2);
  border-color: rgba(202, 55, 28, 0.4);
}

.toggle-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  background-color: var(--text-color);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.toggle-thumb.dark {
  transform: translateX(24px);
  background-color: #ca371c;
}

.theme-switch:hover .toggle-thumb {
  box-shadow: 0 2px 8px rgba(202, 55, 28, 0.4);
}

/* Language Dropdown */
.language-dropdown {
  position: relative;
  display: inline-block;
}

.lang-dropdown-button {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  padding: 0.3rem 0.8rem;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  opacity: 0.8;
}

.lang-dropdown-button:hover {
  opacity: 1;
  color: #ca371c;
}

.lang-dropdown-button.open {
  opacity: 1;
  color: #ca371c;
}

.dropdown-arrow {
  font-size: 0.6rem;
  transition: all 0.3s ease;
  opacity: 0.5;
}

.dropdown-arrow.open {
  transform: rotate(180deg);
  opacity: 1;
}

.lang-dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 120px;
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-10px);
  transition: all 0.3s ease;
  z-index: 1000;
}

.dark-mode .lang-dropdown-menu {
  box-shadow: 0 8px 32px rgba(255, 255, 255, 0.1);
}

.lang-dropdown-menu.open {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-dropdown-item {
  width: 100%;
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 300;
  cursor: pointer;
  padding: 1rem 1.5rem;
  text-align: left;
  transition: var(--transition);
  display: flex;
  align-items: center;
  gap: 0.8rem;
  letter-spacing: 0.05em;
  opacity: 0.7;
}

.lang-dropdown-item:hover {
  opacity: 1;
  color: #ca371c;
  background-color: rgba(202, 55, 28, 0.05);
}

.lang-dropdown-item.active {
  color: #ca371c;
  font-weight: 500;
  opacity: 1;
}

/* Flag Icons */
.flag-icon {
  width: 20px;
  height: 14px;
  border-radius: 2px;
  object-fit: cover;
}

.flag-icon-menu {
  width: 18px;
  height: 12px;
  border-radius: 2px;
  object-fit: cover;
}

.nav-drawer-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
  width: 20px;
  height: 16px;
    z-index: 10000;

}

.hamburger-icon span {
  width: 20px;
  height: 2px;
  background-color: var(--text-color);
  transition: all 0.3s ease;
  transform-origin: center;
  position: absolute;
}

.hamburger-icon span:nth-child(1) {
  top: 0;
}

.hamburger-icon span:nth-child(2) {
  top: 7px;
}

.hamburger-icon span:nth-child(3) {
  top: 14px;
}

/* Hamburger to X animation */
.hamburger-icon.open span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger-icon.open span:nth-child(2) {
  opacity: 0;
}

.hamburger-icon.open span:nth-child(3) {
  transform: rotate(-45deg) translate(7px, -6px);
}

.nav-drawer-button:hover .hamburger-icon span {
  background-color: #ca371c;
}

/* Navigation Drawer */
.nav-drawer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1500;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.nav-drawer-overlay.open {
  opacity: 1;
  visibility: visible;
}

.nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background-color: var(--bg-color);
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 1600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-drawer.open {
  opacity: 1;
  visibility: visible;
}

.nav-drawer-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.nav-drawer-content h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  text-align: center;
}

.main-nav {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem;
}

.nav-main-item {
  text-decoration: none;
  color: var(--text-color);
  font-size: 4rem;
  font-weight: 300;
  text-align: left;
  transition: all 0.4s ease;
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
}

.nav-main-item.router-link-exact-active {
  color: #ca371c;
}

.nav-main-item:hover {
  transform: translateY(-5px);
  color: #ca371c;
}

.nav-main-item:hover .nav-text {
  transform: scale(1.05);
}

.nav-text {
  transition: all 0.3s ease;
  position: relative;
}

.nav-text::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #ca371c;
  transition: width 0.3s ease;
}

.nav-main-item:hover .nav-text::after {
  width: 100%;
}

.nav-arrow {
  font-size: 3rem;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.nav-main-item:hover .nav-arrow {
  transform: translateX(10px);
  opacity: 1;
}

.main-content {
  margin-top: 70px; /* Account for fixed navbar */
  min-height: calc(100vh - 70px);
}

.main-content.no-margin {
  margin-top: 0;
  min-height: 100vh;
}

/* Footer Styles */
.footer {
  background-color: var(--bg-color);
  border-top: 1px solid rgba(202, 55, 28, 0.2);
  padding: 3rem 2rem 1.5rem;
  transition: var(--transition);
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-brand {
  align-items: flex-start;
}

.footer-logo {
  height: 60px;
  width: auto;
  margin-bottom: 0.5rem;
  transition: var(--transition);
}

.footer-brand-name {
  font-size: 1.2rem;
  font-weight: 400;
  color: var(--text-color);
  letter-spacing: 0.05em;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
}

.footer-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: 'Montserrat', sans-serif;
  opacity: 0.9;
}

.footer-nav {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.footer-link {
  color: var(--text-color);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 300;
  transition: all 0.3s ease;
  opacity: 0.8;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  width: fit-content;
}

.footer-link:hover {
  opacity: 1;
  color: #ca371c;
  transform: translateX(5px);
}

.footer-link::before {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background-color: #ca371c;
  transition: width 0.3s ease;
}

.footer-link:hover::before {
  width: 100%;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.8;
}

.social-icon:hover {
  opacity: 1;
  border-color: #ca371c;
  color: #ca371c;
  transform: scale(1.1) translateY(-3px);
  box-shadow: 0 4px 12px rgba(202, 55, 28, 0.2);
}

.dark-mode .social-icon:hover {
  box-shadow: 0 4px 12px rgba(202, 55, 28, 0.3);
}

.social-icon svg {
  width: 20px;
  height: 20px;
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid rgba(var(--text-color), 0.1);
  text-align: center;
}

.footer-copyright {
  font-size: 0.9rem;
  color: var(--text-color);
  opacity: 0.7;
  margin: 0;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
}

/* Footer Responsive Design */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .footer-brand {
    grid-column: span 2;
    align-items: center;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
    align-items: center;
  }
  
  .footer-social {
    justify-content: center;
    align-items: center;
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 2rem 1.5rem 1rem;
  }
  
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .footer-brand {
    grid-column: span 1;
    align-items: center;
    text-align: center;
  }
  
  .footer-logo {
    height: 50px;
  }
  
  .footer-section {
    align-items: center;
    text-align: center;
  }
  
  .footer-nav {
    align-items: center;
  }
  
  .footer-link {
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 1.5rem 1rem 1rem;
  }
  
  .footer-logo {
    height: 40px;
  }
  
  .footer-brand-name {
    font-size: 1rem;
  }
  
  .footer-title {
    font-size: 0.9rem;
  }
  
  .footer-link {
    font-size: 0.85rem;
  }
  
  .social-icon {
    width: 36px;
    height: 36px;
  }
  
  .social-icon svg {
    width: 18px;
    height: 18px;
  }
  
  .footer-copyright {
    font-size: 0.8rem;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 0.5rem;
  }
  
  .nav-left {
    margin-left: 0;
  }
  
  .nav-right {
    margin-right: 0;
    gap: 0.5rem;
  }
  
  .nav-logo-small {
    height: 30px;
  }
  
  .theme-toggle {
    width: 44px;
    height: 22px;
  }
  
  .toggle-thumb {
    width: 16px;
    height: 16px;
  }
  
  .toggle-thumb.dark {
    transform: translateX(22px);
  }
  
  .lang-dropdown-button {
    font-size: 0.9rem;
    padding: 0.3rem 0.6rem;
    gap: 0.4rem;
  }
  
  .lang-dropdown-item {
    font-size: 0.8rem;
    padding: 0.8rem 1.2rem;
    gap: 0.6rem;
  }
  
  .flag-icon {
    width: 18px;
    height: 12px;
  }
  
  .flag-icon-menu {
    width: 16px;
    height: 11px;
  }
  
  .nav-main-item {
    font-size: 3rem;
  }
  
  .nav-arrow {
    font-size: 2.5rem;
  }
}

@media (max-width: 480px) {
  .nav-container {
    padding: 0 0.25rem;
  }
  
  .nav-left {
    margin-left: 0;
  }
  
  .nav-right {
    margin-right: 0;
    gap: 0.25rem;
  }
  
  .lang-dropdown-button {
    padding: 0.2rem 0.4rem;
    font-size: 0.8rem;
    gap: 0.3rem;
  }
  
  .lang-dropdown-item {
    padding: 0.7rem 1rem;
    font-size: 0.7rem;
    gap: 0.5rem;
  }
  
  .flag-icon {
    width: 16px;
    height: 11px;
  }
  
  .flag-icon-menu {
    width: 14px;
    height: 10px;
  }
  
  .main-content {
    margin-top: 60px;
  }
  
  .navbar {
    padding: 0.5rem 0;
  }
  
  .nav-logo-small {
    height: 28px;
  }
  
  .theme-toggle {
    width: 42px;
    height: 20px;
  }
  
  .toggle-thumb {
    width: 14px;
    height: 14px;
    top: 2px;
  }
  
  .toggle-thumb.dark {
    transform: translateX(20px);
  }
  
  .nav-main-item {
    font-size: 2.5rem;
  }
  
  .nav-arrow {
    font-size: 2rem;
  }
  
  .main-nav {
    gap: 2.5rem;
  }
}
</style>


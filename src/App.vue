<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <nav class="navbar">
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
            <div class="theme-switch-container">
                              <div class="theme-switch-track" :class="{ 'dark': isDarkMode }">
                  <div class="theme-switch-thumb" :class="{ 'dark': isDarkMode }">
                    <span class="theme-switch-icon">{{ isDarkMode ? '🌙' : '☀️' }}</span>
                  </div>
                  <div class="theme-switch-labels">
                    <span class="theme-switch-label left" :class="{ 'hidden': !isDarkMode }">DARK</span>
                    <span class="theme-switch-label right" :class="{ 'hidden': isDarkMode }">LIGHT</span>
                  </div>
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
    <div class="nav-drawer-overlay" :class="{ 'open': isNavDrawerOpen }" @click="closeNavDrawer">
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

    <main class="main-content">
      <router-view/>
    </main>
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
      isLanguageDropdownOpen: false
    }
  },
  computed: {
    ...mapGetters(['isDarkMode', 'currentLanguage']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.png' : '/logo_light.png'
    },
    currentLanguageFlag() {
      return this.currentLanguage === 'English' ? '/english.png' : '/serbian.png'
    }
  },
  methods: {
    ...mapActions(['toggleTheme']),
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
  scroll-snap-type: y proximity;
  scroll-behavior: smooth;
}

/* Custom Scrollbar Styling */
::-webkit-scrollbar {
  width: 12px;
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

/* Theme Switch */
.theme-switch {
  cursor: pointer;
}

.theme-switch-container {
  position: relative;
}

.theme-switch-track {
  position: relative;
  width: 100px;
  height: 32px;
  background-color: var(--bg-color);
  border: 2px solid var(--text-color);
  border-radius: 16px;
  transition: all 0.3s ease;
  overflow: hidden;
  padding:10px;
}

.theme-switch-track:hover {
  border-color: #ca371c;
}

.theme-switch-track.dark {
  background-color: #2a2a2a;
}

.theme-switch-thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 46px;
  height: 24px;
  background-color: var(--text-color);
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.theme-switch-thumb.dark {
  transform: translateX(50px);
  background-color: #f8f8f8;
  color: #2a2a2a;
}

.theme-switch-icon {
  font-size: 14px;
  transition: all 0.3s ease;
}

.theme-switch-labels {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  pointer-events: none;
}

.theme-switch-label {
  font-size: 9px;
  font-weight: 600;
  letter-spacing: 0.5px;
  color: var(--text-color);
  opacity: 0.8;
  transition: all 0.3s ease;
  z-index: 5;
}

.theme-switch-label.hidden {
  opacity: 0;
}

.theme-switch-label.left {
  margin-left: 4px;
}

.theme-switch-label.right {
  margin-right: 4px;
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
    width: 35px;
    height: 35px;
  }
  
  .theme-icon {
    font-size: 1rem;
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


<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <nav class="navbar">
      <div class="nav-container">
        <!-- Left Side: Logo -->
        <div class="nav-left">
          <img :src="currentLogo" alt="Tanin Logo" class="nav-logo-small">
        </div>
        
        <!-- Right Side: Theme Toggle, Languages, Nav Drawer -->
        <div class="nav-right">
          <button class="theme-toggle" @click="toggleTheme" :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'">
            <span class="theme-icon">{{ isDarkMode ? '☀️' : '🌙' }}</span>
          </button>
          <button class="lang-option active">Eng</button>
          <button class="lang-option">Srb</button>
          <button class="nav-drawer-button" @click="toggleNavDrawer" aria-label="Open navigation menu">
            <div class="hamburger-icon">
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
          <h2>This is the navigation</h2>
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

export default {
  name: 'App',
  data() {
    return {
      isNavDrawerOpen: false
    }
  },
  computed: {
    ...mapGetters(['isDarkMode']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.svg' : '/logo_light.svg'
    }
  },
  methods: {
    ...mapActions(['toggleTheme']),
    toggleNavDrawer() {
      this.isNavDrawerOpen = !this.isNavDrawerOpen
    },
    closeNavDrawer() {
      this.isNavDrawerOpen = false
    }
  },
  mounted() {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
      this.$store.dispatch('setTheme', true)
    }
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: var(--transition);
  min-height: 100vh;
}

.navbar {
  background: var(--nav-bg);
  padding: 1rem 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
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

.nav-logo-small {
  height: 35px;
  width: auto;
  transition: var(--transition);
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: 2px solid var(--text-color);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  color: var(--text-color);
  transition: var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-toggle:hover {
  background-color: var(--text-color);
  color: var(--bg-color);
}

.theme-icon {
  font-size: 1.2rem;
}

.lang-option {
  background: none;
  border: none;
  color: var(--text-color);
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  transition: var(--transition);
  opacity: 0.7;
}

.lang-option.active {
  opacity: 1;
  font-weight: 700;
  color: #ca371c;
}

.lang-option:hover {
  opacity: 1;
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
}

.hamburger-icon span {
  width: 20px;
  height: 2px;
  background-color: var(--text-color);
  transition: var(--transition);
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
  right: 0;
  height: 100vh;
  width: 100%;
  max-width: 400px;
  background-color: var(--nav-bg);
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1600;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
}

.dark-mode .nav-drawer {
  box-shadow: -5px 0 15px rgba(255, 255, 255, 0.1);
}

.nav-drawer.open {
  transform: translateX(0);
}

.nav-drawer-content {
  padding: 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-drawer-content h2 {
  color: var(--text-color);
  font-size: 1.5rem;
  text-align: center;
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
  
  .lang-option {
    font-size: 0.9rem;
    padding: 0.4rem 0.8rem;
  }
  
  .nav-drawer {
    max-width: 320px;
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
  
  .lang-option {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
  
  .nav-drawer {
    max-width: 280px;
  }
  
  .main-content {
    margin-top: 60px;
  }
  
  .navbar {
    padding: 0.5rem 0;
  }
}
</style>

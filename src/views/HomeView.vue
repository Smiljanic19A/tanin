<template>
  <div class="home">
    <!-- Main Logo Section -->
    <section class="logo-section">
      <div class="logo-container">
        <!-- Main Logo -->
        <div class="main-logo">
          <img :src="currentLogo" alt="Tanin Logo" class="logo-image">
        </div>
        
        <!-- Brand Text Banner -->
        <div class="brand-banner">
          <img :src="currentBannerText" alt="Tannin" class="banner-text">
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['isDarkMode']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.svg' : '/logo_light.svg'
    },
    currentBannerText() {
      return this.isDarkMode ? '/banner_text_light.svg' : '/banner_text_dark.svg'
    }
  }
}
</script>

<style scoped>
.home {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  transition: var(--transition);
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 2rem;
}

.logo-container {
  text-align: center;
  max-width: 600px;
}

.main-logo {
  margin-bottom: 2rem;
}

.logo-image {
  width: auto;
  height: 200px;
  max-width: 100%;
  transition: var(--transition);
}

.brand-banner {
  margin-top: 1rem;
}

.banner-text {
  width: auto;
  height: 80px;
  max-width: 100%;
  transition: var(--transition);
}

/* Responsive Design */
@media (max-width: 768px) {
  .logo-image {
    height: 150px;
  }
  
  .banner-text {
    height: 60px;
  }
  
  .main-logo {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .logo-image {
    height: 120px;
  }
  
  .banner-text {
    height: 50px;
  }
  
  .logo-section {
    padding: 1rem;
  }
  
  .main-logo {
    margin-bottom: 1rem;
  }
}

/* Hover effects */
.logo-image,
.banner-text {
  transition: all 0.3s ease;
}

.logo-image:hover,
.banner-text:hover {
  transform: scale(1.02);
}
</style>

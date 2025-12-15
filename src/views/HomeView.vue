<template>
  <div class="home">
    <!-- Main Logo Section -->
    <section class="logo-section">
      <div class="logo-container">
        <!-- Main Logo -->
        <div class="main-logo">
          <img :src="currentLogo" alt="Tanin Logo" class="logo-image" @click="rotateLogo" :style="{ transform: `rotate(${logoRotation}deg) scale(${logoScale})` }" @mouseenter="onHover" @mouseleave="onLeave">
        </div>
        
        <!-- Brand Text Banner -->
        <div class="brand-banner">
          <img :src="currentBannerText" alt="Tannin" class="banner-text">
        </div>
      </div>
    </section>

    <!-- Wine Collection Section -->
    <section class="wine-collection-section">
      <MasonryGrid :images="wineImages" :auto-slide="true" :slide-interval="5000" :display-count="3" />
    </section>

    <!-- Restaurant Description Section -->
    <section class="restaurant-section">
      <div class="restaurant-container">
        <!-- Restaurant Logo -->
        <div class="restaurant-logo">
          <img :src="currentLogo" alt="Tanin Logo" class="restaurant-logo-image">
        </div>
        
        <!-- Restaurant Content -->
        <div class="restaurant-content">
          <h2 class="restaurant-title">
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'home.restaurantTitle'">{{ $t('home.restaurantTitle') }}</span>
            </transition>
          </h2>
          <p class="restaurant-description">
            <transition name="slide-text" mode="out-in">
              <span :key="currentLanguage + 'home.restaurantDescription'">{{ $t('home.restaurantDescription') }}</span>
            </transition>
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Information Section -->
    <section class="contact-section" id="location-section">
      <div class="contact-hero-image">
        <MasonryGrid :images="foodImages" :auto-slide="true" :slide-interval="5000" :display-count="3" />
      </div>
      
      <div class="contact-info-container">
        <div class="contact-grid">
          <!-- Top Row: Address and Hours -->
          <div class="contact-row-top">
            <!-- Location Information -->
            <div class="contact-item location-info">
              <h3 class="contact-title">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'home.contactAddress'" v-html="$t('home.contactAddress')"></span>
                </transition>
              </h3>
              <p class="contact-link">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'home.contactDirections'"><a href="https://www.google.com/maps/dir//TANNIN+Wine+Bistro,+%C5%BDor%C5%BEa+Klemansoa+27v,+Beograd+11158/@44.824628,20.4706631,21z/data=!4m17!1m7!3m6!1s0x475a7b002abc02f5:0x344219103762091!2sTANNIN+Wine+Bistro!8m2!3d44.8246407!4d20.4709404!16s%2Fg%2F11y3mx_0d8!4m8!1m0!1m5!1m1!1s0x475a7b002abc02f5:0x344219103762091!2m2!1d20.4709493!2d44.8246464!3e2?entry=ttu&g_ep=EgoyMDI1MDcyMS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank">{{ $t('home.contactDirections') }}</a></span>
                </transition>
              </p>
            </div>
            
            <!-- Opening Hours -->
            <div class="contact-item hours-info">
              <h3 class="contact-title">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'home.openingHours'">{{ $t('home.openingHours') }}</span>
                </transition>
              </h3>
              <p class="hours-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'home.openingDays1'">{{ $t('home.openingDays1') }}</span>
                </transition>
              </p>
              <p class="hours-text">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'home.openingDays2'">{{ $t('home.openingDays2') }}</span>
                </transition>
              </p>
            </div>
          </div>
          
          <!-- Bottom Row: Contact (Centered) -->
          <div class="contact-row-bottom">
            <div class="contact-item contact-details">
              <h3 class="contact-title">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'home.contact'">{{ $t('home.contact') }}</span>
                </transition>
              </h3>
              <p class="contact-text phone-number">
                <a href="tel:+381662424021">+381 66 242 402</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MasonryGrid from '@/components/MasonryGrid.vue'
import translationMixin from '@/mixins/translationMixin'

export default {
  name: 'HomeView',
  mixins: [translationMixin],
  components: {
    MasonryGrid
  },
  data() {
    return {
      logoRotation: 0,
      logoScale: 1,
      wineImages: [
        '/grid1/wine_1.JPG',
        '/grid1/wine_2.jpg',
        '/grid1/wine_3.JPG',
        '/grid1/IMG_9671.JPG'
      ],
      foodImages: [
        '/grid2/food_1.jpg',
        '/grid2/food_2.jpg',
        '/grid2/food_3.jpg',
        '/grid2/food_4.jpg',
        '/grid2/food_5.jpg',
        '/grid2/food_6.jpg'
      ]
    }
  },
  computed: {
    ...mapGetters(['isDarkMode']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.png' : '/logo_light.png'
    },
    currentBannerText() {
      return this.isDarkMode ? '/banner_text_light.png' : '/banner_text_dark.png'
    }
  },
  methods: {
    rotateLogo() {
      this.logoRotation += 90
    },
    onHover() {
      this.logoScale = 1.02
    },
    onLeave() {
      this.logoScale = 1
    }
  },
  mounted() {
    // Ensure page loads at the top (logo section)
    window.scrollTo(0, 0)
  }
}
</script>

<style scoped>
.home {
  width: 100%;
}

.logo-section {
  width: 100%;
  min-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  transition: var(--transition);
}

.logo-container {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
}

.main-logo {
  margin-bottom: 2rem;
}

.logo-image {
  width: auto;
  height: 200px;
  max-width: 100%;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.logo-image:hover {
  transform: scale(1.02);
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

.wine-collection-section {
  width: 100%;
  min-height: 50vh;
  background-color: var(--bg-color);
  transition: var(--transition);
  display: flex;
  align-items: center;
  padding: 0;
}

.restaurant-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-color);
  transition: var(--transition);
  padding: 4rem 2rem;
  scroll-snap-align: start;
}

.restaurant-container {
  max-width: 800px;
  text-align: center;
}

.restaurant-logo {
  margin-bottom: 3rem;
}

.restaurant-logo-image {
  width: auto;
  height: 120px;
  max-width: 100%;
  transition: var(--transition);
}

.restaurant-content {
  max-width: 600px;
  margin: 0 auto;
}

.restaurant-title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 400;
  color: var(--text-color);
  margin-bottom: 2rem;
  font-family: 'Corinthia', cursive;
  line-height: 1.3;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.restaurant-description {
  font-size: clamp(1rem, 1.8vw, 1.1rem);
  line-height: 1.8;
  color: var(--text-color);
  text-align: justify;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

/* Contact Section */
.contact-section {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
  transition: var(--transition);
  scroll-snap-align: start;
  overflow: hidden;
}

.contact-hero-image {
  width: 100%;
  min-height: 60vh;
  flex-shrink: 0;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: var(--bg-color);
  display: flex;
  align-items: flex-start;
}

.logo-overlay {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 100;
  pointer-events: none;
}

.overlay-logo {
  height: 60px;
  width: auto;
  opacity: 0.9;
  transition: var(--transition);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
}

.contact-info-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

.contact-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.contact-row-top {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  position: relative;
}

.contact-row-top::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background-color: var(--text-color);
  opacity: 0.2;
  transform: translateX(-50%);
}

.contact-row-bottom {
  display: flex;
  justify-content: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(202, 55, 28, 0.15);
}

.contact-item {
  font-family: 'Montserrat', sans-serif;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-height: fit-content;
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
}

.contact-title {
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  font-family: 'Georgia', serif;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 1rem;
  line-height: 1.4;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.contact-link {
  color: var(--text-color);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.contact-link:hover {
  opacity: 1;
  color: #ca371c;
}

.contact-link a {
  color: inherit;
  text-decoration: none;
}

.contact-link a:visited,
.contact-link a:link,
.contact-link a:active,
.contact-link a:hover {
  color: inherit;
  text-decoration: none;
}

.hours-text {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: var(--text-color);
  margin: 0.5rem 0;
  font-weight: 500;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.hours-time {
  font-size: clamp(0.95rem, 1.8vw, 1.1rem);
  color: var(--text-color);
  margin: 0;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.contact-text {
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  color: var(--text-color);
  margin: 0.5rem 0;
  transition: var(--transition);
  overflow-wrap: break-word;
  word-wrap: break-word;
}

.contact-text.phone-number {
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  font-weight: 500;
  letter-spacing: 0.05em;
}

.contact-text.phone-number a {
  color: var(--text-color);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-text.phone-number a:hover {
  color: #ca371c;
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
  
  .restaurant-section {
    padding: 3rem 1.5rem;
    min-height: auto;
  }
  
  .restaurant-logo-image {
    height: 100px;
  }
  
  .restaurant-title {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
  
  .restaurant-description {
    font-size: 1rem;
    line-height: 1.6;
    text-align: left;
  }
  
  .wine-collection-section {
    min-height: auto;
    padding: 2rem 0;
  }
  
  .contact-section {
    min-height: auto;
    height: auto;
    flex-direction: column;
  }
  
  .contact-hero-image {
    min-height: auto;
    height: auto;
    width: 100%;
    padding: 1rem;
  }
  
  .logo-overlay {
    top: 1rem;
    left: 1rem;
  }
  
  .overlay-logo {
    height: 45px;
  }
  
  .contact-info-container {
    padding: 2rem 1rem;
    flex: none;
  }
  
  .contact-grid {
    gap: 1.5rem;
    max-width: 100%;
  }
  
  .contact-row-top {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .contact-row-top::before {
    display: none;
  }
  
  .contact-row-bottom {
    padding-top: 0.75rem;
  }
  
  .contact-item {
    padding: 0.75rem;
  }
  
  .contact-title {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }
  
  .contact-link,
  .contact-text,
  .hours-text,
  .hours-time {
    font-size: 0.95rem;
  }
}

@media (max-width: 480px) {
  .logo-image {
    height: 120px;
  }
  
  .banner-text {
    height: 50px;
  }
  
  .logo-container {
    padding: 1rem;
  }
  
  .main-logo {
    margin-bottom: 1rem;
  }
  
  .restaurant-section {
    padding: 2rem 1rem;
    min-height: auto;
  }
  
  .restaurant-logo {
    margin-bottom: 2rem;
  }
  
  .restaurant-logo-image {
    height: 80px;
  }
  
  .restaurant-title {
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }
  
  .restaurant-description {
    font-size: 0.95rem;
    line-height: 1.6;
  }
  
  .wine-collection-section {
    min-height: auto;
    padding: 1.5rem 0;
  }
  
  .contact-section {
    min-height: auto;
    height: auto;
  }
  
  .contact-hero-image {
    min-height: auto;
    height: auto;
    padding: 0.75rem;
  }
  
  .logo-overlay {
    top: 0.75rem;
    left: 0.75rem;
  }
  
  .overlay-logo {
    height: 40px;
  }
  
  .contact-info-container {
    padding: 1.5rem 0.75rem;
  }
  
  .contact-grid {
    gap: 1.25rem;
  }
  
  .contact-item {
    padding: 0.5rem;
  }
  
  .contact-title {
    font-size: 1.1rem;
    margin-bottom: 0.4rem;
  }
  
  .hours-text,
  .hours-time {
    font-size: 0.9rem;
    margin: 0.25rem 0;
  }
  
  .contact-text {
    font-size: 0.85rem;
    margin: 0.25rem 0;
  }
  
  .contact-link {
    font-size: 0.85rem;
  }
}

/* Hover effects */
.logo-image,
.banner-text,
.restaurant-logo-image {
  transition: all 0.3s ease;
}

.logo-image:hover,
.banner-text:hover,
.restaurant-logo-image:hover {
  transform: scale(1.02);
}
</style>

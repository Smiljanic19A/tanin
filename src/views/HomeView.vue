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

    <!-- Wine Collection Section -->
    <section class="wine-collection-section">
      <WineSlider />
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
          <h2 class="restaurant-title">Best Wine selection in Belgrade</h2>
          <p class="restaurant-description">
            Dedicated to life's simple pleasures of eating and drinking well, Roma is a nod to regional Italian home cooking by Chef Luca Pezzera, served in a grand yet inviting space in the heart of Jakarta's SCBD. Drop by for an al fresco lunch with the most authentic Neapolitan pizza in town, made by world champion pizzaiolo Pasqualino Barbasso. A leisurely dinner should involve at least one of our many iterations of Cacio e Pepe, the sublime spaghetti carbonara or the trippa all'omana, accompanied by fantastic Italian wines. The bar is perfect for a spot of aperitivo as well as late night revelries: try the excellent Garibaldi, any of the classic and innovative Negronis, or any cocktails highlighting amaro and bitters.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Information Section -->
    <section class="contact-section">
      <div class="contact-hero-image">
        <img src="/banner_plate.svg" alt="Delicious Food" class="food-image">
        <div class="logo-overlay">
          <img :src="currentLogo" alt="Tanin Logo" class="overlay-logo">
        </div>
      </div>
      
      <div class="contact-info-container">
        <div class="contact-grid">
          <!-- Location Information -->
          <div class="contact-item location-info">
            <h3 class="contact-title">Zorza klempansog 27v,<br>Belgrade</h3>
            <p class="contact-link">Maps and directions</p>
          </div>
          
          <!-- Opening Hours -->
          <div class="contact-item hours-info">
            <h3 class="contact-title">Opening Hours:</h3>
            <p class="hours-text">Tuesday - Sunday</p>
            <p class="hours-time">12:00 pm - 01:00 am</p>
          </div>
          
          <!-- Contact Information -->
          <div class="contact-item contact-details">
            <h3 class="contact-title">Contact:</h3>
            <p class="contact-text">Phone: 01123456788</p>
            <p class="contact-text">WhatsApp: 01123412334</p>
          </div>
          
          <!-- Additional Contact -->
          <div class="contact-item contact-details-alt">
            <h3 class="contact-title">Contact:</h3>
            <p class="contact-text">Phone: 01123456788</p>
            <p class="contact-text">WhatsApp: 01123412334</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import WineSlider from '@/components/WineSlider.vue'

export default {
  name: 'HomeView',
  components: {
    WineSlider
  },
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
}

.logo-section {
  width: 100%;
  min-height: 100vh;
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

.wine-collection-section {
  width: 100%;
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
  font-size: 2.5rem;
  font-weight: 400;
  color: var(--text-color);
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  line-height: 1.2;
  transition: var(--transition);
}

.restaurant-description {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  text-align: justify;
  margin: 0;
  font-weight: 400;
  opacity: 0.9;
  transition: var(--transition);
}

/* Contact Section */
.contact-section {
  width: 100%;
  background-color: var(--bg-color);
  transition: var(--transition);
}

.contact-hero-image {
  width: 100%;
  height: 60vh;
  position: relative;
  overflow: hidden;
}

.food-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.logo-overlay {
  position: absolute;
  top: 2rem;
  left: 2rem;
}

.overlay-logo {
  height: 60px;
  width: auto;
  opacity: 0.8;
  transition: var(--transition);
}

.contact-info-container {
  padding: 2rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 1rem 6rem;
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
}

.contact-grid::before {
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

.contact-item {
  padding: 1.5rem;
}

.contact-title {
  font-size: 1.5rem;
  font-weight: 400;
  color: var(--text-color);
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  line-height: 1.3;
  transition: var(--transition);
}

.contact-link {
  color: var(--text-color);
  font-size: 1rem;
  margin: 0;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.8;
  transition: var(--transition);
}

.contact-link:hover {
  opacity: 1;
  color: #ca371c;
}

.hours-text {
  font-size: 1.1rem;
  color: var(--text-color);
  margin: 0.5rem 0;
  font-weight: 500;
  transition: var(--transition);
}

.hours-time {
  font-size: 1.1rem;
  color: var(--text-color);
  margin: 0;
  transition: var(--transition);
}

.contact-text {
  font-size: 1rem;
  color: var(--text-color);
  margin: 0.5rem 0;
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
  
  .restaurant-section {
    padding: 3rem 1.5rem;
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
  
  .contact-hero-image {
    height: 40vh;
  }
  
  .logo-overlay {
    top: 1rem;
    left: 1rem;
  }
  
  .overlay-logo {
    height: 45px;
  }
  
  .contact-info-container {
    padding: 3rem 1.5rem;
  }
  
  .contact-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 2rem;
  }
  
  .contact-title {
    font-size: 1.3rem;
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
  
  .contact-hero-image {
    height: 35vh;
  }
  
  .overlay-logo {
    height: 40px;
  }
  
  .contact-info-container {
    padding: 2rem 1rem;
  }
  
  .contact-title {
    font-size: 1.2rem;
  }
  
  .hours-text,
  .hours-time {
    font-size: 1rem;
  }
  
  .contact-text {
    font-size: 0.9rem;
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

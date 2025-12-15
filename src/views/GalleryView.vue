<template>
  <div class="gallery-page">
    <!-- Hero Section -->
    <section class="gallery-hero">
      <div class="hero-content">
        <h1 class="gallery-title">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'gallery.title'">{{ $t('gallery.title') }}</span>
          </transition>
        </h1>
        <p class="gallery-subtitle">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'gallery.subtitle'">{{ $t('gallery.subtitle') }}</span>
          </transition>
        </p>
      </div>
    </section>

    <!-- Events Section -->
    <section class="gallery-section events-section">
      <div class="section-header">
        <div class="section-accent"></div>
        <h2 class="section-title">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'gallery.events'">{{ $t('gallery.events') }}</span>
          </transition>
        </h2>
        <p class="section-description">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'gallery.eventsDescription'">{{ $t('gallery.eventsDescription') }}</span>
          </transition>
        </p>
      </div>
      
      <div class="pinterest-grid events-grid">
        <div 
          v-for="(image, index) in eventsImages" 
          :key="`event-${index}`"
          class="grid-item"
          :class="getItemClass(index, 'events')"
          @click="openLightbox(eventsImages, index)"
        >
          <div class="image-container">
            <img :src="image" :alt="`Event ${index + 1}`" loading="lazy">
            <div class="image-overlay">
              <div class="overlay-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Divider -->
    <div class="section-divider">
      <div class="divider-line"></div>
      <img :src="currentLogo" alt="Tanin" class="divider-logo">
      <div class="divider-line"></div>
    </div>

    <!-- Main Gallery Section -->
    <section class="gallery-section main-gallery-section">
      <div class="section-header">
        <div class="section-accent"></div>
        <h2 class="section-title">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'gallery.moments'">{{ $t('gallery.moments') }}</span>
          </transition>
        </h2>
        <p class="section-description">
          <transition name="slide-text" mode="out-in">
            <span :key="currentLanguage + 'gallery.momentsDescription'">{{ $t('gallery.momentsDescription') }}</span>
          </transition>
        </p>
      </div>
      
      <div class="pinterest-grid main-grid">
        <div 
          v-for="(image, index) in galleryImages" 
          :key="`gallery-${index}`"
          class="grid-item"
          :class="getItemClass(index, 'gallery')"
          @click="openLightbox(galleryImages, index)"
        >
          <div class="image-container">
            <img :src="image" :alt="`Gallery ${index + 1}`" loading="lazy">
            <div class="image-overlay">
              <div class="overlay-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  <line x1="11" y1="8" x2="11" y2="14"></line>
                  <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    <transition name="fade">
      <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-container" @click.stop>
          <button class="lightbox-close" @click="closeLightbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          
          <button 
            class="lightbox-nav lightbox-prev" 
            @click="prevImage"
            v-if="currentImageIndex > 0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <div class="lightbox-image-wrapper">
            <transition name="slide-fade" mode="out-in">
              <img 
                :key="currentImageIndex"
                :src="currentImages[currentImageIndex]" 
                :alt="`Image ${currentImageIndex + 1}`"
                class="lightbox-image"
              >
            </transition>
          </div>
          
          <button 
            class="lightbox-nav lightbox-next" 
            @click="nextImage"
            v-if="currentImageIndex < currentImages.length - 1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          <div class="lightbox-counter">
            {{ currentImageIndex + 1 }} / {{ currentImages.length }}
          </div>

          <div class="lightbox-thumbnails">
            <div 
              v-for="(img, idx) in currentImages"
              :key="`thumb-${idx}`"
              class="lightbox-thumb"
              :class="{ 'active': idx === currentImageIndex }"
              @click="currentImageIndex = idx"
            >
              <img :src="img" :alt="`Thumbnail ${idx + 1}`">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import translationMixin from '@/mixins/translationMixin'

export default {
  name: 'GalleryView',
  mixins: [translationMixin],
  data() {
    return {
      // Events grid uses grid1 images (wine-themed)
      eventsImages: [
        '/grid1/wine_1.JPG',
        '/grid1/wine_2.jpg',
        '/grid1/wine_3.JPG',
        '/grid1/IMG_9671.JPG'
      ],
      // Main gallery uses grid2 images (food/atmosphere)
      galleryImages: [
        '/grid2/food_1.jpg',
        '/grid2/food_2.jpg',
        '/grid2/food_3.jpg',
        '/grid2/food_4.jpg',
        '/grid2/food_5.jpg',
        '/grid2/food_6.jpg'
      ],
      lightboxOpen: false,
      currentImageIndex: 0,
      currentImages: []
    }
  },
  computed: {
    ...mapGetters(['isDarkMode', 'currentLanguage']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.png' : '/logo_light.png'
    }
  },
  methods: {
    getItemClass(index, type) {
      // Create varied heights for Pinterest effect
      if (type === 'events') {
        const patterns = ['tall', 'short', 'medium', 'tall']
        return patterns[index % patterns.length]
      } else {
        const patterns = ['medium', 'tall', 'short', 'medium', 'short', 'tall']
        return patterns[index % patterns.length]
      }
    },
    openLightbox(images, index) {
      this.currentImages = images
      this.currentImageIndex = index
      this.lightboxOpen = true
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', this.handleKeydown)
    },
    closeLightbox() {
      this.lightboxOpen = false
      document.body.style.overflow = ''
      document.removeEventListener('keydown', this.handleKeydown)
    },
    nextImage() {
      if (this.currentImageIndex < this.currentImages.length - 1) {
        this.currentImageIndex++
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
      }
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closeLightbox()
      } else if (event.key === 'ArrowRight') {
        this.nextImage()
      } else if (event.key === 'ArrowLeft') {
        this.prevImage()
      }
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeydown)
    document.body.style.overflow = ''
  }
}
</script>

<style scoped>
.gallery-page {
  width: 100%;
  min-height: 100vh;
  background-color: var(--bg-color);
  transition: var(--transition);
}

/* Hero Section */
.gallery-hero {
  width: 100%;
  min-height: 40vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 2rem 4rem;
  background: linear-gradient(
    180deg,
    var(--bg-color) 0%,
    var(--bg-color) 100%
  );
  position: relative;
  overflow: hidden;
}

.gallery-hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    ellipse at center,
    rgba(202, 55, 28, 0.03) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  position: relative;
  z-index: 1;
}

.gallery-title {
  font-family: 'Corinthia', cursive;
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 400;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  letter-spacing: 0.02em;
  line-height: 1.1;
}

.gallery-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 300;
  color: var(--text-color);
  opacity: 0.8;
  margin: 0;
  letter-spacing: 0.05em;
}

/* Section Styling */
.gallery-section {
  padding: 4rem 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 3rem;
  position: relative;
}

.section-accent {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #ca371c, transparent);
  margin: 0 auto 1.5rem;
  border-radius: 2px;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

.section-description {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 300;
  color: var(--text-color);
  opacity: 0.7;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
}

/* Pinterest/Masonry Grid */
.pinterest-grid {
  column-count: 4;
  column-gap: 1.25rem;
  width: 100%;
}

.events-grid {
  column-count: 4;
}

.main-grid {
  column-count: 3;
}

.grid-item {
  break-inside: avoid;
  margin-bottom: 1.25rem;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: var(--bg-color);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.dark-mode .grid-item {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.grid-item:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 40px rgba(202, 55, 28, 0.2);
  z-index: 10;
}

.dark-mode .grid-item:hover {
  box-shadow: 0 20px 40px rgba(202, 55, 28, 0.3);
}

.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.grid-item:hover .image-container img {
  transform: scale(1.08);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.6) 100%
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.grid-item:hover .image-overlay {
  opacity: 1;
}

.overlay-icon {
  color: white;
  transform: scale(0.8);
  opacity: 0;
  transition: all 0.3s ease 0.1s;
}

.grid-item:hover .overlay-icon {
  transform: scale(1);
  opacity: 1;
}

/* Height variations for Pinterest effect */
.grid-item.tall .image-container img {
  aspect-ratio: 3/4;
  object-fit: cover;
}

.grid-item.medium .image-container img {
  aspect-ratio: 4/3;
  object-fit: cover;
}

.grid-item.short .image-container img {
  aspect-ratio: 16/9;
  object-fit: cover;
}

/* Section Divider */
.section-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(202, 55, 28, 0.3), transparent);
}

.divider-logo {
  width: 50px;
  height: auto;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.divider-logo:hover {
  opacity: 1;
  transform: scale(1.05);
}

/* Events Section specific styling */
.events-section .grid-item {
  border: 1px solid rgba(202, 55, 28, 0.15);
}

.events-section .grid-item:hover {
  border-color: rgba(202, 55, 28, 0.4);
}

/* Lightbox Styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.97);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(20px);
}

.lightbox-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  z-index: 10;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.lightbox-close:hover {
  background: #ca371c;
  border-color: #ca371c;
  transform: scale(1.1);
}

.lightbox-image-wrapper {
  max-width: 85vw;
  max-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.lightbox-nav:hover {
  background: #ca371c;
  border-color: #ca371c;
  transform: translateY(-50%) scale(1.1);
}

.lightbox-prev {
  left: 2rem;
}

.lightbox-next {
  right: 2rem;
}

.lightbox-counter {
  position: absolute;
  bottom: 7rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 30px;
  font-size: 0.95rem;
  font-weight: 500;
  font-family: 'Montserrat', sans-serif;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.1em;
}

.lightbox-thumbnails {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.6rem;
  justify-content: center;
  max-width: 90vw;
  overflow-x: auto;
  padding: 0.75rem;
  scrollbar-width: none;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.lightbox-thumbnails::-webkit-scrollbar {
  display: none;
}

.lightbox-thumb {
  width: 65px;
  height: 65px;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.3s ease;
  flex-shrink: 0;
  opacity: 0.5;
}

.lightbox-thumb:hover {
  opacity: 0.85;
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.lightbox-thumb.active {
  border-color: #ca371c;
  opacity: 1;
  transform: scale(1.1);
}

.lightbox-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* Animations */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}

.slide-fade-leave-active {
  transition: all 0.2s ease;
}

.slide-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}

/* Responsive Design */
@media (max-width: 1400px) {
  .pinterest-grid {
    column-count: 3;
  }
  
  .events-grid {
    column-count: 3;
  }
  
  .main-grid {
    column-count: 3;
  }
}

@media (max-width: 1024px) {
  .pinterest-grid {
    column-count: 2;
  }
  
  .events-grid {
    column-count: 2;
  }
  
  .main-grid {
    column-count: 2;
  }
  
  .gallery-section {
    padding: 3rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .gallery-hero {
    min-height: 30vh;
    padding: 5rem 1.5rem 3rem;
  }
  
  .gallery-title {
    font-size: 3rem;
  }
  
  .gallery-subtitle {
    font-size: 0.95rem;
  }
  
  .pinterest-grid,
  .events-grid,
  .main-grid {
    column-count: 2;
    column-gap: 0.75rem;
  }
  
  .grid-item {
    margin-bottom: 0.75rem;
    border-radius: 12px;
  }
  
  .gallery-section {
    padding: 2.5rem 1rem;
  }
  
  .section-header {
    margin-bottom: 2rem;
  }
  
  .section-title {
    font-size: 1.25rem;
    letter-spacing: 0.1em;
  }
  
  .section-divider {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }
  
  .divider-logo {
    width: 40px;
  }
  
  /* Lightbox mobile */
  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 44px;
    height: 44px;
  }
  
  .lightbox-nav {
    width: 50px;
    height: 50px;
  }
  
  .lightbox-prev {
    left: 0.75rem;
  }
  
  .lightbox-next {
    right: 0.75rem;
  }
  
  .lightbox-image-wrapper {
    max-width: 95vw;
    max-height: 75vh;
  }
  
  .lightbox-counter {
    bottom: 5.5rem;
    font-size: 0.85rem;
    padding: 0.5rem 1rem;
  }
  
  .lightbox-thumbnails {
    bottom: 1rem;
    gap: 0.4rem;
    padding: 0.5rem;
  }
  
  .lightbox-thumb {
    width: 50px;
    height: 50px;
    border-radius: 6px;
  }
}

@media (max-width: 480px) {
  .gallery-hero {
    min-height: 25vh;
    padding: 4rem 1rem 2.5rem;
  }
  
  .gallery-title {
    font-size: 2.5rem;
  }
  
  .gallery-subtitle {
    font-size: 0.85rem;
  }
  
  .pinterest-grid,
  .events-grid,
  .main-grid {
    column-count: 2;
    column-gap: 0.5rem;
  }
  
  .grid-item {
    margin-bottom: 0.5rem;
    border-radius: 10px;
  }
  
  .gallery-section {
    padding: 2rem 0.75rem;
  }
  
  .section-title {
    font-size: 1.1rem;
  }
  
  .section-description {
    font-size: 0.85rem;
  }
  
  .section-accent {
    width: 40px;
    margin-bottom: 1rem;
  }
  
  .section-divider {
    padding: 1.5rem 0.75rem;
    gap: 1rem;
  }
  
  .divider-logo {
    width: 35px;
  }
  
  .lightbox-nav {
    width: 44px;
    height: 44px;
  }
  
  .lightbox-nav svg {
    width: 24px;
    height: 24px;
  }
  
  .lightbox-thumb {
    width: 45px;
    height: 45px;
  }
}

/* Touch device optimizations */
@media (hover: none) and (pointer: coarse) {
  .grid-item:hover {
    transform: none;
  }
  
  .grid-item:active {
    transform: scale(0.98);
  }
  
  .image-overlay {
    opacity: 0;
  }
  
  .grid-item:active .image-overlay {
    opacity: 1;
  }
}
</style>


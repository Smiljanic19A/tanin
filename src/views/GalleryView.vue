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
          :class="[getItemClass(index, 'events'), { 'loaded': loadedImages[`event-${index}`] }]"
          @click="openLightbox(eventsImages, index)"
        >
          <div class="image-container">
            <div class="image-placeholder"></div>
            <img 
              :src="image" 
              :alt="`Event ${index + 1}`"
              loading="lazy"
              decoding="async"
              @load="onImageLoad(`event-${index}`)"
            >
            <div class="image-overlay">
              <div class="overlay-icon">+</div>
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
          :class="[getItemClass(index, 'gallery'), { 'loaded': loadedImages[`gallery-${index}`] }]"
          @click="openLightbox(galleryImages, index)"
        >
          <div class="image-container">
            <div class="image-placeholder"></div>
            <img 
              :src="image" 
              :alt="`Gallery ${index + 1}`"
              loading="lazy"
              decoding="async"
              @load="onImageLoad(`gallery-${index}`)"
            >
            <div class="image-overlay">
              <div class="overlay-icon">+</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Lightbox - Only render when open -->
    <teleport to="body">
      <div v-if="lightboxOpen" class="lightbox-overlay" @click="closeLightbox">
        <div class="lightbox-container" @click.stop>
          <button class="lightbox-close" @click="closeLightbox" aria-label="Close">×</button>
          
          <button 
            class="lightbox-nav lightbox-prev" 
            @click="prevImage"
            v-show="currentImageIndex > 0"
            aria-label="Previous"
          >‹</button>
          
          <div class="lightbox-image-wrapper">
            <div v-if="!lightboxImageLoaded" class="lightbox-loader"></div>
            <img 
              :src="currentImages[currentImageIndex]" 
              :alt="`Image ${currentImageIndex + 1}`"
              class="lightbox-image"
              :class="{ 'visible': lightboxImageLoaded }"
              @load="onLightboxImageLoad"
            >
          </div>
          
          <button 
            class="lightbox-nav lightbox-next" 
            @click="nextImage"
            v-show="currentImageIndex < currentImages.length - 1"
            aria-label="Next"
          >›</button>

          <div class="lightbox-counter">
            {{ currentImageIndex + 1 }} / {{ currentImages.length }}
          </div>

          <div class="lightbox-thumbnails">
            <button 
              v-for="(img, idx) in currentImages"
              :key="`thumb-${idx}`"
              class="lightbox-thumb"
              :class="{ 'active': idx === currentImageIndex }"
              @click="goToImage(idx)"
            >
              <img :src="img" :alt="`Thumbnail ${idx + 1}`" loading="lazy">
            </button>
          </div>
        </div>
      </div>
    </teleport>
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
      eventsImages: [
        '/grid1/wine_1.JPG',
        '/grid1/wine_2.jpg',
        '/grid1/wine_3.JPG',
        '/grid1/IMG_9671.JPG'
      ],
      galleryImages: [
        '/grid2/food_1.jpg',
        '/grid2/food_2.jpg',
        '/grid2/food_3.jpg',
        '/grid2/food_4.jpg',
        '/grid2/food_5.jpg',
        '/grid2/food_6.jpg'
      ],
      loadedImages: {},
      lightboxOpen: false,
      lightboxImageLoaded: false,
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
      if (type === 'events') {
        const patterns = ['tall', 'short', 'medium', 'tall']
        return patterns[index % patterns.length]
      } else {
        const patterns = ['medium', 'tall', 'short', 'medium', 'short', 'tall']
        return patterns[index % patterns.length]
      }
    },
    onImageLoad(key) {
      this.loadedImages[key] = true
    },
    openLightbox(images, index) {
      this.currentImages = images
      this.currentImageIndex = index
      this.lightboxImageLoaded = false
      this.lightboxOpen = true
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', this.handleKeydown)
      
      // Preload adjacent images
      this.preloadAdjacentImages(index)
    },
    closeLightbox() {
      this.lightboxOpen = false
      document.body.style.overflow = ''
      document.removeEventListener('keydown', this.handleKeydown)
    },
    onLightboxImageLoad() {
      this.lightboxImageLoaded = true
    },
    goToImage(idx) {
      if (idx === this.currentImageIndex) return
      this.lightboxImageLoaded = false
      this.currentImageIndex = idx
      this.preloadAdjacentImages(idx)
    },
    nextImage() {
      if (this.currentImageIndex < this.currentImages.length - 1) {
        this.lightboxImageLoaded = false
        this.currentImageIndex++
        this.preloadAdjacentImages(this.currentImageIndex)
      }
    },
    prevImage() {
      if (this.currentImageIndex > 0) {
        this.lightboxImageLoaded = false
        this.currentImageIndex--
        this.preloadAdjacentImages(this.currentImageIndex)
      }
    },
    preloadAdjacentImages(currentIdx) {
      // Preload next and previous images
      const toPreload = [currentIdx - 1, currentIdx + 1]
      toPreload.forEach(idx => {
        if (idx >= 0 && idx < this.currentImages.length) {
          const img = new Image()
          img.src = this.currentImages[idx]
        }
      })
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
}

/* Hero Section */
.gallery-hero {
  width: 100%;
  min-height: 35vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 2rem 3rem;
}

.hero-content {
  text-align: center;
  max-width: 800px;
}

.gallery-title {
  font-family: 'Corinthia', cursive;
  font-size: clamp(3rem, 8vw, 5.5rem);
  font-weight: 400;
  color: var(--text-color);
  margin: 0 0 0.5rem 0;
  line-height: 1.1;
}

.gallery-subtitle {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.95rem, 2vw, 1.1rem);
  font-weight: 300;
  color: var(--text-color);
  opacity: 0.7;
  margin: 0;
  letter-spacing: 0.03em;
}

/* Section Styling */
.gallery-section {
  padding: 3rem 2rem;
  max-width: 1500px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.section-accent {
  width: 50px;
  height: 2px;
  background: #ca371c;
  margin: 0 auto 1.25rem;
}

.section-title {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(1.3rem, 2.5vw, 1.75rem);
  font-weight: 600;
  color: var(--text-color);
  margin: 0 0 0.75rem 0;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.section-description {
  font-family: 'Montserrat', sans-serif;
  font-size: clamp(0.85rem, 1.3vw, 0.95rem);
  font-weight: 300;
  color: var(--text-color);
  opacity: 0.65;
  margin: 0 auto;
  max-width: 500px;
}

/* Pinterest Grid - GPU accelerated */
.pinterest-grid {
  column-count: 4;
  column-gap: 1rem;
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
  margin-bottom: 1rem;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: rgba(128, 128, 128, 0.1);
  will-change: transform;
  transform: translateZ(0);
}

.grid-item:hover {
  transform: translateY(-4px) translateZ(0);
}

.image-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

/* Placeholder for loading */
.image-placeholder {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(128,128,128,0.15) 0%, rgba(128,128,128,0.05) 100%);
  z-index: 1;
}

.grid-item.loaded .image-placeholder {
  display: none;
}

.image-container img {
  width: 100%;
  height: auto;
  display: block;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.grid-item.loaded .image-container img {
  opacity: 1;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.grid-item:hover .image-overlay {
  opacity: 1;
}

.overlay-icon {
  color: white;
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 1;
}

/* Height variations */
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
  gap: 1.5rem;
  padding: 2rem;
  max-width: 500px;
  margin: 0 auto;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(202, 55, 28, 0.25);
}

.divider-logo {
  width: 40px;
  height: auto;
  opacity: 0.5;
}

/* Events Section accent */
.events-section .grid-item {
  border: 1px solid rgba(202, 55, 28, 0.12);
}

/* ========================================
   LIGHTBOX - Optimized for speed
   ======================================== */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: background 0.15s ease;
}

.lightbox-close:hover {
  background: #ca371c;
}

.lightbox-image-wrapper {
  max-width: 85vw;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  min-width: 200px;
  min-height: 200px;
}

.lightbox-loader {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.2);
  border-top-color: #ca371c;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  position: absolute;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.15s ease;
}

.lightbox-image.visible {
  opacity: 1;
}

.lightbox-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: 200;
  line-height: 1;
  z-index: 10;
  transition: background 0.15s ease;
}

.lightbox-nav:hover {
  background: #ca371c;
}

.lightbox-prev {
  left: 1.5rem;
}

.lightbox-next {
  right: 1.5rem;
}

.lightbox-counter {
  position: absolute;
  bottom: 6rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 0.05em;
}

.lightbox-thumbnails {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  max-width: 90vw;
  overflow-x: auto;
  padding: 0.5rem;
  scrollbar-width: none;
}

.lightbox-thumbnails::-webkit-scrollbar {
  display: none;
}

.lightbox-thumb {
  width: 55px;
  height: 55px;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  flex-shrink: 0;
  opacity: 0.4;
  padding: 0;
  background: none;
  transition: opacity 0.15s ease, border-color 0.15s ease;
}

.lightbox-thumb:hover {
  opacity: 0.7;
}

.lightbox-thumb.active {
  border-color: #ca371c;
  opacity: 1;
}

.lightbox-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* ========================================
   RESPONSIVE
   ======================================== */
@media (max-width: 1400px) {
  .pinterest-grid,
  .events-grid {
    column-count: 3;
  }
  
  .main-grid {
    column-count: 3;
  }
}

@media (max-width: 1024px) {
  .pinterest-grid,
  .events-grid,
  .main-grid {
    column-count: 2;
  }
  
  .gallery-section {
    padding: 2.5rem 1.5rem;
  }
}

@media (max-width: 768px) {
  .gallery-hero {
    min-height: 25vh;
    padding: 4rem 1.5rem 2.5rem;
  }
  
  .gallery-title {
    font-size: 2.75rem;
  }
  
  .pinterest-grid,
  .events-grid,
  .main-grid {
    column-count: 2;
    column-gap: 0.6rem;
  }
  
  .grid-item {
    margin-bottom: 0.6rem;
    border-radius: 10px;
  }
  
  .gallery-section {
    padding: 2rem 1rem;
  }
  
  .section-header {
    margin-bottom: 1.5rem;
  }
  
  .section-title {
    font-size: 1.15rem;
  }
  
  /* Lightbox mobile */
  .lightbox-close {
    top: 1rem;
    right: 1rem;
    width: 42px;
    height: 42px;
    font-size: 1.75rem;
  }
  
  .lightbox-nav {
    width: 44px;
    height: 44px;
    font-size: 2rem;
  }
  
  .lightbox-prev {
    left: 0.5rem;
  }
  
  .lightbox-next {
    right: 0.5rem;
  }
  
  .lightbox-image-wrapper {
    max-width: 95vw;
    max-height: 70vh;
  }
  
  .lightbox-image {
    max-height: 70vh;
  }
  
  .lightbox-counter {
    bottom: 5rem;
    font-size: 0.8rem;
  }
  
  .lightbox-thumbnails {
    bottom: 1rem;
    gap: 0.4rem;
  }
  
  .lightbox-thumb {
    width: 45px;
    height: 45px;
  }
}

@media (max-width: 480px) {
  .gallery-hero {
    padding: 3.5rem 1rem 2rem;
  }
  
  .gallery-title {
    font-size: 2.25rem;
  }
  
  .pinterest-grid,
  .events-grid,
  .main-grid {
    column-gap: 0.5rem;
  }
  
  .grid-item {
    margin-bottom: 0.5rem;
    border-radius: 8px;
  }
  
  .gallery-section {
    padding: 1.5rem 0.75rem;
  }
  
  .section-divider {
    padding: 1.5rem 0.75rem;
  }
  
  .divider-logo {
    width: 30px;
  }
  
  .lightbox-thumb {
    width: 40px;
    height: 40px;
  }
}

/* Disable hover effects on touch */
@media (hover: none) {
  .grid-item:hover {
    transform: none;
  }
  
  .image-overlay {
    display: none;
  }
}
</style>

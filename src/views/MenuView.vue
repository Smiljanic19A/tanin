<template>
  <div class="menu-view">
    <!-- Header -->
    <div class="menu-header">
      <h1 class="main-title">
        <transition name="slide-text" mode="out-in">
          <span :key="currentLanguage + 'menu.title'">{{ $t('menu.title') }}</span>
        </transition>
      </h1>
    </div>

    <!-- Full Screen Slider -->
    <div class="slider-container">
      <!-- Background Images -->
      <div class="background-slider">
        <div 
          v-for="(slide, index) in slides" 
          :key="index"
          class="background-slide"
          :class="{ 'active': currentSlide === index }"
        >
          <img :src="slide.background" :alt="slide.title" class="background-image">
          <div class="background-overlay"></div>
        </div>
      </div>

      <!-- Content Slider -->
      <div class="content-slider">
        <div 
          class="slides-wrapper" 
          :style="{ transform: `translateX(-${currentSlide * 33.333}%)` }"
        >
          <!-- Wine Card Slide -->
          <div class="slide">
            <div class="slide-content">
              <h2 class="slide-title">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'menu.wineCard'">{{ $t('menu.wineCard') }}</span>
                </transition>
              </h2>
              <p class="slide-description">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'menu.wineDescription'">{{ $t('menu.wineDescription') }}</span>
                </transition>
              </p>
              <button 
                class="view-button"
                @click="viewMenu('wine')"
                :class="{ 'downloading': downloadStates.wine }"
                :disabled="downloadStates.wine"
              >
                <span v-if="!downloadStates.wine" class="button-content">
                  <span class="button-text">
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'menu.viewButton'">{{ $t('menu.viewButton') }}</span>
                    </transition>
                  </span>
                  <span class="button-arrow">→</span>
                </span>
                <span v-else class="loading-content">
                  <span class="loading-spinner">⏳</span>
                  <span class="loading-text">
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'menu.downloading'">{{ $t('menu.downloading') }}</span>
                    </transition>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <!-- Dining Menu Slide -->
          <div class="slide">
            <div class="slide-content">
              <h2 class="slide-title">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'menu.diningMenu'">{{ $t('menu.diningMenu') }}</span>
                </transition>
              </h2>
              <p class="slide-description">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'menu.diningDescription'">{{ $t('menu.diningDescription') }}</span>
                </transition>
              </p>
              <button 
                class="view-button"
                @click="viewMenu('dining')"
                :class="{ 'downloading': downloadStates.dining }"
                :disabled="downloadStates.dining"
              >
                <span v-if="!downloadStates.dining" class="button-content">
                  <span class="button-text">
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'menu.viewButton'">{{ $t('menu.viewButton') }}</span>
                    </transition>
                  </span>
                  <span class="button-arrow">→</span>
                </span>
                <span v-else class="loading-content">
                  <span class="loading-spinner">⏳</span>
                  <span class="loading-text">
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'menu.downloading'">{{ $t('menu.downloading') }}</span>
                    </transition>
                  </span>
                </span>
              </button>
            </div>
          </div>

          <!-- Cocktail Card Slide -->
          <div class="slide">
            <div class="slide-content">
              <h2 class="slide-title">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'menu.cocktailCard'">{{ $t('menu.cocktailCard') }}</span>
                </transition>
              </h2>
              <p class="slide-description">
                <transition name="slide-text" mode="out-in">
                  <span :key="currentLanguage + 'menu.cocktailDescription'">{{ $t('menu.cocktailDescription') }}</span>
                </transition>
              </p>
              <button 
                class="view-button"
                @click="viewMenu('cocktail')"
                :class="{ 'downloading': downloadStates.cocktail }"
                :disabled="downloadStates.cocktail"
              >
                <span v-if="!downloadStates.cocktail" class="button-content">
                  <span class="button-text">
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'menu.viewButton'">{{ $t('menu.viewButton') }}</span>
                    </transition>
                  </span>
                  <span class="button-arrow">→</span>
                </span>
                <span v-else class="loading-content">
                  <span class="loading-spinner">⏳</span>
                  <span class="loading-text">
                    <transition name="slide-text" mode="out-in">
                      <span :key="currentLanguage + 'menu.downloading'">{{ $t('menu.downloading') }}</span>
                    </transition>
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation -->
      <div class="slider-navigation">
        <!-- Previous/Next Arrows -->
        <button 
          class="nav-arrow nav-arrow-left" 
          @click="previousSlide"
          :disabled="isTransitioning"
        >
          <span>‹</span>
        </button>
        
        <button 
          class="nav-arrow nav-arrow-right" 
          @click="nextSlide"
          :disabled="isTransitioning"
        >
          <span>›</span>
        </button>

        <!-- Dots Navigation -->
        <div class="slider-dots">
          <button 
            v-for="(slide, index) in slides"
            :key="index"
            class="dot"
            :class="{ 'active': currentSlide === index }"
            @click="goToSlide(index)"
            :disabled="isTransitioning"
          ></button>
        </div>
      </div>
    </div>

    <!-- Download feedback message -->
    <transition name="slide-up">
      <div v-if="downloadMessage" class="download-message" :class="downloadMessageType">
        {{ downloadMessage }}
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import translationMixin from '@/mixins/translationMixin'

export default {
  name: 'MenuView',
  mixins: [translationMixin],
  data() {
    return {
      currentSlide: 0,
      isTransitioning: false,
      autoSlideInterval: null,
      downloadStates: {
        wine: false,
        dining: false,
        cocktail: false
      },
      downloadMessage: '',
      downloadMessageType: 'success',
      slides: [
        {
          type: 'wine',
          background: '/banner_plate.png',
          filename: 'wine-card.pdf'
        },
        {
          type: 'dining',
          background: '/banner_white.svg',
          filename: 'dining-menu.pdf'
        },
        {
          type: 'cocktail',
          background: '/banner_plate.png',
          filename: 'cocktail-card.pdf'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['isDarkMode'])
  },
  mounted() {
    this.startAutoSlide();
  },
  beforeUnmount() {
    this.stopAutoSlide();
  },
  methods: {
    nextSlide() {
      if (this.isTransitioning) return;
      this.goToSlide((this.currentSlide + 1) % this.slides.length);
    },
    
    previousSlide() {
      if (this.isTransitioning) return;
      this.goToSlide(this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1);
    },
    
    goToSlide(index) {
      if (this.isTransitioning || index === this.currentSlide) return;
      
      this.isTransitioning = true;
      this.currentSlide = index;
      
      // Reset auto-slide timer
      this.resetAutoSlide();
      
      setTimeout(() => {
        this.isTransitioning = false;
      }, 600);
    },
    
    startAutoSlide() {
      this.autoSlideInterval = setInterval(() => {
        this.nextSlide();
      }, 5000); // Change slide every 5 seconds
    },
    
    stopAutoSlide() {
      if (this.autoSlideInterval) {
        clearInterval(this.autoSlideInterval);
        this.autoSlideInterval = null;
      }
    },
    
    resetAutoSlide() {
      this.stopAutoSlide();
      this.startAutoSlide();
    },
    
    async viewMenu(type) {
      const slide = this.slides.find(s => s.type === type);
      if (!slide) return;
      
      await this.handleDownload(type, slide.filename, type);
    },
    
    async handleDownload(type, filename, displayName) {
      this.downloadStates[type] = true;
      this.downloadMessage = '';
      
      try {
        await this.simulateDownload();
        
        // Create download link
        const link = document.createElement('a');
        link.href = `/menu-files/${filename}`;
        link.download = filename;
        link.style.display = 'none';
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showMessage(this.$t('menu.downloadSuccess'), 'success');
        
      } catch (error) {
        console.error('Download failed:', error);
        this.showMessage(this.$t('menu.downloadError'), 'error');
      } finally {
        this.downloadStates[type] = false;
      }
    },
    
    async simulateDownload() {
      return new Promise(resolve => setTimeout(resolve, 1500));
    },
    
    showMessage(message, type) {
      this.downloadMessage = message;
      this.downloadMessageType = type;
      
      setTimeout(() => {
        this.downloadMessage = '';
      }, 3000);
    }
  }
}
</script>

<style scoped>
.menu-view {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  position: relative;
  overflow: hidden;
}

.menu-header {
  position: absolute;
  top: 120px;
  left: 0;
  right: 0;
  z-index: 100;
  text-align: center;
}

.main-title {
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: 0.5em;
  color: white;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.7);
  margin: 0;
}

.slider-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.background-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.background-slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.8s ease-in-out;
}

.background-slide.active {
  opacity: 1;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  filter: blur(8px);
  transform: scale(1.1);
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4));
}

.content-slider {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 50;
  overflow: hidden;
}

.slides-wrapper {
  display: flex;
  width: 300%;
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide {
  width: 33.333%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.slide-content {
  text-align: center;
  max-width: 600px;
  padding: 2rem;
  color: white;
}

.slide-icon {
  font-size: 4rem;
  margin-bottom: 1.5rem;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.5));
}

.slide-title {
  font-size: 3.5rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.7);
  text-transform: uppercase;
}

.slide-description {
  font-size: 1.3rem;
  line-height: 1.6;
  margin-bottom: 3rem;
  opacity: 0.9;
  font-family: 'Montserrat', sans-serif;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  font-weight: 300;
}

.view-button {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.8);
  color: white;
  padding: 1.2rem 3rem;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border-radius: 0;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  min-width: 200px;
}

.view-button:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.view-button:disabled {
  cursor: not-allowed;
  opacity: 0.7;
}

.button-content,
.loading-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
}

.button-arrow {
  font-size: 1.2rem;
  transition: transform 0.3s ease;
}

.view-button:hover:not(:disabled) .button-arrow {
  transform: translateX(5px);
}

.loading-spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.slider-navigation {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 75;
  pointer-events: none;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.6);
  color: white;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  pointer-events: auto;
  z-index: 10;
}

.nav-arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.2);
  border-color: white;
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.nav-arrow-left {
  left: 3rem;
}

.nav-arrow-right {
  right: 3rem;
}

.slider-dots {
  position: absolute;
  bottom: 3rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  pointer-events: auto;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.6);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:hover:not(:disabled),
.dot.active {
  background: rgba(255, 255, 255, 0.9);
  border-color: white;
}

.dot:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.download-message {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  z-index: 200;
  backdrop-filter: blur(10px);
}

.download-message.success {
  background: rgba(76, 175, 80, 0.9);
  border: 1px solid rgba(76, 175, 80, 1);
  color: white;
}

.download-message.error {
  background: rgba(244, 67, 54, 0.9);
  border: 1px solid rgba(244, 67, 54, 1);
  color: white;
}

/* Animations */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-10px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-header {
    top: 100px;
  }
  
  .main-title {
    font-size: 2.5rem;
    letter-spacing: 0.3em;
  }
  
  .slide-content {
    padding: 1.5rem;
    max-width: 90%;
  }
  
  .slide-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .slide-title {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
  }
  
  .slide-description {
    font-size: 1.1rem;
    margin-bottom: 2rem;
  }
  
  .view-button {
    padding: 1rem 2rem;
    font-size: 1rem;
    min-width: 180px;
  }
  
  .nav-arrow {
    width: 50px;
    height: 50px;
    font-size: 20px;
  }
  
  .nav-arrow-left {
    left: 1.5rem;
  }
  
  .nav-arrow-right {
    right: 1.5rem;
  }
  
  .slider-dots {
    bottom: 2rem;
    gap: 0.8rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 480px) {
  .main-title {
    font-size: 2rem;
    letter-spacing: 0.2em;
  }
  
  .slide-title {
    font-size: 2rem;
    letter-spacing: 0.1em;
  }
  
  .slide-description {
    font-size: 1rem;
    line-height: 1.5;
  }
  
  .view-button {
    padding: 0.8rem 1.5rem;
    font-size: 0.9rem;
    min-width: 160px;
  }
  
  .nav-arrow {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }
  
  .nav-arrow-left {
    left: 1rem;
  }
  
  .nav-arrow-right {
    right: 1rem;
  }
}
</style> 
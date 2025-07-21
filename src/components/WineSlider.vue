<template>
  <div class="image-slider" @keydown="handleKeydown" tabindex="0">
    <div class="slider-container">
      <!-- Navigation Arrows -->
      <button class="nav-arrow nav-arrow-left" @click="prevSlide" :disabled="currentSlide === 0 || isTransitioning">
        <span>‹</span>
      </button>
      <button class="nav-arrow nav-arrow-right" @click="nextSlide" :disabled="isTransitioning">
        <span>›</span>
      </button>
      
      <!-- Full Screen Image Slides -->
      <div 
        class="slides-wrapper" 
        :style="{ transform: `translateX(-${currentSlide * (100 / slides.length)}%)` }"
        @touchstart="handleTouchStart"
        @touchmove="handleTouchMove"
        @touchend="handleTouchEnd"
      >
        <div class="slide" v-for="(slide, index) in slides" :key="index">
          <img :src="slide.image" :alt="slide.alt" class="slide-image" @click.stop>
        </div>
      </div>
      
      <!-- Navigation Dots -->
      <div class="slider-dots">
        <button 
          v-for="(slide, index) in slides" 
          :key="index"
          class="dot"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
          :disabled="isTransitioning"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WineSlider',
  data() {
    return {
      currentSlide: 0,
      idleTimer: null,
      touchStartX: 0,
      touchEndX: 0,
      isTransitioning: false,
      slides: [
        {
          image: '/banner_white.svg',
          alt: 'Wine Collection 1'
        },
        {
          image: '/banner_white.svg',
          alt: 'Wine Collection 2'
        },
        {
          image: '/banner_white.svg',
          alt: 'Wine Collection 3'
        }
      ]
    }
  },
  methods: {
    goToSlide(index) {
      if (this.isTransitioning || index < 0 || index >= this.slides.length) return
      
      this.isTransitioning = true
      this.currentSlide = index
      this.resetIdleTimer()
      
      // Reset transitioning flag after animation completes
      setTimeout(() => {
        this.isTransitioning = false
      }, 600) // Match CSS transition duration
    },
    nextSlide() {
      if (this.isTransitioning) return
      
      const nextIndex = this.currentSlide >= this.slides.length - 1 ? 0 : this.currentSlide + 1
      this.goToSlide(nextIndex)
    },
    prevSlide() {
      if (this.isTransitioning) return
      
      const prevIndex = this.currentSlide <= 0 ? this.slides.length - 1 : this.currentSlide - 1
      this.goToSlide(prevIndex)
    },
    resetIdleTimer() {
      // Clear existing timer
      if (this.idleTimer) {
        clearTimeout(this.idleTimer)
      }
      
      // Set new timer for 10 seconds
      this.idleTimer = setTimeout(() => {
        if (!this.isTransitioning) {
          this.nextSlide()
        }
      }, 10000)
    },
    handleKeydown(event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        this.prevSlide()
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        this.nextSlide()
      }
    },
    handleTouchStart(event) {
      if (this.isTransitioning) return
      this.touchStartX = event.changedTouches[0].screenX
    },
    handleTouchMove(event) {
      if (this.isTransitioning) return
      this.touchEndX = event.changedTouches[0].screenX
    },
    handleTouchEnd() {
      if (this.isTransitioning) return
      
      const swipeThreshold = 50
      const diff = this.touchStartX - this.touchEndX
      
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          // Swiped left, go to next slide
          this.nextSlide()
        } else {
          // Swiped right, go to previous slide
          this.prevSlide()
        }
      }
    }
  },
  mounted() {
    // Start the idle timer
    this.resetIdleTimer()
    
    // Focus the slider for keyboard navigation
    this.$el.focus()
  },
  beforeUnmount() {
    // Clean up timer
    if (this.idleTimer) {
      clearTimeout(this.idleTimer)
    }
  }
}
</script>

<style scoped>
.image-slider {
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  outline: none;
}

.slider-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.nav-arrow:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-50%) scale(1.1);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
  transform: translateY(-50%) scale(0.9);
}

.nav-arrow span {
  font-size: 24px;
  font-weight: bold;
  color: white;
  line-height: 1;
}

.nav-arrow-left {
  left: 2rem;
}

.nav-arrow-right {
  right: 2rem;
}

.slides-wrapper {
  display: flex;
  width: 300%; /* 3 slides = 300% */
  height: 100%;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide {
  width: 33.333%; /* Each slide takes 1/3 of the wrapper */
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0; /* Prevent slides from shrinking */
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  pointer-events: none; /* Prevent clicking on images */
  user-select: none; /* Prevent text selection */
}

.slider-dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 10;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.8);
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.dot:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.dot.active,
.dot:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.8);
}

/* Responsive Design */
@media (max-width: 768px) {
  .nav-arrow {
    width: 40px;
    height: 40px;
  }
  
  .nav-arrow span {
    font-size: 20px;
  }
  
  .nav-arrow-left {
    left: 1rem;
  }
  
  .nav-arrow-right {
    right: 1rem;
  }
  
  .slider-dots {
    bottom: 1.5rem;
  }
  
  .dot {
    width: 10px;
    height: 10px;
  }
}
</style> 
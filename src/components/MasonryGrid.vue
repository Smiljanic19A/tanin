<template>
  <div class="masonry-grid-container">
    <div class="masonry-columns" :style="{ columnCount: columnCount }">
      <div 
        v-for="(item, index) in imagePositions" 
        :key="`item-${index}`"
        class="masonry-item"
        :class="{ 'fading': item.fading }"
        @click="openGallery(index)"
      >
        <transition name="fade" mode="out-in">
          <img 
            :key="item.src"
            :src="item.src" 
            :alt="`Gallery image ${index + 1}`"
            class="masonry-image"
          >
        </transition>
      </div>
    </div>

    <!-- Gallery Popup -->
    <div v-if="galleryOpen" class="gallery-overlay" @click="closeGallery">
      <div class="gallery-container" @click.stop>
        <button class="gallery-close" @click="closeGallery">×</button>
        
        <button 
          class="gallery-nav gallery-prev" 
          @click="prevImage"
          v-if="currentGalleryIndex > 0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div class="gallery-image-wrapper">
          <img 
            :src="images[currentGalleryIndex]" 
            :alt="`Gallery image ${currentGalleryIndex + 1}`"
            class="gallery-image"
          >
        </div>
        
        <button 
          class="gallery-nav gallery-next" 
          @click="nextImage"
          v-if="currentGalleryIndex < images.length - 1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        <div class="gallery-counter">
          {{ currentGalleryIndex + 1 }} / {{ images.length }}
        </div>

        <div class="gallery-thumbnails">
          <div 
            v-for="(img, idx) in images"
            :key="`thumb-${idx}`"
            class="gallery-thumb"
            :class="{ 'active': idx === currentGalleryIndex }"
            @click="currentGalleryIndex = idx"
          >
            <img :src="img" :alt="`Thumbnail ${idx + 1}`">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MasonryGrid',
  props: {
    images: {
      type: Array,
      required: true,
      default: () => []
    },
    columns: {
      type: Number,
      default: null
    },
    autoSlide: {
      type: Boolean,
      default: true
    },
    slideInterval: {
      type: Number,
      default: 4000
    },
    displayCount: {
      type: Number,
      default: 3
    }
  },
  data() {
    return {
      imagePositions: [],
      imageQueue: [],
      slideTimer: null,
      galleryOpen: false,
      currentGalleryIndex: 0
    }
  },
  computed: {
    columnCount() {
      if (this.columns) return this.columns
      return 3
    }
  },
  methods: {
    initializeImages() {
      // Display only first displayCount images (default 3)
      this.imagePositions = this.images.slice(0, this.displayCount).map((src, index) => ({
        src,
        fading: false,
        index
      }))
      
      // Queue contains remaining images for rotation
      this.imageQueue = this.images.slice(this.displayCount)
    },
    rotateOneImage() {
      if (!this.autoSlide || this.imagePositions.length === 0 || this.images.length === 0) return
      
      // Pick a random position to change
      const randomPosition = Math.floor(Math.random() * this.imagePositions.length)
      
      // Get current image at this position
      const currentImage = this.imagePositions[randomPosition].src
      
      // Get next image from queue
      let nextImage = this.imageQueue[0]
      this.imageQueue.shift()
      
      // If next image is same as current or already displayed, get another
      let attempts = 0
      while ((nextImage === currentImage || this.imagePositions.some(pos => pos.src === nextImage)) && attempts < 20) {
        this.imageQueue.push(nextImage) // Put it back at end
        nextImage = this.imageQueue[0]
        this.imageQueue.shift()
        attempts++
      }
      
      // Add current image back to queue
      this.imageQueue.push(currentImage)
      
      // Update ONLY this one position
      this.imagePositions[randomPosition] = {
        src: nextImage,
        fading: true,
        index: randomPosition
      }
      
      // Remove fading class after transition
      setTimeout(() => {
        if (this.imagePositions[randomPosition]) {
          this.imagePositions[randomPosition].fading = false
        }
      }, 600)
    },
    startAutoSlide() {
      if (!this.autoSlide) return
      
      // Change one image every 5 seconds
      this.slideTimer = setInterval(() => {
        this.rotateOneImage()
      }, 5000)
    },
    stopAutoSlide() {
      if (this.slideTimer) {
        clearInterval(this.slideTimer)
        this.slideTimer = null
      }
    },
    openGallery(index) {
      // Find which original image this corresponds to
      const clickedSrc = this.imagePositions[index].src
      const originalIndex = this.images.findIndex(img => img === clickedSrc)
      this.currentGalleryIndex = originalIndex >= 0 ? originalIndex : 0
      this.galleryOpen = true
      document.body.style.overflow = 'hidden'
      
      // Add keyboard listener
      document.addEventListener('keydown', this.handleGalleryKeydown)
    },
    closeGallery() {
      this.galleryOpen = false
      document.body.style.overflow = ''
      
      // Remove keyboard listener
      document.removeEventListener('keydown', this.handleGalleryKeydown)
    },
    nextImage() {
      if (this.currentGalleryIndex < this.images.length - 1) {
        this.currentGalleryIndex++
      }
    },
    prevImage() {
      if (this.currentGalleryIndex > 0) {
        this.currentGalleryIndex--
      }
    },
    handleGalleryKeydown(event) {
      if (event.key === 'Escape') {
        this.closeGallery()
      } else if (event.key === 'ArrowRight') {
        this.nextImage()
      } else if (event.key === 'ArrowLeft') {
        this.prevImage()
      }
    }
  },
  mounted() {
    this.initializeImages()
    this.$nextTick(() => {
      this.startAutoSlide()
    })
  },
  beforeUnmount() {
    this.stopAutoSlide()
  }
}
</script>

<style scoped>
.masonry-grid-container {
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* CSS Columns Masonry Layout */
.masonry-columns {
  column-gap: 1.5rem;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1rem;
  min-height: 100%;
}

.masonry-item {
  position: relative;
  break-inside: avoid;
  margin-bottom: 1.5rem;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-color);
}

.masonry-item img {
  display: block;
}

.masonry-item:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(202, 55, 28, 0.3);
  z-index: 10;
}

.dark-mode .masonry-item:hover {
  box-shadow: 0 12px 30px rgba(202, 55, 28, 0.4);
}

.masonry-image {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-radius: 12px;
}

/* Smooth fade transitions for individual images */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.masonry-item.fading {
  z-index: 5;
}

/* Gallery Popup Styles */
.gallery-overlay {
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
  padding: 0;
  backdrop-filter: blur(10px);
}

.gallery-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-close {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  line-height: 1;
  backdrop-filter: blur(10px);
}

.gallery-close:hover {
  background: #ca371c;
  border-color: #ca371c;
  transform: scale(1.05);
}

.gallery-image-wrapper {
  max-width: 80vw;
  max-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery-image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  user-select: none;
}

.gallery-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 10;
  backdrop-filter: blur(10px);
}

.gallery-nav:hover {
  background: #ca371c;
  border-color: #ca371c;
  transform: translateY(-50%) scale(1.1);
}

.gallery-nav svg {
  width: 24px;
  height: 24px;
}

.gallery-prev {
  left: 2rem;
}

.gallery-next {
  right: 2rem;
}

.gallery-counter {
  position: absolute;
  bottom: 8rem;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gallery-thumbnails {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  max-width: 90vw;
  overflow-x: auto;
  padding: 0.5rem;
  scrollbar-width: none;
}

.gallery-thumbnails::-webkit-scrollbar {
  display: none;
}

.gallery-thumb {
  width: 60px;
  height: 60px;
  cursor: pointer;
  border-radius: 6px;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  flex-shrink: 0;
  opacity: 0.5;
}

.gallery-thumb:hover {
  opacity: 0.8;
  border-color: rgba(255, 255, 255, 0.5);
  transform: scale(1.05);
}

.gallery-thumb.active {
  border-color: #ca371c;
  opacity: 1;
  transform: scale(1.1);
}

.gallery-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .gallery-close {
    top: 1rem;
    right: 1rem;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
  }
  
  .gallery-nav {
    width: 44px;
    height: 44px;
  }
  
  .gallery-nav svg {
    width: 20px;
    height: 20px;
  }
  
  .gallery-prev {
    left: 1rem;
  }
  
  .gallery-next {
    right: 1rem;
  }
  
  .gallery-image-wrapper {
    max-width: 90vw;
  }
  
  .gallery-counter {
    bottom: 6rem;
    font-size: 0.85rem;
  }
  
  .gallery-thumbnails {
    bottom: 1rem;
    gap: 0.4rem;
  }
  
  .gallery-thumb {
    width: 50px;
    height: 50px;
  }
}

/* Tablet */
@media (max-width: 1200px) {
  .masonry-columns {
    column-count: 2 !important;
    column-gap: 1.25rem;
  }
  
  .masonry-item {
    margin-bottom: 1.25rem;
  }
}

/* Smaller Tablet - 2 columns */
@media (max-width: 768px) {
  .masonry-grid-container {
    padding: 2rem 1rem;
  }
  
  .masonry-columns {
    column-count: 2 !important;
    column-gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .masonry-item {
    margin-bottom: 1rem;
    border-radius: 10px;
  }
  
  .masonry-image {
    border-radius: 10px;
  }
  
  .masonry-overlay {
    border-radius: 10px;
  }
}

/* Mobile - 1 column */
@media (max-width: 480px) {
  .masonry-grid-container {
    padding: 1.5rem 0.5rem;
    min-height: auto;
    height: auto;
  }
  
  .masonry-columns {
    column-count: 1 !important;
    column-gap: 0;
    padding: 0;
    min-height: auto;
  }
  
  .masonry-item {
    margin-bottom: 1rem;
    border-radius: 8px;
    page-break-inside: avoid;
    break-inside: avoid;
    -webkit-column-break-inside: avoid;
  }
  
  .masonry-image {
    border-radius: 8px;
    width: 100%;
    height: auto;
    display: block;
  }
  
  .masonry-overlay {
    border-radius: 8px;
  }
  
  .view-icon {
    font-size: 2.5rem;
  }
}
</style>


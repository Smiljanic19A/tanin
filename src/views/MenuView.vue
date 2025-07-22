<template>
  <div class="menu-view">
    <!-- Mobile background (hidden on desktop) -->
    <div class="mobile-background" v-if="isMobile">
      <img src="/plate.svg" alt="Background" class="background-image">
      <div class="background-overlay"></div>
    </div>
    
    <div class="menu-layout">
      <!-- Left side - Plate Image (desktop only) -->
      <div class="plate-container">
        <img src="/plate.svg" alt="Food Plate" class="plate-image">
      </div>
      
      <!-- Right side - Menu Content -->
      <div class="menu-container">
        <h1 class="menu-title">MENU</h1>
        
        <div class="menu-buttons">
          <button class="menu-button" @click="openWineCard">
            <span class="button-text">Wine Card</span>
          </button>
          
          <button class="menu-button" @click="openDiningMenu">
            <span class="button-text">Dining Menu</span>
          </button>
          
          <button class="menu-button" @click="openCocktailCard">
            <span class="button-text">Cocktail Card</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'MenuView',
  computed: {
    ...mapGetters(['isDarkMode']),
    isMobile() {
      return window.innerWidth <= 768;
    }
  },
  methods: {
    openWineCard() {
      // TODO: Navigate to wine card
      console.log('Opening Wine Card')
    },
    openDiningMenu() {
      // TODO: Navigate to dining menu
      console.log('Opening Dining Menu')
    },
    openCocktailCard() {
      // TODO: Navigate to cocktail card
      console.log('Opening Cocktail Card')
    }
  }
}
</script>

<style scoped>
.menu-view {
  min-height: 100vh;
  background-color: var(--bg-color);
  color: var(--text-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.menu-layout {
  display: flex;
  align-items: flex-start;
  gap: 0;
  max-width: 100vw;
  width: 100%;
  height: 100vh;
}

.plate-container {
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.dark-mode .plate-container {
  background-color: transparent;
}

.plate-image {
  width: 50%;
  height: 100%;
  object-fit: contain;

}

.menu-container {
  flex: 1 ;
  text-align: left;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: var(--bg-color);
}

.menu-title {
  font-size: 5rem;
  font-weight: 300;
  margin-bottom: 3rem;
  letter-spacing: 0.3em;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.menu-button {
  background: none;
  border: 2px solid var(--text-color);
  color: var(--text-color);
  padding: 1.2rem 2.5rem;
  font-size: 1.2rem;
  font-weight: 300;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 250px;
  text-transform: uppercase;
}

.menu-button:hover {
  background-color: var(--text-color);
  color: var(--bg-color);
  transform: translateY(-2px);
}

.button-text {
  display: block;
  transition: all 0.3s ease;
}

.mobile-background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: none;
}

.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.background-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .mobile-background {
    display: block;
  }
  
  .menu-layout {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
    position: relative;
    z-index: 2;
  }
  
  .plate-container {
    display: none;
  }
  
  .menu-container {
    flex: none;
    width: 100%;
    height: 100vh;
    padding: 2rem 1rem;
    background-color: transparent;
    text-align: center;
    align-items: center;
  }
  
  .menu-title {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
    letter-spacing: 0.4em;
  }
  
  .menu-button {
    background: rgba(255, 255, 255, 0.1);
    border: 2px solid rgba(255, 255, 255, 0.8);
    color: white;
    font-size: 1.1rem;
    padding: 1rem 2rem;
    min-width: 220px;
    backdrop-filter: blur(4px);
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  }
  
  .menu-button:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border-color: white;
    transform: translateY(-2px);
  }
}

@media (max-width: 480px) {
  .menu-title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
    letter-spacing: 0.3em;
  }
  
  .menu-button {
    font-size: 1rem;
    padding: 1rem 1.5rem;
    min-width: 200px;
  }
  
  .menu-buttons {
    gap: 1.2rem;
  }
  
  .menu-container {
    padding: 2rem 0.5rem;
  }
}
</style> 
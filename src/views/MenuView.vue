<template>
  <div class="menu-view">
    <div class="menu-layout">
      <!-- Left side - Plate Image -->
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
    ...mapGetters(['isDarkMode'])
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

/* Responsive Design */
@media (max-width: 768px) {
  .menu-layout {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }
  
  .plate-container {
    flex: none;
    height: 50vh;
    width: 100%;
  }
  
  .menu-container {
    flex: none;
    width: 100%;
    height: auto;
    padding: 2rem 1rem;
  }
  
  .menu-title {
    font-size: 3.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .menu-button {
    font-size: 1.1rem;
    padding: 1rem 2rem;
    min-width: 220px;
  }
}

@media (max-width: 480px) {
  .plate-container {
    height: 40vh;
  }
  
  .menu-title {
    font-size: 2.8rem;
    margin-bottom: 1.5rem;
  }
  
  .menu-button {
    font-size: 1rem;
    padding: 1rem 1.5rem;
    min-width: 200px;
  }
  
  .menu-buttons {
    gap: 1.2rem;
  }
}
</style> 
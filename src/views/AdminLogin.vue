<template>
  <div class="admin-login-page" :class="{ 'dark-mode': isDarkMode }">
    <div class="login-container">
      <!-- Logo -->
      <div class="login-logo">
        <img :src="currentLogo" alt="Tanin Logo" class="logo-image">
      </div>

      <div class="login-card">
        <div class="login-header">
          <h1 class="login-title">Admin Panel</h1>
          <div class="title-accent"></div>
        </div>

        <form class="login-form" @submit.prevent="handleLogin">
          <!-- Error Message -->
          <transition name="fade-slide">
            <div v-if="errorMessage" class="error-message">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <span>{{ errorMessage }}</span>
            </div>
          </transition>

          <!-- Email Field -->
          <div class="form-field">
            <label class="field-label">
              <span class="label-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </span>
              <span>Email</span>
            </label>
            <input 
              v-model="email" 
              type="email" 
              class="styled-input"
              placeholder="admin@tanin.com"
              required
              autocomplete="email"
            />
          </div>

          <!-- Password Field -->
          <div class="form-field">
            <label class="field-label">
              <span class="label-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </span>
              <span>Password</span>
            </label>
            <div class="password-wrapper">
              <input 
                v-model="password" 
                :type="showPassword ? 'text' : 'password'" 
                class="styled-input"
                placeholder="••••••••"
                required
                autocomplete="current-password"
              />
              <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="submit-button" :disabled="isLoading">
            <span v-if="isLoading" class="loading-spinner"></span>
            <span v-else class="button-text">Sign In</span>
            <span v-if="!isLoading" class="button-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </button>
        </form>

        <!-- Back to Site -->
        <router-link to="/" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="19" y1="12" x2="5" y2="12"/>
            <polyline points="12 19 5 12 12 5"/>
          </svg>
          <span>Back to Website</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import api from '@/services/api'

export default {
  name: 'AdminLogin',
  data() {
    return {
      email: '',
      password: '',
      showPassword: false,
      isLoading: false,
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters(['isDarkMode']),
    currentLogo() {
      return this.isDarkMode ? '/logo_dark.png' : '/logo_light.png'
    }
  },
  methods: {
    ...mapActions(['loginAdmin']),
    async handleLogin() {
      this.errorMessage = ''
      this.isLoading = true

      try {
        const response = await api.login(this.email, this.password)
        
        if (response.data.success) {
          this.loginAdmin(this.email)
          this.$router.push('/admin/dashboard')
        } else {
          this.errorMessage = response.data.message || 'Invalid credentials'
        }
      } catch (error) {
        this.errorMessage = 'Unable to connect to server. Please try again.'
        console.error('Login error:', error)
      } finally {
        this.isLoading = false
      }
    }
  },
  mounted() {
    // Check if already authenticated
    if (this.$store.getters.isAdminAuthenticated) {
      this.$router.push('/admin/dashboard')
    }
  }
}
</script>

<style scoped>
.admin-login-page {
  min-height: 100vh;
  background-color: var(--bg-color);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.login-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.login-logo {
  margin-bottom: 1rem;
}

.logo-image {
  height: 80px;
  width: auto;
}

.login-card {
  width: 100%;
  background: var(--bg-color);
  border: 1px solid rgba(202, 55, 28, 0.15);
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.05);
}

.dark-mode .login-card {
  box-shadow: 0 4px 40px rgba(255, 255, 255, 0.02);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-size: 1.8rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  color: var(--text-color);
  margin: 0;
  text-transform: uppercase;
}

.title-accent {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #ca371c, transparent);
  margin: 1rem auto 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.error-message {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(202, 55, 28, 0.1);
  border: 1px solid rgba(202, 55, 28, 0.3);
  border-radius: 8px;
  color: #ca371c;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
}

.error-message svg {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.field-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  color: var(--text-color);
  opacity: 0.8;
}

.label-icon {
  width: 16px;
  height: 16px;
  opacity: 0.6;
}

.label-icon svg {
  width: 100%;
  height: 100%;
}

.styled-input {
  width: 100%;
  padding: 1rem 1.25rem;
  background: transparent;
  border: 1px solid rgba(202, 55, 28, 0.2);
  border-radius: 8px;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.95rem;
  color: var(--text-color);
  transition: all 0.3s ease;
}

.styled-input:hover,
.styled-input:focus {
  border-color: #ca371c;
  outline: none;
}

.styled-input::placeholder {
  color: var(--text-color);
  opacity: 0.4;
}

.password-wrapper {
  position: relative;
}

.password-wrapper .styled-input {
  padding-right: 3rem;
}

.toggle-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.25rem;
  color: var(--text-color);
  opacity: 0.5;
  transition: all 0.3s ease;
}

.toggle-password:hover {
  opacity: 1;
  color: #ca371c;
}

.toggle-password svg {
  width: 20px;
  height: 20px;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  width: 100%;
  padding: 1.25rem 2rem;
  margin-top: 0.5rem;
  background: #ca371c;
  border: none;
  border-radius: 8px;
  color: white;
  font-family: 'Montserrat', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.submit-button:hover:not(:disabled) {
  background: #a82e17;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(202, 55, 28, 0.3);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.button-icon {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.button-icon svg {
  width: 100%;
  height: 100%;
}

.submit-button:hover:not(:disabled) .button-icon {
  transform: translateX(4px);
}

.loading-spinner {
  width: 24px;
  height: 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
  color: var(--text-color);
  text-decoration: none;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.9rem;
  opacity: 0.6;
  transition: all 0.3s ease;
}

.back-link:hover {
  opacity: 1;
  color: #ca371c;
}

.back-link svg {
  width: 18px;
  height: 18px;
  transition: transform 0.3s ease;
}

.back-link:hover svg {
  transform: translateX(-4px);
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 480px) {
  .admin-login-page {
    padding: 1rem;
  }

  .login-card {
    padding: 1.5rem;
  }

  .login-title {
    font-size: 1.5rem;
  }

  .styled-input {
    padding: 0.875rem 1rem;
  }

  .submit-button {
    padding: 1rem 1.5rem;
  }
}
</style>


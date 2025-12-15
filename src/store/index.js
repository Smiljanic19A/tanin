import { createStore } from 'vuex'

export default createStore({
  state: {
    isDarkMode: false,
    currentLanguage: 'English',
    // Admin auth state
    isAdminAuthenticated: false,
    adminEmail: null
  },
  getters: {
    isDarkMode: state => state.isDarkMode,
    theme: state => state.isDarkMode ? 'dark' : 'light',
    currentLanguage: state => state.currentLanguage,
    isAdminAuthenticated: state => state.isAdminAuthenticated,
    adminEmail: state => state.adminEmail
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.isDarkMode = !state.isDarkMode
    },
    SET_THEME(state, isDark) {
      state.isDarkMode = isDark
    },
    SET_LANGUAGE(state, language) {
      state.currentLanguage = language
    },
    SET_ADMIN_AUTH(state, { isAuthenticated, email }) {
      state.isAdminAuthenticated = isAuthenticated
      state.adminEmail = email
    },
    LOGOUT_ADMIN(state) {
      state.isAdminAuthenticated = false
      state.adminEmail = null
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('TOGGLE_THEME')
    },
    setTheme({ commit }, isDark) {
      commit('SET_THEME', isDark)
    },
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
      localStorage.setItem('language', language)
    },
    loginAdmin({ commit }, email) {
      commit('SET_ADMIN_AUTH', { isAuthenticated: true, email })
      sessionStorage.setItem('adminAuth', JSON.stringify({ isAuthenticated: true, email }))
    },
    logoutAdmin({ commit }) {
      commit('LOGOUT_ADMIN')
      sessionStorage.removeItem('adminAuth')
    },
    checkAdminAuth({ commit }) {
      const authData = sessionStorage.getItem('adminAuth')
      if (authData) {
        try {
          const { isAuthenticated, email } = JSON.parse(authData)
          if (isAuthenticated) {
            commit('SET_ADMIN_AUTH', { isAuthenticated, email })
          }
        } catch (e) {
          sessionStorage.removeItem('adminAuth')
        }
      }
    }
  },
  modules: {
  }
})

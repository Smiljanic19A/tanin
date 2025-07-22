import { createStore } from 'vuex'

export default createStore({
  state: {
    isDarkMode: false,
    currentLanguage: 'English'
  },
  getters: {
    isDarkMode: state => state.isDarkMode,
    theme: state => state.isDarkMode ? 'dark' : 'light',
    currentLanguage: state => state.currentLanguage
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
    }
  },
  modules: {
  }
})

import { createStore } from 'vuex'

export default createStore({
  state: {
    isDarkMode: false
  },
  getters: {
    isDarkMode: state => state.isDarkMode,
    theme: state => state.isDarkMode ? 'dark' : 'light'
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.isDarkMode = !state.isDarkMode
    },
    SET_THEME(state, isDark) {
      state.isDarkMode = isDark
    }
  },
  actions: {
    toggleTheme({ commit }) {
      commit('TOGGLE_THEME')
    },
    setTheme({ commit }, isDark) {
      commit('SET_THEME', isDark)
    }
  },
  modules: {
  }
})

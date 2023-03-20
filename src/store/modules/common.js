export default {
  namespaced: true,
  state: {
    // 语言
    language: localStorage.getItem('lang') || 'cn'
  },
  mutations: {
    updateLanguage (state, lang) {
      localStorage.setItem('lang', lang)
      state.language = lang
    }
  }
}

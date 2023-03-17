export default {
  namespaced: true,
  state: {
    // process.env
    processEnv: {},
    // 语言
    language: localStorage.getItem('lang') || 'cn'
  },
  mutations: {
    updateProcessEnv (state, obj) {
      state.processEnv = obj
    },
    updateLanguage (state, lang) {
      localStorage.setItem('lang', lang)
      state.language = lang
    }
  }
}

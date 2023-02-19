export default {
  namespaced: true,
  state: {
    token: sessionStorage.getItem('token') || localStorage.getItem('token') || '',
    account: sessionStorage.getItem('account') || localStorage.getItem('account') || ''
  },
  mutations: {
    updateToken (state, token) {
      state.token = token
    },
    updateAccount (state, account) {
      state.account = account
    }
  }
}

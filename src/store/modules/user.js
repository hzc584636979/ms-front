export default {
  namespaced: true,
  state: {
    id: sessionStorage.getItem('userId') || localStorage.getItem('userId') || '',
    account: sessionStorage.getItem('account') || localStorage.getItem('account') || ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateAccount (state, account) {
      state.account = account
    }
  }
}

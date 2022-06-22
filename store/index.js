export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    return state.auth.user
  }
}

export const state = () => ({
	//url_server: 'http://localhost:4003',
	url_server: 'https://api-ampersound.onoci.net',
	isEn:false,
})

export const mutations = {
  setLang (state, n) {
    state.isEn = n
  }
}



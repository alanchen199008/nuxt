const state = {
  params: {
    matchType: 2,
    position: 0,
    sort: 1,
    type: 1,
    competitionIds: []
  }
}
const mutations = {
  SET_PARAMS: (state, payload) => {
    state.params = payload
  },
  SET_MATCH_TYPE: (state, payload) => {
    state.params.matchType = payload
  }
}

const actions = {
  SetParams({ commit }, payload) {
    commit('SET_PARAMS', payload)
  },
  SetMatchType({ commit }, payload) {
    commit('SET_MATCH_TYPE', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

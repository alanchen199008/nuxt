
const state = {
  mMatchType: 2,
  tab: 'instant',
  liveData: [],
  instantList: [],
  cannelMatch: {},
  recommends: []
}

const mutations = {
  SET_MATCH_MATCH_TYPE: (state, value) => {
    state.mMatchType = value
  },
  SET_MATCH_LIVE_DATA: (state, value) => {
    state.liveData = value
  },
  SET_MATCH_LIST_TAB: (state, value) => {
    state.tab = value
  },
  SET_MATCH_INSTANT_LIST: (state, value) => {
    state.instantList = value
  },
  SET_CANNEL_MATCH: (state, value) => {
    state.cannelMatch = value
  },
  SET_RECOMMENDS: (state, value) => {
    state.recommends = value
  }
}
const actions = {
  setMatchMatchType({ commit }, value) {
    commit('SET_MATCH_MATCH_TYPE', value)
  },
  setLiveData({ commit }, value) {
    commit('SET_MATCH_LIVE_DATA', value)
  },
  setMatchListTab({ commit }, value) {
    commit('SET_MATCH_LIST_TAB', value)
  },
  setInstantList({ commit }, value) {
    commit('SET_MATCH_INSTANT_LIST', value)
  },
  setCancelMatch({ commit }, value) {
    commit('SET_CANNEL_MATCH', value)
  },
  setRecommends({ commit }, value) {
    commit('SET_RECOMMENDS', value)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

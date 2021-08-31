
const state = {
  matchFilterIds: [],
  forecastFilterIds: []
}

const mutations = {
  SET_MATCH_FILTER_IDS: (state, value) => {
    state.matchFilterIds = value
  },

  SET_FORECAST_FILTER_IDS: (state, value) => {
    state.forecastFilterIds = value
  }
}

const actions = {
  setMatchFilterIds({ dispatch, commit }, value) {
    commit('SET_MATCH_FILTER_IDS', value)
    dispatch(
      'db/set', {
        path: 'match.filter',
        value
      },
      { root: true }
    )
  },
  async loadMatch({ state, dispatch }) {
    state.matchFilterIds = await dispatch(
      'db/get', {
        path: 'match.filter',
        defaultValue: []
      }, {
        root: true
      }
    )
  },
  setForecastFilterIds({ dispatch, commit }, value) {
    commit('SET_FORECAST_FILTER_IDS', value)
    dispatch(
      'db/set', {
        path: 'forecast.filter',
        value
      },
      {
        root: true
      }
    )
  },
  async loadForecast({ state, dispatch }) {
    state.forecastFilterIds = await dispatch(
      'db/get', {
        path: 'forecast.filter',
        defaultValue: []
      }, {
        root: true
      }
    )
  }
}

const getters = {
  matchFilterIds: state => state.matchFilterIds,
  forecastFilterIds: state => state.forecastFilterIds
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

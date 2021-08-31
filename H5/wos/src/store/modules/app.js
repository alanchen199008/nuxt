
import Cookies from 'js-cookie'
// import { getLanguage } from '@/lang/index'

const state = {
  mode: 0, // 0 h5 1 Android 2 ios
  language: 'zh_CN' // getLanguage()
}

const mutations = {
  SET_LANGUAGE: (state, language) => {
    state.language = language
    Cookies.set('language', language)
  },
  SET_MODE: (state, payload) => {
    state.mode = payload
  }
}
const actions = {
  setMode({ commit }, payload) {
    commit('SET_MODE', payload)
  },
  setLanguage({ commit }, language) {
    commit('SET_LANGUAGE', language)
  },
  async load({ dispatch }) {
    await dispatch('database/loadMatch', [], { root: true })
  }

}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

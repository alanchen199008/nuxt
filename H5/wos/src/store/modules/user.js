import { login, register, logout, getAppMember, updateBaseInfo, getNewMessage, getMemberDetail } from 'api/user'
import { getFocusMatchListForFootball, getMatchRingtoneWithFootball } from '@/api/match'
import { getToken, setToken, removeToken, clearSession } from '@/utils/auth'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    info: {},
    prompt: {
      mainSwitch: 1, // 总开关(0-关, 1-开)
      focusNoticeFlag: 0, // 仅提示已关注赛事(0-关, 1-开)
      scoringSoundFlag: 0, // 进球提示声音开关(0-关, 1-开)
      homeGoalSound: 0, // 主队进球声：0-默认 1-哨子 2-鼓声 3-广播 4-号角 5-胜利
      guestGoalSound: 0, // 客队进球声：0-默认 1-哨子 2-鼓声 3-广播 4-号角 5-胜利
      scoringShockFlag: 0 // 进球震动开关(0-关, 1-开)
    }
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
      setToken(token)
    },
    SET_INFO: (state, info) => {
      state.info = {
        ...state.info,
        ...info
      }
    },
    SET_PROMPT: (state, payload) => {
      state.prompt = payload
    }
  },
  actions: {
    // user login
    login({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        login({ ...data }).then(([data, err]) => {
          if (!err) {
            const { token } = data
            commit('SET_TOKEN', token)
            dispatch('getUserInfo')
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // user register
    register({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        register({ ...data }).then(([data, err]) => {
          if (!err) {
            const { token } = data
            commit('SET_TOKEN', token)
            dispatch('getUserInfo')
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },
    // user logout
    logout({ dispatch }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          dispatch('reset')
          router.push({ name: 'Home' })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    reset({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_INFO', {})
        removeToken()
        clearSession()
        resolve()
      })
    },
    async getUserInfo({ commit }) {
      const [base] = await getAppMember()
      const [info] = await getMemberDetail()
      const [msg] = await getNewMessage()
      const [items] = await getFocusMatchListForFootball({ matchType: 1 })
      const [prompt] = await getMatchRingtoneWithFootball()
      let focusMatches = []
      items.length > 0 ? items.map(item => { return item.items.map(match => { return focusMatches.push(match.matchId) }) }) : ''
      commit('SET_PROMPT', prompt)
      commit('SET_INFO', { ...base, ...info, newMsg: msg.count, focusMatches: focusMatches || [] })
      window.__GLOBAL.LoginControlDialog.close()
    },
    updateInfo({ commit }, preload) {
      commit('SET_INFO', preload)
    },
    updateUserInfo({ commit }, preload) {
      return new Promise((resolve, reject) => {
        updateBaseInfo({ ...preload }).then(([_, err]) => {
          if (err) {
            reject('更新失败')
          }
          commit('SET_INFO', preload)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    setPrompt({ commit }, payload) {
      commit('SET_PROMPT', payload)
    }
  }
}

import router from '@/router'
import store from '@/store'
import { getToken } from '@/utils/auth'

router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    const hasGetUserInfo = store.getters.info && store.getters.info.memberId
    if (hasGetUserInfo) {
      next()
    } else {
      store.dispatch('user/getUserInfo')
        .then(() => {
          next()
        }).catch(() => {
          store.dispatch('user/logout')
          next(false)
        })
    }
  } else {
    if (to.meta.requiresAuth) {
      window.__GLOBAL.LoginControlDialog.open()
      next(false)
    } else {
      next()
    }
  }
})

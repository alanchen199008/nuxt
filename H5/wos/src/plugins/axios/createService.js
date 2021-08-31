import axios, { isCancel } from 'axios'
import { getToken } from '@/utils/auth'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
import tenants from '@/base/tenants.json'

let TenantCode = window.localStorage.getItem('tenant-code')

if (!TenantCode) {
  const domain = window.location.hostname
  const tenant = tenants.data
  tenant.forEach(item => {
    if (domain === item.domain) {
      TenantCode = item.code
      window.localStorage.setItem('tenant-code', item.code)
      return item
    }
  })
}

// 创建一个错误
function errorCreate(e) {
  let err
  if (typeof e === 'string') {
    err = errorCreate(new Error(e))
  } else {
    err = {
      name: e.name,
      message: e.message,
      stack: e.stack,
      isCancel: isCancel(e)
    }
  }
  return err
}

export default function createService(url) {
  const option = {
    baseURL: url || process.env.VUE_APP_API,
    timeout: 5000, // 请求超时时间，
    headers: {
      'X-TENANT-CODE': TenantCode,
      'X-CHANNEL': 'H5',
      'X-DEVICE-ID': 'iOS|iPhone|Safari|605.115',
      'X-APP-VERSION': '1'
    }
  }

  // 创建一个 axios 实例
  const service = axios.create(option)
  // 请求拦截器
  service.interceptors.request.use(
    config => {
      // 在请求发送之前做一些处理
      config.headers['Lang'] = store.getters.language.replace('-', '_')

      const token = getToken()

      if (window.returnCitySN) {
        config.headers['X-CLIENT-IP'] = window.returnCitySN.cip
      }

      if (token) {
        config.headers['X-AUTH-TOKEN'] = token
      }

      if (config.inserHeaders) {
        config.headers = { ...config.headers, ...config.inserHeaders }
      }

      return config
    },
    error => {
      return Promise.reject(error)
    }
  )

  // 响应拦截器
  service.interceptors.response.use(
    response => {
      const res = response.data
      if (res.code !== '200' && res.code !== '23005' && res.code !== 200) {
        if (res.code === '401') {
          store.dispatch('user/reset').then(() => {
            router.replace({ name: 'Home' })
            window.__GLOBAL.LoginControlDialog.open()
          })
        } else {
          Toast(res.msg || res.message || res.error)
        }
        return [res.data, errorCreate(res.msg || res.message), response]
      } else {
        return Promise.resolve([res.items || res.data, null, response])
      }
    },
    error => {
      if (error && error.response) {
        switch (error.response.status) {
          case 400:
            error.message = '请求错误'
            break
          case 401:
            error.message = '未授权，请登录'
            break
          case 403:
            error.message = '拒绝访问'
            break
          case 404:
            error.message = `请求地址出错: ${error.response.config.url}`
            break
          case 408:
            error.message = '请求超时'
            break
          case 500:
            error.message = '服务器内部错误'
            break
          case 501:
            error.message = '服务未实现'
            break
          case 502:
            error.message = '网关错误'
            break
          case 503:
            error.message = '服务不可用'
            break
          case 504:
            error.message = '网关超时'
            break
          case 505:
            error.message = 'HTTP版本不受支持'
            break
          case 1048:
            error.message = '暂停服务，请稍后再试！'
            break
          case 1049:
            error.message = '该接口暂停服务，请稍后再试'
            break
          default:
            break
        }
      }
      return Promise.resolve([null, errorCreate(error), error.response])
    }
  )

  return service
}

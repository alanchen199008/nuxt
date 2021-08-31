import tenants from './tenants.json'

export default {
  install(Vue) {
    const domain = window.location.hostname
    const tenant = tenants.data
    tenant.forEach(item => {
      if (domain === item.domain) {
        window.localStorage.setItem('tenant-code', item.code)
        return item
      }
    })
  }
}

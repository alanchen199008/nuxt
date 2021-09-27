import 'default-passive-events'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setCode from './base/setCode'
import '@vant/touch-emulator'
import Vant from './plugins/Vant'
import GlobalComponents from './globalComponents'

import i18n from './lang'
import './icons'
import './permission'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/markArea'
import 'echarts/lib/component/legend'
import '@/utils/dateformat'
import '@/styles/index.scss'
import pinyin from 'js-pinyin'

import * as filters from './filters'
import './directive/loopPress'

Vue.use(setCode)
Vue.use(Vant)
Vue.use(GlobalComponents)
Vue.prototype.pinyin = pinyin
// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  created() {
    store.dispatch('app/load')
  },
  render: h => h(App)
}).$mount('#app')

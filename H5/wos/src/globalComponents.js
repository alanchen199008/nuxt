import Avatar from './components/Avatar'
import Loader from './components/loader/loader'
import SildeLeftView from './components/silde-left-view'
import DEmpty from './components/Empty'
import ECharts from 'vue-echarts'
import ImgIcon from './components/ImgIcon'
import WosSelect from './components/Select'

const GlobalComponents = {
  install(Vue) {
    Vue.component(Avatar.name, Avatar)
    Vue.component(Loader.name, Loader)
    Vue.component(SildeLeftView.name, SildeLeftView)
    Vue.component(DEmpty.name, DEmpty)
    Vue.component('v-chart', ECharts)
    Vue.component('img-icon', ImgIcon)
    Vue.component('wos-select', WosSelect)
  }
}

export default GlobalComponents

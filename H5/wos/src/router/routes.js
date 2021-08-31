import Layout from '@/layout'
// import DTabbar from '@/components/Tabbar'
import DrynamicHomeRouter from './modules/home'
import DrynamicNewsRouter from './modules/news'
import DrynamicUserRouter from './modules/user'
import DrynamicMatchRouter from './modules/match'
import DrynamicForecastRouter from './modules/forecast'
import DrynamicExpertRouter from './modules/expert'
import DrynamicAccountRouter from './modules/account'
import DrynamicActivityRouter from './modules/activity'
import DrynamicOpenRouter from './modules/open'

const routers = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      ...DrynamicHomeRouter,
      ...DrynamicNewsRouter,
      ...DrynamicUserRouter,
      ...DrynamicMatchRouter,
      ...DrynamicForecastRouter,
      ...DrynamicExpertRouter,
      ...DrynamicAccountRouter,
      ...DrynamicActivityRouter,
      ...DrynamicOpenRouter
    ]
  },
  {
    path: '*',
    redirect: () => `/home`
  }
]

export default routers

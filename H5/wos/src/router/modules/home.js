import DTabbar from '@/components/Tabbar'
export default [
  {
    path: 'home',
    name: 'Home',
    components: { default: () => import('@/views/index'), tabbar: DTabbar },
    children: [
      {
        path: 'expert/:id',
        name: 'HomeExpert',
        component: () => import('views/expert/Detail/expert')
      },
      {
        path: 'recommend/:id',
        name: 'HomeRecommend',
        component: () => import('views/expert/Detail/recommend')
      },
      {
        path: 'news/:id',
        name: 'HomeNewsInfo',
        component: () => import('views/news/info')
      },
      {
        path: 'match/:id',
        name: 'HomeMatch',
        component: () => import('views/match/MatchMessage')
      },
      { path: 'EuroCC-library',
        name: 'EuroCCLibrary',
        component: () => import('views/open/EFA/library') }
    ]
  }
]

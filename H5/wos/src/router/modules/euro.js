import EuroTab from '@/euro/components/EuroTab'
export default [
  {
    path: 'euro',
    components: {
      default: () => import('@/views/topic/Euro/index'),
      tabbar: EuroTab
    },
    children: [
      {
        path: 'home',
        name: 'Euro',
        component: () => import('@/euro/views/home/index'),
        meta: { title: '欧洲杯' }
      },
      {
        path: 'new',
        name: 'EuroNews',
        component: () => import('@/euro/views/news/index'),
        meta: { title: '资讯' }
      },
      {
        path: 'library',
        name: 'EuroLibrary',
        component: () => import('@/euro/views/library/index')
      },
      {
        path: 'guide',
        name: 'EuroGuide',
        component: () => import('@/euro/views/guide/index')
      }
    ]
  }
]

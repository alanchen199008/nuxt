import DTabbar from '@/components/Tabbar'
export default [
  {
    path: 'expert',
    name: 'Expert',
    components: {
      default: () => import('views/expert'),
      tabbar: DTabbar
    },
    children: [
      {
        path: ':id',
        name: 'ExpertDetail',
        component: () => import('views/expert/Detail/expert'),
        children: [
          {
            path: ':pid',
            name: 'ExpertRecommendDetail',
            component: () => import('views/expert/Detail/recommend')
          }
        ]
      },
      {
        path: ':id',
        name: 'RecommendDetail',
        component: () => import('views/expert/Detail/recommend'),
        children: [
          {
            path: ':pid',
            name: 'RecommendExpertDetail',
            component: () => import('views/expert/Detail/expert')
          }
        ]
      },
      {
        path: 'filter',
        name: 'RecommendFiter',
        component: () => import('views/expert/Recommend/Filter')
      },
      {
        path: 'release/:step/:from',
        name: 'ExpertRelease',
        component: () => import('views/expert/Release')
      }
    ]
  }
]

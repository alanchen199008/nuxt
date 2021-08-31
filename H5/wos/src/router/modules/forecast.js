import DTabbar from '@/components/Tabbar'
export default [
  {
    path: 'forecast',
    name: 'Forecast',
    components: {
      default: () => import('@/views/forecast'),
      tabbar: DTabbar
    },
    meta: { title: '预测' },
    children: [
      {
        path: ':id',
        name: 'ForecastMessage',
        component: () => import('views/match/MatchMessage')
      },
      {
        path: 'filter',
        name: 'ForecastFilter',
        component: () => import('@/views/forecast/children/filter')
      }
    ]
  }
]

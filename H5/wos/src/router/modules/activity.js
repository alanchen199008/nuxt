export default [
  {
    path: ':id',
    name: 'Activity',
    component: () => import(/* webpackChunkName: "article" */ 'views/Activity'),
    meta: {
      title: '活动'
    }
  }
]

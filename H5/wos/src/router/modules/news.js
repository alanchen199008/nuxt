export default [
  {
    path: 'news',
    name: 'News',
    component: () => import('views/news'),
    meta: { title: '热门资讯' }
  },
  {
    path: 'news/:id',
    name: 'NewsDetail',
    component: () => import('views/news/info')
  }
]

export default [
  {
    path: 'open/FIFA',
    name: 'FIFA',
    component: () => import('views/open/FIFA')
  },
  {
    path: 'open/ECC',
    name: 'ECC',
    component: () => import('views/open/ECC')
  },
  {
    path: 'open/EFA',
    name: 'EFA',
    component: () => import('views/open/EFA')
  },
  {
    path: 'open/LM',
    name: 'LM',
    component: () => import('views/open/LM')
  }
]

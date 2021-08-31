import DTabbar from '@/components/Tabbar'
export default [
  {
    path: 'account',
    name: 'Account',
    components: {
      default: () => import('views/Account'),
      tabbar: DTabbar
    },
    meta: { requiresAuth: true },
    children: [
      {
        path: 'info',
        name: 'AccountInfo',
        component: () => import('views/Account/AccountInfo'),
        meta: { requiresAuth: true },
        children: [
          {
            path: 'password',
            name: 'AccountPassword',
            component: () => import('views/Account/AccountInfo/children/AccountPassword'),
            meta: { requiresAuth: true }
          },
          {
            path: 'profile',
            name: 'AccountProfile',
            component: () => import('views/Account/AccountInfo/children/AccountProfile'),
            meta: { requiresAuth: true }
          },
          {
            path: 'mobile',
            name: 'AccountMobile',
            component: () => import('views/Account/AccountInfo/children/AccountMobile'),
            meta: { requiresAuth: true }
          }
        ]
      },
      {
        path: 'fans',
        name: 'AccountFans',
        component: () => import('views/Account/AccountFans'),
        meta: { requiresAuth: true }
      },
      {
        path: 'message',
        name: 'AccountMessage',
        component: () => import('views/Account/AccountMessage'),
        meta: { requiresAuth: true }
      },
      {
        path: 'notice-detail/:id',
        name: 'AccountNoticeDetail',
        component: () => import('views/Account/notice-detail'),
        meta: { requiresAuth: true }
      },
      {
        path: 'message-detail/:id',
        name: 'AccountMessageDetail',
        component: () => import('views/Account/message-detail'),
        meta: { requiresAuth: true }
      },
      {
        path: 'recommend',
        name: 'AccountRecommend',
        component: () => import('views/Account/AccountRecommend'),
        meta: { requiresAuth: true }
      },
      {
        path: 'recharge',
        name: 'AccountRecharge',
        component: () => import('views/Account/AccountRecharge'),
        meta: { requiresAuth: true }
      },
      {
        path: 'coin',
        name: 'AccountCoin',
        component: () => import('views/Account/AccountCoin'),
        meta: { requiresAuth: true }
      },
      {
        path: 'about',
        name: 'AccountAbout',
        component: () => import('views/Account/AccountAbout'),
        meta: { requiresAuth: false }
      },
      {
        path: 'feedback',
        name: 'AccountFeedback',
        component: () => import('views/Account/AccountFeedback')
      }
    ]
  }
]

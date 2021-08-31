
export default [
  {
    path: 'PrivacyPolicy',
    name: 'PrivacyPolicy',
    component: () => import('@/views/PrivacyPolicy')
  },
  {
    path: 'UserAgreement',
    name: 'UserAgreement',
    component: () => import('@/views/UserAgreement')
  },

  {
    path: 'RechargeAgreement',
    name: 'RechargeAgreement',
    component: () => import('@/views/RechargeAgreement')
  },
  {
    path: 'user/forget',
    name: 'Forget',
    component: () => import('@/views/user/Forget')
  },
  {
    path: 'user/invite',
    name: 'Invite',
    component: () => import('@/views/user/invite')
  }
]

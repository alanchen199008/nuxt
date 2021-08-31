import DTabbar from '@/components/Tabbar'
export default [
  {
    path: 'match',
    name: 'Match',
    components: {
      default: () => import('views/match'),
      tabbar: DTabbar
    },
    children: [
      {
        path: ':id',
        name: 'MatchMessage',
        component: () => import('views/match/MatchMessage'),
        children: [
          {
            path: 'change/:type',
            name: 'MatchChangeMessage',
            component: () => import('views/match/MatchMessage/children/change')
          },
          {
            path: 'schedule/:teamId',
            name: 'MatchScheduleMessage',
            component: () => import('views/match/MatchMessage/children/schedule')
          },
          {
            path: 'season/:teamId/:competitionId',
            name: 'MatchSeasonMessage',
            component: () => import('views/match/MatchMessage/children/season'),
            children: [
              {
                path: 'rank/:seasonId',
                name: 'MatchRankMessage',
                component: () => import('views/match/MatchMessage/children/rank')
              }
            ]
          },
          {
            path: ':id',
            name: 'MatchRecommendDetail',
            component: () => import('views/expert/Detail/recommend')
          }
        ]
      },
      {
        path: 'ringtone',
        name: 'MatchRingtone',
        component: () => import('views/match/MatchRingtone'),
        meta: { requiresAuth: false },
        children: [
          {
            path: 'sort',
            name: 'MatchRingtoneSort',
            component: () => import('views/match/MatchRingtone/children/RingtoneSort')
          },
          {
            path: 'home-sound',
            name: 'MatchRingtoneHomeSound',
            component: () => import('views/match/MatchRingtone/children/RingtoneHomeSound')
          },
          {
            path: 'away-sound',
            name: 'MatchRingtoneAwaySound',
            component: () => import('views/match/MatchRingtone/children/RingtoneAwaySound')
          }
        ]
      },
      {
        path: 'filter',
        name: 'MatchFilter',
        component: () => import('views/match/MatchFilter')
      }
    ]
  }
]

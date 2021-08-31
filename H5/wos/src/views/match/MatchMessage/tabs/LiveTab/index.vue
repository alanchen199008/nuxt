<template>
  <div class="live-container">
    <template>
      <trend-chart :data="trendData" />
      <stats-chart :data="statsData" />
      <div class="match-message-tabs">
        <van-tabs v-model="currentTabValue" type="card">
          <van-tab
            v-for="tab in tabs"
            :key="tab.name"
            :title="tab.title"
            :name="tab.name"
            :disabled="tab.name === 'liveList'"
          />
        </van-tabs>
      </div>
      <component :is="currentTabValue" :data="matchData[currentTabValue]" />
    </template>
  </div>
</template>
<script>
import { LiveProgress, tlive, eventList, TrendChart, StatsChart } from './components'
import { getMatchLiveMessage } from '@/api/match'
import { mapGetters } from 'vuex'
export default {
  name: 'LiveTab',
  components: { LiveProgress, tlive, eventList, TrendChart, StatsChart },
  props: {
    homeName: {
      type: String,
      default: ''
    },
    awayName: {
      type: String,
      default: ''
    },
    homeLogo: {
      type: String,
      default: ''
    },
    awayLogo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      currentTabValue: 'tlive',
      matchId: null,
      matchData: {},
      tabs: [
        { name: 'tlive', title: '文字直播' },
        { name: 'eventList', title: '重要事件' }
      ],
      statsData: {
        homeTeamName: '',
        awayTeamName: '',
        stats: []
      },
      trendData: {
        homeTeamLogo: '',
        awayTeamLogo: '',
        homeEvents: [],
        awayEvents: [],
        trend: []
      }
    }
  },
  computed: {
    ...mapGetters(['liveData'])
  },
  watch: {
    liveData(items) {
      if (items) {
        const data = items
        data.map(item => {
          if (item.matchId === this.$route.params.id) {
            this.matchData = item
          }
          return item
        })
      }
    },
    matchData() {
      if (this.matchData.eventList) {
        this.matchData.eventList = this.matchData.eventList.filter(item => { return item.type !== 28 })
        this.matchData.eventList = this.foramtEvents(this.matchData.eventList)
        this.matchData.eventList.map(item => {
          if (item.position === 1) {
            let obj = {
              type: item.type,
              time: item.time
            }
            this.trendData.homeEvents.push(obj)
          }
          if (item.position === 2) {
            let obj = {
              type: item.type,
              time: item.time
            }
            this.trendData.awayEvents.push(obj)
          }
          return item
        })
      }
      if (this.matchData.statList) {
        this.statsData.stats = this.matchData.statList
      }
      this.trendData.trend = this.matchData.trend.length > 0 ? [...this.matchData.trend[0], ...this.matchData.trend[1]] : []
      let trend = this.trendData.trend.length
      if (trend > 0 && trend < 90) {
        let e = 90 - trend
        let empty = []
        for (let i = 0; i <= e; i++) {
          empty[i] = ''
        }
        this.trendData.trend = [...this.trendData.trend, ...empty]
      }
    }
  },
  created() {
    const { id } = this.$route.params
    this.matchId = id
    this.statsData.homeTeamName = this.homeName
    this.statsData.awayTeamName = this.awayName
    this.trendData.homeTeamLogo = this.homeLogo
    this.trendData.awayTeamLogo = this.awayLogo
    this.fetchMatchLiveMessage()
  },
  methods: {
    fetchMatchLiveMessage() {
      getMatchLiveMessage(this.$route.params.id)
        .then(([data, err]) => {
          if (!err) {
            if (data) {
              this.matchData = data
              this.matchData.eventList = this.foramtEvents(this.matchData.eventList)
            }
          }
        })
    },
    foramtEvents(data) {
      if (!data) {
        return
      }
      let scores = data.filter(item => item.type === 1)

      data.map(item => {
        if (item.type === 11) {
          let halfScore = scores.filter(s => s.time <= item.time)
          item.homeScore = halfScore.length > 0 ? halfScore[halfScore.length - 1].homeScore : 0
          item.awayScore = halfScore.length > 0 ? halfScore[halfScore.length - 1].awayScore : 0
        }
        if (item.type === 12) {
          let fullScore = scores.filter(s => s.time <= item.time)
          item.homeScore = fullScore.length > 0 ? fullScore[fullScore.length - 1].homeScore : 0
          item.awayScore = fullScore.length > 0 ? fullScore[fullScore.length - 1].awayScore : 0
        }
        if (item.type === 19) {
          let injuriesScore = scores.filter(s => s.time <= item.time)
          item.homeScore = injuriesScore.length > 0 ? injuriesScore[injuriesScore.length - 1].homeScore : 0
          item.awayScore = injuriesScore.length > 0 ? injuriesScore[injuriesScore.length - 1].awayScore : 0
        }
        if (item.type === 26) {
          // let allScore = scores.filter(s => s.time <= item.time)
          // item.homeScore = allScore ? allScore[allScore.length - 1].homeScore || 0 : scores[scores.length - 1].homeScore || 0
          // item.awayScore = allScore ? allScore[allScore.length - 1].awayScore || 0 : scores[scores.length - 1].awayScore || 0
          item.homeScore = scores.length > 0 ? scores[scores.length - 1].homeScore : 0
          item.awayScore = scores.length > 0 ? scores[scores.length - 1].awayScore : 0
        }
        return item
      })
      return data
    }
  }
}
</script>
<style lang="scss" scoped>
.live-container {
  font-size: 14px;
  background-color: $--background-color-base;
  margin-top: 10px;
}
</style>

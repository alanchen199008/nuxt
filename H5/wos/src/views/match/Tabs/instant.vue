<template>
  <van-pull-refresh
    v-model="refreshing"
    class="scroll-touch"
    @refresh="onRefresh"
  >
    <template v-if="list.length > 0">
      <div v-for="(item,index) in list" :key="index">
        <div class="title">{{ item.date }} 周{{ item.date | parseTime("{a}") }}</div>
        <match-item v-for="child in item.items" :key="child.matchId" :item="child" @click="goDetail" />
      </div>
    </template>
    <d-empty v-else />
  </van-pull-refresh>
</template>

<script>
import { mapGetters } from 'vuex'
import usePullRefresh from '@/mixins/usePullRefresh'
import MatchItem from '../components/MatchItem'
import { getInstantMatchListForFootball } from '@/api/match'

export default {
  components: { MatchItem },
  mixins: [usePullRefresh(getInstantMatchListForFootball)],
  data() {
    return {
      params: {
        ids: []
      },
      list: []
    }
  },
  computed: {
    ...mapGetters(['instantMatchList', 'cancelMatch']),
    type: {
      get() {
        return this.$store.getters.mMatchType
      },
      set(value) {
        this.$store.dispatch('match/setMatchMatchType', value)
      }
    }
  },
  watch: {
    $route(to, from) {
      if (from.name === 'MatchFilter') {
        const cache = JSON.parse(sessionStorage.getItem('Match-Filter-Params'))
        if (cache) {
          this.params = { ...this.params, ...cache }
          this.type = cache.matchType
          this.onRefresh()
        }
      }
    },
    items() {
      this.list = this.formatData(this.items)
    },
    type(value) {
      this.params.matchType = value
      this.params.ids = []
      this.onRefresh()
    },
    instantMatchList(items) {
      if (this.list) {
        this.list.map(data => {
          data.items.map(item => {
            items.map(i => {
              if (item.matchId === i.matchId) {
                this.$set(item, 'awayCornerkick', i.awayCornerkick)
                this.$set(item, 'awayHalfScore', i.awayHalfScore)
                this.$set(item, 'awayRedCards', i.awayRedCards)
                this.$set(item, 'awayScore', i.awayScore)
                this.$set(item, 'awayYellowCards', i.awayYellowCards)
                this.$set(item, 'homeCornerkick', i.homeCornerkick)
                this.$set(item, 'homeHalfScore', i.homeHalfScore)
                this.$set(item, 'homeRedCards', i.homeRedCards)
                this.$set(item, 'homeScore', i.homeScore)
                this.$set(item, 'homeYellowCards', i.homeYellowCards)
                this.$set(item, 'kickoffTime', i.kickoffTime)
                this.$set(item, 'liveTime', i.liveTime)
                this.$set(item, 'status', i.status)
              }
              return i
            })
            return item
          })
          return data
        })
      }
    },
    cancelMatch() {
      this.items.map((item, index) => {
        if (item.matchId === this.cancelMatch.matchId) {
          this.items.splice(index, 0)
        }
        return item
      })
    }
  },
  mounted() {
    this.subscribe()
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'MatchMessage', params: { id, locale: this.$i18n.locale, tab: 'BaseTab' }})
    },
    formatData(data) {
      if (data) {
        let array = []
        let title = Object.keys(data)
        let list = Object.values(data)
        title.map((item, index) => {
          let obj = {
            date: item,
            items: list[index]
          }
          array.push(obj)
          return item
        })
        return array
      }
      return
    },
    subscribe() {
      this.$socket?.sendObj({
        cmdType: 'subscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.instant.match']
        }
      })
    },
    unsubscribe() {
      this.$socket.sendObj({
        cmdType: 'unsubscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.instant.match']
        }
      })
    },
    implementationGetParams() {
      const cache = JSON.parse(sessionStorage.getItem('Match-Filter-Params'))
      if (cache) {
        this.params = { ...this.params, ...cache }
        this.type = cache.matchType
      }
      return { matchType: this.type, ...this.params }
    }
  }
}
</script>
<style lang="scss" scoped>
.title {
  width: 100%;
  font-size: 14px;
  text-align: center;
  color: #F2B53DFF;
  background: #f8f8f6;
  line-height: 28px;
  height: 28px;
}
</style>

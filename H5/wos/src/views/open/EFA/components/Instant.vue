<template>
  <div class="instant">
    <van-pull-refresh
      v-model="refreshing"
      class="scroll-touch"
      flex-box="1"
      @refresh="onRefresh"
    >
      <div class="match-filter van-hairline--top-bottom">
        <div class="match-filter-main">
          <button
            v-for="(button, index) in buttons"
            :key="index"
            :class="active === index ? 'primary' : 'default'"
            @click="handleClick(button, index)"
          >
            {{ button.name }}
          </button>
        </div>
      </div>
      <div class="match-list">
        <template v-if="items.length > 0">
          <match-item v-for="(match, index) in items" :key="index" :item="match" />
        </template>
        <div v-else class="empty">暂无数据</div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import MatchItem from './matchItem.vue'
import usePullRefresh from '@/mixins/usePullRefresh'
import { getEuroCCAllInstant, getEuroCCInstant } from '@/api/eurocc'
export default {
  components: { MatchItem },
  mixins: [usePullRefresh(getEuroCCInstant)],
  data() {
    return {
      active: 0,
      buttons: [],
      params: {
        stageId: 100
      }
    }
  },

  computed: {
    ...mapGetters(['instantMatchList'])
  },
  watch: {
    // items() {
    //   this.items.map(item => {
    //     this.buttons.map(button => {
    //       if (this.active !== 0) {
    //         this.$set(item, 'stageName', button.name + item.stageName)
    //       }
    //       return button
    //     })
    //     return item
    //   })
    // },
    instantMatchList(items) {
      this.items.map(item => {
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
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.subscribe()
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    implementationGetParams() {
      return { ...this.params }
    },
    getData() {
      getEuroCCAllInstant()
        .then(([data, error]) => {
          if (!error) {
            this.buttons = data
          }
        })
      this.onRefresh()
    },
    handleClick(button, index) {
      if (button.stageId === 1) {
        return this.$toast('资格赛进行中')
      } else {
        this.active = index
        this.params.stageId = button.stageId
        this.onRefresh()
      }
      getEuroCCInstant({ stageId: button.stageId })
        .then(([data, error]) => {
          if (!error) {
            this.items = data
          }
        })
    },
    subscribe() {
      this.$socket.sendObj({
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
    }
  }
}
</script>

<style lang="scss" scoped>
.instant{
  max-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 150px;
 .match-filter {
    width: 100%;
    background: #eff1f2;
    overflow: hidden;
    .match-filter-main {
      overflow-y: auto;
      white-space: nowrap;
      line-height: 0;
      padding: 8px;
      button {
        border: 1px solid #acd5c4;
        line-height: 22px;
        width: 72px;
        border-radius: 18px;
        font-size: 14px;
        margin-right: 14px;
        &.default {
          color: #4acc96;
          background: #eff1f2;
        }
        &.primary {
          color: #fff;
          background: #4acc96;
          border-color: #4acc96;
        }
      }
    }
  }
  .empty{
    text-align: center;
    font-size: 14px;
    padding: 12px;
  }
}

</style>

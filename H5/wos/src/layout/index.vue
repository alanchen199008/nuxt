<template>
  <div class="app-wrapper">
    <keep-alive :include="['Home']">
      <router-view />
    </keep-alive>
    <router-view v-if="mode === 0" name="tabbar" />
    <audio ref="home" muted hidden controls preload :src="require(`@/assets/audio/${prompt.homeGoalSound}.mp3`)" />
    <audio ref="away" muted hidden controls preload :src="require(`@/assets/audio/${prompt.guestGoalSound}.mp3`)" />
    <transition name="van-slide-left">
      <div v-if="push" class="push-popup">
        <div class="push-main" flex="box:mean">
          <div class="match-time" flex-box="0">{{ match.time }} '</div>
          <div class="team-name" flex-box="1">
            <div>
              <font v-if="match.position === 1">{{ match.homeTeamNameZh }}</font>
              <span v-else>{{ match.homeTeamNameZh }}</span>
            </div>
            <div>
              <font v-if="match.position === 2">{{ match.awayTeamNameZh }}</font>
              <span v-else>{{ match.awayTeamNameZh }}</span>
            </div>
          </div>
          <div class="event" flex-box="0">进球</div>
          <div class="score" flex-box="0">
            <div>
              <font v-if="match.position === 1">{{ match.homeScore }}</font><span v-else>{{ match.homeScore }}</span>
            </div>
            <div>
              <font v-if="match.position === 2">{{ match.awayScore }}</font><span v-else>{{ match.awayScore }}</span>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { getPushAccess } from '@/api/user'
import { getListItemsRecommendCount } from '@/api/match'
import UseWebSocket from '@/mixins/useWebSocket'

let observer = null

export default {
  data() {
    return {
      push: false,
      match: {
        matchId: null,
        awayScore: null,
        awayTeamNameEn: '',
        awayTeamNameZh: '',
        homeScore: null,
        homeTeamNameEn: '',
        homeTeamNameZh: '',
        position: null, // 事件发生方，0-中立 1-主队 2-客队
        second: null,
        time: null
      },
      items: [],
      list: [],
      interval: null
    }
  },
  computed: {
    ...mapGetters(['info', 'tenantCode', 'language', 'matchListTab', 'mode']),
    prompt: {
      get() {
        return this.$store.getters.prompt
      },
      set(value) {
        this.$store.dispatch('app/setPrompt', value)
      }
    },
    mode: {
      get() {
        return this.$store.getters.mode
      },
      set(value) {
        this.$store.dispatch('app/setMode', value)
      }
    }
  },

  watch: {
    match: {
      handler() {
        if (!this.push) {
          this.push = true
        }
      },
      deep: true
    },
    push(value) {
      if (value) {
        let timer = null
        let s = 3
        timer = setInterval(() => {
          s--
          if (!s) {
            this.push = false
            clearInterval(timer)
            timer = null
            s = 3
          }
        }, 1000)
        if (this.prompt.scoringSoundFlag === 1) {
          if (this.match.position === 0) {
            this.$refs.home.play()
          }
          if (this.match.position === 1) {
            this.$refs.away.play()
          }
        }
        if (this.prompt.scoringShockFlag === 1) {
          const vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
          if (!vibrate) {
            return this.$toast('您的设备不支持震动!')
          }
          this.startVibrate(1000)
        }
      } else {
        setTimeout(() => {
          this.items.splice(0, 1)
          if (this.items.length > 0) {
            this.match = { ...this.match, ...this.items[0] }
          }
        }, 1500)
      }
    }
  },
  created() {
    const { type } = this.$route.query
    this.mode = type && type === 'android' ? 1 : type && type === 'ios' ? 2 : 0
    this.init()
    this.getRecommendCount()
  },
  methods: {
    init() {
      const data = {
        user_id: this.info.memberId ? String(this.info.memberId) : '',
        tenant_code: localStorage.getItem('tenant-code'),
        channels: []
      }
      getPushAccess(data)
        .then(([data, error]) => {
          if (!error) {
            this.webSocket(data.pushToken)
          }
        })
    },
    getRecommendCount() {
      getListItemsRecommendCount()
        .then(([data, error]) => {
          if (!error) {
            this.$store.dispatch('match/setRecommends', data)
          }
        })
    },
    onMessage({ data, channelName }) {
      data = JSON.parse(data)
      if (channelName === 'football.match.instant.goal') {
        if (this.prompt.mainSwitch === 1) {
          if (this.prompt.focusNoticeFlag === 1 && this.info.focusMatches.length > 0) {
            this.info.focusMatches.map(item => {
              if (data.matchId === item) {
                this.items.push(data)
              }
              return item
            })
          } else {
            this.items.push(data)
          }
        }
      }
      if (channelName === 'football.match.stat.event') {
        this.$store.dispatch('match/setLiveData', data)
      }
      if (channelName === 'football.instant.match') {
        this.$store.dispatch('match/setInstantList', data)
      }
      if (channelName === 'football.instant.cancel.match') {
        this.$store.dispatch('match/setCanacelMatch', data)
      }
    },
    webSocket(token) {
      observer = new UseWebSocket(`${process.env.VUE_APP_SOCKET}/ws?srctype=1&token=${token}`, {
        reconnection: true,
        reconnectionAttempts: 5,
        onOpen: () => {
          this.subscribe()
          this.interval = setInterval(() => {
            if (this.items.length > 0 && !this.push) {
              this.match = { ...this.match, ...this.items[0] }
            }
          }, 5000)
        },
        onMessage: (e) => {
          const data = JSON.parse(e.data)
          this.onMessage(data)
        }
      })
      Vue.prototype.$socket = observer.WebSocket
    },
    subscribe() {
      this.checkTimeoutId = setInterval(() => {
        Vue.prototype.$socket.sendObj({ cmdType: 'ping', data: '' })
      }, 1000 * 20)

      Vue.prototype.$socket.sendObj({
        cmdType: 'subscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: this.mode === 0 ? ['football.match.instant.goal', 'football.instant.cancel.match'] : ['football.instant.cancel.match']
        }
      })
    },
    getContainer() {
      return document.querySelector('.app-wrapper')
    },
    startVibrate(duration) {
      navigator.vibrate(duration)
    },
    stopVibrate(duration) {
      if (this.vibrateInterval) {
        clearInterval(this.vibrateInterval)
        navigator.vibrate(0)
      }
    },
    startPeristentVibrate(duration, interval) {
      this.vibrateInterval = setInterval(() => {
        navigator.vibrate(duration)
      }, interval)
    }
  }
}
</script>
<style lang="scss" scoped>
.push-popup {
  width: 100%;
  max-width: 375px;
  position: fixed;
  bottom: 50px;
  z-index: 1000;
  background: url("~@/assets/public/push-background.png") no-repeat center;
  background-size: cover;
  color: #fff;
  .push-main {
    height: 76px;
    .match-time {
      width: 70px;
      text-align: center;
      font-size: 24px;
      line-height: 76px;
    }
    .team-name {
      padding: 7px 0;
      div {
        height: 28px;
        line-height: 28px;
        font {
          font-size: 18px;
          color: #fff65e;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          color: #fff;
          vertical-align: middle;
        }
      }
    }
    .event {
      width: 79px;
      text-align: center;
      font-size: 15px;
      line-height: 76px;
    }
    .score {
      width: 30px;
      padding: 7px 0;
      div {
        height: 28px;
        line-height: 28px;
        font {
          font-size: 18px;
          color: #fff65e;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          color: #fff;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>

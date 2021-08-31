<template>
  <div flex="dir:top" class="bar-default">
    <message-team :message="message" />
    <van-tabs
      v-model="current"
      title-inactive-color="#999999"
      title-active-color="#333"
      color="#21D4AD"
      line-width="28"
      animated
      :before-change="handleChange"
    >
      <van-tab v-for="tab in tabs" v-show="tab.show" :key="tab.value" :name="tab.value" :title="tab.label" />
    </van-tabs>
    <div class="scroll-touch" flex-box="1">
      <component :is="current" v-if="current === 'LiveTab'" :home-logo="message.homeLogo" :away-logo="message.awayLogo" :home-name="message.homeTeamName" :away-name="message.awayTeamName" />
      <component :is="current" v-else />
    </div>
    <silde-left-view />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getMatchData } from '@/api/match'
import MessageTeam from './MessageTeam'
import { ForecastTab, LiveTab, ChatTab, InfoTab, BaseTab, OddsTab, RecommentTab } from './tabs'
export default {
  name: 'MatchMessage',
  provide() {
    return { messageInstance: this }
  },
  components: {
    ForecastTab,
    MessageTeam,
    LiveTab,
    ChatTab,
    InfoTab,
    BaseTab,
    OddsTab,
    RecommentTab
  },

  data() {
    return {
      current: 'ForecastTab',
      message: {},
      tabs: [
        { value: 'ForecastTab', label: '预测' },
        { value: 'BaseTab', label: '基本面' },
        { value: 'OddsTab', label: '指数' },
        { value: 'InfoTab', label: '情报' },
        { value: 'RecommentTab', label: '方案' },
        { value: 'ChatTab', label: '聊天' },
        { value: 'LiveTab', label: '直播' }
      ]
    }
  },
  computed: {
    ...mapGetters(['memberId', 'liveData'])
  },
  watch: {
    liveData(items) {
      items.map(item => {
        if (item.matchId === this.$route.params.id) {
          this.fetch()
        }
        return item
      })
    }
  },
  created() {
    const { tab } = this.$route.params
    this.current = tab
    this.fetch()
  },
  mounted() {
    this.subscribe()
  },
  beforeDestroy() {
    this.unsubscribe()
    this.$store.dispatch('match/setLiveData', [])
  },
  methods: {
    fetch() {
      getMatchData(this.$route.params.id)
        .then(([data, error]) => {
          if (!error) {
            this.message = data || {}
            if (this.message.hasIntelligence === 1) {
              this.tabs = [
                { value: 'ForecastTab', label: '预测' },
                { value: 'BaseTab', label: '基本面' },
                { value: 'OddsTab', label: '指数' },
                { value: 'InfoTab', label: '情报' },
                { value: 'RecommentTab', label: '方案' },
                { value: 'ChatTab', label: '聊天' },
                { value: 'LiveTab', label: '直播' }
              ]
            } else {
              this.tabs = [
                { value: 'ForecastTab', label: '预测' },
                { value: 'BaseTab', label: '基本面' },
                { value: 'OddsTab', label: '指数' },
                { value: 'RecommentTab', label: '方案' },
                { value: 'ChatTab', label: '聊天' },
                { value: 'LiveTab', label: '直播' }
              ]
            }
          }
        })
    },
    handleChange(name) {
      if (name === 'ChatTab' && !this.memberId) {
        return window.__GLOBAL.LoginControlDialog.open()
      }
      if (this.current !== name) {
        this.current = name
      }
    },
    subscribe() {
      const data = {
        cmdType: 'subscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.match.stat.event']
        }
      }

      this.$socket?.sendObj(data)
    },
    unsubscribe() {
      const data = {
        'cmdType': 'unsubscribe',
        'data': {
          'tenantCode': localStorage.getItem('tenant-code'),
          'channelNames': ['football.match.stat.event']
        }
      }
      this.$socket?.sendObj(data)
    }
  }
}
</script>

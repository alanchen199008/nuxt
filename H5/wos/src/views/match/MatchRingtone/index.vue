<template>
  <div class="header-container">
    <van-nav-bar title="铃声设置" left-arrow @click-left="onClickLeft" />
    <van-cell-group title="进球提示">
      <van-cell title="总开关">
        <template #right-icon>
          <van-switch
            v-model="prompt.mainSwitch"
            :active-value="1"
            :inactive-value="0"
            active-color="#74C03D"
            inactive-color="#DBDEE4"
            size="18"
            @change="value => _handleChange(value, 'mainSwitch')"
          />
        </template>
      </van-cell>
      <van-cell title="仅提示已关注赛事">
        <template #right-icon>
          <van-switch
            v-model="prompt.focusNoticeFlag"
            :active-value="1"
            :inactive-value="0"
            active-color="#74C03D"
            inactive-color="#DBDEE4"
            size="18"
            @change="value => _handleChange(value, 'focusNoticeFlag')"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group>
      <van-cell title="声音">
        <template #right-icon>
          <van-switch
            v-model="prompt.scoringSoundFlag"
            :active-value="1"
            :inactive-value="0"
            active-color="#74C03D"
            inactive-color="#DBDEE4"
            size="18"
            @change="value => _handleChange(value, 'scoringSoundFlag')"
          />
        </template>
      </van-cell>
      <template v-if="prompt.scoringSoundFlag === 1">
        <van-cell
          title="主队进球声音"
          :value="homeSound.name"
          is-link
          @click="goRouter('MatchRingtoneHomeSound',homeSound.value)"
        />
        <van-cell
          title="客队进球声音"
          :value="awaySound.name"
          is-link
          @click="goRouter('MatchRingtoneAwaySound',awaySound.value)"
        />
      </template>
      <van-cell title="震动">
        <template #right-icon>
          <van-switch
            v-model="prompt.scoringShockFlag"
            :active-value="1"
            :inactive-value="0"
            active-color="#74C03D"
            inactive-color="#DBDEE4"
            size="18"
            @change="value => _handleChange(value, 'scoringShockFlag')"
          />
        </template>
      </van-cell>
    </van-cell-group>
    <silde-left-view />
  </div>
</template>

<script>
import { getMatchRingtoneWithFootball, updateMatchRingtoneWithFootball } from '@/api/match'
import { mapGetters } from 'vuex'
export default {
  name: 'MatchRingtone',
  data() {
    return {
      switchChecked: '',
      sounds: [
        { name: '默认', value: 0 },
        { name: '哨子', value: 1 },
        { name: '鼓声', value: 2 },
        { name: '广播', value: 3 },
        { name: '号角', value: 4 },
        { name: '胜利', value: 5 }
      ],
      vibrateInterval: null,
      homeSound: { name: '', value: null },
      awaySound: { name: '', value: null },
      homeSoundName: '',
      awaySoundName: ''
    }
  },
  computed: {
    ...mapGetters(['info']),
    prompt: {
      get() {
        return this.$store.getters.prompt
      },
      set(value) {
        this.$store.dispatch('user/setPrompt', value)
      }
    }
  },
  watch: {
    prompt: {
      handler(value) {
        this.sounds.map(item => {
          if (value.homeGoalSound === item.value) {
            this.homeSound.name = item.name
            this.homeSound.value = item.value
          }
          if (value.guestGoalSound === item.value) {
            this.awaySound.name = item.name
            this.awaySound.value = item.value
          }
          return item
        })
      },
      deep: true
    }
  },
  created() {
    this.fetch()
  },
  beforeRouteUpdate(to, from, next) {
    if (this.memberId) {
      if (from.name === 'MatchRingtoneSort') {
        this.fetch()
      }
      next()
    } else {
      next()
    }
  },
  methods: {
    fetch() {
      getMatchRingtoneWithFootball()
        .then(([data, err]) => {
          if (!err) {
            this.prompt = {
              mainSwitch: data.mainSwitch,
              focusNoticeFlag: data.focusNoticeFlag,
              guestGoalSound: data.guestGoalSound,
              homeGoalSound: data.homeGoalSound,
              scoringShockFlag: data.scoringShockFlag,
              scoringSoundFlag: data.scoringSoundFlag
            }
            this.sounds.map(item => {
              if (data.homeGoalSound === item.value) {
                this.homeSound.name = item.name
                this.homeSound.value = item.value
              }
              if (data.guestGoalSound === item.value) {
                this.awaySound.name = item.name
                this.awaySound.value = item.value
              }
              return item
            })
          }
        })
    },
    _handleChange(value, type) {
      updateMatchRingtoneWithFootball({ [type]: value })
        .then(([_, err]) => {
          if (!err) {
            this.prompt[type] = value
          }
        })
      if (type === 'scoringShockFlag') {
        const vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate
        if (!vibrate) {
          return this.$toast('您的设备不支持震动!')
        }
      }
    },
    onClickLeft() {
      this.$router.push({ name: 'Match' })
    },
    goRouter(name, value) {
      this.$router.push({ name, params: { value }})
    },
    onSortSelect() {
      //
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
    },
    torington(val) {
      this.$router.push({ path: '/teamRing', query: { type: val }})
    }
  }
}
</script>
<style lang="scss" scoped>
.header-container {
  background: #f5f5f5;
}
::v-deep .van-cell-group {
  margin-bottom: 10px;
  &__title {
    color: #999;
    font-size: 14px;
  }
}
</style>

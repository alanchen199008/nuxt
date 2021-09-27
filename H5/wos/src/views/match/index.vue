<template>
  <div class="d-container match-warpper" flex="dir:top">
    <van-nav-bar :border="false" style="background-color: transparent" @click-left="onClickLeft" @click-right="onClickRight">
      <template v-if="tabValue !== 'focus'" #left>
        <img src="@/assets/icons/filter.png" width="23" height="23">
      </template>
      <template #right>
        <img src="@/assets/icons/settings.png" width="18" height="18">
      </template>
      <template #title>
        <d-popover v-model="type" module="match" @input="handleType" />
      </template>
    </van-nav-bar>
    <div flex="dir:top box:first" flex-box="1">
      <div class="types-tabs">
        <van-tabs v-model="tabValue" animated :before-change="handleTab">
          <van-tab v-for="item in typesList" :key="item.key" :title="item.label" :name="item.name" />
        </van-tabs>
      </div>
      <div class="swiper">
        <d-swiper :position="6" :height="72" />
      </div>
      <template v-if="tabValue === 'focus'">
        <component :is="tabValue" ref="component" @tab-change="tabChange" />
      </template>
      <template v-else>
        <component :is="tabValue" ref="component" />
      </template>
    </div>
    <silde-left-view />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DSwiper from '@/components/Swiper'
import DPopover from '@/components/DPopover'
import { instant, over, focus, schedule } from './Tabs'
import { parseTime } from '@/utils'
export default {
  name: 'Match',
  components: { DPopover, instant, over, focus, schedule, DSwiper },
  data() {
    return {
      typesList: [
        { label: '即时', value: 0, name: 'instant' },
        { label: '完场', value: 1, name: 'over' },
        { label: '关注', value: 2, name: 'focus' },
        { label: '赛程', value: 3, name: 'schedule' }
      ],
      count: {}
    }
  },
  computed: {
    ...mapGetters(['memberId']),
    type: {
      get() {
        return this.$store.getters.mMatchType
      },
      set(value) {
        this.$store.dispatch('match/setMatchMatchType', value)
      }
    },
    tabValue: {
      get() {
        return this.$store.getters.matchListTab
      },
      set(value) {
        this.$store.dispatch('match/setMatchListTab', value)
      }
    }
  },
  created() {
    const { tab } = this.$route.params
    this.tabValue = tab || 'instant'
  },
  methods: {
    onClickLeft() {
      if (this.tabValue !== 'focus') {
        let count = {
          type: this.tabValue === 'instant' ? 1 : this.tabValue === 'over' ? 2 : this.tabValue === 'schedule' ? 3 : null,
          matchType: this.type,
          ids: this.$refs.component.params.ids,
          date: this.tabValue === 'instant' ? parseTime(new Date(), '{y}-{m}-{d}') : this.$refs.component.params.date
        }
        this.$router.push({ name: 'MatchFilter', params: { count }})
      }
    },
    onClickRight() {
      if (this.memberId) {
        this.$router.push({ name: 'MatchRingtone' })
      } else {
        window.__GLOBAL.LoginControlDialog.open()
      }
    },
    handleType(value) {
      this.type = value
      sessionStorage.removeItem('Match-Filter-Params')
    },
    handleTab(name) {
      if (name === 'focus' && !this.memberId) {
        window.__GLOBAL.LoginControlDialog.open()
        return
      } else {
        this.tabValue = name
      }
    },
    tabChange(value) {
      this.tabValue = value
    }
  }
}
</script>

<style lang="scss" scoped>
.match-warpper {
  background-image: $--background-head-gradient;
  background-size: 100% 77px;
  background-repeat: no-repeat;
}
.swiper{
 padding:  10px 15px ;
 max-height: 72px;
 margin-bottom: 15px;
}
</style>

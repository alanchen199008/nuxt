<template>
  <div flex="dir:top box:first" class="d-container forecast-warpper">
    <van-nav-bar
      :border="false"
      style="background-color: transparent"
      @click-left="goFilter"
    >
      <template v-if="params.position !== 3" #left>
        <img src="@/assets/icons/filter.png" width="23" height="23">
      </template>
      <template #title>
        <d-popover v-model="type" module="forecast" @input="handleType" />
      </template>
    </van-nav-bar>
    <div
      flex-box="1"
      flex="dir:top box:first"
    >
      <div class="types-tabs">
        <van-tabs
          v-model="forecastParams.position"
          animated
          :before-change="handleTab"
        >
          <van-tab
            v-for="tab in tabs"
            :key="tab.value"
            :title="tab.label"
            :name="tab.value"
          />
        </van-tabs>
      </div>
      <div class="swiper">
        <d-swiper :position="7" :height="72" />
      </div>
      <van-pull-refresh
        v-model="refreshing"
        class="scroll-touch"
        @refresh="onRefresh"
      >
        <div class="total" flex="main:justify cross:center" :style="{visibility : forecastParams.position !== 3 ? 'visible' : 'hidden'}">
          <div>{{ forecastParams.matchType === 1 ? '全部' : forecastParams.matchType === 2 ? '足球' : ' ' }}场次预测</div>
          <div>已赛命中率 <span class="color-red-regular">{{ todayHitRate | parsePrecision }}%</span> {{ totalHit + '/' + total }}</div>
        </div>
        <d-empty v-if="isFetching && !items.length" :type="forecastParams.position === 3 ? 'match' : 'search'" @tab-change="tabChange" />
        <van-list
          v-model="loading"
          :finished="finished"
          :error="loaderr"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <forecast-item v-for="item in items" :key="item.id" :item="item" :position="params.position" />
        </van-list>
      </van-pull-refresh>
    </div>
    <silde-left-view />
  </div>
</template>

<script>
import DPopover from '@/components/DPopover'
import DSwiper from '@/components/Swiper'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { ForecastItem } from './components'
import { getForecastList } from '@/api/forecast'
import { mapGetters } from 'vuex'
export default {
  name: 'Forecast',
  components: { DPopover, DSwiper, ForecastItem },
  mixins: [usePullRefreshAndLoad(getForecastList)],
  data() {
    return {
      todayHitRate: 0,
      totalHit: 0,
      total: 0,
      tabs: [
        { label: '全部', value: 0 },
        { label: '稳场', value: 2 },
        { label: '关注', value: 3 }
      ]
    }
  },
  computed: {
    ...mapGetters(['memberId', 'cancelMatch']),
    forecastParams: {
      get() {
        return this.$store.getters.forecastFilter
      },
      set(value) {
        this.$store.dispatch('forecast/SetParams', value)
      }
    },
    type: {
      get() {
        return this.$store.getters.forecastMatchType
      },
      set(value) {
        this.$store.dispatch('forecast/SetMatchType', value)
      }
    }

  },
  watch: {
    forecastParams: {
      handler() {
        this.onRefresh()
      },
      deep: true
    },
    items() {
      this.items.map(item => {
        this.$set(item, 'type', this.forecastParams.position)
        return item
      })
      console.log(this.forecastParams.currentPage)
    },
    cancelMatch() {
      this.items.map((item, index) => {
        if (item.matchId === this.cancelMatch.matchId) {
          this.items = this.items.splice(0, index)
        }
        return item
      })
    }
  },
  methods: {
    implementationGetParams() {
      return { ...this.forecastParams }
    },
    implementationFetched({ todayHitRate, totalHit, total }) {
      this.todayHitRate = todayHitRate
      this.totalHit = totalHit
      this.total = total
    },
    goFilter() {
      if (this.forecastParams.position !== 3) {
        this.$router.push({ name: 'ForecastFilter', params: { params: this.forecastParams }})
      }
    },
    handleTab(name) {
      if (name === 3 && !this.memberId) {
        window.__GLOBAL.LoginControlDialog.open()
      } else {
        this.forecastParams.position = name
      }
    },
    handleType(value) {
      this.resetParams(value)
    },
    tabChange(value) {
      this.forecastParams.position = value
    },
    resetParams(value) {
      this.forecastParams = { ...this.forecastParams, matchType: value, competitionIds: [] }
    }
  }
}
</script>

<style lang="scss" scoped>
.forecast-warpper {
  background-image: $--background-head-gradient;
  background-size: 100% 77px;
  background-repeat: no-repeat;
  position: relative;
  .title{
    color: #fff;
    .icon-arrow{
      font-size: 12px;
    }
  }
  .total{
    color: var(--text-regular);
    font-size: 14px;
    padding: 10px 15px;
  }
}
.swiper{
 padding: 15px ;
 max-height: 72px;
 margin-bottom: 15px;
}
</style>

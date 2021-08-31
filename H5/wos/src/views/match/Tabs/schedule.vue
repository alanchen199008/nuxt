<template>
  <div flex="dir:top box:first">
    <d-calendar postation="1" @click="handleClick" @confirm="handleConfirm" />
    <van-pull-refresh v-model="refreshing" class="scroll-touch" @refresh="onRefresh">
      <template slot="pulling">
        <loader />
      </template>
      <template slot="loosing">
        <loader />
      </template>
      <template slot="loading">
        <loader />
      </template>
      <d-empty v-if="isFetching && !items.length" />
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <MatchItem v-for="item in items" :key="item.matchId" :item="item" @click="goDetail" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import MatchItem from '../components/MatchItem'
import { mapGetters } from 'vuex'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { getScheduleMatchListForFootball } from '@/api/match'
import { parseTime } from '@/utils'
import { DCalendar } from '@/views/match/components'
export default {
  components: { MatchItem, DCalendar },
  mixins: [usePullRefreshAndLoad(getScheduleMatchListForFootball)],
  data() {
    return {
      items: [],
      params: {
        date: parseTime(new Date(), '{y}-{m}-{d}'),
        pageSize: 10,
        lastOne: null,
        ids: []
      }
    }
  },
  computed: {
    ...mapGetters(['cancelMatch']),
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
        const params = JSON.parse(sessionStorage.getItem('Match-Filter-Params'))
        if (params) {
          this.params = { ...this.params, ...params, lastOne: null, currentPage: 1 }
          this.type = params.matchType
          this.onRefresh()
        }
      }
    },
    type(value) {
      this.params.matchType = value
      this.params.ids = []
      this.params.lastOne = null
      this.params.currentPage = 1
      this.onRefresh()
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
    goDetail(id) {
      this.$router.push({ name: 'MatchMessage', params: { id, locale: this.$i18n.locale, tab: 'BaseTab' }})
    },
    implementationGetParams() {
      const cache = JSON.parse(sessionStorage.getItem('Match-Filter-Params'))
      if (cache) {
        this.params = { ...this.params, ...cache }
        this.type = cache.matchType
      }
      return { matchType: this.type, ...this.params }
    },
    implementationRefresh() {
      this.params.lastOne = null
    },
    implementationFetched({ items }) {
      this.params.lastOne = items && items.length ? items[items.length - 1].matchId : null
    },
    handleClick(value) {
      this.params.date = value
      this.onRefresh()
    },
    handleConfirm(value) {
      this.params.date = parseTime(new Date(value), '{y}-{m}-{d}')
      this.onRefresh()
    }
  }
}
</script>

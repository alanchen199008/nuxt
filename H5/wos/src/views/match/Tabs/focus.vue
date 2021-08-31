<template>
  <van-pull-refresh
    v-model="refreshing"
    class="scroll-touch"
    @refresh="onRefresh"
  >
    <d-empty v-if="isFetching && !items.length" type="match" @tab-change="tabChange" />
    <van-collapse
      v-for="(item, index) in items"
      :key="item.date"
      v-model="collapse"
    >
      <van-collapse-item :name="index">
        <template #title>{{ item.date | parseTime('{y}-{m}-{d} 周{a}') }}</template>
        <match-item
          v-for="match in item.items"
          :key="match.matchId"
          :item="match"
          @click="goDetail"
        />
      </van-collapse-item>
    </van-collapse>
  </van-pull-refresh>
</template>

<script>
import { mapGetters } from 'vuex'
import MatchItem from '../components/MatchItem'
import usePullRefresh from '@/mixins/usePullRefresh'
import { getFocusMatchListForFootball } from '@/api/match'

export default {
  components: { MatchItem },
  mixins: [usePullRefresh(getFocusMatchListForFootball)],
  props: {
    tabName: {
      type: String,
      default: 'focus'
    }
  },
  data() {
    return {
      collapse: [0],
      params: {}
    }
  },
  computed: {
    ...mapGetters(['cancelMatch']),
    type() {
      return this.$store.getters.mMatchType
    }
  },
  watch: {
    type(value) {
      this.params.matchType = value
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
  created() {
    this.params.matchType = this.type
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'MatchMessage', params: { id, locale: this.$i18n.locale, tab: 'BaseTab' }})
    },
    implementationGetParams() {
      return { matchType: this.type, ...this.params }
    },
    tabChange(value) {
      this.$emit('tab-change', value)
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-collapse {
  .van-collapse-item {
    .van-collapse-item__title{
      background: #f5f5f5;
    }
    .van-collapse-item__content{
      padding: 0;
    }
  }
}
</style>

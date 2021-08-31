<template>
  <div flex="dir:top" class="fh">
    <div class="match-message-tabs">
      <van-tabs v-model="params.orderBy" type="card" :before-change="handleTab">
        <van-tab
          v-for="tab in tabs"
          :key="tab.name"
          :title="tab.label"
          :name="tab.name"
        />
      </van-tabs>
    </div>
    <van-pull-refresh
      v-model="refreshing"
      class="scroll-touch"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <d-empty v-if="isFetching && !items.length" />
        <expert-recommend-item
          v-for="(item, index) in items"
          v-else
          :key="index"
          :item="item"
          @click="toDetail"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ExpertRecommendItem from '@/views/components/ExpertRecommendItem'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { getMatchIdArticle } from '@/api/expert'

export default {
  components: { ExpertRecommendItem },
  mixins: [usePullRefreshAndLoad(getMatchIdArticle)],
  data() {
    return {
      params: {
        matchId: this.$route.params.id,
        orderBy: '1'
      },
      tabs: [
        { label: '默认排序', name: '1' },
        { label: '关注度', name: '2' },
        { label: '周返还率', name: '3' }
      ]
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    implementationGetParams() {
      return { ...this.params }
    },
    handleTab(name) {
      if (this.params.orderBy !== name) {
        this.params.orderBy = name
        this.onRefresh()
      }
    },
    toDetail(id) {
      this.$router.push({ name: 'MatchRecommendDetail', params: { id }})
    }
  }
}
</script>

<style lang="scss" scoped>
.fh {
  .match-message-tabs {
    margin-top: 10px ;
  }
}
</style>

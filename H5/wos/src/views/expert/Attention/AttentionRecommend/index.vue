<template>
  <div class="recommend-list scroll-touch">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <d-empty v-if="items.length === 0" type="search" @tab-change="tabChange" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :error="loaderr"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <attention-recommend-item
          v-for="item in items"
          :key="item.articleId"
          :item="item"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import AttentionRecommendItem from '@/views/components/AttentionRecommendItem'
import { getAttentionExpertRecommendArticle } from '@/api/expert'
export default {
  components: { AttentionRecommendItem },
  mixins: [usePullRefreshAndLoad(getAttentionExpertRecommendArticle)],
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    implementationGetParams() {
      return { ...this.params }
    },
    tabChange(value) {
      this.$emit('tab-change', value)
    }
  }
}
</script>

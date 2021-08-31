<template>
  <div class="recommend-list scroll-touch">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <d-empty v-if="items.length === 0" type="expert" @tab-change="tabChange" />
      <van-list
        v-else
        v-model="loading"
        :finished="finished"
        :error="loaderr"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <attention-item v-for="item in items" :key="item.expertId" :item="item" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import AttentionItem from './AttentionItem'
import { getMemberAttentionList } from '@/api/expert'
export default {
  components: { AttentionItem },
  mixins: [usePullRefreshAndLoad(getMemberAttentionList)],
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 20
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

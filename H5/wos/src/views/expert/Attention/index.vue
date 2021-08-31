<template>
  <div>
    <div class="expert-top" flex="main:center">
      <div class="tabs" flex="cross:center box:mean">
        <span
          v-for="(item, index) in tabs"
          :key="index"
          :class="isActive === item.name ? 'active' : ''"
          @click="handleClick(item)"
        >{{ item.title }}({{ item.count }})</span>
      </div>
    </div>
    <component :is="isActive" v-if="isActive === 'AttentionExpert'" @tab-change="tabChange" />
    <component :is="isActive" v-else />
  </div>
</template>

<script>
import AttentionExpert from './AttentionExpert'
import AttentionRecommend from './AttentionRecommend'
import {
  getMemberAttentionList,
  getAttentionExpertRecommendArticle
} from '@/api/expert'
export default {
  components: { AttentionExpert, AttentionRecommend },
  data() {
    return {
      isActive: 'AttentionExpert',
      tabs: [
        { title: '关注专家', count: 0, name: 'AttentionExpert' },
        { title: '关注专家方案', count: 0, name: 'AttentionRecommend' }
      ]
    }
  },
  created() {
    this.getTitleCount()
  },
  methods: {
    getTitleCount() {
      const paramsAttention = { currentPage: 1, pageSize: 10 }
      const paramsRecommend = { currentPage: 1, pageSize: 10 }
      getMemberAttentionList(paramsAttention).then(([data, err, res]) => {
        if (!err) {
          this.tabs[0].count = res.data.totalNum
        }
      })
      getAttentionExpertRecommendArticle(paramsRecommend).then(([data, err, res]) => {
        if (!err) {
          this.tabs[1].count = res.data.totalNum
        }
      })
    },
    tabChange(value) {
      this.$emit('tab-change', value)
    },
    handleClick(item) {
      if (this.isActive !== item.name) {
        this.isActive = item.name
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-top {
  padding: 10px 0;
  background: #fff;
  border-top: 1px solid #ebebeb;
  margin-bottom: 10px;
  .tabs {
    width: 304px;
    line-height: 34px;
    border-radius: 5px;
    background: #f4f5f6;
    padding: 2px;
    span {
      font-size: 13px;
      text-align: center;
      &.active {
        background: #fff;
        font-weight: 400;
      }
    }
  }
}
</style>

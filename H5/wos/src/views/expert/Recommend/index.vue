<template>
  <div>
    <div class="expert-header-filter">
      <div class="tabs">
        <span v-for="(item,index) in types" :key="item.value" class="tab" :class="isType === index ? 'active' :''" @click="handleClick(item,index)">{{ item.label }}</span>
      </div>
      <div class="buttons" flex="box:mean cross:center">
        <span
          v-for="(item, index) in sorts"
          :key="index"
          class="button"
          :class="isActive === index ? 'active' : ''"
          @click="handleChange(item.value, index)"
        >{{ item.label }}</span>
      </div>
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
        <expert-recommend-item
          v-for="item in items"
          :key="item.articleId"
          :item="item"
          :sort-by="params.sortBy"
          @click.native="goLink(item.articleId)"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ExpertRecommendItem from '@/views/components/ExpertRecommendItem'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { getExpertRecommendList } from '@/api/expert'
export default {
  components: { ExpertRecommendItem },
  mixins: [usePullRefreshAndLoad(getExpertRecommendList)],
  data() {
    return {
      isActive: 0,
      isType: 0,
      params: {
        matchType: 0,
        attention: false,
        sortBy: 'time'
      },
      types: [
        { value: 0, label: '全部' },
        { value: 2, label: '足球' }
        // { value: 3, label: '北单' }
      ],
      sorts: [
        { value: 'time', label: '发布时间' },
        { value: 'returnrate', label: '返还率' },
        { value: 'winrate', label: '胜率' },
        { value: 'linkwin', label: '连中数' }
      ]
    }
  },
  watch: {
    'params.sortBy'(val) {
      this.sorts.map((item, index) => {
        if (item.value === val) {
          this.isActive = index
        }
        return item
      })
    },
    $route() {
      const { params } = this.$route.params
      if (params) {
        this.params = { ...this.params, ...params, currentPage: 1 }
        this.isType = params.isType
        this.isActive = params.isActive
        this.onRefresh()
      }
      const cache = JSON.parse(sessionStorage.getItem('recommend-list-cache'))
      if (cache) {
        this.isActive = cache.isActive
        this.isType = cache.isActive
        this.params = { ...this.params, ...cache.params, currentPage: 1 }
        this.onRefresh()
      }
    }
  },
  created() {
    const { sortby } = this.$route.params
    if (sortby) {
      this.params.sortBy = sortby
    }
  },
  methods: {
    onClickFilter() {
      this.$router.push({ name: 'RecommendFiter' })
    },
    goLink(id) {
      const cache = {
        isActive: this.isActive,
        isType: this.isType,
        params: this.params
      }
      sessionStorage.setItem('recommend-list-cache', JSON.stringify(cache))
      this.$router.push({ name: 'ExpertRecommendDetail', params: { id, locale: this.$i18n.locale, params: this.params, isActive: this.isActive, isType: this.isType }})
    },
    implementationGetParams() {
      return { ...this.params }
    },
    handleClick(item, index) {
      if (this.isType !== index) {
        this.isType = index
        this.params.matchType = item.value
        this.onRefresh()
      }
    },
    handleChange(value, index) {
      if (this.isActive !== index) {
        this.isActive = index
        this.params.sortBy = value
        this.onRefresh()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-header-filter {
  font-size: 16px;
  color: #fff;
  background: #fff;
  line-height: 26px;
  border-top: 1px solid #EBEBEB;
  .tabs{
    font-size: 13px;
    line-height: 38px;
     .tab{
       color: #333;
       padding: 15px 28px;
       font-weight: 600;
       &.active{
         color: #11B894;
       }
     }
  }
  .buttons {
    color: #666;
    .button {
      font-size: 12px;
      text-align: center;
      margin: 5px;
      line-height: 24px;
      background: #f8f8f8;
      border-radius: 4px;
      &.active {
        color: #fff;
        background: #21d4ad;
      }
    }
  }
}
</style>

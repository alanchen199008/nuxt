<template>
  <div>
    <div class="expert-top">
      <div class="filter-bar" flex="main:center">
        <div class="tabs" flex="cross:center box:mean">
          <span
            v-for="(item, index) in tabs"
            :key="index"
            :class="isActive === index ? 'active' : ''"
            @click="handleClick(item, index)"
          >{{ item.label }}</span>
        </div>
      </div>
    </div>
    <van-index-bar
      v-if="params.sortBy === '3'"
      class="scroll-touch"
      :sticky="false"
      :index-list="indexList"
      highlight-color="#ffffff"
    >
      <div v-for="(item,index) in items" :key="index">
        <van-index-anchor :index="item.index" />
        <specialist-item-index
          v-for="(e, i) in item.items"
          :key="e.expertId"
          :item="e"
          :i="i"
          :sort-by="params.sortBy"
          @click="goDetail"
        />
      </div>
    </van-index-bar>
    <van-pull-refresh
      v-else
      v-model="refreshing"
      class="scroll-touch"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error="loaderr"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <specialist-item
          v-for="(item,i) in items"
          :key="item.expertId"
          :item="item"
          :i="i"
          :sort-by="params.sortBy"
          @click="goDetail"
        />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import SpecialistItem from './SpecialistItem'
import SpecialistItemIndex from './SpecialistItemIndex'
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { getExpertRankList } from '@/api/expert'
export default {
  components: { SpecialistItem, SpecialistItemIndex },
  mixins: [usePullRefreshAndLoad(getExpertRankList)],
  data() {
    return {
      isActive: 0,
      tabs: [
        { name: '1', label: '周返还榜' },
        { name: '2', label: '周人气榜' },
        { name: '3', label: '全部' }
        // { value: 'week', label: '周榜', key: 0 },
        // { value: 'month', label: '月榜', key: 1 },
        // { value: 'quarter', label: '季榜', key: 2 }
      ],
      items: [],
      indexList: [],
      params: {
        // timeRange: 'week', // 周，月，季度: week, month, quarter;
        sortBy: '1' // 返还率：returnrate ，胜率：winrate;
        // recommend: true, // true 显示 false 隐藏
        // pageSize: 100,
        // currentPage: 1
      }
    }
  },
  watch: {
    $route() {
      this.indexList = []
      this.items = []
      if (this.isActive === 2) {
        this.getData()
      } else {
        this.onRefresh()
      }
    },
    'params.sortBy'(val) {
      this.items = []
      if (val === '3') {
        this.params.pageSize = 500
        this.params.currentPage = 1
        this.getData()
      } else {
        this.params.pageSize = 10
        this.params.currentPage = 1
        this.onRefresh()
      }
      this.tabs.map((item, index) => {
        if (item.name === val) {
          this.isActive = index
        }
        return item
      })
    }
  },
  methods: {
    getData() {
      this.indexList = []
      getExpertRankList(this.params)
        .then(([data, error]) => {
          if (!error) {
            let num = []
            let reg = /^[0-9]*$/
            data.map(t => {
              let f = this.pinyin.getCamelChars(t.nickname).split('')[0].toUpperCase()
              if (reg.test(f)) {
                num.push(f)
              } else {
                this.indexList.push(f)
              }
              return t
            })
            this.indexList = Array.from(new Set(this.indexList))
            this.indexList = this.indexList.sort()
            num = num.sort()
            this.indexList = this.indexList.concat(num)
            this.indexList.map(t => {
              let obj = { index: t, items: [] }
              this.items.push(obj)
              return t
            })
            this.items.map(item => {
              data.map(d => {
                let f = this.pinyin.getCamelChars(d.nickname).split('')[0].toUpperCase()
                if (f === item.index) {
                  item.items.push(d)
                }
                return d
              })
              return item
            })
          }
        })
    },
    handleClick(item, index) {
      if (this.isActive !== index) {
        this.isActive = index
        this.params.sortBy = item.name
      }
    },
    handleChange(name) {
      if (this.param.sortBy !== name) {
        this.params.sortBy = name
      }
    },
    toggleShow() {
      if (this.param.recommend) {
        this.params.recommend = false
        this.onRefresh()
      } else {
        this.param.recommend = true
        this.onRefresh()
      }
    },
    implementationGetParams() {
      const { sortby } = this.$route.params
      if (sortby) {
        this.params.sortBy = sortby
      }
      return { ...this.params }
    },
    goDetail(id) {
      this.$router.push({ name: 'ExpertDetail', params: { id, locale: this.$i18n.locale, params: this.params }})
    }
  }
}
</script>
<style lang="scss" scoped>
.filter-bar {
  width: 100%;
  background: #fff;
  padding: 10px 0;
  border-top: 1px solid #ebebeb;
  margin: 0 0 10px 0;
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
::v-deep .van-index-anchor {
  display: none;
}
::v-deep .van-index-bar {
  &__sidebar {
    background: rgba(255, 255, 255, 0.7);
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    padding: 6px 3px;
    .van-index-bar__index {
      padding: 0 3px;
      font-size: 12px;
      color: #666;
      width: 15px;
      height: 15px;
      transform: scale(0.83);
      &--active {
        border-radius: 15px;
        background: #ffc322;
      }
    }
  }
}
</style>

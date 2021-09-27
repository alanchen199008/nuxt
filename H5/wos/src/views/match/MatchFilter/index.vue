<template>
  <div flex="dir:top" class="match-filter">
    <van-nav-bar left-arrow title="赛事筛选" @click-left="$router.go(-1)" />
    <div class="match-filter-content">
      <div class="match-filter-main">

        <div class="competition">
          <!-- <div class="title" flex="box:mean cross:center">
            <div>
              <span>赛事</span>
              <small>已选<font>{{ matchTimes }}</font>场</small>
            </div>
            <div class="button-bar align-right">
              <button @click="handleSelectLevel()">一级</button>
              <button @click="handleSelectAll()">全选</button>
              <button @click="toggleSelect()">反选</button>
            </div>
          </div> -->
          <!-- <div class="tab-main van-hairline--bottom" flex="box:mean">
            <div>
              <van-tabs v-model.number="query.type" :before-change="handleTab">
                <van-tab
                  v-for="item in tabs"
                  :key="item.value"
                  :title="item.label"
                  :name="item.value"
                />
              </van-tabs>
            </div>
            <div />
          </div> -->
          <van-row type="flex" gutters="14" class="competition-list">
            <van-col v-for="(item, index) in items" :key="index" span="6">
              <button
                :class="item.active ? 'active' : ''"
                @click="handleClick(item)"
              >
                {{ item.competitionName }}
              </button>
            </van-col>
          </van-row>
        </div>
      </div>
    </div>
    <div class="match-filter-footer van-hairline--top">
      <div class="count-box">
        已选<span class="num">{{ matchTimes }}</span>场比赛
      </div>
      <!-- <van-radio-group class="filter-box" v-model="radio" direction="horizontal">
        <van-radio name="1">全选</van-radio>
        <van-radio name="2">五大联赛</van-radio>
      </van-radio-group> -->
      <div class="filter-box">
        <van-checkbox @click="handleSelectAll" v-model="selectAll" checked-color="#00B48DFF">全选</van-checkbox>
        <van-checkbox @click="handleSelectFive" v-model="selectFive" checked-color="#00B48DFF">五大联赛</van-checkbox>
      </div>
      <van-button type="primary" @click="handleSubmit">
        {{ $t("confirm") }}
      </van-button>
    </div>
  </div>
</template>

<script>
import { getCompetitionList, getFilterMatchCount } from '@/api/match'
import variables from '@/styles/variables.scss'

export default {
  name: 'MatchFilter',
  data() {
    return {
      // selectAll: false,
      selectFive: false,
      radio: 1,
      radios: [
        { value: true, label: '按比赛时间排序' },
        { value: false, label: '按联赛名称排序' }
      ],
      tabs: [
        { value: 1, label: '全部' },
        { value: 2, label: '足球' }
        // { value: 3, label: '北单' }
      ],
      filters: [
        { name: '1', title: '一级' },
        { name: '2', title: '全选' },
        { name: '3', title: '反选' }
      ],
      query: {
        type: this.type,
        order: true
      },
      computed: {
        type: '',
        matchType: null,
        ids: [],
        date: ''
      },
      params: {
        matchType: this.type,
        ids: []
        // order: true,
      },
      matchTimes: 0,
      items: [],
      filter: '',
      isActive: ''
    }
  },
  computed: {
    type: {
      get() {
        return this.$store.getters.mMatchType
      },
      set(value) {
        this.$store.dispatch('match/setMatchMatchType', value)
      }
    },
    checkedColor() {
      return variables.theme
    },
    selectAll: {
      get() {
        return this.params.ids.length == this.items.length
      },
      set(value) {
      }
    },
  },
  watch: {
    'params.matchType'(value) {
      this.query.type = this.computed.matchType = value
      this.getCount(this.computed)
    },
    'params.ids'(value) {
      this.computed.ids = value
      this.getCount(this.computed)
    }
  },
  created() {
    const cache = JSON.parse(sessionStorage.getItem('Match-Filter-Params'))
    const { count } = this.$route.params
    if (cache) {
      this.query.type = this.params.matchType = cache.matchType
      this.params.ids = cache.ids
      this.fetch()
    } else {
      this.query.type = this.params.matchType = this.type
      this.fetch()
    }
    if (count) {
      this.computed = { ...this.computed, ...count }
    }
  },
  methods: {
    fetch() {
      getCompetitionList(this.query).then(([data, err]) => {
        if (!err) {
          this.items = data.map(item => {
            this.$set(item, 'active', false)
            return item
          })
          this.items.map(item => {
            if (this.params.ids.length > 0) {
              this.params.ids.map(id => {
                if (id === item.competitionId) {
                  item.active = true
                }
                return id
              })
            }
          })
        }
      })
    },
    getCount(params) {
      getFilterMatchCount(params)
        .then(([data, error]) => {
          if (!error) {
            this.matchTimes = data.count
          }
        })
    },
    handleSort(value) {
      this.params.order = value
      this.query.order = value
      this.fetch()
    },
    onChange(flag) {
      if (flag === 0) {
        this.selection = this.items.map(o => o.competitionId)
      } else {
        this.selection = this.items.reduce((c, v) => {
          if (!this.selection.includes(v.competitionId)) {
            c.push(v.competitionId)
          }
          return c
        }, [])
      }
    },
    handleSelectLevel() {
      this.params.ids = []
      this.items.map(item => {
        if (item.level === 1) {
          item.active = true
          this.params.ids.push(item.competitionId)
        } else {
          item.active = false
        }
        return item
      })
    },
    handleSelectAll() {
      let isSelectAll = false
      if(this.selectAll === true){
        
      } else {
        this.selectFive = false 
        isSelectAll=true
        this.selectAll = true
      }
      this.params.ids = []
      this.items.map(item => {
        item.active = isSelectAll
        item.active && this.params.ids.push(item.competitionId)
        return item
      })
      
    },
    handleSelectFive() {
      if(this.selectFive === true){
        this.selectAll = false
      } else {

      }

      this.params.ids = []
      this.items.map(item => {
        if(item.bigFive === 1){
          item.active = this.selectFive
        }else{
          item.active = false
        }
        
        item.active && this.params.ids.push(item.competitionId)
        return item
      })
    },
    toggleSelect() {
      this.params.ids = []
      this.items.map(item => {
        if (item.active) {
          item.active = false
        } else {
          item.active = true
          this.params.ids.push(item.competitionId)
        }
        return item
      })
    },
    handleClick(item) {
      this.selectAll = false
      this.selectFive = false

      if (item.active) {
        item.active = false
        this.params.ids.map((id, index) => {
          if (item.competitionId === id) {
            this.params.ids.splice(index, 1)
          }
          return id
        })
      } else {
        item.active = true
        this.params.ids.push(item.competitionId)
      }
    },
    handleTab(name) {
      this.params.ids = []
      if (this.query.type !== name) {
        this.query.type = this.params.matchType = this.type = name
        this.fetch()
      }
    },
    handleSubmit() {
      sessionStorage.setItem('Match-Filter-Params', JSON.stringify(this.params))
      this.$router.push({ name: 'Match' })
    }
  }
}
</script>

<style lang="scss" scoped>
.match-filter {
  background: #f5f5f5;
  .match-filter-content {
    height: calc(100vh - 94px);
    overflow: hidden;
    .match-filter-main {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      .title {
        font-size: 14px;
        line-height: 48px;
        padding: 0 15px;
        color: #000;
        small {
          color: #999;
          font-size: 12px;
          font {
            color: #333;
          }
        }
        .button-bar {
          button {
            width: 50px;
            font-size: 14px;
            vertical-align: middle;
            color: #666;
            line-height: 24px;
            border-radius: 2px;
            background: #fff;
            &.active {
              background: #21d4ad;
              color: #fff;
            }
            &:nth-child(2) {
              margin: 0 5px 0 5px;
            }
          }
        }
      }
      .competition-list {
        background: #fff;
        padding: 15px 0;
        .van-col {
          text-align: center;
          line-height: 38px;
          button {
            width: 75px;
            font-size: 14px;
            vertical-align: middle;
            color: #333;
            line-height: 26px;
            border-radius: 13px;
            background: #f5f6f8;
            &.active {
              background: #21d4ad;
              color: #fff;
            }
          }
        }
      }
      .tab-main {
        background: #fff;
      }
    }
    .align-right {
      text-align: right;
    }
  }
  .match-filter-footer {
    padding: 0 10px;
    background: #fff;
    text-align: right;
    height: 54px;
    font-size: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    ::v-deep .van-button {
      vertical-align: middle;
      height: 37px;
      width: 80px;
      line-height: 37px;
      font-size: 16px;
    }
    .count-box{
      color: #A7A7A7FF;
      margin-right: 18px;
      .num{
        color: #F2B53DFF;
      }
    }
    .filter-box{
      font-size: 14px;
      display: flex;
      .van-checkbox{
        margin-right: 14px;
      }
      ::v-deep .van-radio__label,::v-deep .van-checkbox__label{
        color: #040404FF;
        margin-left: 5px;
      }
    }
  }
}
</style>

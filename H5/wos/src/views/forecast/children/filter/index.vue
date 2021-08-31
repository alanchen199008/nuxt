<template>
  <div class="forecast-filter">
    <van-nav-bar title="筛选" left-arrow @click-left="$router.back(-1)" />
    <div class="forecast-filter-content">
      <div class="forecast-filter-main">
        <div class="sort">
          <div class="title">赛事排序</div>
          <van-radio-group v-model="params.sort" @change="handleSort">
            <van-cell-group>
              <van-cell
                v-for="item in predictionResultList"
                :key="item.value"
                :title="item.name"
                clickable
                @click="params.sort = item.value"
              >
                <template #right-icon>
                  <van-radio :name="item.value" icon-size="16px" />
                </template>
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="competition">
          <div class="title" flex="box:mean cross:center">
            <div>
              <span>赛事</span>
              <small>已选 <font>{{ matchTimes }}</font> 场
              </small>
            </div>
            <div class="button-bar">
              <button @click="handleSelectLevel">一级</button>
              <button @click="handleSelectAll">全选</button>
              <button @click="toggleSelect">反选</button>
            </div>
          </div>
          <div class="tab-main van-hairline--bottom" flex="box:mean">
            <div>
              <van-tabs v-model="query.type" :before-change="handleTab">
                <van-tab
                  v-for="item in tabs"
                  :key="item.value"
                  :title="item.label"
                  :name="item.value"
                />
              </van-tabs>
            </div>
            <div />
          </div>
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
    <div class="forecast-filter-footer van-hairline--top">
      <van-button type="primary" @click="handleSubmit"> 确定 </van-button>
    </div>
  </div>
</template>

<script>
import { getCompetitionList, getFilterMatchCount } from '@/api/match'
import variables from '@/styles/variables.scss'
import { parseTime } from '@/utils'
export default {
  name: 'Forecastsetting',
  data() {
    return {
      params: {
        position: 0,
        sort: 1,
        type: 1,
        matchType: this.type,
        competitionIds: []
      },
      computed: {
        type: 3,
        matchType: this.type,
        ids: [],
        date: parseTime(new Date(), '{y}-{m}-{d}')
      },
      predictionResultList: [
        { value: 1, name: '按比赛时间排序' },
        // { value: 2, name: '按联赛名称排序' },
        { value: 3, name: '按 “可能” 从高到低' },
        { value: 4, name: '按 “可能” 从低到高' }
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
      items: [],
      filter: '',
      level: false,
      isActive: '',
      matchTimes: 0
    }
  },
  computed: {
    type: {
      get() {
        return this.$store.getters.forecastMatchType
      },
      set(value) {
        this.$store.dispatch('forecast/SetMatchType', value)
      }
    },
    checkedColor() {
      return variables.theme
    }
  },
  watch: {
    'params.matchType'(value) {
      this.computed.matchType = value
      this.getCount(this.computed)
    },
    'params.competitionIds'(value) {
      this.computed.ids = value
      this.getCount(this.computed)
    }
  },
  created() {
    const { params } = this.$route.params
    if (params) {
      this.params = { ...this.params, ...params }
      this.query.type = this.type
      this.fetch()
    } else {
      this.query.type = this.type
      this.fetch()
    }
  },
  methods: {
    fetch() {
      getCompetitionList(this.query)
        .then(([data, err]) => {
          if (!err) {
            this.items = data.map(item => {
              this.$set(item, 'active', false)
              return item
            })
            if (this.params.competitionIds.length > 0) {
              this.items.map(item => {
                this.params.competitionIds.map(id => {
                  if (id === item.competitionId) {
                    item.active = true
                  }
                  return id
                })
                return item
              })
            }
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
    handleSort(name) {
      this.params.prediction = name
      sessionStorage.setItem('Forecast-Filter-Sort', this.params.prediction)
    },
    handleTab(name) {
      this.params.competitionIds = []
      if (this.query.type !== name) {
        this.params.matchType = this.query.type = this.type = name
        this.fetch()
      }
    },
    handleSelectLevel() {
      this.params.competitionIds = []
      this.items.map(item => {
        if (item.level === 1) {
          item.active = true
          this.params.competitionIds.push(item.competitionId)
        } else {
          item.active = false
        }
        return item
      })
    },
    handleSelectAll() {
      this.params.competitionIds = []
      this.items.map(item => {
        item.active = true
        this.params.competitionIds.push(item.competitionId)
        return item
      })
    },
    toggleSelect() {
      this.params.competitionIds = []
      this.items.map(item => {
        if (item.active) {
          item.active = false
        } else {
          item.active = true
          this.params.competitionIds.push(item.competitionId)
        }
        return item
      })
    },
    handleClick(item) {
      this.filter = ''
      if (item.active) {
        item.active = false
        this.params.competitionIds.map((id, index) => {
          if (item.competitionId === id) {
            this.params.competitionIds.splice(index, 1)
          }
          return id
        })
      } else {
        item.active = true
        this.params.competitionIds.push(item.competitionId)
      }
    },
    handleSubmit() {
      this.$store.dispatch('forecast/SetParams', this.params)
      this.$router.push({ name: 'Forecast' })
    }
  }
}
</script>

<style lang="scss" scoped>
.forecast-filter {
  background-color: $--background-color-base;
  height:100vh;
  h2 {
    line-height: 45px;
    color: $--color-text-primary;
    font-weight: normal;
    font-size: 14px;
    padding-left: 25px;
  }

  .forecast-filter-content {
    height: calc(100vh - 96px);
    overflow: hidden;
    .forecast-filter-main {
      height: 100%;
      overflow-x: hidden;
      overflow-y: auto;
      ::v-deep .van-cell {
        padding: 14px 25px;
      }
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
        .button-bar{
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
            &:nth-child(2){
              margin: 0 5px 0 5px;
            }
          }
        }
      }
      .competition-list {
        background: #fff;
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
  }
  .forecast-filter-footer {
    padding: 0 10px;
    background: #fff;
    text-align: right;
    ::v-deep .van-button{
      vertical-align: middle;
      height: 35px;
      line-height: 35px;
    }
  }
}
</style>

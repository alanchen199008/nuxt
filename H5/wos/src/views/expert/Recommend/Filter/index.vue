<template>
  <div flex="dir:top">
    <van-nav-bar left-arrow title="方案筛选" @click-left="$router.back(-1)" />
    <div flex-box="1">
      <van-cell-group
        v-for="(item, i) in resource"
        :key="i"
        :title="item.title"
      >
        <van-cell>
          <div
            v-if="item.key !== 'ruleType'"
            class="filter-item-body"
            :class="`filter-item-body-${item.col || 4}`"
            flex="box:mean cross:center"
          >
            <div
              v-for="(button, index) in item.buttons"
              :key="button.key"
              class="filter-item-button"
            >
              <div
                class="button"
                :class="button.active ? 'active' : ''"
                @click="handleClick(item, index)"
              >
                {{ button.name }}
              </div>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
      <div class="match-list">
        <div class="van-cell-group__title" flex="box:mean cross:center ">
          <div>
            <span>赛事</span>
            <small>已选 <font>{{ count }}</font> 场</small>
          </div>
          <div class="button-bar">
            <button
              v-for="item in filters"
              :key="item.name"
              :class="isActive === item.name ? 'active' : ''"
              @click="onFilter(item.name)"
            >
              {{ item.title }}
            </button>
          </div>
        </div>
        <div class="van-cell-group">
          <div flex="box:mean cross:center">
            <van-tabs v-model="query.type" :before-change="handleTab">
              <van-tab
                v-for="item in tabs"
                :key="item.value"
                :title="item.label"
                :name="item.value"
              />
            </van-tabs>
            <div class="last" flex-box="0" />
          </div>
          <div class="button-content">
            <div class="button-main">
              <van-row type="flex" gutters="14" class="competition-list">
                <van-col v-for="(item, index) in items" :key="index" span="6">
                  <button
                    :class="item.active ? 'active' : ''"
                    @click="handleMatchClick(item)"
                  >
                    {{ item.competitionName }}
                  </button>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-footer van-hairline--top">
      <van-button type="primary" size="large" @click="handleComfirm">{{
        $t("confirm")
      }}</van-button>
    </div>
  </div>
</template>

<script>
import { getCompetitionList } from '@/api/match'
import variables from '@/styles/variables.scss'
export default {
  data() {
    return {
      filter: null,
      resource: [
        {
          title: '场数',
          key: 'articleSchedules',
          buttons: [
            { name: '全部', active: true, key: '0' },
            { name: '单场', active: false, key: '1' },
            { name: '串联', active: false, key: '2' }
          ]
        },
        {
          title: '是否收费',
          key: 'isCharge',
          buttons: [
            { name: '全部', active: true, key: '0' },
            { name: '收费', active: false, key: '1' },
            { name: '免费', active: false, key: '2' }
          ]
        },
        {
          title: '排序',
          key: 'rateSort',
          col: 2,
          buttons: [
            { name: '胜率从高到低', active: true, key: '1' },
            { name: '胜率从低到高', active: false, key: '2' }
          ]
        }
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
      params: {
        articleSchedules: '0',
        isCharge: '0',
        ruleType: '0',
        rateSort: '1',
        competitionId: []
      },
      query: {
        type: 1,
        order: true
      },
      items: [],
      level: false,
      isActive: ''
    }
  },
  computed: {
    checkColor() {
      return variables.primaryColor
    },
    count() {
      return this.params.competitionId.length
    }
  },
  created() {
    const params = JSON.parse(
      sessionStorage.getItem('Expert-Recommend-Filter')
    )
    if (params) {
      this.params = params
    }
    this.getMatch(this.query)
  },
  methods: {
    getMatch(data) {
      this.items = []
      getCompetitionList(data).then(([data, error]) => {
        if (!error) {
          this.items = data.map(item => {
            this.$set(item, 'active', false)
            return item
          })
          if (this.params.competitionId.length > 0) {
            this.items.map(item => {
              this.params.competitionId.map(id => {
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
    handleClick(item, i) {
      item.buttons.map((button, index) => {
        if (i === index) {
          button.active = true
          if (item.key === 'articleSchedules') {
            this.params.articleSchedules = button.key
            sessionStorage.setItem(
              'Expert-Recommend-Filter',
              JSON.stringify(this.params)
            )
          }
          if (item.key === 'isCharge') {
            this.params.isCharge = button.key
            sessionStorage.setItem(
              'Expert-Recommend-Filter',
              JSON.stringify(this.params)
            )
          }
          if (item.key === 'rateSort') {
            this.params.rateSort = button.key
            sessionStorage.setItem(
              'Expert-Recommend-Filter',
              JSON.stringify(this.params)
            )
          }
        } else {
          button.active = false
        }
        return item
      })
    },
    handleMatchClick(item) {
      if (!item.active) {
        item.active = true
        this.params.competitionId.push(item.competitionId)
        sessionStorage.setItem(
          'Expert-Recommend-Filter',
          JSON.stringify(this.params)
        )
      } else {
        item.active = false
        this.params.competitionId.map((c, i) => {
          if (item.competitionId === c) {
            this.params.competitionId = this.params.competitionId.splice(0, i)
          }
          return c
        })
        sessionStorage.setItem(
          'Expert-Recommend-Filter',
          JSON.stringify(this.params)
        )
      }
    },
    handleTab(name) {
      if (this.params.type !== name) {
        this.query.type = name
        this.params.ruleType = name
        this.getMatch(this.query)
        sessionStorage.setItem(
          'Expert-Recommend-Filter',
          JSON.stringify(this.params)
        )
      }
    },
    onFilter(name) {
      this.isActive = name
      if (name === '1') {
        this.params.competitionId = []
        this.items.map(item => {
          item.active = false
          if (item.level === 1) {
            item.active = true
            this.params.competitionId.push(item.competitionId)
          }
          return item
        })
        this.level = true
      }
      if (name === '2') {
        this.params.competitionId = []
        this.items.map(item => {
          item.active = true
          this.params.competitionId.push(item.competitionId)
          return item
        })
        this.level = false
      }
      if (name === '3' && !this.level) {
        this.items.map(item => {
          item.active = false
          this.params.competitionId = []
          return item
        })
      }
      if (name === '3' && this.level) {
        this.params.competitionId = []
        this.items.map(item => {
          item.active = false
          if (item.level !== 1) {
            item.active = true
            this.params.competitionId.push(item.competitionId)
          }
          return item
        })
      }
    },
    handleComfirm() {
      this.$router.push({
        name: 'Expert',
        params: {
          locale: this.$i18n.locale,
          params: this.params,
          tab: 'recommend'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$prefix-cls: filter-item;
.#{$prefix-cls} {
  padding: 0 15px;
  margin-top: 10px;
  &-head {
    font-size: 16px;
    line-height: 30px;
    font-weight: 500;
  }
  &-body {
    padding: 10px 0;
    margin: 0 -4px;
    font-size: 13px;
    & > .#{$prefix-cls}-button {
      padding: 0 4px;
      flex: 0 0 25%;
    }

    &-2 {
      & > .#{$prefix-cls}-button {
        flex: 0 1 50%;
      }
    }

    ::v-deep .van-tabs {
      .van-tabs__wrap {
        height: 42px;
        border-bottom: 1px solid #e8e8e8;
        .van-tabs__nav {
          width: 100%;
          display: inline-block;
          .van-tab {
            width: 84px;
            float: left;
            line-height: 42px;
          }
          .van-tabs__line {
            bottom: 16px;
          }
        }
      }
      .van-tabs__content {
        height: calc(100vh - 477px);
        overflow: hidden;
        .van-tab__pane {
          height: 100%;
          .match-main {
            height: 100%;
            overflow-x: hidden;
            overflow-y: auto;
          }
        }
      }
    }
  }
  &-button {
    height: 35px;
    line-height: 35px;
    text-align: center;
    &.van-col {
      margin: 10px 0 10px 0;
    }
    & > .button {
      background-color: #f6f6f6;
      border-radius: 35px;
      &.small {
        border-radius: 14px;
      }
      &.active {
        color: #fff;
        background: #00c8b0;
      }
    }
  }
}

.filter-footer {
  font-size: 14px;
  padding: 7px 10px;
  background-color: #fff;
  text-align: right;
  button {
    width: 90px;
    height: 35px;
    font-size: 16px;
    border-radius: 5px;
    color: #fff;
    border: none;
    background: url(~@/assets/public/button-gradient.png) center no-repeat;
    background-size: cover;
  }
}
::v-deep .van-tab--active {
  .van-tab__text {
    color: #21d4ad;
  }
}
::v-deep .van-cell-group__title {
  color: #333;
  background: #f5f5f5;
  padding: 0 15px;
  line-height: 46px;
}
.match-list {
  height: calc(100vh - 463px);
  overflow: hidden;
  ::v-deep .van-cell-group {
    height: calc(100% - 46px);
    overflow: hidden;
    &__title {
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
    .last {
      width: 25%;
      display: inline-block;
    }
    .button-content {
      height: calc(100% - 42px);
      overflow: hidden;
      .button-main {
        height: 100%;
        overflow-x: hidden;
        overflow-y: auto;
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
      }
    }
  }
}
</style>

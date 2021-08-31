<template>
  <div class="release-recommned fh" flex="dir:top box:justify">
    <van-nav-bar :title="title" left-arrow @click-left="$parent.prev()" />
    <van-pull-refresh v-model="refreshing" class="release-recommned-content scroll-touch" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :error="loaderr"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="item in resources" :key="item.matchId" class="list-item">
          <div class="item-top" flex="box:mean cross:center">
            <div class="item-left" flex="cross:center">
              <span class="tag">{{ item.competitionName }}</span>
              {{ item.matchTime | parseTime("{m}/{d} {h}:{i}") }}
            </div>
            <div class="item-right" flex="box:mean cross:center">
              <span>{{ item.homeTeamName }}</span>
              <span flex-box="0">VS</span>
              <span>{{ item.awayTeamName }}</span>
            </div>
          </div>
          <div class="item-bottom">
            <wos-select
              v-model="item.ruleCode"
              :options="item.rules"
              @change="ruleCode => _handleChange(ruleCode, item.matchId)"
            />
            <van-row gutter="8">
              <van-col v-for="button in getAttrListOptions(item.ruleCode, item)" :key="button.attributeCode" span="6">
                <button
                  :class="[button.active && 'active']"
                  :disabled="button.disabled"
                  @click="handleSelect(button, item)"
                >{{ button.attributeName }}</button>
                <span v-if="button.kindsValue" class="item-bottom-tag">{{ button.kindsValue }}</span>
              </van-col>

            </van-row>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
    <div class="release-recommned-footer" flex="box:last cross:center">
      <span>已选 {{ count }} 场</span>

      <van-button class="liner-gradient" @click="handleSubmit">下一步</van-button>
    </div>
  </div>
</template>

<script>
import usePullRefreshAndLoad from '@/mixins/usePullRefreshAndLoad'
import { getCompetitonMatchList } from '@/api/expert'

const MAX_MAPS = {
  '11': 2,
  '12': 2,
  '13': 1,
  '14': 1,
  '20': 3,
  '30': 3,
  '40': 3
}

function _formatItems(arr) {
  return arr.map(o => {
    const { rules, ...others } = o
    rules.unshift({ kindsValue: null, ruleCode: 'empty', ruleName: '空', attrList: [] })
    return {
      ...others,
      active: false,
      ruleCode: null,
      rules: rules.map(o => ({
        ...o,
        attrList: o.attrList.map(oo => ({
          ...oo,
          active: false,
          disabled: false,
          max: MAX_MAPS[o.ruleCode]
        }))
      }))
    }
  })
}

export default {
  mixins: [usePullRefreshAndLoad(getCompetitonMatchList)],
  data() {
    return {
      resources: [],
      params: {
        currentPage: 0,
        pageSize: 5
      }
    }
  },
  computed: {
    title() {
      return this.$parent.params.match.type === 2 ? '足球' : ' '
    },
    count() {
      return this.resources.filter(o => o.active).length
    }
  },
  methods: {
    implementationGetParams() {
      return { ...this.$parent.params.match, ...this.params }
    },
    implementationFetched({ items }, refreshType = 0) {
      if (refreshType === 0) {
        this.resources = _formatItems(items || [])
      } else {
        this.resources = this.resources.concat(_formatItems(items || []))
      }
    },
    getAttrListOptions(ruleCode, { rules, matchId }) {
      const tmp = rules.find(o => o.ruleCode === ruleCode)
      if (!tmp) return []
      const { attrList, ...others } = tmp
      return attrList.map(o => ({
        ...o,
        ...others
      }))
    },
    _handleChange(ruleCode, matchId) {
      this.resources.forEach(item => {
        if (item.matchId === matchId) {
          item.active = false
          item.rules = item.rules.map(rule => ({
            ...rule,
            attrList: rule.attrList.map(attr => ({
              ...attr,
              active: false,
              disabled: false
            }))
          }))
        }
      })
    },
    handleSelect({ attributeCode, active, disabled, max }, { matchId, ruleCode }) {
      if (disabled) return
      this.resources.forEach(item => {
        if (item.matchId === matchId) {
          item.rules.forEach(rule => {
            if (rule.ruleCode === ruleCode) {
              rule.attrList.forEach(attr => {
                if (attr.attributeCode === attributeCode) {
                  if (active) {
                    attr.active = false
                  } else {
                    attr.active = true
                  }
                }
              })
              const len = rule.attrList.filter(o => o.active).length
              item.active = !!len

              rule.attrList = rule.attrList.map(o => ({
                ...o,
                disabled: len === max ? !o.active : false
              }))
            }
          })
        }
      })
    },
    handleSubmit() {
      if (this.count === 0) {
        return this.$toast('至少选择一场赛事!')
      } else {
        let articles = []
        this.resources.forEach(item => {
          item.rules.forEach(rule => {
            if (item.ruleCode === rule.ruleCode && item.ruleCode !== 'empty') {
              const attrList = rule.attrList.filter(attr => attr.active).map(o => ({
                attributeType: o.attributeCode,
                ruleAttributeName: o.attributeName
              }))
              if (attrList.length) {
                articles.push({
                  ruleType: this.$parent.params.match.ballType,
                  competitionId: item.competitionId,
                  competitionName: item.competitionName,
                  matchId: item.matchId,
                  matchTime: item.matchTime,
                  homeTeamName: item.homeTeamName,
                  awayTeamName: item.awayTeamName,
                  ruleId: rule.ruleCode,
                  ruleName: rule.ruleName,
                  matchType: this.$parent.params.match.type,
                  kindsValue: rule.kindsValue,
                  attributeType: this.format(attrList, 'attributeType'),
                  ruleAttributeName: this.format(attrList, 'ruleAttributeName'),
                  attrList
                })
              }
            }
          })
        })
        this.$parent._handleSetArticle(articles)
        this.$parent.next()
      }
    },
    format(item, key) {
      let str = ''; let arr = []
      item.map(i => {
        if (key === 'attributeType') {
          arr.push(i.attributeType)
          str = arr.join(',')
        }
        if (key === 'ruleAttributeName') {
          arr.push(i.ruleAttributeName)
          str = arr.join(',')
        }
        return i
      })
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.release-recommned {
  .release-recommned-content {
    padding: 10px;
    .list-item {
      margin-bottom: 10px;
      background: #fff;
      box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      font-size: 13px;
      color: #666;
      .item-top {
        line-height: 40px;
        padding: 0 15px;
        .item-left {
        }
        .item-right {
          span {
            text-align: center;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            &:nth-child(2) {
              width: 20px;
            }
          }
        }
      }
      .item-bottom {
        line-height: 40px;
        padding: 10px 15px;
        border-top: 1px solid #f2f2f2;
        position: relative;
        &-tag {
          position: absolute;
          right: 0;
          top: 20px;
          border: 1px solid #ff7247;
          color: #ff7247;
          background: #fff;
          height: 20px;
          line-height: 20px;
          padding: 0 10px;
          margin-right: 8px;
          border-radius: 2px;
          font-size: 12px;
          display: inline-block;
        }
        .van-row {
          padding: 4px 0;
          .van-col--6 {
            text-align: center;
            button {
              width: 100%;
              line-height: 32px;
              font-size: 14px;
              color: #666;
              border-radius: 4px;
              &.active {
                background: #00c8b0;
                color: #fff;
              }
            }
          }
        }
      }
    }
  }
  .release-recommned-footer {
    border-top: 1px solid #ebebeb;
    background: #fff;
    font-size: 14px;
    padding: 7px 15px;
    color: #333;
    button {
      width: 90px;
      height: 35px;
      font-size: 16px;
      &.next {
        background: #00c8b0;
      }
    }
  }
}
</style>

<template>
  <div class="release-recommned fh" flex="dir:top box:justify">
     <van-nav-bar left-arrow @click-left="$parent.prev()"  @click-right="onClickRight">
        <template #title>
          选择赛事
        </template>
        <template #right>
          <img src="@/assets/expert/filter.png" width="18" height="18">
        </template>
      </van-nav-bar>
    <div class="release-recommned-content scroll-touch">
    <!-- <van-pull-refresh v-model="refreshing" class="release-recommned-content scroll-touch" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        :error="loaderr"
        @load="onLoad"
      > -->
        <div>
          <div v-for="(child,date) in resources" :key="date" class="release-match-group" :class="child.isActive?'current':''">
            <div class="release-match-group-hd">
              {{child.date}}&nbsp;&nbsp;周{{child.date | parseTime("{a}") }}&nbsp;&nbsp;共{{child.count}}场比赛&nbsp;&nbsp;已选{{child.actCount}}场
              <img class="more" src="~@/assets/expert/arrow.png" @click="handShowMore(child)" />
            </div>
            <div class="release-match-group-bd">
              <div class="release-match-group-item" v-for="(item,index) in child.child" :key="index">
                <van-checkbox v-model="item.select" @click="handSelect(item,child)" class="check" checked-color="#00B48DFF"></van-checkbox>
                <div class="release-match-group-item-row">
                  <div class="left">
                    <div style="flex:1">
                      <span style="color:#FF9E20FF">{{ item.competitionName }}</span>&nbsp;&nbsp;{{ item.issueNum }}
                    </div>{{ item.matchTime | parseTime("{m}-{d}") }}
                  </div>
                  <div class="center"></div>
                  <div class="right">
                    {{ item.matchTime | parseTime("{h}:{i}") }}  
                  </div>
                </div>
                <div class="release-match-group-item-row">
                  <div class="left">
                    <span class="teamname">
                      {{ item.homeTeamName }}   
                    </span>
                  </div>
                  <div class="center">VS</div>
                  <div class="right">
                    <span class="teamname">
                      {{ item.awayTeamName }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="item-top" flex="box:mean cross:center">
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
          </div> -->
        </div>
      <!-- </van-list> -->
    <!-- </van-pull-refresh> -->
    </div>
    <div class="release-recommned-footer" flex="box:last cross:center">
      <van-button class="liner-gradient" @click="handleSubmit">下一步</van-button>
    </div>
  </div>
</template>

<script>
import { getExpertMatchList } from '@/api/expert'

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

const rulesEnu = [
  {
    'ruleName': '胜平负',
    'ruleCode': '11',
    'attrList': [
      {
        'attributeName': '胜',
        'attributeCode': '1101'
      },
      {
        'attributeName': '平',
        'attributeCode': '1102'
      },
      {
        'attributeName': '负',
        'attributeCode': '1103'
      }
    ],
    'kindsValue': '主+0'
  },
  {
    'ruleName': '让球胜平负',
    'ruleCode': '12',
    'attrList': [
      {
        'attributeName': '胜',
        'attributeCode': '1201'
      },
      {
        'attributeName': '平',
        'attributeCode': '1202'
      },
      {
        'attributeName': '负',
        'attributeCode': '1203'
      }
    ],
    'kindsValue': '主+1'
  }
]

export default {
  // mixins: [usePullRefreshAndLoad(getExpertMatchList)],
  data() {
    return {
      resources: [],
      // params: {
      //   currentPage: 0,
      //   pageSize: 5
      // },
      params: {
        // "competitionIds": [
        //   1,
        //   59
        // ],
        ids: [],
        'matchType': 1//  1：全部； 2：竞彩 3：北单
        // "pageSize": 5,
        // "currentPage": 0,
      },
      articles: [],
      count: 0
      // {
      //   "ids": [],
      //   "matchType": 1,
      //   "x-tenant-code': '",
      //   "LANG': '"
      // }
    }
  },
  computed: {
    title() {
      return this.$parent.params?.match?.type === 2 ? '足球' : ' '
    }
    // count() {
    //   // return this.resources.filter(o => o.active).length
    // }
  },
  created() {
    let filterParams = sessionStorage.getItem('Match-Release-Filter-Params')
    if (filterParams) {
      this.params = Object.assign(this.params, JSON.parse(filterParams))
    }
    getExpertMatchList(this.params).then(
      ([data, error]) => {
        if (!error) {
          // this.resources = data
          console.log(this.formartData(data))
          this.resources = this.formartData(data)
        }
      }
    )
  },
  methods: {
    longpress(attrs) {
      let that = this
      attrs.list.forEach(function(item) {
        that.$set(item, 'select', false)
      })
      that.$set(attrs.item, 'select', true)
    },
    formartData(data) {
      let arr = []
      for (let item in data) {
        arr.push({
          date: item,
          child: data[item],
          isActive: false,
          actCount: 0,
          count: data[item].length
        })
      }
      return arr
    },
    handShowMore(val) {
      val.isActive = !val.isActive
    },
    handSelect(item, child) {
      if (item.select) {
        if (this.articles.length >= 3) {
          item.select = false
          return this.$toast('最多可选3场比赛!')
        }
        child.actCount++
        this.count++
        this.articles.push(item)
      } else {
        child.actCount--
        this.count--
        this.articles = this.articles.filter(function(art) {
          if (art.stageId !== item.stageId) return art
        })
      }
    },
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
        this.articles.map(function(item) {
          item.rules = rulesEnu
        })
        let rulesEnuArr = rulesEnu.map(function(o) {
          let { attrList, ...others } = o
          o = attrList.map(item => ({
            ...item,
            ...others
          }))
          return o
        })

        this.articles.forEach(item => {
          // item.spf = '2.300,3.250,2.700'
          let spfArr1 = item.spf?.split(',') || []
          item.spfArr = rulesEnuArr[0]
          item.spfArr = item.spfArr.map((o, i) => ({
            ...o,
            label: this.formatLabel(o),
            select: false,
            isHost: false,
            num: spfArr1[i]
          }))
          let rqArr = item.rq?.split(',') || []
          let [rqNum, ...rqArrOther] = rqArr
          item.rqNum = rqNum
          item.rqArr = rulesEnuArr[1]
          item.rqArr = item.rqArr.map((o, i) => ({
            ...o,
            label: this.formatLabel(o),
            select: false,
            isHost: false,
            kindsValue: '主' + item.rqNum,
            num: rqArrOther[i]
          }))
        })
        this.$parent._handleSetArticle(this.articles)
        this.$parent.next()
      }
    },
    formatLabel(o) {
      switch (o.attributeName) {
        case '负':
          return '客胜'
        case '胜':
          return '主胜'
        default :
          return o.attributeName
      }
    },
    handleSubmit1() {
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
                  ruleType: this.$parent.params.ballType,
                  competitionId: item.competitionId,
                  competitionName: item.competitionName,
                  matchId: item.matchId,
                  matchTime: item.matchTime,
                  homeTeamName: item.homeTeamName,
                  awayTeamName: item.awayTeamName,
                  ruleId: rule.ruleCode,
                  ruleName: rule.ruleName,
                  matchType: this.$parent.params.type,
                  kindsValue: rule.kindsValue,
                  attributeType: this.format(attrList, 'attributeType'),
                  ruleAttributeName: this.format(attrList, 'ruleAttributeName'),
                  attrList
                })
              }
            }
          })
        })
        this.$parent._handleSetArticle(this.articles)
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
    },
    onClickRight() {
      this.$router.push({ name: 'ExpertReleaseFiter' })
    }
  }
}
</script>

<style lang="scss" scoped>
.release-match-group {
  margin: 0 0 8px 0;
  font-size: 12px;
  &-hd {
    color: #007C61FF;
    line-height: 25px;
    background: #8ADAC9;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .more {
      width: 11px;
      height: 6px;
      // transform: rotate(-90deg);
      position: absolute;
      right: 10px;
    }
  }
  &-item {
    background: #FFFFFFFF;
    border-radius: 5px;
    margin-top: 8px;
    padding: 4px 12px;
    color: #333333FF;
    position: relative;
    .check{
      position: absolute;
      right: 10px;
      top: 50%;
      margin-top: -8px;
    }
    &-row{
      display: flex;
      padding: 4px 0;
      .left {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .teamname {
          text-align: right;
        }
      }
      .center {
        width: 32px;
        font-size: 15px;
        color: #CCCCCCFF;
        text-align: center;
        font-weight: bold;
      }
      .right {
        flex: 1;
      }
      .teamname {
        width: 110px;
        font-weight: bold;
      }
    }
  }
  &.current {
    .more {
      transform: rotate(-90deg);
    }
    .release-match-group-bd {
      display: none;
    }
  }
}
.release-recommned {
  .release-recommned-content {
    height: calc(100vh - 94px);
    padding: 8px 10px;
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
    background: #f6f6f6;
    font-size: 14px;
    padding: 0 14px;
    button {
      width: 100%;
      height: 46px;
      font-size: 16px;
      border-radius: 22px;
      &.next {
        background: #00c8b0;
      }
    }
  }
}
</style>

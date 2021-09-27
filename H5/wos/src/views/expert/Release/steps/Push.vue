<template>
  <div class="release-recommned">
    <div class="release-recommned-header">
      <van-nav-bar title="方案编辑" left-arrow @click-left="goBack" />
    </div>
    <div class="release-recommned-content scroll-touch">
      <!-- <van-list> -->
        <div style="padding:7px 10px 0">
          <div class="release-math-group"
            v-for="(item, index) in tmpList"
            :key="index"
            >
            <div class="release-math-group-hd">
              <span class="tag">{{ item.competitionName }}</span>&nbsp;&nbsp;
              周{{ item.matchTime | parseTime("{a}") }} {{ item.issueNum }}&nbsp;&nbsp;
              {{ item.matchTime | parseTime("{m}-{d} {h}:{i}") }}&nbsp;
            </div>
            <div class="release-math-group-bd">
              <div class="team-name">
                <span>{{ item.homeTeamName }}</span>
                <span class="team-name-tag">VS</span>
                <span>{{ item.awayTeamName }}</span>
              </div>
              <div class="btn-item">
                <van-button class="release-btn" :disabled="!item.spf" plain>
                  让球<br>0
                </van-button>
                <van-button class="release-btn" 
                  v-for="(rule, ruleIdx) in item.spfArr" 
                  :key="ruleIdx" :class="rule.select?'current':''" 
                  plain  v-longpress="longpress" 
                  :item="rule" 
                  :list="item.spfArr"
                  :mathItem="item"
                  :disabled="!item.spf"
                  @click="handleSelect(rule, item.spfArr)">
                  <span class="zt" v-show="rule.isHost">主推</span>
                  {{ rule.label }}<br>{{ rule.num || 0.00 }}
                </van-button>
              </div>
              <div class="btn-item">
                <van-button class="release-btn" :disabled="!item.rq" plain>
                  让球<br>{{ item.rqNum || 0 }}
                </van-button>
                <van-button class="release-btn" 
                  v-for="(rule, ruleIdx) in item.rqArr" 
                  :key="ruleIdx" :class="rule.select?'current':''" 
                  plain  v-longpress="longpress" 
                  :item="rule" 
                  :list="item.rqArr"
                  :mathItem="item"
                  :disabled="!item.rq"
                  @click="handleSelect(rule, item.rqArr)">
                  <span class="zt" v-show="rule.isHost">主推</span>
                  {{ rule.label }}<br>{{ rule.num || 0.00 }}
                </van-button>
              </div>
            </div>
          </div>
          <!-- <div class="item-top" flex="box:mean cross:center">
            <div class="item-left" flex-box="0" flex="cross:center">
              <span class="title">{{ item.competitionName }}</span>
              {{ item.matchTime | parseTime("{m}/{d} {h}:{i}") }}
            </div>
            <div class="item-right" flex="box:mean cross:center">
              <span class="home" flex-box="1">{{ item.homeTeamName }}</span>
              <span class="vs" flex-box="0">VS</span>
              <span class="away" flex-box="1">{{ item.awayTeamName }}</span>
            </div>
          </div>
          <div class="item-bottom" flex="box:mean cross:center">
            <span flex-box="0" class="rule-name">{{ item.ruleName }}</span><span
              class="attrs"
            ><button>{{ item.ruleAttributeName }}</button></span>
          </div> -->
        </div>
      <!-- </van-list> -->
      <div class="tip"><img src="~@/assets/expert/tip.png">小提示：长按可以设置选项为主推</div>
      <div class="release-area">
        <div class="release-area-hd">方案标题</div>
        <van-field
          rows="1"
          autosize
          maxlength="40"
          v-model="releaseForm.title"
          placeholder="请输入方案标题(40个字符以内)"
        />
        <div class="release-area-hd">方案内容</div>
        <van-field
          autosize
          type="textarea"
          v-model="releaseForm.content"
          maxlength="1600"
          placeholder="请输入方案内容(1600个字符以内)"
        />
      </div>
      <!-- <div class="release-content">
        <div class="release-item">
          <div class="item-title van-hairline--bottom">标题</div>
          <van-field v-model="releaseForm.title" placeholder="请输入方案标题,40个字符以内" maxlength="40" />
        </div>
        <div class="release-item">
          <div class="item-title van-hairline--bottom">内容</div>
          <van-field v-model="releaseForm.content" placeholder="请输入方案内容,1600个字符以内" type="textarea" maxlength="1600" />
        </div>
        <div class="release-item">
          <div class="item-title">所需球币</div>
          <div class="item-content">
            <van-radio-group v-model="isFree" @change="handleChange">
              <van-cell-group>
                <van-cell v-for="item in radios" :key="item.key">
                  <template #icon>
                    <van-radio :name="item.value">{{ item.label }}</van-radio>
                  </template>
                  <template v-if="item.value === 1" #title>
                    <van-field
                      v-model.number="releaseForm.goldnum"
                      type="number"
                      label-align="right"
                      input-align="center"
                      style="width:190px"
                      placeholder="0"
                      :disabled="isFree === 0"
                    >
                      <template #right-icon>球币</template>
                    </van-field>
                  </template>
                  <template v-if="item.value === 1" #right-icon>
                    <van-checkbox
                      v-show="isFree === 1"
                      v-model="isRefund"
                      @change="handleRefund"
                    >不中退</van-checkbox>
                  </template>
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
      </div> -->
    </div>
    <div class="release-recommned-footer" flex="box:last cross:center">
      <div class="chargebox">
        <van-checkbox v-model="isCharge">收费</van-checkbox>
        <van-field
          v-model.number="releaseForm.goldnum"
          type="number"
          label-align="right"
          input-align="center"
          placeholder="0"
          :disabled="!isCharge"
        >
        </van-field>
        球币
        <van-checkbox
          class="t"
          v-show="isCharge"
          v-model="isRefund"
          @change="handleRefund"
          shape="square"
        >不中退</van-checkbox>
      </div>
      <van-button class="liner-gradient" @click="handleRelease">发布</van-button>
    </div>
    <!-- <div class="release-recommned-footer" flex="cross:center">
      <button class="next" @click="handleRelease"> 确认发布 </button>
    </div> -->
  </div>
</template>

<script>
import { doSaveExpertArticle } from '@/api/expert'
import { parseTime } from '@/utils'

const rulesEnu = [
  {
    "ruleName": "胜平负",
    "ruleCode": "11",
    "attrList": [
      {
        "attributeName": "胜",
        "attributeCode": "1101"
      },
      {
        "attributeName": "平",
        "attributeCode": "1102"
      },
      {
        "attributeName": "负",
        "attributeCode": "1103"
      }
    ],
    "kindsValue": "主+0"
  },
  {
    "ruleName": "让球胜平负",
    "ruleCode": "12",
    "attrList": [
      {
        "attributeName": "胜",
        "attributeCode": "1201"
      },
      {
        "attributeName": "平",
        "attributeCode": "1202"
      },
      {
        "attributeName": "负",
        "attributeCode": "1203"
      }
    ],
    "kindsValue": "主+1"
  }
]
export default {
  data() {
    return {
      releaseForm: {
        ruleType: '1',
        tmpList: [],
        title: '',
        content: '',
        goldnum: 0,
        competitionId: 0
      },
      tmpList: [],
      radios: [
        // { value: 0, label: '免费', key: 0 },
        { value: 1, label: '收费', key: 0 }
      ],
      isFree: true,
      isRefund: true,
      isCharge: false
    }
  },
  computed: {
   
  },
  watch: {

  },
  created() {
    this.tmpList = JSON.parse(JSON.stringify(this.$parent.params.article))
    let competitionIds = this.tmpList.map(o => o.competitionId)
    this.tmpList.map(item => {
      // item.attrList.map(a => {
      //   this.releaseForm.tmpList.push({
      //     ruleType: item.ruleType,
      //     competitionId: item.competitionId,
      //     competitionName: item.competitionName,
      //     matchId: item.matchId,
      //     matchTime: item.matchTime,
      //     homeTeamName: item.homeTeamName,
      //     awayTeamName: item.awayTeamName,
      //     ruleId: item.ruleId,
      //     ruleName: item.ruleName,
      //     matchType: item.matchType,
      //     kindsValue: item.kindsValue,
      //     attributeType: a.attributeType,
      //     ruleAttributeName: a.ruleAttributeName
      //   })
      //   return a
      // })
      // competitionIds.push(item.competitionId)
      return item
    })
    this.releaseForm.competitionId = competitionIds.join(',')
  },
  methods: {
    handleSelect(item, list) {
      item.select = !item.select
      item.select && item.attributeName !== '平' && list.map(o => {
        if (o.attributeName !== '平' && o.attributeCode !== item.attributeCode) {
          o.select = false
          o.isHost = false
        }
      })
      if (item.select === false) {
        item.isHost = false
      }
    },
    radioSelect(e) {

    },
    longpress(attrs) {
      let that = this
      if (attrs.disabled) return
      this.setClearHost(attrs.mathItem)
      attrs.list.forEach(function(item){
        if(item.attributeCode !== attrs.item.attributeCode) that.$set(item, 'isHost', false)
      })
      that.$set(attrs.item, 'isHost', !attrs.item.isHost)
      !attrs.item.select && this.handleSelect(attrs.item, attrs.list)
    },
    setClearHost(item) {
      item.spfArr.forEach(o => o.isHost = false)
      item.rqArr.forEach(o => o.isHost = false)
    },
    goBack() {
      this.$parent.prev(-1)
    },
    handleChange(value) {
      if (value === 1) {
        this.$toast('暂不支持收费方案,敬请期待～')
        this.isFree = 0
        return
      }
      this.isFree = value
    },
    handleFree(value) {
      console.log(this.isFree)
      // this.isFree = (this.isFree === 0) ? 1 :0
      // if (value === 1) {
      //   this.$toast('暂不支持收费方案,敬请期待～')
      //   this.isFree = 0
      //   return
      // }
      // this.isFree = value
    },
    handleRefund(value) {
      this.$nextTick(() => {
        if (value) {
          this.releaseForm.isRefund = 1
        } else {
          this.releaseForm.isRefund = 2
        }
      })
    },
    handleRelease() {
      let that = this
      if (this.isFree === 1 && this.releaseForm.goldnum === 0) {
        return this.$toast('球币不能为0!')
      }
      if (this.releaseForm.title === '') {
        return this.$toast('请输入方案标题!')
      }
      if (this.releaseForm.content === '') {
        return this.$toast('请输入方案理由!')
      }
      that.releaseForm.tmpList = []
      this.tmpList.map(function(item) {
        item.spfArr.map(function(rule) {
          if (rule.select) {
            that.releaseForm.tmpList.push({
              ruleType: that.$parent.params.ballType,
              competitionId: item.competitionId,
              competitionName: item.competitionName,
              matchId: item.matchId,
              matchTime:  parseTime(item.matchTime, '{y}-{m}-{d} {h}:{i}:{s}'),
              homeTeamName: item.homeTeamName,
              awayTeamName: item.awayTeamName,
              ruleId: rule.ruleCode,
              ruleName: rule.ruleName,
              matchType: that.$parent.params.type,
              kindsValue: rule.kindsValue,
              attributeType: rule.attributeCode,
              ruleAttributeName: rule.attributeName,
              isHost: rule.isHost?1:0
            })
          }
        })

        item.rqArr.map(function(rule) {
          if (rule.select) {
            that.releaseForm.tmpList.push({
              ruleType: that.$parent.params.ballType,
              competitionId: item.competitionId,
              competitionName: item.competitionName,
              matchId: item.matchId,
              matchTime:  parseTime(item.matchTime, '{y}-{m}-{d} {h}:{i}:{s}'),
              homeTeamName: item.homeTeamName,
              awayTeamName: item.awayTeamName,
              ruleId: rule.ruleCode,
              ruleName: rule.ruleName,
              matchType: that.$parent.params.type,
              kindsValue: rule.kindsValue,
              attributeType: rule.attributeCode,
              ruleAttributeName: rule.attributeName,
              isHost: rule.isHost?1:0
            })
          }
        })
      })
      
      this.releaseForm = { ...this.releaseForm, isRefund: this.isRefund ? 2 : 1 }
      console.log(this.releaseForm)
      doSaveExpertArticle(this.releaseForm)
        .then(([data, error]) => {
          if (!error) {
            this.$toast('发布方案成功!')
            this.$router.push({ name: 'AccountRecommend' })
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.tip {
  font-size: 10px;
  color: #5F5F5FFF;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 12px;
    height: 12px;
    margin-right: 4px;
  }
}
.chargebox {
  display: flex;
  align-items: center;
  ::v-deep .van-field__control--center {
    color: #FF8331FF;
    border-radius: 4px;
    border: solid 1px #B9B9B9FF;
  }
  ::v-deep .van-field {
    padding: 0;
    margin: 0 8px 0 12px;
    width: 58px;
  }
  ::v-deep .van-checkbox__label {
    color: #585858FF;
    margin-left: 6px;
  }
  .t{
    margin-left: 14px;
    ::v-deep .van-checkbox__icon--checked .van-icon {
      color: #646464;
      background-color: #ffffff;
      border-color: #c0c0c0;
    }
  }
}
.release-math-group {
  background: #fff;
  border-radius: 5px;
  margin-bottom: 7px;
  padding: 0 6px;
  &-hd {
    // line-height: 26px;
    padding: 9px 0 6px 0;
    font-size: 11px;
    border-bottom: 1px solid #F4F4F4FF;
    .tag {
      color: #F88803FF;
    }
  }
  &-bd {
    padding: 0 10px 10px;
  }
  .team-name {
    font-size: 12px;
    font-weight: bold;
    color: #333333FF;
    display: flex;
    justify-content: center;
    padding: 12px 0;
    &-tag {
      width: 36px;
      font-size: 15px;
      color: #CCCCCCFF;
      text-align: center;
    }
  }
  .btn-item {
    display: flex;
    justify-content: space-around;
  }
  .release-btn {
    border-radius: 4px;
    width: 68px;
    margin: 0 6px 8px;
    border-color: #BBBBBBFF;
    .zt {
      border-radius: 0px 4px;
      background: #FFCA60FF;
      font-size: 8px;
      color: #FF4D4DFF;
      display: block;
      padding: 2px;
      position: absolute;
      top: -1px;
      right: 0;
    }
    &.van-button--disabled {
      background: #e8e8e8;
      border-color: #d4d4d4;
    }
    .van-button__text {
      color: #000000FF;
      font-size: 11px;
    }
    &.current {
      background: #21D4ADFF;
      border-color: #21D4ADFF;
      .van-button__text {
        color: #fff;
      }
      
    }
  }
}
.release-area{
  background: #fff;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 0 0 10px 0;
  margin: 7px 10px 10px;
  &-hd{
    font-size: 13px;
    padding: 12px 12px;
  }
  .van-cell {
    padding: 8px 14px;
    &::after {
      left: 5px;
      right: 5px;
    }
  }
}
.release-recommned {
  background: #f5f5f5;
  .release-recommned-content {
    height: calc(100vh - 94px);
    .van-list {
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
            width: 45%;
            font-size: 12px;
            span.title {
              border: 1px solid #ff7247;
              color: #ff7247;
              background: #fff;
              line-height: 20px;
              padding: 0 4px;
              margin-right: 8px;
              border-radius: 2px;
            }
          }
          .item-right {
            text-align: center;
            span {
              color: #666;
              &.home{
                text-align: right;
              }
              &.vs{
                width: 40px;
                text-align: center;
              }
              &.away{
                text-align: left;
              }
            }
          }
        }
        .item-bottom {
          line-height: 40px;
          padding: 10px 15px;
          border-top: 1px solid #f2f2f2;
          .rule-name {
            width: 80px;
          }
          .attrs {
            text-align: right;
            button {
              line-height: 24px;
              font-size: 13px;
              color: #fff;
              border-radius: 2px;
              background: #00c8b0;
              padding: 0 19px;
            }
          }
        }
      }
    }
    .release-content {
      padding: 0 10px;
      .release-item {
        background: #fff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        margin-top: 10px;
        .item-title {
          font-size: 14px;
          padding: 0 15px;
          line-height: 34px;
          color: #666;
        }
        .item-content {
          background: #fff;
          ::v-deep .van-field__body {
            input {
              border: 1px solid #e6e6e6;
              margin: 0 6px 0 6px;
              text-align: center;
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
      border-radius: 20px;
      &.next {
        background: #00c8b0;
      }
    }
  }
}
</style>

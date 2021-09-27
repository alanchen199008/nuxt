<template>
  <div class="release-recommned">
    <div class="release-recommned-header">
      <van-nav-bar :title="title" left-arrow @click-left="goBack" />
    </div>
    <div class="release-recommned-content scroll-touch">
      <van-list>
        <div
          v-for="(item, index) in tmpList"
          :key="index"
          class="list-item"
        >
          <div class="item-top" flex="box:mean cross:center">
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
          </div>
        </div>
      </van-list>
      <div class="release-content">
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
      </div>
    </div>
    <div class="release-recommned-footer" flex="cross:center">
      <button class="next" @click="handleRelease"> 确认发布 </button>
    </div>
  </div>
</template>

<script>
import { doSaveExpertArticle } from '@/api/expert'
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
        { value: 0, label: '免费', key: 0 },
        { value: 1, label: '收费', key: 0 }
      ],
      isFree: 0,
      isRefund: true
    }
  },
  computed: {
    title() {
      return this.$parent.params.match.type === 2 ? '足球' : ' '
    }
  },
  watch: {

  },
  created() {
    this.tmpList = this.$parent.params.article
    let competitionIds = []
    this.tmpList.map(item => {
      item.attrList.map(a => {
        this.releaseForm.tmpList.push({
          ruleType: item.ruleType,
          competitionId: item.competitionId,
          competitionName: item.competitionName,
          matchId: item.matchId,
          matchTime: item.matchTime,
          homeTeamName: item.homeTeamName,
          awayTeamName: item.awayTeamName,
          ruleId: item.ruleId,
          ruleName: item.ruleName,
          matchType: item.matchType,
          kindsValue: item.kindsValue,
          attributeType: a.attributeType,
          ruleAttributeName: a.ruleAttributeName
        })
        return a
      })
      competitionIds.push(item.competitionId)
      return item
    })
    this.releaseForm.competitionId = competitionIds.join(',')
  },
  methods: {
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
      if (this.isFree === 1 && this.releaseForm.goldnum === 0) {
        return this.$toast('球币不能为0!')
      }
      if (this.releaseForm.title === '') {
        return this.$toast('请输入方案标题!')
      }
      if (this.releaseForm.content === '') {
        return this.$toast('请输入方案理由!')
      }
      this.releaseForm = { ...this.releaseForm, isRefund: this.isRefund ? 2 : 1 }
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
.release-recommned {
  background: #f5f5f5;
  .release-recommned-content {
    height: calc(100vh - 110px);
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
    padding: 12px 10px;
    color: #333;
    button {
      width: 100%;
      line-height: 40px;
      font-size: 18px;
      color: #fff;
      border-radius: 4px;
      &.next {
        background: #00c8b0;
      }
    }
  }
}
</style>

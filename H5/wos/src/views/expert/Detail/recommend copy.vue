<template>
  <div class="page" flex="dir:top">
    <van-nav-bar
      left-arrow
      title="方案详情"
      :border="false"
      style="background-color: transparent"
      @click-left="toBack"
    >
      <template #right>
        <font
          color="#FFFFFF"
          font-size="12px"
          style="text-decoration: underline; margin-right:8px;"
          @click="toService"
        >反馈</font>
      </template>
    </van-nav-bar>
    <div class="content">
      <div class="recommend-detail">
        <recommend-expert-panel :data="expert" />
        <recommend-expert-sell :data="sell" @finish="finish" />
        <recommend-match-list :data="matchs" />
        <recommend-description :data="description" />
      </div>
    </div>
    <div v-if="self" class="footer">
      <div v-if="articleStatus == 1" class="cancel" flex="cross:center box:last">
        <span>审核状态:审核中</span>
        <button flex-box="0" class="cancel-button" @click="handleCancel(articleId)">取消</button>
      </div>
      <div v-if="articleStatus === 2" class="total" flex="cross:center main:right">
        <span>购买人数:<font color="#333333">{{ buynum }}</font></span>
        <span>累计收益:<font color="#333333">{{ total }}</font></span>
      </div>
      <div v-if="articleStatus === 3" class="cancel"> <span>审核状态:未通过</span> </div>
      <div v-if="articleStatus === 4" class="cancel"> <span>审核状态:已取消</span> </div>
    </div>
    <div v-if="!buy && !expired && !free && !end && !self" class="footer">
      <div class="buyer" flex="cross:center box:last ">
        <div class="buyer-content">
          需支付
          <font color="#FF0000">
            <template v-if="sell.free">免费</template>
            <template v-else>{{ sell.goldnum }}球币</template>
          </font>
        </div>
        <button class="buyer-button" @click="handleConfirm">立即支付</button>
      </div>
    </div>
    <van-dialog
      v-model="isRecharge"
      show-cancel-button
      confirm-button-color="#333"
      :before-close="handleRecharge"
    >
      <div class="confirm-options">
        <span class="close-button" @click="isRecharge = false">&times;</span>
      </div>
      <div class="confirm-text">账户余额不足,是否充值?</div>
    </van-dialog>
    <van-dialog
      v-model="isConfirm"
      show-cancel-button
      confirm-button-color="#333"
      :before-close="handleBuyArticle"
    >
      <div class="confirm-options">
        <span class="close-button" @click="isConfirm = false">&times;</span>
      </div>
      <div class="confirm-text">是否购买当前方案?</div>
    </van-dialog>
    <silde-left-view />
  </div>
</template>
<script>
import { doCancelRecommend } from '@/api/account'
import { getExpertArticleDetail, buyArticle } from '@/api/expert'
import {
  RecommendExpertPanel,
  RecommendExpertSell,
  RecommendMatchList,
  RecommendDescription
} from './components'
import { mapGetters } from 'vuex'
export default {
  components: {
    RecommendExpertPanel,
    RecommendExpertSell,
    RecommendMatchList,
    RecommendDescription
  },
  data() {
    return {
      from: '',
      articleId: null,
      self: false,
      buy: false, // true 已购买  false 未购买
      expired: true, // true 过期  false 未过期
      free: false, // ture 免费 ； false 不免费
      end: false,
      expert: {
        avatar: '',
        expertId: null,
        positionName: '',
        positionLogo: '',
        nickname: '',
        winrate: '',
        returnrate: '',
        artcileNum: null,
        redNum: null,
        linkwin: null,
        articleSchedules: null,
        goldnum: null,
        concernFlag: false,
        self: false
      },
      matchs: {
        buy: false,
        self: false,
        free: false,
        expired: true,
        end: false,
        matchList: []
      },
      sell: {
        ruleType: null,
        articleSchedules: null,
        goldnum: null,
        buynum: null,
        restTime: 0,
        expired: true,
        self: false,
        free: false,
        buy: false,
        end: false,
        matchList: []
      },
      description: {
        content: '',
        self: false,
        buyFlag: null,
        free: false,
        expired: true,
        buy: false,
        end: false
      },
      buynum: 0,
      total: 0,
      isConfirm: false,
      isRecharge: false,
      articleStatus: null,
      back: {}
    }
  },
  computed: {
    ...mapGetters(['info', 'memberId'])
  },
  watch: {
    expired(value) {
      this.matchs.expired = this.sell.expired = this.description.expired = value
    },
    self(value) {
      this.matchs.self = this.expert.self = this.sell.self = this.description.self = value
    },
    free(value) {
      this.matchs.free = this.description.free = this.sell.free = value
    },
    buy(value) {
      this.matchs.buy = this.sell.buy = this.description.buy = value
    },
    end(value) {
      this.matchs.end = this.sell.end = this.description.end = value
    }
  },
  created() {
    const { id } = this.$route.params
    this.articleId = id
    this.getData({ articleId: this.articleId })
  },
  methods: {
    getData(params) {
      getExpertArticleDetail(params)
        .then(([data, error]) => {
          if (!error) {
            // 是否自己
            if (data.memberId === this.memberId) {
              this.self = true
            }
            // 是否过期
            if (data.restTime > 0) {
              this.expired = false
            }
            // 是否免费
            if (data.goldnum === '0') {
              this.free = true
            }
            // 是否购买
            if (data.buyFlag === 1) {
              this.buy = true
            }
            // 是否结束
            if (data.redBlack) {
              this.end = true
            }
            this.articleStatus = data.articleStatus
            this.buynum = data.buynum
            this.total = Number(data.goldnum) * data.buynum
            this.expert.articleId = this.articleId
            this.expert.avatar = data.avatar
            this.expert.expertId = data.expertId
            this.expert.positionLogo = data.positionLogo
            this.expert.positionName = data.positionName
            this.expert.concernFlag = data.concernFlag
            this.expert.nickname = data.nickname
            this.expert.winrate = data.winrate
            this.expert.returnrate = data.returnrate
            this.expert.linkwin = data.linkwin
            this.expert.artcileNum = data.artcileNum
            this.expert.redNum = data.redNum
            this.description.content = data.content.length > 0 ? data.content.replace(/\n/g, '<br>') : data.content
            this.description.goldnum = data.goldnum
            this.description.buyFlag = data.buyFlag
            this.sell.goldnum = data.goldnum
            this.sell.buynum = data.buynum
            this.sell.ruleType = data.ruleType
            this.sell.restTime = data.restTime * 1000
            this.sell.articleSchedules = data.articleSchedules
            this.sell.isRefund = data.isRefund
            this.sell.redBlack = data.redBlack
            this.sell.matchList = data.matchList
            this.sell.viewNum = data.viewNum
            this.matchs.matchList = data.matchList
          }
        })
    },
    finish(value) {
      this.expired = value
    },
    toBack() {
      this.$router.back(-1)
    },
    handleConfirm() {
      if (this.memberId) {
        const balance = Number(this.info.balance)
        const gold = Number(this.buy.goldnum)
        if (gold > balance) {
          this.isRecharge = true
        } else {
          this.isConfirm = true
        }
      } else {
        window.__GLOBAL.LoginControlDialog.open()
      }
    },
    handleRecharge(action, done) {
      if (action === 'confirm') {
        done()
        setTimeout(() => {
          this.$router.push({ name: 'AccountRecharge' })
        }, 500)
      } else {
        done()
      }
    },
    handleBuyArticle(action, done) {
      if (action === 'confirm') {
        buyArticle({ articleId: this.articleId, amount: this.sell.goldnum })
          .then(([data, error]) => {
            if (!error) {
              done()
              setTimeout(() => {
                this.$toast('购买成功')
                this.getData({ articleId: this.articleId })
              }, 500)
            } else {
              done()
              setTimeout(() => {
                this.$toast(error)
              }, 500)
            }
          })
      } else {
        done()
      }
    },
    toService() {
      if (this.memberId) {
        this.$router.push({ name: 'AccountFeedback' })
      } else {
        window.__GLOBAL.LoginControlDialog.open()
      }
    },
    handleCancel(id) {
      doCancelRecommend({ articleId: id })
        .then(([data, error]) => {
          if (!error) {
            this.$toast('取消方案成功!')
            this.toBack()
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.page {
  background: linear-gradient(45deg, #00d1cb 0%, #00a0e3 100%) no-repeat
    $--background-color-base;
    background-size: 100% 97px;
  ::v-deep .van-nav-bar {
    .van-nav-bar__title {
      color: #fff;
    }
    .van-icon {
      color: #fff;
    }
  }

  .content {
    overflow: hidden;
    height: calc(100vh - 44px);
    .recommend-detail {
      width: 100%;
      font-size: 14px;
      position: relative;
      z-index: 1;
      overflow-x: hidden;
      overflow-y: auto;
      height: 100%;
      .panel {
        background: #fff;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
        border-radius: 6px;
        margin-bottom: 10px;
        padding: 15px;
      }
    }
  }
  .footer {
    background: #fff;
    border-top: 1px solid #dedede;
    .cancel{
      font-size: 14px;
      span{
        text-align: center;
      }
      button {
        width: 30%;
        line-height: 51px;
        padding: 0 16px;
        background: #da3427;
        color: #fff;
        border-color: #da3427;
        &[disabled="disabled"] {
          background: #eeeeee;
          color: #999;
        }
        }
    }
    .total {
      font-size: 14px;
      line-height: 34px;
      span {
        margin-right: 40px;
        font {
          margin-left: 10px;
        }
      }
    }
    .buyer {
      font-size: 14px;
      padding:10px;
      .buyer-content {
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
        height: 36px;
        line-height: 36px;
        padding: 0 16px;
        color: #000;

      }
      button {
        line-height: 36px;
        padding: 0 16px;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        background: #da3427;
        color: #fff;
        border-color: #da3427;
        &[disabled="disabled"] {
          background: #eeeeee;
          color: #999;
        }
      }
    }
  }
  .confirm {
    &-options {
      text-align: right;
      padding: 10px;
      position: relative;
      .close-button {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 24px;
        height: 24px;
        display: inline-block;
        text-align: center;
        line-height: 24px;
        font-size: 24px;
      }
    }
    &-text {
      font-size: 21px;
      color: #333;
      text-align: center;
      line-height: 47px;
    }
  }
}
</style>

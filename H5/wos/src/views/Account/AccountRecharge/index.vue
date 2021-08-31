<template>
  <div class="recharge">
    <van-nav-bar left-arrow title="充值球币" @click-left="$router.back(-1)" />
    <div class="recharge-balance">
      <p>
        <img class="coin" src="@/assets/icons/coin.png" alt="">
        <span>球币余额</span>
      </p>
      <h1>{{ info.balance }}</h1>
    </div>
    <div class="recharge-fast">
      <div
        v-for="(item, index) in amountList"
        :key="index"
        class="recharge-fast-item"
        :class="isActive === index ? 'active' : ''"
        @click="handleClick(item)"
      >
        <div class="inner">
          <p class="text">{{ item }}球币</p>
          <span class="money">¥{{ item }}</span>
        </div>
      </div>
    </div>
    <div class="recharge-input">
      <van-field
        v-model.number="inputAmount"
        type="number"
        border
        placeholder="请输入购买球币数量"
      >
        <template #left-icon>
          <img-icon icon-name="gold" size="mini" />
        </template>
      </van-field>
    </div>
    <div class="recharge-type">
      <h2>选择支付方式</h2>
      <van-radio-group v-model="thirdAccountId" @change="handleChange">
        <van-cell-group :border="false">
          <van-cell
            v-for="item in onLine"
            :key="item.id"
            clickable
            @click="handleChannelChange(item)"
          >
            <template #title>
              <van-image
                :src="item.icon"
                round
                style="width:32px;height:32px; vertical-align: middle;"
              />
              {{ item.payPlatformName }}
            </template>
            <template #right-icon>
              <van-radio :name="item.id" icon-size="16px" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </div>
    <div class="recharge-total">
      <div class="total">
        合计应付: <font>{{ amount }}</font> 元
      </div>
      <div class="button-bar">
        <button :disabled="isDisabled" @click="handlePayment">支付</button>
      </div>
      <div class="agreement">
        <img-icon
          :icon-name="agreement ? 'checkbox-x' : 'checkbox-o'"
          size="mini"
          @click="handleAgreement"
        />
        <font
          :color="agreement ? '#999' : '#666'"
        >我已阅读并同意 <router-link :to="{name:'RechargeAgreement'}" :style=" agreement ? 'color:#999;' : 'color:#999;'">《充值协议服务》</router-link></font>
      </div>
    </div>
    <van-dialog
      v-model="isBind"
      show-cancel-button
      confirm-button-color="#333"
      confirm-button-text="去绑定"
      :before-close="handleBind"
    >
      <div class="confirm-options">
        <font>提示</font>
        <span class="close-button" @click="isBind = false">&times;</span>
      </div>
      <div class="confirm-text">请先绑定手机号码</div>
    </van-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getPaymentWay, getAmountList, postPayment } from '@/api/payment'
import { getUUID } from '@/utils'
export default {
  name: 'AccountRecharge',
  data() {
    return {
      agreement: true,
      isActive: null,
      amountList: [],
      onLine: [],
      isDisabled: false,
      maxAmount: null,
      minAmount: null,
      amount: '0.00',
      inputAmount: '',
      rechargeForm: {
        amount: 0,
        requestSeq: '',
        thirdAccountId: null
      },
      isBind: false,
      thirdAccountId: null,
      payPlatformName: ''
    }
  },
  computed: {
    ...mapGetters(['info'])
  },
  watch: {
    inputAmount(value) {
      this.isActive = null
      this.amountList.map((item, index) => {
        if (item === value) {
          this.isActive = index
        }
        return item
      })
      value ? this.amount = value : this.amount = '0.00'
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getPaymentWay(this.info.vipLevel).then(([data, error]) => {
        if (!error) {
          this.onLine = data.onLine
          this.$nextTick(() => {
            this.rechargeForm.thirdAccountId = this.onLine[0].id
            this.maxAmount = this.onLine[0].maxAmount
            this.minAmount = this.onLine[0].minAmount
            this.payPlatformName = this.onLine[0].payPlatformName
          })
        }
      })
      getAmountList().then(([data, error]) => {
        if (!error) {
          this.amountList = data
        }
      })
    },
    handleClick(item) {
      this.inputAmount = item
      this.amount = item
    },
    handleChange(name) {
      this.rechargeForm.thirdAccountId = name
    },
    handleChannelChange(item) {
      if (this.rechargeForm.thirdAccountId !== item.id) {
        this.rechargeForm.thirdAccountId = item.id
        this.maxAmount = item.maxAmount
        this.minAmount = item.minAmount
        this.payPlatformName = item.payPlatformName
      }
    },
    handlePayment() {
      if (!this.info.phone) {
        return (this.isBind = true)
      } else if (!this.agreement) {
        return this.$toast('请同意充值协议服务!')
      } else if (Number(this.amount) < Number(this.minAmount) || Number(this.amount) > Number(this.maxAmount)) {
        return this.$toast(this.payPlatformName + '转账限额:' + this.minAmount + '~' + this.maxAmount)
      } else if (this.amount === '0.00' || this.amount === '') {
        return this.$toast('请输入充值金额!')
      } else {
        this.rechargeForm.requestSeq = getUUID()
        this.rechargeForm.amount = Number(this.amount)
        this.isDisabled = true
        postPayment(this.rechargeForm)
          .then(([data, error]) => {
            if (!error) {
              window.location.href = data.payResult
            } else {
              this.isDisabled = false
            }
          })
      }
    },
    handleBind(action, done) {
      if (action === 'confirm') {
        done()
        setTimeout(() => {
          this.$router.push({ name: 'AccountMobile' })
        }, 500)
      } else {
        done()
      }
    },
    handleAgreement() {
      if (this.agreement) {
        this.agreement = false
      } else {
        this.agreement = true
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.recharge {
  background-color: white;
  &-balance {
    height: 105px;
    padding-top: 20px;
    background: linear-gradient(45deg, #00d1cb 0%, #00a0e3 100%);
    border-radius: 0px 0px 40px 40px;
    text-align: center;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.7);
    .coin {
      width: 15px;
      height: 15px;
      margin-right: 5px;
      vertical-align: middle;
    }
    h1 {
      @include DIN-FONT(40px, white);
    }
  }
  &-fast {
    display: flex;

    flex-wrap: wrap;
    padding: 0 20px;
    margin: 20px -3px 0;
    &-item {
      flex: 0 1 33.3333%;
      text-align: center;
      padding: 0 3px;
      margin-bottom: 6px;

      .inner {
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        height: 70px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
      }

      .money {
        font-size: 12px;
        color: $--color-text-secondary;
      }
      .text {
        font-size: 16px;
        color: $--color-text-primary;
        font-weight: bolder;
      }
      &.active {
        .inner {
          background: rgba(0, 200, 176, 0.08);
          border-color: #00c8b0;
        }
        .money {
          color: #ff0000;
        }
        .text {
          color: #00c8b0;
        }
      }
    }
  }
  &-type {
    font-size: 16px;
    h2 {
      color: #333;
      font-size: 16px;
      line-height: 42px;
      padding: 0 15px;
    }
    & ::v-deep .van-cell-group {
      & .van-cell {
        &:last-child {
          ::after {
            position: absolute;
            box-sizing: border-box;
            content: " ";
            pointer-events: none;
            right: 0.42667rem;
            bottom: 0;
            left: 0.42667rem;
            border-bottom: 0.02667rem solid #ebedf0;
            -webkit-transform: scaleY(0.5);
            -ms-transform: scaleY(0.5);
            transform: scaleY(0.5);
          }
        }
      }
    }
  }
  &-input {
    .img-icon {
      vertical-align: middle;
      margin-top: -4px;
    }
    ::v-deep .van-cell {
      .van-field__left-icon {
        ::after {
          position: absolute;
          box-sizing: border-box;
          content: " ";
          pointer-events: none;
          right: 0.42667rem;
          bottom: 0;
          left: 0.42667rem;
          border-bottom: 0.02667rem solid #ebedf0;
          -webkit-transform: scaleY(0.5);
          -ms-transform: scaleY(0.5);
          transform: scaleY(0.5);
        }
      }
    }
  }
  &-total {
    padding: 0 15px;
    .total {
      text-align: right;
      font-size: 14px;
      padding: 15px 0;
      color: #333;
      font {
        font-size: 18px;
        color: #ff0000;
        font-weight: bold;
      }
    }
    .button-bar {
      button {
        width: 100%;
        font-size: 18px;
        color: #fff;
        background: linear-gradient(90deg, #00d1cb 0%, #00a0e3 100%);
        border-radius: 4px;
        line-height: 46px;
      }
    }
    .agreement {
      font-size: 14px;
      line-height: 38px;
      .img-icon {
        margin-top: -2px;
        margin-right: 8px;
      }
    }
  }
  .confirm {
    &-options {
      text-align: right;
      padding: 10px;
      position: relative;
      text-align: center;
      font {
        font-size: 20px;
        color: #333;
      }
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
      font-size: 15px;
      color: #333;
      text-align: center;
      line-height: 47px;
    }
  }
}
</style>

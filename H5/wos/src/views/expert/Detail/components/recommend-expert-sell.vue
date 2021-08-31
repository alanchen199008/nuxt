<template>
  <div class="recommend-expert-buy">
    <div flex="box:first cross:center">
      <div class="recommend-expert-buy-left">
        <span>{{ data.ruleType === 1 ? "足球" : "篮球" }}</span>
        <span>{{
          data.articleSchedules === 1 ? "单场" : data.matchList.length + "串1"
        }}</span>
      </div>
      <div class="recommend-expert-buy-right" flex="cross:center main:right">
        <span
          v-if="!data.free && data.isRefund === 2"
          class="retreat"
        ><i>不中退</i></span>
        <span v-if="data.buy && !data.self">已购买</span>
        <span
          v-if="!data.free && !data.buy"
          class="gold"
        >{{ data.goldnum }}球币<img-icon icon-name="gold" size="mini" />
        </span>
        <span v-if="data.free" class="free">免费</span>
        <span
          v-if="data.redBlack"
          class="circle"
          :class="data.redBlack === 1 ? 'red' : 'black'"
        ><i>{{ data.redBlack === 1 ? "红" : "黑" }}</i></span>
      </div>
    </div>
    <div class="recommend-expert-buy-count-time" flex="cross:center box:mean">
      <span v-if="!data.buy && !data.expired && !data.free && !data.end">
        方案售卖倒计时
        <van-count-down
          :time="data.restTime"
          :style="{ color: '#ff0000', marginLeft: '8px', fontSize: '12px' }"
          @finish="finish"
        />
      </span>
      <span class="num" flex="cross:center main:right">
        <template v-if="data.buynum === 0">
          <van-icon name="eye" />
          <font color="#959595">{{
            data.viewNum >= 10000 ? "9999+" : data.viewNum
          }}</font>
        </template>
        <template v-else>
          <font color="#FF0000">已售</font>
          <font color="#959595">{{
            data.buynum >= 10000 ? "9999+" : data.buynum
          }}</font></template>
      </span>
    </div>
    <div v-if="data.expired" class="recommend-expert-buy-count-time">
      方案已过期
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecommendExpertBuy',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    finish() {
      let expired = true
      this.$emit('finish', expired)
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-expert-buy {
  line-height: 32px;
  margin-top: 10px;
  &-left {
    padding: 0 10px;
    span {
      display: inline-block;
      padding: 0 6px;
      border: 1px solid #ddd;
      border-radius: 2px;
      line-height: 18px;
      margin-right: 5px;
      font-size: 12px;
      background: #fff;
    }
  }
  &-right {
    text-align: right;
    padding: 0 10px;
    span {
      font-size: 12px;
      display: inline-block;
      margin: 0 4px 0 4px;
      &.gold {
        color: #05d66e;
        .img-icon {
          margin-top: -2px;
        }
      }
      &.free {
        color: #ff0000;
      }
      &.circle {
        width: 16px;
        height: 16px;
        line-height: 16px;
        border-radius: 50%;
        font-size: 10px;
        text-align: center;
        color: #fff;
        &.red {
          background: #ff0000;
        }
        &.black {
          background: #6f818d;
        }
        i {
          width: inherit;
          height: inherit;
          display: inline-block;
          font-style: normal;
          transform: scale(0.8);
        }
      }
      &.retreat {
        display: inline-block;
        background: #fff;
        border: 1px solid #ffdcd1;
        padding: 0 10px;
        line-height: 18px;
        border-radius: 9px;
        color: #ff0000;
        i {
          width: inherit;
          height: inherit;
          display: inline-block;
          font-style: normal;
          transform: scale(0.8);
        }
      }
    }
  }
  &-count-time {
    padding: 0 10px;
    font-size: 12px;
    .num {
      font-size: 12px;
      color: #959595;
      .van-icon {
        font-size: 14px;
        margin-right: 4px;
      }
    }
  }
}
</style>

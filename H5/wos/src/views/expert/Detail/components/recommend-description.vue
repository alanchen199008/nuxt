<template>
  <div>
    <div class="recommend-description">
      <h2><img-icon icon-name="hot" size="mini" /> 推荐理由</h2>
      <p v-if="data.free || data.buy || data.self || (data.expired && data.end)" v-html="data.content" />
      <!-- <p v-else class="buy-tip"><span class="buy-tip">购买后可见</span></p> -->
      <div v-else class="buy-tip">
        <div class="mask">
          据意大利记者佩杜拉透露，经纪人拉伊奥拉向国米推荐埃弗顿前锋摩西-基恩，但蓝黑军团专注于引进邓弗里斯。
          据意大利记者佩杜拉透露，经纪人拉伊奥拉向国米推荐埃弗顿前锋摩西-基恩，但蓝黑军团专注于引进邓弗里斯。
          据意大利记者佩杜拉透露，经纪人拉伊奥拉向国米推荐埃弗顿前锋摩西-基恩。
        </div>
        <div class="count-time-box">
          <div class="tx1">付费后可查看全部专业分析</div>
          <div class="tx2">距售卖截止还剩</div>
          <van-count-down v-if="data.time>0" :time="data.time" style="display:none" @change="CountTimeChange" />
          <div v-if="countDate" class="count-time">
            <span>{{ countDate.hoursArr[0] }}</span>
            <span>{{ countDate.hoursArr[1] }}</span>:<span>{{ countDate.minutesArr[0] }}</span>
            <span>{{ countDate.minutesArr[1] }}</span>:<span>{{ countDate.secondsArr[0] }}</span>
            <span>{{ countDate.secondsArr[1] }}</span>
          </div>
        </div>
      </div>
    </div>
    <p class="tip">
      <img-icon icon-name="info" size="mini" />
      所有言论仅代表发布者个人观点，与平台无关。 {{ data.from }}
    </p>
  </div>
</template>

<script>
function PrefixInteger(num, m) {
  return (Array(m).join(0) + num).slice(-m)
}
import { mapGetters } from 'vuex'
export default {
  name: 'RecommendDescription',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      // countDate: {
      //   housArr: [],
      //   minutesArr: [],
      //   secondsArr: []
      // }
      timeData: {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
    }
  },
  computed: {
    ...mapGetters(['memberId']),
    countDate() {
      return {
        hoursArr: PrefixInteger(this.timeData?.hours, 2).split(''),
        minutesArr: PrefixInteger(this.timeData?.minutes, 2).split(''),
        secondsArr: PrefixInteger(this.timeData?.seconds, 2).split('')
      }
    }
  },
  methods: {
    CountTimeChange(val) {
      this.timeData = val
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-description {
  background: #fff;
  padding: 10px 14px;
  h2 {
    font-size: 14px;
    color: #333;
    margin-bottom: 10px;
    .img-icon {
      margin-top: -4px;
    }
  }
}
 p {
  // padding: 10px 0;
  font-size: 13px;
  text-align: justify;
  &.tip {
    font-size: 12px;
    padding: 10px 14px 20px;
    background: #F5F5F5;
    color: #999999FF;
    .img-icon {
      margin-top: -4px;
    }
  }
}
.buy-tip {
  height: 130px;
  position: relative;
  text-align: center;
}
.mask {
  filter: blur(2px);
  padding: 10px 0;
  height: 130px;
  overflow: hidden;
  line-height: 25px;
  &::after {
    position: absolute;
    left: -14px;
    right: -14px;
    bottom: 0px;
    top: 0;
    background: #bababa;
    content: "";
    z-index: 4;
    opacity: 0.2;
  }
}
.count-time-box {
  z-index: 12;
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  bottom: 0;
  justify-content: center;
  width: 100%;
  // line-height: 22px;
  .tx1 {
    color: #F86503FF;
    font-size: 17px;
  }
  .tx2 {
    color: #666666FF;
    font-size: 12px;
    margin: 6px 0
  }
  .count-time {
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    line-height: 30px;
    width: 18px;
    height: 30px;
    border-radius: 3px;
    display: inline-block;
    background: url("~@/assets/expert/numbg.png") no-repeat;
    background-size: cover;
    text-align: center;
    color: #fff;
    margin: 0 1px;
  }
}
</style>

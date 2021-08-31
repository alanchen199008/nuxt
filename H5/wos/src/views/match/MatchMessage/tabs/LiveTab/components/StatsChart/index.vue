<template>
  <div class="stats-chart">
    <div class="header" flex="box:mean cross:center">
      <span class="home">{{ data.homeTeamName }}</span>
      <span class="away">{{ data.awayTeamName }}</span>
    </div>
    <div class="content" flex="box:mean cross:center">
      <div class="chart">
        <div>{{ attack.mark }}</div>
        <div flex="cross:center box:mean">
          <div class="home">{{ attack.home }}</div>
          <div class="circle" flex-box="0"> <van-circle
            v-model="attack.rate"
            :rate="attack.rate"
            color="#F7D15D"
            layer-color="#E6E6E6"
            size="42px"
            :stroke-width="140"
            :clockwise="false"
          /></div>
          <div class="away">{{ attack.away }}</div>
        </div>
      </div>
      <div class="chart">
        <div class="title">{{ danger.mark }}</div>
        <div flex="cross:center  box:mean">
          <div class="home">{{ danger.home }}</div>
          <div class="circle" flex-box="0">
            <van-circle
              v-model="danger.rate"
              :rate="danger.rate"
              color="#F7D15D"
              layer-color="#E6E6E6"
              size="42px"
              :stroke-width="140"
              :clockwise="false"
            /></div>
          <div class="away">{{ danger.away }}</div>
        </div>

      </div>
      <div class="chart">
        <div>{{ control.mark }}</div>
        <div flex="cross:center  box:mean">
          <div class="home">{{ control.home }}</div>
          <div class="circle" flex-box="0">
            <van-circle
              v-model="control.rate"
              :rate="control.rate"
              color="#F7D15D"
              layer-color="#E6E6E6"
              size="42px"
              :stroke-width="140"
              :clockwise="false"
            /></div>
          <div class="away">{{ control.away }}</div>
        </div>

      </div>
    </div>
    <div class="footer" flex="cross:center box:mean">
      <div class="home" flex="cross:center box:mean">
        <div><div><img src="~@/assets/event/2.png" alt=""></div><div>{{ cornerKick.home }}</div></div>
        <div><div><img src="~@/assets/event/4.png" alt=""></div><div>{{ redCard.home }}</div></div>
        <div><div><img src="~@/assets/event/3.png" alt=""></div><div>{{ yellowCard.home }}</div></div>
        <div>
          <div>{{ shootRight.home }}</div>
          <div>{{ shootOff.home }}</div>
        </div>
      </div>
      <div flex-box="0" class="middle">
        <div>
          <div class="process">
            <div class="title">{{ shootRight.mark ? shootRight.mark :'射正' }}球门</div>
            <van-progress track-color="#E6E6E6" color="#F7D15D" :percentage="shootRight.rate" :show-pivot="false" />
          </div>
        </div>
        <div>
          <div class="process">
            <div class="title">{{ shootOff.mark ? shootOff.mark : '射偏' }}球门</div>
            <van-progress track-color="#E6E6E6" color="#F7D15D" :percentage="shootOff.rate" :show-pivot="false" />
          </div>
        </div>
      </div>
      <div class="away" flex="cross:center box:mean">
        <div><div>{{ shootRight.away }}</div> <div>{{ shootOff.away }}</div></div>
        <div><div><img src="~@/assets/event/3.png" alt=""></div><div>{{ yellowCard.away }}</div></div>
        <div><div><img src="~@/assets/event/4.png" alt=""></div><div>{{ redCard.away }}</div></div>
        <div><div><img src="~@/assets/event/2.png" alt=""></div><div>{{ cornerKick.away }}</div></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatsChart',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      control: {
        home: 0,
        away: 0,
        rate: 0,
        mark: '控球率'
      },
      attack: {
        home: 0,
        away: 0,
        rate: 0,
        mark: '进攻'
      },
      danger: {
        home: 0,
        away: 0,
        rate: 0,
        mark: '危险进攻'
      },
      redCard: {
        home: 0,
        away: 0
      },
      yellowCard: {
        home: 0,
        away: 0
      },
      shootRight: {
        home: 0,
        away: 0,
        rate: 0
      }, // 射正
      shootOff: {
        home: 0,
        away: 0,
        rate: 0
      },
      cornerKick: {
        home: 0,
        away: 0
      }
    }
  },
  watch: {
    'data.stats'(stats) {
      stats.forEach(item => {
        if (item.status === 2) {
          this.cornerKick = item
        }
        if (item.status === 3) {
          this.yellowCard = item
        }
        if (item.status === 4) {
          this.redCard = item
        }
        if (item.status === 21) {
          this.shootRight = { ...item, rate: Number(parseFloat(item.home / (item.home + item.away) * 100).toFixed(2)) || 0 }
        }
        if (item.status === 22) {
          this.shootOff = { ...item, rate: Number(parseFloat(item.home / (item.home + item.away) * 100).toFixed(2)) || 0 }
        }
        if (item.status === 23) {
          this.attack = { ...item, rate: Number(parseFloat(item.home / (item.home + item.away) * 100).toFixed(2)) || 0 }
        }
        if (item.status === 24) {
          this.danger = { ...item, rate: Number(parseFloat(item.home / (item.home + item.away) * 100).toFixed(2)) || 0 }
        }
        if (item.status === 25) {
          this.control = { ...item, rate: Number(parseFloat(item.home / (item.home + item.away) * 100).toFixed(2)) || 0 }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.stats-chart {
  background: #fff;
  margin: 10px 0;
  .header {
    line-height: 40px;
    .home {
      padding: 0 10px;
      &::before {
        width: 3px;
        height: 15px;
        display: inline-block;
        background: #ff611b;
        content: "";
        border-radius: 1.5px;
        vertical-align: middle;
        margin-top: -2px;
        margin-right: 8px;
      }
    }
    .away {
      padding: 0 10px;
      text-align: right;
      &::after {
        width: 3px;
        height: 15px;
        display: inline-block;
        background: #6b94fd;
        content: "";
        border-radius: 1.5px;
        vertical-align: middle;
        margin-top: -2px;
        margin-left: 8px;
      }
    }
  }
  .content {
    .chart {
      padding: 10px;
      font-size: 13px;
      text-align: center;
      border-top: 1px solid #ededed;
      border-bottom: 1px solid #ededed;
      &:nth-child(2) {
        border-left: 1px solid #ededed;
        border-right: 1px solid #ededed;
      }
      .circle{
        width: 48px;
        text-align: center;
      }
    }
  }
  .footer{
    text-align: center;
    padding: 10px;
    .home,.away{
      div{
        line-height: 24px;
    img{
      width: 15px;
      height: 15px;
      vertical-align: middle;
      margin-top: -2px;
    }
      }
    }
    .process{
      width: 140px;
      top: -8px;
      position: relative;
      margin: 0 auto;
      .title{
        font-size: 12px;
      }
    }
    .middle{
      width: 167.5px;
    }
  }
}
</style>

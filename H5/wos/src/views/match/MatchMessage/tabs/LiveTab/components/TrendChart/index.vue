<template>
  <div class="trend-chart" flex="cross:center box:first">
    <div class="team-logo-small">
      <img :src="data.homeTeamLogo">
      <img :src="data.awayTeamLogo">
    </div>
    <div class="chart-warp">
      <div v-for="time in times" :key="time" class="line" :class="`time-${time}`" :style="{left: ((time / 90) * 100) + '%' }">
        <span class="time">
          <template v-if="time !== 45">{{ time }}'</template>
          <template v-else>HT</template>
        </span>
      </div>
      <div class="hv-bg-top">
        <div v-for="(item, i) in homeEvents" :key="item.time + i" class="event-item" :class="`event-${item.time}`" :style="{left: item.left + '%' }">
          <img :src="require(`@/assets/event/${item.type}.png`)">
        </div>
      </div>
      <div class="hv-bg-bottom">
        <div v-for="(item ,i) in awayEvents" :key="item.time + i" class="event-item" :class="`event-${item.time}`" :style="{left: item.left + '%' }">
          <img :src="require(`@/assets/event/${item.type}.png`)">
        </div>
      </div>
      <v-chart :options="options" class="chart" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrendChart',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      times: [0, 15, 30, 45, 60, 75, 90],
      options: {
        grid: {
          left: 0,
          top: 0,
          show: true,
          right: 0,
          height: '100%',
          borderWidth: 0
        },
        xAxis: {
          type: 'category',
          show: false,
          position: 'top'
        },
        yAxis: {
          max: 150,
          min: -150,
          show: false
        },
        series: [
          {
            type: 'line',
            data: this.data.trend,
            showSymbol: false,
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#f1d170' // 0% 处的颜色
                  },
                  { offset: 0.5, color: '#f1d170' },
                  { offset: 0.5, color: '#cccccc' },
                  {
                    offset: 1,
                    color: '#cccccc' // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            },
            lineStyle: {
              width: 0
            },
            markArea: {
              silent: true,
              data: [
                [
                  { yAxis: '0', itemStyle: { color: '#f1d170', opacity: 0.3 }},
                  { yAxis: '100' }
                ],
                [
                  { yAxis: '0', itemStyle: { color: '#cccccc', opacity: 0.3 }},
                  { yAxis: '-100' }
                ]
              ]
            }
          }
        ]
      },
      homeEvents: [],
      awayEvents: []
    }
  },
  watch: {
    'data.trend'() {
      this.options.series[0].data = this.data.trend
    },
    'data.homeEvents'(events) {
      this.homeEvents = events.map((item) => {
        return {
          time: item.time,
          type: item.type,
          left: (item.time / 90) * 100
        }
      })
    },
    'data.awayEvents'(events) {
      this.awayEvents = events.map((item) => {
        return {
          time: item.time,
          type: item.type,
          left: (item.time / 90) * 100
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.trend-chart {
  width: 100%;
  margin: 10px 0;
  background: #fff;
  .team-logo-small {
    width: 48px;
    text-align: center;
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    img {
      width: 16px;
      height: 16px;
    }
  }
}
.chart-warp {
  position: relative;
  margin: 20px 15px 12px 0;

  .line {
    position: absolute;
    top: 3px;
    bottom: 3px;
    width: 1px;
    background-color: #ebebee;
    color: #bbb;
    font-size: 12px;
    z-index: 2;
    .time {
      position: absolute;
      left: 50%;
      top: -20px;
      white-space: nowrap;
      transform: translateX(-50%) scale(.83333);
      font-size: 12px;
    }

    &.time-45 {
      background-color: #ffa03b;
      color: #ffa03b;
    }
    &.time-90 {
      background-color: #ffa03b;
      color: #ffa03b;
    }
  }

  .hv-bg-top,
  .hv-bg-bottom {
    height: 20px;
    margin: 20px 0 0 0;
    position: relative;

    .event-item {
      width: 10px;
      height: 10px;
      position: absolute;
      top: -70%;
      margin-left: -6px;
      z-index: 4;
      img {
        transition: 3s;
        transform-style: preserve-3d;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
      }
    }
  }

  .hv-bg-bottom {
    margin: 0 0 20px 0;
    .event-item {
      top: 110%;
    }
  }

  .chart {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    margin-top: -30px;
    z-index: 2;
    height: 60px;
    width: auto;
  }
}
</style>

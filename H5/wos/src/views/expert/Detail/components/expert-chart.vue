<template>
  <div class="expert-chart panel">
    <div class="panel-title" flex="main:right">
      <div class="switch" :class="!disabled ? 'show' : 'hide'">
        <template v-if="!disabled">
          <button
            v-for="(item, index) in buttons"
            :key="item.key"
            :class="isActive == index ? 'active' : ''"
            @click="handleSwitch(item.value, index)"
          >
            {{ item.label }}
          </button>
        </template>
        <template v-else>
          <button class="active">命中率</button>
        </template>
      </div>
    </div>
    <div class="chart-content">
      <v-chart
        ref="chart"
        :options="options"
        :autoresize="true"
        class="chart"
      />
    </div>
  </div>
</template>

<script>
import { getExpertDetail } from '@/api/expert'
export default {
  name: 'ExpertChart',
  props: {
    expertid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isActive: 0,
      buttons: [
        { label: '命中率', value: 'winrate', key: 0 },
        { label: '平均赔率', value: 'returnrate', key: 1 }
      ],
      hit: '',
      odds: '',
      options: {},
      disabled: false
    }
  },
  mounted() {
    this.getData({ expertId: this.expertid })
  },
  methods: {
    getData(data) {
      getExpertDetail(data).then(([data, error]) => {
        if (!error) {
          this.odds = this.getOddsData(data.avgOdds)
          this.hit = this.getHitData(data.rateList)
          this.isActive === 0
            ? this.initChart(this.hit)
            : this.initChart(this.odds)
          if (this.odds.xAxis.length < 3) {
            this.disabled = true
          }
        }
      })
    },
    initChart(data) {
      this.options = {
        grid: {
          top: '10%',
          left: '0.5%',
          bottom: '0.5%',
          height: 'auto',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: data.xAxis
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: this.isActive === 0 ? '{value}%' : '{value}'
          },
          splitLine: { show: false }
        },
        tooltip: {
          trigger: 'axis',
          formatter: this.isActive === 0 ? '{b}{c}%' : '{c}',
          backgroundColor: '#F91F1F',
          padding: 3,
          textStyle: {
            color: '#fff',
            fontSize: 12,
            height: 14
          },
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'none' // 默认为直线，可选为：’line’ | ‘shadow’
          },
          confine: true,
          position: (point, params, dom, rect, size) => {
            // 固定在顶部
            return [point[0], '10%']
          }
        },
        series: {
          data: data.series,
          type: 'line',
          smooth: 0.5,
          itemStyle: {
            color: '#F91F1F'
          },
          lineStyle: {
            color: '#F91F1F'
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.chart.dispatchAction({
          type: 'showTip',
          seriesIndex: 0, // 显示第几个series
          dataIndex: data.max // 显示最大的数据索引值
        })
      })
    },
    getOddsData(data) {
      let obj = {
        xAxis: [],
        series: [],
        max: ''
      }
      data.map((item, index) => {
        obj.xAxis.push(item.theMonth)
        obj.series.push(Number(item.returnRate / 100).toFixed(2))
        return item
      })
      obj.xAxis = obj.xAxis.reverse()
      obj.series = obj.series.reverse()
      obj.max = this.findMax(obj.series)
      return obj
    },
    getHitData(data) {
      let last = data.length - 1
      for (let i in data) {
        if (i < 6) {
          data.push(data[last])
          continue
        }
      }
      let obj = {
        xAxis: [],
        series: [],
        max: ''
      }
      data.map((item, index) => {
        if (index === 5) {
          obj.xAxis[0] = '近七场'
          obj.series[0] = Number(item * 100).toFixed(2)
        }
        if (index === 3) {
          obj.xAxis[1] = '近五场'
          obj.series[1] = Number(item * 100).toFixed(2)
        }
        if (index === 1) {
          obj.xAxis[2] = '近三场'
          obj.series[2] = Number(item * 100).toFixed(2)
        }
        if (index === 0) {
          obj.xAxis[3] = '近二场'
          obj.series[3] = Number(item * 100).toFixed(2)
        }
        return item
      })
      obj.max = this.findMax(obj.series)
      return obj
    },
    findMax(data) {
      let i
      const max = Math.max(...data)
      if (data.length < 1) {
        i = 0
      } else {
        data.map((item, index) => {
          if (max === item) {
            i = index
          }
          return item
        })
      }
      return i
    },
    handleSwitch(value, index) {
      if (this.isActive !== index) {
        this.isActive = index
        this.isActive === 1
          ? this.initChart(this.odds)
          : this.initChart(this.hit)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-chart {
  padding: 10px;
}
.switch {
  &.show {
    width: 150px;
    button{
    width: 50%;
    }
  }
  &.hide {
    width: 75px;
    button{
    width: 100%;
    }
  }
  height: 30px;
  border-radius: 14px;
  overflow: hidden;
  display: inline-block;
  background: #f5f5f5;
  button {
    font-size: 12px;
    line-height: 28px;
    border-radius: 14px;
    background: #f5f5f5;
    border: 1px solid transparent;
    color: #666;
    &.active {
      font-weight: 600;
      background: #fafafa;
      border: 1px solid transparent;
      box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
      transition: 0.2s ease-in-out;
    }
  }
}
.chart {
  width: 100%;
  height: 200px;
}
</style>

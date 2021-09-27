<template>
  <div class="forecast-tab-content">
    <div class="forecast-data" flex="box:first cross:top">
      <div class="forecast-chart" flex-box="0">
        <v-chart :options="options" class="chart" @click="handleClick" />
      </div>
      <div class="forecast-text">
        <div class="forecast-border">
          <table>
            <tr>
              <th>胜平负</th>
              <td>
                <span v-if="textData.result" v-html="textData.result" />
                <template v-else>暂无</template>
              </td>
            </tr>
            <tr>
              <th>比 分</th>
              <td>
                <span v-if="textData.score" v-html="textData.score" />
                <template v-else>暂无</template>
              </td>
            </tr>
            <tr>
              <th>半全场</th>
              <td>
                <span v-if="textData.halfResult" v-html="textData.halfResult" />
                <template v-else>暂无</template>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <wos-card title="重要提示">
      <!-- <div class="tips">
        <span>{{ tips.title ? tips.title : "暂无" }}</span>
        <template v-if="tips.homeWin.indexOf('undefined') > -1 && tips.draw.indexOf('undefined') > -1 && tips.awayWin.indexOf('undefined') > -1">
          暂无
        </template>
        <template v-else>
          <span
            :class=" tips.homeWin.indexOf('&darr;') > -1 ? 'down' : tips.homeWin.indexOf('&uarr;') > -1 ? 'up' : '' "
            v-html="tips.homeWin"
          >{{ tips.homeWin }}</span>
          <span
            class="van-hairline--left van-hairline--right"
            :class="
              tips.draw.indexOf('&darr;') > -1
                ? 'down'
                : tips.draw.indexOf('&uarr;') > -1
                  ? 'up'
                  : ''
            "
            v-html="tips.draw"
          />
          <span
            :class="
              tips.awayWin.indexOf('&darr;') > -1
                ? 'down'
                : tips.awayWin.indexOf('&uarr;') > -1
                  ? 'up'
                  : ''
            "
            v-html="tips.awayWin"
          />
          <span>{{ tips.desc }}</span>
        </template>
      </div> -->
      <div class="info-item">
        <div class="left">竞彩SP</div>
        <div class="right">2.15 3.30 2.87 主(-1)2.87 3.60 1.95</div>
      </div>
      <div class="info-item">
        <div class="left">欧赔</div>
        <div class="right tips">
          <template v-if="tips.homeWin.indexOf('undefined') > -1 && tips.draw.indexOf('undefined') > -1 && tips.awayWin.indexOf('undefined') > -1">
            暂无
          </template>
          <template v-else>
            <span
              :class=" tips.homeWin.indexOf('&darr;') > -1 ? 'down' : tips.homeWin.indexOf('&uarr;') > -1 ? 'up' : '' "
              v-html="tips.homeWin"
            >{{ tips.homeWin }}</span>
            <span
              class="van-hairline--left van-hairline--right"
              :class="
                tips.draw.indexOf('&darr;') > -1
                  ? 'down'
                  : tips.draw.indexOf('&uarr;') > -1
                    ? 'up'
                    : ''
              "
              v-html="tips.draw"
            />
            <span
              :class="
                tips.awayWin.indexOf('&darr;') > -1
                  ? 'down'
                  : tips.awayWin.indexOf('&uarr;') > -1
                    ? 'up'
                    : ''
              "
              v-html="tips.awayWin"
            />
            <span>{{ tips.desc }}</span>
          </template>
        </div>
      </div>
      <div class="info-item">
        <div class="left">防冷</div>
        <div class="right">客队过去14次巴甲打强队，有7次爆冷不败</div>
      </div>
      <div class="info-item">
        <div class="left">主状态</div>
        <div class="right">主队近6个主场场面占据上风</div>
      </div>
      <div class="info-item">
        <div class="left">客状态</div>
        <div class="right">客队近6个客场发挥不利</div>
      </div>
      <div class="info-item">
        <div class="left">攻防</div>
        <div class="right">主队防守不错，近4个主场仅丢1球</div>
      </div>
      <div class="info-item">
        <div class="left">伤停</div>
        <div class="right">客队主力守门员乔瓦尼尔蒂博</div>
      </div>
      <div class="info-item">
        <div class="left">规律</div>
        <div class="right">近76场相似盘口比赛，主胜占78%</div>
      </div>
      <div class="info-item">
        <div class="left">上半场</div>
        <div class="right">双方上半场有胶大可能打平</div>
      </div>
    </wos-card>
    <wos-card title="亚盘规律">
      <div class="info-item">
        <div class="left">赛果规律</div>
        <div class="right">胜38% 平33% 负29%</div>
      </div>
      <div class="info-item">
        <div class="left">客状态</div>
        <div class="right">客 -0.5 低水 上盘水位大升</div>
      </div>
      <div class="info-item">
        <div class="left">基本面</div>
        <div class="right">客队优势较大</div>
      </div>
      <div class="info-item">
        <div class="left">分析场次</div>
        <div class="right">10场</div>
      </div>
      <!-- <div class="info-item">
        <div class="left">推荐</div>
        <div class="right">-1负</div>
      </div> -->
    </wos-card>
    <wos-card title="欧盘规律">
      <div class="info-item">
        <div class="left">赛果规律</div>
        <div class="right">+1胜38% +1平33% +1负29%</div>
      </div>
      <div class="info-item">
        <div class="left">分析场次</div>
        <div class="right">66场(2017年以来竞彩)</div>
      </div>
    </wos-card>
    <!-- <wos-card title="本场盘口分析">暂无</wos-card> -->
    <wos-card title="本场基本面分析">
      <template v-if="textData.baseInfo">
        <div class="base-info" v-html="textData.baseInfo" />
      </template>
      <template v-else>
        暂无
      </template>
      <!-- </wos-card>
    <wos-card title="主队有利情报">
      <template v-if="homeFavorableInfo">
        <div class="base-info" v-html="homeFavorableInfo" />
      </template>
      <template v-else>
        暂无
      </template>
    </wos-card>
    <wos-card title="客队有利情报">
      <template v-if="awayFavorableInfo">
        <div class="base-info" v-html="awayFavorableInfo" />
      </template>
      <template v-else>
        暂无
      </template>
    </wos-card>
    <wos-card title="不利情报">
      <template v-if="adverseInfo">
        <div class="base-info" v-html="adverseInfo" />
      </template>
      <template v-else>
        暂无
      </template>
    </wos-card>
    <wos-card title="中立">
      <template v-if="neutralInfo">
        <div class="base-info" v-html="neutralInfo" />
      </template>
      <template v-else>
        暂无
      </template>
    </wos-card> -->
    </wos-card></div>
</template>

<script>
import WosCard from '@/components/WosCard'
import { rateFormat } from '@/utils'
import { getForecastDetail } from '@/api/forecast'
export default {
  name: 'ForecastTab',
  components: { WosCard },
  data() {
    return {
      textData: {},
      options: {},
      home: null,
      draw: null,
      away: null,
      max: null,
      text: '',
      subtext: '',
      homeFavorableInfo: '',
      awayFavorableInfo: '',
      adverseInfo: '',
      neutralInfo: '',
      tips: {
        title: '',
        homeWin: '',
        draw: '',
        awayWin: '',
        desc: ''
      }
    }
  },
  created() {
    const { type, id } = this.$route.params
    this.getData({ type: type || 1, matchId: id })
  },
  methods: {
    getData(params) {
      getForecastDetail(params).then(([data, error]) => {
        if (!error) {
          this.homeFavorableInfo = data.homeFavorableInfo
          this.awayFavorableInfo = data.awayFavorableInfo
          this.adverseInfo = data.adverseInfo
          this.neutralInfo = data.neutralInfo
          this.textData.baseInfo = data.baseInfo
          this.chartData = [{ name: '胜', value: String(Number(data.predictionWinRate) * 100) }, { name: '平', value: String(Number(data.predictionDrawRate) * 100) }, { name: '负', value: String(Number(data.predictionLoseRate) * 100) }]
          this.text = this.getTitle(data.predictionWinRate, data.predictionDrawRate, data.predictionLoseRate)[0]
          this.subtext = this.getTitle(data.predictionWinRate, data.predictionDrawRate, data.predictionLoseRate)[1]
          this.initChart(this.chartData, this.text, this.subtext)
          this.textData.result = this.getResult(data.predictionResult, data.hitResult)
          this.textData.halfResult = this.getHalfResult(
            data.predictionHalfResult,
            data.hitHalfResult
          )
          this.textData.score = this.getScore(
            data.predictionScore,
            data.hitScore
          )
          this.tips.title = this.getTips(0, data.inDesc)
          this.tips.homeWin =
            Number(this.getTips(1, data.inDesc)) > Number(data.homeWin)
              ? this.getTips(1, data.inDesc) + '&nbsp;&nbsp;&uarr;'
              : this.getTips(1, data.inDesc) + '&nbsp;&nbsp;&darr;'
          this.tips.draw = Number(
            this.getTips(2, data.inDesc) > Number(data.draw)
          )
            ? this.getTips(2, data.inDesc) + '&nbsp;&nbsp;&uarr;'
            : this.getTips(2, data.inDesc) + '&nbsp;&nbsp;&darr;'
          this.tips.awayWin =
            Number(this.getTips(3, data.inDesc)) > Number(data.awayWin)
              ? this.getTips(3, data.inDesc) + '&nbsp;&nbsp;&uarr;'
              : this.getTips(3, data.inDesc) + '&nbsp;&nbsp;&darr;'
          this.tips.desc = this.getTips(4, data.inDesc)
        }
      })
    },
    initChart(data, text, subtext) {
      this.options = {
        title: {
          show: true,
          text: text,
          subtext: subtext,
          textAlign: 'center',
          textStyle: {
            fontSize: 14,
            lineHeight: 12,
            color:
              subtext === '胜' ? '#E4615F' : subtext === '平' ? '#82d3a6' : '#658DF7'
          },
          subtextStyle: {
            fontSize: 12,
            lineHeight: 0,
            color: subtext === '胜' ? '#E4615F' : subtext === '平' ? '#82d3a6' : '#658DF7'
          },
          top: '25%',
          left: '48%'
        },
        legend: {
          width: '100%',
          left: 'center',
          bottom: '10%',
          icon: 'roundRect',
          itemWidth: 6, // 设置宽度
          itemHeight: 6, // 设置高度
          itemGap: 5, // 设置间距
          data: ['胜', '平', '负'],
          formatter: name => {
            var index = 0
            var clientlabels = ['胜', '平', '负']
            clientlabels.forEach(function(value, i) {
              if (value === name) {
                index = i
              }
            })
            return name + Number(data[index].value).toFixed(0) + '%'
          }
        },
        series: {
          type: 'pie',
          hoverAnimation: false,
          height: '100px',
          radius: ['50%', '90%'],
          top: 0,
          left: 'center',
          emphasis: {
            label: {
              show: false,
              fontSize: '12',
              fontWeight: 'bold',
              formatter: '{b}'
            }
          },
          label: {
            show: false,
            position: 'outer',
            alignTo: 'none',
            formatter: '{d}%\n\r{b}'
          },
          labelLine: { show: false },
          avoidLabelOverlap: false,
          data: data,
          color: ['#E4615F', '#82d3a6', '#658DF7']
        }
      }
    },
    getResult(data, hit) {
      let string = ''
      if (data === 1) {
        string =
          hit && data === hit ? '<font color="#ff0000">胜√</font>' : '胜'
      }
      if (data === 2) {
        string =
          hit && data === hit ? '<font color="#ff0000">平√</font>' : '平'
      }
      if (data === 3) {
        string =
          hit && data === hit ? '<font color="#ff0000">负√</font>' : '负'
      }
      if (data === 12) {
        let nums = data
          .toString()
          .split('')
          .map(_ => +_)
        string = '胜 、平'
        nums.map((i, index) => {
          if (hit === i && index === 0) {
            string = '<font color="#ff0000">胜√</font>、平'
          }
          if (hit === i && index === 1) {
            string = '胜 、<font color="#ff0000">平√</font>'
          }
          return i
        })
      }
      if (data === 13) {
        string = '胜 、负'
        let nums = data
          .toString()
          .split('')
          .map(_ => +_)
        nums.forEach((i, index) => {
          if (hit === i && index === 0) {
            string = '<font color="#ff0000">胜√</font>、负'
          }
          if (hit === i && index === 1) {
            string = '胜 、<font color="#ff0000">负√</font>'
          }
          return i
        })
      }
      if (data === 23) {
        let nums = data
          .toString()
          .split('')
          .map(_ => +_)
        string = '平 、负'
        nums.map((i, index) => {
          if (hit === i && index === 0) {
            string = '<font color="#ff0000">平√</font>、负'
          }
          if (hit === i && index === 1) {
            string = '平、 <font color="#ff0000">负√</font>'
          }
          return i
        })
      }
      return string
    },
    getScore(data, hit) {
      let string = ''
      let arr = []
      if (data && hit) {
        if (data.indexOf(',') > -1) {
          let array = data.split(',')
          array.map(item => {
            if (item === hit) {
              arr.push('<font color="#ff0000">' + item + '√</font>')
            } else {
              arr.push(item)
            }
            return item
          })
          string = arr.join('、')
        } else {
          if (data === hit) {
            string = '<font color="#ff0000">' + data + '√</font>'
          }
        }
      } else {
        string = data
      }
      return string
    },
    getHalfResult(data, hit) {
      let string = ''
      let arr = []
      if (data) {
        if (data.indexOf(',') > -1) {
          let array = data.split(',')
          array.map(item => {
            if (item === '11') {
              item === hit
                ? arr.push('<font color="#ff0000">胜胜√</font>')
                : arr.push('胜胜')
            }
            if (item === '12') {
              item === hit
                ? arr.push('<font color="#ff0000">胜平√</font>')
                : arr.push('胜平')
            }
            if (item === '13') {
              item === hit
                ? arr.push('<font color="#ff0000">胜负√</font>')
                : arr.push('胜负')
            }
            if (item === '21') {
              item === hit
                ? arr.push('<font color="#ff0000">平胜√</font>')
                : arr.push('平胜')
            }
            if (item === '22') {
              item === hit
                ? arr.push('<font color="#ff0000">平平√</font>')
                : arr.push('平平')
            }
            if (item === '23') {
              item === hit
                ? arr.push('<font color="#ff0000">平负√</font>')
                : arr.push('平负')
            }
            if (item === '31') {
              item === hit
                ? arr.push('<font color="#ff0000">负胜√</font>')
                : arr.push('负胜')
            }
            if (item === '32') {
              item === hit
                ? arr.push('<font color="#ff0000">负平√</font>')
                : arr.push('负平')
            }
            if (item === '33') {
              item === hit
                ? arr.push('<font color="#ff0000">负负√</font>')
                : arr.push('负负')
            }
            return item
          })
          string = arr.join('、')
        } else {
          if (data === '11') {
            string =
              data === hit ? '<font color="#ff0000">胜胜√</font>' : '胜胜'
          }
          if (data === '12') {
            string =
              data === hit ? '<font color="#ff0000">胜平√</font>' : '胜平'
          }
          if (data === '13') {
            string =
              data === hit ? '<font color="#ff0000">胜负√</font>' : '胜负'
          }
          if (data === '21') {
            string =
              data === hit ? '<font color="#ff0000">平胜√</font>' : '平胜'
          }
          if (data === '22') {
            string =
              data === hit ? '<font color="#ff0000">平平√</font>' : '平平'
          }
          if (data === '23') {
            string =
              data === hit ? '<font color="#ff0000">平负√</font>' : '平负'
          }
          if (data === '31') {
            string =
              data === hit ? '<font color="#ff0000">负胜√</font>' : '负胜'
          }
          if (data === '32') {
            string =
              data === hit ? '<font color="#ff0000">负平√</font>' : '负平'
          }
          if (data === '33') {
            string =
              data === hit ? '<font color="#ff0000">负负√</font>' : '负负'
          }
        }
      }
      return string
    },
    getTips(i, data) {
      if (!data) return
      const arr = data.split(':')
      return arr[i]
    },
    getTitle(homeRate, drawRate, awayRate) {
      let title = null
      let subtitle = ''
      this.home = Number(homeRate)
      this.draw = Number(drawRate)
      this.away = Number(awayRate)
      this.max = Math.max(this.home, this.draw, this.away)
      if (this.home === this.max && this.draw === this.max && this.away === this.max) {
        title = this.home.toString()
        subtitle = '胜'
        return [title, subtitle]
      }
      if (this.home === this.max) {
        title = rateFormat(this.home) || rateFormat('0')
        subtitle = '胜'
        return [title, subtitle]
      }
      if (this.draw === this.max) {
        title = rateFormat(this.draw) || rateFormat('0')
        subtitle = '平'
        return [title, subtitle]
      }
      if (this.away === this.max) {
        title = rateFormat(this.away) || rateFormat('0')
        subtitle = '负'
        return [title, subtitle]
      }
    },
    handleClick($el) {
      if ($el.name === '胜') {
        this.options.title.text = rateFormat(this.home)
        this.options.title.textStyle.color = '#E4615F'
        this.options.title.subtext = '胜'
        this.options.title.subtextStyle.color = '#E4615F'
      }
      if ($el.name === '平') {
        this.options.title.show = true
        this.options.title.text = rateFormat(this.draw)
        this.options.title.textStyle.color = '#82d3a6'
        this.options.title.subtext = '平'
        this.options.title.subtextStyle.color = '#82d3a6'
      }
      if ($el.name === '负') {
        this.options.title.text = rateFormat(this.away)
        this.options.title.textStyle.color = '#658DF7'
        this.options.title.subtext = '负'
        this.options.title.subtextStyle.color = '#658DF7'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-item {
  display: flex;
  font-size: 13px;
  padding: 6px 13px;
  // justify-content: space-between;
  .left {
    width: 60px;
    margin-right: 14px;
  }
  .right {
    color: #757575FF;
  }
}
.forecast-tab-content {
  background: #f5f5f5;
  padding: 10px 0;
  .forecast-data {
    background: #fff;
    padding: 10px;
    height: 140px;
    .forecast-chart {
      width: 167px;
      height: 125px;
      ::v-deep .echarts {
        width: inherit;
        height: inherit;
      }
    }
    .forecast-text {
      font-size: 13px;
      .forecast-border {
        border-radius: 6px;
        border: 1px solid #e0e0e0;
        overflow: hidden;
        table {
          width: calc(100% + 2px);
          border-collapse: collapse;
          margin: -1px -1px -1px -1px;
          th {
            width: 80px;
            color: #999;
            font-weight: normal;
            background: #fafafa;
          }
          td {
            color: #333;
          }
          td,
          th {
            border: 1px solid #e0e0e0;
            line-height: 36px;
            text-align: center;
            font-size: 13px;
          }
        }
      }
    }
  }
  .base-info {
    line-height: 24px;
  }
  .tips {
    span {
      // padding: 0 8px;
      margin-right: 4px;
      &.down {
        color: #74c03d;
      }
      &.up {
        color: #f34646;
      }
    }
  }
}
</style>

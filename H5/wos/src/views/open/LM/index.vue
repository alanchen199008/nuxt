<template>
  <div flex="dir:top" :class="mode === 0 ? 'd-container' : 'a-container'">
    <div class="scroll-touch">
      <div class="banner" :style="{backgroundImage:'url('+bannerImg+')'}">
      </div>
      <div class="matchs">
        <van-tabs animated border line-height="2px" title-active-color="#4ACC96" title-inactive-color="#333" class="match-tabs">
          <van-tab title="赛程">
            <div class="match-filter van-hairline--top-bottom">
              <div class="match-filter-main" flex="main:justify">
                <div class="match-filter-main_left" @click="preSelect" :class="selectModel.select.roundNum <= 1?'disabled':''"><van-icon name="arrow-left" />上一轮</div>
                <div class="match-filter-main_center" @click="selectModel.show=!selectModel.show">{{ selectModel.select.name }}<van-icon name="arrow" /></div>
                <div class="match-filter-main_right" @click="nextSelect" :class="selectModel.select.roundNum>=roundInfo.maxRound?'disabled':''">下一轮<van-icon name="arrow" /></div>
              </div>
            </div>
            <div class="match-list">
              <template v-if="items.length > 0">
                <match-item
                  v-for="(match, index) in items"
                  :key="index"
                  :item="match"
                />
              </template>
              <div v-else class="empty">暂无数据</div>
            </div>
            <div class="more van-hairline--top-bottom">
              <span @click="toLibrary('Instant')">查看更多 &gt;</span>
            </div>
          </van-tab>
          <van-tab title="积分榜">
            <table class="top-list">
              <tr>
                <th width="40">排名</th>
                <th>球队</th>
                <th width="24">赛</th>
                <th width="80">胜/平/负</th>
                <th width="40">进/失</th>
                <th width="24">净</th>
                <th width="48">积分</th>
              </tr>
              <tr v-for="(team, index) in groupTops" :key="index">
                <td><span class="position">{{ team.position }}</span></td>
                <td class="teamLogo"><img :src="team.teamLogo" alt="">{{ team.teamName }}</td>
                <td>{{ team.total }}</td>
                <td>{{ team.won + "/" + team.draw + "/" + team.loss }}</td>
                <td>{{ team.goals + "/" + team.goalsAgainst }}</td>
                <td>{{ team.goalDiff }}</td>
                <td>{{ team.points }}</td>
              </tr>
            </table>

            <div class="more van-hairline--top-bottom">
              <span @click="toLibrary('Top')">查看更多 &gt;</span>
            </div>
          </van-tab>
          <van-tab title="射手榜">
            <table class="top-list">
              <tr>
                <th width="115">球员</th>
                <th width="125">球队</th>
                <th width="85">进球/点球数</th>
              </tr>
              <tr v-for="(item, index) in shooterTops" :key="index" :class="index%2===0?'bg':''">
                <!-- <td><span class="position" :class=" index<=2 ? 'primary':'default'">{{ item.position }}</span></td> -->
                <td class="left">
                  <span class="position default">{{ item.position }}</span>
                  <!-- <img class="tx" src="~@/assets/LM/banner.png'/> -->
                  {{ item.player }}
                </td>
                <td>{{ item.teamName }}</td>
                <td>{{ item.goalNumber }}</td>
              </tr>
            </table>

            <div class="more van-hairline--top-bottom">
              <span @click="toLibrary('Shooter')">查看更多 &gt;</span>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="news">
        <van-tabs animated border title-active-color="#4ACC96" title-inactive-color="#333" line-height="2px">
          <van-tab title="精选方案">
            <div class="recommed-list">
              <template v-if="recommends.length > 0">
                <recommend-item
                  v-for="(item, index) in recommends"
                  :key="index"
                  :item="item"
                />
              </template>
              <div v-else class="empty">暂无数据</div>
            </div>
          </van-tab>
          <van-tab title="热门资讯">
            <template v-if="news.length > 0">
              <news-item
                v-for="item in news"
                :key="item.objectId"
                :item="item"
                @click="goDetail(id)"
              />
            </template>
            <div v-else class="empty">暂无数据</div>
          </van-tab>
        </van-tabs>
      </div>
      <LmSelect :select-model="selectModel" @select="handleClick" />
    </div>
  </div>
</template>

<script>
import { MatchItem, NewsItem, RecommendItem, LmSelect } from './components'
import { mapGetters } from 'vuex'
import {
  getNewsList,
  getExpertRecommendList
} from '@/api/eurocc'
import {
  getLMRoundInfo,
  getLMRoundFiveMatch,
  getLMRoundScoreRank,
  getLMRoundShoterRank
} from '@/api/lm'
import { param2Obj } from '@/utils'
//1：英超  2：意甲 3：西甲 4：德甲 5：法甲
const fiveMatchTypeEnu = {
  1: {
    newsCategoryId: '606443a827ee2b6a615c66d1',
    newsCategoryIdUat: '60e8192d7a76e45b77759720',
    competitionId: '82',
    bannerImg: 'banner1.png'
  },
  2: {
    newsCategoryId: '6064447e27ee2b6a615c66d3',
    newsCategoryIdUat: '60e819407a76e45b77759722',
    competitionId: '108',
    bannerImg: 'banner2.png'
  },
  3: {
    newsCategoryId: '606443de27ee2b6a615c66d2',
    newsCategoryIdUat: '60e819357a76e45b77759721',
    competitionId: '120',
    bannerImg: 'banner3.png'
  },
  4: {
    newsCategoryId: '606444be27ee2b6a615c66d5',
    newsCategoryIdUat: '60e819477a76e45b77759723',
    competitionId: '129',
    bannerImg: 'banner4.png'
  },
  5: {
    newsCategoryId: '6064469027ee2b6a615c66d6',
    newsCategoryIdUat: '60e8194e7a76e45b77759724',
    competitionId: '142',
    bannerImg: 'banner5.png'
  }
}
export default {
  components: { MatchItem, NewsItem, RecommendItem, LmSelect },
  props: {
    tabModel: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      selectModel: {
        show: false,
        actions: [],
        select: {}
      },
      roundInfo: {},
      matchType: this.$route.query.matchType || 1, //1：英超  2：意甲 3：西甲 4：德甲 5：法甲
      active: 0,
      params: {
        matchType: 0,
        sortBy: 'returnrate',
        articleSchedules: 0,
        isCharge: 0,
        ruleType: 0,
        competitionId: fiveMatchTypeEnu[this.$route.query.matchType] && fiveMatchTypeEnu[this.$route.query.matchType].competitionId || 82,
        rateSort: 1,
        pageSize: 100,
        currentPage: 1

      },
      matchTabs: [
        { label: '赛程', name: 'Instant' },
        { label: '积分榜', name: 'Top' },
        { label: '射手榜', name: 'Shooter' }
      ],
      buttons: [],
      items: [],
      groupTops: [],
      shooterTops: [],
      news: [],
      recommends: []
    }
  },
  computed: {
    ...mapGetters(['mode', 'instantMatchList']),
    bannerImg() {
      return require(`@/assets/LM/${fiveMatchTypeEnu[this.matchType || 1]?.bannerImg}`)
    }
  },
  watch: {
    instantMatchList(items) {
      this.items.map(item => {
        items.map(i => {
          if (item.matchId === i.matchId) {
            this.$set(item, 'awayCornerkick', i.awayCornerkick)
            this.$set(item, 'awayHalfScore', i.awayHalfScore)
            this.$set(item, 'awayRedCards', i.awayRedCards)
            this.$set(item, 'awayScore', i.awayScore)
            this.$set(item, 'awayYellowCards', i.awayYellowCards)
            this.$set(item, 'homeCornerkick', i.homeCornerkick)
            this.$set(item, 'homeHalfScore', i.homeHalfScore)
            this.$set(item, 'homeRedCards', i.homeRedCards)
            this.$set(item, 'homeScore', i.homeScore)
            this.$set(item, 'homeYellowCards', i.homeYellowCards)
            this.$set(item, 'kickoffTime', i.kickoffTime)
            this.$set(item, 'liveTime', i.liveTime)
            this.$set(item, 'status', i.status)
          }
          return i
        })
        return item
      })
    },
    tabModel:{ 
      deep:true, 
      handler:function(newV,oldV) {
        this.matchType = param2Obj(newV.value).matchType
        this.params.competitionId = fiveMatchTypeEnu[this.$route.query.matchType]?.competitionId || 82
        this.getData()
      }
    }
  },
  created() {
    if(this.tabModel?.value) {
      this.matchType = param2Obj(this.tabModel.value).matchType
      this.params.competitionId = fiveMatchTypeEnu[this.$route.query.matchType]?.competitionId || 82
    }
    this.getData()
    
  },
  mounted() {
    // this.subscribe()
  },
  beforeDestroy() {
    // this.unsubscribe()
  },
  methods: {
    preSelect() {
      if (this.selectModel.select.roundNum > 1) {
        this.selectModel.select.roundNum--
        this.selectModel.select.name = '联赛第' + this.selectModel.select.roundNum + '轮'
        this.getItems(this.selectModel.select.roundNum)
      }
    },
    nextSelect() {
      if (this.selectModel.select.roundNum && this.selectModel.select.roundNum < this.roundInfo.maxRound) {
        this.selectModel.select.roundNum++
        this.selectModel.select.name = '联赛第' + this.selectModel.select.roundNum + '轮'
        this.getItems(this.selectModel.select.roundNum)
      }
    },
    async getItems(round) {
      const [items] = await getLMRoundFiveMatch({ type: this.matchType, roundNum: round })
      this.items = items
    },
    async getData() {
      const [roundInfo] = await getLMRoundInfo({ type: this.matchType })
      this.roundInfo = roundInfo
      // round.maxRound
      for (let i = 1; i <= roundInfo.maxRound; i++) {
        let roundEl = {
          'name': '联赛第' + i + '轮',
          'roundNum': i
        }
        if (i === roundInfo.round) {
          roundEl.active = true
          this.selectModel.select = Object.assign({}, roundEl)
        }
        this.selectModel.actions.push(roundEl)
      }
      this.getItems(roundInfo.round)
      const [RoundRank] = await getLMRoundScoreRank({ type: this.matchType })
      this.groupTops = RoundRank.slice(0, 10)
      const [ShoterRank] = await getLMRoundShoterRank({ type: this.matchType })
      this.shooterTops = ShoterRank.splice(0, 10)

      let typeId = fiveMatchTypeEnu[this.matchType]?.newsCategoryId
      if( process.env.NODE_ENV !== 'production'){
        typeId = fiveMatchTypeEnu[this.matchType]?.newsCategoryIdUat
      }
      getNewsList({ typeId: typeId, pageSize: 100, currentPage: 1 })
        .then(
          ([data, error]) => {
            if (!error) {
              this.news = data.map(item => {
                let views = item.initReading + item.realReading
                this.$set(item, 'views', views)
                return item
              })
            }
          }
        )
      getExpertRecommendList(this.params).then(([data, error]) => {
        if (!error) {
          this.recommends = data
        }
      })
    },
    async handleClick(button, index) {
      this.selectModel.select = JSON.parse(JSON.stringify(button))
      this.getItems(button.roundNum)
    },
    getGroupName(num) {
      let string = ''
      if (num === 1) {
        string = 'A'
      } else if (num === 2) {
        string = 'B'
      } else if (num === 3) {
        string = 'C'
      } else if (num === 4) {
        string = 'D'
      } else if (num === 5) {
        string = 'E'
      } else if (num === 6) {
        string = 'F'
      } else if (num === 7) {
        string = 'G'
      } else if (num === 8) {
        string = 'H'
      } else if (num === 9) {
        string = 'I'
      } else if (num === 10) {
        string = 'J'
      } else if (num === 11) {
        string = 'K'
      } else if (num === 12) {
        string = 'L'
      } else if (num === 13) {
        string = 'M'
      } else if (num === 14) {
        string = 'N'
      } else if (num === 15) {
        string = 'O'
      } else if (num === 16) {
        string = 'P'
      } else {
        string = ''
      }
      return string
    },
    toLibrary(tab) {
      let url = window.location.protocol + '//' + window.location.host + '/#/home/' + 'LM-library?tab=' + tab + '&matchType=' + this.matchType + '&roundNum=' + this.selectModel.select.roundNum
      if (this.mode === 0 ) {
        this.$router.push({ name: 'LMLibrary', params: { tab }, query: { 'tab': tab,'matchType': this.matchType, 'roundNum': this.selectModel.select.roundNum }})
      }
      if (this.mode === 1) {
        // android
        window.android.openNewWebView(url + '&type=android')
      }
      if (this.mode === 2) {
        // ios
        window.webkit.messageHandlers.OpenFullScreenWebPage.postMessage({
          webUrl: url + '&type=ios'
        })
      }
    },
    subscribe() {
      this.$socket?.sendObj({
        cmdType: 'subscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.instant.match']
        }
      })
    },
    unsubscribe() {
      this.$socket.sendObj({
        cmdType: 'unsubscribe',
        data: {
          tenantCode: localStorage.getItem('tenant-code'),
          channelNames: ['football.instant.match']
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-container{font-size: 11px;}
.van-action-sheet__cancel{
    background: #21D4AD;
    color: #fff;
    margin: 10px 13px;
    width: auto;
    border-radius: 6px;
    font-size: 15px;
    height: 43px;
}
.LmS-item{
  font-size: 15px;
  color: #9D9D9D;
  height: 42px;
  line-height: 42px;
  text-align: center;
  &.current{
    border: solid 1px #eee;
    border-right: none;
    border-left: solid 3px #21D4AD;
    color: #ff0000;
  }
  &:active {
    background: rgba($color: #000000, $alpha: .05);
  }
}

.banner {
  width: 100%;
  // min-height: 13vh;
  min-height: 138px;
  // background: url(bannerImg) top center no-repeat;
  background-size: cover;
  img {
    width: 100%;
    visibility: hidden;
  }
}
.van-action-sheet{
  height: 320px;
}
.matchs {
  margin-bottom: 8px;
  .match-filter {
    width: 100%;
    background: #eff1f2;
    overflow: hidden;
    .match-filter-main {
      overflow-y: auto;
      white-space: nowrap;
      color: #6C6C6C;
      padding:13px;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      &_center{
        color: #4ACC96;
      }
      .disabled {
        color: #ddd;
      }
      button {
        border: 1px solid #acd5c4;
        line-height: 22px;
        width: 72px;
        border-radius: 18px;
        font-size: 14px;
        margin-right: 6px;
        &.default {
          color: #4acc96;
          background: #eff1f2;
        }
        &.primary {
          color: #fff;
          background: #4acc96;
          border-color: #4acc96;
        }
      }
    }
  }
  .more {
    font-size: 14px;
    text-align: center;
    background: #fff;
    line-height: 48px;
    color: #666;
  }
  .top-list {
    caption {
      font-size: 14px;
      background: #F1F3F4;
      color: #7A7A7A;
      line-height: 32px;
      font-weight: 600;
      padding: 0 8px;
    }
    width: 100%;
    table-layout: fixed;
    font-size: 12px;
    border-collapse: collapse;
    background: #fff;
    tr {
      &.bg{
        td{background: #F0F7F8;}
      }
      line-height: 32px;
      th {
        font-weight: normal;
        color: #6C6C6C;
        border-bottom: 1px solid #EFF1F2;
        background: #EFF1F2;
      }
      td {
        &.teamLogo{
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        &.left{
          text-align: left;
          display: flex;
          // align-items: baseline;
          align-items: center;
          // margin-right: 2px;
          .tx{
            width: 22px;
            height: 22px;
            border-radius: 22px;
          }
        }
        text-align: center;
        color: #585858;
        padding: 10px 4px;
        line-height: 1.2;
        border-bottom: 1px solid #EFF1F2;
        font-size: 11px;
        .position{
          text-align: center;
          // width: 22px;
          // line-height: 18px;
          min-width: 12px;
          height: 12px;
          color: #BAB8B8;
          font-size: 13px;
          border: 1px solid transparent;
          margin-right: 12px;
          border-radius: 12px;
          display: inline-block;
          &.default{
            background: #fff;
            border-color: #D0CECE;
            color: #A0A0A0;
            line-height: 11px;
            font-size: 8px;
            margin-left: 10px;
          }
          &.primary{
            background: #4ACC96;
            border-color: #4ACC96;
            color: #fff;
          }
        }
        img {
          width: 16px;
          height: 16px;
          vertical-align: middle;
          margin-top: -2px;
          margin-right: 4px;
        }
      }
    }
  }
  .match-list {
    background: #fff;
  }
  .match-tabs {
    margin-top: -15px;
    ::v-deep .van-tabs__wrap {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }
  }
}
.empty {
  text-align: center;
  font-size: 14px;
  padding: 12px;
  color: #888;
}
</style>

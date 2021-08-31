<template>
  <div flex="dir:top" :class="mode === 0 ? 'd-container' : 'a-container'">
    <div class="scroll-touch">
      <div class="banner">
        <img src="~@/assets/euro-cc/banner.png" alt="">
      </div>
      <div class="matchs">
        <van-tabs animated border line-height="2px" title-active-color="#4ACC96" title-inactive-color="#333" class="match-tabs">
          <van-tab title="赛程">
            <div class="match-filter van-hairline--top-bottom">
              <div class="match-filter-main">
                <button
                  v-for="(button, index) in buttons"
                  :key="index"
                  :class="active === index ? 'primary' : 'default'"
                  @click="handleClick(button, index)"
                >
                  {{ button.name }}
                </button>
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
            <table v-for="(item, i) in groupTops" :key="i" class="top-list">
              <caption>
                {{ item.title }}
              </caption>
              <tr>
                <th width="40">排名</th>
                <th>球队</th>
                <th width="24">赛</th>
                <th width="80">胜/平/负</th>
                <th width="40">进/失</th>
                <th width="24">净</th>
                <th width="48">积分</th>
              </tr>
              <tr v-for="(team, index) in item.items" :key="index">
                <td><span class="position" :class=" index<=2 ? 'primary':'default'">{{ team.position }}</span></td>
                <td><img :src="team.teamLogo" alt="">{{ team.teamName }}</td>
                <td>{{ team.total }}</td>
                <td>{{ team.won + "/" + team.draw + "/" + team.loss }}</td>
                <td>{{ team.goals + "/" + team.goalsAgainst }}/0</td>
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
                <th width="40">名次</th>
                <th>球员</th>
                <th width="100">国家</th>
                <th width="60">总进球</th>
              </tr>
              <tr v-for="(item, index) in shooterTops" :key="index">
                <td><span class="position" :class=" index<=2 ? 'primary':'default'">{{ team.position }}</span></td>
                <td>{{ item.player }}</td>
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
          <van-tab title="欧冠资讯">
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
    </div>
  </div>
</template>

<script>
import { MatchItem, NewsItem, RecommendItem } from './components'
import { mapGetters } from 'vuex'
import {
  getEuroCCAllInstant,
  getEuroCCInstant,
  getGroupTops,
  getShooterTops,
  getNewsList,
  getExpertRecommendList
} from '@/api/eurocc'
export default {
  components: { MatchItem, NewsItem, RecommendItem },
  data() {
    return {
      active: 0,
      params: {
        matchType: 2,
        sortBy: 'returnrate',
        articleSchedules: 0,
        isCharge: 0,
        ruleType: 0,
        competitionId: 46,
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
    ...mapGetters(['mode', 'instantMatchList'])
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
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    this.subscribe()
  },
  beforeDestroy() {
    this.unsubscribe()
  },
  methods: {
    getData() {
      getEuroCCAllInstant().then(([data, error]) => {
        if (!error) {
          this.buttons = data
        }
      })
      getEuroCCInstant({ stageId: 100 })
        .then(([data, error]) => {
          if (!error) {
            this.items = data.slice(0, 3)
          }
        })
      getGroupTops({ stageId: 46440 }).then(([data, error]) => {
        if (!error) {
          let title = Object.keys(data)
          let array = Object.values(data)
          let obj = {}
          title.map((item, index) => {
            array.map((team, i) => {
              if (index === i) {
                obj = {
                  title: this.getGroupName(Number(item)) + '组',
                  items: team,
                  key: i
                }
                // this.groupTops.push(obj)
              }
              return team
            })
            return item
          })
          // this.groupTops = this.groupTops.slice(0, 2)
        }
      })
      getShooterTops().then(([data, error]) => {
        if (!error) {
          // this.shooterTops = data.splice(0, 5)
        }
      })
      getNewsList({ typeId: '6064431027ee2b6a615c66cf', pageSize: 100, currentPage: 1 })
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
    handleClick(button, index) {
      if (button.stageId === 1) {
        return this.$toast('资格赛进行中')
      }
      getEuroCCInstant({ stageId: button.stageId }).then(([data, error]) => {
        if (!error) {
          this.active = index
          this.items = data.map(item => {
            this.$set(item, 'stageName', button.name + item.stageName)
            return item
          })
          this.items = this.items.slice(0, 3)
        }
      })
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
      let url = window.location.protocol + '//' + window.location.host + '/#/home/' + 'EuroCC-library?tab=' + tab
      if (this.mode === 0) {
        this.$router.push({ name: 'EuroCCLibrary', params: { tab }})
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
.banner {
  width: 100%;
  min-height: 13vh;
  background: url("~@/assets/euro-cc/banner.png") top center no-repeat;
  background-size: cover;
  img {
    width: 100%;
    visibility: hidden;
  }
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
      line-height: 0;
      padding:8px;
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
    font-size: 12px;
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
      line-height: 32px;
      th {
        font-weight: normal;
        border-bottom: 1px solid #EFF1F2;
      }
      td {
        text-align: center;
        color: #888;
        padding: 4px;
        border-bottom: 1px solid #EFF1F2;
        .position{
          text-align: center;
          width: 22px;
          line-height: 18px;
          border: 2px solid transparent;
          border-radius: 17px;
          display: inline-block;
          &.default{
            background: #fff;
            border-color: #D0CECE;
            color: #BAB8B8;
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
  .recommed-list {
  }
}
.empty {
  text-align: center;
  font-size: 14px;
  padding: 12px;
  color: #888;
}
</style>

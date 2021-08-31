<template>
  <div class="content listcontent">
    <div class="banner">
      <img src="@/assets/euro/banner.png" alt="">
    </div>
    <div class="match module">
      <van-tabs type="card" animated title-inactive-color="#6b71ea">
        <van-tab v-for="item in tabs" :key="item.key">
          <template #title>
            {{ item.value }}
          </template>
          <div
            v-for="(match, index) in item.matchs"
            :key="index"
            class="match-item"
            flex="cross:center box:mean"
            @click="toDetail(match.matchId)"
          >
            <div flex-box="0" class="match-date">
              {{ match.matchTime | parseTime("{m}月{d}日 {h}:{i}") }}
            </div>
            <div
              flex-box="1"
              flex="cross:center main:center box:mean"
              class="match-team"
            >
              <span
                class="home"
              >{{ match.homeTeamNameZh }}<img
                v-if="match.homeLogo"
                :src="match.homeLogo "
                alt=""
              ></span><span v-if="match.status === 8"><font color="#ff0000">{{ match.homeScore }}</font> : <font color="#ff0000">{{ match.awayScore }}</font></span><span v-else class="vs" flex-box="0">VS</span><span
                class="away"
              ><img
                v-if="match.awayLogo"
                :src="match.awayLogo"
                alt=""
              >{{ match.awayTeamNameZh }}</span>
            </div>
          </div>
        </van-tab>
      </van-tabs>
      <div class="footer">
        <span
          class="more"
          @click="toMore('Match')"
        >查看更多 <van-icon name="arrow" /></span>
      </div>
    </div>

    <div class="module">
      <img src="@/assets/euro/euro-match.png" style="width: 100%; object-fit: cover">
    </div>

    <div class="top module">
      <div class="title">积分榜</div>
      <van-tabs animated line-height="1">
        <van-tab v-for="item in groupTops" :key="item.key" :title="item.title">
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
            <tr v-for="(team, index) in item.items" :key="index">
              <td>{{ team.position }}</td>
              <td><img :src="team.teamLogo" alt="">{{ team.teamName }}</td>
              <td>{{ team.total }}</td>
              <td>{{ team.won + "/" + team.draw + "/" + team.loss }}</td>
              <td>{{ team.goals + "/" + team.goalsAgainst }}/0</td>
              <td>{{ team.goalDiff }}</td>
              <td>{{ team.points }}</td>
            </tr>
          </table>
        </van-tab>
      </van-tabs>
      <div class="footer">
        <span
          class="more"
          @click="toMore('top')"
        >查看全部 <van-icon
          name="arrow"
        /></span>
      </div>
    </div>
    <div class="top module">
      <div class="title">射手榜</div>
      <table class="top-list">
        <tr>
          <th width="40">名次</th>
          <th>球员</th>
          <th width="100">国家</th>
          <th width="60">总进球</th>
        </tr>
        <tr v-for="(item, index) in shooterTops" :key="index">
          <td>
            <font v-if="index <= 2" color="#6b71ea">{{ item.position }}</font>
            <template v-else>{{ item.position }}</template>
          </td>
          <td>{{ item.player }}</td>
          <td>{{ item.teamName }}</td>
          <td>{{ item.goalNumber }}</td>
        </tr>
      </table>

      <div class="footer">
        <span
          class="more"
          @click="toMore('shooter')"
        >查看全部 <van-icon
          name="arrow"
        /></span>
      </div>
    </div>
    <div class="top module">
      <div class="title">助攻榜</div>
      <table class="top-list">
        <tr>
          <th width="40">名次</th>
          <th>球员</th>
          <th width="100">国家</th>
          <th width="60">总助攻</th>
        </tr>
        <tr v-for="(item, index) in assistTops" :key="index">
          <td>
            <font v-if="index <= 2" color="#6b71ea">{{ item.position }}</font>
            <template v-else>{{ item.position }}</template>
          </td>
          <td>{{ item.player }}</td>
          <td>{{ item.teamName }}</td>
          <td>{{ item.assistNumber }}</td>
        </tr>
      </table>

      <div class="footer" />
    </div>
    <!-- <div class="public module">
      <div class="public-title" flex="cross:center box:mean">
        <div flex-box="0" class="icon">
          <img src="@/assets/euro/hot/1.png" alt="">
        </div>
        <div flex-box="1" class="main">前瞻速览</div>
        <div flex-box="0" class="more">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="public-content">
        <div class="public-main" flex="cross:center">
          <div class="empty" flex-box="1">暂无数据</div>
          <div class="thumb-item">
            <div class="thumb">
              <div
                class="img"
                :style="{
                  backgroundImage:
                    'url(https://m.leisu.com/_nuxt/img/hot-text.701060e.png)'
                }"
              />
            </div>
            <div class="thumb-title">
              法国队此次欧洲杯和上届欧洲杯冠军葡萄牙、国际大赛冠军常客德国和匈牙利分在同一小组，是名副其实的死亡之战。赛程来看，法国队需要在慕尼黑踢德国、在布达佩斯踢匈牙利和葡萄牙，小组前两场可以说都是在客场作战。
            </div>
            <div class="thumb-option"><van-icon name="eye" /> 9999+</div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="public module">
      <div class="public-title" flex="cross:center box:mean">
        <div flex-box="0" class="icon">
          <img src="@/assets/euro/hot/2.png" alt="">
        </div>
        <div flex-box="1" class="main">情报解析</div>
        <div flex-box="0" class="more">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="public-content">
        <div class="public-main" flex="cross:center">
          <div class="empty" flex-box="1">暂无数据</div>
          <div class="thumb-item">
            <div class="thumb">
              <div
                class="img"
                :style="{
                  backgroundImage:
                    'url(https://m.leisu.com/_nuxt/img/hot-text.701060e.png)'
                }"
              />
            </div>
            <div class="thumb-title">
              法国队此次欧洲杯和上届欧洲杯冠军葡萄牙、国际大赛冠军常客德国和匈牙利分在同一小组，是名副其实的死亡之战。赛程来看，法国队需要在慕尼黑踢德国、在布达佩斯踢匈牙利和葡萄牙，小组前两场可以说都是在客场作战。
            </div>
            <div class="thumb-option"><van-icon name="eye" /> 9999+</div>
          </div>
        </div>
      </div>
    </div> -->
    <!-- <div class="public module">
      <div class="public-title" flex="cross:center box:mean">
        <div flex-box="0" class="icon">
          <img src="@/assets/euro/hot/3.png" alt="">
        </div>
        <div flex-box="1" class="main">球员资讯</div>
        <div flex-box="0" class="more">
          <van-icon name="arrow" />
        </div>
      </div>
      <div class="public-content">
        <div class="public-main" flex="cross:center">
          <div class="empty" flex-box="1">暂无数据</div>
          <div class="thumb-item">
            <div class="thumb">
              <div
                class="img"
                :style="{
                  backgroundImage:
                    'url(https://m.leisu.com/_nuxt/img/hot-text.701060e.png)'
                }"
              />
            </div>
            <div class="thumb-title">
              法国队此次欧洲杯和上届欧洲杯冠军葡萄牙、国际大赛冠军常客德国和匈牙利分在同一小组，是名副其实的死亡之战。赛程来看，法国队需要在慕尼黑踢德国、在布达佩斯踢匈牙利和葡萄牙，小组前两场可以说都是在客场作战。
            </div>
            <div class="thumb-option"><van-icon name="eye" /> 9999+</div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import {
  getInstantMatch,
  getShooterTops,
  getAssistTops,
  getGroupTops
} from '@/api/euro'
import { parseTime } from '@/utils'
export default {
  data() {
    return {
      params: {
        stageId: null,
        groupNum: null
      },
      tabs: [],
      groupTops: [],
      shooterTops: [],
      assistTops: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getInstantMatch(this.params)
        .then(([data, error]) => {
          if (!error) {
            let t = new Date(new Date().toLocaleDateString()).getTime()
            let title = Object.keys(data)
            let title2 = []
            let array = Object.values(data)
            let obj = {}
            title.map(item => {
              item = item.replace('年', '/')
              item = item.replace('月', '/')
              item = item.replace('日', '')
              item = new Date(new Date(item + ' ' + '00:00:00')).getTime()
              title2.push(item)
              return item
            })
            title2.map((item, index) => {
              if (t <= item) {
                obj = {
                  value: parseTime(new Date(item).getTime(), '{m}月{d}'),
                  key: index,
                  matchs: array[index]
                }
                this.tabs.push(obj)
              }
              return item
            })
          }
        })
      getShooterTops().then(([data, error]) => {
        if (!error) {
          this.shooterTops = data.splice(0, 5)
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
                this.groupTops.push(obj)
              }
              return team
            })
            return item
          })
        }
      })
      getAssistTops().then(([data, error]) => {
        if (!error) {
          this.assistTops = data.splice(0, 5)
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
    toMore(name) {
      if (name === 'Match') {
        this.$router.push({ name })
      } else {
        this.$emit('more', name)
      }
    },
    toDetail(id) {
      this.$router.push({
        name: 'MatchMessage',
        params: { id, tab: 'BaseTab', from: this.$route.name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 12px;
  height: 100%;
  overflow: auto;
  background: #b7bafc;
  padding-bottom: 60px;
  .module {
    margin: 14px 8px 0 8px;
    background: #fff;
    .footer {
      text-align: center;
      .more {
        display: inline-block;
        margin: 12px 0 12px 0;
        background: #f6f7f9;
        padding: 4px 12px;
      }
    }
  }
  .banner {
    width: 100%;
    min-height: 13vh;
    background: url("~@/assets/euro/banner.png") top center no-repeat;
    background-size: cover;
    img {
      width: 100%;
    }
  }
  .empty {
    color: #888;
    text-align: center;
  }
  .match {
    padding: 8px 0 0 0;
    ::v-deep .van-tabs {
      margin-top: 12px;
      &__nav {
        &--card {
          border: none;
          margin: 0;
          .van-tab {
            border: none;
            display: block;
            height: 0;
            border-color: transparent transparent #f7f8fa;
            border-style: none solid solid;
            border-width: 0 0 28px 11px;
            text-align: center;
            &--active {
              background: none;
              border-color: transparent transparent #6b71ea;
            }
            .van-tab__text {
              line-height: 28px;
              font-size: 14px;
            }
            &:first-child {
              margin-left: 4px;
              transform: rotate(-180deg);
              .van-tab__text {
                transform: rotate(-180deg);
              }
            }
            &:last-child {
              margin-right: 4px;
            }
            // &:nth-child(2) {
            //   &.van-tab--active {
            //     background: #6b71ea;
            //   }
            //   background: #f7f8fa;
            //   transform: rotate(0deg) skew(-20deg, 0deg);
            //   .van-tab__text {
            //     transform: rotate(0deg) skew(20deg, 0deg);
            //   }
            // }
          }
        }
      }
    }
    .match-item {
      border-bottom: 1px solid rgb(197, 235, 240);
      height: 64px;
      .match-date {
        width: 76px;
        padding: 0 8px;
        font-size: 12px;
      }
      .match-status {
        width: 32px;
        font-size: 14px;
        text-align: center;
      }
      .match-team {
        span {
          text-align: center;
          font-size: 16px;
          &.vs {
            width: 32px;
          }
        }
      }
      img {
        width: 22px;
        height: 22px;
        margin: -4px 4px 0 4px;
        vertical-align: middle;
      }
    }
  }
  .top {
    padding: 8px;
    .title {
      height: 34px;
      line-height: 34px;
      font-size: 14px;
      text-align: center;
      background: url("~@/assets/euro/title.png") center no-repeat;
      background-size: contain;
      margin: 0 12px 0 12px;
      color: #6b71ea;
      font-weight: 600;
    }
    .top-list {
      width: 100%;
      table-layout: fixed;
      font-size: 12px;
      border-collapse: collapse;
      tr {
        line-height: 32px;
        th {
          font-weight: normal;
          border-bottom: 1px solid #c5ebf0;
        }
        td {
          text-align: center;
          color: #888;
          padding: 4px;
          border-bottom: 1px solid #c5ebf0;
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
    ::v-deep .van-tabs {
      .van-tabs__wrap {
        border-bottom: 1px solid #c5ebf0;
      }
    }
  }
  .public {
    .public-title {
      line-height: 34px;
      padding: 0 5px;
      background: #f6f6f7;
      .icon {
        width: 32px;
        img {
          width: 100%;
          vertical-align: middle;
          margin-top: -4px;
        }
      }
      .main {
        padding: 0 8px;
      }
      .more {
        width: 16px;
      }
    }
    .public-content {
      width: 100%;
      overflow: hidden;
      .public-main {
        overflow-x: auto;
        padding: 8px;
        .thumb-item {
          width: 124px;
          background: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 0.533vw 0 #e5e5ec;
          padding: 8px 0;
          margin: 0 4px 0 4px;
          .thumb {
            .img {
              width: 124px;
              height: 70px;
              background-repeat: no-repeat;
              background-size: contain;
            }
          }
          .thumb-title {
            padding: 4px 4px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            line-clamp: 2;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .thumb-option {
            line-height: 24px;
            padding: 0 4px;
            .van-icon {
              vertical-align: middle;
              font-size: 16px;
              color: #888;
              margin-top: -2px;
            }
          }
        }
      }
    }
  }
}
</style>

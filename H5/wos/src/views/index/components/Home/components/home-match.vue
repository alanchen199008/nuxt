<template>
  <d-card title="今日赛事" :shadow="false" full class="hot-match-container">
    <template #extra>
      <span
        flex="cross:center"
        @click="goMatch"
      >更多 <svg-icon
        icon-class="arrow-right"
      /></span>
    </template>
    <div class="hot-match">
      <van-row getter="10" type="flex">
        <van-col
          v-for="(item, i) in matches"
          :key="i"
          span="12"
          @click="goMatchDetail(item.matchId)"
        >
          <div class="hot-match-item">
            <div class="hot-match-item__head van-hairline--bottom">
              <div class="type">
                [{{ item.competitionName }}]
                <template
                  v-if="item.liveTime"
                >进行中
                  {{ item.liveTime ? item.liveTime + "`" : "" }}</template>
                <!-- <template v-if="item.status === 1">未开赛</template>
                <template v-else>
                  <template
                    v-if="item.status === 2"
                  >上半场 进行中{{
                    item.liveTime ? item.liveTime + "`" : ""
                  }}</template>
                  <template
                    v-if="item.status === 3"
                  >进行中{{
                    item.liveTime ? item.liveTime + "`" : ""
                  }}</template>
                  <template
                    v-if="item.status === 4"
                  >下半场 进行中{{
                    item.liveTime ? item.liveTime + "`" : ""
                  }}</template>
                  <template
                    v-if="item.status === 5"
                  >加时赛 进行中{{
                    item.liveTime ? item.liveTime + "`" : ""
                  }}</template>
                  <template
                    v-if="item.status === 7"
                  >点球决战 进行中{{
                    item.liveTime ? item.liveTime + "`" : ""
                  }}</template>
                </template> -->
              </div>
              <div class="tag">
                <font v-if="item.recommendCount > 0" class="recommd-tag">
                  推荐{{ item.recommendCount >= 100 ? "99+" : item.recommendCount }}
                </font>
              </div>
            </div>
            <div class="hot-match-item__body">
              <div flex="box:mean cross:stretch">
                <div class="hot-match-item__home">
                  <div class="icon">
                    <template
                      v-if="item.homeLogo"
                    ><img
                      v-lazy="item.homeLogo"
                      width="22px"
                      height="22px"
                    ></template>
                    <template
                      v-else
                    ><img
                      src="~@/assets/holder/match-index.png"
                      width="22px"
                      height="22px"
                    ></template>
                  </div>
                </div>
                <div class="hot-match-item__middle" flex-box="0">
                  <span
                    v-if="item.status == 1"
                    class="time"
                    :class="item.status == 1 ? 'show' : 'hide'"
                  >
                    <template v-if="item.matchTime > today">
                      {{ item.matchTime | parseTime("{m}月{d}日") }}<br>
                      {{ item.matchTime | parseTime("{h}:{i}") }}
                    </template>
                    <template v-else>
                      今天 {{ item.matchTime | parseTime("{h}:{i}") }}
                    </template>
                  </span>
                  <span v-else class="number">
                    {{ item.homeScore }}:{{ item.awayScore }}
                    <p class="half-score">
                      <font>({{
                        item.homeHalfScore + ":" + item.awayHalfScore
                      }})</font>
                    </p>
                  </span>
                </div>
                <div class="hot-match-item__away">
                  <div class="icon">
                    <template
                      v-if="item.awayLogo"
                    ><img
                      v-lazy="item.awayLogo"
                      width="22px"
                      height="22px"
                    ></template>
                    <template
                      v-else
                    ><img
                      src="~@/assets/holder/match-index.png"
                      width="22px"
                      height="22px"
                    ></template>
                  </div>
                </div>
              </div>
              <div flex="box:mean cross:center">
                <span class="team-name">
                  {{ item.homeTeamName }}
                </span>
                <small class="hot-match-item__middle" flex-box="0" />
                <span class="team-name">
                  {{ item.awayTeamName }}
                </span>
              </div>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </d-card>
</template>

<script>
import { getMatchList } from '@/api/home'
import DCard from '../components/DCard'
import { mapGetters } from 'vuex'
export default {
  name: 'HomeMatch',
  components: { DCard },
  data() {
    return {
      matches: [],
      today: new Date(
        new Date(new Date().toLocaleDateString()).getTime() +
          24 * 60 * 60 * 1000 -
          1
      ).getTime()
    }
  },
  computed: {
    ...mapGetters(['recommends'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getMatchList().then(([data, error]) => {
        if (!error) {
          if (data) {
            this.matches = data.slice(0, 4)
            this.matches.map(item => {
              this.recommends.map(match => {
                if (item.matchId === match.matchId) {
                  this.$set(item, 'recommendCount', match.totalNumber || 0)
                }
                return match
              })
              return item
            })
          }
        }
      })
    },
    toNews() {
      this.$router.push({ path: '/news' })
    },
    goMatch() {
      this.$router.push({ name: 'Match' })
    },
    goMatchDetail(id) {
      this.$router.push({
        name: 'MatchMessage',
        params: { id, locale: this.$i18n.locale },
        query: { from: 'Home' }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.hot-match {
  padding: 0 10px 4px 10px;
  ::v-deep .van-row {
    .van-col {
      margin-bottom: 10px;
    }
  }
  &-container {
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
  }
  &-item {
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 5px;
    margin: 0 5px;
    font-size: 13px;
    text-align: center;
    color: $--color-text-primary;
    overflow: hidden;
    min-height: 100px;
    &__head {
      margin: 0 5px 0 5px;
      position: relative;
      .type {
        position: relative;
        left: -14px;
        width: 100%;
        text-align: left;
        white-space: nowrap;
        color: #AE4646;
        padding: 5px 0;
        font-size: 12px;
        display: inline-block;
        transform: scale(0.83);
        font-weight: 600;
      }
      .tag {
        top: -1px;
        right: -6px;
        position: absolute;
        color: #fff;
        padding: 2px 0;
        border-radius: 0 5px 0px 15px;
        background: #ff0000;
        text-align: center;
        display: inline-block;
        font {
          font-size: 12px;
          transform: scale(0.8);
          display: inline-block;
        }
      }
    }

    &__body {
      .hot-match-item__home {
        text-align: center;
        .icon {
          padding: 8px 0 0 0;
          text-align: center;
          img {
            vertical-align: bottom;
          }
        }
      }
      .hot-match-item__middle {
        width: 60px;
        text-align: center;
        padding: 12px 0 0 0;
        .time {
          color: #333333;
          font-weight: 600;
          font-size: 11px;
          &.show {
            visibility: visible;
          }
          &.hide {
            visibility: hidden;
          }
        }
        .half-score {
          font {
            font-size: 12px;
            transform: scale(0.8);
            display: inline-block;
          }
        }
      }
      .hot-match-item__away {
        text-align: center;
        .icon {
          padding: 8px 0 0 0;
          text-align: center;
          img {
            vertical-align: bottom;
          }
        }
      }
      div {
        span {
          width: 53px;
          text-align: center;
          font: 12px;
        }
      }
      .team-name {
        padding: 0 2px;
        font-size: 10px;
        text-align: left;
        height: 40px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      & > .number {
        width: 15px;
        text-align: center;
        @include DIN-FONT;
        font-weight: bold;
      }
    }
  }
}
</style>

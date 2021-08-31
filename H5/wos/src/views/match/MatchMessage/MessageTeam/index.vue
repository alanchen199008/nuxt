<template>
  <div class="message-team">
    <div class="background">
      <van-nav-bar
        left-arrow
        class="transparent-nav-bar"
        :border="false"
        @click-left="goBack"
      >
        <template #title>{{ environmentWeatherList[message.environmentWeather] }}</template>
      </van-nav-bar>
      <div class="message">
        <div class="message-time">
          {{ message.competitionName }}&nbsp;
          {{ message.matchTime | parseTime("{m}-{d} {h}:{i}") }}
        </div>
        <van-row type="flex" align="center">
          <van-col span="9">
            <img
              class="team-logo"
              :src="
                message.homeLogo
                  ? message.homeLogo
                  : require('@/assets/team-holder.png')
              "
            >
            <div class="team-name van-ellipsis">{{ message.homeTeamName }}</div>
            <div class="team-orderno">排名&nbsp;{{ message.homePosition }}</div>
          </van-col>
          <van-col span="6">
            <div v-if="message.status === 1" class="match-vs">VS</div>
            <div v-else class="match-score">
              {{ message.homeScore }}&nbsp;-&nbsp;{{ message.awayScore }}
            </div>
            <div class="match-time">
              <template v-if="message.status === 1">未开赛</template>
              <template
                v-if="message.status === 2"
              >上半场<span> {{ message.liveTime }}'</span></template>
              <template v-if="message.status === 3">中场</template>
              <template
                v-if="message.status === 4"
              >下半场<span> {{ message.liveTime }}'</span></template>
              <template
                v-if="message.status === 5"
              >加时赛<span> {{ message.liveTime }}'</span></template>
              <template
                v-if="message.status === 7"
              >点球决战<span> {{ message.liveTime }}'</span></template>
              <template v-if="message.status === 8">已完赛</template>
              <template v-if="message.status === 9">推迟</template>
              <template v-if="message.status === 10">中断</template>
              <template v-if="message.status === 11">腰斩</template>
              <template v-if="message.status === 12">取消</template>
              <template v-if="message.status === 13">待定</template>
            </div>
            <div class="match-half-court">
              <template v-if="message.status !== 1">
                半（{{ message.homeHalfScore }}&nbsp;:&nbsp;{{
                  message.awayHalfScore
                }}）
              </template>
            </div>
          </van-col>
          <van-col span="9">
            <img
              class="team-logo"
              :src="
                message.awayLogo
                  ? message.awayLogo
                  : require('@/assets/team-holder.png')
              "
            >
            <div class="team-name van-ellipsis">{{ message.awayTeamName }}</div>
            <div class="team-orderno">排名&nbsp;{{ message.awayPosition }}</div>
          </van-col>
        </van-row>
        <van-row type="flex" justify="space-between">
          <van-col span="9">
            <div class="message-card">
              <div class="data">
                <span>{{ message.homeRedCards }}</span>
                <img src="@/assets/ft-icons/4.png">
              </div>
              <div class="data">
                <span>{{ message.homeYellowCards }}</span>
                <img src="@/assets/ft-icons/3.png">
              </div>
              <div class="data">
                <span>{{ message.homeCornerkick }}</span>
                <img src="@/assets/ft-icons/2.png">
              </div>
            </div>
          </van-col>
          <van-col span="6">
            <span
              v-if="message.liveUrl && message.status !== 8"
              class="live-button"
              @click="handleLive(true)"
            >
              <img src="~@/assets/public/player.png">视频直播</span>
          </van-col>
          <van-col span="9">
            <div class="message-card">
              <div class="data">
                <img src="@/assets/ft-icons/2.png">
                <span>{{ message.awayCornerkick }}</span>
              </div>
              <div class="data">
                <img src="@/assets/ft-icons/3.png">
                <span>{{ message.awayYellowCards }}</span>
              </div>
              <div class="data">
                <img src="@/assets/ft-icons/4.png">
                <span>{{ message.awayRedCards }}</span>
              </div>
            </div>
          </van-col>
        </van-row>
      </div>
      <div ref="live" class="live">
        <vue-player v-if="message.liveUrl" :url="message.liveUrl" @close="handleLive" />
      </div>
    </div>
  </div>
</template>

<script>
import VuePlayer from '@/components/VuePlayer'
const environmentWeatherList = [
  '',
  '局部有云',
  '多云',
  '局部有云/雨',
  '雪',
  '晴',
  '阴有雨/局部有雷暴',
  '阴',
  '薄雾',
  '阴有雨',
  '多云有雨',
  '多云有雨/局部有雷暴',
  '局部有云/雨和雷暴',
  '雾'
]

export default {
  components: { VuePlayer },
  props: {
    message: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      environmentWeatherList,
      from: '',
      live: false
    }
  },
  watch: {
    live() {
      if (this.live) {
        this.$refs.live.classList.add('show')
      } else {
        this.$refs.live.classList.remove('show')
      }
    }
  },
  created() {
    const { from } = this.$route.query
    this.from = from
  },
  methods: {
    handleLive(e) {
      this.live = e
    },
    goBack() {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.van-nav-bar__left{z-index: 1002;}
.background {
  width: 100%;
  height: 205px;
  overflow: hidden;
  background: url("~@/assets/match-info-f.png") no-repeat top center;
  background-size: cover;
  position: relative;
  .message {
    width: 100%;
    height: 161px;
    position: relative;
    font-size: 12px;
    color: white;
    text-align: center;
    &-time {
      display: inline-block;
      color: #fff923;
      background-color: #000;
      height: 20px;
      line-height: 20px;
      border-radius: 10px;
      padding: 0 8px;
      font-size: 11px;
      margin: 4px 0;
      border: 1px solid rgba(255, 255, 255, 0.5);
    }
    &-card {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 12px 0;
      .data {
        flex: 1;
        line-height: 15px;
        span {
          display: inline-block;
          width: 20px;
        }
        img {
          width: 15px;
          vertical-align: middle;
        }
      }
    }

    .match-score {
      font-size: 30px;
      height: 40px;
      line-height: 40px;
    }
    .match-vs {
      font-size: 24px;
      height: 40px;
      line-height: 40px;
    }
    .match-time {
      margin: 5px 0;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      padding: 0 10px;
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.5);
      span {
        color: #f87d22;
      }
    }

    .team-logo {
      height: 40px;
    }

    .team-name {
      font-size: 14px;
      line-height: 30px;
    }
  }
  .live-button {
    background-color: rgba(0, 0, 0, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.5);
    padding: 0 10px;
    border-radius: 10px;
    height: 20px;
    line-height: 20px;
    display: inline-block;
    img {
      width: 12px;

      vertical-align: middle;
      margin-right: 4px;
      margin-top: -2px;
    }
  }
  .live {
    position: absolute;
    width: 100%;
    height: inherit;
    z-index: 0;
    top: 206px;
    left: 0;
    z-index: 3000;
    transition: 0.2s ease-in-out;
    display: none;
    &.show {
      top:37px;
      display: block;
    }
  }
}
</style>

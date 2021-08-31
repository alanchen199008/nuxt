<template>
  <div class="match-item van-hairline--bottom" @click="toDetail(item.matchId)">
    <div flex="cross:top box:mean">
      <div flex-box="0" class="match-item__left"> {{ item.stageName }}</div>
      <div flex-box="1" class="match-item__center" flex="cross:center box:mean">
        <div class="match-item__center__left" flex="main:right">
          <span class="match-date">
            <font>{{ item.matchTime | parseTime('{m}.{d} {h}:{i}') }}</font>
          </span>
        </div>
        <div flex-box="0" class="match-item__center__middle" flex="main:center">
          <span v-if="item.status === 1" class="color-text-regular">未赛</span>
          <span v-else-if="item.status !== 2 && item.status !== 4" class="color-red-regular">
            <template v-if="item.status === 3">中场</template>
            <template v-if="item.status === 5">加时赛</template>
            <template v-if="item.status === 7">点球决战</template>
            <template v-if="item.status === 8">完场</template>
            <template v-if="item.status === 9">推迟</template>
            <template v-if="item.status === 10">中断</template>
            <template v-if="item.status === 11">腰斩</template>
            <template v-if="item.status === 12">取消</template>
            <template v-if="item.status === 13">待定</template>
          </span>
          <span v-else-if="item.status === 7" class="color-red-regular"> 点球决战
          </span>
          <span v-else class="color-red-regular">{{ item.liveTime }}´</span>
        </div>
        <div class="match-item__center__right"><template v-if="item.rq > 0"> 让{{ item.rq }} 球</template></div>
      </div>
      <div flex-box="0" class="match-item__right">
        <span v-if="item.hasIntelligence === 1" class="match-tag">情报</span>
        <span v-if="item.recommendCount > 0" class="match-tag">
          推荐 {{ item.recommendCount &lt; 100 ? item.recommendCount : '99+' }}
        </span>
      </div>
    </div>
    <div flex="cross:top box:mean">
      <div flex-box="0" class="match-item__left">周{{ item.matchTime | parseTime("{a}") }}{{ item.issueNum }}</div>
      <div flex-box="1" class="match-item__center" flex="cross:top box:mean">
        <div class="match-item__center__left" flex="cross:baseline main:right">
          <font v-if="item.homePosition">[{{ item.homePosition.replace(/[^0-9]/gi, "") }}]</font>
          <span v-if="item.homeRedCards" class="card-red">{{ item.homeRedCards }}</span>
          <span v-if="item.homeYellowCards" class="card-yellow">{{ item.homeYellowCards }}</span>
          <span flex-box="1" class="team-name">{{ item.homeTeamName }}</span></div>
        <div flex-box="0" class="match-item__center__middle" flex="main:center">
          <span class="match-center">
            <span v-if="item.status !== 1" class="match-score"> {{ item.homeScore }}:{{ item.awayScore }} </span>
            <span v-else class="match-vs">VS</span>
          </span>
        </div>
        <div class="match-item__center__right" flex="cross:baseline main:left">
          <span flex-box="1" class="team-name">{{ item.awayTeamName }}</span>
          <span v-if="item.awayYellowCards" class="card-yellow">{{ item.awayYellowCards }}</span>
          <span v-if="item.awayRedCards" class="card-red">{{ item.awayRedCards }}</span>
          <font v-if="item.awayPosition">[{{ item.awayPosition.replace(/[^0-9]/gi, "") }}]</font>
        </div>
      </div>
      <div flex-box="0" class="match-item__right"><img v-if="item.liveUrl && item.status !== 8" class="live-icon" src="@/assets/public/player-w.png" alt=""></div>
    </div>
    <div flex="cross:top box:mean">
      <div flex-box="0" class="match-item__left" />
      <div flex-box="1" class="match-item__center" flex="cross:center box:mean">
        <div class="match-item__center__left" />
        <div class="match-item__center__middle"><font>半 {{ item.homeHalfScore + ':' + item.awayHalfScore }}</font></div>
        <div class="match-item__center__right" />
      </div>
      <div flex-box="0" class="match-item__right" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['mode', 'recommends'])
  },
  created() {
    this.recommends.map(m => {
      if (m.matchId === this.item.matchId) {
        this.$set(this.item, 'recommendCount', m.totalNumber)
      }
      return m
    })
  },
  methods: {
    toDetail(id) {
      if (this.mode === 0) {
        this.$router.push({ name: 'HomeMatch', params: { id }})
      }
      if (this.mode === 1) {
        window.android.intoMatchDetail(id)
      }
      if (this.mode === 2) {
        window.webkit.messageHandlers.MatchDetail.postMessage({ matchId: id })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.match-item {
  font-size: 12px;
  background: #fff;
  color: #808080;
  padding: 4px;
  &__left, &__right{
    width: 80px;
  }
  &__right{
    text-align: right;
  }
  &__center{
    width: 200px;
    &__left{
      text-align: right;
    }
    &__middle{
      width: 40px;
      text-align: center;
    }
    &__right{
      text-align: left;
    }
  }
  .team-name{
    font-size: 14px;
    color: #333;
    font-weight: 500;
  }
  .match-date{
    font-size: 12px;
  }
  .match-center{
    .match-score{
      color: #00b48d;
    }
    .match-vs{
      color: #CCCCCC;
    }
  }
  font{
    font-size: 12px;
    transform: scale(0.84);
    display: inline-block;
  }
  .live-icon{
     width: 18px;
     margin-right: 14px;
  }
  .match-tag{
    font-size: 12px;
    border-radius: 3px;
    color: #ff0000;
    padding: 0 4px;
  }
  .card-red{
    width: 15px;
    height: 15px;
    line-height: 15px;
    background-color: $--color-red;
    color: #fff;
    text-align: center;
    margin: 0 2px;
    display: inline-block;
  }
  .card-yellow{
    width: 15px;
    height: 15px;
    line-height: 15px;
    background-color: $--color-yellow;
    color: #fff;
    text-align: center;
    margin: 0 2px;
    display: inline-block;
  }
}
</style>

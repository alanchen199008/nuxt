<template>
  <div class="match-item" @click="$emit('click',item.matchId)">
    <div flex="cross:center box:mean">
      <div flex-box="0" class="match-item__left"><font> 周{{ item.matchTime | parseTime("{a}") }}</font> <font color="#60b700">{{ item.competitionName }}</font>
      </div>
      <div flex-box="1" class="match-item__center" flex="cross:center box:mean">
        <div class="match-item__center__left" flex="main:right">
          <span class="match-date">
            <small>{{ item.matchTime | parseTime('{h}:{i}') }}</small>
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
        <div class="match-item__center__right">
          <small>
            <template v-if="item.rq">
              <template v-if="parseInt(item.rq.split(',')[0]) > 0">受</template>让{{ Math.abs(parseInt(item.rq.split(",")[0])) }}球
            </template>
            <template v-if="item.northRq">
              <template v-if="parseInt(item.northRq.split(',')[0]) === 0">平手</template>
              <template v-else-if="parseInt(item.northRq.split(',')[0]) > 0">受让{{ Math.abs(parseInt(item.northRq.split(",")[0])) }}球</template>
              <template v-else>让{{ Math.abs(parseInt(item.northRq.split(",")[0])) }}球</template>
            </template>
          </small>
          <template v-if="item.asiaSpf">
            {{ item.asiaSpf.split(",")[1] }}
          </template>
          <template v-if="type == 1">
            <span v-if="item.status !== 1" class="corner">
              <!-- <img src="@/assets/public/banner.png" alt="" srcset=""> -->
              {{ item.homeCornerkick === "-1" ? 0 : item.homeCornerkick }}-{{ item.awayCornerkick === "-1" ? 0 : item.awayCornerkick }}
            </span>
          </template>
        </div>
      </div>
      <div flex-box="0" class="match-item__right" style="white-space: nowrap;">
        <span v-if="item.hasIntelligence === 1" class="match-tag">情报</span>
        <span v-if="item.recommendCount > 0" class="match-tag">推荐 {{ item.recommendCount &lt; 100 ? item.recommendCount : '99+' }}</span>
      </div>
    </div>
    <div flex="cross:top box:mean">
      <div flex-box="0" class="match-item__left">
        <template v-if="item.issueNum "><small>{{ item.issueNum }}</small></template>
        <div v-else class="favorite" @click.stop="toogleFocus()">
          <img v-if="focus === 1" src="~@/assets/icons/favorite_border.png">
          <img v-else src="~@/assets/icons/favorite.png">
        </div>
      </div>
      <div flex-box="1" class="match-item__center" flex="cross:top box:mean">
        <div class="match-item__center__left" flex="cross:baseline main:right box:mean">
          <span flex-box="1" class="team-info">
            <small v-if="item.homePosition">[{{ item.homePosition.replace(/[^0-9]/gi, "") }}]</small>
            <small v-if="item.homeRedCards" class="card-red">{{ item.homeRedCards }}</small>
            <small v-if="item.homeYellowCards" class="card-yellow">{{ item.homeYellowCards }}</small>
          </span>
          <span flex-box="0" class="team-name">{{ item.homeTeamName }}</span></div>
        <div flex-box="0" class="match-item__center__middle">
          <span class="match-center">
            <span v-if="item.status !== 1" class="match-score" flex="cross:center main:center">
              {{ item.homeScore }} : {{ item.awayScore }}
            </span>
            <span v-else class="match-vs">VS</span>
          </span>
        </div>
        <div class="match-item__center__right" flex="cross:baseline main:left box:mean">
          <span flex-box="0" class="team-name">{{ item.awayTeamName }}</span>
          <span flex-box="1" class="team-info">
            <small v-if="item.awayYellowCards" class="card-yellow">{{ item.awayYellowCards }}</small>
            <small v-if="item.awayRedCards" class="card-red">{{ item.awayRedCards }}</small>
            <small v-if="item.awayPosition">[{{ item.awayPosition.replace(/[^0-9]/gi, "") }}]</small>
          </span>
        </div>
      </div>
      <div flex-box="0" class="match-item__right"><img v-if="item.liveUrl && item.status !== 8" class="live-icon" src="@/assets/public/player-w.png" alt=""></div>
    </div>
    <div flex="cross:stretch box:mean">
      <div flex-box="0" class="match-item__left">
        <div v-if="item.issueNum" class="favorite" @click.stop="toogleFocus()">
          <img v-if="focus === 1" src="~@/assets/icons/favorite_border.png">
          <img v-else src="~@/assets/icons/favorite.png">
        </div>
      </div>
      <div flex-box="1" class="match-item__center" flex="cross:center box:mean">
        <div class="match-item__center__left" flex="cross:center main:right" style="white-space: nowrap;">
          <template v-if="item.spf">
            <small v-for="(rate, index) in item.spf.split(',')" :key="index">{{ rate }}</small>
          </template>
          <template v-if="item.asiaSpf">
            <small>实时亚赔</small>
            <small v-for="(rate, index) in item.asiaSpf.split(',')" :key="index">{{ rate }}</small>
          </template>
        </div>
        <div class="match-item__center__middle" flex-box="0"><small>半 {{ item.homeHalfScore + ':' + item.awayHalfScore }}</small></div>
        <div
          class="match-item__center__right"
          flex="cross:center main:left"
          style="white-space: nowrap;"
        >
          <template v-if="item.spf">
            <small v-for="(rate, index) in item.rq.split(',')" :key="index">{{ index === 0 ? "主(" + rate + ")" : rate }}</small>
          </template>
          <template v-if="item.bsSpf">
            <small>实时大小</small>
            <small v-for="(rate, index) in item.bsSpf.split(',')" :key="index">{{ rate }}</small>
          </template>
        </div>
        <div flex-box="0" class="match-item__right" />
      </div>
    </div>
    <div v-if="item.note !==''" class="match-note">
      <small>{{ item.note }}</small>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { updateMatchFocus } from '@/api/match'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['mode', 'recommends']),
    info: {
      get() {
        return this.$store.getters.info
      },
      set(value) {
        this.$store.dispatch('user/updateInfo', value)
      }
    },
    type() {
      return this.$store.getters.mMatchType
    },
    focus: {
      get() {
        return this.item.focus
      },
      set(val) {
        this.item.focus = val
      }
    }
  },
  watch: {
    item() {
      this.recommends.map(match => {
        if (this.item.matchId === match.matchId) {
          this.item.recommendCount = match.totalNumber
        }
        return match
      })
    }
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
    toogleFocus() {
      updateMatchFocus({
        type: ~this.focus + 2,
        matchId: this.item.matchId
      }).then(([_, err]) => {
        if (!err) {
          this.focus = ~this.focus + 2
          if (this.focus === 0) {
            if (this.info.focusMatches) {
              this.info.focusMatches.map((item, index) => {
                if (item === this.item.matchId) {
                  this.info.focusMatches.splice(index, 1)
                }
                return item
              })
            }
          }
          if (this.focus === 1) {
            this.info.focusMatches.push(this.item.matchId)
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.match-item {
  font-size: 12px;
  background: #fff;
  color: #808080;
  padding: 8px 10px 4px 10px;
  border-bottom: 1px solid #eee;
  &__left, &__right{
    width: 80px;
  }
  &__right{
    text-align: right;
  }
  &__center{
    width: 310px;
    &__left{
      text-align: right;
    }
    &__middle{
      width: 58px;
      text-align: center;
    }
    &__right{
      text-align: left;
    }
  }
  .favorite {
    width: 32px;
    img {
      width: 20px;
      height: 20px;
    }
  }
  .team-name{
    width: auto;
    max-width: 80px;
    font-size: 14px;
    color: #333;
    font-weight: 500;
    letter-spacing: -1;
  }
  .team-info{
    width: 54px;
    white-space: nowrap;
  }
  .match-date{
    font-size: 12px;
  }
  .match-center{
    .match-score{
      color: #00b48d;
      font-size: 16px;
      font-weight: 600;
      .middle{
        width: 5px;
        text-align: center;
      }
    }
    .match-vs{
      color: #CCCCCC;
    }
  }
  .corner {
    padding-left: 8px;
    &::before {
      content: "";
      background: url("~@/assets/public/banner.png") no-repeat center;
      background-size: cover;
      width: 6.5px;
      height: 8.5px;
      display: inline-block;
    }
  }
  small{
    font-size: 12px;
    transform: scale(0.84);
    display: inline-block;
  }
  .live-icon{
     width: 18px;
     margin-right: 4px;
     vertical-align: middle;
  }
  .match-tag{
    // font-size: 12px;
    // border-radius: 3px;
    // color: #ff0000;
    padding: 0 4px;

    font-size: 10px;
    color: #FF7F59;
    width: 57px;
    height: 28px;
    background: #FFF5F2;
    border: 1px solid #FFA891;
    border-radius: 0px 0px 4px 4px;
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
  .match-note{
    font-size: 12px;
    color: #e74d5c;
    text-align: center;
    background: #f1f1f1;
    padding: 2px 0;
  }
}
</style>

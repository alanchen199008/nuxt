<template>
  <div
    class="forecast-item"
    flex="box:justify"
    @click="goLink(item.matchId)"
  >
    <div class="forecast-item-date" flex="dir:top main:justify">
      <div>
        周{{ item.matchTime | parseTime("{a}") }}
        <br>
        {{ item.dayNumber }}
      </div>

      <span class="forecast-item__type">
        <template v-if="item.matchType">{{ item.matchType === 2 ? '足球' : ' ' }}</template>
      </span>
    </div>
    <div
      class="forecast-item-content"
      flex="cross:stretch"
    >
      <div
        class="forecast-item__left"
        flex="dir:top main:justify"
        flex-box="1"
      >
        <div flex="box:mean">
          <div class="forecast-item__left--name van-ellipsis" flex-box="1">
            {{ item.shortName }}
          </div>
          <!-- <div class="forecast-item__left--middle" flex-box="0">
            {{ item.matchTime | parseTime("{h}:{s}") }}
          </div> -->
          <div class="forecast-item__left--right" flex-box="0">
            {{ item.matchTime | parseTime("{h}:{s}") }} {{ item.type }}
          </div>
        </div>
        <div flex="cross:center">
          <div class="forecast-item__left--left" flex-box="1">
            <h2 class="is-right">{{ item.homeTeamName }}</h2>
          </div>
          <div class="forecast-item__left--middle" flex-box="0">VS</div>
          <div class="forecast-item__left--right" flex-box="0">
            <h2>{{ item.awayTeamName }}</h2>
          </div>
        </div>
      </div>
      <div class="forecast-item__right van-hairline--left" flex-box="0">
        <div class="color-red-regular">{{ item.predictionResultRate | parsePrecision }}%可能</div>
        <div flex="cross:center main:center">
          <div v-if="item.predictionResult === 1 || item.predictionResult === 12 || item.predictionResult === 13">
            <div class="bolder">胜</div>
            <!-- <small>({{ item.homeWin }})</small> -->
          </div>
          <div v-if="item.predictionResult === 2 || item.predictionResult === 12 || item.predictionResult === 23">
            <div class="bolder">平</div>
            <!-- <small>({{ item.draw }})</small> -->
          </div>
          <div v-if="item.predictionResult === 3 || item.predictionResult === 13 || item.predictionResult === 23">
            <div class="bolder">负</div>
            <!-- <small>({{ item.awayWin }})</small> -->
          </div>
        </div>
        <div v-if="item.hitStatus === 1 && item.type !== 0" class="icon-hit">
          <img src="~@/assets/public/forecast-hit.png" alt="">
        </div>
      </div>
    </div>
    <div class="forecast-item-favorite" @click.stop="toogleFocus">
      <img v-if="item.isFocus === 1" src="~@/assets/icons/favorite_border.png">
      <img v-else src="~@/assets/icons/favorite.png">
    </div>
  </div>
</template>

<script>
import { updateMatchFocus } from '@/api/match'
export default {
  name: 'ForecastItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    focus: {
      get() {
        return this.item.focus
      },
      set(val) {
        this.item.focus = val
      }
    }
  },
  methods: {
    toogleFocus() {
      let type = null
      this.item.isFocus === 0 ? type = 1 : type = 0
      updateMatchFocus({
        type: type,
        matchId: this.item.matchId
      }).then(([_, err]) => {
        if (!err) {
          type === 0 ? this.item.isFocus = 0 : this.item.isFocus = 1
        }
      })
    },
    goLink(id) {
      this.$router.push({ name: 'ForecastMessage', params: { locale: this.$i18n.locale, id, tab: 'ForecastTab', type: 1 }, query: { from: this.$route.name }})
    }
  }
}
</script>

<style lang="scss" scoped>
.forecast-item {
  margin: 0 5px 8px 5px;
  padding: 15px 5px;
  background-color: #fff;
  font-size: 12px;
  color: var(--text-regular);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  position: relative;
  line-height: 1.25;
  &__left {
    padding-left: 10px;
    h2 {
      color: var(--text-primary);
      font-size: 13px;
      font-weight: bolder;
      &.is-right {
        text-align: right;
      }
    }
    &--name {
      color: #60B700;
    }
    &--middle {
      width: 50px;
      text-align: center;
    }
    &--right {
      width: 75px;
      padding-right: 10px;
    }
  }

  &__right {
    position: relative;
    width: 95px;
    text-align: center;
    .bolder {
      color: var(--text-primary);
      transform: scale(.91666);
    }

    small {
      display: inline-block;
      color: var(--text-secondary);
      transform: scale(.75);
    }
  }
  &__type {
    color: var(--text-secondary);
    margin-bottom: -10px;
  }

  &-favorite {
    margin-top: -10px;
    img {
      width: 15px;
      height: 15px;
    }
  }
  .icon-hit{
    position: absolute;
    right: -8px;
    bottom: -8px;
    img{
      width: 16px;
      height: 16px;
      }
    }
}
</style>

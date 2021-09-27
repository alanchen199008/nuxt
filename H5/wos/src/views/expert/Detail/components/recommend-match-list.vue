<template>
  <div class="recommend-match-list">
    <div
      v-for="item in data.matchList"
      :key="item.matchId"
      class="recommend-match-item"
    >
      <div class="recommend-match-item-hd" style="color:#484848FF;">
        周{{ item.matchTime | parseTime("{a}") }} {{ item.issueNum }}&nbsp;&nbsp;
        竞足[{{ item.competitionName }}]&nbsp;&nbsp;
        {{ item.matchTime | parseTime("{m}-{d} {h}:{i}") }}&nbsp;
        <span class="van-icon van-icon-arrow" @click="goDetail(item.matchId)">赛事详情</span>
      </div>
      <div class="recommend-match-info" flex="box:mean cross:center">
        <div>
          <van-image
            :src="
              item.homeTeamLogo
                ? item.homeTeamLogo
                : require('@/assets/team-holder.png')
            "
            :style="{ width: '25px', height: '25px' }"
          />
          <div>{{ item.homeTeamName }}</div>
        </div>
        <div>
          <!-- <div>{{ item.competitionName }}</div>
          <div>{{ item.matchTime | parseTime("{m}/{d} {h}:{s}") }}</div> -->
          <div v-if="item.countTime" style="color:#6B94FDFF;font-size:10px;">
            距开始<van-count-down
              :time="item.countTime"
              :style="{ color: '#6B94FDFF', display: 'inline-block', fontSize: '12px' }"
            />
          </div>
          <div style="font-size:25px;color:#CCCCCCFF;font-weight: bold;">VS</div>
        </div>
        <div>
          <van-image
            :src="
              item.awayTeamLogo
                ? item.awayTeamLogo
                : require('@/assets/team-holder.png')
            "
            :style="{ width: '25px', height: '25px' }"
          />
          <div>{{ item.awayTeamName }}</div>
        </div>
      </div>
      <div class="btn-item">
        <van-button class="release-btn" plain>
          让球<br>0
        </van-button>
        <van-button
          v-for="(trick, ruleIdx) in (item.attr.slice(0,3))"
          :key="ruleIdx"
          :class="(data.self && trick.selected) || (data.free && trick.selected) || (data.buy && trick.selected) || (trick.redBlack && trick.selected)?'current':''"
          plain
          class="release-btn"
        >
          <span v-show="trick.isHost" class="zt">主推</span>
          {{ trick.name }}<br>{{ trick.odds ? trick.odds : 0.0 }}
          <img
            v-if="trick.redBlack"
            :src="trick.redBlack === 1 ? require('@/assets/expert/redBlack-1.png') : require('@/assets/expert/redBlack-2.png')"
            class="redBlack"
          >
          <img v-if="Number(trick.code) === Number(item.winCode)" class="redBlack" src="~@/assets/expert/redBlack-1.png" alt="">
        </van-button>
      </div>
      <div class="btn-item">
        <van-button class="release-btn" :class="{ 'current': Number(item.plate) !== 0 }" plain>
          让球<br>{{ item.plate ? item.plate : 0 }}
        </van-button>
        <van-button
          v-for="(trick, ruleIdx) in (item.attr.slice(3,6))"
          :key="ruleIdx"
          :class="(data.self && trick.selected) || (data.free && trick.selected) || (data.buy && trick.selected) || (trick.redBlack && trick.selected)?'current':''"
          plain
          class="release-btn"
        >
          <span v-show="trick.isHost" class="zt">主推</span>
          {{ trick.name }}<br>{{ trick.odds ? trick.odds : 0.0 }}
          <img
            v-if="trick.redBlack"
            :src="trick.redBlack === 1 ? require('@/assets/expert/redBlack-1.png') : require('@/assets/expert/redBlack-2.png')"
            class="redBlack"
          >
          <img v-if="Number(trick.code) === Number(item.winCode)" class="redBlack" src="~@/assets/expert/redBlack-1.png" alt="">
        </van-button>
      </div>
      <!-- <div class="recommend-match-trick" flex="box:mean cross:stretch">
        <div class="recommend-match-trick-item">
          让球
          <div class="number">{{ item.plate ? item.plate : 0 }}</div>
        </div>
        <div
          v-for="(trick, index) in item.attr"
          :key="index"
          class="recommend-match-trick-item"
          :class=" (data.self && trick.selected) || (data.free && trick.selected) || (data.buy && trick.selected) || (trick.redBlack && trick.selected) ? 'select' : ''"
        >
          {{ trick.name }}
          <div class="number">{{ trick.odds ? trick.odds : 0.0 }}</div>
          <img
            v-if="trick.redBlack"
            :src="trick.redBlack === 1 ? require('@/assets/expert/redBlack-1.png') : require('@/assets/expert/redBlack-2.png')"
            class="redBlack"
          >
          <img v-if="Number(trick.code) === item.winCode" class="redBlack" src="~@/assets/expert/redBlack-1.png" alt="">
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendMatchList',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.data?.matchList.forEach(o => {
      let diff = o.matchTime - new Date().getTime()
      if (diff < 24 * 60 * 60 * 1000 && diff > 0) o.countTime = diff
    })
  },
  methods: {
    goDetail(id) {
      this.$router.push({ name: 'MatchMessage', params: { id, locale: this.$i18n.locale }})
    }
  }
}
</script>

<style lang="scss" scoped>
.btn-item {
  display: flex;
  justify-content: space-around;
}
.release-btn {
  border-radius: 4px;
  width: 68px;
  margin: 0 6px 8px;
  border-color: #BBBBBBFF;
  &:active::before {
    opacity: 0;
  }
  .zt {
    border-radius: 0px 4px;
    background: #FFCA60FF;
    font-size: 8px;
    color: #FF4D4DFF;
    display: block;
    padding: 2px;
    position: absolute;
    top: -1px;
    right: 0;
  }
  img {
    position: absolute;
    &.redBlack {
      width: 16px;
      height: 16px;
      top: 12px;
      right: 8px;
    }
  }
  &.van-button--disabled {
    background: #e8e8e8;
    border-color: #d4d4d4;
  }
  .van-button__text {
    color: #000000FF;
    font-size: 11px;
  }
  &.current {
    background: #21D4ADFF;
    border-color: #21D4ADFF;
    .van-button__text {
      color: #fff;
    }
  }
}
.recommend-match-list {
  .recommend-match-item {
    padding: 0px 15px 10px;
    // margin: 10px;
    background: #fff;
    // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
    // border-radius: 6px;
    border-bottom: solid 9px #f5f5f5;
    .recommend-match-item-hd {
      display: flex;
      align-items: center;
      color: #333333FF;
      justify-content: space-between;
      padding: 14px 0;
      .van-icon-arrow {
        display: flex;
        flex-direction: row-reverse;
        color: #F86503FF;
      }
    }
    .recommend-match-info {
      text-align: center;
      margin-bottom: 15px;
    }
    .recommend-match-trick {
      margin: 10px 0 10px 0;
      text-align: center;
      position: relative;
      &-item {
        padding: 10px 0;
        border-top: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        border-left: 1px solid #ddd;
        position: relative;
        &.select {
          background: #21d4ad;
          border-top-color: #21d4ad;
          border-bottom-color: #21d4ad;
          border-left-color: #fff;
          color: #fff;
          .number {
            color: #fff;
          }
        }
        img {
          position: absolute;
          &.redBlack {
            width: 16px;
            height: 16px;
            top: 12px;
            right: 8px;
          }
        }
        &:last-child {
          border-right: 1px solid #ddd;
        }
        .number {
          @include DIN-FONT(14px);
        }
      }
    }
  }
}
</style>

<template>
  <div class="recommend-match-list">
    <div
      v-for="item in data.matchList"
      :key="item.matchId"
      class="recommend-match-item"
    >
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
          <div>{{ item.competitionName }}</div>
          <div>{{ item.matchTime | parseTime("{m}/{d} {h}:{s}") }}</div>
          <div>VS</div>
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
      <div class="recommend-match-trick" flex="box:mean cross:stretch">
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
      </div>
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
  }
}
</script>

<style lang="scss" scoped>
.recommend-match-list {
  .recommend-match-item {
    padding: 10px;
    margin: 10px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    .recommend-match-info {
      text-align: center;
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

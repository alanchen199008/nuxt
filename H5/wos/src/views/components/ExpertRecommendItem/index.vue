<template>
  <div class="recommend-item" @click="$emit('click', item.articleId || item.id)">
    <div v-if="more" class="recommend-item-message">
      <Avatar :src="item.avatar" />
      <div class="message" flex="dir:top">
        <div flex="cross:center">
          <div class="md name">
            {{ item.nickname }}
            <span v-if="item.tenRed" class="s_t s_t_blue"><font>10中 {{ item.tenRed }}</font></span>
            <span
              v-if="item.linkwin"
              class="s_t s_t_red"
            ><font>{{ item.linkwin }}连红</font></span>
          </div>
          <div class="sd number">
            {{ sortBy === "winrate" ? Number(item.weekWinrate) : Number(item.weekReturnrate) }}%
          </div>
        </div>
        <div flex="cross:center">
          <div class="md">
            <template v-if="item.greatGames">
              擅长联赛:{{ item.greatGames }}</template>
          </div>
          <div class="sd">{{ sortBy === "winrate" ? "周胜率" : "周返还率" }}</div>
        </div>
      </div>
    </div>
    <div class="recommend-item-text">
      <font color="#FF5950">[{{ item.articleSchedules === 1 ? "单场" : "串联" }}]</font>
      <span>{{ item.title }}</span>
    </div>
    <div class="recommend-item-extra" flex="cross:center">
      <span
        v-if="item.matchType"
        class="tag"
      ><font>{{ item.matchType === 2 ? "足球" : "北单" }}</font></span>
      <span class="time">{{ item.matchTime | parseTime("{m}/{d}") }}</span>
      <div flex-box="1">{{ item.homeTeamName }} VS {{ item.awayTeamName }}</div>
      <van-icon name="arrow" />
    </div>
    <div class="recommend-item-footer" flex="cross:center main:justify">
      <div class="type" flex="cross:center">
        <span>{{ item.createTime | formatTime }}发布</span>
        <span>|</span>
        <span>{{ item.viewNum }}人已浏览</span>
      </div>
      <div flex="cross:center main:right">
        <div v-if="item.isRefund === 2 && item.goldnum !== '0'" class="refund">
          <img-icon icon-name="refund" size="mini" /> 不中退
        </div>
        <div class="rariff">
          <img-icon v-if="item.goldnum !== '0'" icon-name="gold" size="mini" />
          {{ item.goldnum !== "0" ? item.goldnum : "免费" }}
        </div>
      </div>
    </div>
    <div class="recommend-item-position-name" :style="{background:item.flagColor}">
      <font> {{ item.positionName }} </font>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpertRecommendItem',
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
    sortBy: {
      type: String,
      default: ''
    },
    more: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-item {
  padding: 18px 15px;
  font-size: 13px;
  color: #999;
  background-color: #fff;
  margin: 10px 10px;
  border-radius: 6px;
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.04);
  position: relative;
  & &-position-name {
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
    background: #bd9aff;
    line-height: 18px;
    border-top-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 0 6px;
    font {
      display: inline-block;
      transform: scale(0.83);
    }
  }
  &-message {
    display: flex;
    align-items: center;
    .message {
      flex: 1;
      font-size: 10px;
      text-align: center;
      margin-left: 10px;
      line-height: 1.8;
      .md {
        width: 75%;
        text-align: left;
      }
      .sd {
        width: 25%;
      }

      .number {
        @include DIN-FONT(16px, $--color-red);
      }

      .s_t {
        display: inline-block;
        font-size: 10px;
        line-height: 18px;
        padding: 0 3.5px;
        border-radius: 0.5px 7.5px 7.5px 8px;
        border: 1px solid transparent;
        font {
          display: inline-block;
          transform: scale(0.83);
        }
        & + .s_t {
          margin-left: 5px;
        }
        &_red {
          color: #ff7f5a;
          background-color: #fff5f2;
        }
        &_blue {
          color: #be9aff;
          background-color: #f9f5ff;
        }
      }
    }
    .name {
      color: #666;
      font-size: 16px;
    }
  }

  &-text {
    line-height: 20px;
    color: $--color-text-primary;
    margin: 12px 0 12px 0;
  }

  &-extra {
    background: #f7f7fa;
    border-radius: 2px;
    padding: 6px 9px;
    font-size: 12px;
    .tag {
      text-align: center;
      padding: 0 4px;
      display: inline-block;
      color: #7878ff;
      background: #f7f7fa;
      border: 1px solid #b1b1fa;
      border-radius: 2px;
      font {
        display: inline-block;
        transform: scale(0.83);
      }
    }
    .time {
      margin: 0 20px 0 10px;
    }
  }

  &-footer {
    margin-top: 10px;
    font-size: 12px;
    .type {
      & > span + span {
        margin-left: 5px;
      }
      & > span {
        display: inline-block;
        padding: 3px 6px;
        border-radius: 2px;
      }
    }

    .rariff {
      color: #b57f64;
      margin-left: 15px;
    }
    .img-icon {
      margin-top: -4px;
    }
  }
}
</style>

<template>
  <div class="attention-item" @click="goDetail(item.expertId)">
    <div class="attention-item-message" flex="cross:center">
      <Avatar :src="item.avatar" />
      <div class="message" flex="dir:top" flex-box="1">
        <div flex="cross:center">
          <div class="md name">{{ item.nickname }}</div>
          <div class="sd number">{{ item.averageOdds }}</div>
          <div class="sd number-red">{{ parseInt(item.weekReturnrate).toFixed(2) }}%</div>
        </div>
        <div flex="cross:center">
          <div class="md">擅长 {{ item.greatGames ? item.greatGames.replace(/\,/,'/') :'未设置' }}</div>
          <div class="sd">平均赔率</div>
          <div class="sd">周返还率</div>
        </div>
      </div>
    </div>
    <div class="attention-item-footer" flex="corss:center box:first">
      <div class="attention-item-footer__left" flex="cross:center" @click.stop="handleRemind(item)">
        <img :src="item.isRemind === 1 ? require('@/assets/expert/advice_border.png'):require('@/assets/expert/advice.png')" alt="">
        <span>提醒</span>
      </div>
      <div class="attention-item-footer__right" flex="box:mean">
        <div flex="box:first cross:center"><font flex-box="0">近3中{{ item.threeRed }}</font><span>{{ Number(item.threeOfX).toFixed(2) }}%</span></div>
        <div flex="box:first cross:center"><font flex-box="0">近7中{{ item.sevenRed }}</font><span>{{ Number(item.sevenOfX).toFixed(2) }}%</span></div>
        <div flex="box:first cross:center"><font flex-box="0">近10中{{ item.tenRed }}</font><span>{{ Number(item.tenOfX).toFixed(2) }}%</span></div>
      </div>
    </div>
  </div>
</template>

<script>
import { doExpertRemind } from '@/api/expert'
export default {
  name: 'RecommendItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleRemind(item) {
      doExpertRemind({ expertId: item.expertId })
        .then(([data, error]) => {
          if (!error) {
            item.isRemind = data
          }
        })
    },
    goDetail(id) {
      this.$router.push({ name: 'ExpertDetail', params: { locale: this.$i18n.locale, id, from: this.$route.name }})
    }
  }
}
</script>

<style lang="scss" scoped>
.attention-item {
  padding: 10px;
  font-size: 12px;
  color: #999;
  background-color: #fff;
  margin: 0 10px 8px;
  border-radius: 6px;
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.04);
  &-message {
    text-align: center;
    line-height: 1.8;
    .md {
      width: 50%;
      text-align: left;
    }
    .sd {
      width: 25%;
    }

    .message {
      margin-left: 10px;
    }

    .name {
      color: #666;
      font-size: 16px;
    }

    .number {
      @include DIN-FONT(16px)
    }
    .number-red {
      @include DIN-FONT(16px, $--color-red)
    }
  }

  &-footer {
    margin-top: 7px;
    &__left {
      width: 68px;
      & img {
        width: 18px;
        height: 18px;
        margin-right: 2px;
      }
    }

    &__right {
      text-align: center;
      line-height: 28px;
      border: 1px solid #ECECEC;
      border-radius: 2px;
      white-space: nowrap;
      font{

        @include DIN-FONT(12px, #666666);
        display: inline-block;
        transform: scale(0.83)
      }
      span {
        @include DIN-FONT(12px, #2BC898);
        padding: 0 4px;
        display: inline-block;
        transform: scale(0.83)
      }
    }
  }
}
</style>

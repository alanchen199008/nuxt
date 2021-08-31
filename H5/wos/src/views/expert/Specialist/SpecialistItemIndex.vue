<template>
  <div class="specialist-item" flex="box:first" @click="$emit('click',item.id)">
    <div class="specialist-item-level">
      <!-- <img v-if="i < 3" :src="require(`@/assets/expert/expert-${i + 1}.png`)">
      <span v-else>{{ i + 1 }}</span> -->
    </div>
    <div>
      <div flex="cross:center">
        <Avatar :src="item.avatar" />
        <div class="specialist-item-message" flex-box="1">
          <div flex="box:last cross:center">
            <span
              class="md"
            ><span class="name">{{ item.nickname }}</span><span class="sale">在售 {{ item.artcileNum }}</span></span>
            <div class="number-red">
              {{ sortBy === "1" ? item.weekReturnrate + "%" : sortBy === "2" ? item.weekBuyTimes : item.weekWinrate + "%" }}
            </div>
          </div>
          <div class="total" flex="box:last cross:stretch">
            <div class="introduction">
              {{ item.introduction }}
            </div>
            <div> {{ sortBy === "1" ? "周返还率" : sortBy === "2" ? "周人气" : "周胜率" }}
            </div>
          </div>
          <div flex="box:last cross:center">
            <div class="md great-game">
              <template
                v-if="item.greatGames"
              >擅长
                <span
                  v-for="(great, index) in item.greatGames.split(',')"
                  :key="index"
                  class="great"
                >{{ great }}</span></template>
            </div>
            <template v-if="memberId !== item.memberId">
              <button
                :class="item.concernFlag ? 'attention' : 'unattention'"
                @click.stop="handleAttention(item)"
              >
                <template v-if="item.concernFlag"> 已关注 </template>
                <template
                  v-else
                ><svg-icon icon-class="plus-line" />关注</template>
              </button>
            </template>
          </div>
        </div>
      </div>
      <div class="balls">
        近期战绩
        <span
          v-for="(a, index) in item.redBlackList"
          :key="index"
          class="ball"
          :class="a === 1 ? 'r' : 'b'"
        ><font>{{ a === 1 ? "红" : "黑" }}</font></span>
      </div>
    </div>
  </div>
</template>

<script>
import { doExpertAttention } from '@/api/expert'
import { mapGetters } from 'vuex'
export default {
  name: 'SpecialistItemIndex',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    sortBy: {
      type: String,
      default: ''
    },
    i: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapGetters(['memberId'])
  },
  methods: {
    handleAttention(item) {
      doExpertAttention({ expertId: item.id }).then(([data, error]) => {
        if (!error) {
          if (data === 1) {
            item.concernFlag = true
          } else {
            item.concernFlag = false
          }
        }
      })
    },
    goDetail(id) {
      this.$router.push({
        name: 'ExpertDetail',
        params: {
          locale: this.$i18n.locale,
          id,
          from: this.$route.name
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.specialist-item {
  padding: 15px 9px;
  font-size: 12px;
  background-color: #fff;
  margin: 0 10px 8px;
  border-radius: 4px;
  box-shadow: 1px 2px 4px 0px rgba(0, 0, 0, 0.04);
  &-level {
    width: 26px;
    @include DIN-FONT(20px, #c7c9d5);
    & > img {
      height: 23px;
    }
  }
    .introduction{
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  button {
    line-height: 24px;
    border-radius: 4px;
    font-size: 12px;
    padding: 0 8px;
    border: none;
    &.attention {
      color: #999;
      background: #f2f2f2;
    }
    &.unattention {
      color: #fff;
      background: #21d4ad;
    }
  }
  &-message {
    margin-left: 10px;
    line-height: 1.8;
    .md {
      width: 50%;
      text-align: left;
      line-height: 24px;
    }
    .sd {
      width: 25%;
    }
    .name {
      color: #666;
      font-size: 16px;
      vertical-align: middle;
    }
    .total {
      font-size: 12px;
      color: #b3b3b3;
    }
    .great {
      line-height: 18px;
      padding: 4px;
      border-radius: 2px;
      margin: 0 2px 0 2px;
      background: #f5f5f5;
      color: #666;
    }
    .sale {
      padding: 0 4px;
      display: inline-block;
      color: #ff7f59;
      border: 1px solid #ff7f59;
      border-radius: 2px;
      line-height: 15px;
      background: #fef8f7;
      margin-left: 12px;
      vertical-align: middle;
    }
    .number {
      @include DIN-FONT(16px);
    }
    .number-red {
      @include DIN-FONT(16px, $--color-red);
    }
  }
  .balls {
    padding: 8px 0;
    color: #666;
    .ball {
      width: 19px;
      height: 19px;
      text-align: center;
      line-height: 19px;
      display: inline-block;
      border-radius: 12px;
      color: #fff;
      font-size: 12px;
      margin-right: 3px;
      &:last-child {
        margin-right: 0;
      }
      &.r {
        background: #f55050;
      }
      &.b {
        background: #a3a3a3;
      }
      font{
        display: inline-block;
        transform:scale(0.83);
      }
    }
  }
}
</style>

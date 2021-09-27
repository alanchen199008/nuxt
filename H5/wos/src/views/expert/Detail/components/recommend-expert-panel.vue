<template>
  <div class="recommend-expert-panel" flex="box:mean cross:center">
    <div class="avatar" flex-box="0">
      <Avatar :src="data.avatar" @click="toDetail(data.expertId,data.articleId)" />
    </div>
    <div class="info">
      <div class="member-name">
        <div class="attention" style="float:right">
          <button v-if="!data.self" :class="data.concernFlag ? 'active' : '' " @click="handleAttention">
            <svg-icon :icon-class="data.concernFlag ? 'success-line' :'plus-line'" @click="handleAttention" />关注
          </button>
        </div>
        {{ data.nickname }}
      </div>
      <div style="display:flex;margin-top:5px">
        <div v-if="data.artcileNum && data.redNum" class="s_t s_t_blue">近{{ data.artcileNum }}中{{ data.redNum }}</div>
        <div v-if="data.linkwin" class="s_t s_t_red">{{ data.linkwin }}连红</div>
      </div>
      <!-- <div class="position-name">{{ data.positionName }}</div> -->
      
    </div>
    <div class="rate" flex-box="0">
      <div class="number">{{ Number(data.winrate).toFixed(0) }}%</div>
      <div class="text">胜率</div>
      <!-- <div v-if="data.artcileNum && data.redNum" class="s_t s_t_blue">{{ data.artcileNum }}中{{ data.redNum }}</div>
      <div v-else class="s_t" /> -->
    </div>
    <div class="rate" flex-box="0">
      <div class="number">{{ Number(data.returnrate).toFixed(0) }}%</div>
      <div class="text">返还率</div>
      <!-- <div v-if="data.linkwin" class="s_t s_t_red">{{ data.linkwin }}连中</div>
      <div v-else class="s_t" /> -->
    </div>
  </div>
</template>

<script>
import { doExpertAttention } from '@/api/expert'
export default {
  name: 'RecommendExpertPanel',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleAttention() {
      doExpertAttention({ expertId: this.data.expertId })
        .then(([data, error]) => {
          if (!error) {
            if (this.data.concernFlag) {
              this.data.concernFlag = false
              this.$toast('取消关注成功!')
            } else {
              this.data.concernFlag = true
              this.$toast('关注成功!')
            }
          }
        })
    },
    toDetail(id, pid) {
      this.$router.push({ name: 'RecommendExpertDetail', params: { id, pid }})
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-expert-panel {
  height: 88px;
  padding: 13px 14px;
  position: relative;
  z-index: 1;
  border-radius: 6px;
  margin: 0 10px 0 10px;
  background: url('~@/assets/expert/expert_panel.png') no-repeat;
  background-size: cover;
  color: #fff;
  .avatar {
    width: 52px;
    ::v-deep .avatar-portrait{
      width: 52px;
      height: 52px;
      border: none;
    }
  }
  .info {
    padding: 0 10px;
    line-height: 24px;
    .member-name {
      font-size: 16px;
      font-weight: bold;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .position-name {
      font-size: 12px;
    }
    .attention {
      button {
        font-size: 15px;
        line-height: 20px;
        border-radius: 9px;
        padding: 0 8px;
        background: #FF5B5BFF;
        font-weight: normal;
        &.active{
          background: #21D4AD;
          color: #fff;
          border-color: #21D4AD;
        }
      }
    }
  }
  .rate {
    width: 54px;
    text-align: center;
    line-height: 24px;
    .number {
      @include DIN-FONT(19px, $--color-red);
    }
    .text {
      font-size: 11px;
    }
  }
  .s_t {
    display: inline-block;
    font-size: 9px;
    line-height: 15px;
    padding: 0 7px;
    border-radius: 0.5px 7.5px 7.5px 8px;
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
</style>

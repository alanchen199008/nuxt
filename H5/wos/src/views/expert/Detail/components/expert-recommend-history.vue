<template>
  <div class="expert-recommend-history panel">
    <div class="panel-title">历史方案</div>
    <div class="panel-content">
      <div v-for="(item, index) in items.filter(item => item.redBlack ) " :key="index" class="recommend-item" @click="goDetail(item.articleId)">
        <div>
          <font color="#FF5950">[{{ item.articleSchedules == 1 ? "单场" : "串联" }}]</font>{{ item.title }}
        </div>
        <div v-for="(match, num) in item.matchList" :key="num" class="match-item" flex="cross:center box:mean">
          <div class="match-item-left" flex-box="0">
            <span>{{ match.matchType === 2 ? "足球" : "北单" }}</span>{{ match.matchTime | parseTime("{m}/{d}") }}
          </div>
          <div class="match-item-center">
            {{ match.homeTeamName }} VS {{ match.awayTeamName }}
          </div>
          <div class="match-item-right" flex-box="0">
            <van-icon name="arrow" flex-box="0" />
          </div>
        </div>
        <div class="recommend-bottom" flex="cross:center box:mean">
          <div>{{ item.createTime | formatTime() }}</div>
          <div flex="cross:center box:last">
            <div class="align-right">{{ item.viewNum }}人已浏览 <template v-if="item.goldnum !=='0'">｜ 售{{ item.buynum }}</template> </div>
            <div class="align-right">
              <em v-if="item.redBlack === 1" class="red">红</em>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpertRecommendHistory',
  props: {
    items: {
      type: Array,
      default: () => {}
    },
    expertId: {
      type: String,
      default: ''
    }
  },

  methods: {
    goDetail(id) {
      this.$router.push({ name: 'ExpertRecommendDetail', params: { id, pid: this.expertId }})
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-title {
  font-size: 14px;
  font-weight: 600;
  &::before {
    width: 3px;
    height: 14px;
    background: #f87d22;
    border-radius: 4px;
    content: "";
    display: inline-block;
    vertical-align: middle;
    margin-top: -2px;
    margin-right: 10px;
  }
}
.panel-content {
  padding: 0 0 15px 0;
  .recommend-item {
    border-bottom: 1px solid #e0e0e0;
    margin-top: 15px;
    .recommend-bottom {
      padding: 10px 0;
      font-size: 12px;
      color: #999;
      &:last-child {
        div {
          &:last-child {
            margin-left: 10px;
          }
        }
      }
      em.red{
       width: 26px;
       line-height: 26px;
       border-radius: 50%;
       display: inline-block;
       background: #F55050;
       color: #fff;
       font-style: normal;
       text-align: center;
      }
      span {
        background: none;
        border: none;
        color: #05d56d;
      }
      .tag {
        padding: 6px;
        display: inline-block;
        border: 1px solid #dddddd;
        background: #fff;
        color: #999;
        margin-right: 5px;
      }
    }
  }
}
.match-item {
  border: 1px solid #ebebeb;
  margin: 5px 0 5px 0;
  color: #999;
  padding: 5px;
  font-size: 12px;
  &-left {
    width: 35%;
    span {
      padding: 0 10px;
      height: 18px;
      line-height: 18px;
      border-radius: 2px;
      background: #f2f2f2;
      margin-right: 10px;
    }
  }
  &-center {
  }
  &-right {
    width: 18px;
  }
}
.align-right {
  text-align: right;
}
</style>

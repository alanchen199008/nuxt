<template>
  <div class="recommend-item" @click="toDetail(item.articleId)">
    <div class="recommend-item-text">{{ item.title }}</div>
    <div
      v-for="(match, index) in item.matchList"
      :key="index"
      class="recommend-item-extra"
      flex="cross:center"
    >
      <span class="time">{{
        match.matchTime | parseTime("{m}/{d} {h}:{i}")
      }}</span>
      <span class="name">{{ match.competitionName }}</span>
      <div flex-box="1">
        {{ match.homeTeamName }} VS {{ match.awayTeamName }}
      </div>
      <van-icon name="arrow" />
    </div>
    <div class="recommend-item-footer" flex="cross:center main:justify">
      <div class="tag">
        <span>{{ item.ruleType === 1 ? "足球" : "篮球" }}</span>
        <span>{{ item.articleSchedules === 1 ? "单场" : "串连" }}</span>
      </div>
      <div flex="cross:center main:right">
        <span v-if="item.articleStatus !== 2" class="status">
          {{ item.articleStatus === 1 ? '审核中':item.articleStatus === 3 ? '未通过' : item.articleStatus === 4 ? '已取消':'' }}
        </span>
        <div v-if="item.goldnum !== '0'" class="rariff">
          {{ item.goldnum }}球币 <img-icon icon-name="gold" size="mini" />
        </div>
        <div v-else class="rariff">免费</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    more: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({
        name: 'ExpertRecommendDetail',
        params: { id, locale: this.$i18n.locale, from: this.$route.name }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend-item {
  padding: 18px 15px;
  font-size: 12px;
  color: #999;
  background-color: #fff;
  margin: 10px 10px;
  border-radius: 6px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.04);
  position: relative;
  &-text {
    font-size: 16px;
    line-height: 30px;
    color: $--color-text-primary;
  }

  &-extra {
    border: 1px solid #ececec;
    border-radius: 2px;
    padding: 6px 9px;
    margin-top: -1px;
    .name {
      margin: 0 20px 0 10px;
    }
  }

  &-footer {
    margin-top: 10px;
    .tag {
      span {
        border: 1px solid #dddddd;
        padding: 5px 6px;
        margin: 0 2.5px 0 2.5px;
        border-radius: 2px;
      }
    }
    .status {
      padding: 1px 6px;
      color: #FF7F59;
      background: #fff7f6;
      border: 1px solid #FF7F59;
      border-radius: 2px;
    }
    .rariff {
      color: #06d66e;
      margin-left: 15px;
      .img-icon {
        margin-top: -4px;
      }
    }
  }
}
</style>

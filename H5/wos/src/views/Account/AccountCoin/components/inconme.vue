<template>
  <div class="inconme-item">
    <van-row type="flex" justify="space-between" class="van-hairline--bottom">
      <van-col>{{ item.createTime | parseTime }}</van-col>
      <van-col>
        <em v-if="item.amount < 0" class="less">{{
          parseFloat(item.amount)
        }}</em>
        <em v-else class="plus">+{{ parseFloat(item.amount) }}</em>
        <span>{{ txt }}</span>
      </van-col>
    </van-row>
    <van-row type="flex" justify="space-between">
      <van-col>
        [{{ item.transType === 301 ? '专家下分' : item.transType === 300 ? '出售方案 ' : item.remark }}]
        <button v-if="item.transType === 68 || item.transType === 86 || item.transType === 300" class="button" @click="toDetail(item.transDetail)">方案详情</button>
      </van-col>
      <van-col>当前额度
        <span
          class="amount"
        >{{ parseFloat(item.newBalance) }}{{ txt }}</span></van-col>
    </van-row>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      type: Number,
      default: 0
    },
    item: {
      type: Object,
      default: () => ({})
    }
  },

  computed: {
    txt() {
      return this.type === 0 ? '球币' : '收益'
    }
  },
  methods: {
    toDetail(id) {
      this.$router.push({ name: 'ExpertRecommendDetail', params: { id, locale: this.$i18n.locale }})
    }
  }
}
</script>
<style lang="scss" scoped>
.inconme-item {
  font-size: 14px;
  padding: 15px 10px;
  margin-top: 6px;
  line-height: 30px;
  background-color: white;
  color: $--color-text-secondary;
  .van-row {
    padding: 0 16px;
    &:first-child {
      border-bottom: 1px solid #dfdfdf;
    }
  }
  em {
    font-style: inherit;
    font-size: 18px;
    padding-right: 3px;
    &.less {
      color: #34a853;
    }
    &.plus {
      color: #ea4335;
    }
  }
  .button {
    border: 0;
    outline: none;
    color: white;
    background-color: #21d4ad;
    border-radius: 2px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    padding: 0 3px;
  }
  .amount {
    color: $--color-text-regular;
  }
}
</style>

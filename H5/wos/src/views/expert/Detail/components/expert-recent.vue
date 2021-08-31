<template>
  <div class="expert-recent panel">
    <div flex="cross:center box:mean">
      <div class="panel-title">最近战绩</div>
      <div class="align-right">最高连胜{{ data.linkwin }}</div>
    </div>
    <div class="balls" flex="cross:center main:left">
      <span v-for="(item,index) in data.recentRecord" :key="index" class="ball" :class="item === 'red' ? 'r':'b'">{{ item === 'black' ? '黑' : '红' }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExpertRecent',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.expert-recent {
  .panel-title {
    font-size: 14px;
    font-weight: 600;
    &::before {
      width: 3px;
      height: 14px;
      background: #F87D22;
      border-radius: 4px;
      content: "";
      display: inline-block;
      vertical-align: middle;
      margin-top: -2px;
      margin-right: 10px;
    }
  }
  .balls {
    padding: 8px 0;
    .ball {
      width: 24px;
      height: 24px;
      text-align: center;
      line-height: 24px;
      display: inline-block;
      border-radius: 12px;
      color: #fff;
      font-size: 12px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
      &.r {
        background: #f55050;
      }
      &.b {
        background: #a3a3a3;
      }
    }
  }
}
.align-right {
  text-align: right;
  color: #FF7F59;
  font-size: 12px;
}
</style>

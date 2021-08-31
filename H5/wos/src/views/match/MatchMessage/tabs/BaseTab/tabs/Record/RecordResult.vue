<template>
  <div class="record-result">
    <div class="record-result-main">
      <slot>主队</slot>:
      <span>
        <em class="color-red-regular">{{ result.win || 0 }}</em>胜 <em class="color-green-regular">{{ result.tie || 0 }}</em>平 <em class="color-blue-regular ">{{ result.lose || 0 }}</em>负
      </span>
      <span class="van-hairline--left">
        进<em>{{ result.jqCount || 0 }}</em>球 失<em>{{ result.loseCount || 0 }}</em>球
      </span>
      <span class="van-hairline--left">
        胜率<em class="color-red-regular">{{ result.winRate | parsePrecision }}%</em></span>
      <span class="van-hairline--left">
        赢率<em class="color-red-regular">{{ result.panWinRate | parsePrecision }}%</em>
      </span>
      <span>大率<em class="color-red-regular">{{ result.panBigRate | parsePrecision }}%</em></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecordResult',
  props: {
    result: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.record-result {
  line-height: 22px;
  font-size: 12px;
  .record-result-main {
    margin-left: -10px;
    white-space: nowrap;
    transform: scale(0.95);
    em {
      font-style: normal;
      padding: 0;
    }
    span {
      padding: 0;
    }
  }
}
</style>

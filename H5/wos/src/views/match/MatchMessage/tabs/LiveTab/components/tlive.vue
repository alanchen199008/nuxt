<template>
  <div class="event-list">
    <template v-if="data && data.length > 0">
      <div v-for="item in data" :key="item.key" class="event-list-item">
        <div class="left">
          <img
            v-if="item.type"
            :src="require(`@/assets/event/${item.type}.png`)"
            :class="`type-${item.type}`"
          >
        </div>
        <div class="text">{{ item.data.replace(/^\d{1,}\'$/, "") }}</div>
      </div>
    </template>
    <d-empty v-else />
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="scss" scoped>
.event-list {
  font-size: 12px;
  color: $--color-text-regular;
  margin-top: 12.5px;
  background-color: #fff;
  &-item {
    display: flex;
    align-items: center;
    padding: 20px 12px;
     &:nth-of-type(2n){
      background-color: #edeef1;
    }
    &:nth-of-type(2n + 1) {
      background-color: #fff;
    }
    & > .left {
      flex: 0 1 25px;
      display: flex;
      align-items: center;
      img {
        width: 15px;
      }
      .time {
        font-size: 15px;
        font-weight: 500;
        margin-left: 10px;
      }
    }
    & > .text {
      flex: 1;
      line-height: 1.4;
    }
  }
}
</style>

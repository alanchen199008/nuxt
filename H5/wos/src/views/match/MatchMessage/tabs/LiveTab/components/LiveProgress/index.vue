<template>
  <div class="live-progress">
    <template v-if="data.length > 0">
      <div v-for="item in data" :key="item.key" class="live-progress-item">
        <van-row class="top">
          <van-col :span="8" class="number">{{ item.home }}</van-col>
          <van-col :span="8">{{ item.mark }}</van-col>
          <van-col :span="8" class="number">{{ item.away }}</van-col>
        </van-row>
        <van-row :gutter="5" class="progress">
          <van-col :span="12" class="home">
            <van-progress
              pivot-text=""
              track-color="#EFF0F3"
              color="#ED736F"
              stroke-width="6px"
              :percentage="getPercentage(item.home, item.away)"
            />
          </van-col>
          <van-col :span="12" class="away">
            <van-progress
              pivot-text=""
              track-color="#EFF0F3"
              color="#658DF7"
              stroke-width="6px"
              :percentage="getPercentage(item.away, item.home)"
            />
          </van-col>
        </van-row>
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
  },
  methods: {
    getPercentage(a, b) {
      return (a / (a + b)) * 100 || 0
    }
  }
}
</script>

<style lang="scss" scoped>
.live-progress {
  text-align: center;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 15px;
  color: $--color-text-regular;
  font-size: 13px;
  &-item {
    margin-bottom: 10px;
    line-height: 30px;
    .top {
      .number {
        color: #000;
        font-weight: 500;
        font-size: 14px;
        &:first-child {
          text-align: left;
        }
        &:last-child {
          text-align: right;
        }
      }
    }
    .home {
      ::v-deep .van-progress__portion {
        left: inherit;
        right: 0;
      }
    }
  }
}</style
>>

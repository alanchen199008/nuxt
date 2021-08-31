<template>
  <div class="banch-list">
    <van-row class="banch-list-head">
      <van-col span="12" class="banch-list-head_item">
        <slot name="home" />
      </van-col>
      <van-col span="12" class="banch-list-head_item van-hairline--left">
        <slot name="away" />
      </van-col>
    </van-row>
    <van-row>
      <van-col span="12">
        <div
          v-for="item in homeBench"
          :key="item.id"
          class="banch-list-item van-hairline--bottom"
        >
          <div class="banch-list-item__avatar banch-list-item__avatar--home" :data-number="item.shirtNumber">
            <van-image :src="item.logo" round lazy-load />
          </div>
          <div class="banch-list-item__name van-ellipsis">
            {{ item.name }}
          </div>
        </div>

      </van-col>
      <van-col span="12">
        <div
          v-for="item in awayBench"
          :key="item.id"
          class="banch-list-item van-hairline--left van-hairline--bottom"
        >
          <div class="banch-list-item__avatar banch-list-item__avatar--away" :data-number="item.shirtNumber">
            <van-image :src="item.logo" round lazy-load />
          </div>
          <div class="banch-list-item__name van-ellipsis">
            {{ item.name }}
          </div>
        </div>
      </van-col>
    </van-row>

  </div>
</template>

<script>
export default {
  props: {
    homeBench: {
      type: Array,
      default: () => []
    },
    awayBench: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.banch-list {
  margin: 0 -10px;
  padding: 0 10px;
  &-head {
    height: 45px;
    background-color: var(--paper-grey);
    font-size: 14px;
    font-weight: bolder;
    &_item {
      display: flex;
      align-items: center;
      height: 100%;
      padding: 0 15px;
    }
  }
  &-item {
    padding: 6px 15px;
    display: flex;
    align-items: center;
    color: $--color-text-secondary;
    // border-bottom: 1px solid #EDEDED;
    margin: -1px 0;
    &__avatar {
      border-radius: 50%;
      position: relative;
      &::after {
        content: attr(data-number);
        width: 16.8px;
        height: 18px;
        position: absolute;
        top: 50%;
        right: -8px;
        z-index: 2;
        text-align: center;
        line-height: 20px;
        color: white;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        transform: scale(0.8333) translateY(-50%);
      }
      &--home {
        &::after {
          background-image: url('~@/assets/public/shield-home.png');
        }
      }
      &--away {
        &::after {
          background-image: url('~@/assets/public/shield-away.png');
        }
      }

      ::v-deep .van-image {
        width: 25px;
        height: 25px;
      }
    }
    &__name {
      margin-left: 15px;
      flex: 1;
      .name {
        color: $--color-text-primary;
        font-size: 13px;
      }
    }
  }
}
</style>

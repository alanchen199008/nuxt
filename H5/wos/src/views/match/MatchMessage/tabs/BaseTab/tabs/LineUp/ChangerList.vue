<template>
  <div class="changer-list">
    <div class="home">
      <div class="changer-list-head" flex="cross:center">
        <slot name="home" />
      </div>
      <div
        v-for="(item, index) in homeChanger"
        :key="index"
        flex="cross:center box:mean"
        class="changer-list-item"
        :class="{ 'van-hairline--bottom': index != homeChanger.length - 1 }"
      >
        <div flex="cross:center">
          <div
            flex-box="0"
            class="changer-list-item__avatar changer-list-item__avatar--home"
            :data-number="item.inShirtNumber"
          >
            <van-image :src="item.inLogo" round lazy-load />
          </div>
          <div flex-box="1" class="banch-list-item__name van-ellipsis">
            {{ item.inPlayerName }}
          </div>
        </div>
        <div class="changer-list-item__time" flex-box="0">
          <img class="icon" :src="require('@/assets/changer.png')">
          {{ item.time }}'
        </div>
        <div flex="cross:center">
          <div
            class="changer-list-item__avatar changer-list-item__avatar--home"
            :data-number="item.outShirtNumber"
          >
            <van-image :src="item.outLogo" round lazy-load />
          </div>
          <div class="changer-list-item__name van-ellipsis">
            {{ item.outPlayerName }}
          </div>
        </div>
      </div>
    </div>
    <div class="away">
      <div class="changer-list-head" flex="cross:center">
        <slot name="away" />
      </div>
      <div
        v-for="(item, index) in awayChanger"
        :key="index"
        flex="cross:center box:mean"
        class="changer-list-item"
        :class="{ 'van-hairline--bottom': index != awayChanger.length - 1 }"
      >
        <div flex="cross:center box:first">
          <div
            flex-box="0"
            class="changer-list-item__avatar changer-list-item__avatar--away"
            :data-number="item.inShirtNumber"
          >
            <van-image :src="item.inLogo" round lazy-load />
          </div>
          <div flex-box="1" class="banch-list-item__name van-ellipsis">
            <div class="changer-list-item__name van-ellipsis">
              {{ item.inPlayerName }}
            </div>
          </div>
          <div class="changer-list-item__time" flex-box="0">
            <img class="icon" :src="require('@/assets/changer.png')">
            {{ item.time }}'
          </div>
          <div flex="cross:center box:first">
            <div
              class="changer-list-item__avatar changer-list-item__avatar--away"
              :data-number="item.outShirtNumber"
            >
              <van-image :src="item.outLogo" round lazy-load />
            </div>
            <div class="changer-list-item__name van-ellipsis">
              {{ item.outPlayerName }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div></template>
<script>
export default {
  props: {
    homeChanger: {
      type: Array,
      default: () => []
    },
    awayChanger: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="scss" scoped>
.changer-list {
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
    padding: 10px 15px;
    color: $--color-text-defalt;
    // border-bottom: 1px solid #EDEDED;
    margin: -1px 0;
    display: flex;
    align-items: center;
    &__avatar {
      width: 34px;
      border-radius: 50%;
      position: relative;
      &::after {
        content: attr(data-number);
        width: 16.8px;
        height: 18px;
        position: absolute;
        top: 50%;
        right: 4px;
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
          background-image: url("~@/assets/public/shield-home.png");
        }
      }
      &--away {
        &::after {
          background-image: url("~@/assets/public/shield-away.png");
        }
      }
      ::v-deep .van-image {
        width: 25px;
        height: 25px;
      }
    }

    &__name {
      margin-left: 10px;
      .name {
        color: $--color-text-defalt;
        font-size: 13px;
      }
    }
    &__time {
      width: 50px;
      text-align: center;
      .icon {
        width: 12px;
        height: 12px;
      }
    }
  }
}
</style>

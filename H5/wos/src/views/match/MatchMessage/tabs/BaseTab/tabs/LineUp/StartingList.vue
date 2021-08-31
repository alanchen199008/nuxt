<template>
  <div class="starting">
    <div class="starting-head">
      <slot name="home" />
    </div>
    <div class="starting-body">
      <div class="starting-formation starting-formation-home">{{ homeFormation }}</div>
      <div
        v-for="item in home"
        :key="item.id"
        class="starting-item"
        :style="{ top: item.y + '%', left: item.x + '%' }"
        flex="dir:top cross:center"
      >
        <div class="starting-item-avatar">
          <div class="starting-item-avatar__shield" :class="`starting-item-avatar__shield--home`">
            <span class="text">{{ item.shirtNumber }}</span>
          </div>
          <van-image :src="item.logo" round lazy-load />
        </div>
        <p class="starting-item-name van-ellipsis">{{ item.name }}</p>
      </div>
    </div>

    <div class="starting-body">
      <div class="starting-formation starting-formation-away">{{ awayFormation }}</div>
      <div
        v-for="item in away"
        :key="item.id"
        class="starting-item"
        :style="{ top: (100 - item.y) + '%', left: item.x + '%' }"
        flex="dir:top cross:center"
      >
        <div class="starting-item-avatar">
          <div class="starting-item-avatar__shield" :class="`starting-item-avatar__shield--away`">
            <span class="text">{{ item.shirtNumber }}</span>
          </div>
          <van-image :src="item.logo" round lazy-load />
        </div>
        <p class="starting-item-name van-ellipsis">{{ item.name }}</p>
      </div>
    </div>

    <div class="starting-head">
      <slot name="away" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    home: {
      type: Array,
      default: () => []
    },
    away: {
      type: Array,
      default: () => []
    },
    homeFormation: {
      type: String,
      default: ''
    },
    awayFormation: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.starting {
  position: relative;
  background: url('~@/assets/public/link.png') top center no-repeat;
  background-size: cover;
  &-head {
    height: 46px;
    font-size: 16px;
    color: white;
    display: flex;
    align-items: center;
    img {
      width: 30px;
      margin: 0 10px;
      vertical-align: middle;
    }
  }
  &-body {
    position: relative;
    height: 357px;
  }
  &-formation {
    position: absolute;
    right: 10px;
    font-size: 15px;
    color: white;
    &-home {
      top: 10px;
    }
    &-away {
      bottom: 10px;
    }
  }
  &-item {
    position: absolute;
    text-align: center;
    transform: translate(-50%, -25px);
    color: white;
    width: 25%;
    &-avatar {
      width: 34px;
      height: 34px;
      background-color: white;
      border-radius: 50%;
      position: relative;

      &__shield {
        width: 14px;
        height: 15px;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        position: absolute;
        z-index: 5;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        &--home {
          background-image: url('~@/assets/public/shield-home.png');
        }
        &--away {
          background-image: url('~@/assets/public/shield-away.png');
        }
        .text {
          display: inline-block;
          transform: scale(0.833);
        }
      }

      ::v-deep .van-image__img {
        width: 34px;
        height: 34px;
      }
    }

    &-name {
      width: 100%;
      padding: 0 5px;
    }
  }
}
</style>

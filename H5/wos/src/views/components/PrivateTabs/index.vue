<template>
  <div :class="wrapClasses">
    <van-tabs v-model="currentValue" animated type="card">
      <van-tab
        v-for="tab in tabs"
        :key="tab.value"
        :title="tab.name"
      />
    </van-tabs>
  </div>
</template>
<script>

import { oneOf } from '@/utils/assist'

const prefixCls = 'we-tabs'

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'default'])
      },
      default: 'default'
    },
    tabs: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.size}`]: !!this.size
        }
      ]
    },
    currentValue: {
      get: () => {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$tab-clsfix: van-tab;
$tabs-clsfix: van-tabs;
$height: 32px;
.navbar-tabs {
  box-shadow: 1px 4px 8px 0px rgba(0, 0, 0, 0.08);
  .#{$tab-clsfix} {

    &:first-child {
      border-radius: 16px 0 0 16px;
    }
    &:last-child {
      border-radius:  0 16px 16px 0;
    }
  }

  &.#{$tabs-clsfix}--card {
    & > .#{$tabs-clsfix}__wrap {
      height: $height;
    }
  }

  .#{$tabs-clsfix} {
    &__nav {
      background-color: transparent;
    }
    &__nav--card {
      border: 0;
      height: $height;
      margin: 0;
      .van-tab {
        border: 0;
        font-size: 17px;
        padding: 0 15px;
        line-height: 1;
        color: rgba(255, 255, 255, 0.8);
        background-color: rgba(255, 255, 255, 0.3);
      }
      .van-tab.van-tab--active {
        color: $--color-green;
        background-color: #fff;
      }
    }
  }
}
</style>

<template>
  <div class="d-card" :class="[shadow && 'd-card-shadow', full && 'd-card-full']">
    <div class="d-card__head">
      <div class="d-card__head-left">
        <img src="@/assets/public/flag.png">{{ title }}
      </div>
      <div class="d-card__head-right" @click="onRightClick">
        <slot name="extra">{{ extraTxt }}<svg-icon icon-class="arrow-right" /></slot>
      </div>
    </div>
    <div class="d-card__body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },

    extraTxt: {
      type: String,
      default: '更多'
    },
    full: {
      type: Boolean,
      default: false
    },
    shadow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    onRightClick() {
      this.$emit('right-click')
    }
  }
}
</script>

<style lang="scss">

.d-card {
  position: relative;
  background-color: #fff;
  margin: 10px 10px 0;
  border-radius: 6px;

  &__head {
    padding: 8px 10px 0 10px;
    color: #999;
    font-size: 13px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-left {
      font-size: 15px;
      color: #333;
      line-height: 30px;
      img {
        width: 7.5px;
        height: 12.5px;
        margin-right: 10px;
      }
    }

    &-right {
      .svg-icon {
        font-size: 6px;
        margin-left: 10px;
        vertical-align: middle;
      }
    }
  }

  &-shadow {
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  }

  &-full {
    margin: 10px 0 0 0;
    border-radius: 0;
    .d-card__head {
      padding: 8px 15px;
    }
  }

}
</style>

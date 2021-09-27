<template>
  <div class="wos-card">
    <div class="wos-card__head">
      {{ title }}
    </div>
    <div class="wos-card__body">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'WosCard',
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
  }
}
</script>

<style lang="scss">
.wos-card {
  position: relative;
  background-color: #fff;
  margin: 10px 0 0;
  // box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.08);
  &__head {
    padding: 15px 10px 10px;
    color: #333333FF;
    font-size: 15px;
    font-weight: 600;
    border-bottom: 1px solid #EBEBEB;
    &::before {
      width: 3px;
      height: 15px;
      content: "";
      margin-top: -4px;
      display: inline-block;
      margin-right: 4px;
      vertical-align: middle;
      border-radius: 3px;
      background: #F87D22;
    }
  }
  &__body {
    font-size: 13px;
    padding: 6px 15px 12px;
    p { margin-bottom: 15px;}
  }
}
</style>

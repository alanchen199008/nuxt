<template>
  <span ref="icon" class="img-icon" :class="iconName + ' ' + size" @click="OnClick" />
</template>

<script>
export default {
  name: 'ImgIcon',
  props: {
    iconName: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  methods: {
    OnClick() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
.img-icon {
  display: inline-block;
  vertical-align: middle;
  &.large{
    width: 64px;
    height: 64px;
  }
  &.big{
    width: 48px;
    height: 48px;
  }
  &.medium {
    width: 32px;
    height: 32px;
  }
  &.small {
    width: 24px;
    height: 24px;
  }
  &.mini {
    width: 16px;
    height: 16px;
  }
}
</style>

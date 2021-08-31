<template>
  <ul class="d-tabs">
    <li v-for="tab in tabs" :key="tab.name" :class="['d-tabs-item', tab.name === currentValue && 'd-tabs-item-current']" @click="onClick(tab.name)">{{ tab.title }}</li>
  </ul>
</template>
<script>
export default {
  props: {
    value: {
      type: [Number, String],
      default: ''
    },
    tabs: {
      type: Array,
      default: () => []
    },
    itemWidth: {
      type: [Number, String],
      default: 58
    }
  },
  data() {
    return {
      currentValue: this.value
    }
  },

  computed: {
    itemStyle() {
      if (typeof this.itemWidth === 'number') {
        return { width: this.itemWidth + 'px' }
      }
      return { width: this.itemWidth }
    }
  },

  watch: {
    value(val) {
      this.currentValue = val
      this.$emit('input', val)
    }
  },
  methods: {
    onClick(val) {
      if (this.currentValue !== val) {
        this.currentValue = val
        this.$emit('input', val)
        this.$emit('change', val)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.d-tabs {
  display: flex;
  align-items: stretch;
  height: 27px;
  text-align: center;
  &-item {
    width: 58px;
    line-height: 25px;
    font-size: 13px;
    color: $--color-text-secondary;
    border: 1px solid #ddd;
    border-left-width: 0;

    cursor: pointer;

    &:first-child {
      border-left-width: 1px;
      border-radius: 14px 0 0 14px;
    }
    &:last-child {
      // border-right: 1px solid #DEDEDE;
      border-radius: 0 14px 14px 0;
    }
    // &:not(:last-child) {
    //   border-right: 1px solid #DEDEDE;
    // }

    &-current {
      color: #fff;
      border-color: $--color-primary;
      background-color: $--color-primary;
    }

  }
}
</style>

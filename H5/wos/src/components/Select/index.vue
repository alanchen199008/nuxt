<template>
  <div class="wos-select">
    <div class="active-item" flex="box:first cross:center" @click.stop="ShowOption">
      <span flex-box="0">{{ label }}</span>
      <svg-icon :icon-class="visible ? 'arrow-up':'arrow-down'" class-name="select-icon" />
    </div>
    <ul v-show="visible" class="options">
      <li
        v-for="item in options"
        :key="item.ruleCode"
        :class="item.ruleCode === currentValue && 'active'"
        @click="handleClick(item)"
      >{{ item.ruleName }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'WosSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    options: {
      type: Array,
      required: true
    },
    value: {
      type: [String, Number],
      default: ''
    },
    valueKey: {
      type: String,
      default: 'value'
    }
  },
  data() {
    return {
      label: '请选择',
      visible: false,
      currentValue: this.value
    }
  },
  watch: {
    value() {
      this.options.map(item => {
        if (this.value === item.ruleCode) {
          this.label = item.ruleName
          this.currentValue = item.ruleCode
        }
        if (!this.value) {
          this.label = '请选择'
          this.currentValue = null
        }
        return item
      })
    }
  },
  methods: {
    handleClick(item) {
      if (item.ruleCode !== this.currentValue) {
        this.currentValue = item.ruleCode
        this.label = item.ruleName
        this.$emit('input', this.currentValue)
        this.$emit('change', this.currentValue)
      }
      this.visible = false
    },
    ShowOption() {
      if (this.visible) {
        this.visible = false
        this.$emit('click', this.visible)
      } else {
        this.visible = true
        this.$emit('click', this.visible)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.wos-select{
  font-size: 13px;
  max-width: 115px;
  position: relative;
  padding: 0 8px;
  border: 1px solid #E6E6E6;
  background: #fff;
  .active-item{
    line-height: 36px;
    span{
      width: calc( 100% - 13px);
    }
    .select-icon{
      font-size: 14px;
    }
  }
  ul.options{
    width: calc(100% + 2px);
    position: absolute;
    top: 36px;
    left: -1px;
    z-index: 99999999;
     border: 1px solid #E6E6E6;
    li{
      width: 100%;
      border-bottom: 1px solid #E6E6E6;
      color: #333;
      line-height: 36px;
      padding: 0 8px;
      background: #fff;
      &.active{
        background: #00C8B0;
        border-color: #00C8B0;
        color: #fff;
      }
      &:last-child{
        border: none;
      }
    }
  }
}
</style>

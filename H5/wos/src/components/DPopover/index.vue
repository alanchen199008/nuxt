<template>
  <div class="match-popover">
    <van-popover
      v-model="visible"
      trigger="click"
      overlay
      :actions="actions"
      get-container="#app"
      @select="onSelect"
    >
      <template #reference>
        <span>{{ text }}</span>
        <div class="match-popover__arrow" :class="[visible && 'visible']" />
      </template>
    </van-popover>
  </div>
</template>

<script>
export default {
  props: {
    module: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      visible: false,
      actions: [
        { text: '全部', value: 1 },
        { text: '足球', value: 2 }
        // { text: '北单', value: 3 }
      ]
    }
  },
  computed: {
    text() {
      return this.actions[this.type - 1].text
    },
    type: {
      get() {
        return this.module === 'match' ? this.$store.getters.mMatchType : this.module === 'forecast' ? this.$store.getters.forecastMatchType : 2
      },
      set(value) {
        if (this.module === 'match') {
          this.$store.dispatch('match/setMatchMatchType', value)
        }
        if (this.module === 'forecast') {
          this.$store.dispatch('forecast/SetMatchType', value)
        }
      }
    }
  },
  methods: {
    onSelect(action) {
      this.type = action.value
      this.$emit('input', action.value)
    }
  }
}
</script>

<style lang="scss" scoped>
.match-popover {
  color: #fff;
  position: relative;
  padding: 0 15px;
  &__arrow {
    position: absolute;
    right: 0;
    top: 7px;
    border-style: solid;
    border-color: transparent;
    border-bottom-width: 0;
    border-top-width: 7px;
    border-left-width: 6px;
    border-right-width: 6px;
    border-top-color: currentColor;
    transition: transform 0.15s linear;
    &.visible {
      transform: rotate(180deg);
    }
  }
}
</style>

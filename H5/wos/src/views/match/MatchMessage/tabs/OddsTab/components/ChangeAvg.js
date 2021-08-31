import upIcon from '@/assets/public/odd-up.png'
import downIcon from '@/assets/public/odd-down.png'
export default {
  props: {
    instant: {
      type: [Number, String],
      default: 0
    },
    opening: {
      type: [Number, String],
      default: 0
    },
    change: {
      type: Boolean,
      default: true
    },
    changeing: {
      type: [Number, String],
      default: 0
    },
    tag: {
      type: String,
      default: 'p'
    },
    transform: {
      type: Function,
      default: (props) => props
    }
  },
  render(createElement) {
    return createElement(this.tag, {}, this.$scopedSlots.default ? [
      this.$scopedSlots.default(this.transform({
        icon: this.icon,
        classes: this.classes,
        avg: this.avg
      }))
    ] : this.$slots.default)
  },
  computed: {
    diff() {
      let changeing = this.instant - this.opening
      if (!this.change) changeing = this.changeing
      return changeing
    },
    icon() {
      return this.diff > 0 ? upIcon : this.diff < 0 ? downIcon : null
    },
    classes() {
      return this.diff > 0 ? 'color-red-regular' : this.diff < 0 ? 'color-green-regular' : ''
    },
    avg() {
      if (!this.change) return `${(this.diff * 100).toFixed(1)}%`
      return this.diff !== 0 ? `${(this.diff / this.opening * 100).toFixed(1)}%` : '--'
    }
  }
}

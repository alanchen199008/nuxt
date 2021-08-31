<template>
  <div ref="loader" class="loader" />
</template>

<script>
import animationData from './soccer_loading.json'
export default {
  name: 'Loader',
  props: {
    type: {
      type: String,
      default: 'loading'
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.loader = window.lottie.loadAnimation({
        container: this.$refs.loader,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData
      })
      this.$emit('createloader', this.loader)
    }
  }
}
</script>
<style lang="scss" scoped>
.loader {
    width: 50px;
    height: 50px;
    margin: 0 auto;
}
</style>

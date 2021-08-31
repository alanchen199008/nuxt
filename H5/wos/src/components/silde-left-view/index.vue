<template>
  <transition
    name="van-slide-right"
    @after-enter="afterEnter"
  >
    <router-view ref="slideRight" class="fiexed-router" />
  </transition>
</template>
<script>
export default {
  name: 'SildeLeftView',
  methods: {
    afterEnter() {
      this.$refs.slideRight.afterEnter && this.$refs.slideRight.afterEnter()
    }
  }
}
</script>

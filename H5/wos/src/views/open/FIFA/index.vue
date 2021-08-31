<template>
  <div flex="dir:top" :class="mode === 0 ? 'd-container' : 'a-container'">
    世纪杯
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['mode'])
  }
}
</script>

<style>

</style>

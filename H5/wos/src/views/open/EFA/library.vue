<template>
  <div class="a-container" flex="dir:top">
    <van-nav-bar title="欧冠资料库" left-arrow @click-left="onClickLeft" />
    <div class="tab">
      <van-tabs v-model="component" border animated line-height="2px" title-active-color="#4ACC96" title-inactive-color="#333" :before-change="beforeChange">
        <van-tab v-for="(tab, index) in tabs" :key="index" :title="tab.label" :name="tab.value" />
      </van-tabs>
    </div>
    <div class="scroll-touch">
      <component :is="component" />
    </div>
  </div>
</template>

<script>
import { Instant, Top, Shooter } from './components'
import { mapGetters } from 'vuex'
export default {
  components: { Instant, Top, Shooter },
  data() {
    return {
      component: 'Instant',
      tabs: [
        { label: '赛程', value: 'Instant' },
        { label: '积分榜', value: 'Top' },
        { label: '射手榜', value: 'Shooter' }
      ]
    }
  },
  computed: {
    ...mapGetters(['mode'])
  },
  created() {
    let tab = ''
    if (this.mode === 0) {
      tab = this.$route.params.tab
    } else {
      tab = this.$route.query.tab
    }
    this.component = tab
  },
  methods: {
    onClickLeft() {
      if (this.mode === 0) {
        this.$router.back(-1)
      }
      if (this.mode === 1) {
        // android
        window.android.closePage()
      }
      if (this.mode === 2) {
        // ios
        window.webkit.messageHandlers.BackExitPage.postMessage(null)
      }
    },
    beforeChange(name) {
      if (this.component !== name) {
        this.component = name
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

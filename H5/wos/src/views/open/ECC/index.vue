<template>
  <div :class="mode === 0 ? 'd-container' : 'a-container'" flex="dir:top">
    <van-tabs v-model="component">
      <van-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :title="tab.label"
        :before-change="handleChange"
      >
        <component :is="tab.value" v-if="tab.value === 'Home'" @more="more" />
        <component :is="tab.value" v-else-if="tab.value === 'Library'" :tab="tabName" @more="more" />
        <component :is="tab.value" v-else />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Home, News, Guide, Library } from './components'
export default {
  name: 'Euro',
  components: { Home, News, Guide, Library },
  data() {
    return {
      component: 'Home',
      tabName: '',
      tabs: [
        { label: '欧洲杯', value: 'Home' },
        { label: '资讯', value: 'News' },
        { label: '资料库', value: 'Library' },
        { label: '指南', value: 'Guide' }
      ]
    }
  },
  computed: {
    ...mapGetters(['mode'])
  },
  methods: {
    more(name) {
      this.component = 2
      this.tabName = name
    },
    handleChange(name) {
      this.component = name
    }
  }
}
</script>

<style lang="scss">
.listcontent {
  max-height: 100vh;
  box-sizing: border-box;
  padding-bottom: 150px;
}
</style>

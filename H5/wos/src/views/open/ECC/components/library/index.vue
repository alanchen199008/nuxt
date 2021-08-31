<template>
  <div class="content listcontent">
    <van-tabs v-model="component" type="card" color="#6b71ea">
      <van-tab
        v-for="item in tabs"
        :key="item.key"
        :name="item.name"
        :title="item.title"
        @click="handleTab"
      />
    </van-tabs>
    <component :is="component" />
  </div>
</template>

<script>
import { Top, Shooter, Team } from './components'
export default {
  components: { Top, Shooter, Team },
  props: {
    tab: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      component: 'top',
      tabs: [
        { name: 'top', title: '积分榜', key: 0 },
        { name: 'shooter', title: '射手榜', key: 1 },
        { name: 'team', title: '球队资料', key: 2 }
      ]
    }
  },
  watch: {
    tab(value) {
      this.component = value
    }
  },
  methods: {
    handleTab(name) {
      this.component = name
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  font-size: 12px;
  height: 100%;
  overflow: auto;
  background: #b7bafc;
  .van-tabs {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>

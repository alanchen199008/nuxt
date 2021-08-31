<template>
  <div class="content listcontent">
    <van-tabs v-model="active" type="card" color="#6b71ea">
      <van-tab
        v-for="item in tabs"
        :key="item.key"
        :name="item.name"
        :title="item.title"
        @click="handleTab"
      />
    </van-tabs>
    <component :is="active" />
  </div>
</template>

<script>
import { Site, Match, History } from './components'
export default {
  components: { Site, Match, History },
  data() {
    return {
      active: 'Site',
      tabs: [
        { name: 'Site', title: '场馆', key: 0 },
        { name: 'Match', title: '赛事', key: 1 },
        { name: 'History', title: '历史', key: 2 }
      ]
    }
  },
  methods: {
    handleTab(name) {
      this.active = name
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
  padding-bottom: 60px;
  .van-tabs {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}
</style>

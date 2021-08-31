<template>
  <div class="base-container">
    <div class="match-message-tabs">
      <van-tabs v-model="active" type="card">
        <van-tab v-for="tab in tabs" :key="tab.name" :title="tab.label" :name="tab.name" />
      </van-tabs>
    </div>

    <keep-alive><component :is="active" /></keep-alive>
    <silde-left-view />
  </div>
</template>

<script>
import { Record, Rank, LineUp, Schedule } from './tabs'
export default {
  name: 'BaseTab',
  components: { Record, Rank, LineUp, Schedule },
  data() {
    return {
      active: 'Record',
      tabs: [
        { name: 'Record', label: '战绩' },
        { name: 'Rank', label: '排名' },
        { name: 'LineUp', label: '阵容' },
        { name: 'Schedule', label: '赛程' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.base-container {
  font-size: 12px;
  .match-message-tabs {
    margin: 10px 0;
  }
}
</style>


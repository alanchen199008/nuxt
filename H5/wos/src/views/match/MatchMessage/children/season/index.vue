<template>
  <div flex="dir:top">
    <van-nav-bar left-arrow :title="title" @click-left="$router.go(-1)" />

    <div class="match-message-tabs">
      <van-tabs
        v-model="current"
        type="card"
      >
        <van-tab title="往季排名" name="past" />
        <van-tab title="本赛季赛程" name="schedule" />
      </van-tabs>
    </div>

    <div class="scroll-touch" flex-box="1">
      <keep-alive>
        <component :is="current" />
      </keep-alive>
    </div>

    <silde-left-view />

  </div>
</template>

<script>

import past from './past'
import schedule from './schedule'

export default {
  components: { past, schedule },
  data() {
    return {
      current: 'past',
      params: null
    }
  },
  computed: {
    title() {
      return this.$route.query.name && decodeURIComponent(this.$route.query.name)
    }
  },
  created() {
    const { query, params: { competitionId, teamId, seasonId, stageId, group }} = this.$route
    this.current = query.tab || 'past'
    this.params = { competitionId, teamId, seasonId, stageId, group }
  }
}
</script>

<style lang="scss" scoped>
.match-message-tabs {
    background-color: var(--paper-background-color);
    padding: 10px 0;
  }
</style>

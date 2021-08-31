<template>
  <div flex="dir:top box:first">
    <van-nav-bar left-arrow :title="title" @click-left="$router.go(-1)" />

    <div class="scroll-touch" >
      <table
        cellspacing="0"
        cellpadding="0"
        class="schedule-table"
      >
        <colgroup>
          <col width="25%">
          <col width="21%">
          <col width="22%">
          <col width="10%">
          <col width="22%">
        </colgroup>
        <tbody>
          <tr
            v-for="item in items"
            :key="item.matchTime"
          >
            <td>
              <div>{{ item.matchTime | parseTime('{y}-{m}-{d}') }}</div>
            </td>
            <td>
              <div>{{ item.competitionName }}</div>
            </td>
            <td>
              <div
                class="van-ellipsis"
                :class="[item.homeTeamId !== $route.params.teamId && 'secondary']"
              >{{ item.homeTeamName }}</div>
            </td>
            <td>
              <div>VS</div>
            </td>
            <td>
              <div
                class="van-ellipsis"
                :class="[item.awayTeamId !== $route.params.teamId && 'secondary']"
              >{{ item.awayTeamName }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { getMatchBaseFaceFuture } from '@/api/match'

export default {
  data() {
    return {
      items: null,
      title: ''
    }
  },
  created() {
    this.title = decodeURIComponent(this.$route.query.name)
  },
  methods: {
    afterEnter() {
      this.$toast.loading({
        loadingType: 'spinner',
        forbidClick: true
      })
      const { teamId } = this.$route.params
      getMatchBaseFaceFuture({
        teamId,
        limit: false
      }).then(([data, err]) => {
        this.$toast.clear()
        if (!err) {
          this.items = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-table {
  font-size: 12px;
  width: 100%;
  td {
    height: 40px;
    padding: 0 3px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    .secondary {
      color: var(--text-secondary);
    }

  }
}
</style>

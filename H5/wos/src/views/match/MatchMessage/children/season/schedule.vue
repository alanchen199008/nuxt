<template>
  <table
    v-if="items"
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
          <div class="small">{{ item.matchTime | parseTime('{y}/{m}/{d}') }}</div>
        </td>
        <td>
          <div>{{ item.competitionName }}</div>
        </td>
        <td>
          <div
            class="van-ellipsis"
            :class="[item.homeTeamId !== parseInt($route.params.teamId) && 'secondary']"
          >{{ item.homeTeamName }}</div>
        </td>
        <td>
          <div class="small">{{ item.homeScore }}:{{ item.awayScore }}({{ item.homeHalfScore }}:{{ item.awayHalfScore }})</div>
        </td>
        <td>
          <div
            class="van-ellipsis"
            :class="[item.awayTeamId !== parseInt($route.params.teamId) && 'secondary']"
          >{{ item.awayTeamName }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getMatchSeason } from '@/api/match'

export default {
  data() {
    return {
      items: null
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      const { teamId, competitionId, seasonId, stageId, group } = this.$route.params
      getMatchSeason({ teamId, competitionId, seasonId, stageId, group }).then(([data, err]) => {
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
  width: 100%;
  background-color: white;
  td {
    height: 40px;
    padding: 0 3px;
    border-bottom: 1px solid #ddd;
    text-align: center;
    font-size: 13px;
    .secondary {
      color: var(--text-secondary);
    }
    .small {
      transform: scale(0.8461);
    }
  }
}
</style>

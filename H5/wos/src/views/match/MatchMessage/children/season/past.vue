<template>
  <table
    v-if="items"
    cellspacing="0"
    cellpadding="0"
    class="past-table"
  >
    <colgroup>
      <col width="30%">
      <col width="30%">
      <col width="30%">
      <col width="10%">
    </colgroup>
    <tbody>
      <tr
        v-for="item in items"
        :key="item.matchTime"
        @click="goLink(item.seasonId, item.stageId, item.group)"
      >
        <td>
          <div>{{ item.year }}</div>
        </td>
        <td>
          <div>{{ item.competitionName }}</div>
        </td>
        <td>
          <div v-if="item.position">名次{{ item.position }}</div>
        </td>
        <td>
          <div><van-icon name="arrow" color="#999" /></div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { getMatchHistoryRank } from '@/api/match'

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
      const { teamId, competitionId, stageId } = this.$route.params
      getMatchHistoryRank({ teamId, competitionId, stageId
      }).then(([data, err]) => {
        if (!err) {
          this.items = data
          this.items.map(item => {
            this.$set(item, 'stageId', this.$route.params.stageId)
            this.$set(item, 'group', this.$route.params.group)
          })
        }
      })
    },
    goLink(seasonId, stageId, group) {
      this.$router.push({ name: 'MatchRankMessage', params: { seasonId, stageId, group }})
    }
  }
}
</script>

<style lang="scss" scoped>
.past-table {
  width: 100%;
  background-color: white;
  tr {
    &:nth-of-type(2n) {
      background-color: #F5F6F8;
    }
  }
  td {
    height: 30px;
    padding: 0 5px;
    text-align: center;
    font-size: 13px;

  }
}
</style>

<template>
  <div flex="dir:top box:first">
    <van-nav-bar left-arrow :title="title" @click-left="$router.go(-1)" />
    <div v-if="resource" class="rank-container scroll-touch">
      <table
        v-if="Array.isArray(resource.ranks) && resource.ranks.length"
        cellspacing="0"
        cellpadding="0"
        width="100%"
        class="rank-container__table"
      >
        <tbody>
          <tr>
            <th>排名</th>
            <th>球队</th>
            <th>赛</th>
            <th>胜</th>
            <th>平</th>
            <th>负</th>
            <th>进球</th>
            <th>失球</th>
            <th>积分</th>
          </tr>
          <tr
            v-for="(rank, i) in resource.ranks"
            :key="i"
          >
            <td>{{ i + 1 }}</td>
            <td :style="{ backgroundColor: rank.promotionColor, color: rank.promotionColor && 'white' }" class="van-ellipsis">
              {{ rank.teamName }}
            </td>
            <td>{{ rank.total }}</td>
            <td>{{ rank.won }}</td>
            <td>{{ rank.draw }}</td>
            <td>{{ rank.loss }}</td>
            <td>{{ rank.goals }}</td>
            <td>{{ rank.goalsAgainst }}</td>
            <td>{{ rank.points }}</td>
          </tr>
        </tbody>
      </table>
      <div v-if="resource.promotions" class="rank-container__tip">
        <span
          v-for="item in resource.promotions"
          :key="item.promotionId"
        >
          <i :style="{ backgroundColor: item.color }" />
          {{ item.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { getMatchBaseCompetitionRank } from '@/api/match'

export default {
  data() {
    return {
      resource: null
    }
  },
  computed: {
    title() {
      return this.resource && `${this.resource.competitionName}${this.resource.year}赛季`
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    fetch() {
      const { seasonId, competitionId, stageId, group } = this.$route.params
      getMatchBaseCompetitionRank({
        competitionId,
        seasonId, stageId, group
      }).then(([data, err]) => {
        if (!err) {
          this.resource = data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rank-container {
  background-color: var(--paper-background-color);
  &__table {
    background-color: white;
    margin-top: 10px;
    border-top: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    th {
      height: 36px;
      font-weight: inherit;
       font-size: 13px;
    }
    tr {
      &.current-row {
        background-color: #F0FAED;
      }
    }
    td {
      height: 30px;
      text-align: center;
      border-top: 1px solid var(--border-color);
      width: 10%;
      color: var(--text-regular);
      font-size: 13px;
      &:nth-child(2) {
        width: 20%;
      }

      &.up-column {
        background-color: var(--paper-yellow-300);
      }
      &.up-affix-column {
        background-color: var(--paper-yellow-100);
      }
      &.down-affix-column {
        background-color: var(--paper-bule-100);
      }
      &.down-column {
        background-color: var(--paper-bule-300);
      }

    }
    &__empty-block {
      line-height: 30px;
      text-align: center;
      width: 100%;
      border-bottom: 1px solid var(--border-color);
    }
  }
  &__tip {
    padding: 15px 0;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: space-around;
    & > span {
      i {
        display: inline-block;
        width: 12px;
        height: 12px;
      }
    }

  }
}
</style>

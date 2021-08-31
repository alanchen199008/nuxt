<template>
  <div class="rank-container">
    <d-empty v-if="!rankitem.home && !rankitem.away && !rankList" />
    <template v-else>
      <rank-item v-if="rankitem && rankitem.home" :resource="rankitem.home" />
      <rank-item v-if="rankitem && rankitem.away" :resource="rankitem.away" />
      <rank-list v-if="rankList" :resource="rankList" :home-team-id="params.homeTeamId" :away-team-id="params.awayTeamId" />
    </template>
  </div>
</template>

<script>
import RankItem from './rank-item'
import RankList from './rank-list'
import { getMatchBaseRank, getMatchBaseCompetitionRank } from '@/api/match'

export default {
  inject: ['messageInstance'],
  components: { RankItem, RankList },
  data() {
    return {
      params: {
        competitionId: null,
        homeTeamId: null,
        awayTeamId: null
      },
      rankParams: {
        competitionId: null,
        seasonId: null,
        stageId: null,
        group: null
      },
      rankitem: {
        home: null,
        away: null
      },
      rankList: null
    }
  },
  created() {
    const { competitionId, homeTeamId, awayTeamId, seasonId, stageId, groupNum } = this.messageInstance.message
    if (competitionId) {
      this.params = { competitionId, homeTeamId, awayTeamId }
      this.rankParams = { competitionId: competitionId, seasonId: seasonId, stageId: stageId, group: groupNum }
      this.fetch(this.params)
      this.fetchCompetition(this.rankParams)
    }
  },
  methods: {
    fetch(params) {
      getMatchBaseRank(params).then(([data, err]) => {
        if (!err) {
          this.rankitem = data
          this.rankitem.home = { ...this.rankitem.home, ...this.rankParams }
          this.rankitem.away = { ...this.rankitem.away, ...this.rankParams }
        }
      })
    },
    fetchCompetition(params) {
      getMatchBaseCompetitionRank(params)
        .then(([data, err]) => {
          if (!err) {
            this.rankList = data
            this.rankList.groupName = this.getGroupName(params.group)
          }
        })
    },
    getGroupName(num) {
      let string = ''
      if (num === 1) {
        string = 'A'
      } else if (num === 2) {
        string = 'B'
      } else if (num === 3) {
        string = 'C'
      } else if (num === 4) {
        string = 'D'
      } else if (num === 5) {
        string = 'E'
      } else if (num === 6) {
        string = 'F'
      } else if (num === 7) {
        string = 'G'
      } else if (num === 8) {
        string = 'H'
      } else if (num === 9) {
        string = 'I'
      } else if (num === 10) {
        string = 'J'
      } else if (num === 11) {
        string = 'K'
      } else if (num === 12) {
        string = 'L'
      } else if (num === 13) {
        string = 'M'
      } else if (num === 14) {
        string = 'N'
      } else if (num === 15) {
        string = 'O'
      } else if (num === 16) {
        string = 'P'
      } else {
        string = ''
      }
      return string
    }
  }
}
</script>
<style lang="scss">
.rank-container {
  background-color: white;
  &-item {
    &__head {
      position: relative;
      padding: 16px 0 10px 10px;
      margin: 0 10px;

      &--title {
        font-size: 15px;
      }
      &--extra {
        cursor: pointer;
        i,
        span {
          vertical-align: middle;
        }
      }
      &::before {
        content: '';
        position: absolute;
        left: 0;
        width: 3px;
        height: 15px;
        background-color: var(--paper-orange-500);
        border-radius: 3px;
      }
    }
    &__table {
      border-top: 1px solid var(--border-color);
      border-bottom: 1px solid var(--border-color);
      th {
        height: 36px;
        background-color: #F5F4F7;
        font-weight: inherit;
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
}
</style>

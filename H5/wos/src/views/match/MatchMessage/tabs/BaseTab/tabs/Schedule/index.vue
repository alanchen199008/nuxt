<template>
  <div class="schedule-container">
    <div
      v-for="(item, key) in items"
      :key="key"
      class="schedule-container-card"
    >
      <div class="schedule-container-card__head" flex="main:justify cross:center">
        <div class="schedule-container-card__head--title">
          {{ item.name }}
          <div class="pass">未来 <span class="flag">{{ item.list.length }}</span> 场</div>
        </div>
        <div class="schedule-container-card__head--extra" @click="goLink(item.teamId, item.name)">
          <span>更多数据</span>
          <van-icon name="arrow" color="#999" />
        </div>
      </div>
      <div class="schedule-container-card__body">
        <table cellspacing="0" cellpadding="0">
          <colgroup>
            <col width="25%">
            <col width="21%">
            <col width="22%">
            <col width="10%">
            <col width="22%">
          </colgroup>
          <tbody>
            <tr
              v-for="child in item.list"
              :key="child.matchTime"
            >
              <td>
                <div>{{ child.matchTime | parseTime('{y}-{m}-{d}') }}</div>
              </td>
              <td>
                <div>{{ child.competitionName }}</div>
              </td>
              <td class="is-right">
                <div>{{ child.homeTeamName }}</div>
              </td>
              <td>
                <div>VS</div>
              </td>
              <td class="is-left">
                <div>{{ child.awayTeamName }}</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getMatchBaseFaceFuture } from '@/api/match'
export default {
  inject: ['messageInstance'],
  data() {
    return {
      items: [{ name: '', teamId: null, list: [] }, { name: '', teamId: null, list: [] }]
    }
  },
  created() {
    if (this.messageInstance.message) {
      const { homeTeamId, homeTeamName, awayTeamId, awayTeamName } = this.messageInstance.message
      this.items[0].name = homeTeamName
      this.items[0].teamId = homeTeamId
      this.items[1].name = awayTeamName
      this.items[1].teamId = awayTeamId
      this.getHomeRecord(homeTeamId)
      this.getAwayRecord(awayTeamId)
    }
  },
  methods: {
    getHomeRecord(teamId) {
      getMatchBaseFaceFuture({ teamId, limit: true })
        .then(([data, err]) => {
          if (!err) {
            this.items[0].list = data
          }
        })
    },
    getAwayRecord(teamId) {
      getMatchBaseFaceFuture({ teamId, limit: true })
        .then(([data, err]) => {
          if (!err) {
            this.items[1].list = data
          }
        })
    },
    goLink(teamId, name) {
      this.$router.push({ name: 'MatchScheduleMessage', params: { teamId }, query: { name: encodeURIComponent(name) }})
    }
  }
}
</script>

<style lang="scss" scoped>
.schedule-container {
  &-card {
    background-color: white;
    margin-bottom: 10px;
    &__head {
      position: relative;
      margin: 0 10px;
      padding: 16px 0 10px 10px;

      &--title {
        font-size: 15px;

        .pass {
          display: inline-block;
          color: $--color-text-secondary;
          margin-left: 15px;
          font-size: 12px;
          .flag {
            color: $--color-text-primary;
          }
        }
      }
      &--extra {
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
        background-color: #F87D22;
        border-radius: 3px;
      }
    }
    &__body {
      table {
        width: 100%;
      }
      td {
        height: 40px;
        padding: 0 3px;
        border-top: 1px solid #ddd;
        text-align: center;
        color: var(--text-regular);
        &.is-right {
          text-align: right;
        }
        &.is-left {
          text-align: left;
        }
      }
    }
  }
}
</style>
